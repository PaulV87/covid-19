import React, { useState, useEffect} from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { getChartData } from '../api/api';

const useStyles =  makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "75vw",
    margin: "auto",
  }
})

function Chart(props) {
  const [dailyData, setDailyData] = useState([]);
  const { country, data: { confirmed, deaths, recovered }} = props;
  const classes = useStyles();
  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await getChartData());
    }
  
    fetchApi();
  }, []);

  const lineChart = (
    dailyData.length
    ? (
    <Line 
      data={{
        labels: dailyData.map(( {date} ) => date),
        datasets: [{
          data: dailyData.map(( {confirmed} ) => confirmed),
          label: "Confirmed",
          borderColor: "#76ced7",
          fill: true,
        }, {
          data: dailyData.map(( {deaths} ) => deaths),
          label: "Deaths",
          borderColor: "#f67172",
          backgroundColor: "#fecbbf",
          fill: true,
        }]
      }}
    />
    ) 
    : null
  );

  const barChart = (
    confirmed 
    ? (
      <Bar 
        data={{
          labels: ['Confirmed', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: ["#ade4ea", "#9ecb87", "#fecbbf"],
            data: [confirmed, recovered,  deaths ]
          }]
        }}
        option={{
          legend: { display: false },
          title: {display: true, text:`Current State is ${country}`}
        }}
      />
    )
    : null  
  )
  return (
    <div className={classes.container}>
      {country === "Global" ? lineChart : barChart}
    </div>
  )
}



export default Chart;
