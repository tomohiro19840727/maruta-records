import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // 必要に応じてロケールを指定してください
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Welcome from './Welcome';

dayjs.extend(utc);
dayjs.extend(timezone);


const Home = ({selectedTitle,selectedSetTitle, selectedPrice, selectedSetPrice, selectedPostText2, selectedSetPostText2,selectedSingleImage, selectedSetSingleImage, selectedPrevPrice,  selectedSetPrevPrice }) => {
  const [postList, setPostList] = useState([]);
  const [newsPostList, newsSetPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data2 = await getDocs(query(collection(db, 'posts2'), orderBy('createdAt', 'desc')));
      newsSetPostList(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const data = await getDocs(query(collection(db, "posts"),orderBy("createdAt", "desc"),limit(4)));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    }
    getPosts();
   },[]);
  
   const newsSortedLists = newsPostList.sort((a, b) => b.createdAt - a.createdAt);
   const sortedLists = postList.sort((a, b) => b.createdAt - a.createdAt);

   const handleClick = (post) => {
    selectedSetTitle(post.title);
    selectedSetPrice(post.price);
    selectedSetPrevPrice(post.prevPrice);
    selectedSetPostText2(post.postsText2);
    selectedSetSingleImage(post.imgUrl)
    
  };

  return (
  <>
   <Welcome />

<div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8 mb-10">
      
      <div class="mb-10 md:mb-16">
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-5xl">Melodic nostalgia unleashed!</h2>
  
        <p class="mx-auto max-w-screen-md text-center font-serif font-bold text-gray-500 md:text-lg">" Groove Grandeur: Experience the Soul of SoundS "<br/>
        " グルーヴの壮大さ：音の魂に身を委ねよう "
        </p>
      </div>
      
  
      <div class="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        
      {sortedLists.map((post) => (
        <div>
          <a href="#" class="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
            <Link to="/shopdetail">
            <img 
            src={post.imgUrl} 
            onClick={() => handleClick(post)} 
            loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>
  
            <div class="absolute left-0 bottom-2 flex gap-2">
              <span class="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              <span class="rounded-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">New</span>
            </div>
          </a>
  
          <div class="flex items-start justify-between gap-2 px-2">
            <div class="flex flex-col">
              <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">{post.title}</a>
            </div>
        </div>
              
            <div class="flex flex-col items-end"> 
              <span class="font-bold text-gray-600 lg:text-xl">{post.price}円</span>
              <span class="text-sm text-red-500 line-through mt-3.5">{post.prevPrice}円</span>
            </div>
          </div>
         ))}
      </div>
    </div>
  </div>
<div>
    </div>
    

<div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div class="flex flex-col overflow-hidden rounded-lg bg-gray-900 sm:flex-row md:h-80">

      <div class="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
        <h2 class="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">Summer Sale<br />Up to 70% off.</h2>

        <p class="mb-8 max-w-md text-gray-400">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text.</p>

        <div class="mt-auto">
          <a href="#" class="inline-block rounded-lg bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">Save now</a>
        </div>
      </div>



      <div class="order-first h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
        <img src="https://images.unsplash.com/photo-1505846951821-e25bacf2eccd?auto=format&q=75&fit=crop&crop=top&w=1000&h=500" loading="lazy" alt="Photo by Dom Hill" class="h-full w-full object-cover object-center" />
      </div>

    </div>
  </div>
</div>



<div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <h2 class="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-12 lg:text-3xl">Collections</h2>

    <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
    {newsSortedLists.map((post) => (
      <div class="flex flex-col overflow-hidden rounded-lg border bg-white">
        <a href="#" class="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
          <img src={post.newsImgUrl} loading="lazy" alt="Photo by Minh Pham" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </a>

        <div class="flex flex-1 flex-col p-4 sm:p-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-800">
            <a href="#" class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">{post.newsTitle}</a>
          </h2>

          <p class="mb-8 text-gray-500 font-bold text-xl">
                <div dangerouslySetInnerHTML={{ __html: post.newsPostText }} />
          </p>

          <div class="mt-auto flex items-end justify-between">
            <div class="flex items-center gap-2">
              <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
              </div>

              <div>
                <span class="block text-indigo-500">Mike Lane</span>
                <span class="block text-sm text-gray-400"> {dayjs.unix(Number(post.createdAt)).tz('Asia/Tokyo').format('MM/DD HH:mm')}</span>
              </div>
            </div>

            <span class="rounded border px-2 py-1 text-sm text-gray-500">Article</span>
          </div>
        </div>
      </div>
       ))} 


    <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">  
    </div>

      
   

   
    </div>
  </div>
</div>



<div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div class="flex flex-col items-center rounded-lg bg-gray-100 p-4 sm:p-8 lg:flex-row lg:justify-between">
      <div class="mb-4 sm:mb-8 lg:mb-0">
        <h2 class="text-center text-xl font-bold text-indigo-500 sm:text-2xl lg:text-left lg:text-3xl">Get the latest updates</h2>
        <p class="text-center text-gray-500 lg:text-left">Sign up for our newsletter</p>
      </div>

      <div class="flex flex-col items-center lg:items-end">
        <form class="mb-3 flex w-full max-w-md gap-2">
          <input placeholder="Email" class="bg-gray-white w-full flex-1 rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 outline-none ring-indigo-300 transition duration-100 focus:ring" />

          <button class="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Send</button>
        </form>

        <p class="text-center text-xs text-gray-400 lg:text-right">By signing up to our newsletter you agree to our <a href="#" class="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Term of Service</a> and <a href="#" class="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</a>.</p>
      </div>
    </div>
  </div>
</div>



<div class="bg-white pt-4 sm:pt-10 lg:pt-12">
  <footer class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div class="mb-16 grid grid-cols-2 gap-12 border-t pt-10 md:grid-cols-4 lg:grid-cols-6 lg:gap-8 lg:pt-12">
      <div class="col-span-full lg:col-span-2">

        <div class="mb-4 lg:-mt-2">
          <a href="/" class="text-black-800 inline-flex items-center gap-2 text-xl font-bold md:text-2xl" aria-label="logo">
            <svg width="95" height="94" viewBox="0 0 95 94" class="h-auto w-5 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>

            MARUTA-Records
          </a>
        </div>


        <p class="mb-6 text-gray-500 sm:pr-8">Filler text is dummy text which has no meaning however looks very similar to real text.</p>


        <div class="flex gap-4">
          <a href="#" target="_blank" class="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
            <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a href="#" target="_blank" class="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
            <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>

          <a href="#" target="_blank" class="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
            <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.4168 2.4594C17.7648 0.873472 15.4785 0 12.9793 0C9.1616 0 6.81353 1.56493 5.51603 2.87767C3.91693 4.49547 3 6.64362 3 8.77138C3 11.4429 4.11746 13.4934 5.98876 14.2563C6.11439 14.3078 6.24081 14.3337 6.36475 14.3337C6.75953 14.3337 7.07233 14.0754 7.1807 13.661C7.24389 13.4233 7.39024 12.8369 7.45389 12.5823C7.59011 12.0795 7.48005 11.8377 7.18295 11.4876C6.64173 10.8472 6.38969 10.0899 6.38969 9.10438C6.38969 6.17698 8.56948 3.06578 12.6095 3.06578C15.8151 3.06578 17.8064 4.88772 17.8064 7.82052C17.8064 9.67124 17.4077 11.3852 16.6837 12.6468C16.1805 13.5235 15.2957 14.5685 13.9375 14.5685C13.3501 14.5685 12.8225 14.3272 12.4896 13.9066C12.1751 13.5089 12.0714 12.9953 12.1979 12.4599C12.3408 11.855 12.5357 11.2241 12.7243 10.6141C13.0682 9.5001 13.3933 8.44789 13.3933 7.60841C13.3933 6.17252 12.5106 5.20769 11.1969 5.20769C9.52737 5.20769 8.21941 6.90336 8.21941 9.06805C8.21941 10.1297 8.50155 10.9237 8.62929 11.2286C8.41896 12.1197 7.16899 17.4176 6.93189 18.4166C6.79478 18.9997 5.96893 23.6059 7.33586 23.9731C8.87168 24.3858 10.2445 19.8997 10.3842 19.3928C10.4975 18.9806 10.8937 17.4216 11.1365 16.4634C11.878 17.1775 13.0717 17.6603 14.2333 17.6603C16.4231 17.6603 18.3924 16.6749 19.7786 14.8858C21.1229 13.1505 21.8633 10.7318 21.8633 8.0757C21.8632 5.99923 20.9714 3.95209 19.4168 2.4594Z" />
            </svg>
          </a>
        </div>

      </div>


      <div>
        <div class="mb-4 font-bold uppercase tracking-widest text-gray-800">Products</div>

        <nav class="flex flex-col gap-4">
          <div>
            <a href="#" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Overview</a>
          </div>
          <Link to="/product" class=" font-semibold text-black transition duration-100 hover:text-indigo-300 active:text-indigo-700">Product</Link>
          <Link to="/event" class=" font-semibold text-black transition duration-100 hover:text-indigo-300 active:text-indigo-700">Event</Link>
          

          
          
        </nav>
      </div>



      <div>
        <div class="mb-4 font-bold uppercase tracking-widest text-gray-800">Company</div>

        <nav class="flex flex-col gap-4">
          <div>
            <a href="#" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">About</a>
          </div>

          

          

         

          <div>
            <a href="#" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Blog</a>
          </div>
        </nav>
      </div>



      <div>
        <div class="mb-4 font-bold uppercase tracking-widest text-gray-800">Support</div>

        <nav class="flex flex-col gap-4">
          <div>
            <Link to="/contact" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Contact</Link>
          </div>

          

          
          <div>
            <Link to="/faq" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">FAQ</Link>
          </div>
        </nav>
      </div>



      <div>
        <div class="mb-4 font-bold uppercase tracking-widest text-gray-800">Legal</div>

        <nav class="flex flex-col gap-4">
          <div>
            <Link to="/login" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Administrator login</Link>
          </div>

         
        </nav>
      </div>

    </div>

    <div class="border-t py-8 text-center text-sm text-gray-400">© 2023 - Present TOMOHIRO.KURIKI All rights reserved.</div>
  </footer>
</div>


  </>
  )
}

export default Home