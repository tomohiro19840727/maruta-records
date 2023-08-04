import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { auth, db } from "../firebase";

const MenuBar = ( ) => {
  const [cartCount, setCartCount] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = localStorage.getItem('userId');

  const [userEmail, setUserEmail] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect (() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    
    return () => unsubscribe();
  }, []);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Firestoreのコレクション参照を作
    const userId = localStorage.getItem('userId');
    const cartCollectionRef = collection(db, 'cart');

    const q = query(cartCollectionRef, where('userId', '==', userId));


    const unsubscribe = onSnapshot(q, (snapshot) => {
      const count = snapshot.size; // ドキュメントの数を取得
      setCartCount(count);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
    
    <div class="bg-white pb-6 sm:pb-8 lg:pb-12">
<header class="mb-8 border-b bg-gray-600">
<div class="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-8">

  <a href="/" class="text-white inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl" aria-label="logo">
  <div className="">
      <img src="https://maruta-records.vercel.app/MARUTALOGO3.jpg" alt="Logo" className="h-20 w-20 m-6"  />
    </div>
    MARUTA-Records
  </a>



  <nav className="gap-12 lg:flex 2xl:ml-16">
    <a href="/"  className="text-3xl font-semibold text-white hover:text-indigo-300 transition duration-100">Home</a>



    <a href="/shop" className="font-semibold text-white transition duration-100 hover:text-indigo-300 active:text-indigo-700 text-3xl">shop</a>

   

                  <div class="relative inline-block group">
  <button onClick={toggleMenu} className="font-semibold text-white transition text-3xl duration-100 hover:text-indigo-300 active:text-indigo-700">Artist</button>
  {/* <div class="absolute hidden bg-gray-100 text-gray-700 py-2 px-4 rounded shadow-md mt-2 -left-2/3 group-hover:block">
    <ul className="flex ">
      <Link to="/artist"   class="hover:bg-gray-200 py-1 px-2 m-5 font-serif font-bold text-xl">yamazaki taketo</Link>
      <Link  to="/artist2" class="hover:bg-gray-200 py-1 px-2 m-5 font-serif font-bold text-xl">kuriki tomohiro</Link>
      <Link  to="/artist3" class="hover:bg-gray-200 py-1 px-2 m-5 font-serif font-bold text-xl">iwaki haruka</Link>
      <Link  to="/artist4" class="hover:bg-gray-200 py-1 px-2 m-5 font-serif font-bold text-xl">satou takuya</Link>
    </ul>
  </div> */}
  <div
  className={`${
    isMenuOpen ? "block" : "hidden"
  } absolute bg-gray-100 text-gray-700 py-2 px-4 rounded shadow-md mt-2 -left-2/3`}
>
  <ul className="flex">
    <Link to="/artist" className="hover:bg-gray-200 py-1 px-2 m-5 font-serif font-bold text-xl">
      yamazaki taketo
    </Link>
    <Link to="/artist2" className="hover:bg-gray-200 py-1 px-2 m-5 font-serif font-bold text-xl">
      kuriki tomohiro
    </Link>
    <Link to="/artist3" className="hover:bg-gray-200 py-1 px-2 m-5 font-serif font-bold text-xl">
      iwaki haruka
    </Link>
    <Link to="/artist4" className="hover:bg-gray-200 py-1 px-2 m-5 font-serif font-bold text-xl">
      satou takuya
    </Link>
  </ul>
</div>

</div>
                  

    <a href="/news" className="font-semibold text-white transition duration-100 hover:text-indigo-300 active:text-indigo-700 text-3xl">News</a>
  </nav>



  <div class="flex divide-x border-r sm:border-l">
  <>
    {!userId && (
      <Link to="/memberlogin" className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-blue-400 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24">
        <span className="hidden text-xl font-semibold text-white sm:block">Login</span>
      </Link>
    )}
    {!userId && (
      <Link to="/signup" className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-blue-400 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24">
        <span className="hidden text-xl font-semibold text-white sm:block">SignUp</span>
      </Link>
    )}
  </>
    {userId && (
    <>
    {userEmail && (
      <h2 className="flex items-center text-xl text-white m-5">Welcome, Mr./Ms. 
      <p className="text-red-200 ml-2">
      {userEmail}
      </p>
      </h2>
      )}
      </>
    )}
     





{cartCount > 0 ? (
  <Link to="/cart" className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-blue-400 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24 relative">
    <span className="hidden text-xl font-semibold text-white sm:block">Cart</span>
    <div className="absolute -top-0 -right-1 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-1xl font-semibold">
      {cartCount}
    </div>
  </Link>
) : (
  <Link to="/empty" className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-blue-400 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24 relative">
    <span className="hidden text-xl font-semibold text-white sm:block">Cart</span>
  </Link>
)}





    <button type="button"  onClick={toggleMenu} class="flex h-12 w-12 flex-col items-center justify-center gap-1.5 transition duration-100 hover:bg-gray-100 active:bg-gray-200 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>

          <span class="hidden text-xs font-semibold text-gray-500 sm:block">Menu</span>
        </button>
  </div>
</div>
</header>
</div>
    </>

  );
};

export default MenuBar;
