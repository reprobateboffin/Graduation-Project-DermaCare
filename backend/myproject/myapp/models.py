from django.db import models

# Create your models here.
class User(models.Model):
    HealthCareNumber = models.CharField(max_length=50, unique=True,primary_key=True)  # Ensure it's unique
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
    user = models.OneToOneField(User,
        on_delete=models.CASCADE,
        to_field='HealthCareNumber',  # Reference HealthCareNumber
        db_column='HealthCareNumber'  # Ensure correct DB mapping
        )
    profile_picture = models.ImageField(upload_to="profile_pics/", null=True, blank=True)

    def __str__(self):
        return self.user.username
    

class Products(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)  # Ensure it's unique
    serialNumber = models.CharField(max_length=10, unique=True)
    description = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.IntegerField()
    image = models.ImageField(upload_to='products/', null=True, blank=True)  # Add this

    def __str__(self):
        return self.name


    class Meta:
        db_table = 'Products'
        managed = False  


class Cart(models.Model):
     serialNumber = models.ForeignKey(
        'Products', 
        on_delete=models.CASCADE, 
        to_field="serialNumber",  # Field in the 'User' model that is a unique key
        db_column="serialNumber"  # Field name in your cart table

    )   
     healthCardNumber = models.ForeignKey(
        'User', 
        on_delete=models.CASCADE, 
        to_field="HealthCareNumber",  # Field in the 'User' model that is a unique key
        db_column="healthCardNumber"  # Field name in your Cart table
    )   
     quantity = models.IntegerField()
     def __str__(self):
        return f"{self.serialNumber} - {self.quantity}"


     class Meta:
        db_table = 'Cart'
        managed = False  


# models.py


class Invoice(models.Model):
    health_card_number = models.CharField(max_length=50) 
    serial_number = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'Invoice'
        managed = False  

    def __str__(self):
        return f"Invoice {self.id} - {self.health_card_number}"



class Blog(models.Model):
    title = models.CharField(max_length=255)
    image_url = models.ImageField(upload_to='blogs/', null=True, blank=True)  # Add this
    sub_text = models.TextField()
    body = models.TextField()
    bookmarked= models.BooleanField(default=False)
    class Meta:
        db_table = 'Blog'
        managed = False  
    def __str__(self):
        return self.title
