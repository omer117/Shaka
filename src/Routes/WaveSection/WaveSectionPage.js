import { useEffect, useState } from "react";
import axios from "axios";


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
    let [beaches, setBeaches] = useState({})
    let [myLocation, setLocation] = useState([])
    let allData = [];

    let date = new Date()
    let endDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1) + 'T' + '00:00:00.552Z')

    useEffect(() => {
        axios.get(`/getBeaches`)
            .then((res) => setBeaches(res.data))
            .catch((err) => console.log(err));

        navigator.geolocation.getCurrentPosition((position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);
        })

     
        }
    , []);

    if (Object.keys(beaches).length > 0) {
        let distances = beaches.map((beach) => ({
            name: beach.beach_name, distance: distanceBetweenBeaches(myLocation[0], myLocation[1], Number(beach.lat), Number(beach.lon), "K")
        }))



    }

    // useEffect(()=>{
    //     if(Object.keys(beaches).length>0){
    //         let distanceBetween= [];
    //         for(let i=0; i<beaches.length; i){

    //         }


    //     }else{
    //         console.log('no');
    //     }

    // },[])



    return (
        <>
            <p>sdaf</p>
        </>
    )
}


export default WaveSectionPage;


   // if (Object.keys(beaches).length > 0) {
        //     const getWeather = beaches.map(async (beach) => {
        //         const options = {
        //             method: 'GET',
        //             url: 'https://api.stormglass.io/v2/weather/point',
        //             params: {
        //                 'lat': beach.lat,
        //                 'lng': beach.lon,
        //                 'params': 'windSpeed,windDirection,waveHeight,waterTemperature',
        //                 'start': JSON.stringify(date),
        //                 'end': JSON.stringify(endDate),
        //             },
        //             headers: {
        //                 'Authorization': '78d8a20a-2318-11ed-8ab7-0242ac130002-78d8a2b4-2318-11ed-8ab7-0242ac130002'
        //                 // 'Authorization': '8f33be36-3362-11ed-b970-0242ac130002-8f33be9a-3362-11ed-b970-0242ac130002'
        //             }
        //         };

        //         await axios.request(options).then((response) => {
        //              allData.push(response.data.hours[0]);
        //         }).catch(function (error) {
        //             console.error(error);
                // });
            // })
            // console.log(allData);