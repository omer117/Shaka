import React from "react";
import Link from "react-router-dom"
import './NavBarComponent';

function NavBarComponent(props) {


    return (
<div className="navbar">
<div className="about">about</div>
<div className="community">community</div>
<div className="weather">weather</div>
<div className="dark-light-mode">dark mode</div>
<div className="shopExtension">shop cart</div>

</div>
    )
}

export default NavBarComponent;