from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpRequest
from django.utils.timezone import now
from django.db.models import Count
from .models import Post, Comment, Reaction, Bookmark

def get_client_ip(request: HttpRequest):
    """Helper function to get the client's IP address."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def post_list(request):
    posts = Post.objects.filter(status='published').order_by('-published_date')
    context = {
        'posts': posts
    }
    return render(request, 'posts/post_list.html', context)

def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug, status='published')

    # Track unique views using IP address
    client_ip = get_client_ip(request)
    viewed_posts = request.session.get('viewed_posts', [])
    unique_view_identifier = f"{post.id}_{client_ip}"  # Combines post ID and IP

    if unique_view_identifier not in viewed_posts:
        post.views += 1
        post.save()
        viewed_posts.append(unique_view_identifier)
        request.session['viewed_posts'] = viewed_posts

    # Fetch comments
    comments = post.comments.filter(parent__isnull=True, approved=True).order_by('-created_at')

    # Compute reaction counts
    reaction_counts = {}
    for reaction_type, _ in Reaction.REACTION_CHOICES:
        reaction_counts[reaction_type] = post.reactions.filter(reaction_type=reaction_type).count()

    # Check if the user has reacted to this post
    user_reaction = None
    if request.user.is_authenticated:
        try:
            user_reaction = Reaction.objects.get(post=post, user=request.user)
        except Reaction.DoesNotExist:
            pass

    # Context for the template
    context = {
        'post': post,
        'comments': comments,
        'user_reaction': user_reaction,
        'reaction_counts': reaction_counts
    }
    return render(request, 'posts/post_detail.html', context)

@login_required
def add_comment(request, slug):
    if request.method == 'POST':
        post = get_object_or_404(Post, slug=slug)
        parent_id = request.POST.get('parent_id')
        comment_text = request.POST.get('comment')
        
        parent = None
        if parent_id:
            parent = Comment.objects.get(id=parent_id)
        
        comment = Comment.objects.create(
            post=post,
            comment=comment_text,
            name=request.user.get_full_name() or request.user.username,
            email=request.user.email,
            parent=parent,
            approved=True
        )
        
        # Prepare comment data for JSON response
        comment_data = {
            'id': comment.id,
            'name': comment.name,
            'comment': comment.comment,
            'created_at': comment.created_at.strftime('%B %d, %Y at %I:%M %p'),
            'parent_id': parent.id if parent else None,
        }
        
        return JsonResponse({
            'status': 'success', 
            'comment': comment_data
        })
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@login_required
def add_reaction(request, slug, reaction_type):
    # Validate reaction_type first
    if reaction_type not in dict(Reaction.REACTION_CHOICES):
        return JsonResponse({
            'status': 'error', 
            'message': 'Invalid reaction type'
        }, status=400)

    try:
        post = get_object_or_404(Post, slug=slug)
        
        # Try to find an existing reaction by this user for this post
        existing_reaction = Reaction.objects.filter(
            post=post, 
            user=request.user
        ).first()

        if existing_reaction:
            if existing_reaction.reaction_type == reaction_type:
                # If same reaction, remove it
                existing_reaction.delete()
                status = 'removed'
            else:
                # If different reaction, update it
                existing_reaction.reaction_type = reaction_type
                existing_reaction.save()
                status = 'changed'
        else:
            # No existing reaction, create a new one
            Reaction.objects.create(
                post=post,
                user=request.user,
                reaction_type=reaction_type
            )
            status = 'added'
        
        # Recompute reaction counts
        reaction_counts = {
            rt: post.reactions.filter(reaction_type=rt).count() 
            for rt, _ in Reaction.REACTION_CHOICES
        }
        
        return JsonResponse({
            'status': status, 
            'reaction_type': reaction_type,
            'reaction_counts': reaction_counts
        })
    
    except Exception as e:
        # Log the error if needed
        return JsonResponse({
            'status': 'error', 
            'message': str(e)
        }, status=400)

@login_required
def toggle_bookmark(request, slug):
    post = get_object_or_404(Post, slug=slug)
    
    bookmark, created = Bookmark.objects.get_or_create(
        user=request.user,
        post=post
    )
    
    if not created:
        bookmark.delete()
    
    return JsonResponse({
        'status': 'added' if created else 'removed',
        'bookmark_count': post.bookmarked_by.count()
    })