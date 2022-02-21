import React from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

import { Line } from 'react-chartjs-2';

function CoinChart(props) {

    const info = props.data;

    // Map x and y axis using time (x axis) and price points (y axis)
    const time = info.map(x => x[0]);
    const data = info.map(x => x[1]);

    const newData = [];

    // Reduce values (as there are 700 of them)
    var maxVal = 100;
    var delta = Math.floor( data.length / maxVal );          
    for (var i = 0; i < data.length; i=i+delta) {
        newData.push(data[i]);
    }

    // Get the new reduced time values
    const newTime = [];
    var delta = Math.floor( time.length / maxVal );          
    for (var i = 0; i < time.length; i=i+delta) {
        newTime.push(time[i]);
    }

    // Get the new reduced price points values
    const convertedTime = [];
    for (var i = 0; i < newTime.length; i++){
        var d = new Date();
        d.setTime(newTime[i]);
        convertedTime.push(d.toString().split(" ").slice(1, 4).join(' '));
    }

    // Make the line chart using the new data
    return (
        <div className = "chart">
            <Line
                height={null}
                width={null}
                data = {{
                    labels: convertedTime,
                    datasets:[
                      {
                        label:'Price AUD',
                        data:newData,
                        borderColor: "#1652f0"
                      }
                    ]
                }}
                options={{
                    elements: {
                        point: {
                            radius: 1,
                        },
                    },
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                           label: function(tooltipItem) {
                                  return tooltipItem.yLabel;
                           }
                        }
                    }
                }}
            />
        </div>
    );
}

export default CoinChart;