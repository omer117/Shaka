import "./ShopHomePage.scss"
import { Link } from "react-router-dom";
import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


function ShopHomePage(props) {


    return (
        <>
            {props.user === 'admin' ? <Button className="ToAdd"><Link to="/addProduct">Add product</Link> </Button> : <></>}
                
            <Grid container
className="catagoriesDiv"
>
                <Grid 
                item xs={12} 
                md={6}
                >
                    <div className="boogi">
                        <Link to="/shop/boogi">Boogi</Link>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="sup">
                        <Link to="/shop/sup">Sup</Link>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="soft">
                        <Link to="/shop/soft">Soft</Link>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="womenSwimsuit">
                        <Link to="/shop/womansuit">Women's SwimSuit</Link>
                    </div>
                </Grid>
                <Grid className="manSwimsuitDiv" item xs={12} md={6}>
                    <div className="manSwimsuit">
                        <Link to="/shop/mansuit">Man's SwimSuit</Link>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default ShopHomePage;