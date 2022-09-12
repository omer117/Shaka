import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import './NavBarComponent.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DehazeIcon from '@mui/icons-material/Dehaze';

 console.log(localStorage);
// console.log(user!==null)
// console.log(user!==undefined)




// function UserGreeting() {
//     return (
//          user !== null ? <h3>Hello {user.username}</h3> : <div className="nothing"> </div>
//         // <div>he</div>
//     )
// }

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

            </div>
            <div className="bottomNavBar">
                {/* <UserGreeting /> */}
                <div className="userLinks">
                    <Link to="/login">Log In</Link>
                    <div className="cartLink">
                    <Link className="cartNavbar" to="/myCart">
                        <ShoppingCartIcon />
                    </Link>
                    <div className="littleBubble">{props.numberOfProducts}</div>
                    </div>
                </div>

            </div>
        </>
    )
}




export default NavBarComponent;