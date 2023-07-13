import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, provider } from '../firebase';
import { Link, useNavigate } from "react-router-dom"

function Login({ setIsAuth, setUserId }) {
  const navigate = useNavigate();
  const loginInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    // 特定のドメインのみを許可する場合
    provider.setCustomParameters({
      login_hint : "tomohirofarm@gmail.com"
    });
   signInWithPopup(auth, provider).then((result) => {
    const userId = result.user.uid;
    localStorage.setItem("isAuth", true);
    setUserId(userId);
    setIsAuth(true);
    navigate("/")
    
   });
  };

  return (
    <>
    <div className='bg-white py-6 sm:py-8 lg:py-12 bg-h-screen w-full bg-gradient-to-br
    from-violet-300 via-blue-100 to-orange-100 '>

    <div className='text-5xl flex justify-center m-24 '>
   
      <br />
      <button onClick={loginInWithGoogle} className='hover:text-blue-400 px-10 py-4  font-semibold  text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto'>管理者用 Googleでログイン</button>
    </div>
    <p className='m-10 font-bold text-2xl'>* 申し訳ありません<br /> お客様につきましてはこのページではログインできません, <br />つきましては以下の「ログイン」か「会員登録」をお願い致します</p>
   <div className='m-10'>
    <Link to="/memberlogin" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600 mr-10 text-4xl">ログイン</Link> 

    <Link to="/signup" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600 text-4xl">会員登録</Link>  
   </div>

    </div>
      </>
  )
}

export default Login
