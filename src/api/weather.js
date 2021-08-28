import axios from 'axios';


export const weatherAPI = async(query)=>{
    const apiKey='29754ae96b7459924b8b717f1e9997e6'
    const URL=`https://api.openweathermap.org/data/2.5/weather`

     const {data} = await axios.get(URL, {
         params:{
             q:query,
             units:'metric',
             APPID:apiKey
         }
     })
     return data;
     
}

export const locationAPI = async(lat, long)=>{
  

  var options = {
    method: 'GET',
    url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
    params: {range: '0', longitude: long, latitude: lat},
    headers: {
      'x-rapidapi-host': 'geocodeapi.p.rapidapi.com',
      'x-rapidapi-key': '055eb8035cmshe88c88165dc52e1p1a5dcajsnbf0b9600b8d0'
    }
  };
  
  const {data} = await axios.request(options)
  return data;
}