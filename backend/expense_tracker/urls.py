from django.urls import path
from . import views

urlpatterns = [
    # path('',views.index, name = 'index'),
    path('add_expense/', views.add_expense, name='add_expense'),
    path('get_expenses/', views.get_expenses, name='get_expenses'),
    path('delete_expense/', views.delete_expense, name='delete_expense'),
]