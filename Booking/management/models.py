from django.db import models

# Create your models here.
from django.db import models

    
class Bookings(models.Model):
    STATUS_CHOICES = [
     
        ('p', 'Pending'),
        ('s', 'Scheduled'),
        ('w','ongoing'),
        ('c', 'Completed'),
        ('d','Canceled'),
    ]
    user_id = models.IntegerField()
    mechanic_id = models.IntegerField()
    service_id = models.IntegerField()
    vehicle_id = models.IntegerField()
    payment = models.BooleanField(default=False)
    date_time = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True) 
    place = models.CharField(max_length=100,null = True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='p')

    def __str__(self):
        return f"Booking for User ID {self.user_id} with mechanic {self.mechanic_id}"
    
    

class Review(models.Model):
    rating = models.IntegerField()
    review = models.CharField(max_length=250)
    mechanic_id = models.IntegerField(null=True)
    service_name = models.CharField(max_length=250)
    user_name = models.CharField(max_length=250)
    booking_id = models.IntegerField(null=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
