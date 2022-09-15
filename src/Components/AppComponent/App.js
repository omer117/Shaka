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
import EditPageComponent from "../../Routes/AdminFunctions/EditPage/EditPageComponent"
import WaveSectionPage from "../../Routes/WaveSection/WaveSectionPage"
import CommunitySection from "../../Routes/CommunitySection/CommunitySection"
import { useState, useEffect } from "react";
import axios from "axios";


let productAdded = [...JSON.parse(localStorage.getItem('productsInCart'))]

function App() {
  let [numberOfProducts, setNumberOfProducts] = useState(0)

  console.log(productAdded)
  useEffect(() => {
    setNumberOfProducts(productAdded.length)
  }, [])



  return (
    <>
      <NavBarComponent numberOfProducts={numberOfProducts} />
      <ShakaLogoComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/waveWeather" element={<WaveSectionPage />} />

        <Route path="shop" element={<ShopHomePage />} />
        <Route path="shop/:catagory" element={<ShopCatagoryPage myCartFunction={setNumberOfProducts} />} />
        <Route path="/shop/:catagory/:id" element={<ShopSingleViewPage myCartFunction={setNumberOfProducts} />} />
        <Route path="/shop/:catagory/:id/EditProduct" element={<EditPageComponent />} />
        <Route path="/addProduct" element={<AddPageComponent />} />

        <Route path="/about" element={<div>asfasf</div>} />

        <Route path="/community" element={<CommunitySection />} />

        <Route path="/myCart" element={<MyCart />} />
        <Route path="/wishlist" element={<WaveSectionPage />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>

    </>
  );
}

export default App;
