from django.urls import path
from . import views

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
]
