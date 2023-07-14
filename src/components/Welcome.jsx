import React, { useEffect, useState } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.min.css';
// import { Navigation, Pagination } from 'swiper';
// import 'swiper/css/navigation'; // スタイルをインポート
// import 'swiper/css/pagination'; // スタイルをインポート
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import "./Welcome.css"
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const Welcome = ({ title, welcomeSetTitle,  welcomeSingleImage, welcomeSetSingleImage, selectedSetTitle,
  selectedSetPrice,
  selectedSetPrevPrice,
  selectedSetPostText2,
  selectedSetSingleImage1,
  selectedSetSingleImage2,
  selectedSetSingleImage3,
}) => {

  const [welcomePostList, welcomeSetPostList] = useState([]);
  const [welcomePostList2, welcomeSetPostList2] = useState([]);

  // const [selectedLinkTo, setSelectedLinkTo] = useState('');

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
      const data = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
      welcomeSetPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'posts2'), orderBy('createdAt', 'desc')));
      welcomeSetPostList2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const handleClick = (post) => {
    selectedSetTitle(post.title);
    selectedSetPrice(post.price);
    selectedSetPrevPrice(post.prevPrice);
    selectedSetPostText2(post.postsText2);
    selectedSetSingleImage1(post.imgUrl1);
    selectedSetSingleImage2(post.imgUrl2);
    selectedSetSingleImage3(post.imgUrl3);

    // const linkTo = post.collection === 'posts2' ? '/eventdetail' : '/shopdetail';
    // setSelectedLinkTo(linkTo);
    // console.log(selectedLinkTo)
  };


  const welcomeSortedLists = welcomePostList.sort((a, b) => b.createdAt - a.createdAt);
  const welcomeSortedLists2 = welcomePostList2.sort((a, b) => b.createdAt - a.createdAt);


  return (
    <div class="bg-white pb-6 sm:pb-8 lg:pb-12">  
  <section class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div class="mb-8 flex flex-wrap justify-between md:mb-16 fade">
      <div class="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pt-48 lg:pb-24 ">
        <h1
          
         class="text-black-800 mb-4 text-4xl font-bold sm:text-5xl md:mb-8 md:text-6xl ">Find your<br />style Music</h1>

        <p
        
        class="max-w-md leading-relaxed text-gray-500 xl:text-lg font-serif font-bold">豊かな音楽の世界を極上のレコードで体験せよ!<br/><br/>オールジャンル、希少盤も充実。<br/>音楽旅を彩る最高の選択肢をあなたに・・・
        </p>
      </div>

      <div class="mb-12 flex  w-1/2 mr-20">
        <div class="relative  z-10  overflow-hidden rounded-lg bg-gray-100 shadow-lg top-16 left-16 ml-0
        group  block   bg-gray-100 
        ">
        <Swiper  modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            effect="fade"
            >

            {[...welcomeSortedLists.slice(0, 3), ...welcomeSortedLists2.slice(0, 1)].map((post) => (
              <div key={post.id}>
              <SwiperSlide>
               <Link to={post.price === 0 ? '/eventdetail' : '/shopdetail'} >
                <img src={post.imgUrl1} onClick={() => handleClick(post)} alt="1" className=' h-96 w-full object-cover object-center'/>
               </Link>             
                <p className='m-16 text-xl font-serif font-bold'>{post.title}</p>
              </SwiperSlide>
              </div>
      ))}  
    </Swiper>
        </div>

        
      </div>
    </div>
  </section>
</div>
  )
}

export default Welcome