from django.core.management.base import BaseCommand
from django.utils.timezone import now
from posts.models import Post

class Command(BaseCommand):
    help = 'Automatically publish scheduled posts'

    def handle(self, *args, **kwargs):
        posts_to_publish = Post.objects.filter(
            status='draft', published_date__lte=now()
        )
        for post in posts_to_publish:
            post.status = 'published'
            post.save()
            self.stdout.write(self.style.SUCCESS(f"Published post: {post.title}"))
