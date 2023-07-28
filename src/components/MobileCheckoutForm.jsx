import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";

export default function MobileCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://maruta-records.vercel.app/checkoutcomplete/",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  const adressElementOptions = {
    mode : "shipping",
   }

  return (
    <>
    <div className="flex justify-center">

    <form  onSubmit={handleSubmit} className=" w-full self-center bg-white shadow-md rounded-md p-8">
        <PaymentElement id="payment-element" className="mb-6" options={paymentElementOptions} />
        <AddressElement className="mb-6"
        options={adressElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="bg-indigo-600 text-white rounded-md py-3 px-4 text-lg font-semibold transition duration-200 ease-in-out shadow-md w-full"
          >
          <span id="button-text">
            {isLoading ? <div className="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className="text-gray-700 text-base pt-3 text-center">{message}</div>}
      </form>
          </div>

   
      </>
  );
}

