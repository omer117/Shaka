import "./HomePage.scss"
import axios from 'axios';
import { Link } from "react-router-dom";
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import useGeolocation from "react-hook-geolocation";
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
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return Math.floor(dist);
    }
}


function HomePage() {
    let [beaches, setBeaches] = useState([])
    let [products, setProducts] = useState([]);
    let [distances, setDistances] = useState([])
    let [closestBeachDetails, setClosestBeacheDetails] = useState([])


    const geolocation = useGeolocation();


    useEffect(() => {
        axios.get(`https://shaka-nest-remastered.onrender.com/beaches`)
            .then((res) => setBeaches(res.data))
            .catch((err) => console.log(err));

    }, [])

    useEffect(() => {
        let orderedBeaches = beaches.map((beach) => ({
            id: beach.beach_id, name: beach.beach_name, distance: distanceBetweenTwoPoints(Number(beach.lat), Number(beach.lon), geolocation.latitude, geolocation.longitude)
        }))
            .sort((a, b) => {
                return a.distance - b.distance
            })
        setDistances(orderedBeaches)
    }, [beaches, geolocation])



    useEffect(() => {
        if (!geolocation.error) {
            if (distances.length > 0) {
                axios.get(`https://shaka-nest-remastered.onrender.com/daily-forecast/${distances[0].id}`)
                    .then((res) => setClosestBeacheDetails(res.data))
                    .catch((err) => console.log(err));
            }
        }
    }, [distances, geolocation.error])


    useEffect(() => {
        axios.post(`https://shaka-nest-remastered.onrender.com/products/youMayLike`,
            { catagory: "sup" })
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));

    }, []);


    function HotNow() {
        if (products !== undefined) {
            return (

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
                        { products?.map((product) => {
        return (<ProductCardComponent hrefType='' className="id" key={product.id} data={product} />);
    })}
                    </Grid>
                </div>
            )
    }
}


    function Details() {
        if (closestBeachDetails) {
            return (
                <div className="surfingTodayDiv">
                    <h2>The nearest beach - <span className="details">{closestBeachDetails.beach_name}</span> </h2>
                    <div className="beachDetails">
                        <div>
                            <h4>Wind Speed</h4>
                            <AirIcon className="detail" />
                            <p className="details">{closestBeachDetails.wind_speed} kts</p>
                        </div>
                        <div>
                            <h4>Wave Height</h4>
                            <SurfingIcon className="detail" />
                            <p className="details">{closestBeachDetails.wave_height} m</p>
                        </div>
                        <div>
                            <h4>Water Temperature</h4>
                            <ThermostatIcon className="detail" />
                            <p className="details">{closestBeachDetails.water_temperature} °C</p>
                        </div>
                    </div>
                </div>
            )
        }
        else if (!closestBeachDetails) {
            return (
                <div className="loading"><LoadingComponent /></div>
            )
        }
    }




    return (
        <>
            {!geolocation.error ? <Details /> : <div> <h2>please share your location,and then refresh the page in order for the weather forecast to work</h2></div>}

{            products !== undefined? <HotNow/> : <></> }

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
                <Link to="/signUp">
                    <Button
                        variant="contained">
                        Sign Up
                    </Button>
                </Link>
            </div>
        </>
    )
}


export default HomePage;

