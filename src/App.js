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

function App() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [postText2, setPostText2] = useState('');
  const [singleImage, setSingleImage] = useState('');
  const [prevPrice, setPrevPrice] = useState('');
  const [isAuth, setIsAuth ] = useState(localStorage.getItem("isAuth"));

  return (

    <Router>
      <MenuBar  isAuth={isAuth} />
      <Routes>
        <Route path='/' element={<Home />}/>

        <Route path='/shop' element={<Shop
          title={title} setTitle={setTitle}
          price={price} setPrice={setPrice}
          prevPrice={prevPrice} setPrevPrice={setPrevPrice}
          postText2={postText2} setPostText2={setPostText2}
          singleImage={singleImage} setSingleImage={setSingleImage}
        />}/>

        <Route path='/shopdetail' element={<ShopDetail />}/>
        <Route path='/artist' element={<Artist />}/>
        <Route path='/news' element={<News />}/>

        <Route path='/product' element={
        <Product
          title={title} setTitle={setTitle}
          price={price} setPrice={setPrice}
          prevPrice={prevPrice} setPrevPrice={setPrevPrice}
          postText2={postText2} setPostText2={setPostText2}
          singleImage={singleImage} setSingleImage={setSingleImage}
        />}/>

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
