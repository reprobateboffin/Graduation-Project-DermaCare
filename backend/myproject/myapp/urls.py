from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home/', views.home, name='home'),
    path('hello/', views.hello, name='hello'),
    path('image/', views.upload_image, name='image'),
    path('create-user/',views.create_user,name='create-user'),
    path('receive-register-info/',views.receive_register_info,name='receiveRegisterInfo'),
]
