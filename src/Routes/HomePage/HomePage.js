import "./HomePage.scss"
import axios from 'axios';
import { Link } from "react-router-dom";
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import ProductCardComponent from "../../Components/CardComponent/ProductCardComponent"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AirIcon from '@mui/icons-material/Air';
import SurfingIcon from '@mui/icons-material/Surfing';
import ThermostatIcon from '@mui/icons-material/Thermostat';


function distanceBetweenTwoPoints(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return Math.floor(dist);
    }
}


function HomePage() {
    let [beaches, setBeaches] = useState([])
    let [products, setProducts] = useState([]);
    let [distances, setDistances] = useState([])
    let [closestBeachDetails, setClosestBeacheDetails] = useState([])
    let [myLocation, setLocation] = useState([])

    useEffect(() => {
        axios.get(`/getBeaches`)
            .then((res) => setBeaches(res.data))
            .catch((err) => console.log(err));


        navigator.geolocation.getCurrentPosition((position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);

        })



    }, [])

    useEffect(() => {
        let orderedBeaches = beaches.map((beach) => ({
            id: beach.beach_id, name: beach.beach_name, distance: distanceBetweenTwoPoints(beach.lat, beach.lon, myLocation[0], myLocation[1])
        }))
            .sort((a, b) => {
                return a.distance - b.distance
            })
        setDistances(orderedBeaches)
    }, [beaches])



    useEffect(() => {
        if (distances.length > 0) {
            axios.post('/everyDayGet',
                { sqlString: `SELECT * FROM daily_forecast WHERE beach_id=${distances[0].id}` })
                .then((res) => setClosestBeacheDetails(res.data))
                .catch((err) => console.log(err));
        }
    }, [distances])





    useEffect(() => {
        axios.get(`/sideRequest`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);

    let productList = products.map((product) => {
        return (<ProductCardComponent className="id" key={product.id} data={product} />);
    });

    if (closestBeachDetails.length > 0) {
        console.log(closestBeachDetails[0]);
    }

    function Details() {

        return (
            <div className="surfingTodayDiv">
                <h2>The nearest beach - {closestBeachDetails[0].beach_name} </h2>
                <div className="beachDetails">
                    <div>
                        <h4>wind Speed</h4>
                        <AirIcon className="detail" />
                        <p>{closestBeachDetails[0].wind_speed}</p>
                    </div>
                    <div>
                        <h4>wave height</h4>
                        <SurfingIcon className="detail" />
                        <p>{closestBeachDetails[0].wave_height}</p>
                    </div>
                    <div>
                        <h4>water temperature</h4>
                        <ThermostatIcon className="detail" />
                        <p>{closestBeachDetails[0].water_temperature}</p>
                    </div>
                </div>
            </div>
        )
    }




    return (
        <>
            {closestBeachDetails.length > 0 ? <Details /> : <div className="loading"><LoadingComponent /></div>}

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

