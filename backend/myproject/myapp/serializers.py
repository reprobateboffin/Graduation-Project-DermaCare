from rest_framework import serializers
from .models import User
from .models import Appointments

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['HealthCareNumber', 'Clinic', 'FirstName', 'LastName', 'DateOfBirth', 'Email', 'PhoneNumber', 'Preference']



class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = '__all__'  # Include all fields in JSON