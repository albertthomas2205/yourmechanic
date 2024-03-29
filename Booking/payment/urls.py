from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
      path('test-payment/', views.test_payment, name='test_payment'),
      path('checkout-session/', views.StripeCheckoutView.as_view(), name='check-payment'),
      path('checkout-sessionn/', views.StripeCheckoutVieww.as_view(), name='check-payment'),
      path('pay/', views.start_payment, name="payment"),
      path('paymentsuccess/', views.handle_payment_success, name="payment_success"),
      path("order/",views.CreateOrderAPIview.as_view(),name="create_order"),
      path("complete/",views.TransactionAPIView.as_view(),name="complete"),
      path('process-payment-response/', views.process_payment_response, name='process_payment_response'),
      path('reviews/', views.ReviewListCreateView.as_view(), name='review-list-create'),
      # path('reviews/<int:pk>/', views.ReviewDetailView.as_view(), name='review-detail'),
      path('reviews/<int:mechanic_id>/', views.ReviewListView.as_view(), name='review-list-create'),
      path('averagerating/<int:mechanic_id>/', views.AverageRatingView.as_view(), name='average_rating'),
]