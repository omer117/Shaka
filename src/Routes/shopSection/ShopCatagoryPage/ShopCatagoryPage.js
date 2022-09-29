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
            axios.post('https://shakaserver2.herokuapp.com/getAll', [catagory])
                .then((res) => {
                    setProducts(JSON.parse(res.data))//TODO:add handle succes edit
                });
        } else {
            alert('no sqli here boi')
        }
    }, []);


    // useEffect(() => {
    //     setProducts(products)
    // }, [products])


    let priceLowTo = () => {
        let LTH = products.sort( (a, b) => {
            return a.price - b.price;
        })
         setProducts(LTH);
    }


    const priceHighTo = () => {
        const HTL = products.sort((a, b) => {
            return b.price - a.price;
        })
        setProducts(HTL);
    }


    let productList = products.map((product) => {
        return (<ProductCardComponent productsInCart={props.productsInCart} addProducts={props.addProducts} myCartFunction={props.myCartFunction} key={product.id} data={product} />);
    });

    console.log(products);
    return (
        <>
            <div className="Links">
                <a href="/shop/boogi">Boogi</a>
                <a href="/shop/sup">sup</a>
                <a href="/shop/soft">soft</a>
                <a href="/shop/womansuit">Women's SwimSuit</a>
                <a href="/shop/mansuit">Man's SwimSuit</a>

            </div>
            <div className="filterActions">
                <Button className="adminFunctionsBtn" onClick={() => priceLowTo()} >low to high</Button>
                <Button className="adminFunctionsBtn" onClick={() => priceHighTo()}>high to low</Button>
            </div>
            <Grid container
                spacing={6}
                className="specific-catagory-container"
                style={{
                    marginTop: '30px',
                    alignItems: 'center',
                }}
            >
                {productList.length > 0 ? productList : <div className="loading"><LoadingComponent /> </div>}
            </Grid>
        </>
    )
}

export default ShopCatagoryPage;