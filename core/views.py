from django.shortcuts import get_object_or_404, render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.generic.detail import DetailView
from posts.models import Post
from django.http import JsonResponse
from .models import StaticPage

def home(request):
    all_posts = Post.objects.filter(status='published').order_by('-published_date')
    carousel = Post.objects.filter(status='published').exclude(image='').order_by('?')[:5]
    trending_posts = Post.objects.filter(status='published', tag='trending').order_by('?')[:5]
    single_post = Post.objects.filter(status='published').order_by('?').first()

    context = {
        'all_posts': all_posts[:6],  # Initially show only first 6 posts
        'carousel': carousel,
        'trending_posts': trending_posts,
        'single_post': single_post,
    }

    return render(request, 'core/index.html', context)

def load_more_posts(request):
    page = request.GET.get('page', 1)
    posts = Post.objects.filter(status='published').order_by('-published_date')
    
    paginator = Paginator(posts, 6)  # 6 posts per page
    
    try:
        posts_page = paginator.page(page)
    except PageNotAnInteger:
        posts_page = paginator.page(1)
    except EmptyPage:
        return JsonResponse({
            'has_more': False,
            'posts_html': ''
        })

    posts_html = ''
    for post in posts_page:
        posts_html += render_post_to_string(post)

    return JsonResponse({
        'has_more': posts_page.has_next(),
        'posts_html': posts_html
    })

def render_post_to_string(post):
    # This function would render a single post to an HTML string
    from django.template.loader import render_to_string
    return render_to_string('core/post_item.html', {'post': post})


class StaticPageDetailView(DetailView):
    model = StaticPage
    template_name = 'core/static_page_detail.html'
    context_object_name = 'page'
