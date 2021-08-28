import React, { useCallback, useEffect, useRef, useState } from 'react';
import { locationAPI, weatherAPI } from './api/weather';
import Loader from "react-loader-spinner";
import './App.css';

const App = () => {
	const [ searchTerm, setSearchTerm ] = useState('');
  const [loading, setLoading]  = useState(false);
	const [ weatherData, setWeatherDate ] = useState({});
	const firstRun = useRef(true);
	const handleSearch = async (search) => {
    setWeatherDate({})
    setLoading(true)
		weatherAPI(search)
			.then((response) => {
				setWeatherDate(response);
        setLoading(false)
			})
			.catch((err) => console.error(err));
	};

	const success = useCallback((pos) => {
		var crd = pos.coords;
    setLoading(true)
		locationAPI(crd.latitude, crd.longitude).then((res) => {
			setSearchTerm(res[0].City);
			handleSearch(res[0].City);
		});
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
      <Loader
        type="ThreeDots"
        color="#FFFFFF"
        height={100}
        width={60}
        visible={loading}
      />

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
