from datetime import datetime, date
from .models import SiteSettings, StaticPage
from ads.models import Ad
from posts.models import *

def site_settings(request):
    current_year = datetime.now().year
    try:
        site_settings = SiteSettings.objects.first()
    except SiteSettings.DoesNotExist:
        site_settings = None
    return {
        'site_settings': site_settings,
        'current_year': current_year
    }

def static_pages_processor(request):
    current_year = datetime.now().year

    pages = StaticPage.objects.all()
    return {
        'static_pages': pages,
        'current_year': current_year

    }

def ad_context_processor(request):
    today = date.today()
    ads = Ad.objects.filter(active=True, start_date__lte=today, end_date__gte=today)
    ad_dict = {}
    for ad in ads:
        ad_dict[ad.location] = ad
    return {'ads': ad_dict}

def posts_context_processor(request):
    
    categories = Category.objects.all()
    recent_posts = Post.objects.filter(status='published').order_by('-created_at')[:5]

    return {
        'categories' : categories,
        'recent_posts' : recent_posts
    }