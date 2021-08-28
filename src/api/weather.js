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

export const locationAPI = async(query)=>{
    const apiKey = '6b70b25edaff7834c8bd62d1a8808ab4'
  const url = `http://api.positionstack.com/v1/reverse?query=${query}`

  const {data} = await axios.get(url, {
      params:{
          limit:1,
           access_key:apiKey
      }
  })
  return data;
}