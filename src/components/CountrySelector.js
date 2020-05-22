import React, { useState, useEffect } from 'react';
import { getCountries } from '../api/api';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles({
  inputSelector: {
    backgroundColor: '#fbfcfc',
    minWidth: '260px',
  }
})

function CountrySelector(props) {
  const [state, setState] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getCountryList = async () => {
      setState( await getCountries())
    }
    getCountryList();
  }, []);

  const countrySelector = () => {
    if (state) {
      return state.map(country => {
        return <option key={country.name}>{country.name}</option>
      })
    }
  }

  const handleChange = (evt) => {
    props.setCountry(evt.target.value);
  }
  
  return (
    <FormControl className={classes.inputSelector}>
      <InputLabel htmlFor="country-native-helper">Country</InputLabel>
      <NativeSelect

        onChange={handleChange}
        inputProps={{
          name: 'country',
          id: 'country-native-helper',
        }}      
      >
        <option>Global</option>
        {countrySelector()}
      </NativeSelect>
    </FormControl>
  )
}

export default CountrySelector;
