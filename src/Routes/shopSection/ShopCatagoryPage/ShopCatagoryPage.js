import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCardComponent from "../../../Components/CardComponent/ProductCardComponent"
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";


function ShopCatagoryPage() {
    let { catagory } = useParams();
    let [products, setProducts] = useState([]);
    let [productsElements, setProductsElements] = useState([])


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
            //set loading = false
        } else {
            alert('no sqli here boi')
        }
    }, []);



    let priceLowTo = () => {
        products.sort((a, b) => {
            return a.price - b.price;
        })
        setProducts(products)
        console.log(products)
    }

    let priceHighTo = () => {
        products.sort((a, b) => {
            return b.price - a.price;
        })
    }


    useEffect(() => {
        let productList = products.map((product) => {
            return (<ProductCardComponent key={product.id} data={product} />);
        });
        setProductsElements(productList)
    })



    return (
        <>
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
                {productsElements}
            </Grid>
        </>
    )
}

export default ShopCatagoryPage;