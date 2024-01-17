from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.serializers import ValidationError
import stripe
from django.conf import settings
# Set your Stripe API key here (consider using environment variables)
stripe.api_key = "sk_test_51OYj2vSEEZQqRNckhvQhfoDZKOAAOLbn7WtZdLsm330xGPdqf26zJBxNFClojGQDwlcEjRyQFJtjpQXeVPm88ZY600okxgi0JA"

KEY = 'rzp_test_I7m6Q9rCGvlC2t'
SECRET = 'QHkXUqlVm6fqb1VUuBPna3Ei'

@api_view(['POST'])
def test_payment(request):
    try:
        # Get the amount from the request (you may want to validate this input)
        amount = request.data.get('amount', 1000)

        # Create a test payment intent
        test_payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='pln',
            payment_method_types=['card'],
            receipt_email='test@example.com'
        )

        # Return the client secret of the payment intent to the client
        return Response(status=status.HTTP_200_OK, data={'clientSecret': test_payment_intent.client_secret})

    except stripe.error.StripeError as e:
        # Handle Stripe errors
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})

    except Exception as e:
        # Handle other exceptions
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'error': str(e)})

class StripeCheckoutVieww(APIView):
    def post(self, request):
        amount = request.data.get('amount')  # Get the amount from the request data
        print(amount)
        try:
            checkout_session = stripe.checkout.Session.create(
                customer="cus_PNXMO1WRVrqcSm",
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'inr',  # Update with your desired currency
                        'product_data': {
                            'name': 'Your Product Name',
                        },
                        'unit_amount': amount,
                    },
                    'quantity': 1,
                }],
                mode="payment",
                billing_address_collection='required',
               
                success_url=settings.SITE_URL + '/',
                cancel_url=settings.SITE_URL + '/login'
            )

            # Return the checkout session ID in the response
            return Response(status=status.HTTP_200_OK, data={'checkoutSessionId': checkout_session.id})
        except stripe.error.StripeError as e:
            # Handle Stripe errors
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})
        except Exception as e:
            # Handle other exceptions
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'error': str(e)})


# class StripeCheckoutView(APIView):
#     def post(self, request):
#         amount = request.data.get('amount')  # Get the amount from the request data
#         customer_name = request.data.get('customer_name', 'Default Customer Name')
#         customer_address = request.data.get('customer_address', 'Default Customer Address')

#         try:
#             checkout_session = stripe.checkout.Session.create(
#                 payment_method_types=['card'],
#                 line_items=[{
#                     'price_data': {
#                         'currency': 'INR',
#                         'product_data': {
#                             'name': 'Your Product Name',
#                         },
#                         'unit_amount': amount,
#                     },
#                     'quantity': 1,
#                 }],
#                 mode="payment",
#                 billing_address_collection={
#                     'required': 'auto',
#                 },
#                 customer_email=request.user.email if request.user.is_authenticated else None,
#                 customer={
#                     'name': customer_name,
#                     'address': {
#                         'line1': customer_address,
#                         'city': 'City',  # Update with actual city
#                         'state': 'State',  # Update with actual state
#                         'postal_code': '12345',  # Update with actual postal code
#                         'country': 'IN',  # Update with actual country code
#                     },
#                 },
#                 success_url=settings.SITE_URL + '/',
#                 cancel_url=settings.SITE_URL + '/login'
#             )

#             return Response(status=status.HTTP_200_OK, data={'checkoutSessionId': checkout_session.id})
#         except stripe.error.StripeError as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})
#         except Exception as e:
#             return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'error': str(e)})


class StripeCheckoutView(APIView):
    def post(self, request):
        amount = request.data.get('amount')  # Get the amount from the request data
        print(amount)
        try:
            checkout_session = stripe.checkout.Session.create({
                "customer":"cus_PNXMO1WRVrqcSm",
                "payment_method_types":['card'],
                "line_items":[{
                    'price_data': {
                        'currency': "inr",  # Update with your desired currency
                        'product_data': {
                            'name': 'Your Product Name',
                        },
                        'unit_amount': amount,
                    },
                    'quantity': 1,
                }],
                "mode":"payment",
                "billing_address_collection":"required",
              
                "success_url":settings.SITE_URL + '/',
                "cancel_url":settings.SITE_URL + '/login'
            })
        
            
            # Return the checkout session ID in the response
            return Response(status=status.HTTP_200_OK, data={'checkoutSessionId': checkout_session.id})
        except stripe.error.StripeError as e:
            # Handle Stripe errors
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': str(e)})
        except Exception as e:
            # Handle other exceptions
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'error': str(e)})
        
        










import json


import razorpay
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer,TransactionModelSerializer,CreateOrderSerializer

from django.conf import settings


# you have to create .env file in same folder where you are using environ.Env()
# reading .env file which located in api folder

client = razorpay.Client(auth=(KEY,SECRET))
class RezorpayClient:
    def create_order(self,amount,currency):
        data = {
            "amount":100,
            "currency":"INR",
        }
        try:
            order_data = client.order.create(data=data)
            return order_data
        except Exception as e:
            raise ValidationError(
                {
                    "status_code":status.HTTP_400_BAD_REQUEST,
                    "message":e
                }
            )
    def verify_payment(self,razorpay_order_id,razorpay_payment_id,razorpay_signature):
        try:
            return client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id':razorpay_payment_id,
                'razorpay_signature':razorpay_signature
            })
        except Exception as e:
            raise ValidationError({
                "status_code":status.HTTP_400_BAD_REQUEST,
                "message":e
            })
      
      

@api_view(['POST'])
def start_payment(request):
    # request.data is coming from frontend
    amount = request.data['amount']
    # int(amount)
    name = request.data['name']

    # setup razorpay client
    client = razorpay.Client(auth=(KEY,SECRET))

    # create razorpay order
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})

    # we are saving an order with isPaid=False
    order = Order.objects.create(order_product=name, 
                                 order_amount=amount, 
                                 order_payment_id=payment['id'])
    print(order)

    serializer = OrderSerializer(order)

    """order response will be 
    {'id': 17, 
    'order_date': '23 January 2021 03:28 PM', 
    'order_product': '**product name from frontend**', 
    'order_amount': '**product amount from frontend**', 
    'order_payment_id': 'order_G3NhfSWWh5UfjQ', # it will be unique everytime
    'isPaid': False}"""

    data = {
        "payment": payment,
        "order": serializer.data
    }
    return Response(data)


@api_view(['POST'])
def handle_payment_success(request):
    # request.data is coming from frontend
    res = json.loads(request.data) 
    print(res)
    """res will be:
    {'razorpay_payment_id': 'pay_G3NivgSZLx7I9e', 
    'razorpay_order_id': 'order_G3NhfSWWh5UfjQ', 
    'razorpay_signature': '76b2accbefde6cd2392b5fbf098ebcbd4cb4ef8b78d62aa5cce553b2014993c0'}
    """

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]

    # get order by payment_id which we've created earlier with isPaid=False
    order = Order.objects.get(order_payment_id=ord_id)

    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    client = razorpay.Client(auth=(KEY,SECRET))

    # checking if the transaction is valid or not if it is "valid" then check will return None
    check = client.utility.verify_payment_signature(data)

    if check is not None:
        print("Redirect to error url or error page")
        return Response({'error': 'Something went wrong'})

    # if payment is successful that means check is None then we will turn isPaid=True
    order.isPaid = True
    order.save()

    res_data = {
        'message': 'payment successfully received!'
    }

    return Response(res_data)

def verify_payment(self,razorpay_order_id,razorpay_payment_id,razorpay_signature):
    try:
        return client.utility.varify_payment_signature({
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id':razorpay_payment_id,
            'razorpay_signature':razorpay_signature
        })
    except Exception as e:
        raise ValidationError({
            "status_code":status.HTTP_400_BAD_REQUEST,
        })
      
      
      
rz_client = RezorpayClient()  
        
class CreateOrderAPIview(APIView):
    def post(self,request):
        create_order_serializer = CreateOrderSerializer(
            data = request.data
        )
        if create_order_serializer.is_valid():
            order_response = rz_client.create_order(
                amount = create_order_serializer._validated_data.get("amount"),
                currency=create_order_serializer._validated_data.get("currency")
            )
            response = {
                "status_code":status.HTTP_201_CREATED,
                "message":"order created",
                "data": order_response
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {
                "status_code":status.HTTP_400_BAD_REQUEST,
                "message":"bad request",
                "error": create_order_serializer.errors
            }
            return Response(response, status = status.HTTP_400_BAD_REQUEST)
class TransactionAPIView(APIView):
    def post (self,request):
        transaction_serializer = TransactionModelSerializer(
            data = request.data
        )
        if transaction_serializer.is_valid():
            rz_client.verify_payment(
                razorpay_order_id=transaction_serializer.validated_data.get("order_id"),
                razorpay_payment_id=transaction_serializer.validated_data.get("payment_id"),
                razorpay_signature=transaction_serializer.validated_data.ge("signature"),
            )
            client.verify_payment(
                
            )
            transaction_serializer.save()
            response = {
                "status_code":status.HTTP_201_CREATED,
                "message":"transaction created"
            }
            return Response(response, status = status.HTTP_201_CREATED)
        else:
            response ={
                "status_code":status.HTTP_201_CREATED,
                "message":"bad request",
                "error": transaction_serializer.errors
            }
            return Response(response, status = status.HTTP_400_BAD_REQUEST)