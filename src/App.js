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

function App() {
  const [isAuth, setIsAuth ] = useState(localStorage.getItem("isAuth"));

  return (

    <Router>
      <MenuBar  isAuth={isAuth} />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/artist' element={<Artist />}/>
        <Route path='/news' element={<News />}/>
        <Route path='/product' element={<Product />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/login' element={<Login  setIsAuth={setIsAuth} />}/>
        <Route path='/logout' element={<Logout  setIsAuth={setIsAuth} />}/>
      </Routes>
    </Router>
  );
}

export default App;
