import json
import random
from django.shortcuts import render
from .models import User
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

def getBlogs(request):
     blogs = [
        {
            'id': '1',
            'title': 'The Importance of Regular Checkups',
            'imageUrl': 'https://via.placeholder.com/150',
            'subText': 'Regular checkups are important to ensure that you stay healthy and catch any potential issues early.',
            'body': 'Regular checkups can help detect health problems before they become serious. They are essential for maintaining good health.',
        },
        {
            'id': '2',
            'title': 'How to Stay Healthy During Flu Season',
            'imageUrl': 'https://via.placeholder.com/150',
            'subText': 'Flu season can be tough, but there are ways to protect yourself and stay healthy throughout the season.',
            'body': 'During flu season, getting the flu vaccine, washing your hands, and staying hydrated are essential for staying healthy.',
        },
        {
            'id': '3',
            'title': 'Mental Health: Coping Strategies',
            'imageUrl': 'https://via.placeholder.com/150',
            'subText': 'Mental health is just as important as physical health. Learn coping strategies to maintain mental well-being.',
            'body': 'Mental health can be challenging, but practicing mindfulness, seeking therapy, and staying active can help cope with mental health issues.',
        }, {
            'id': '4',
            'title': 'Specially For Your Skin',
            'imageUrl': 'https://via.placeholder.com/150',
            'subText': 'Mental health is just as important as physical health. Learn coping strategies to maintain mental well-being.',
            'body': 'Mental health can be challenging, but practicing mindfulness, seeking therapy, and staying active can help cope with mental health issues.',
        },
    ]
     return JsonResponse({'blogs': blogs})



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
    return Response(serializer_data.data)

@api_view(['POST'])
def book_appointments(request,pk):
    try:
 
        appointment = Appointments.objects.get(id=pk)
        appointment.booked = True
        appointment.save()

        return Response({"message": "Appointment successfully booked"})
    except Appointments.DoesNotExist:
        return Response({"message": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


def generate_otp():
    return str(random.randint(100000, 999999))

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