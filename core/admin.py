# core/admin.py

from django.contrib import admin
from .models import SiteSettings, StaticPage, SocialMediaLink

@admin.register(SocialMediaLink)
class SocialMediaLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url', 'icon_class')

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'contact_email', 'phone_number', 'meta_keywords', 'meta_description', 'meta_author')

    # Organizing fields in fieldsets
    fieldsets = (
        (None, {
            'fields': ('site_name', 'site_description', 'favicon', 'logo', 'address', 'contact_email', 'phone_number', 'social_media_links')
        }),
        ('Meta Tags', {
            'fields': ('meta_keywords', 'meta_description', 'meta_author')
        }),
        ('Open Graph Tags', {
            'fields': ('og_title', 'og_description', 'og_image', 'og_url')
        }),
    )

    # Prevent the addition of more than one SiteSettings instance
    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    # Optionally, prevent deletion of the SiteSettings instance
    def has_delete_permission(self, request, obj=None):
        return False  # Prevent deletion of the SiteSettings instance

    # Redirect to the change page if there's already a SiteSettings instance
    def changelist_view(self, request, extra_context=None):
        settings = SiteSettings.objects.first()
        if settings:
            return self.change_view(request, object_id=str(settings.pk), extra_context=extra_context)
        return super().changelist_view(request, extra_context=extra_context)

@admin.register(StaticPage)
class StaticPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ['title', 'content']

