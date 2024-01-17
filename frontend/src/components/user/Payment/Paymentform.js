import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const Paymentform = () => {
  const [amount, setAmount] = useState(100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the Axios POST request to your API
      const response = await axios.post('http://127.0.0.1:8002/api/booking/checkout-sessionn/', {
        amount: amount,
        // You may include other form data here if needed
      });


      console.log(response.data);

      // Load Stripe and redirect to Checkout
      const stripe = await loadStripe('pk_test_51OYj2vSEEZQqRNckuhhQv0rtMw3J2paHXtU5QBzY3RdFKAJmGm6ywlrgU95vSquET6W2bG9oJzSL7foVHmtpajTI00XDqvTR41');

      stripe.redirectToCheckout({
        sessionId: response.data.checkoutSessionId
      });

      // Reset the form after submission (optional)
      setAmount(100);

    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            name='amount'
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Paymentform;
