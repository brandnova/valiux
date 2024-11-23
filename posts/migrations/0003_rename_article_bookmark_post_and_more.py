# Generated by Django 5.0.7 on 2024-08-20 17:28

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_comment_parent'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='bookmark',
            old_name='article',
            new_name='post',
        ),
        migrations.RenameField(
            model_name='comment',
            old_name='article',
            new_name='post',
        ),
        migrations.RenameField(
            model_name='reaction',
            old_name='article',
            new_name='post',
        ),
        migrations.AlterUniqueTogether(
            name='reaction',
            unique_together={('user', 'post', 'reaction_type')},
        ),
    ]