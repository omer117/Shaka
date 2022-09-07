import { _BrowserRouter, Route, Routes } from "react-router-dom"
import './App.scss';
import NavBarComponent from "../NavbarComponents/NavBarComponent";
import ShopHomePage from "../../Routes/shopSection/ShopHomePage/ShopHomePage"
import ShopCatagoryPage from "../../Routes/shopSection/ShopCatagoryPage/ShopCatagoryPage"
import ShopSingleViewPage from "../../Routes/shopSection/ShopSingleView/ShopSingleViewPage"
import LogInPage from "../../Routes/AuthenticationSection/LogInPage/LogInPage"
import SignUpPage from "../../Routes/AuthenticationSection/SignUpPage/SignUpPage"
import HomePage from "../../Routes/HomePage/HomePage"
import MyCart from "../../Routes/shopSection/MyCart/MyCart"



function App() {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        
        <Route path="/waveWeather" element={<div>hjkh</div>} />

        <Route path="/shop" element={<ShopHomePage/>} />
        <Route path="/shop/:catagory" element={<ShopCatagoryPage/>} />
        <Route path="/shop/:catagory/:id" element={<ShopSingleViewPage/>} />
        
        <Route path="/about" element={<div>asfasf</div>} />
        
        <Route path="/community" element={<div>tn</div>} />

        <Route path="/myCart" element={<MyCart/>} />
        <Route path="/wishlist" element={<div>mokok</div>} />




        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LogInPage/>} />
      </Routes>

    </>
  );
}

export default App;
