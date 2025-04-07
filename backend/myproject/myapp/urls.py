from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    
    path('', views.home, name='home'),
    path('home/', views.home, name='home'),
    path('hello/', views.hello, name='hello'),
    path('image/', views.upload_image, name='image'),
    path('create-user/',views.create_user,name='create-user'),
    path('receive-register-info/',views.receive_register_info,name='receiveRegisterInfo'),
    path('confirm-login-info/',views.confirm_login_info,name='confirmLoginInfo'),
    path('blogs/',views.getBlogs,name='blogs'),
    path('appointments/',views.get_appointments,name='getAppointments'),
    path('book-appointment/<int:pk>/',views.book_appointments,name='bookAppointments'),
    path('check-existence/',views.check_existance_HCN,name='checkExistence'),
    path('send-otp/',views.send_otp_email,name='sendOTP'),
    path('token/', views.get_token, name='get-token'),  # Token generation endpoin
    path('profile/', views.get_profile_info, name='get-profile'),  
    path('user-info/', views.get_user_info, name='get-user-info'),  
    path('update-user/', views.update_user, name='update-user-info'),  
    path("upload-pfp/", views.upload_profile_picture, name="upload-profile-picture"),
    path("get-pfp/", views.get_user_profile, name="get-profile-picture"),
    path("get-products/", views.get_products, name="get-products"),
    path("add-to-cart/", views.add_to_cart, name="add-to-cart"),
    path("get-cart-items/", views.get_cart_items, name="get-cart-items"),
    path("remove-cart-item/", views.remove_cart_item, name="remove-cart-items"),
    path("buy-cart-item/", views.buy_cart_item, name="buy-cart-items"),
    path('blogs/<int:pk>/', views.update_bookmark, name='update_bookmark'),


]
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
