import { useEffect, useState } from "react";
import axios from "axios";
import { ContactSupportOutlined } from "@mui/icons-material";


function distanceBetweenBeaches(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
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
        return dist;
    }
}


function WaveSectionPage() {
    // let [beaches, setBeaches] = useState([])
    // let [myLocation, setLocation] = useState([])
    // let [distances, setDistances] = useState([])
    // let [closestBeach, setClosest] = useState({})
    // let [closestBeachDetails, setClosestBeacheDetails] = useState([])
    // let allData = [];

    // let date = new Date()
    // let startDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()) + 'T' + date.getHours() + ':00:00.552Z')
    // let endDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1) + 'T' + '00:00:00.552Z')

    // console.log(startDate);
    // useEffect(() => {
    //     axios.get(`/getBeaches`)
    //         .then((res) => setBeaches(res.data))
    //         .catch((err) => console.log(err));

    //     navigator.geolocation.getCurrentPosition((position) => {
    //         setLocation([position.coords.latitude, position.coords.longitude]);
    //     })

    // }, []);

    // useEffect(() => {
    //     let distances = beaches.map((beach) => ({
    //         id: beach.beach_id, name: beach.beach_name, distance: Math.round(distanceBetweenBeaches(myLocation[0], myLocation[1], Number(beach.lat), Number(beach.lon), "K"))
    //     }))
    //     setDistances(distances.sort((a, b) => {
    //         return a.distance - b.distance
    //     }))


    // }, [beaches])


    // useEffect(() => {
    //     if (distances.length > 0) {
    //         axios.post('/everyDayGet', {
    //             sqlString: `SELECT * FROM beaches WHERE beach_id='${distances[0].id}';`
    //         }
    //         ).then((res) => setClosest(res.data))
    //     }
    // }, [distances])


    // useEffect(() => {

    //     if (closestBeach.length > 0) {
    //         console.log('sad');
    //         axios.request({
    //             method: 'GET',
    //             url: 'https://api.stormglass.io/v2/weather/point',
    //             params: {
    //                 'lat': (closestBeach[0].lat),
    //                 'lng': (closestBeach[0].lon),
    //                 'params': 'windSpeed,windDirection,waveHeight,waterTemperature',
    //                 'start': JSON.stringify(date),
    //                 'end': JSON.stringify(endDate),
    //             },
    //             headers: {
    //                 // 'Authorization': '78d8a20a-2318-11ed-8ab7-0242ac130002-78d8a2b4-2318-11ed-8ab7-0242ac130002'
    //                 // 'Authorization': '8f33be36-3362-11ed-b970-0242ac130002-8f33be9a-3362-11ed-b970-0242ac130002'
    //                 // 'Authorization': '59d4c962-341e-11ed-b3fe-0242ac130002-59d4c9bc-341e-11ed-b3fe-0242ac130002'
    //                 'Authorization': '64913ab6-341e-11ed-869c-0242ac130002-64913b4c-341e-11ed-869c-0242ac130002'
    //                 // 'Authorization': '589a1a3e-341e-11ed-b34b-0242ac130002-589a1a98-341e-11ed-b34b-0242ac130002'
    //                 // 'Authorization': '9a76f454-341e-11ed-869c-0242ac130002-9a76f4c2-341e-11ed-869c-0242ac130002'

    //             }
    //         }).then((res) => {
    //             setClosestBeacheDetails([(res.data.hours)]);
    //         })


    //         // localStorage.setItem('closestBeachDetails', JSON.stringify(closestBeachDetails));
    //         // console.log(JSON.parse(localStorage.getItem('closestBeachDetails')))
    //         console.log(closestBeachDetails)
    //     }
    // },[])


    // useEffect(() => {

    //     if (closestBeachDetails.length > 0) {


    //         //     let reqString = `INSERT INTO daily_forecast 
    //         //  (wave_height,wind_direction,wind_speed,water_temperature,forecast_hour,last_updated,beach_id)
    //         //  VALUES
    //         //   `


    //         //     for (let i = 0; i < 1; i++) {
    //         //         reqString += `INSERT INTO daily_forecast 
    //         //     (wave_height,wind_direction,wind_speed,water_temperature,forecast_hour,last_updated,beach_id)
    //         //     VALUES (${closestBeachDetails[i].waveHeight},
    //         //                    ${closestBeachDetails[i].windDirection},
    //         //                    ${closestBeachDetails[i].windSpeed},
    //         //                    ${closestBeachDetails[i].waterTemperature},
    //         //                    ${closestBeachDetails[i].time},
    //         //                    ${(date.getDate()) + '-' + (date.getMonth() + 1) + '-' + (date.getFullYear())},
    //         //                    ${distances[0].id}
    //         //                 );`

    //         //                 console.log(reqString);

    //         //     }




    //     }
    // }, [closestBeachDetails])




    return (
        <>
            <p>sdaf</p>
        </>
    )
}


export default WaveSectionPage;

