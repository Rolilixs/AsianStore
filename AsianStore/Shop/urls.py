from django.urls import path
from .api.views import *

urlpatterns = [
    path('category/', CategoryListView.as_view()),
    path('payment_type/', PaymentTypeListView.as_view()),
    path('delivery_type/', DeliveryTypeListView.as_view()),
    path('products/', ProductsByCategoryListView.as_view()),
    path('login/', login),
    path('register/', register),
    path('profile_data/', ProfileData.as_view())
]
