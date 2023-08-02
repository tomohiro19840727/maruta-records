import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function MobileCheckoutForm({ userId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const targets = document.getElementsByClassName("fade");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    });

    Array.from(targets).forEach((target) => {
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
  }, []);


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const getPosts = async () => {
      // const data = await getDocs(query(collection(db, "cart"), orderBy('createdAt', 'desc')));
      const q = query(collection(db, 'cart'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const data = await getDocs(q);
   
      if (data.docs.length === 0) {
        window.location.href = './empty'; // データが存在しない場合はリダイレクト
      } else {
        setCartList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };
    getPosts();
  }, [userId]);

  const sortedCartLists = cartList.sort((a, b) => b.createdAt - a.createdAt);
 
  useEffect(() => {
    const total = cartList.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(total + 720);
  }, [cartList]); 

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
      </form>
          </div>
   
          <div class="bg-white py-6  fade">
    <div class="mx-auto max-w-screen-lg px-8 ">
      <div class="mb-10">
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Your Cart</h2>
      </div>
  
      <div class="mb-6 flex flex-col gap-4">
      {sortedCartLists.map((item) => (
        <div class="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border  bg-gray-200 mb-12">
          <div class="group relative block overflow-hidden bg-gray-100 h-70 w-100">
            <img src={item.imgUrl} loading="lazy" alt="Photo by Thái An" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
          </div>
  
          <div class="flex flex-1 flex-col justify-between py-4 ">
            <div>
              <div class="m-5 inline-block  font-bold text-gray-800 text-2xl">{item.title}</div>
            </div>
          </div>
          
  
          <div class="flex w-full justify-between border-t p-4">
           <div class="ml-4 pt-3">
              <span class="block font-bold text-gray-800 text-2xl mb-10">{item.price}円</span>
              <span class="mb-3 ml-5 block font-bold text-red-500 line-through text-lg">{item.prevPrice}円</span>
             
            </div>
          </div>
        </div>
        
      ))}
     </div>
      
      <div class="flex flex-col items-end gap-4">
        <div class="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
          <div class="space-y-1">
  
            <div class="flex justify-between gap-4 text-gray-500">
              <span>送料</span>
              <span>720円</span>
            </div>
          </div>
  
          <div class="mt-4 border-t pt-4">
            <div class="flex items-start justify-between gap-4 text-gray-800">
              <span class="text-lg font-bold">Total</span>
  
              <span class="flex flex-col items-end">
                <span class="text-lg font-bold">{totalAmount}円</span>
                <span class="text-sm text-gray-500">消費税込み</span>
              </span>
            </div>
          </div>
        </div>
  
      </div>
      
    </div>
  </div>
   
      </>
  );
}

