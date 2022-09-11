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
import ShakaLogoComponent from "../ShakaLogoComponent/ShakaLogoComponent"
import AddPageComponent from "../../Routes/AdminFunctions/AddPage/AddPageComponent"

let user = JSON.parse(localStorage.getItem("user"));
console.log(user);


function UserGreeting() {
  return (
    user !== null ? <h2>Hello {user.username}</h2> : <div className="nothing"> </div>
  )
}


function App() {

  return (
    <>
      <NavBarComponent />
      <ShakaLogoComponent />
      <UserGreeting />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/waveWeather" element={<div>hjkh</div>} />

        <Route path="/shop" element={<ShopHomePage />} />
        <Route path="/shop/:catagory" element={<ShopCatagoryPage />} />
        <Route path="/shop/:catagory/:id" element={<ShopSingleViewPage />} />
        <Route path="/shop/:catagory/:id/EditProduct" element={<div>sadf</div>}/>
        <Route path="/addProduct" element={<AddPageComponent/>}/>

        <Route path="/about" element={<div>asfasf</div>} />

        <Route path="/community" element={<div>tn</div>} />

        <Route path="/myCart" element={<MyCart />} />
        <Route path="/wishlist" element={<div>mokok</div>} />




        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>

    </>
  );
}

export default App;
