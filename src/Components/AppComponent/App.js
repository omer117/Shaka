import './App.scss';
import { Route, Routes } from "react-router-dom"
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
import SurfingTodayComponent from "../../Routes/SurfingWeather/surfingToday"
import FooterComponent from "../../Components/FooterComponent/FooterComponent"
import { useState, useEffect } from "react";
import axios from 'axios';



function App() {
  let [numberOfProducts, setNumberOfProducts] = useState(0)
  let [Products, setProducts] = useState([])
  let [user, setUser] = useState(sessionStorage.getItem('user'))

  function UserGreeting() {
    const user = sessionStorage.getItem('user')
    if (user !== null) {
      return (
        <>
          <h2>Hello Back {user}</h2>
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

console.log(user);


  useEffect(() => {
    axios.get('https://shakaserver2.herokuapp.com/new')
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))

  }, [])


  useEffect(() => {
    setNumberOfProducts(Products.length)
  }, [Products])



  return (
    <>
      <NavBarComponent user={user} numberOfProducts={numberOfProducts} />
      <ShakaLogoComponent />
      <UserGreeting />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/surfingToday" element={<SurfingTodayComponent />} />

        <Route path="shop" element={<ShopHomePage user={user} />} /> 
        <Route path="shop/:catagory" element={<ShopCatagoryPage productsInCart={Products} addProducts={setProducts} />} />
        <Route path="/shop/:catagory/:id" element={<ShopSingleViewPage productsInCart={Products} addProducts={setProducts} user={user} />} />
        <Route path="/shop/:catagory/:id/editProduct" element={<EditPageComponent user={user}/>} />
        <Route path="/addProduct" element={<AddPageComponent user={user} />} />

        <Route path="/myCart" element={<MyCart addProducts={setProducts} productsInCart={Products} />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
      <FooterComponent />
    </>
  )
}

export default App;
