from django.shortcuts import get_object_or_404, render
from posts.models import Post
import random

# Create your views here.

def home(request):
    all_posts = Post.objects.filter(status='published').order_by('-published_date')
    random_post = Post.objects.filter(status='published').order_by('?')[:5]

    context = {
        'all_posts': all_posts,
        'random_post': random_post,
    }

    return render(request, 'core/index.html', context)