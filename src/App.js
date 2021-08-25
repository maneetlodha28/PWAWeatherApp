import React, { useState } from 'react';
import { weatherAPI } from './api/weather';

import './App.css';

const  App = ()=> {

  const [searchTerm, setSearchTerm] = useState('')

  const [weatherData, setWeatherDate] = useState({})

  const handleSearch = async(search)=>{

    weatherAPI(search).then(response=>{
      setWeatherDate(response)
    }).catch(err=>console.error(err))
  }


  return (

 <div className="main-container">
   <input
    type="text"
    className="search"
    placeholder="search.."
    value={searchTerm}
    onKeyUp={(e)=>{
      if(e.code==="Enter")
      handleSearch(searchTerm)
    }}
    onChange={e=>setSearchTerm(e.target.value)}
   />
   <button  onClick={()=>handleSearch(searchTerm)}>Search</button>

   {weatherData.main&& (
     <div className='city'>
       <h2 className="city-name">
         <span>{weatherData.name}</span>
         <sup>{weatherData.sys.country}</sup>
          </h2>
          <div className='city-temp'>
            {Math.round(weatherData.main.temp)}
            <sup>&deg;C</sup>
            </div>
          <div className="info">
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
              <p>{weatherData.weather[0].description}</p>
            </div>
         </div> 
   )}
 </div>
  )
}

export default App;
