from django.db import models

# Create your models here.
class Order(models.Model):
    order_product = models.CharField(max_length=100)
    order_amount = models.CharField(max_length=25)
    order_payment_id = models.CharField(max_length=100)
    isPaid = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.order_product
    
class Transaction(models.Model):
    payment_id = models.CharField(max_length=100,verbose_name="payment id")
    order_id = models.CharField(max_length=100,verbose_name="order id")
    signature = models.CharField(max_length=200,verbose_name="signature")
    amount = models.IntegerField(verbose_name="amount")
    datetime = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return str(self.id)