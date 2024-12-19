import os
from PIL import Image
from io import BytesIO
from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now
from django.contrib.auth.models import User
from django_ckeditor_5.fields import CKEditor5Field
from django.core.files.uploadedfile import InMemoryUploadedFile


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
    

class Series(models.Model):
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, max_length=255)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='series', null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='series')
    image = models.ImageField(upload_to='series_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Series"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        """Returns the full URL for the series."""
        from django.urls import reverse
        return reverse('series_detail', args=[self.slug])

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
    series = models.ForeignKey(Series, on_delete=models.CASCADE, related_name='posts', blank=True, null=True, help_text="Select a series if this post belongs to one.")
    episode_number = models.PositiveIntegerField(blank=True, null=True, help_text="Episode number in the series, if applicable.")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    allow_comments = models.BooleanField(default=True, help_text="Allow Commenting on this post?")
    views = models.PositiveIntegerField(default=0)
    published_date = models.DateTimeField(blank=True, null=True, help_text="Schedule published date.")
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

    def save(self, *args, **kwargs):
        # Convert image to WebP format if present
        if self.image:
            self.image = self.convert_to_webp(self.image)
        # Automatically generate slug if missing
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def convert_to_webp(self, image):
        """Converts the given image to WebP format."""
        # Open the image using Pillow
        img = Image.open(image)
        img_format = img.format

        # Only convert if it's not already WebP
        if img_format != 'WEBP':
            output = BytesIO()
            img = img.convert("RGB")  # Ensure the image is in RGB mode
            webp_filename = f"{os.path.splitext(image.name)[0]}.webp"

            # Save the image in WebP format
            img.save(output, format='WEBP', quality=80)
            output.seek(0)

            # Replace the uploaded image file with the new WebP image
            return InMemoryUploadedFile(
                output,
                'ImageField',
                webp_filename,
                'image/webp',
                output.getbuffer().nbytes,
                None
            )
        return image

    def get_absolute_url(self):
        """Returns the full URL for the post."""
        from django.urls import reverse
        return reverse('post_detail', args=[self.slug])

    def __str__(self):
        return self.title


class PostView(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='post_views')  
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True, null=True)
    viewed_at = models.DateTimeField(default=now)

    class Meta:
        unique_together = ('post', 'ip_address')  # Prevent duplicate views from the same IP on the same post
        indexes = [
            models.Index(fields=['post', 'ip_address']),
        ]

    def __str__(self):
        return f"View on {self.post.title} from {self.ip_address}"
    



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
