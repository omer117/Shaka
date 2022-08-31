import React from "react";
import { Link } from "react-router-dom";
import "./ShopHomePage.scss"


function ShopHomePage() {


    return (
        <>
            <div className="shakaLogo">
                <span>
                    S H A K A
                </span>
            </div>
            <div className="whatsHotDiv">

            </div>
            <div className="catagoriesDiv">
                <div className="boogi">
                    <Link to="/shop/boogi">Boogi</Link>
                </div>
                <div className="sup">
                    <Link to="/shop/sup">Sup</Link>
                </div>
                <div className="soft">
                    <Link to="/shop/soft">Soft</Link>
                </div>
                <div className="manSwimsuit">
                    <Link to="/shop/manSuit">Man's SwimSuit</Link>
                </div>
                <div className="womenSwimsuit">
                    <Link to="/shop/WomanSuit">Women's SwimSuit</Link>
                </div>
            </div>
        </>

    )
}

export default ShopHomePage;