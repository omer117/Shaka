import { _BrowserRouter, Route, Routes } from "react-router-dom"
import './App.scss';
import NavBarComponent from "../NavbarComponents/NavBarComponent";
import ShopHomePage from "../../Routes/shopSection/ShopHomePage/ShopHomePage"
import ShopCatagoryPage from "../../Routes/shopSection/ShopCatagoryPage/ShopCatagoryPage"
import ShopSingleViewPage from "../../Routes/shopSection/ShopSingleView/ShopSingleViewPage"






function App() {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<div>asdf</div>} />
        
        <Route path="/waveWeather" element={<div>hjkh</div>} />

        <Route path="/shop" element={<ShopHomePage/>} />
        <Route path="/shop/:catagory" element={<ShopCatagoryPage/>} />
        <Route path="/shop/:catagory/:id" element={<ShopSingleViewPage/>} />
        
        <Route path="/about" element={<div>asfasf</div>} />
        
        <Route path="/community" element={<div>tn</div>} />

        <Route path="/myCart" element={<div>mokok</div>} />
        <Route path="/wishlist" element={<div>mokok</div>} />
      </Routes>

    </>
  );
}

export default App;
