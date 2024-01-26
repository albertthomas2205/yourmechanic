from rest_framework import serializers

from .models import Order,Transaction,Transactions


class OrderSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = Order
        fields = '__all__'
        depth = 2
        
class TransactionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["payment_id","order_id","signature","amount"]
        
        
class CreateOrderSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    currency = serializers.CharField()
    
class HandlepaymentSerilaizer(serializers.Serializer):
    class Meta:
        model = Transaction
        fields = '__all__'
    
    
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = '__all__'
        
# from .models import Review

# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = ['id', 'rating', 'review', 'booking_id']