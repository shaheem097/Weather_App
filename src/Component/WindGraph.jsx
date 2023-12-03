// WindGraph.jsx
import { useState, useEffect } from "react";
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const WindGraph = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
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
        type: 'category',
        categories: [],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      colors: ['blue'], // You can customize the color for wind data
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
          name: 'Wind Speed',
          data: fiveDayData.map(item => item.wind.speed),
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
      <div className="w-46rem mt-14 h-1/4 bg-white ml-5 rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300 relative">
        <h2 className="text-xl font-semibold text-center absolute top-4 left-1/2 transform -translate-x-1/2">Wind Speed</h2>
        <div className="mt-8 flex gap-2">
          <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={250} />
        </div>
      </div>
    </>
  );
};

export default WindGraph;
