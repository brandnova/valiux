# Generated by Django 5.0.7 on 2024-12-10 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='agree_to_terms',
            field=models.BooleanField(default=False),
        ),
    ]
