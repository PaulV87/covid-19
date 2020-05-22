import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

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
