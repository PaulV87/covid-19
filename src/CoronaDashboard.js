import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { withStyles } from '@material-ui/styles';
import sizes from './sizes';

const styles = {
  container: {
    backgroundColor: "blue",
    [sizes.down("lg")]:{
      backgroundColor: "red",
    },
    [sizes.down("md")]: {
      backgroundColor: "purple",
    },
    [sizes.down("xs")]: {
      backgroundColor: "green",
    }
  },  
};

function CoronaDashboard(props) {
  const { classes } = props;
  const [state, setState] = useState({
    confirmed: null,
    recovered: null,
    deaths: null,
    countries: []
  });

  useEffect(() => {    
    getData();
  }, [state]); 

  const getData = async () => {
    try {   
      const resApi = await Axios.get('https://covid19.mathdro.id/api');
      const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
      let countries = Object.values(resCountries.data.countries);    
      setState({
        confirmed: resApi.data.confirmed.value,
        recovered: resApi.data.recovered.value,
        deaths: resApi.data.deaths.value,
        countries,
        country: "WorldWide"
      });
    } catch(err) {
      if(err.response.status === 404) {
        setState({
          confirmed: 'No data available',
          recovered: 'No data available',
          deaths: 'No data available'
        })
      }
  }}

  return (
    <div className={classes.container}>
        <h1>Corona Update</h1>
        <CountryList CountryList={state.countries} />
        
        <div className="flex">
          <div className="box confirmed">
            <h3>Confirmed</h3>
            <h4>{state.confirmed}</h4>
            </div>  
          <div className="box recovered">
            <h3>Revovered</h3>
            <h4>{state.recovered}</h4>        
          </div>
          <div className="box deaths">
            <h3>Deaths</h3>
            <h4>{state.deaths}</h4>        
          </div>
        </div>
      </div>
  )
}

export default withStyles(styles)(CoronaDashboard);