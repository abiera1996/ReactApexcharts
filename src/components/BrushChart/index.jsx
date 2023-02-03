import React, { useEffect, useRef, useState } from 'react';
import Chart from "react-apexcharts"; 
import jsonData from 'helpers/data.json';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BrushChart() { 

    const chartRef = useRef(null);
    const chart2Ref = useRef(null);

    const [xAxisClick, setXAxisClick] = useState(0)
    const [xAxisInput, setXAxisInput] = useState('')
    const [open, setOpen] = React.useState(false);
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
                },
                
                events: {
                    click: function(event, chartContext, config) { 
                        handleOpenModal()
                        // gets the position of the marker in the series
                        const dp = config.dataPointIndex
                        // use the series position of the clicked marker to find the corresponding x axis data at that point in the series
                        let date = chartContext.data.twoDSeriesX[dp]
                        setXAxisClick(date) 
                    }
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
                    xaxis: {max: 1662998400000, min: 1659283200000}
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
               
            },
            
        }
    })

    const handleOpenModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAnnotationInput = (event) => {  
        setXAxisInput(event.target.value)
    }

    const createXAxisAnnotation = () => {
        if(xAxisInput.trim() === '') {
            alert("Please input your Annotation.")
            return
        }
        const options = {
            x: xAxisClick,
            strokeDashArray: 0,
            label: {
                borderColor: '#775DD0',
                offsetY: 0,
                style: {
                color: '#fff',
                background: '#775DD0',
                },
                text: xAxisInput,
            },
        }
        const chart = chartRef.current.chart; 
        chart.addXaxisAnnotation(options);
        chart2Ref.current.chart.addXaxisAnnotation(options)
        setXAxisInput('')
        handleClose()
    } 

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
            newChartData.series[0].data = [...newData]

            const newChartData2 = {...chartData2} 
            newChartData2.series[0].data = [...newData]
    
            setChartData1({
                ...newChartData
            })
            
            setChartData2({
                ...newChartData2
            })  
    }, [])

    
    return (
        <div id="chart"> 
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        X axis annotation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        What annotation would you like to add?
                    </Typography>
                    <TextField id="outlined-basic" label="Annotation" variant="outlined" onChange={handleAnnotationInput} style={{marginTop:10}} />
                    <br/><br/>
                    <Button variant="outlined" onClick={createXAxisAnnotation}>ADD</Button>
                </Box>
            </Modal>

            {
                chartData1.series[0].data.length !== 0?
                    <Chart options={chartData1.options} series={chartData1.series} type="line" height={310} 
                    ref={chartRef}/>
                :
                null
            }
            {
                chartData2.series[0].data.length !== 0?
                <Chart options={chartData2.options} series={chartData2.series} type="line" height={310} 
                ref={chart2Ref}/>
                :
                null
            }
        </div>
    );
}