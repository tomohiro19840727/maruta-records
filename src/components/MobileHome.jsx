import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // 必要に応じてロケールを指定してください
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Welcome from './Welcome';
import Search from './Search';
import Sale from './Sale';
import Footer from './Footer';
import MobileWelcome from './MobileWelcome';

dayjs.extend(utc);
dayjs.extend(timezone);


const MobileHome = ({selectedTitle,selectedSetTitle, selectedPrice, selectedSetPrice, selectedPostText2, selectedSetPostText2,selectedSingleImage1, selectedSetSingleImage1, selectedPrevPrice,  selectedSetPrevPrice, isAuth,isMobile,
  welcomeTitle, welcomeSetTitle, welcomeSingleImage, welcomeSetSingleImage,
 selectedSetSingleImage2, selectedSetSingleImage3,selectedSingleImage2,selectedSingleImage3
}) => {
  const [postList, setPostList] = useState([]);
  const [newsPostList, newsSetPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data2 = await getDocs(query(collection(db, 'posts2'), orderBy('createdAt', 'desc'),limit(4)));
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
    selectedSetSingleImage1(post.imgUrl1)
    selectedSetSingleImage2(post.imgUrl2)
    selectedSetSingleImage3(post.imgUrl3)
  };

  const handleClick2 = (post) => {
    selectedSetTitle(post.title);
    selectedSetPostText2(post.postsText2);
    selectedSetSingleImage1(post.imgUrl1);
  };

  return (
  <>
   {isMobile ? (<MobileWelcome 
   selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}
          
   selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}
   
   selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}
   
   selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}
   
   selectedSingleImage1={selectedSingleImage1} selectedSetSingleImage1={selectedSetSingleImage1}
   selectedSingleImage2={selectedSingleImage2} selectedSetSingleImage2={selectedSetSingleImage2}
   selectedSingleImage3={selectedSingleImage3} selectedSetSingleImage3={selectedSetSingleImage3}
   /> ) : ( 
   <Welcome 
   welcomeTitle={welcomeTitle}
   welcomeSetTitle={welcomeSetTitle}
   welcomeSingleImage={welcomeSingleImage}
   welcomeSetSingleImage={welcomeSetSingleImage}
   selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}
          
          selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}
          
          selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}
          
          selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}
          
          selectedSingleImage1={selectedSingleImage1} selectedSetSingleImage1={selectedSetSingleImage1}
          selectedSingleImage2={selectedSingleImage2} selectedSetSingleImage2={selectedSetSingleImage2}
          selectedSingleImage3={selectedSingleImage3} selectedSetSingleImage3={selectedSetSingleImage3}
   />  )}
   

<div class="bg-white py-6">
    <div class="mx-auto max-w-screen-2xl px-4 mt-10">
      
      <div class="mb-10 md:mb-16">
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-5xl">Melodic nostalgia unleashed!</h2>
  
        <p class="mx-auto max-w-screen-md text-center font-serif font-bold text-gray-500 md:text-lg">" Groove Grandeur: Experience the Soul of SoundS "<br/>
        " グルーヴの壮大さ：音の魂に身を委ねよう "
        </p>
      </div>
      
  
      <div class="grid  gap-y-12">
      {sortedLists.map((post) => (
        <div>
            <hr className="border-b-2 border-gray-300 my-10" />
          <div  class="group relative m-5 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg ">
            <Link to="/shopdetail">
            <img 
            src={post.imgUrl1} 
            onClick={() => handleClick(post)} 
            loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>
  
            <div class="absolute left-0 bottom-2 flex gap-2">
              <span class="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              <span class="rounded-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">New</span>
            </div>
          </div>
  
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

    
    <Search />

    {/* <Sale /> */}



<div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <h2 class=" mt-10 text-center text-2xl font-bold text-gray-800 md:mb-5 lg:text-4xl">"Groove Odyssey: Journey Through Vinyl Sounds"</h2>
    <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-2xl md:mb-20">
「グルーヴ・オデッセイ：ヴァイナル・サウンドの旅」</p>

    <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
    {newsSortedLists.map((post) => (
      <div class="flex flex-col overflow-hidden rounded-lg border bg-white mt-10">
        <Link to="/eventdetail"  onClick={() => handleClick2(post)} class="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
          <img src={post.imgUrl1} loading="lazy" alt="Photo by Minh Pham" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </Link>

        <div class="flex flex-1 flex-col p-4 sm:p-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-800">
            <a href="#" class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">{post.title}</a>
          </h2>

          <p class="mb-8 text-gray-500 font-bold text-xl">
                <div dangerouslySetInnerHTML={{ __html: post.postsText2 }} />
          </p>

          <div class="mt-auto flex items-end justify-between">
            <div class="flex items-center gap-2">
              <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
              </div>

              <div>
                <span class="block text-xl text-gray-600"> {dayjs.unix(Number(post.createdAt)).tz('Asia/Tokyo').format('MM/DD HH:mm')}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
       ))} 


    <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">  
    </div>

      
   

   
    </div>
  </div>
</div>

<Footer 
isAuth={isAuth}
/>

  </>
  )
}

export default MobileHome