from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Post, Comment, Reaction, Bookmark
from django.http import JsonResponse

def post_list(request):
    posts = Post.objects.filter(status='published').order_by('-published_date')
    context = {
        'posts': posts
    }
    return render(request, 'posts/post_list.html', context)

def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    comments = post.comments.filter(parent__isnull=True, approved=True).order_by('-created_at')
    
    # Compute reaction counts
    reaction_counts = {}
    for reaction_type, _ in Reaction.REACTION_CHOICES:
        reaction_counts[reaction_type] = post.reactions.filter(reaction_type=reaction_type).count()
    
    # Check if user has reacted to this post
    user_reaction = None
    if request.user.is_authenticated:
        try:
            user_reaction = Reaction.objects.get(post=post, user=request.user)
        except Reaction.DoesNotExist:
            pass
    
    context = {
        'post': post,
        'comments': comments,
        'user_reaction': user_reaction,
        'reaction_counts': reaction_counts
    }
    return render(request, 'posts/post_detail.html', context)

@login_required
def add_comment(request, slug):
    post = get_object_or_404(Post, slug=slug)
    
    if request.method == 'POST':
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
            approved=True  # For simplicity, auto-approve user comments
        )
        
        return redirect('post_detail', slug=slug)
    
    return redirect('post_detail', slug=slug)

@login_required
def add_reaction(request, slug, reaction_type):
    post = get_object_or_404(Post, slug=slug)
    
    # Remove existing reaction or add new one
    try:
        existing_reaction = Reaction.objects.get(post=post, user=request.user)
        if existing_reaction.reaction_type == reaction_type:
            existing_reaction.delete()
            return JsonResponse({'status': 'removed'})
        else:
            existing_reaction.reaction_type = reaction_type
            existing_reaction.save()
    except Reaction.DoesNotExist:
        Reaction.objects.create(
            post=post,
            user=request.user,
            reaction_type=reaction_type
        )
    
    return JsonResponse({'status': 'success'})

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