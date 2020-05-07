import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/styles';

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "75vw",
    margin: "auto",
  }
}
const getChartData = async () => {
  try {
    const { data } = await Axios.get("https://covid19.mathdro.id/api/daily");
  
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths : dailyData.deaths.total,
      date: dailyData.reportDate
    }))

    return modifiedData;
    
  } catch(err){

  }
}

function Chart(props) {
  const [dailyData, setDailyData] = useState([]);
  const { classes, country, confirmed, deaths, recovered } = props;
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
          label: "Infected",
          borderColor: "#3333ff",
          fill: true,
        }, {
          data: dailyData.map(( {deaths} ) => deaths),
          label: "Deaths",
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.5)",
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
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: ["blue", "green", "red"],
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
      {country ==="WorldWide" ? lineChart : barChart}
    </div>
  )
}



export default withStyles(styles)(Chart);
