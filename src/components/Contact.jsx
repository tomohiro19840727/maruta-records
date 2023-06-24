import React, { useState } from 'react'
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
   
    const userID = process.env.REACT_APP_USER_ID;
    const serviceID = process.env.REACT_APP_SERVICE_ID;
    const templateID = process.env.REACT_APP_TEMPLATE_ID

    emailjs.init(process.env.REACT_APP_USER_ID);

    const template_param = {
      user_name: name,
      user_email: email,
      message: message
    };

    emailjs.send(serviceID,templateID, template_param, userID )
      .then((response) => {
        alert('お問合せ内容を送信しました')
          console.log('メールが送信されました');
          // フォームの送信後に入力内容をリセット
          setIsSubmitted(true);
          setName('');
          setEmail('');
          setMessage('');
        
      })
      .catch((error) => {
        console.error('エラー:', error);
      });
  };

  return (
    <div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      
      <div class="mb-10 md:mb-16">
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-20 lg:text-5xl">Get in touch</h2>
      </div>
      
  
      
      <form  onSubmit={handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
        <div>
          <label for="first-name" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">name</label>
          <input 
          type="text"
          placeholder="田中"
          value={name}
          onChange={(e) => setName(e.target.value)}
         class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>
  
  
        
  
        <div class="sm:col-span-2">
          <label for="email" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
          <input 
          type="email"
          placeholder="example@yahoo.co.jp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>
  
       
  
        <div class="sm:col-span-2">
          <label for="message" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Message</label>
          <textarea 
           value={message}
           onChange={(e) => setMessage(e.target.value)}
           class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
        </div>
  
        <div class="flex items-center justify-between sm:col-span-2">
          <button class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Send</button>
  
         
        </div>
      </form>
      {isSubmitted && (
                  <p className="text-green-400 text-xl text-bold text-center m-10">
                  ありがとうございます。お問合せ内容を受け付けました。
                  </p>
      )}
    </div>
  </div>
  
  )
}

export default Contact