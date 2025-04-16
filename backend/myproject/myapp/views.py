import datetime
import datetime
import json
import logging
import random
from venv import logger
from django.shortcuts import render
from jsonschema import ValidationError
from .models import Blog, User, UserProfile
import tensorflow as tf
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from io import BytesIO
import base64
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from django.http import JsonResponse, HttpResponse
from .utils import predict_image
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Appointments
from .serializers import AppointmentSerializer
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Products
from .models import Cart
from .serializers import ProductSerializer
from .serializers import CartSerializer
from .serializers import InvoiceSerializer
from .models import Invoice
from .serializers import BlogSerializer
from rest_framework_simplejwt.views import TokenRefreshView
# Define class labels
label_mapping = {
    0: 'nv',
    1: 'mel',
    2: 'bkl',
    3: 'bcc',
    4: 'akiec',
    5: 'vasc',
    6: 'df'
}


# with open("C:\Users\muham\Documents\PracticingDjangowithAI\myproject\myapp\templates\ham1000_chat.json", "r") as file:
#     data = json.load(file)


# Load the model once (to avoid reloading on every request)
MODEL_PATH = r'C:/Users/muham/Documents/Skin Disease Model/v3p2.h5'
model = load_model(MODEL_PATH)

# def preprocess_image(img_path, target_size=(56, 56)):
#     """
#     Loads and preprocesses an image for prediction.
#     """
#     img = image.load_img(img_path, target_size=target_size)
#     img_array = image.img_to_array(img)
#     img_array = img_array / 255.0  # Normalize (assuming your model was trained this way)
#     img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions for batch size
#     return img_array

# def home(request):
#     """
#     Handles image classification requests.
#     """
#     try:
#         img_path = r'C:\Users\muham\Documents\HAM1000\HAM10000_images_part_2\ISIC_0029306.jpg'  # Replace with actual path
#         img_array = preprocess_image(img_path)

#         # Make prediction
#         prediction = model.predict(img_array)
#         predicted_class = np.argmax(prediction, axis=1)[0]
#         predicted_label = label_mapping.get(predicted_class)

#         return JsonResponse({'prediction': predicted_label})
    
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)


def simple_api(request):
    return JsonResponse({"1":"this is a simple jason im sending sir"})

def home(request):
    return HttpResponse("home")



@api_view(['GET'])
def getBlogs(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True, context={'request': request})  # <--- key part here
    print(serializer.data)
    return Response({'blogs': serializer.data})


@api_view(['PATCH'])
def update_bookmark(request, pk):
    try:
        blog = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response({'error': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

    # Update the bookmarked status from the request data
    bookmarked = request.data.get('bookmarked', blog.bookmarked)
    blog.bookmarked = bookmarked
    blog.save()

    # Return updated blog data
    serializer = BlogSerializer(blog)
    return Response(serializer.data)


@csrf_exempt  # Temporarily disable CSRF for this view (not recommended in production)
def hello(request):
    global messageToShow
    if request.method == "POST":
        print(f"Received data: {request.body}")
        try:
            data = json.loads(request.body.decode("utf-8"))
            message = data.get('message','')
            messageToShow.append(message)
            return JsonResponse({"message": f"Received: {data.get('message')} message received"})
        except json.JSONDecodeError as e:
            return JsonResponse({"error": "Invalid JSON"})

messageToShow = []
@csrf_exempt  # Disable CSRF for testing (not safe for production)
def upload_image(request):
    if request.method == "POST":
        try:
           data = json.loads(request.body)
           base64_string = data.get("message")
           print(len(base64_string))

           if not base64_string:
               return JsonResponse({"error sir": "No Image provider sir"})
           
           else:
                # image_data = base64.b64decode(base64_string)
                # print(f'decoded image data length: {len(image_data)}')

                # image = Image.open(BytesIO(image_data))
                # image.save("test_image.jpg")  
                # img_array = np.array(image)
                # print(img_array.shape)
                result = predict_image(base64_string,MODEL_PATH)
                return JsonResponse(result)

                return JsonResponse({"message": "Image Received", "shape": list(img_array.shape) })
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request"}, status=400)


# def chatbot_response(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             question = data.get("message")
#             return JsonResponse({"message": question})


#         except Exception as e :
#             return JsonResponse({"an exception occured" : e })

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt  # Temporarily disable CSRF for this view (not recommended in production)
@api_view(['POST'])

def receive_register_info(request):

    if request.method == "POST":
        print(f"received {request.body}")
        health_care_number = request.data.get("HealthCareNumber","")
        if User.objects.filter(HealthCareNumber=health_care_number).exists():
            return Response({"message":"Already Exists"},status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response({"message":"Registered Successfully"}, status=status.HTTP_201_CREATED)
            # return JsonResponse({"message": f"Received: {data.get('firstName')} message received"})
        print(f"Validation errors: {serializer.errors}")  # Log the errors

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  

@csrf_exempt  # Temporarily disable CSRF for this view (not recommended in production)
def confirm_login_info(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            HealthCareNumber = data.get("HealthCareNumber")
            user = User.objects.filter(HealthCareNumber=HealthCareNumber).first()
            if user:
                return JsonResponse({"firstName": user.FirstName})
            # exists = User.objects.filter(HealthCareNumber=HealthCareNumber).exists()
            else:
                return JsonResponse({"error sir": "error"})

            # return JsonResponse({"exists":exists})

        except json.JSONDecodeError :
            return JsonResponse({"error": "Invalid Json"})
    return JsonResponse({"error": "Invalid request"}, status=400)



@csrf_exempt
def check_existance_HCN(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))  # Decode request body
            health_card_number = data.get("healthCareNumber")  # Use `.get()` to prevent KeyError
            
            if not health_card_number:  # Check if it's empty
                return JsonResponse({"error": "healthCareNumber is required"}, status=400)

            # Check if user exists in the database
            user_exists = User.objects.filter(HealthCareNumber=health_card_number).exists()

            if user_exists:
                return JsonResponse({"message": "Already Exists"}, status=200)
            else:
                return JsonResponse({"message": "NotRegistered"}, status=404)

        except json.JSONDecodeError:  # Catch JSON errors
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": "Server error"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
  


@api_view(['GET'])
def get_appointments(request):
    appointments = Appointments.objects.all()
    serializer_data = AppointmentSerializer(appointments,many=True)
    print(serializer_data)
    return Response(serializer_data.data)


@csrf_exempt
@api_view(['POST'])
def get_profile_info(request):
    try:
        data = request.data  # Use DRF's request parser
        health_card_number = data.get('healthCardNumber')

        if not health_card_number:
            return Response({'error': 'Health card number is required'}, status=400)

        user = User.objects.filter(HealthCareNumber=health_card_number).first()  # Use filter() + first() to avoid exceptions

        if not user:
            return Response({'error': 'User not found'}, status=404)

        serializer = UserSerializer(user, context={'request': request})  # No need for `many=True` since only one object is returned
        print(f'{serializer}is SERIALIZER wIth pfp {serializer.get_profile_picture}')
        return Response(serializer.data)

    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
def book_appointments(request,pk):
    try:
        data = json.loads(request.body.decode("utf-8"))
        health_card_number = data.get('healthCardNumber')
        user = User.objects.get(HealthCareNumber=health_card_number)

        print(health_card_number)

        appointment = Appointments.objects.get(id=pk)
        appointment.healthCardNumber = user
        appointment.booked = True

        appointment.save()

        return Response({"message": "Appointment successfully booked"})
    except Appointments.DoesNotExist:
        return Response({"message": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")  # Log the error message
        return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def generate_otp():
    return str(random.randint(10, 99))

@csrf_exempt
def send_otp_email(request):
    if request.method == "POST":
        data = json.loads(request.body)
        HealthCareNumber = data.get("HealthCareNumber")
        user = User.objects.filter(HealthCareNumber=HealthCareNumber).first()
        user_email = (user.Email)
        subject = 'Test Email'
        message = generate_otp()
        recipient_list = [user_email]  # Replace with a valid email address
        send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list)
        return JsonResponse({"message":message})
    

@api_view(['POST'])
def get_token(request):
    health_card_number = request.data.get('healthCardNumber')

    if not health_card_number:
        return Response({"error": "Health card number is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Find the user by their health card number
        user = User.objects.get(HealthCareNumber=health_card_number)
        
        # Generate the JWT token for the user
        refresh = RefreshToken.for_user(user)
        refresh["healthCardNumber"] = user.HealthCareNumber

        access_token = str(refresh.access_token)

        return Response({'token': access_token,
                         'refresh': str(refresh)
                         }, status=status.HTTP_200_OK)



    except User.DoesNotExist:
        return Response({'error': 'User with provided health card number not found'}, status=status.HTTP_400_BAD_REQUEST)
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def refresh_token(request):
    refresh_token = request.data.get('refresh')
    
    if not refresh_token:
        return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)
        
        return Response({
            'token': access_token,
            'refresh': str(refresh)  # Optional: return a new refresh token if you want to rotate tokens
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])

def get_user_info(request):
    try:
        data = request.data
        healthCardNumber = data.get('healthCardNumber')
        if not healthCardNumber:
            return Response({"error":"cant find number"},status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.filter(HealthCareNumber=healthCardNumber).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


    except Exception as e:
        return Response({"error":"an error as occured"}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT'])
# @csrf_exempt
# def update_user(request):
#     if request.method == "PUT":
#         try:
#             data = json.loads(request.body)
#             health_card_number = data.get("HealthCareNumber")
#             print(health_card_number)
#             try:
#                 user = User.objects.get(HealthCareNumber=health_card_number)
#                 serializer = UserSerializer(user, data=data, partial=True)
#                 if serializer.is_valid():
#                     serializer.save()
#                     return JsonResponse(serializer.data, status=200)
#                 return JsonResponse(serializer.errors, status=400)
#             except User.DoesNotExist:
#                 return JsonResponse({"error": "User not found"}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({"error": "Invalid JSON"}, status=400)
#     return JsonResponse({"error": "Method not allowed"}, status=405)


# @csrf_exempt
# def update_user(request):
#     if request.method == "PUT":
#         try:
#             # Get health card number from request
#             health_card_number = request.POST.get("HealthCareNumber")
#             if not health_card_number:
#                 return JsonResponse(
#                     {"error": "HealthCareNumber is required"},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )

#             # Get the user profile using the health card number from User model
#             user_profile = UserProfile.objects.get(user__HealthCareNumber=health_card_number)
#             user = user_profile.user

#             # Update fields if provided
#             user.first_name = request.POST.get("FirstName", user.first_name)
#             user.last_name = request.POST.get("LastName", user.last_name)
#             user.email = request.POST.get("Email", user.email)
#             user.phone_number = request.POST.get("PhoneNumber", user.phone_number)
#             # Add other fields as needed
#             user.clinic = request.POST.get("Clinic", user.clinic)
#             user.date_of_birth = request.POST.get("DateOfBirth", user.date_of_birth)
#             user.preference = request.POST.get("Preference", user.preference)

#             # Handle profile picture
#             if "profile_picture" in request.FILES:
#                 user_profile.profile_picture = request.FILES["profile_picture"]

#             # Save both models
#             user.save()
#             user_profile.save()

#             return JsonResponse(
#                 {"message": "Profile updated successfully"},
#                 status=status.HTTP_200_OK
#             )

#         except ObjectDoesNotExist:
#             return JsonResponse(
#                 {"error": "User not found"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         except Exception as e:
#             return JsonResponse(
#                 {"error": str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
#     else:
#         return JsonResponse(
#             {"error": "Method not allowed"},
#             status=status.HTTP_405_METHOD_NOT_ALLOWED
#         )

import os

@api_view(['PUT'])
def update_user(request):
    logger.debug(f"Request data: {request.data}")
    logger.debug(f"Request files: {request.FILES}")

    try:
        health_card_number = request.data.get("HealthCareNumber")
        first_name = request.data.get("FirstName")
        last_name = request.data.get("LastName")  # ✅ Fixed
        date_of_birth = request.data.get("DateOfBirth")
        email = request.data.get("Email")
        phone = request.data.get("PhoneNumber")
        preference = request.data.get("Preference")
        clinic = request.data.get("Clinic")

        user = User.objects.get(HealthCareNumber=health_card_number)
        user_profile, created = UserProfile.objects.get_or_create(user=user)

        profile_picture = request.FILES.get("profile_picture")  # ✅ Fixed

        if profile_picture:
            # Delete old profile picture if exists
            if user_profile.profile_picture:
                old_picture_path = os.path.join(settings.MEDIA_ROOT, str(user_profile.profile_picture))
                if os.path.exists(old_picture_path):
                    os.remove(old_picture_path)  # ✅ Delete old image

            user_profile.profile_picture = profile_picture
            user_profile.save()

        # Update user details
        user.HealthCareNumber = health_card_number
        user.FirstName = first_name
        user.LastName = last_name
        user.DateOfBirth = date_of_birth
        user.Clinic = clinic
        user.Email = email
        user.PhoneNumber = phone
        user.save()

        # Include the new profile picture in the response
        return Response({
            "message": "Profile updated successfully",
            "profile_picture": request.build_absolute_uri(user_profile.profile_picture.url) if user_profile.profile_picture else None,
        }, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except ValidationError as ve:
        return Response({"error": "Invalid data", "details": ve.message_dict}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return Response({"error": "Internal server error", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def upload_profile_picture(request):
    user_profile = request.user.userprofile
    user_profile.profile_picture = request.FILES["profile_picture"]
    user_profile.save()
    return Response({"message": "Profile picture uploaded successfully", "image_url": user_profile.profile_picture.url})



# views.py
@api_view(['GET'])
def get_user_profile(request):
    try:
        health_care_number = request.data.get('HealthCareNumber')
        user = User.objects.get(HealthCareNumber=health_care_number)
        user_profile = UserProfile.objects.get(user=user)
        data = {
            'health_care_number': user.HealthCareNumber,
            'first_name': user.first_name,  # Adjust if in UserProfile
            'last_name': user.last_name,    # Adjust if in UserProfile
            'profile_picture': request.build_absolute_uri(user_profile.profile_picture.url) if user_profile.profile_picture else None,
        }
        print(f'{user_profile.profile_picture.url}')
        return Response(data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except UserProfile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error fetching profile: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def get_products(request):
    products = Products.objects.all()
    serializer_data = ProductSerializer(products, many=True, context={'request': request})
    print(serializer_data)
    return Response(serializer_data.data)


# @api_view(['POST'])
# def add_to_cart(request):
#     healthCareNumber = request.data.get('healthCareNumber')
#     serialNumber = request.data.get('serialNumber')
#     quantity = int(request.data.get('quantity',1))

#     user = User.objects.get(HealthCareNumber=healthCareNumber)
#     product = Products.objects.get(serialNumber=serialNumber)

#     cart,created = Cart.objects.get_or_create(user=user)

#     cart_item = CartItem.objects.get_or_create(cart=cart,product=product)

#     if not created:
#         cart_item.quantity += quantity
#     else: 
#         cart_item.quantity = quantity
#     cart_item.save()

#     return Response({'message': 'Product added to cart successfully'})

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def add_to_cart(request):
    healthCareNumber = request.data.get('healthCareNumber')
    serialNumber = request.data.get('serialNumber')
    quantity = int(request.data.get('quantity', 1))

    print(f"Request: healthCareNumber={healthCareNumber}, serialNumber={serialNumber}")

    try:
        user = User.objects.get(HealthCareNumber=healthCareNumber)
        print(user.Clinic)

        product = Products.objects.get(serialNumber=serialNumber)
        print(product.price)
        print(f"Found: user={user.HealthCareNumber}, product={product.type}")
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    except Products.DoesNotExist:
        return Response({'error': 'Product not found: ' + serialNumber}, status=404)

    cart, created = Cart.objects.get_or_create(
        healthCardNumber=user,
        serialNumber=product,
        defaults={'quantity': 1}  # only used if new object is created
    )

    if not created:
        cart.quantity += 1  # increase existing quantity
    cart.save()
    print(f"Cart: {cart.healthCardNumber}, created={created}")

    try:
        print(f"CartItem: serialNumber={cart.serialNumber}, created={created}")
    except Exception as e:
        return Response({'error': str(e)}, status=400)

    cart.save()

    return Response({'message': 'Product added to cart successfully'}, status=200)



@api_view(['POST'])
def get_cart_items(request):
    healthCardNumber = request.data.get('healthCardNumber')
    cart_items = Cart.objects.filter(healthCardNumber=healthCardNumber)
    serializer_data = CartSerializer(cart_items, many=True)
    return Response(serializer_data.data)

@api_view(['POST'])
def remove_cart_item(request):
    healthCareNumber = request.data.get('healthCardNumber')
    user = User.objects.get(HealthCareNumber=healthCareNumber)
    serialNumber = request.data.get('serialNumber')
    product = Products.objects.get(serialNumber=serialNumber)
    cart_item = Cart.objects.get(healthCardNumber=user, serialNumber=product)
    cart_item.delete()
    return Response({"message": "deleted successfully"})
# @api_view(['POST'])
# def buy_cart_item(request):

    # try:
    #     # 1. Extract request data
    #     healthCareNumber = request.data.get('healthCardNumber')
    #     serialNumber = request.data.get('serialNumber')
    #     price = request.data.get('price')
    #     quantity = request.data.get('quantity')

    #     # 2. Get related user and product
    #     user = User.objects.get(HealthCareNumber=healthCareNumber)
    #     product = Products.objects.get(serialNumber=serialNumber)

    #     # 3. Delete item from cart
    #     cart_item = Cart.objects.get(healthCardNumber=user, serialNumber=product)
    #     cart_item.delete()

    #     # 4. Create invoice
    #     invoice = Invoice.objects.create(
    #         health_card_number=healthCareNumber,
    #         serial_number=serialNumber,
    #         quantity=quantity,
    #         price=price,
    #     )

    #     # 5. Serialize and return
    #     serializer = InvoiceSerializer(invoice, many=True, context={'request': request})
    #     print(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

    # except User.DoesNotExist:
    #     return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    # except Products.DoesNotExist:
    #     return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    # except Cart.DoesNotExist:
    #     return Response({"error": "Item not found in cart"}, status=status.HTTP_404_NOT_FOUND)
    # except Exception as e:
    #     return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def buy_cart_item(request):
    try:
        print("Request data:", request.data)  # Debug: print the incoming data

        healthCareNumber = request.data.get('healthCardNumber')
        serialNumber = request.data.get('serialNumber')
        price = request.data.get('finalPrice')
        quantity = request.data.get('quantity')

        if not all([healthCareNumber, serialNumber, price, quantity]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(HealthCareNumber=healthCareNumber)
        product = Products.objects.get(serialNumber=serialNumber)

        # Optional: verify price/quantity match the product or user data

        cart_item = Cart.objects.get(healthCardNumber=user, serialNumber=product)
        cart_item.delete()

        invoice = Invoice.objects.create(
            health_card_number=healthCareNumber,
            serial_number=serialNumber,
            quantity=quantity,
            price=price
        )

        serializer = InvoiceSerializer(invoice)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Products.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    except Cart.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_cart_item(request):
    try:
        operation = request.data.get('op')
        healthCareNumber = request.data.get('healthCardNumber')
        serialNumber = request.data.get('serialNumber')
        user = User.objects.get(HealthCareNumber=healthCareNumber)
        product = Products.objects.get(serialNumber=serialNumber)

        cart_item = Cart.objects.get(healthCardNumber=user, serialNumber=product)

        
# Update quantity based on operation
        if operation == 'inc':
            cart_item.quantity += 1
        elif operation == 'dec':
            if cart_item.quantity <= 1:
                return Response({"error": "Quantity cannot be less than 1"}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.quantity -= 1

        # Save updated cart item
        cart_item.save()

        return Response({
            "message": f"Quantity updated to {cart_item.quantity}",
            "cart_item": {
                "serialNumber": cart_item.serialNumber.serialNumber,
                "quantity": cart_item.quantity
            }
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error":"an eror has occurred"})
    



@api_view(['POST'])
def buy_all_cart_item(request):
    try:
        healthCardNumber = request.data.get('healthCardNumber')

        # Validate input
        if not healthCardNumber:
            return Response({"error": "healthCardNumber is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch user
        try:
            user = User.objects.get(HealthCareNumber=healthCardNumber)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Fetch all cart items for the user
        cart_items = Cart.objects.filter(healthCardNumber=user)


        if not cart_items.exists():
            return Response({"error": "No items in cart"}, status=status.HTTP_400_BAD_REQUEST)

        # Create invoices and collect details
        invoices_created = []
        for cart_item in cart_items:
            product = cart_item.serialNumber
            invoice = Invoice.objects.create(
                health_card_number=user.HealthCareNumber,
                serial_number=product.serialNumber,
                quantity=cart_item.quantity,
                price=product.price * cart_item.quantity  # Assuming Products model has a price field
            )
            invoices_created.append({
                "serial_number": product.serialNumber,
                "quantity": cart_item.quantity,
                "price": product.price * cart_item.quantity
            })

        # Delete all cart items after creating invoices
        cart_items.delete()

        return Response({
            "message": "All cart items purchased successfully",
            "invoices": invoices_created,
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"An error has occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

from .models import Doctors
from .serializers import DoctorsSerializer
@api_view(['Get'])
def get_doctors(request):
    doctors = Doctors.objects.all()
    serializer_data = DoctorsSerializer(doctors, many=True, context={'request': request})
    print(serializer_data)
    return Response(serializer_data.data)

@api_view(['GET'])
def get_contact_info(request):
    return Response({"email": "reception@pacmc.com",
  "phone": "306-922-2002",
  "address": "1135 Central Avenue"})


@api_view(['GET'])
def get_hours_info(request):
    return Response([  {
          "branchName": "Manhattan",
          "hours": "Monday to Friday 9 a.m. to 5 p.m."
        },
        {
          "branchName": "Down Town",
          "hours": "Monday to Friday 9 a.m. to 5 p.m.",
          "hoursWeekend": "Sat from 10 a.m. to 6 p.m."
        }])



from django.db.models import Sum

@api_view(['POST'])
def get_cart_quantity(request):
    healthCardNumber = request.data.get('healthCardNumber')
    try:
        user = User.objects.get(HealthCareNumber=healthCardNumber)
        total_quantity = Cart.objects.filter(healthCardNumber=user).aggregate(
            total=Sum('quantity')
        )['total'] or 0  # Returns 0 if cart is empty
        
        return Response({'count': str(total_quantity)})
    
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)