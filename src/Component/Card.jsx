import React from 'react'

function Card({weatherData}) {

    const formatSunriseTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
    
        // Convert hours from 24-hour format to 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    
        // Add leading zero to minutes if needed
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      };
    
  return (
    <div>
      <div className="bg-gray border border-black rounded-t-3xl inset-0 bg-gray-300 bg-opacity-30 backdrop-blur-md ">
                <div className="rounded-t-3xl border-black h-96 mt-5 relative ">
                  <div className="flex gap-4 mx-24 mb-8">
                    <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                      <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                        <img
                          src="/assets/sunrise.png"
                          alt=""
                          className="h-10 mt-4"
                        />
                        <h1 className="font-roboto text-lg  ml-4 font-medium mt-4">
                          {weatherData?.sys?.sunrise &&
                            formatSunriseTime(weatherData.sys.sunrise)}
                        </h1>{" "}
                      </div>

                      <h1 className="font-roboto text-lg ml-8 font-medium mt-7 absolute ">
                        Sunrise{" "}
                      </h1>
                      <img
                        src="/failure.png"
                        alt=""
                        className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5"
                      />
                    </div>

                    <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                      <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                        <img
                          src="/assets/temp.png"
                          alt=""
                          className="h-10 mt-4"
                        />
                        <h1 className="font-roboto text-2xl  ml-4 font-medium mt-5">
                          {weatherData?.main?.temp_max.toFixed()}°C
                        </h1>
                      </div>

                      <h1 className="font-roboto text-sm ml-8 font-medium mt-7 absolute ">
                        Maximum
                        <br /> Temparature{" "}
                      </h1>
                      <img
                        src="/failure.png"
                        alt=""
                        className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5"
                      />
                    </div>

                    <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                      <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                        <img
                          src="/assets/humidity.png"
                          alt=""
                          className="h-10 mt-4"
                        />
                        <h1 className="font-roboto text-2xl  ml-4 font-medium mt-5">
                          {weatherData?.main?.humidity}%
                        </h1>
                      </div>

                      <h1 className="font-roboto text-lg  ml-8 font-medium mt-7 absolute ">
                        Humidity{" "}
                      </h1>
                      <img
                        src="/failure.png"
                        alt=""
                        className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mx-24 mb-8">
                    <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                      <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                        <img
                          src="/assets/wind.png"
                          alt=""
                          className="h-10 mt-4"
                        />
                        <h1 className="font-roboto text-lg  ml-4 font-medium mt-5">
                          {weatherData?.wind?.speed.toFixed()}KPH
                        </h1>
                      </div>

                      <h1 className="font-roboto text-lg ml-8 font-medium mt-7 absolute ">
                        Wind
                      </h1>
                      <img
                        src="/failure.png"
                        alt=""
                        className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5"
                      />
                    </div>

                    <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                      <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                        <img
                          src="/assets/feelslike.png"
                          alt=""
                          className="h-10 mt-4"
                        />
                        <h1 className="font-roboto text-2xl  ml-4 font-medium mt-5">
                          {weatherData?.main?.feels_like.toFixed()}°C{" "}
                        </h1>
                      </div>

                      <h1 className="font-roboto text-lg ml-8 font-medium mt-7 absolute ">
                        Feels Like{" "}
                      </h1>
                      <img
                        src="/failure.png"
                        alt=""
                        className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5"
                      />
                    </div>

                    <div className="bg-white shadow-xl rounded-xl border border-gray-400 hover hover:border-2 border-gray-300">
                      <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
                        <img
                          src="/assets/pressure.png"
                          alt=""
                          className="h-10 mt-4"
                        />
                        <h1 className="font-roboto text-lg  ml-4 font-medium mt-4">
                          {weatherData?.main?.pressure}
                          <br /> hpa
                        </h1>
                      </div>

                      <h1 className="font-roboto text-lg ml-8 font-medium mt-7 absolute ">
                        Pressure{" "}
                      </h1>
                      <img
                        src="/failure.png"
                        alt=""
                        className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default Card
