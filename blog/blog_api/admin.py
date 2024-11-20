# blog_api/admin.py

from django.contrib import admin
from .models import UserProfile, Category, Tag, Post, PostView, Comment, Reaction

# Inline admin classes for related models
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'User Profile'


class PostViewInline(admin.TabularInline):
    model = PostView
    extra = 0
    readonly_fields = ('ip_address', 'created_at', 'user')
    can_delete = False


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0
    fields = ('author', 'content', 'created_at')
    readonly_fields = ('created_at',)


class ReactionInline(admin.TabularInline):
    model = Reaction
    extra = 0
    readonly_fields = ('user', 'reaction_type', 'created_at')


# Model admin classes for main models
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'website')
    search_fields = ('user__username', 'bio', 'website')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('-created_at',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'is_featured', 'published_date', 'views_count')
    list_filter = ('status', 'is_featured', 'created_at', 'updated_at')
    search_fields = ('title', 'author__username', 'content')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at', 'views_count', 'read_time')
    ordering = ('-created_at',)
    inlines = [CommentInline, ReactionInline, PostViewInline]
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'author', 'category', 'tags', 'status', 'is_featured')
        }),
        ('Content', {
            'fields': ('content', 'excerpt', 'meta_description', 'featured_image')
        }),
        ('Publishing Information', {
            'fields': ('created_at', 'updated_at', 'published_date', 'views_count', 'read_time')
        }),
    )


@admin.register(PostView)
class PostViewAdmin(admin.ModelAdmin):
    list_display = ('post', 'ip_address', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('post__title', 'ip_address', 'user__username')
    readonly_fields = ('post', 'ip_address', 'user', 'created_at')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'content', 'created_at')
    list_filter = ('created_at', 'author')
    search_fields = ('post__title', 'author__username', 'content')
    ordering = ('-created_at',)


@admin.register(Reaction)
class ReactionAdmin(admin.ModelAdmin):
    list_display = ('post', 'user', 'reaction_type', 'created_at')
    list_filter = ('reaction_type', 'created_at')
    search_fields = ('post__title', 'user__username', 'reaction_type')
    ordering = ('-created_at',)


# Adding UserProfile as an inline in the User model
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

class CustomUserAdmin(UserAdmin):
    inlines = [UserProfileInline]

# Re-register the User model with the inline UserProfile
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
