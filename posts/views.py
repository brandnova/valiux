from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import JsonResponse, HttpRequest
from django.utils.timezone import now
from django.db.models import Q
from .models import  Series, Post, PostView, Category, Genre, Comment, Reaction, Bookmark
import logging

logger = logging.getLogger(__name__)

def get_client_ip(request: HttpRequest):
    """Helper function to get the client's IP address."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def post_list(request):
    # Initial queryset of published posts
    posts = Post.objects.filter(status='published').order_by('-created_at')

    # Fetch all categories and organize by parent
    categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')

    # Fetch all genres
    genres = Genre.objects.all()

    # Get category slugs from request
    category_slugs = request.GET.getlist('category')
    if category_slugs:
        # Find all matching categories (including parents and children)
        matching_categories = Category.objects.filter(slug__in=category_slugs)
        
        # Create a list to store all relevant category IDs
        category_ids = []
        
        for category in matching_categories:
            # Add the category itself
            category_ids.append(category.id)
            
            # If it's a parent category, add all its subcategory IDs
            if not category.parent:
                category_ids.extend(category.subcategories.values_list('id', flat=True))
        
        # Filter posts by the collected category IDs
        posts = posts.filter(category__id__in=category_ids)

    # Advanced Genre Filtering
    genre_slugs = request.GET.getlist('genre')
    if genre_slugs:
        # Filter posts that have ALL selected genres
        posts = posts.filter(genres__slug__in=genre_slugs).distinct()

    # Search functionality
    search_query = request.GET.get('search', '')
    if search_query:
        posts = posts.filter(
            Q(title__icontains=search_query) | 
            Q(content__icontains=search_query) | 
            Q(excerpt__icontains=search_query)
        )

    # Pagination
    paginator = Paginator(posts, 10)
    page = request.GET.get('page', 1)

    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    # Additional context data
    popular_posts = Post.objects.filter(status='published', tag='popular').order_by('?')[:5]
    trending_posts = Post.objects.filter(status='published', tag='trending').order_by('?')[:5]
    latest_posts = Post.objects.filter(status='published', tag='latest').order_by('?')[:5]

    context = {
        'posts': posts,
        'categories': categories,
        'genres': genres,
        'popular_posts': popular_posts,
        'trending_posts': trending_posts,
        'latest_posts': latest_posts,
        'current_category': category_slugs,
        'current_genre': genre_slugs,
        'search_query': search_query,
    }
    return render(request, 'posts/post_list.html', context)


def series_list(request):
    series = Series.objects.all()
    return render(request, 'posts/series_list.html', {'series': series})

def series_detail(request, slug):
    series = get_object_or_404(Series, slug=slug)
    posts = series.posts.filter(status='published').order_by('created_at')  # Use the related_name 'posts' from the Series model in the Post's ForeignKey field.
    return render(request, 'posts/series_detail.html', {'series': series, 'posts': posts})

def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug, status='published')

    # Log the view
    client_ip = get_client_ip(request)
    user_agent = request.META.get('HTTP_USER_AGENT', '')

    # Check if this IP has already viewed this post
    if not PostView.objects.filter(post=post, ip_address=client_ip).exists():
        PostView.objects.create(post=post, ip_address=client_ip, user_agent=user_agent)
        post.views += 1
        post.save()

    # Fetch related posts, categories, genres, etc.
    similar_posts = Post.objects.filter(
        status='published'
    ).exclude(
        id=post.id
    ).filter(
        Q(category=post.category) | Q(genres__in=post.genres.all())
    ).distinct().order_by('-views')[:6]

    author_posts = Post.objects.filter(
        status='published',
        author=post.author
    ).exclude(
        id=post.id
    ).order_by('-created_at')[:6]

    categories = Category.objects.filter(parent__isnull=True).prefetch_related('subcategories')
    genres = Genre.objects.all()

    popular_posts = Post.objects.filter(status='published', tag='popular').order_by('?')[:5]
    trending_posts = Post.objects.filter(status='published', tag='trending').order_by('?')[:5]
    latest_posts = Post.objects.filter(status='published', tag='latest').order_by('?')[:5]

    comments = post.comments.filter(parent__isnull=True, approved=True).order_by('-created_at')

    reaction_counts = {}
    for reaction_type, _ in Reaction.REACTION_CHOICES:
        reaction_counts[reaction_type] = post.reactions.filter(reaction_type=reaction_type).count()

    user_reaction = None
    if request.user.is_authenticated:
        try:
            user_reaction = Reaction.objects.get(post=post, user=request.user)
        except Reaction.DoesNotExist:
            pass

    # Fetch other episodes in the series
    episodes = None
    if post.series:
        episodes = post.series.posts.filter(
            status='published'
        ).exclude(id=post.id).order_by('episode_number')

    from .forms import CommentForm
    comment_form = CommentForm()

    context = {
        'post': post,
        'genres': genres,
        'categories': categories,
        'popular_posts': popular_posts,
        'trending_posts': trending_posts,
        'latest_posts': latest_posts,
        'comments': comments,
        'comment_form': comment_form,
        'user_reaction': user_reaction,
        'reaction_counts': reaction_counts,
        'similar_posts': similar_posts,
        'author_posts': author_posts,
        'episodes': episodes,  # Pass episodes to the context
    }
    return render(request, 'posts/post_detail.html', context)


@login_required
@csrf_exempt  # Use this carefully in production
def add_comment(request, slug):
    logger.info(f"Received request method: {request.method}")
    logger.info(f"Request POST data: {request.POST}")
    
    if request.method == 'POST':
        try:
            post = get_object_or_404(Post, slug=slug)
            comment_text = request.POST.get('comment')
            parent_id = request.POST.get('parent_id')
            
            logger.info(f"Comment text: {comment_text}")
            logger.info(f"Parent ID: {parent_id}")
            
            if not comment_text:
                return JsonResponse({
                    'status': 'error', 
                    'message': 'Comment text is required'
                }, status=400)
            
            parent = Comment.objects.get(id=parent_id) if parent_id else None
            
            comment = Comment.objects.create(
                post=post,
                user=request.user,
                comment=comment_text,
                parent=parent,
                approved=True
            )
            
            logger.info(f"Comment created successfully: {comment.id}")
            
            return JsonResponse({
                'status': 'success', 
                'comment': {
                    'id': comment.id,
                    'username': comment.user.username,
                    'comment': comment.comment,
                    'created_at': comment.created_at.strftime('%B %d, %Y at %I:%M %p'),
                    'parent_id': parent.id if parent else None,
                }
            })
        
        except Exception as e:
            logger.error(f"Error creating comment: {str(e)}")
            return JsonResponse({
                'status': 'error', 
                'message': str(e)
            }, status=400)
    
    logger.warning("Invalid request method")
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

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