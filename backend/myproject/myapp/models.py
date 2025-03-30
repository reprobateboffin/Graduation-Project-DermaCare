from django.db import models

# Create your models here.
class User(models.Model):
    HealthCareNumber = models.CharField(max_length=50, unique=True)  # Ensure it's unique
    Clinic = models.CharField(max_length=100)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    DateOfBirth = models.DateField()
    Email = models.EmailField(max_length=100, unique=True)
    PhoneNumber = models.CharField(max_length=20, unique=True)
    Preference = models.CharField(
        max_length=5,
        choices=[('Email', 'Email'), ('Phone', 'Phone')],
        default='Email'
    )

    class Meta:
        db_table = 'user'  
        managed = False  

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"


class Appointments(models.Model):
    id = models.AutoField(primary_key=True)
    healthCardNumber = models.ForeignKey(
        'User', 
        on_delete=models.CASCADE, 
        to_field="HealthCareNumber",  # Field in the 'User' model that is a unique key
        db_column="healthCardNumber"  # Field name in your appointments table
    )   
    time = models.TimeField()
    doctor = models.CharField(max_length=100)
    booked = models.BooleanField(default=False)
    date = models.DateField()
    clinic_name = models.CharField(max_length=100)

    class Meta:
        db_table = 'appointments'
        managed = False  

    def __str__(self):
        return f"{self.doctor} "


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to="profile_pics/", null=True, blank=True)

    def __str__(self):
        return self.user.username