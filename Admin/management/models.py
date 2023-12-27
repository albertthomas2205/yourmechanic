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