import React from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

import { Line } from 'react-chartjs-2';

function CoinChart(props) {

    const info = props.data;
    console.log(info);

    const time = info.map(x => x[0]);
    const data = info.map(x => x[1]);

    const newData = [];
    var maxVal = 40;
    var delta = Math.floor( data.length / maxVal );          
    for (var i = 0; i < data.length; i=i+delta) {
        newData.push(data[i]);
    }

    const newTime = [];
    var delta = Math.floor( time.length / maxVal );          
    for (var i = 0; i < time.length; i=i+delta) {
        newTime.push(time[i]);
    }

    const convertedTime = [];
    for (var i = 0; i < newTime.length; i++){
        var d = new Date();
        d.setTime(newTime[i]);
        console.log(d.toString().split(" ").slice(1, 4).join(' '));
        convertedTime.push(d.toString().split(" ").slice(1, 4).join(' '));
    }

    console.log(newData);

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
                        backgroundColor:[
                          'rgba(255, 99, 132, 0.6)',
                          'rgba(54, 162, 235, 0.6)',
                          'rgba(255, 206, 86, 0.6)',
                          'rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)',
                          'rgba(255, 159, 64, 0.6)',
                          'rgba(255, 99, 132, 0.6)'
                        ]
                      }
                    ]
                }}
                options={{
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