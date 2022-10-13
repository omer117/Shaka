import axios from 'axios'
import { Beaches } from './Beaches'
//1 get daily forecast
//2 check last updated 
//3 if LU older then today Date:
//3.1  get daily forecast from api and push to db
//3.11 fetch from db to client 
//else 
// 3.2 return daily forecast (DB) from client 


let startDate = new Date()
let orgDate = startDate.getDate();
let fetchDate = (startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + (startDate.getDate()))
let newFetchEndDate = (startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + (startDate.getDate() + 1))




export async function checkAndUpdateDailyForecast() {
    await axios.get('https://shakanest14.herokuapp.com/daily-forecast/1')
        .then((response) => {
            let lastDate = (Number(response.data.last_updated.substring(8, 10)));
            console.log(lastDate);
            console.log(orgDate);
            if (lastDate !== orgDate) {
                axios.delete('https://shakanest14.herokuapp.com/daily-forecast')
                    .then(() => {
                        Beaches.forEach(async (beach) => {
                            await axios.request({
                                method: 'GET',
                                url: 'https://api.stormglass.io/v2/weather/point',
                                params: {
                                    'lat': (beach.lat),
                                    'lng': (beach.lon),
                                    'params': 'windSpeed,windDirection,waveHeight,waterTemperature',
                                    'start': JSON.stringify(fetchDate),
                                    'end': JSON.stringify(newFetchEndDate),
                                },
                                headers: {
                                    // 'Authorization': '78d8a20a-2318-11ed-8ab7-0242ac130002-78d8a2b4-2318-11ed-8ab7-0242ac130002'
                                    'Authorization': '8f33be36-3362-11ed-b970-0242ac130002-8f33be9a-3362-11ed-b970-0242ac130002'
                                    // 'Authorization': '59d4c962-341e-11ed-b3fe-0242ac130002-59d4c9bc-341e-11ed-b3fe-0242ac130002'
                                    // 'Authorization': '64913ab6-341e-11ed-869c-0242ac130002-64913b4c-341e-11ed-869c-0242ac130002'
                                    // 'Authorization': '589a1a3e-341e-11ed-b34b-0242ac130002-589a1a98-341e-11ed-b34b-0242ac130002'
                                    // 'Authorization': '9a76f454-341e-11ed-869c-0242ac130002-9a76f4c2-341e-11ed-869c-0242ac130002'
                                }
                            }).then((res) => {
                                let Newforecast = (JSON.parse(JSON.stringify(res.data.hours[0])));
                                axios.post('https://shakanest14.herokuapp.com/daily-forecast', {
                                    wave_height: (Newforecast.waveHeight.icon).toString(),
                                    wind_direction: (Newforecast.windDirection.icon).toString(),
                                    wind_speed: (Newforecast.windSpeed.icon).toString(),
                                    water_temperature: Math.ceil(Newforecast.waterTemperature.meto),
                                    last_updated: fetchDate,
                                    beach_id: beach.beach_id,
                                    beach_name: beach.beach_name
                                }).catch((error) => {
                                    console.log(error)
                                }).finally(() => {
                                    console.log('updated');
                                })
                            })
                        })
                    }
                    )
            } else {
                console.log('no need for update')
            }

        }
        )
}


