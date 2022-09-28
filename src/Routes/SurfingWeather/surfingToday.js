import axios from "axios"
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import { useEffect, useState } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AirIcon from '@mui/icons-material/Air';
import SurfingIcon from '@mui/icons-material/Surfing';
import ThermostatIcon from '@mui/icons-material/Thermostat';

function SurfingTodayComponent() {
    const [beaches, setBeaches] = useState([])
    const [selectedBeach, setSelectedBeach] = useState(1)
    const [selectedBeachDetails, setSelectedBeachDetails] = useState({})

    const handleChange = (event) => {
        setSelectedBeach(event.target.value);
    };


    useEffect(() => {
        axios.get(`https://shakaserver2.herokuapp.com/getBeaches`)
            .then((res) => setBeaches(res.data))
            .catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        axios.post('https://shakaserver2.herokuapp.com/everyDayGet',
            { sqlString: `SELECT * FROM daily_forecast WHERE beach_id=${selectedBeach}` })
            .then((res) => setSelectedBeachDetails(res.data))
            .catch((err) => console.log(err));
    }, [selectedBeach])

    console.log(selectedBeachDetails);


    const beachesList = beaches.map((beach) => {
        return (<MenuItem key={beach.beach_id} value={beach.beach_id}>{beach.beach_name}</MenuItem>)
    })

    function WeatherDiv() {
        if (selectedBeachDetails.length > 0) {

            return (<div className="surfingTodayDiv">
                <h2>The chosen beach - {selectedBeachDetails[0].beach_name} </h2>
                <div className="beachDetails">
                    <div>
                        <h4>wind Speed</h4>
                        <AirIcon className="detail" />
                        <p>{selectedBeachDetails[0].wind_speed}</p>
                    </div>
                    <div>
                        <h4>wave height</h4>
                        <SurfingIcon className="detail" />
                        <p>{selectedBeachDetails[0].wave_height}</p>
                    </div>
                    <div>
                        <h4>water temperature</h4>
                        <ThermostatIcon className="detail" />
                        <p>{selectedBeachDetails[0].water_temperature}</p>
                    </div>
                </div>
            </div>)
        }
        else {
            return (

               <div className="loading">
                   <LoadingComponent />
               </div>
            )
        }
    }


    return (
        <>
            <div className="mainDiv">

                <div className="form">

                    <FormControl>
                        <InputLabel id="form">beach </InputLabel>
                        <Select
                            id="formDataSelector"
                            value={selectedBeach}
                            label="beach"
                            autoWidth
                            onChange={handleChange}
                        >
                            {beachesList}
                        </Select>
                    </FormControl>
                </div>
                 <WeatherDiv details={selectedBeachDetails[0]}/>
            </div>
        </>
    )
}


export default SurfingTodayComponent