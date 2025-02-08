from datetime import datetime, timedelta, date
from .models import SiteSettings, StaticPage
from django.core.cache import cache
from django.utils.timezone import now
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
    # Create a unique cache key
    cache_key = 'active_ads'
    
    # Try to get cached ads
    cached_ads = cache.get(cache_key)
    if cached_ads is not None:
        return {'ads': cached_ads}
    
    # If not in cache, fetch from database
    today = now().date()
    ads = Ad.objects.filter(
        active=True, 
        start_date__lte=today, 
        end_date__gte=today
    )
    
    # Create ad dictionary
    ad_dict = {ad.location: ad for ad in ads}
    
    # Cache the ads for 1 hour
    cache.set(cache_key, ad_dict, 3600)  # 3600 seconds = 1 hour
    
    return {'ads': ad_dict}


def posts_context_processor(request):
    
    categories = Category.objects.all()
    recent_posts = Post.objects.filter(status='published').exclude(image='').order_by('-created_at')[:5]

    return {
        'categories' : categories,
        'recent_posts' : recent_posts
    }