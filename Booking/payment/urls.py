from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
      path('test-payment/', views.test_payment, name='test_payment'),
            path('checkout-session/', views.StripeCheckoutView.as_view(), name='check-payment'),
]