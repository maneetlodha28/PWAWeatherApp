import axios from 'axios';


export const weatherAPI = async(query)=>{
    const apiKey='29754ae96b7459924b8b717f1e9997e6'
    const URL=`http://api.openweathermap.org/data/2.5/weather`

     const {data} = await axios.get(URL, {
         params:{
             q:query,
             units:'metric',
             APPID:apiKey
         }
     })
     return data;
     
}
