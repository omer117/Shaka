import "./ShopCatagoryPage.scss"
import axios from "axios";
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
import ProductCardComponent from "../../../Components/CardComponent/ProductCardComponent"
import LoadingComponent from "../../../Components/LoadingComponent/LoadingComponent"

function ShopCatagoryPage(props) {
    let { catagory } = useParams();
    let [products, setProducts] = useState([]);


    function isValidParams(name) {
        const specialCharsForName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return !specialCharsForName.test(name)
    }


    useEffect(() => {

        if (isValidParams(catagory)) {
            axios.post('/getAll', [catagory])
                .then((res) => {
                    setProducts(JSON.parse(res.data))//TODO:add handle succes edit
                });
        } else {
            alert('no sqli here boi')
        }
    }, []);



    let priceLowTo = () => {
        products.sort((a, b) => {
            return a.price - b.price;
        })
    }

    let priceHighTo = () => {
        products.sort((a, b) => {
            return b.price - a.price;
        })
    }


    let productList = products.map((product) => {
        return (<ProductCardComponent productsInCart={props.productsInCart} addProducts={props.addProducts} myCartFunction={props.myCartFunction} key={product.id} data={product} />);
    });

    return (
        <>
            <div className="Links">
                <Link to="/shop/boogi">Boogi</Link>
                <Link to="/shop/sup">sup</Link>
                <Link to="/shop/soft">soft</Link>
                <Link to="/shop/womansuit">Women's SwimSuit</Link>
                <Link to="/shop/mansuit">Man's SwimSuit</Link>

            </div>
            <div className="filterActions">
                <Button onClick={priceLowTo} >low to high</Button>
                <Button onClick={priceHighTo}>high to low</Button>
            </div>
            <Grid container
                spacing={6}
                className="specific-catagory-container"
                style={{
                    marginTop: '30px',
                    alignItems: 'center',
                }}
            >
                {productList.length > 0 ? productList :  <LoadingComponent />}
            </Grid>
        </>
    )
}

export default ShopCatagoryPage;