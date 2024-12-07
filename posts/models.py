from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now
from django.contrib.auth.models import User
from django_ckeditor_5.fields import CKEditor5Field

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, max_length=100)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, related_name='subcategories', blank=True, null=True
    )

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    TAG_CHOICES = [
        ('popular', 'Popular'),
        ('trending', 'Trending'),
        ('latest', 'Latest'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    content = CKEditor5Field('Content', config_name='default')
    excerpt = models.TextField(blank=True, null=True, help_text="Do not start the excerpt with a symbol or punctuation (Always a text)")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, null=True, related_name='posts')
    tag = models.CharField(max_length=10, choices=TAG_CHOICES, blank=True, null=True, help_text="Choose a tag for the post.")
    genres = models.ManyToManyField(Genre, related_name='posts', blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    allow_comments = models.BooleanField(default=True, help_text="Allow Commenting on this post?")
    views = models.PositiveIntegerField(default=0)
    published_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    seo_title = models.CharField(max_length=255, blank=True, null=True)
    meta_description = models.CharField(max_length=160, blank=True, null=True)
    meta_keywords = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Posts"
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['status', 'published_date']),
        ]

    def get_og_title(self):
        """Returns the Open Graph title, prioritizing the SEO title."""
        return self.seo_title or self.title

    def get_meta_description(self):
        """Returns the meta description, prioritizing the meta field, then excerpt."""
        return self.meta_description or self.excerpt or self.content[:160]

    def get_meta_keywords(self):
        """Returns the meta keywords."""
        return self.meta_keywords

    def get_absolute_url(self):
        """Returns the full URL for the post."""
        from django.urls import reverse
        return reverse('post_detail', args=[self.slug])

    def __str__(self):
        return self.title
    
    # Custom helper method for auto-post publication.
    def check_and_publish(self):
        """Update post status to 'Published' if the published_date has passed."""
        if self.published_date and self.published_date <= now():
            self.status = 'published'
            self.save()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Reaction(models.Model):
    REACTION_CHOICES = [
        ('like', 'Like'),
        ('love', 'Love'),
        ('laugh', 'Laugh'),
        ('surprise', 'Surprise'),
        ('sad', 'Sad'),
        ('dislike', 'Dislike'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reactions')
    post = models.ForeignKey(Post, related_name='reactions', on_delete=models.CASCADE)
    reaction_type = models.CharField(max_length=10, choices=REACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post', 'reaction_type')

    def __str__(self):
        return f'{self.user.username} reacted {self.reaction_type} to {self.post.title}'


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField()
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=True)

    def __str__(self):
        return f'Comment by {self.user} on {self.post}'


class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='bookmarked_by')

    def __str__(self):
        return f'{self.user.username} bookmarked {self.post.title}'
