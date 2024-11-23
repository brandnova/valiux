from django.urls import path
from .views import *
from posts import views

urlpatterns = [
    path('', home, name='index'),
]
