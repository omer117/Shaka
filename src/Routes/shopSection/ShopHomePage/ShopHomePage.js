import React from "react";
import { Link } from "react-router-dom";
import "./ShopHomePage.scss"
import Grid from '@mui/material/Grid';

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
            <Grid container
                spacing={7}
                className="catagoriesDiv"
                style={{
                    marginTop: '80px',
                    alignItems: 'center',
                }}
            >
                <Grid item xs={12} md={4}>
                    <div className="boogi">
                        <Link to="/shop/boogi">Boogi</Link>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className="sup">
                        <Link to="/shop/sup">Sup</Link>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className="soft">
                        <Link to="/shop/soft">Soft</Link>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className="womenSwimsuit">
                        <Link to="/shop/WomanSuit">Women's SwimSuit</Link>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className="manSwimsuit">
                        <Link to="/shop/manSuit">Man's SwimSuit</Link>
                    </div>
                </Grid>
            </Grid>

        </>

    )
}

export default ShopHomePage;