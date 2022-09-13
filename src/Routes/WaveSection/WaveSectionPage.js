import { useEffect, useState } from "react";
import axios from "axios";


function distanceBetweenBeaches(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}


function WaveSectionPage() {
    let [beaches, setBeaches] = useState({})
    let [myLocation, setLocation] = useState([])
    let [distances,setDistances] = useState({})


    
    useEffect(() => {
        axios.get(`/getBeaches`)
        .then((res) => setBeaches(res.data))
        .catch((err) => console.log(err));
        
        console.log(beaches);
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocation([position.coords.latitude, position.coords.longitude]);
        })

        }, []);
        
        if(Object.keys(beaches).length>0){
        console.log(distanceBetweenBeaches(myLocation[0],myLocation[1],Number(beaches[0].lat),Number(beaches[0].lon),"K"))
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