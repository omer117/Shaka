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
    let [beaches, setBeaches] = useState([])
    // let [myLocation, setLocation] = useState([])
    // let [distances, setDistances] = useState([])
    // let [closestBeach, setClosest] = useState({})
    // let [closestBeachDetails, setClosestBeacheDetails] = useState([])
    // let allData = [];

    // let date = new Date()
    // let startDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()) + 'T' + date.getHours() + ':00:00.552Z')
    // let endDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1) + 'T' + '00:00:00.552Z')

    // console.log(startDate);
    useEffect(() => {
        axios.get(`/getBeaches`)
            .then((res) => setBeaches(res.data))
            .catch((err) => console.log(err));

        // navigator.geolocation.getCurrentPosition((position) => {
        //     setLocation([position.coords.latitude, position.coords.longitude]);
        // })

    }, []);

    console.log(beaches);

    return (
        <>
            <p>sdaf</p>
        </>
    )
}


export default WaveSectionPage;

