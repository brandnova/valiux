from PIL import Image
from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User
from taggit.managers import TaggableManager
from django_ckeditor_5.fields import CKEditor5Field
import os
from django.core.files.base import ContentFile
from io import BytesIO

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, max_length=100)
    description = models.TextField(blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='subcategories', blank=True, null=True)
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = CKEditor5Field('Content', config_name='default')
    excerpt = models.TextField(blank=True, null=True)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)
    tags = TaggableManager(blank=True)
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    views = models.PositiveIntegerField(default=0)
    published_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    allow_comments = models.BooleanField(default=True)
    seo_title = models.CharField(max_length=255, blank=True, null=True)
    meta_description = models.CharField(max_length=160, blank=True, null=True)
    meta_keywords = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ['-published_date']
        verbose_name_plural = "Posts"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Auto-generate slug if not provided
        if not self.slug:
            self.slug = slugify(self.title)
        
        # Save the instance first to ensure the image file is available
        super().save(*args, **kwargs)

        # Resize the image if one is uploaded
        if self.image:
            self.resize_image()

    def resize_image(self, target_width=900, target_height=571):
        """
        Resize image with precise handling
        """
        try:
            # Open the image file
            with Image.open(self.image.path) as img:
                # Convert to RGB mode to ensure compatibility
                if img.mode != 'RGB':
                    img = img.convert('RGB')

                # Calculate resize dimensions while maintaining aspect ratio
                img.thumbnail((target_width, target_height), Image.LANCZOS)

                # Create a new image with exact target dimensions
                output_img = Image.new('RGB', (target_width, target_height), (255, 255, 255))
                
                # Calculate position to center the image
                paste_x = (target_width - img.width) // 2
                paste_y = (target_height - img.height) // 2
                
                # Paste the resized image onto the white background
                output_img.paste(img, (paste_x, paste_y))

                # Save the resized image
                buffer = BytesIO()
                output_img.save(buffer, format='JPEG', quality=85)
                buffer.seek(0)

                # Save the image
                self.image.save(
                    os.path.basename(self.image.name), 
                    ContentFile(buffer.read()), 
                    save=False
                )

        except Exception as e:
            print(f"Error resizing image: {e}")

class Reaction(models.Model):
    REACTION_CHOICES = [
        ('like', 'Like'),
        ('love', 'Love'),
        ('laugh', 'Laugh'),
        ('surprise', 'Surprise'),
        ('sad', 'Sad'),
        ('dislike', 'Dislike'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='reactions', on_delete=models.CASCADE)
    reaction_type = models.CharField(max_length=10, choices=REACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post', 'reaction_type')

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    comment = models.TextField()
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved = models.BooleanField(default=False)
    
    def __str__(self):
        return f'Comment by {self.name} on {self.post}'
 

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='bookmarked_by')

    def __str__(self):
        return f'{self.user.username} bookmarked {self.post.title}'