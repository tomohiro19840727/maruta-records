import axios from 'axios';
import React from 'react'

const Test = () => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post('/create-payment-intent', {
        amount: 3500,
      });
      // レスポンスを処理するコードを追加する
      console.log('Payment Intent created:', response.data.clientSecret);
      // console.log(totalAmount)
      // 例: ページ遷移や他のアクションのトリガーなど
    } catch (error) {
      console.log('Failed to create Payment Intent:', error.message);
      // エラーレスポンスの処理
      // 例: エラーメッセージの表示やリトライ処理など
    }
  };


  return (
    <button onClick={() => handleCheckout()}>ボタン</button>
  )
}

export default Test