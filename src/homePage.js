import React, { useCallback, useEffect, useRef, useState } from "react";
import { locationAPI, weatherAPI } from "./api/weather";
import Loader from "react-loader-spinner";
import "./App.css";
import WeatherCard from "./Components/weatherCard";
import SearchBox from "./api/searchBox";
import ShowError from "./Components/showError";
import NoCityFound from "./Components/noCityFound";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherDate] = useState({});
  const [noCityFound, setNoCityFound] = useState(false);
  const [showError, setShowError] = useState(false);
  const firstRun = useRef(true);

  const handleSearch = async (search) => {
    setWeatherDate({});
    setLoading(true);
    setNoCityFound(false);
    setShowError(false);
    weatherAPI(search)
      .then((response) => {
        setWeatherDate(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.data?.message === "city not found")
          setNoCityFound(true);
        else setShowError(true);
      });
  };

  const success = useCallback((pos) => {
    var crd = pos.coords;
    setLoading(true);
    locationAPI(crd.latitude, crd.longitude).then((res) => {
      setSearchTerm(res[0].City);
      handleSearch(res[0].City);
    });
  }, []);

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    if (firstRun.current) {
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            };
            if (result.state === "granted") {
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                success,
                errors,
                options
              );
            } else if (result.state === "denied") {
              setLoading(false);
              //If denied then you have to show instructions to enable location
            }
          });
      } else {
        alert("Sorry Not available!");
      }
      firstRun.current = false;
    }
  }, [success]);

  return (
    <div className="main-container">
      <SearchBox
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        setSearchTerm={setSearchTerm}
      />
      <Loader
        type="ThreeDots"
        color="#FFFFFF"
        height={100}
        width={60}
        visible={loading}
      />

      {weatherData.main && <WeatherCard weatherData={weatherData} />}
      {noCityFound && <NoCityFound />}
      {showError && <ShowError />}
    </div>
  );
};

export default HomePage;
