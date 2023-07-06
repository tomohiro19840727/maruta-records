
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { db } from '../firebase';
import ReactPlayer from 'react-player';


const ShopDetail = ({selectedTitle, selectedPrice,  selectedPostText2, selectedSingleImage1, selectedSingleImage2,selectedSingleImage3, selectedPrevPrice, 
  selectedAudioUrl}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);

    const handlePlay = (audioUrl) => {
      setIsPlaying(true);
    };
  
    const handlePause = () => {
      setIsPlaying(false); 
    };
 
    const handleAddCart = (post) => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        // userId が存在する場合の処理
        handleAddToCart(post);
      } else {
        // userId が存在しない場合の処理
        window.location.href = '/empty';
      }
     }

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const cartItem = {
        title: selectedTitle,
        price: selectedPrice,
        postsText2: selectedPostText2,
        prevPrice: selectedPrevPrice,
        imgUrl: selectedSingleImage1,
        createdAt: serverTimestamp(),
        userId: userId
      };

      await addDoc(collection(db, 'cart'), cartItem);
      alert('カートに入れました');;
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };


  return (

    <div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-lg px-4 md:px-8">
 
    <div class="grid gap-8 md:grid-cols-2">
           
      <div class="space-y-4">
        <div class="relative overflow-hidden rounded-lg bg-gray-100">
          <img src={selectedSingleImage1} loading="lazy" alt="Photo by Himanshu Dewangan" class="h-full w-full object-cover object-center" />
        </div>
      
        {/* <>
            <div class="absolute left-0 bottom-2 flex gap-2 ">
               <button onClick={(e) => { e.stopPropagation(); handlePlay(); }} class="rounded-lg bg-white px-3 ml-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">サンプル再生</button>
               <button onClick={(e) => { e.stopPropagation(); handlePause(); }} class="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">停止</button>
            </div>
            <div>
            <ReactPlayer
             ref={playerRef}
             url={selectedAudioUrl}
             playing={isPlaying}
             />
            </div>
             </> */}
        
         

        {/* <div class="grid grid-cols-2 gap-4">
          <div class="overflow-hidden rounded-lg bg-gray-100">
            <img src={selectedSingleImage2} loading="lazy" alt="Photo by Himanshu Dewangan" class="h-full w-full object-cover object-center" />
          </div>

          <div class="overflow-hidden rounded-lg bg-gray-100">
            <img src={selectedSingleImage3} loading="lazy" alt="Photo by Himanshu Dewangan" class="h-full w-full object-cover object-center" />
          </div>
        </div> */}

  {selectedSingleImage2 && (
<div class="grid grid-cols-2 gap-4">
    <div class="overflow-hidden rounded-lg bg-gray-100">
      <img src={selectedSingleImage2} loading="lazy" alt="Photo by Himanshu Dewangan" class="h-full w-full object-cover object-center" />
    </div>
  
    <div class="overflow-hidden rounded-lg bg-gray-100">
      <img src={selectedSingleImage3} loading="lazy" alt="Photo by Himanshu Dewangan" class="h-full w-full object-cover object-center" />
    </div>
</div>
  )}
      </div>
      

      
      <div class="md:py-8">
      
        <div class="mb-2 md:mb-3">
          
          <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl">{selectedTitle}</h2>
        </div>
  
          
        <div class="mb-4">
          <div class="flex items-end gap-2">
            <span class="text-xl font-bold text-gray-800 md:text-2xl">{selectedPrice}円</span>
            <span class="mb-0.5 text-red-500 line-through">{selectedPrevPrice}円</span>
          </div>

          <span class="text-sm text-gray-500">incl. VAT plus shipping</span>
        </div>
      

      
        <div class="mb-6 flex items-center gap-2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>

          <span class="text-sm">2-4 day shipping</span>
        </div>
      

      
        <div class="flex gap-2.5">
          <button onClick={() => handleAddCart()} class="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base">Add to cart</button>
        </div>



        <div class="mt-10 md:mt-16 lg:mt-20">
          <div class="mb-3 text-lg font-semibold text-gray-800">Description</div>

          <p class="text-gray-500">
            {selectedPostText2}
          </p>
        </div>
      
      </div>
    </div>
      
  </div>
</div>
  )
}

export default ShopDetail