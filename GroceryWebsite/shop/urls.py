from unicodedata import name
from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name="index"),
    path('product/<int:id>',views.ProductView,name='ProductView'),
    path('categories/<int:id>',views.Category,name='category'),
    path('cart',views.Cart,name='cart'),
    path('search',views.search,name='search'),
    path('checkout',views.Checkout,name='checkout')
]

