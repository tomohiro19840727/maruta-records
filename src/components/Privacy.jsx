import React from 'react';

const Privacy = () => {
  return (
    <div className="p-4 mr-20 ml-20 mb-20">
      <h2 className="text-2xl font-bold mb-10 text-center">【プライバシーポリシー】</h2>
      <p className="mb-4">
        当ウェブサイトへのご訪問ありがとうございます。個人情報の保護については、適用される法律と規制に従い、お客様のプライバシーを尊重しています。本プライバシーポリシーは、個人情報の収集、利用、開示、保護に関する方針を示しています。個人情報を提供する前やサービスをご利用いただく前に、このポリシーをよくお読みください。
      </p>
      <h3 className="text-lg font-bold mb-2">【個人情報の収集と利用目的】</h3>
      <ol className="list-decimal ml-8 mb-4">
        <li className="mb-2">
          以下のような個人情報を収集する場合があります（一部抜粋）：
          <ul className="list-disc ml-8">
            <li>お名前、連絡先、住所</li>
            <li>支払い情報</li>
            <li>閲覧履歴や利用データ</li>
          </ul>
        </li>
        <li className="mb-2">
          収集する情報の目的は以下の通りです：
          <ul className="list-disc ml-8">
            <li>サービスの提供と配送</li>
            <li>支払い処理と注文の管理</li>
            <li>お客様とのコミュニケーション</li>
            <li>サービスや利用体験の改善</li>
            <li>法的義務の遵守</li>
          </ul>
        </li>
      </ol>
      <h3 className="text-lg font-bold mb-2">【個人情報の取り扱いと保護措置】</h3>
      <ol className="list-decimal ml-8 mb-4">
        <li className="mb-2">
          不正アクセス、開示、改ざん、破壊から個人情報を保護するために適切なセキュリティ対策を実施しています。
        </li>
        <li className="mb-2">
          個人情報へのアクセスは権限を持つ担当者に限定し、その担当者は秘密保持義務を          負います。
        </li>
        <li className="mb-2">
          本ポリシーに記載されている目的を達成するために必要な期間、または法的な要件に従って個人情報を保管します。
        </li>
      </ol>
      <h3 className="text-lg font-bold mb-2">【情報の共有と第三者提供】</h3>
      <ol className="list-decimal ml-8 mb-4">
        <li className="mb-2">
          サービス提供や業務遂行のために、支払い処理業者や配送パートナーなどの第三者とお客様の個人情報を共有する場合があります。ただし、必要な情報のみを開示し、適切な保護措置を講じます。
        </li>
        <li className="mb-2">
          法的義務による場合を除き、お客様の明示的な同意なしに個人情報を第三者に提供することはありません。
        </li>
      </ol>
      <h3 className="text-lg font-bold mb-2">【Cookieとトラッキング技術の使用】</h3>
      <ol className="list-decimal ml-8 mb-4">
        <li className="mb-2">
          当ウェブサイトでは、Cookieや同様のトラッキング技術を使用する場合があります。これにより、お客様のウェブサイトの利用状況や嗜好に関する情報を収集し、サービスの改善やカスタマイズに役立てます。
        </li>
        <li className="mb-2">
          Cookieの使用にはお客様の同意が必要です。お客様はブラウザの設定を変更することで、Cookieの受け入れを拒否することができます。ただし、Cookieを無効にすると一部のウェブサイト機能が制限される可能性があります。
        </li>
      </ol>
      <h3 className="text-lg font-bold mb-2">【ユーザーの権利と選択肢】</h3>
      <ol className="list-decimal ml-8 mb-4">
        <li className="mb-2">
          お客様は自身の個人情報にアクセスし、修正や削除を求めることができます。必要な場合は、当社にご連絡ください。
        </li>
        <li className="mb-2">
          マーケティング目的でのコンタクトを希望しない場合、または個人情報の収集に同意しない場合、お客様はいつでも選択する権利を有しています。
        </li>
      </ol>
      
      <h3 className="text-lg font-bold mb-2">【セキュリティ対策】</h3>
      <ol className="list-decimal ml-8 mb-4">
        <li className="mb-2">
          個人情報の保護とセキュリティ確保のために、適切な物理的、電子的、手続き上の対策を講じます。
        </li>
        <li className="mb-2">
          個人情報の紛失、不正アクセス、漏洩、改ざんの予防に努めますが、完全なセキュリティを保証することはできません。
        </li>
      </ol>
      <h3 className="text-lg font-bold mb-2">【プライバシーポリシーの変更通知】</h3>
      <p className="mb-4">
        当社は、プライバシーポリシーを変更する場合があります。変更がある場合は、ウェブサイト上に掲示するか、お客様に通知することでお知らせいたします。
      </p>
      <p>
        以上が、当ウェブサイトのプライバシーポリシーです。ご不明な点やお問い合わせがあれば、お気軽にお問い合わせください。
      </p>
    <br/>
      <h2>お問合せ窓口</h2>
      <p>担当者名 山崎 雄斗</p>
      <p>メールアドレス taketoyamazaki@gmail.com</p>
    </div>
  );
};

export default Privacy;


