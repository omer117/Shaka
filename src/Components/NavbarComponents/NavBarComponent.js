import './NavBarComponent.scss';
import { useRef } from "react";
import { Link } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DehazeIcon from '@mui/icons-material/Dehaze';

console.log(localStorage);
function NavBarComponent(props) {

function cleanStorage(){
    window.sessionStorage.removeItem('user')
    window.location.reload()
}

    function IfUserLoggedIn() {
        if (props.user !== null) {
            return (
                <a className='logOut' onClick={cleanStorage}>
                        Log Out
                </a>
            )
        } else {
            return (
                <Link to="/login">Log In</Link>
            )
        }
    }


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
                <Link to="/surfingToday">Surfing Today? </Link>
                <Link to="/shop">Shop</Link>
                <IfUserLoggedIn />
                <Link className="cartNavbar" to="/myCart">
                    <div className="cartLink">
                        <ShoppingCartIcon />
                        <div className="littleBubble">{props.numberOfProducts}</div>
                    </div>
                </Link>
                <div
                    className="icon"
                    onClick={responsive}>
                    <DehazeIcon />
                </div>
            </div>
        </>
    )
}




export default NavBarComponent;