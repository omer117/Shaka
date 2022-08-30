import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.scss';
import NavBarComponent from "./Components/NavbarComponents/NavBarComponent";


function App() {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/waveWeather" element={<App />} />
        <Route path="/about" element={<App />} />
        <Route path="/community" element={<App />} />
        <Route path="/myCart" element={<App />} />
      </Routes>

    </>
  );
}

export default App;
