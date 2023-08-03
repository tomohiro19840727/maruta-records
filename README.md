# MARUTA-Records（DJのチーム名）
 DJが自作の音楽やグッズを売るECサイトです。<br >
 旅行先の景色や好きな景色を位置情報付きで共有できます。 <br >
 また管理者のみが商品やイベントを自由に投稿、削除ができます。<br > 
 レスポンシブ対応しているのでスマホからもご確認いただけます。
 <img width="1400" alt="スクリーンショット 2023-08-04 0 06 18" src="https://maruta-records.vercel.app/img/スクリーンショット 2023-08-03 9.07.02.png">
 <img width="350" height="700" src= "https://maruta-records.vercel.app/img/IMG_6904.jpg">

# URL
https://maruta-records.vercel.app/ <br >
画面上部のSignupからメールアドレスとパスワードを決めて会員登録をし、Loginして頂ければCartから買い物ができます。

# 使用技術
- React 18.2.0,
- Node.js 18.16.1
- Express 4.18.2
- axios 1.4.0
- Stripe 12.13.0    
- @emailjs/browser 3.11.0
- Tailwindcss 3.3.2
-  firebase: ^9.22.2,
  - Functions
  - Storage
  - Firestore Detabase
  - Authentication
- Vercel 


# AWS構成図
<img width="995" alt="スクリーンショット 2020-05-07 11 14 01" src="">


## デプロイ
- プロジェクトは自動的にVercelを使ってデプロイされます。`main`ブランチにプッシュした変更は自動的に[MARUTA-Recordsサイト](https://maruta-records.vercel.app/)にデプロイされます。

# 機能一覧
- ユーザー登録、ログイン機能, 管理者ログイン機能
- 投稿機能
  - Shopの商品投稿
  - Eventの投稿
- 決済機能
  - クレジットカード決済
- お問合せ機能
- Shop検索機能
- スライダーのインデックスナビゲーション


