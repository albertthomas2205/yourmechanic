from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
  
    path("register/", views.RegisterView.as_view(), name="user-register"),
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
    path("mechanics/",views.MechanicListView.as_view(),name='mechanics')
  
    
  
   
 
]
