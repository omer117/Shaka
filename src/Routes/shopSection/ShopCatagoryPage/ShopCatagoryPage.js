import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCardComponent from "../../../Components/CardComponent/ProductCardComponent"
import Grid from '@mui/material/Grid';


function ShopCatagoryPage() {
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
        }else{
            alert('no sqli here boi')
        }
    }, []);

    let productList = products.map((product) => {
        return (<ProductCardComponent key={product.id} data={product} />);
    });

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