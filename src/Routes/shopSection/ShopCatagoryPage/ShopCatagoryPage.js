import { useParams, Link } from "react-router-dom"
import "./ShopCatagoryPage.scss"
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCardComponent from "../../../Components/CardComponent/ProductCardComponent"
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";



function LoadingComponent() {
    
    return (<div className="LoadingDiv">

        <div className="ring">Loading
            <span className="loading"></span>
        </div>
    </div>)
}



function ShopCatagoryPage(props) {
    let [loading,setLoading] = useState({loading: true});
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
    
    
    useEffect(() => {
        let productList = products.map((product) => {
            return (<ProductCardComponent myCartFunction={props.myCartFunction} key={product.id} data={product} />);
        });
        setProductsElements(productList)
        setLoading(false);
    }, [productsElements])



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
                {loading ? <LoadingComponent /> : productsElements}
            </Grid>
        </>
    )
}

export default ShopCatagoryPage;