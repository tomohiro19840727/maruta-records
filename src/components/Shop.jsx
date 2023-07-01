import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // 必要に応じてロケールを指定してください
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Link } from 'react-router-dom';
import "./Shop.css"
import ReactPlayer from 'react-player';

dayjs.extend(utc);
dayjs.extend(timezone);

const Shop = ({ 
  title,setTitle, price, setPrice,postText2,setPostText2,singleImage,setSingleImage,prevPrice, setPrevPrice,  audioFile, setAudioFile,  
  selectedTitle,selectedSetTitle, selectedPrice, selectedSetPrice, selectedPostText2, selectedSetPostText2,selectedSingleImage, selectedSetSingleImage1, selectedSetSingleImage2, selectedSetSingleImage3,selectedPrevPrice,  selectedSetPrevPrice, selectedSetaudioUrl
  
}) => {
  const [postList, setPostList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const playerRef = useRef(null);

  const handlePlay = (audioUrl) => {
    setCurrentAudio(audioUrl); 
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false); 
  };

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
    // const getPosts = async () => {
    //   const data = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
    //   setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
      for (const post of posts) {
        const docRef = doc(db, 'posts', post.id);
        const docSnap = await getDoc(docRef);
        const audioUrl = docSnap.get('audioUrl');
        post.audioUrl = audioUrl;
      }
    
      setPostList(posts);
    };
    
    getPosts();
  }, []); 

  console.log(postList)
  const addToCart = async (post) => {
    try {
      const cartItem = {
        title: post.title,
        price: post.price,
        postsText2: post.postsText2,
        prevPrice: post.prevPrice,
        imgUrl: post.imgUrl1,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'cart'), cartItem);
      alert('カートに入れました');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };



  const handleClick = (post) => {
    selectedSetTitle(post.title);
    selectedSetPrice(post.price);
    selectedSetPrevPrice(post.prevPrice);
    selectedSetPostText2(post.postsText2);
    selectedSetSingleImage1(post.imgUrl1);
    selectedSetSingleImage2(post.imgUrl2);
    selectedSetSingleImage3(post.imgUrl3);
    selectedSetaudioUrl(post.audioUrl);
  };

  

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    window.location.href = '/shop';

  };

  const sortedLists = postList.sort((a, b) => b.createdAt - a.createdAt);


  return (
    <>
    
    <div class="bg-white py-6 sm:py-8 lg:py-12 fade">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8 mb-10">
      
      <div class="mb-10 md:mb-16">
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-5xl">Melodic nostalgia unleashed!</h2>
  
        <p class="mx-auto max-w-screen-md text-center font-serif font-bold text-gray-500 md:text-lg">" Groove Grandeur: Experience the Soul of SoundS "<br/>
        " グルーヴの壮大さ：音の魂に身を委ねよう "
        </p>
      </div>
      
  
      <div class="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        
      {sortedLists.map((post) => (
        <div key={post.id}>
          
          <a href="#" class="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
            <>
            
            <Link to="/shopdetail"  onClick={() => handleClick(post)} >
            <img src={post.imgUrl1} loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>
            </>
            {post.audioUrl && ( //
            <>
            <div class="absolute left-0 bottom-2 flex gap-2">
              {/* <button onClick={() => handlePlay(post.audioUrl)} class="rounded-lg bg-white px-3 py-1.5 ml-2 text-sm font-bold uppercase tracking-wider text-gray-800">サンプル再生</button>
              <button  onClick={() => handlePause(post.audioUrl)} class="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">停止</button> */}
               <button onClick={(e) => { e.stopPropagation(); handlePlay(post.audioUrl); }} class="rounded-lg bg-white px-3 ml-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">サンプル再生</button>
               <button onClick={(e) => { e.stopPropagation(); handlePause(post.audioUrl); }} class="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">停止</button>
            </div>
            <div>
            <ReactPlayer
             ref={playerRef}
             url={post.audioUrl}
             playing={currentAudio === post.audioUrl && isPlaying}
             />
            </div>
             </>
            )}
          </a>

         
         
  
          <div class="flex items-start justify-between gap-2 px-2">
            <div class="flex flex-col">
              <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">{post.title}</a>
              <span class="text-gray-500">
              <div dangerouslySetInnerHTML={{ __html: post.postsText2 }} />
                </span>
            </div>
  
            <div class="flex flex-col items-end">
              <span class="font-bold text-gray-600 lg:text-lg">{post.price}円</span>
              <span class="text-sm text-red-500 line-through">{post.prevPrice}円</span>
          <button onClick={() => addToCart(post)}
             >カートに入れる</button>
          <button onClick={() => handleDelete(post.id)}>削除</button>
            </div>
          </div>
        </div>        
         ))}
      </div>
    </div>
  </div>
<div>
    </div>
    </>
  )
}

export default Shop