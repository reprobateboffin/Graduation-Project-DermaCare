from django.db import models

# Create your models here.

class User(models.Model):
    HealthCareNumber = models.CharField(max_length=50, unique=True)
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
        db_table = 'user'  # Use the existing MySQL table
        managed = False

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"