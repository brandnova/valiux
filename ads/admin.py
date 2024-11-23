from django.contrib import admin
from .models import Ad

@admin.register(Ad)
class AdAdmin(admin.ModelAdmin):
    list_display = ('location', 'start_date', 'end_date', 'active')
    list_filter = ('location', 'active', 'start_date', 'end_date')
