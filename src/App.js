import Home from "./components/Home";
import MenuBar from "./components/MenuBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Shop from "./components/Shop";
import Artist from "./components/Artist";
import News from "./components/News";
import Login from "./components/Login";
import { useEffect, useState } from "react";
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
import Signup from "./components/Signup";
import MemberLogout from "./components/MemberLogout";
import EventDetail from "./components/EventDetail";
import MobileCart from "./components/MobileCart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import MobileCheckoutForm from "./components/MobileCheckoutForm";
import Test from "./components/Test";
import axios from "axios";


const stripePromise = loadStripe("pk_test_51NNs3cEZdPzyB7DWjVWdabzCbPPH3DPHzGhVWfsGprXhWsVtdwli2KXru3HEI0PIdfJHu7nbw7j9Fd8NhUJkCZii00J7wjcxQL");

function App() {
  const [userId, setUserId] = useState(null); 
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [postText2, setPostText2] = useState('');
  const [singleImage1, setSingleImage1] = useState('');
  const [singleImage2, setSingleImage2] = useState('');
  const [singleImage3, setSingleImage3] = useState('');
  const [prevPrice, setPrevPrice] = useState('');
  const [isAuth, setIsAuth ] = useState(localStorage.getItem("isAuth"));
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));

  const [audioFile, setAudioFile] = useState(null);

  

  

  const [selectedTitle, selectedSetTitle] = useState('');
  const [selectedPrice, selectedSetPrice] = useState('');
  const [selectedPostText2, selectedSetPostText2] = useState('');
  const [selectedSingleImage1, selectedSetSingleImage1] = useState('');
  const [selectedSingleImage2, selectedSetSingleImage2] = useState('');
  const [selectedSingleImage3, selectedSetSingleImage3] = useState('');
  const [selectedPrevPrice, selectedSetPrevPrice] = useState('');
  const [selectedAudioUrl, selectedSetaudioUrl ] = useState("")


  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [showContent, setShowContent] = useState(false);

  const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  // const handleCheckout = async () => {
  //   try {
  //     const response = await axios.post("/create-payment-intent", {
  //       amount: 3400, // 任意の金額を指定する
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   } catch (error) {
  //     console.log("Failed to create Payment Intent:", error.message);
  //   }
  // };


  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const targets = document.getElementsByClassName("fade");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    });

    Array.from(targets).forEach((target) => {
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  

  return (
  <>
    {!showContent ? (
      <div className="h-screen flex items-center justify-center flex-col">
        <img src="/MARUTALOGO3.jpg" alt="Logo" className="fade h-40 w-40" />
        <h1 className="text-xl fade">MARUTA-Records</h1>
      </div>
    ) : (
      <Router>
      <div>
        {isMobile ? ( 
          <MobileMenuBar  isAuth={isAuth} userId={userId} />
          )  : 
          (
            <MenuBar  isAuth={isAuth} userId={userId} /> )}
      </div>
      <Routes>
      {clientSecret && (
        <Route path="/checkout" element={
          <div>
          {isMobile ? ( 
            
            <Elements options={options} stripe={stripePromise}>
            <MobileCheckoutForm />
          </Elements>    
            
            ) :(
              
              <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>    
            )}
            </div>
        } />
        )}

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
          isAuth={isAuth}  userId={userId}
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
            isAuth={isAuth} userId={userId}
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
             selectedSetTitle={selectedSetTitle}
              selectedSetPostText2={selectedSetPostText2}
              selectedSetSingleImage1={selectedSetSingleImage1}
             /> ) : (<News 
              isAuth={isAuth}
              selectedSetTitle={selectedSetTitle}
              selectedSetPostText2={selectedSetPostText2}
              selectedSetSingleImage1={selectedSetSingleImage1}
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
           title={title} setTitle={setTitle}
           price={price} setPrice={setPrice}
           prevPrice={prevPrice} setPrevPrice={setPrevPrice}
           postText2={postText2} setPostText2={setPostText2}
           singleImage1={singleImage1} setSingleImage1={setSingleImage1}
           singleImage2={singleImage2} setSingleImage2={setSingleImage2}
           singleImage3={singleImage3} setSingleImage3={setSingleImage3}
           audioFile={audioFile} setAudioFile={setAudioFile} 
         />}/>


        <Route path='/productdetail2' element={<ProductDetail2 />}/>




        <Route path='/empty' element={<Empty />}/>
       

        <Route path='/cart' element={
         <div>
         {isMobile ? ( 
           <MobileCart  userId={userId} />
           )  : 
           (
             <Cart  userId={userId} 
             clientSecret={clientSecret} 
             setClientSecret={setClientSecret}
             /> )}
       </div>
         }/>

        <Route path='/event' element={<Event />}/>
        <Route path='/eventdetail' element={<EventDetail
         selectedTitle={selectedTitle}
         selectedPostText2={selectedPostText2}
         selectedSingleImage1={selectedSingleImage1} 
        />}/>



        <Route path='/contact' element={<Contact />}/>
        <Route path='/memberlogout' element={<MemberLogout 
         isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}
         />}/>
        <Route path='/memberlogin' element={<MemberLogin 
        userId={userId} setUserId={setUserId}
        isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}
        />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/faq' element={<Faq />}/>
        <Route path='/test' element={<Test />}/>
        <Route path='/use' element={<Use />}/>
        <Route path='/privacy' element={<Privacy />}/>
        <Route path='/login' element={<Login  setIsAuth={setIsAuth}  userId={userId} setUserId={setUserId} />}/>
        <Route path='/logout' element={<Logout  setIsAuth={setIsAuth} />}/>
      </Routes>
    </Router>
    )}
    </>
  );
}

export default App;
