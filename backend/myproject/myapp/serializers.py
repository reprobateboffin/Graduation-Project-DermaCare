from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['HealthCareNumber', 'Clinic', 'FirstName', 'LastName', 'DateOfBirth', 'Email', 'PhoneNumber', 'Preference']