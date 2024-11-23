from django.db import models
from django.contrib.auth.models import User
from django_ckeditor_5.fields import CKEditor5Field
from django.core.exceptions import ValidationError

class SocialMediaLink(models.Model):
    platform = models.CharField(max_length=20)
    url = models.URLField()
    icon_class = models.CharField(max_length=50, help_text="Bootstrap icon class") 

    def __str__(self):
        return self.platform

class SiteSettings(models.Model):
    site_name = models.CharField(max_length=100)
    site_description = models.TextField()
    favicon = models.ImageField(upload_to='Site_images/', null=True, blank=True)
    logo = models.ImageField(upload_to='Site_images/', null=True, blank=True)
    address = models.CharField(max_length=255, null=True)
    contact_email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    social_media_links = models.ManyToManyField(SocialMediaLink, blank=True)

    # Meta Tags Fields
    meta_keywords = models.CharField(max_length=255, help_text="Comma-separated SEO keywords for the site")
    meta_description = models.CharField(max_length=255, help_text="Meta description for the site")
    meta_author = models.CharField(max_length=100, help_text="Author of the site content")

    # Open Graph Tags
    og_title = models.CharField(max_length=255, help_text="Open Graph title for the site")
    og_description = models.CharField(max_length=255, help_text="Open Graph description for the site")
    og_image = models.ImageField(upload_to='meta_images/', blank=True, null=True, help_text="Open Graph image for the site")
    og_url = models.URLField(help_text="Open Graph URL for the site")

    def save(self, *args, **kwargs):
        if not self.pk and SiteSettings.objects.exists():
            raise ValidationError('There is already an existing SiteSettings instance. Only one instance is allowed.')
        super(SiteSettings, self).save(*args, **kwargs)

    def __str__(self):
        return self.site_name
    

class StaticPage(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = CKEditor5Field('Content', config_name='default')

    def __str__(self):
        return self.title