import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { NativeSelect, FormControl} from '@material-ui/core';

const getCountries = async () => {
  try {
    const {data: { countries }} = await Axios.get("https://covid19.mathdro.id/api/countries");

    return countries.map((country) => country.name);
  } catch(err){
    console.log(err)
  }
 
}

function CountrySelector(props) {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const { handleCountryChange } = props;
  useEffect(() => {
    const fetchCountries = async () => {
      setFetchedCountries(await getCountries());
    }

    fetchCountries()
  }, [setFetchedCountries])

  return (
    <FormControl>
      <NativeSelect defaultValue="" onChange={(e)=> handleCountryChange(e.target.value)}>
        <option value="WorldWide">WorldWide</option>
        {fetchedCountries.map((country, i) => <option value={country} key={i}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountrySelector;
