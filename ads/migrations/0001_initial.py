# Generated by Django 5.0.7 on 2024-08-12 23:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('active', models.BooleanField(default=True)),
                ('location', models.CharField(max_length=100)),
            ],
        ),
    ]
