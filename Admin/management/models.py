from django.db import models

# Create your models here.
from django.db import models
# from cloudinary_storage.storage import RawMediaCloudinaryStorage
# from cloudinary_storage.fields import CloudinaryField

class Service(models.Model):
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    time_required = models.IntegerField(help_text="Time required in minutes")
    image = models.FileField(upload_to='yourmechanic_service')

    def __str__(self):
        return self.name
    


class Brand(models.Model):
    brand_name = models.CharField(unique=True,max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    vehicle_name = models.CharField(unique=True,max_length=100)
    description = models.TextField()
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    image = models.FileField(upload_to='yourmechanic_vechile')

    def __str__(self):
        return self.name 
    
