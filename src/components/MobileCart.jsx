import {  collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

const MobileCart = ({ userId }) => {
  const [cartList, setCartList] = useState([]);

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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'cart', id));
    window.location.href = '/cart';
  };

  const calculateTotal = () => {
    const total = cartList.reduce((acc, item) => acc + item.price, 0);
    return total + 720; 
  };


  return (
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
  
            <div>
          
             
  
            
            </div>
          </div>
          
  
          <div class="flex w-full justify-between border-t p-4">
        
          <button onClick={() => handleDelete(item.id)}class="select-none text-lg font-semibold text-indigo-500 transition duration-100 hover:text-red-600 active:text-indigo-700 mt-20">Delete</button>
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
                <span class="text-lg font-bold">{calculateTotal()}円</span>
                <span class="text-sm text-gray-500">消費税込み</span>
              </span>
            </div>
          </div>
        </div>
  
        <button class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Check out</button>
      </div>
      
    </div>
  </div>
  )
}

export default MobileCart