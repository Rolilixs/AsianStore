from django.urls import path
from .api.views import *

urlpatterns = [
    path('category/', CategoryListView.as_view()),

    path('products/<int:category_id>', ProductsListView.as_view()),
    path('product/<int:pk>', ProductDetailsView.as_view()),
    path('product_photos/<int:product_id>', ProductPhotosListView.as_view()),

    path('dbusket/', DBusketAPI.as_view()),
    path('favourites/<int:product_id>', FavouritesCreateDestroyView.as_view()),
    path('favourites/', FavouritesListView.as_view()),


    path('payment_type/', PaymentTypeListView.as_view()),
    path('delivery_type/', DeliveryTypeListView.as_view()),

    # USER ZONE
    path('login/', login),
    path('register/', register),
    path('profile_data/', ProfileDataAPI.as_view()),
]
