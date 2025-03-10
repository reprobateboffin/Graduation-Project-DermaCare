import json
from django.shortcuts import render
import tensorflow as tf
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from io import BytesIO
import base64
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from django.http import JsonResponse, HttpResponse


MODEL_PATH = r'C:/Users/muham/Documents/Skin Disease Model/v3p2.h5'
WEIGHTS_PATH = r"C:/Users/muham/Documents/Skin Disease Model/Skin_Cancerv3p2.weights.h5"


model = tf.keras.models.load_model(MODEL_PATH)




def process_image(base64_string):
    image_data = base64.b64decode(base64_string)
    image = Image.open(BytesIO(image_data))
    return image

def preprocess_image(image,target_size):
    image = image.resize(target_size)
    image = np.array(image)
    image = np.expand_dims(image, axis=0)
    return image

def predict_image(base64_string, model_path= r'C:/Users/muham/Documents/Skin Disease Model/v3p2.h5'):
    try:
        image = process_image(base64_string)
        image = preprocess_image(image, target_size=(56,56))

        prediction = model.predict(image)

        predicted_class = np.argmax(prediction, axis=1)[0]
        confidence = float(np.max(prediction))

        return{"message": int(predicted_class), "confidence": confidence }
    except Exception as e:
        return {"error": str(e)}
