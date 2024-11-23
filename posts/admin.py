from django.contrib import admin
from .models import Post, Category, Reaction, Comment, Bookmark

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_at', 'published_date', 'views', 'allow_comments')
    list_filter = ('status', 'created_at', 'published_date', 'author')
    search_fields = ('title', 'content', 'seo_title', 'meta_description', 'meta_keywords')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'
    ordering = ('status', 'published_date')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'author', 'category', 'tags')
        }),
        ('Content', {
            'fields': ('content', 'excerpt', 'image')
        }),
        ('Publishing Options', {
            'fields': ('status', 'published_date', 'created_at', 'updated_at', 'views', 'allow_comments')
        }),
        ('SEO Settings', {
            'fields': ('seo_title', 'meta_description', 'meta_keywords')
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'views')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'created_at', 'updated_at')
    list_filter = ('parent', 'created_at', 'updated_at')
    search_fields = ('name', 'slug', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['name']

    fieldsets = (
        ('Category Information', {
            'fields': ('name', 'slug', 'description', 'parent', 'image')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )

    readonly_fields = ('created_at', 'updated_at')


@admin.register(Reaction)
class ReactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'reaction_type', 'created_at')
    list_filter = ('reaction_type', 'created_at')
    search_fields = ('user__username', 'post__title', 'reaction_type')
    date_hierarchy = 'created_at'

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'name', 'email', 'approved', 'created_at', 'updated_at')
    list_filter = ('approved', 'created_at', 'updated_at', 'post')
    search_fields = ('name', 'email', 'comment', 'post__title')
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(approved=True)
    approve_comments.short_description = "Approve selected comments"

@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'post')
    list_filter = ('user', 'post')
    search_fields = ('user__username', 'post__title')