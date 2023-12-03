// RainGraph.jsx
import { useState, useEffect } from "react";
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const RainGraph = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'bar', // Using 'bar' type for rain data
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'category',
        categories: [],
      },
      colors: ['#4CAF50'], // You can customize the color for rain data
    },
  });

  const fetchData = async (query) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=a9a85d5a99870de041da012f317557b2`);
      setWeatherData(response.data.list);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchData(city);
    } else {
      fetchData('London'); // Fetch data for default city (London)
    }
  }, [city]);

  useEffect(() => {
    if (weatherData) {
      const uniqueDays = Array.from(new Set(weatherData.map(item => {
        const date = new Date(item.dt * 1000);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      })));

      const fiveDayData = weatherData.filter(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        return uniqueDays.includes(dayName);
      }).slice(0, 5);

      const newSeries = [
        {
          name: 'Rainfall',
          data: fiveDayData.map(item => (item.rain ? item.rain['3h'] : 0)), // Assuming rain data is available in '3h' intervals
        },
      ];

      const newOptions = {
        ...chartData.options,
        xaxis: {
          categories: uniqueDays.slice(0, 5),
        },
      };

      setChartData({ series: newSeries, options: newOptions });
    }
  }, [weatherData, chartData.options]);

  return (
    <>
      <div className="w-46rem  h-1/4 bg-white ml-5 rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300 relative">
        <h2 className="text-xl font-semibold text-center absolute top-4 left-1/2 transform -translate-x-1/2">Rainfall</h2>
        <div className="mt-8 ml-40 flex gap-2">
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={250} />
        </div>
      </div>
    </>
  );
};

export default RainGraph;
