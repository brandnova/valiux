from django.contrib import admin
from .models import Category, Genre, Post, Series, PostView, Reaction, Comment, Bookmark


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    list_display = ('title', 'category', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('category',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_at', 'views')
    list_filter = ('status', 'category', 'created_at')
    search_fields = ('title', 'author__username', 'seo_title', 'meta_keywords')
    prepopulated_fields = {'slug': ('title',)}
    autocomplete_fields = ['category', 'genres']
    readonly_fields = ('views', 'created_at', 'updated_at')
    fieldsets = (
        ('Content Details', {'fields': ('title', 'slug', 'author', 'image', 'content', 'excerpt')}),
        ('Classification', {'fields': ('category', 'tag', 'genres', 'series', 'episode_number')}),
        ('Publishing', {'fields': ('status', 'allow_comments', 'published_date')}),
        ('SEO Settings', {'fields': ('seo_title', 'meta_description', 'meta_keywords')}),
        ('Statistics', {'fields': ('views', 'created_at', 'updated_at',)}),
    )


@admin.register(PostView)
class PostViewAdmin(admin.ModelAdmin):
    list_display = ('post', 'ip_address', 'viewed_at')
    search_fields = ('post__title', 'ip_address')
    list_filter = ('viewed_at',)


@admin.register(Reaction)
class ReactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'reaction_type', 'created_at')
    list_filter = ('reaction_type',)
    search_fields = ('user__username', 'post__title')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'comment', 'created_at', 'approved')
    list_filter = ('approved', 'created_at')
    search_fields = ('user__username', 'post__title', 'comment')
    autocomplete_fields = ['post', 'user']
    list_editable = ('approved',)


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'post')
    search_fields = ('user__username', 'post__title')
