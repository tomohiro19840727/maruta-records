import Home from "./components/Home";
import MenuBar from "./components/MenuBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Shop from "./components/Shop";
import Artist from "./components/Artist";
import News from "./components/News";

function App() {
  return (

    <Router>
      <MenuBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/artist' element={<Artist />}/>
        <Route path='/news' element={<News />}/>
      </Routes>
    </Router>
  );
}

export default App;
