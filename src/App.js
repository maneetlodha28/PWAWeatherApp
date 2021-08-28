import React, { useCallback, useEffect, useRef, useState } from 'react';
import { locationAPI, weatherAPI } from './api/weather';

import './App.css';

const App = () => {
	const [ searchTerm, setSearchTerm ] = useState('');

	const [ weatherData, setWeatherDate ] = useState({});
	const firstRun = useRef(true);
	const handleSearch = async (search) => {
		weatherAPI(search)
			.then((response) => {
				setWeatherDate(response);
			})
			.catch((err) => console.error(err));
	};

	const success = useCallback((pos) => {
		var crd = pos.coords;
		locationAPI([ crd.latitude, crd.longitude ]).then((res) => handleSearch(res.data[0].locality));
	}, []);

	const errors = (err) => {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	};

	useEffect(
		() => {
			if (firstRun.current) {
				if (navigator.geolocation) {
					navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
						var options = {
							enableHighAccuracy: true,
							timeout: 5000,
							maximumAge: 0
						};
						if (result.state === 'granted') {
							//If granted then you can directly call your function here
							navigator.geolocation.getCurrentPosition(success);
						} else if (result.state === 'prompt') {
							navigator.geolocation.getCurrentPosition(success, errors, options);
						} else if (result.state === 'denied') {
							//If denied then you have to show instructions to enable location
						}
					});
				} else {
					alert('Sorry Not available!');
				}
				firstRun.current = false;
			}
		},
		[ success ]
	);

	return (
		<div className="main-container">
			<input
				type="text"
				className="search"
				placeholder="Enter City here.."
				value={searchTerm}
				onKeyUp={(e) => {
					if (e.code === 'Enter') handleSearch(searchTerm);
				}}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button className="search-button" onClick={() => handleSearch(searchTerm)}>
				Search
			</button>

			{weatherData.main && (
				<div className="city">
					<h2 className="city-name">
						<span>{weatherData.name}</span>
						<sup>{weatherData.sys.country}</sup>
					</h2>
					<div className="city-temp">
						{Math.round(weatherData.main.temp)}
						<sup>&deg;C</sup>
					</div>
					<div className="info">
						<img
							className="city-icon"
							src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
							alt={weatherData.weather[0].description}
						/>
						<p>{weatherData.weather[0].description}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
