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

const MobileShop = ({ isAuth,selectedTitle,selectedSetTitle, selectedPrice, selectedSetPrice, selectedPostText2, selectedSetPostText2,selectedSingleImage, selectedSetSingleImage1, selectedSetSingleImage2, selectedSetSingleImage3,selectedPrevPrice,  selectedSetPrevPrice, selectedSetaudioUrl
,userId  
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


  const handleAddToCart = (post) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // userId が存在する場合の処理
      addToCart(post);
    } else {
      // userId が存在しない場合の処理
      window.location.href = '/empty';
    }
   }

  const addToCart = async (post) => {
    const userId = localStorage.getItem('userId');
    try {
      const cartItem = {
        title: post.title,
        price: post.price,
        postsText2: post.postsText2,
        prevPrice: post.prevPrice,
        imgUrl: post.imgUrl1,
        createdAt: serverTimestamp(),
        userId: userId
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
  console.log(sortedLists)
  

  return (
    <>
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
            <hr className="border-b-2 border-gray-300 my-3" />
          <div  class="group relative m-5 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg ">
            <Link to="/shopdetail">
            <img 
            src={post.imgUrl1} 
            onClick={() => handleClick(post)} 
            loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>
         
            
          </div>
  
          <div class="flex items-start justify-between gap-2 px-2">
            <div class="flex flex-col">
              <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">{post.title}</a>
              <span class="text-gray-500">
              <div dangerouslySetInnerHTML={{ __html: post.postsText2 }} />
                </span>               
            </div>
        </div>
               
               
            <div class="flex flex-col items-end m-3"> 
              <span class="font-bold text-gray-600 lg:text-xl">{post.price}円</span>
              <span class="text-sm text-red-500 line-through mt-3.5 mb-4">{post.prevPrice}円</span>
              <button onClick={() => handleAddToCart(post)}
             class="inline-block flex-1 rounded-lg bg-indigo-500 px-5 py-2 text-center text-xxs font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-xs”
             style=”font-size: 2px;"
             >Add Cart</button>
         
     
      
            
             {!isAuth ?
             <>
             </>
             :
            <button onClick={() => handleDelete(post.id)}>削除</button>
             }
            </div>
            <div>
     
    </div>
            {post.audioUrl && ( //
          <>
          <div class="">
             <button onClick={(e) => { e.stopPropagation(); handlePlay(post.audioUrl); }} class="rounded-lg bg-blue-200 mr-5 p-2 text-sm font-bold uppercase tracking-wider text-gray-800">サンプル再生</button>
             <button onClick={(e) => { e.stopPropagation(); handlePause(post.audioUrl); }} class="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">停止</button>
          </div>
          <div>
          <ReactPlayer
           ref={playerRef}
           url={post.audioUrl}
           playing={currentAudio === post.audioUrl && isPlaying}
           width="100%" // プレーヤーの幅を指定する
           height="auto" // プレーヤーの高さを自動調整する
         
           />
          </div>
          </>
          )}
          
          </div>
         ))}
      </div>
    </div>
  </div>

    
    
    </>
  )
}


export default MobileShop;