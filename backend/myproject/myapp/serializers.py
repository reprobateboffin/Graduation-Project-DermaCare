from rest_framework import serializers
from .models import Cart, Products, User, UserProfile,Doctors
from .models import Appointments

class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()
    class Meta:
        model = User
        # 'profile_picture'
        # fields = ['HealthCareNumber', 'Clinic', 'FirstName', 'LastName', 'DateOfBirth', 'Email', 'PhoneNumber', 'Preference']
        fields = ['HealthCareNumber', 'Clinic', 'FirstName', 'LastName', 'DateOfBirth', 
                  'Email', 'PhoneNumber', 'Preference','profile_picture']
    def get_profile_picture(self, obj):
        user_profile = UserProfile.objects.filter(user=obj).first()  # Get UserProfile
        request = self.context.get('request')  # Get request object if passed
        if user_profile and user_profile.profile_picture:
            profile_picture_url = user_profile.profile_picture.url
            if request:
                return request.build_absolute_uri(profile_picture_url)  # Absolute URL
            return profile_picture_url
        return None  # Return None if no profile picture exists


class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointments
        fields = '__all__'  # Include all fields in JSON

class DoctorsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctors
        fields = '__all__'  # Include all fields in JSON



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Products
        fields = ['id', 'name', 'serialNumber', 'description', 'quantity', 'image', 'type', 'price']
    
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None
    

class CartSerializer(serializers.ModelSerializer):
    serialNumber = ProductSerializer(read_only=True)
    healthCardNumber = serializers.SlugRelatedField(
        slug_field='HealthCareNumber',
        queryset=User.objects.all()
    )

    class Meta:
        model = Cart
        fields = ['serialNumber', 'healthCardNumber', 'quantity']


# serializers.py

from .models import Invoice

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'


from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image_url and request:
            return request.build_absolute_uri(obj.image_url.url)
        return None