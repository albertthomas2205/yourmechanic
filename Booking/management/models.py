from django.db import models

# Create your models here.
from django.db import models

    
class Bookings(models.Model):
    STATUS_CHOICES = [
     
        ('p', 'Pending'),
        ('s', 'Scheduled'),
        ('w','processing'),
        ('c', 'Completed'),
    ]
    user_id = models.IntegerField()
    mechanic_id = models.IntegerField()
    service_id = models.IntegerField()
    vehicle_id = models.IntegerField()
    payment = models.BooleanField(default=False)
    date_time = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True) 
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='p')

    def __str__(self):
        return f"Booking for User ID {self.user_id} with mechanic {self.mechanic_id}"
    

    
