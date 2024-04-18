import React, { useEffect, useState } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const CheckProv = () => {
  const stripePromise = loadStripe('pk_test_51P5xgsKiofAVDtVI51cBrLkg44oyZYKXWEAZOuvLyo7zLCSVF8d01X2ScWX0qV9aBX0zFHrHpfPO7g77KrFwn7Fa002r5KA0sY');


  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  console.log("secret: " + clientSecret);
  return (
    <>
        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

export default CheckProv