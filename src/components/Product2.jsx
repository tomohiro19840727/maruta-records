import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';

function Product2({ welcomeTitle, welcomePostText2,welcomeSetTitle, welcomePostText,welcomePrice, welcomeSetPrevPrice, welcomeSetPostText2,welcomeSetPrice,welcomePrevPrice,  welcomeSingleImage1, welcomeSingleImage2, welcomeSingleImage3, welcomeSetSingleImage1, welcomeSetSingleImage2, welcomeSetSingleImage3}) {
  

  const navigate = useNavigate();

  // 
  const handleImage = (e) => {
    e.preventDefault();
    let pickedFile;

    if (e.target.files && e.target.files.length > 0) {
      pickedFile = e.target.files[0];
      welcomeSetSingleImage1(pickedFile);
    }
  };
  const handleImage2 = (e) => {
    e.preventDefault();
    let pickedFile;

    if (e.target.files && e.target.files.length > 0) {
      pickedFile = e.target.files[0];
      welcomeSetSingleImage2(pickedFile);
    }
  };
  const handleImage3 = (e) => {
    e.preventDefault();
    let pickedFile;

    if (e.target.files && e.target.files.length > 0) {
      pickedFile = e.target.files[0];
      welcomeSetSingleImage3(pickedFile);
    }
  };

  // 
  
  const createPost = async (e) => {
    e.preventDefault();
    const convertedPrice = Number(welcomePrice);
    const convertedprevPrice = Number(welcomePrevPrice);

    // const imageRef = ref(storage, `images/${singleImage.name}`);
    const imageRef1 = ref(storage, `images/${welcomeSingleImage1.name}`);
    const imageRef2 = ref(storage, `images/${welcomeSingleImage2.name}`);
    const imageRef3 = ref(storage, `images/${welcomeSingleImage3.name}`);

    Promise.all([
      uploadBytes(imageRef1, welcomeSingleImage1),
      uploadBytes(imageRef2, welcomeSingleImage2),
      uploadBytes(imageRef3, welcomeSingleImage3)
    ]).then((res) => {
      alert('投稿に成功しました');
    
      Promise.all([
        getDownloadURL(imageRef1),
        getDownloadURL(imageRef2),
        getDownloadURL(imageRef3)
      ]).then(([imageUrl1, imageUrl2, imageUrl3]) => {
        const post = { 
          welcomeTitle: welcomeTitle,
          price: convertedPrice,
          welcomePostText2: welcomePostText2.replace(/\n/g, '<br />'),
          prevPrice: convertedprevPrice,
          imgUrl1: imageUrl1,
          imgUrl2: imageUrl2,
          imgUrl3: imageUrl3,
          createdAt: serverTimestamp(), 
         };
        addDoc(collection(db, 'posts3'), post ).then((docRef) => {
          // const postId = docRef.id;
          // if (audioFile) {
          //   uploadAudio(postId, audioFile); // 音源ファイルのアップロードとURL保存処理を呼び出す
          // }

          alert('投稿に成功しました');
          navigate('/shop');
         });
        });
      });
    };

  return (
//    
<>

<div class="bg-white  sm:py-8 lg:py-12 min-h-screen bg-gradient-to-br   from-violet-300 via-pink-100 to-orange-100 py-6 mb-10">
<div class="mx-auto max-w-screen-2xl px-4 md:px-8">
  
  <div class="mb-10 md:mb-16">
    <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-5xl">商品投稿</h2>
  </div>
  
  <form onSubmit={createPost} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
    <div class="sm:col-span-2">
      <label class="mb-2 inline-block text-sm text-g  ray-800 sm:text-base">タイトル</label>
      <input  type="text"
        placeholder="商品名を記入"
        onChange={(e) => welcomeSetTitle(e.target.value)}
        class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
</div>

    <div class="sm:col-span-2">
      <label class="mb-2 inline-block text-sm text-g  ray-800 sm:text-base">値段</label>
      <input  type="text"
        placeholder="値段を記入"
        onChange={(e) => welcomeSetPrice(e.target.value)}
        class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
</div>
    <div class="sm:col-span-2">
      <label class="mb-2 inline-block text-sm text-g  ray-800 sm:text-base">以前の値段</label>
      <input  type="text"
        placeholder="前の値段を記入"
        onChange={(e) => welcomeSetPrevPrice(e.target.value)}
        class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
</div>


<div class="sm:col-span-2">
  <label  class="mb-2 inline-block text-sm text-gray-800 sm:text-base">画像</label>
  <input  type="file"
          accept="png, .jpeg, .jpg, .HEIC"
          onChange={handleImage} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
</div>
<div class="sm:col-span-2">
  <label  class="mb-2 inline-block text-sm text-gray-800 sm:text-base">画像</label>
  <input  type="file"
          accept="png, .jpeg, .jpg, .HEIC"
          onChange={handleImage2} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
</div>

<div class="sm:col-span-2">
  <label  class="mb-2 inline-block text-sm text-gray-800 sm:text-base">画像</label>
  <input  type="file"
          accept="png, .jpeg, .jpg, .HEIC"
          onChange={handleImage3} class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
</div>

{/* <div class="sm:col-span-2">
<label class="mb-2 inline-block text-sm text-gray-800 sm:text-base">音源</label>
<input
  type="file"
  accept="audio/*"
  onChange={handleAudio}
  class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
/>
</div> */}



<div class="sm:col-span-2">
<label class="mb-2 inline-block text-sm text-gray-800 sm:text-base">内容</label>
<div class="h-64 rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ">
<textarea
placeholder="内容を記入"
onChange={(e) => welcomeSetPostText2(e.target.value)}
class="w-full h-full resize-none outline-none"
></textarea>
</div>
</div>


<div class="flex items-center justify-between sm:col-span-2">
<button  class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base" type="submit" >Send</button>
</div>
</form> 
</div>
</div>
     </>
      );}
                    
  export default Product2;

