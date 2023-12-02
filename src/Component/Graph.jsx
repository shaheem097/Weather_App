import React, { useState } from 'react'
import ReactApexChart from "react-apexcharts";



function Graph() {
    const [state, setState] = useState({
        series: [
          {
            name: "Completed",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: "Not Completed",
            data: [11, 32, 45, 32, 34, 52, 41],
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "area",
            toolbar: {
              show: false,
              offsetX: 0,
              offsetY: 0,
              tools: {
                zoom: "",
                zoomin: false,
                zoomout: false,
                download: false,
                selection: false,
                pan: false,
                reset: "",
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          xaxis: {
            type: "Day",
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          colors: ["#00ff00", "#ff0000"],
        },
      });
  return (
    <div>
              <div className="flex h-16rem">
                <div className="w-25.2rem h-72 bg-white ml-3 mb-48rem mt-3 rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300">
                  <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="area"
                    height={280}
                  />
                </div>
                <div className="w-25.2rem h-72 bg-white ml-3 mb-48rem mt-3 rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300">
                  <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="area"
                    height={280}
                  />
                </div>
              </div>
              <div className="w-25.2rem h-72 bg-white ml-3 mb-48rem mt-3 rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300">
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="area"
                  height={280}
                />
              </div>
            </div>
  )
}

export default Graph
