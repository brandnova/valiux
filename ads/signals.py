from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Ad

@receiver([post_save, post_delete], sender=Ad)
def invalidate_ad_cache(sender, instance, **kwargs):
    cache.delete('active_ads')