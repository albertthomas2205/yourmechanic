from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework import status
import stripe
from django.conf import settings
# Set your Stripe API key here (consider using environment variables)
stripe.api_key = "sk_test_51OXe9USH9jcXERVDvtzk7A9SiOGvDtHe6RnA6HDIt1jpahmYLrgR6AAoUggdyD3qX3yZFhMIILQ3RRGF3ONXcDun00cxPro2BE"

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

class StripeCheckoutView(APIView):
    def post(self, request):
        amount = request.data.get('amount')  # Get the amount from the request data
        print(amount)
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[{
                    'price_data': {
                        'currency': 'INR',  # Update with your desired currency
                        'product_data': {
                            'name': 'Your Product Name',
                        },
                        'unit_amount': amount,
                    },
                    'quantity': 1,
                }],
                mode="payment",
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
