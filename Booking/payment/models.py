from django.db import models

# Create your models here.
class Order(models.Model):
    order_product = models.CharField(max_length=100)
    order_amount = models.CharField(max_length=25)
    order_payment_id = models.CharField(max_length=100)
    isPaid = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now=True)
    booking_id = models.IntegerField(null=True)
 
 

    def __str__(self):
        return self.order_product
    
class Review(models.Model):
    rating = models.IntegerField()
    review = models.CharField(max_length=250)
    # mechanic_id = models.IntegerField(null=True)
    # service_name = models.CharField(max_length=250)
    booking_id = models.IntegerField(null=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    

    
    
class Transaction(models.Model):
    payment_id = models.CharField(max_length=100,verbose_name="payment id")
    order_id = models.CharField(max_length=100,verbose_name="order id")
    signature = models.CharField(max_length=200,verbose_name="signature")
    # amount = models.IntegerField(verbose_name="amount")
    # datetime = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return str(self.id)
    
class Transactions(models.Model):
    razorpay_payment_id = models.CharField(max_length=255)
    razorpay_order_id = models.CharField(max_length=255)
    razorpay_signature = models.CharField(max_length=255)
    status_code = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction {self.id}"
    
class Reviews(models.Model):
    rating = models.IntegerField()
    review = models.CharField(max_length=250)
    mechanic_id = models.IntegerField(null=True)
    service_name = models.CharField(max_length=250)
    user_name = models.CharField(max_length=250)
    booking_id = models.IntegerField(null=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)