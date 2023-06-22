import Home from "./components/Home";
import MenuBar from "./components/MenuBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Shop from "./components/Shop";
import Artist from "./components/Artist";
import News from "./components/News";
import Login from "./components/Login";
import { useState } from "react";
import Logout from "./components/Logout";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Event from "./components/Event";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import MemberLogin from "./components/MemberLogin";
import ShopDetail from "./components/ShopDetail";
import Empty from "./components/Empty";
import Product2 from "./components/Product2";
import ProductDetail2 from "./components/ProductDetail2";
import Artist2 from "./components/Artist2";
import Artist3 from "./components/Artist3";
import Artist4 from "./components/Artist4";
import Search from "./components/Search";

function App() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [postText2, setPostText2] = useState('');
  const [singleImage, setSingleImage] = useState('');
  const [prevPrice, setPrevPrice] = useState('');
  const [isAuth, setIsAuth ] = useState(localStorage.getItem("isAuth"));
  

  const [selectedTitle, selectedSetTitle] = useState('');
  const [selectedPrice, selectedSetPrice] = useState('');
  const [selectedPostText2, selectedSetPostText2] = useState('');
  const [selectedSingleImage, selectedSetSingleImage] = useState('');
  const [selectedPrevPrice, selectedSetPrevPrice] = useState('');

  const [welcomeTitle, welcomeSetTitle] = useState('');
  const [welcomeSingleImage, welcomeSetSingleImage] = useState('');


  return (

    <Router>
      <MenuBar  isAuth={isAuth}
  
      />
      <Routes>
        <Route path='/' element={<Home 
        selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}

        selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}

        selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}

        selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}

        selectedSingleImage={selectedSingleImage} selectedSetSingleImage={selectedSetSingleImage}
        />}/>

        <Route path='/shop' element={<Shop
          title={title} setTitle={setTitle}
          price={price} setPrice={setPrice}
          prevPrice={prevPrice} setPrevPrice={setPrevPrice}
          postText2={postText2} setPostText2={setPostText2}
          singleImage={singleImage} setSingleImage={setSingleImage}


          selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}

          selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}

          selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}

          selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}

          selectedSingleImage={selectedSingleImage} selectedSetSingleImage={selectedSetSingleImage}
        />}/>

        <Route path='/shopdetail' element={<ShopDetail
          selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}

          selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}

          selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}

          selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}

          selectedSingleImage={selectedSingleImage} selectedSetSingleImage={selectedSetSingleImage}
        />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/artist' element={<Artist />}/>
        <Route path='/artist2' element={<Artist2 />}/>
        <Route path='/artist3' element={<Artist3 />}/>
        <Route path='/artist4' element={<Artist4 />}/>
        <Route path='/news' element={<News />}/>

        <Route path='/product' element={
        <Product
          title={title} setTitle={setTitle}
          price={price} setPrice={setPrice}
          prevPrice={prevPrice} setPrevPrice={setPrevPrice}
          postText2={postText2} setPostText2={setPostText2}
          singleImage={singleImage} setSingleImage={setSingleImage}
        />}/>

        <Route path='/product2' element={<Product2 
         welcomeTitle={welcomeTitle}
         welcomeSetTitle={welcomeSetTitle}
         welcomeSingleImage={welcomeSingleImage}
         welcomeSetSingleImage={welcomeSetSingleImage}
        />}/>


        <Route path='/productdetail2' element={<ProductDetail2 />}/>
        <Route path='/empty' element={<Empty />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/event' element={<Event />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/memberlogin' element={<MemberLogin />}/>
        <Route path='/faq' element={<Faq />}/>
        <Route path='/login' element={<Login  setIsAuth={setIsAuth} />}/>
        <Route path='/logout' element={<Logout  setIsAuth={setIsAuth} />}/>
      </Routes>
    </Router>
  );
}

export default App;
