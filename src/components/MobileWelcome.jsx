import React, { useEffect, useState } from 'react'
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import "./Welcome.css"
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Link } from 'react-router-dom';

const MobileWelcome = ({ welcomeTitle, welcomeSetTitle,  welcomeSingleImage, welcomeSetSingleImage}) => {
  const userId = localStorage.getItem('userId');
  const [userEmail, setUserEmail] = useState("");
  const [welcomePostList, welcomeSetPostList] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    
    return () => unsubscribe();
  }, []);

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
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'posts3'), orderBy('createdAt', 'desc')));
      welcomeSetPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);


  const welcomeSortedLists = welcomePostList.sort((a, b) => b.createdAt - a.createdAt);


  return (
    <div class="bg-white pb-6">  
  <section class="mx-auto max-w-screen-2xl px-5 ">
    <div class="mb-8 flex flex-wrap justify-between md:mb-16 fade">
      <div class="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pt-48 lg:pb-24 ">
        <h1
          // ref={aboutRef1}
         class="text-black-800 mb-4 text-4xl font-bold sm:text-5xl md:mb-8 md:text-6xl ">Find your<br />style Music</h1>

        <p
        //  ref={aboutRef2} 
        class="max-w-md leading-relaxed text-gray-500 xl:text-lg font-serif font-bold">豊かな音楽の世界を極上のレコードで体験せよ!<br/><br/>オールジャンル、希少盤も充実。<br/>音楽旅を彩る最高の選択肢をあなたに・・・
        </p>
      </div>

      <div class="mb-12 flex w-full ">
        <div class="relative top-12  z-10  overflow-hidden rounded-lg bg-gray-100 shadow-lg ">
        <Swiper  modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            effect="fade"
            >

            {welcomeSortedLists.map((post) => (
              <SwiperSlide>
               <Link to="/shop">
                <img src={post.welcomeImgUrl} alt="1" className='h-96 w-full object-cover object-center'/>
               </Link>             
                <p className='m-8 text-xl font-serif font-bold'>{post.welcomeTitle}</p>
              </SwiperSlide>
      ))}  
    </Swiper>
        </div>

        
      </div>
    </div>

    <div class="flex flex-col items-center justify-between gap-8 md:flex-row">
     


      <div class="flex items-center justify-center gap-4 lg:justify-start mt-10">

      <>
      {!userId && (
        <Link to="/memberlogin" class="px-3 py-2 relative rounded group font-medium text-white font-medium inline-block mr-10 text-sm">
<span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
<span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
<span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
<span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
<span class="relative">Login</span>
</Link>
      )}
       {!userId && (
        <Link to="/signup" class="px-3 py-2 relative rounded group font-medium text-white font-medium inline-block text-sm">
<span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
<span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
<span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
<span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
<span class="relative">
  <p className='text-ss text-center'>(Free)</p>SignUp</span>
</Link>
       )}
      </>

      {userId && (
    <>
    {userEmail && (
      <h2 className="text-xl text-black m-5 font-serif">Welcome, Mr./Ms. 
      <p className="text-red-600 font-serif">
      {userEmail}
      </p>
      </h2>
      )}
      </>
    )}
      </div>
    </div>
  </section>

</div>
  )
}

export default MobileWelcome;