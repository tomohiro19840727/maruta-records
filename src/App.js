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
import Use from "./components/Use";
import Privacy from "./components/Privacy";
import { useMediaQuery } from 'react-responsive';
import MobileMenuBar from "./components/MobileMenuBar";
import MobileHome from "./components/MobileHome";
import MobileShop from "./components/MobileShop";
import MobileNews from "./components/MobileNews";

function App() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [postText2, setPostText2] = useState('');
  const [singleImage1, setSingleImage1] = useState('');
  const [singleImage2, setSingleImage2] = useState('');
  const [singleImage3, setSingleImage3] = useState('');
  const [prevPrice, setPrevPrice] = useState('');
  const [isAuth, setIsAuth ] = useState(localStorage.getItem("isAuth"));

  const [audioFile, setAudioFile] = useState(null);

  

  

  const [selectedTitle, selectedSetTitle] = useState('');
  const [selectedPrice, selectedSetPrice] = useState('');
  const [selectedPostText2, selectedSetPostText2] = useState('');
  const [selectedSingleImage1, selectedSetSingleImage1] = useState('');
  const [selectedSingleImage2, selectedSetSingleImage2] = useState('');
  const [selectedSingleImage3, selectedSetSingleImage3] = useState('');
  const [selectedPrevPrice, selectedSetPrevPrice] = useState('');
  const [selectedAudioUrl, selectedSetaudioUrl ] = useState("")

  const [welcomeTitle, welcomeSetTitle] = useState('');
  const [welcomeSingleImage, welcomeSetSingleImage] = useState('');

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (

    <Router>
      <div>
        {isMobile ? ( 
        <MobileMenuBar />
       )  : 
       (
        <MenuBar  isAuth={isAuth} /> )}
      

      </div>
      <Routes>
        <Route path='/' element={
        <div>
          {isMobile ? ( 
            <MobileHome 
            isAuth={isAuth} isMobile={isMobile}
            selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}
            
            selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}
            
            selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}
            
            selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}
            
            selectedSingleImage1={selectedSingleImage1} selectedSetSingleImage1={selectedSetSingleImage1}
            
            selectedSingleImage2={selectedSingleImage2}
            selectedSetSingleImage2={selectedSetSingleImage2}
            selectedSingleImage3={selectedSingleImage3} selectedSetSingleImage3={selectedSetSingleImage3}
            /> ) : (
          <Home 
        isAuth={isAuth}
        selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}
        
        selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}
        
        selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}
        
        selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}
        
        selectedSingleImage1={selectedSingleImage1} selectedSetSingleImage1={selectedSetSingleImage1}
        
        selectedSingleImage2={selectedSingleImage2}
        selectedSetSingleImage2={selectedSetSingleImage2}
        selectedSingleImage3={selectedSingleImage3} selectedSetSingleImage3={selectedSetSingleImage3}
        />)}
        </div>
        }
        />

        <Route path='/shop' element={
          <div>
        {isMobile ? ( 
        <MobileShop
          isAuth={isAuth}
          title={title} setTitle={setTitle}
          price={price} setPrice={setPrice}
          prevPrice={prevPrice} setPrevPrice={setPrevPrice}
          postText2={postText2} setPostText2={setPostText2}
          singleImage1={singleImage1} setSingleImage1={setSingleImage1}
          singleImage2={singleImage2} setSingleImage2={setSingleImage2}
          singleImage3={singleImage3} setSingleImage3={setSingleImage3}
          
          selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}
          
          selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}
          
          selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}
          
          selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}
          
          selectedSingleImage1={selectedSingleImage1} selectedSetSingleImage1={selectedSetSingleImage1}
          selectedSingleImage2={selectedSingleImage2} selectedSetSingleImage2={selectedSetSingleImage2}
          selectedSingleImage3={selectedSingleImage3} selectedSetSingleImage3={selectedSetSingleImage3}
          
          audioFile={audioFile} setAudioFile={setAudioFile}
          selectedAudioUrl={selectedAudioUrl} selectedSetaudioUrl={selectedSetaudioUrl}  
          />) : (<Shop
            isAuth={isAuth}
            title={title} setTitle={setTitle}
            price={price} setPrice={setPrice}
            prevPrice={prevPrice} setPrevPrice={setPrevPrice}
            postText2={postText2} setPostText2={setPostText2}
            singleImage1={singleImage1} setSingleImage1={setSingleImage1}
            singleImage2={singleImage2} setSingleImage2={setSingleImage2}
            singleImage3={singleImage3} setSingleImage3={setSingleImage3}
            
            selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}
            
            selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}
            
            selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}
            
            selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}
            
            selectedSingleImage1={selectedSingleImage1} selectedSetSingleImage1={selectedSetSingleImage1}
            selectedSingleImage2={selectedSingleImage2} selectedSetSingleImage2={selectedSetSingleImage2}
            selectedSingleImage3={selectedSingleImage3} selectedSetSingleImage3={selectedSetSingleImage3}
            
            audioFile={audioFile} setAudioFile={setAudioFile}
            selectedAudioUrl={selectedAudioUrl} selectedSetaudioUrl={selectedSetaudioUrl}  
            />) }
          </div>
          }
          
          />

        <Route path='/shopdetail' element={<ShopDetail
          selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}

          selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}

          selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}

          selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}

          selectedSingleImage1={selectedSingleImage1} selectedSetSingleImage1={selectedSetSingleImage1}
          selectedSingleImage2={selectedSingleImage2} selectedSetSingleImage2={selectedSetSingleImage2}
          selectedSingleImage3={selectedSingleImage3} selectedSetSingleImage3={selectedSetSingleImage3}  
          selectedAudioUrl={selectedAudioUrl} selectedSetaudioUrl={selectedSetaudioUrl} 
        />}/>
     
        <Route path='/search' element={<Search
          selectedTitle={selectedTitle} selectedSetTitle={selectedSetTitle}

          selectedPrice={selectedPrice} selectedSetPrice={selectedSetPrice}

          selectedPrevPrice={selectedPrevPrice} selectedSetPrevPrice={selectedSetPrevPrice}

          selectedPostText2={selectedPostText2} selectedSetPostText2={selectedSetPostText2}

          selectedSingleImage1={selectedSingleImage1} selectedSetSingleImage1={selectedSetSingleImage1}
          
        />}/>

        <Route path='/artist' element={<Artist />}/>
        <Route path='/artist2' element={<Artist2 />}/>
        <Route path='/artist3' element={<Artist3 />}/>
        <Route path='/artist4' element={<Artist4 />}/>
        <Route path='/news' element={
        <div>
           {isMobile ? ( 
        <MobileNews 
         isAuth={isAuth}
         /> ) : (<News 
          isAuth={isAuth}
          />)
           }
         </div>
        }/>

        <Route path='/product' element={
        <Product
          title={title} setTitle={setTitle}
          price={price} setPrice={setPrice}
          prevPrice={prevPrice} setPrevPrice={setPrevPrice}
          postText2={postText2} setPostText2={setPostText2}
          singleImage1={singleImage1} setSingleImage1={setSingleImage1}
          singleImage2={singleImage2} setSingleImage2={setSingleImage2}
          singleImage3={singleImage3} setSingleImage3={setSingleImage3}
          audioFile={audioFile} setAudioFile={setAudioFile}          

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
        <Route path='/use' element={<Use />}/>
        <Route path='/privacy' element={<Privacy />}/>
        <Route path='/login' element={<Login  setIsAuth={setIsAuth} />}/>
        <Route path='/logout' element={<Logout  setIsAuth={setIsAuth} />}/>
      </Routes>
    </Router>
  );
}

export default App;
