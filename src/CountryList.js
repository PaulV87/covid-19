import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import Axios from 'axios;'

const styles = {

}

function CountryList({ CountryList, classes }) {

  useEffect(() => {
    console.log("country changed")
  }, [CountryList])

  const CountryData = async (evt) => {
    const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${state.country}`)
    setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value,
    })  
  }

  let getCountryData = (evt) => {
    console.log(evt.target.value);
    if (evt.target.value === "WorldWide")
    return getData();

    setState({country: evt.target.value})        
  }
  return (
    <select className="drop-down" onChange={getCountryData}>
      <option>WorldWide</option>
      {state.countries.map((country, i) => {
        return <option key={i}>{country.name}</option>
      })}
    </select>
  )
}

export default withStyles(styles)(CountryList);
