import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { db } from "../firebase";

const MobileMenuBar = () => {
  const [cartCount, setCartCount] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Firestoreのコレクション参照を作成
    const cartCollectionRef = collection(db, 'cart');

    const unsubscribe = onSnapshot(cartCollectionRef, (snapshot) => {
      const count = snapshot.size; // ドキュメントの数を取得
      setCartCount(count);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
    
    <div class="">
<header class="mb-5 border-b bg-gray-600">
<div class="mx-auto flex max-w-screen-2xl items-center justify-between px-4">

  <a href="/" class="text-white inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl" aria-label="logo">
    <div className="">
      <img src="./MARUTALOGO3.jpg" alt="Logo" className="h-15 w-15 m-3"  />
    </div>
    <div className="ml-3 mr-3">
    MARUTA-Records
    </div>
  </a>

  <div class="flex divide-x border-r sm:border-l">
  
{cartCount > 0 ? (
  <Link to="/cart" className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-blue-400 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24 relative">
    <span className=" text-xl font-semibold text-white">Cart</span>
    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-1xl font-semibold">
      {cartCount}
    </div>
  </Link>
) : (
  <Link to="/empty" className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-blue-400 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24 relative">
    <span className=" text-xl font-semibold text-white mr-2">Cart</span>
  </Link>
)}



    <button type="button"  onClick={toggleMenu} class="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 active:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>

          <span class="hidden text-xs font-semibold text-gray-500 sm:block">Menu</span>
        </button>
        <div className={`absolute ${isMenuOpen ? "block" : "hidden"} bg-black text-white rounded shadow-md top-20 right-10 group-hover:block`}>
  <div className="flex">
    <Link to="/" className="hover:bg-gray-500 m-3 font-serif font-bold text-lg">Home</Link>
    <Link to="/shop" className="hover:bg-gray-500 m-3 font-serif font-bold text-lg">Shop</Link>
    <Link to="/artist" className="hover:bg-gray-500 m-3 font-serif font-bold text-lg">Artist</Link>
    <Link to="/news"   className="hover:bg-gray-500 m-3 font-serif font-bold text-lg">News</Link>
  </div>
</div>

  </div>
</div>
</header>
</div>
    </>

  );
};

export default MobileMenuBar;
