import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const CheckoutComplete = () => {

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
  

  return (

    <div class="bg-white py-6 sm:py-8 lg:py-12 fade">
    <div class="mx-auto max-w-screen-lg px-4 md:px-8">
      <div class="grid gap-8 sm:grid-cols-2">
        
        <div class="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
          <img src="./img/25293321_s.jpg" loading="lazy" alt="Photo by Theo Crazzolara" class="h-full w-full object-cover object-center" />
        </div>
        
  
        
        <div class="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
          <h1 class="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">Thank you for your purchase!</h1>
  
          <p class="mb-4 text-center text-gray-500 sm:text-left md:mb-8 md:text-lg">2日〜5日後に商品を発送いたします。</p>
  
          <nav class="flex gap-4 sm:block sm:space-y-1 md:space-y-2 mt-8">
            

          <Link to="/"  class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
          <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
          <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Home</span>
          </Link>
            
          </nav>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CheckoutComplete;
