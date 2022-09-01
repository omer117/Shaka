import React from "react";
import { Link } from "react-router-dom"
import './NavBarComponent.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import DehazeIcon from '@mui/icons-material/Dehaze';
function NavBarComponent(props) {
    

    return (
<>
        <div className="navbar">

            <div className="about">
                <Link to="/about">About Us</Link>
            </div>
            <div className="community">
                <Link to="/community">The Community</Link>
            </div>
            <div className="weather">
                <Link to="/waveWeather">surfin' today?</Link>
            </div>
            <div className="shop">
                <Link to="/Shop">Shaka Shop</Link>
            </div>
            <div className="icons">
                <div>
                    <LightModeIcon />
                    {/* <Brightness3Icon /> */}
                </div>
                <div>
                    <Link to="/mycart">
                        <ShoppingCartIcon />
                    </Link>
                </div>
                <div>
                    <FavoriteBorderIcon />
                </div>
            </div>
            <div className="menu">
                <button >

                <DehazeIcon/>
                </button>
            </div>
        </div>
        </>
    )
}




export default NavBarComponent;