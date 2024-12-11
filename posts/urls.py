from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.post_list, name='post_list'),
    path('series/', views.series_list, name='series_list'),
    path('series/<slug:slug>/', views.series_detail, name='series_detail'),
    path('<slug:slug>/', views.post_detail, name='post_detail'),
    path('<slug:slug>/comment/add/', views.add_comment, name='add_comment'),
    path('<slug:slug>/react/<str:reaction_type>/', views.add_reaction, name='add_reaction'),
    path('<slug:slug>/bookmark/', views.toggle_bookmark, name='toggle_bookmark'),
]