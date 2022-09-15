import "./HomePage.scss"
import axios from 'axios';
import { Link } from "react-router-dom";
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import ProductCardComponent from "../../Components/CardComponent/ProductCardComponent"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



function HomePage() {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/checkAndUpdateForecast').then((res)=>{
            console.log(res)
        })
    }, [])


    useEffect(() => {
        axios.get(`/sideRequest`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);

    let productList = products.map((product) => {
        return (<ProductCardComponent className="id" key={product.id} data={product} />);
    });


    return (
        <>
            <div className="surfingTodayDiv">
                <h2>The nearest beach -  </h2>
                <h4>check if it's a good day to surf!</h4>
                <p>Wave Height</p>
                <p>wind Direction:</p>
                <p>Wind Speed:</p>
                <p>Water temp'(c')</p>
            </div>

            <div className='HotNowDiv'>
                <h1>Hot Now!</h1>
                <Grid container
                    spacing={4}
                    className="specific-catagory-container"
                    style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        alignItems: 'center',
                    }}
                >
                    {productList}
                </Grid>
            </div>
            <div className="forMore">

                <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                >
                    <Link to="/shop">For more </Link>
                </Button>
            </div>
            <div className="community-container">
                <h1>Join Our Community Today!</h1>
            </div>
        </>
    )
}


export default HomePage;

