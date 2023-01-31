import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts"; 
import jsonData from 'helpers/data.json';

 
export default function BrushChart() { 

    const [chartData1, setChartData1] = useState({
        series: [{
            name: "series1",
            data: []
        }],
        options: {
            chart: {
                id: "chart1",
                type: "line",
                height: 230,
                toolbar: {
                    autoSelected: "pan",
                    show: false
                }
            },
            colors: ["#546E7A"],
            stroke: {
                width: 3
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1
            },
            markers: {
                size: 0
            },
            xaxis: {
                type: "datetime"
            },
            annotations: {
                xaxis: [
                    {
                        x: 1670688000000,
                        borderColor: "#999",
                        label: {
                            borderColor: "#999",
                            style: {
                                color: "#fff",
                                background: "#00E396",
                            },
                            text: "This is a test",
                        },
                    }
                ],
                yaxis: [
                    {
                        y: 800,
                        borderColor: '#0a8dff',
                        label: {
                            borderColor: '#0a8dff',
                            style: {
                                color: '#fff',
                                background: '#0a8dff'
                            },
                        text: 'This is a test 2'
                        }
                    },
                    {
                        y: 100,
                        y2: 300,
                        borderColor: '#000',
                        fillColor: '#FEB019',
                        label: {
                            text: 'This is a test 3'
                        }
                    }
                ]
            },
        }
    })

    const [chartData2, setChartData2] = useState({
        series:[
            {
                name: "series1",
                data:[]
            }
        ],
        options: {
            chart: {
                id: "chart2",
                height: 130,
                type: "area",
                brush: {
                    target: "chart1",
                    enabled: true
                },
                selection: {
                    enabled: true,
                    xaxis: {
                        min: 0,
                        max: 0
                    }
                }
            },
            colors: ["green"],
            xaxis: {
                type: "datetime",
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                tickAmount: 2
            }, 
            annotations: {
                xaxis: [
                    {
                        x: 1670688000000,
                        borderColor: "#999",
                        label: {
                            borderColor: "#999",
                            style: {
                                color: "#fff",
                                background: "#00E396",
                            },
                            text: "This is a test",
                        },
                    }
                ],
                yaxis: [
                    {
                        y: 800,
                        borderColor: '#0a8dff',
                        label: {
                            borderColor: '#0a8dff',
                            style: {
                                color: '#fff',
                                background: '#0a8dff'
                            },
                        text: 'This is a test 2'
                        }
                    },
                    {
                        y: 100,
                        y2: 300,
                        borderColor: '#000',
                        fillColor: '#FEB019',
                        label: {
                          text: 'This is a test 3'
                        }
                      }
                ]
            },
            
        }
    })

    
    useEffect(() => { 
        const sortJson = jsonData.sort( function(a,b) {
            return new Date(a.Date).getTime() - new Date(b.Date).getTime()
        });

        const newData = sortJson.map((val) => {
            return [
                new Date(val.Date).getTime(), 
                parseFloat(val.Revenue).toFixed(2)
            ]
        })

        const newChartData = {...chartData1} 
        const newChartDataOption2 = {...chartData2.options}
        newChartData.series[0].data = [...newData]

        const randomNumber =  Math.floor(Math.random() * newData.length) + 0
        const maxData = newData[randomNumber][0]
        newChartDataOption2.chart.selection.xaxis = {
            min: newData[0][0],
            max: maxData
        } 
        
        setChartData1({
            ...newChartData
        })
        
        setTimeout(() => {
            setChartData2({
                ...newChartData,
                ...{
                    options: newChartDataOption2
                }
            }) 
        }, 800);
    }, [])

    
    return (
        <div id="chart">
            <Chart options={chartData1.options} series={chartData1.series} type="line" height={310} />
            <Chart options={chartData2.options} series={chartData2.series} type="line" height={310} />
        </div>
    );
}