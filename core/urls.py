from django.urls import path
from .views import *
from posts import views

urlpatterns = [
    path('', home, name='index'),
    # path('load-more-posts/', load_more_posts, name='load_more_posts'),
    path('<slug:slug>/', StaticPageDetailView.as_view(), name='static_page_detail'),
]
