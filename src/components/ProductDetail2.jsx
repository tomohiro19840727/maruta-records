import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // 必要に応じてロケールを指定してください
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const ProductDetail2 = () => {
  const [welcomesPostList, welcomesSetPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'posts3'), orderBy('createdAt', 'desc')));
      welcomesSetPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);


  const welcomesSortedLists = welcomesPostList.sort((a, b) => b.createdAt - a.createdAt);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts3', id));
    window.location.href = '/productdetail2';

  };

  return (

    <div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    
    <div class="mb-10 md:mb-16">
      <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-5xl">ProductDetail</h2>
    </div>
    

    <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
      
    {welcomesSortedLists.map((post) => (
      <div class="flex flex-col overflow-hidden rounded-lg border bg-white">
        <a href="#" class="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
          <img src={post.welcomeImgUrl} loading="lazy" alt="Photo by Minh Pham" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </a>

        <div class="flex flex-1 flex-col p-4 sm:p-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-800">
            <a href="#" class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">{post.welcomeTitle}</a>
          </h2>

          <div class="mt-auto flex items-end justify-between">
            <div class="flex items-center gap-2">
              <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
              </div>

              <div>
                <span class="block text-sm text-gray-400"> {dayjs.unix(Number(post.createdAt)).tz('Asia/Tokyo').format('MM/DD HH:mm')}</span>
              </div>
            </div>

            <button  onClick={() => handleDelete(post.id)} class="rounded border px-2 py-1 text-sm text-gray-500">削除</button>
          </div>
        </div>
      </div>
       ))}  
    </div>
  </div>
</div>
  )
}

export default ProductDetail2