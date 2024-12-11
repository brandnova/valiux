from django.shortcuts import get_object_or_404, render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.generic.detail import DetailView
from posts.models import Post
from django.http import JsonResponse
from .models import StaticPage

def home(request):
    posts = Post.objects.filter(status='published').order_by('-created_at')

    carousel = Post.objects.filter(status='published').exclude(image='').order_by('?')[:5]
    trending_posts = Post.objects.filter(status='published', tag='trending').order_by('?')[:5]
    single_post = Post.objects.filter(status='published').exclude(image='').order_by('?').first()

    # Paginate the main posts
    paginator = Paginator(posts, 6)  # Show 6 posts per page
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    context = {
        'carousel': carousel,
        'trending_posts': trending_posts,
        'single_post': single_post,
        'posts': page_obj,
        'is_paginated': page_obj.has_other_pages()
    }

    # Handle AJAX request for more posts
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        post_list = []
        for post in page_obj:
            post_data = {
                'title': post.title,
                'slug': post.slug,
                'excerpt': post.excerpt,
                'category': post.category.name,
                'created_at': post.created_at.strftime("%b %d '%y"),
                'views': post.views,
                'author_first_name': post.author.first_name,
                'author_last_name': post.author.last_name,
                'image_url': post.image.url if post.image else None,
                'author_avatar': post.author.profile.avatar.url if post.author.profile.avatar else None,
            }
            post_list.append(post_data)
        
        return JsonResponse({
            'posts': post_list,
            'has_next': page_obj.has_next(),
            'next_page_number': page_obj.next_page_number() if page_obj.has_next() else None
        })

    return render(request, 'core/index.html', context)


class StaticPageDetailView(DetailView):
    model = StaticPage
    template_name = 'core/static_page_detail.html'
    context_object_name = 'page'
