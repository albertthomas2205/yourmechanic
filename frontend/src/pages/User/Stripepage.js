import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../../components/user/Payment/CheckoutForm';
import { useEffect, useState } from 'react';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OXe9USH9jcXERVDaJZF7e63GH54Q3QsZjHtTyv5DkKHWZqZgY1gr4GC8QEKYBwIrQUzrpGbgVwfbnGFtNUL5PoI00zTkaauUo');

export default function Stripepage() {
    // Assume you fetch the client secret from your server and store it in state
    const [clientSecret, setClientSecret] = useState('');
  
    // Fetch the client secret from your server when the component mounts
    useEffect(() => {
      // Make an API request to your server to obtain the client secret
      // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint
      fetch('http://127.0.0.1:8000/api/booking/checkout-session/')
        .then(response => response.json())
        .then(data => setClientSecret(data.id));
    }, []);
  
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm  />
      </Elements>
    );
  }