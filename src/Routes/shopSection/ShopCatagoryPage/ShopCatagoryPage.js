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
    let [filter, setFilter] = useState();


    function isValidParams(name) {
        const specialCharsForName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return !specialCharsForName.test(name)
    }


    useEffect(() => {
        if (isValidParams(catagory)) {
            axios.post('https://shaka-nest-remastered.onrender.com/products/getCatagory', { catagory: catagory })
                .then((res) => {
                    setProducts((res.data))//TODO:add handle succes edit
                });
        } else {
            alert('no sqli here boi')
        }
    }, []);



    let priceLowTo = () => {
        setFilter("DESC")
        axios.post('https://shaka-nest-remastered.onrender.com/products/getCatagoryFilteredByPrice',
            { catagory: catagory, filter: filter })
            .then((res) => {
                setProducts((res.data));
            })
    }


    const priceHighTo = () => {
        setFilter("ASC")
        axios.post('https://shaka-nest-remastered.onrender.com/products/getCatagoryFilteredByPrice'
            , { catagory: catagory, filter: filter })
            .then((res) => {
                setProducts((res.data));
            })

    }

    let productList = products?.map((product) => {
        return (<ProductCardComponent
            productsInCart={props.productsInCart}
            addProducts={props.addProducts} myCartFunction={props.myCartFunction}
            key={product.id} data={product} />);
    });

    return (
        <>
            <div className="filterActions">
                <Button className="filterBtn" onClick={priceLowTo} >high to low</Button>
                <Button className="filterBtn" onClick={priceHighTo}>low to high</Button>
            </div>
            <Grid container
                spacing={6}
                className="specific-catagory-container"
                style={{
                    marginTop: '20px',
                    alignItems: 'center',
                }}
            >
                {productList.length > 0 ? productList : <div className="loading"><LoadingComponent /> </div>}
            </Grid>
        </>
    )
}

export default ShopCatagoryPage;