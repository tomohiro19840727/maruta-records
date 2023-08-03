# MARUTA-Records（DJのチーム名）
 DJが自作の音楽やグッズを売るECサイトです。<br >
 旅行先の景色や好きな景色を位置情報付きで共有できます。 <br >
 また管理者のみが商品やイベントを自由に投稿、削除ができます。　<br > 
 レスポンシブ対応しているのでスマホからもご確認いただけます。
 <img width="1400" alt="スクリーンショット 2023-08-04 0 06 18" src="https://maruta-records.vercel.app/img/スクリーンショット 2023-08-03 9.07.02.png">
 <img width="350" height="700" src= "https://maruta-records.vercel.app/img/IMG_6904.jpg">

# URL
https://maruta-records.vercel.app/ <br >
画面上部のSignupからメールアドレスとパスワードを決めて会員登録をし、Loginして頂ければCartから買い物ができます。

# 使用技術
- Ruby 2.5.7
- Ruby on Rails 5.2.4
- MySQL 5.7
- Nginx
- Puma
- AWS
  - VPC
  - EC2
  - RDS
  - Route53
- Docker/Docker-compose
- CircleCi CI/CD
- Capistrano3
- RSpec
- Google Maps API

# AWS構成図
<img width="995" alt="スクリーンショット 2020-05-07 11 14 01" src="https://user-images.githubusercontent.com/60876388/81247155-3ccde300-9054-11ea-91eb-d06eb38a63b3.png">

## CircleCi CI/CD
- Githubへのpush時に、RspecとRubocopが自動で実行されます。
- masterブランチへのpushでは、RspecとRubocopが成功した場合、EC2への自動デプロイが実行されます

# 機能一覧
- ユーザー登録、ログイン機能(devise)
- 投稿機能
  - 画像投稿(refile)
  - 位置情報検索機能(geocoder)
- いいね機能(Ajax)
  - ランキング機能
- コメント機能(Ajax)
- フォロー機能(Ajax)
- ページネーション機能(kaminari)
  - 無限スクロール(Ajax)
- 検索機能(ransack)

# テスト
- RSpec
  - 単体テスト(model)
  - 機能テスト(request)
  - 統合テスト(feature)
