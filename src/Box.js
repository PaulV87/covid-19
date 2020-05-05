import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  Box: {
    background: props => `conic-gradient(#83d3e2 ${(props.recovered/props.confirmed) *100}%, #ff8975 0 ${((props.recovered/props.confirmed) * 100) + (props.deaths/props.confirmed) * 100}%, #bdbdbd 0)`,
    width: "100vw",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  }
}
function Box(props) {
  const { classes, country, deaths, confirmed, recovered, flag } = props
  const recoveryRate = Math.round((recovered/confirmed) * 1000) / 10;
  const mortalityRate = Math.round((deaths/confirmed) * 1000) / 10;

  
  return (
    <div className={classes.Box}>
      {flag ? <img src={`https://www.countryflags.io/${flag}/flat/64.png`} alt={country} /> : ""}
      <h3>{country}</h3>
      <div>Infected:{confirmed}</div>
      <div>Recovered:{recovered}</div>
      <div>Deaths:{deaths}</div>
      <div>Recovery rate: {recoveryRate}%</div>
      <div>Mortality rate: {mortalityRate}%</div>
      
    </div>
  )
}

export default withStyles(styles)(Box);
