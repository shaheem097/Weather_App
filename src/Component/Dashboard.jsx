import React, { useEffect, useState } from "react";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import Graph from "./Graph";
import Card from "./Card";

function Dashboard() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [graphCity, setGraphCity] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const API_KEY = "a9a85d5a99870de041da012f317557b2";

  const searchWeatherData = () => {
    const city = selectedCity;
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_KEY}`;

      axios.get(url).then((response) => {
        setWeatherData(response.data);
        setGraphCity(city);
        console.log(response.data);
      });
    }
    setSearchClicked(true);
  };

  const handleCountryChange = (event) => {
    const selectedCountryIsoCode = event.target.value;
    setSelectedCountry(selectedCountryIsoCode);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (event) => {
    const selectedStateIsoCode = event.target.value;
    setSelectedState(selectedStateIsoCode);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);
  };

  useEffect(() => {
    // Function to get user's current location
    const getCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherDataByCoords(latitude, longitude);
          },
          (error) => {
            console.error("Error getting current location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser.");
      }
    };

    // Fetch weather data using coordinates
    const getWeatherDataByCoords = (latitude, longitude) => {
      const coordUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${API_KEY}`;
      axios.get(coordUrl).then((response) => {
        setWeatherData(response.data);
      });
    };

    // Get current location weather data when component mounts
    getCurrentLocation();
  }, []);
 
  
 


  return (
    <div className="bg-[#d1d5db]">
      <div className="flex justify-center ">
        <div className="rounded-lg  w-full  mx-4">
          <div className="flex justify-center gap-2 p-4">
            <select
              className="flex items-center whitespace-nowrap rounded w-44 bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>

            {/* State Dropdown */}
            <select
              className="flex items-center whitespace-nowrap rounded w-40 bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {State.getStatesOfCountry(selectedCountry).map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>

            {/* City Dropdown */}
            <select
              className="flex items-center whitespace-nowrap rounded w-40 bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Select City</option>
              {City.getCitiesOfState(selectedCountry, selectedState).map(
                (city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                )
              )}
            </select>

            {/* Search Button */}
            <button
              class="inline-block rounded border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900"
              onClick={searchWeatherData}
              disabled={!selectedCity}
            >
              Search
            </button>
          </div>

          <div className="flex ">
            <div className="justify-center w-2/4">
              <div className="flex ">
                <div>
                  <img
                    style={{ width: "300px", height: "200px" }}
                    src="/assets/house.png"
                    alt=""
                  />
                </div>
                <div className="relative">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div className="ml-16 mt-6">
                  <h1 className="text-xl " style={{ fontFamily: "emoji" }}>
                    {weatherData?.name}
                  </h1>

                  <h1 className="text-5xl " style={{ fontFamily: "emoji" }}>
                    {weatherData?.main?.temp.toFixed()}°C{" "}
                  </h1>
                  <h1 className="text-xl " style={{ fontFamily: "emoji" }}>
                    {weatherData?.weather[0]?.description}{" "}
                  </h1>
                </div>
              </div>

             <Card weatherData={weatherData}/>
            </div>
            
            <Graph city={searchClicked ? graphCity : ""} />
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
