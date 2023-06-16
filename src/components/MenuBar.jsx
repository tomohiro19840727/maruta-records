import React from "react";
import { Link } from 'react-router-dom';

const MenuBar = () => {
  return (
    <>
    
    <div class="bg-white pb-6 sm:pb-8 lg:pb-12">
<header class="mb-8 border-b bg-gray-600">
<div class="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-8">

  <a href="/" class="text-white inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl" aria-label="logo">
  <div className="">
      <img src="./logo192.png" alt="Logo" className="h-10 m-5" />
    </div>

    MARUTA-Records
  </a>



  <nav class="hidden gap-12 lg:flex 2xl:ml-16">
    <Link to="/" class="text-2xl font-semibold text-white hover:text-indigo-300 transition duration-100">Home</Link>

    <Link to="/shop" class="text-2xl font-semibold text-white transition duration-100 hover:text-indigo-300 active:text-indigo-700">shop</Link>

    <Link to="/artist" class="text-2xl font-semibold text-white transition duration-100 hover:text-indigo-300 active:text-indigo-700">Artist</Link>

    <Link to="/news" class="text-2xl font-semibold text-white transition duration-100 hover:text-indigo-300 active:text-indigo-700">News</Link>


    <Link to="/product" class="text-2xl font-semibold text-white transition duration-100 hover:text-indigo-300 active:text-indigo-700">Product</Link>
  </nav>



  <div class="flex divide-x border-r sm:border-l">
    <Link to="/login" class="hidden h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-blue-400 active:bg-gray-200 sm:flex sm:h-20 sm:w-20 md:h-24 md:w-24">

      <span class="hidden text-xl font-semibold text-white sm:block">Login</span>
    </Link>

    <Link to="/logout" class="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-blue-400 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24">

      <span class="hidden text-xl font-semibold text-white sm:block">Logout</span>
    </Link>

    <Link to="/cart" class="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-blue-400 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24">

      <span class="hidden text-xl font-semibold text-white sm:block">Cart</span>
    </Link>
  </div>
</div>
</header>
</div>
    </>

  );
};

export default MenuBar;
