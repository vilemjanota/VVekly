from django.urls import path
from . import views

urlpatterns = [
    path('habits/', views.HabitListCreateView.as_view(), name='habit-list'),
    path('habits/delete/<int:pk>/', views.HabitDeleteView.as_view(), name='habit-delete'),
]