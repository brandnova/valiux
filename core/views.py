from django.shortcuts import get_object_or_404, render
from posts.models import Post
from django.views.generic.detail import DetailView
from .models import StaticPage
import random

# Create your views here.

def home(request):
    all_posts = Post.objects.filter(status='published').order_by('-published_date')
    random_post = Post.objects.filter(status='published').exclude(image='').order_by('?')[:5]

    context = {
        'all_posts': all_posts,
        'random_post': random_post,
    }

    return render(request, 'core/index.html', context)


class StaticPageDetailView(DetailView):
    model = StaticPage
    template_name = 'core/static_page_detail.html'
    context_object_name = 'page'
