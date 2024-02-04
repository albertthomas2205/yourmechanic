from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
  
    path("register/", views.RegisterView.as_view(), name="user-register"),
    path("adminregister/", views.AdminRegisterVieww.as_view(), name="user-register"),
    path("login/", views.LoginView.as_view(), name="user-login"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('otp/', views.OtpRequestView.as_view(), name='otp_view'),
    path('googlelogin/',views.GoogleLoginAndRegisterView.as_view(),name='googlelogin'),
    path('block-user/', views.block_user, name='block_user'),
    path('block-mechanic/',views.block_mechanic,name='block_mechanic'),
    path("users/",views.CustomUserListView.as_view(), name='users'),
    path("mechanic_register/",views.MechanicRegisterView.as_view(),name='mechanic_register'),
    path('adminlogin/',views.LoginAdminView.as_view(),name='adminview'),
    path('mechaniclogin/',views.LoginMechanicView.as_view(),name = 'mechaniclogin'),
    path('check_email/',views.EmailCheckView.as_view(),name='check_email'),
    path('check_useremail/',views.EmailCheckUserView.as_view(),name='check_useremail'),
    path("mechanics/",views.MechanicListView.as_view(),name='mechanics'),
    path('profiles/', views.UserProfileListCreateView.as_view(), name='profile-list-create'),
    path('userprofile/<int:user_id>/', views.UserProfileDetailView.as_view(), name='user-profile-detail'),
    path('user-vehicles/', views.UserVehiclesListCreateView.as_view(), name='user-vehicles-list-create'),
    path('user-vehicles/<int:user_id>/', views.UserVehiclesListAPIView.as_view(), name='user-vehicles-list'),
    path('user-vehicle-update/<int:pk>/', views.user_vehicles_detail, name='user-vehicles-list'),
    path('mechanic-profiles/', views.MechanicProfileListCreateView.as_view(), name='mechanic-profile-list-create'),
    path('mechanic-profile-detail/<int:mechanic_id>/', views.mechanic_profile_detail, name='mechanic-profile-list-create'),
    # path('mechanic-profiles/<int:pk>/', views.MechanicProfileRetrieveUpdateDestroyView.as_view(), name='mechanic-profile-retrieve-update-destroy'),
    # path('mechanic-profile-details/<int:pk>/',views.MechanicProfiledetailsUpdateView.as_view(), name='mechanic-profile-details-update'),
    path('mechanic-profile/<int:mechanic_id>/', views.MechanicProfileDetailView.as_view(), name='mechanic-profile-list-create'),
    path('verify-mechanic/',views.verify_mechanic,name='verify_mechanic'),
    path('verify-mechaniclist/',views.VerifyView.as_view(),name='verify_mech'),
    # path('verify-view-search/', views.VerifyViewsearch.as_view(), name='verify_view_search'),
    path('bookings/', views.BookingListCreateView.as_view(), name='booking-list-create'),
    path('is-mechanic-available/', views.IsMechanicAvailableView.as_view(), name='is-mechanic-available'),
#   path('api/mechanic-profile-search/<str:place>/', views.MechanicProfileSearchView.as_view(), name='mechanic_profile_search'),
    path('mechanic-place-search/', views.MechanicPlaceSearch, name='mechanic_profile_search'),

    
    
     path('details/', views.UserAndVehicleDetailsAPIView.as_view(), name='user_and_vehicle_details'),
     path('userdetails/', views.UserDetailsAPIView.as_view(), name='user_and_vehicle_details'),
    
    
    
  
   
 
]
