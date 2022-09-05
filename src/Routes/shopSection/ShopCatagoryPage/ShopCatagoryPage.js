import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCardComponent from "../../../Components/CardComponent/ProductCardComponent"
import Grid from '@mui/material/Grid';


function ShopCatagoryPage() {

    let { catagory } = useParams();

    let [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`/getAll${catagory}`).then((res) => {
            setProducts(res.data);
        });
    }, []);

    console.log(products);

    let productList = products.map((product) => {
        return (<ProductCardComponent key={product.id} data={product} />);
    });

    console.log(productList);
    return (

        <>
            <Grid container
                spacing={6}
                className="specific-catagory-container"
                style={{
                    marginTop: '80px',
                    alignItems: 'center',
                }}
            >

                {productList}


            </Grid>
        </>
    )
}

export default ShopCatagoryPage;