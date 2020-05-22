import Axios from 'axios';

const URL = "https://covid19.mathdro.id/api";
const confirmedURL = "/confirmed";
const deathsURL = "/deaths";
const countriesURL = "/countries";


// Pulls global data from the api
export const getUrl = async () => {
  try {
    const {data: {confirmed, recovered, deaths, lastUpdate}} = await Axios.get(URL);

  const global = {
    confirmed: confirmed.value,
    recovered: recovered.value,
    deaths: deaths.value,
    lastUpdate
  };
  
  return global; 
  } catch(err) {
    console.log(`Error retrieving global data: ${err}`);
  }; 
}

// Pulls individual country data from the api
export const getCountryData = async (country) => {
  const { data: {confirmed, recovered, deaths, lastUpdate} } = await Axios.get(`${URL}${countriesURL}/${country}`)

  const data = {
    confirmed: confirmed.value,
    recovered: recovered.value,
    deaths: deaths.value,
    lastUpdate
  }
  return data;
}

export const getConfirmed = async () => {
  const res = await Axios.get(`${URL}${confirmedURL}`);
  return res;
}

export const getDeaths = async () => {
  const res = await Axios.get(`${URL}${deathsURL}`);
  return res;
}

export const getCountries = async () => {
  const { data: { countries }} = await Axios.get(`${URL}${countriesURL}`);
  let countriesObject = Object.values(countries); 
  return countriesObject;
}

// Pulls the daily data used for the chart information from the api
export const getChartData = async () => {
  try {
    const { data } = await Axios.get("https://covid19.mathdro.id/api/daily");
  
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths : dailyData.deaths.total,
      date: dailyData.reportDate
    }))

    return modifiedData;
    
  } catch(err){
    console.log(err);
  }
}