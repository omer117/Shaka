import React, { useRef } from "react";
import { Link } from "react-router-dom"
import './NavBarComponent.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DehazeIcon from '@mui/icons-material/Dehaze';




function NavBarComponent(props) {


    const responsiveRef = useRef();
    const responsive = () => {
        if (responsiveRef.current.className === "topnav") {
            responsiveRef.current.className += " responsive";
        } else {
            responsiveRef.current.className = "topnav";
        }
    }


    return (
        <>
            <div
                className="topnav"
                id="myTopnav"
                ref={responsiveRef}
            >
                <Link className="shaka" to="/">SHAKA</Link>
                <Link to="/about">About Us</Link>
                <Link to="/waveWeather">Surfin' today?</Link>
                <Link to="/community">Our community</Link>
                <Link to="/shop">Shop</Link>
                <div
                    className="icon"
                    onClick={responsive}>
                    <DehazeIcon />
                </div>

                <Link className="cartNavbar" to="/myCart"><ShoppingCartIcon/></Link>
            </div>
        </>
    )
}




export default NavBarComponent;