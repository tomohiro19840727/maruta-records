import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // 必要に応じてロケールを指定してください
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Link } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(timezone);

const Shop = ({ 
  title,setTitle, price, setPrice,postText2,setPostText2,singleImage,setSingleImage,prevPrice, setPrevPrice,
  selectedTitle,selectedSetTitle, selectedPrice, selectedSetPrice, selectedPostText2, selectedSetPostText2,selectedSingleImage, selectedSetSingleImage, selectedPrevPrice,  selectedSetPrevPrice,
  
}) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
        imgUrl: post.imgUrl,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'cart'), cartItem);
      alert('カートに入れました');;
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };



  const handleClick = (post) => {
    selectedSetTitle(post.title);
    selectedSetPrice(post.price);
    selectedSetPrevPrice(post.prevPrice);
    selectedSetPostText2(post.postsText2);
    selectedSetSingleImage(post.imgUrl);
    
    
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    window.location.href = '/shop';

  };

  const sortedLists = postList.sort((a, b) => b.createdAt - a.createdAt);


  return (
    <>
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
            <>
            <Link to="/shopdetail"  onClick={() => handleClick(post)} >
            <img src={post.imgUrl} loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>
            </>
  
            <div class="absolute left-0 bottom-2 flex gap-2">
              <span class="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              <span class="rounded-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">New</span>
            </div>
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