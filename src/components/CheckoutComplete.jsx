import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CheckoutComplete = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [customerName, setCustomerName] = useState("");

  // useEffect(() => {
  //   if (sessionId) {
  //     // Call your backend API to retrieve customer information based on sessionId
  //     // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API
  //     fetch(`http://localhost:3000/order/success?session_id=${sessionId}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCustomerName(data.customerName); // Assuming the backend API returns the customer name
  //       })
  //       .catch((error) => {
  //         console.error("Error retrieving customer name:", error);
  //       });
  //   }
  // }, [sessionId]);

  return (
    <div>
      <h1 className="text-5xl text-center font-bold">お買い上げありがとうございました！！</h1>
      <p className="text-2xl text-center m-10 font-serif">２〜５日後に郵送で届くように手配いたします</p>
    </div>
  );
};

export default CheckoutComplete;
