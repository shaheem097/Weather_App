import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { Country, State, City } from "country-state-city";

function Dashboard() {
    

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const API_KEY='a9a85d5a99870de041da012f317557b2'

   
    

    const searchWeatherData = () => {
        const city = selectedCity;
        if (city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_KEY}`;

            axios.get(url).then((response) => {
                setWeatherData(response.data);
                console.log(response.data);
            });
        }
    };

    const handleCountryChange = (event) => {
        const selectedCountryIsoCode = event.target.value;
        setSelectedCountry(selectedCountryIsoCode);
        setSelectedState('');
        setSelectedCity('');
    };

    const handleStateChange = (event) => {
        const selectedStateIsoCode = event.target.value;
        setSelectedState(selectedStateIsoCode);
        setSelectedCity('');
    };

    const handleCityChange = (event) => {
        const selectedCityName = event.target.value;
        setSelectedCity(selectedCityName);
    };

       useEffect(() => {
    // Function to get user's current location
    const getCurrentLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherDataByCoords(latitude, longitude);
          },
          (error) => {
            console.error('Error getting current location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser.');
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

      const formatSunriseTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        // Convert hours from 24-hour format to 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    
        // Add leading zero to minutes if needed
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      };

      const [state, setState] = useState({
        series: [
          {
            name: 'Completed',
            data: [31, 40, 28, 51, 42, 109, 100],
    
          },
          {
            name: 'Not Completed',
            data: [11, 32, 45, 32, 34, 52, 41],
    
          },
    
        ],
        options: {
          chart: {
            height: 350,
            type: 'area',
            toolbar: {
              show: false,
              offsetX: 0,
              offsetY: 0,
              tools: {
                zoom: '',
                zoomin: false,
                zoomout: false,
                download: false,
                selection: false,
                pan: false,
                reset: ''
              }
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
            width: 2,
          },
          xaxis: {
            type: 'Day',
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm',
            },
          },
          colors: ['#00ff00', '#ff0000'],
        },
      });

      console.log(weatherData,"dataaaaa");

  return (
    <div className='bg-[#d1d5db]'>
   
      <div className="flex justify-center ">

        <div className="rounded-lg  w-full  mx-4"  >
        <div className="flex justify-center gap-2 p-4">
        <select 
         className="flex items-center whitespace-nowrap rounded w-40 bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
        value={selectedCountry} onChange={handleCountryChange}>
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
            value={selectedState} onChange={handleStateChange}>
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
            value={selectedCity} onChange={handleCityChange}>
                <option value="">Select City</option>
                {City.getCitiesOfState(selectedCountry, selectedState).map((city) => (
                    <option key={city.name} value={city.name}>
                        {city.name}
                    </option>
                ))}
            </select>

            {/* Search Button */}
            <button 
            class="inline-block rounded border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900"
            onClick={searchWeatherData} disabled={!selectedCity}>
                Search
            </button>
        
      </div>

          
          <div className="flex ">

          <div className='justify-center w-2/4'>
           
           <div className='flex '>
            <div>
            <img style={{width:'300px',height:'200px'}} src="/assets/house.png" alt="" />
            </div>
            <div className='relative'>
                <img src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} alt=""/>
            </div>
            <div className='ml-16 mt-6'>
            <h1 className="text-xl " style={{ fontFamily: 'emoji' }}>{weatherData?.name}</h1>

            <h1 className="text-5xl " style={{ fontFamily: 'emoji' }}>{weatherData?.main?.temp.toFixed()}°C </h1>
            <h1 className="text-xl " style={{ fontFamily: 'emoji' }}>{weatherData?.weather[0]?.description} </h1>
              </div>
              </div> 
          
            <div className="bg-gray border border-black rounded-t-3xl inset-0 bg-gray-300 bg-opacity-30 backdrop-blur-md ">

            
            <div className="rounded-t-3xl border-black h-96 mt-5 relative ">
                

            <div className='flex gap-4 mx-24 mb-8'>
                
              <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                  <img src="/assets/sunrise.png" alt="" className="h-10 mt-4" />
                  <h1 className="font-roboto text-lg  ml-4 font-medium mt-4">
          {weatherData?.sys?.sunrise && formatSunriseTime(weatherData.sys.sunrise)}
        </h1>                </div>

                <h1 className="font-roboto text-lg ml-8 font-medium mt-7 absolute ">Sunrise </h1>
                <img src="/failure.png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
              </div>

              <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                  <img src="/assets/temp.png" alt="" className="h-10 mt-4" />
                  <h1 className="font-roboto text-2xl  ml-4 font-medium mt-5">{weatherData?.main?.temp_max.toFixed()}°C</h1>
                </div>

                <h1 className="font-roboto text-sm ml-8 font-medium mt-7 absolute ">Maximum<br/> Temparature </h1>
                <img src="/failure.png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
              </div>


              <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                  <img src="/assets/humidity.png" alt="" className="h-10 mt-4" />
                  <h1 className="font-roboto text-2xl  ml-4 font-medium mt-5">{weatherData?.main?.humidity}%</h1>
                </div>

                <h1 className="font-roboto text-lg  ml-8 font-medium mt-7 absolute ">Humidity </h1>
                <img src="/failure.png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
              </div>

              </div>
            <div className='flex gap-4 mx-24 mb-8'>
                
            <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                  <img src="/assets/wind.png" alt="" className="h-10 mt-4" />
                  <h1 className="font-roboto text-lg  ml-4 font-medium mt-5">{weatherData?.wind?.speed.toFixed()}KPH</h1>
                </div>

                <h1 className="font-roboto text-lg ml-8 font-medium mt-7 absolute ">Wind</h1>
                <img src="/failure.png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
              </div>

              <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                  <img src="/assets/feelslike.png" alt="" className="h-10 mt-4" />
                  <h1 className="font-roboto text-2xl  ml-4 font-medium mt-5">{weatherData?.main?.feels_like.toFixed()}°C </h1>
                </div>

                <h1 className="font-roboto text-lg ml-8 font-medium mt-7 absolute ">Feels Like </h1>
                <img src="/failure.png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
              </div>


              <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                  <img src="/assets/pressure.png" alt="" className="h-10 mt-4" />
                  <h1 className="font-roboto text-lg  ml-4 font-medium mt-4">{weatherData?.main?.pressure}<br/> hpa</h1>
                </div>

                <h1 className="font-roboto text-lg ml-8 font-medium mt-7 absolute ">Pressure </h1>
                <img src="/failure.png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
              </div>
              </div>


              
              </div>
              </div>
            </div>


          
           
            <div>
            <div className="flex h-16rem">
            <div className="w-25.2rem h-72 bg-white ml-3 mb-48rem mt-3 rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300">

              <ReactApexChart options={state.options} series={state.series} type="area" height={280} />
            </div>
            <div className="w-25.2rem h-72 bg-white ml-3 mb-48rem mt-3 rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300">

              <ReactApexChart options={state.options} series={state.series} type="area" height={280} />
            </div>

          </div>
          <div className="w-25.2rem h-72 bg-white ml-3 mb-48rem mt-3 rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300">

<ReactApexChart options={state.options} series={state.series} type="area" height={280} />
</div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
