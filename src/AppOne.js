import React from 'react';
import Axios from 'axios';
import { withStyles } from '@material-ui/styles';
import Box from './Box';
import Chart from './Charts/Chart';
//  import CountrySelector from './CountrySelector';
import { NativeSelect, FormControl} from '@material-ui/core';
// CSS reset
import "./style.css";

const styles = {
  coronaApp :{
    background: "linear-gradient(135deg, rgba(179, 229, 252, 1) 0%, rgba(179, 229, 252, 1) 50%, rgba(240, 98, 146, 1) 50%, rgba(240, 98, 146, 1) 100%)",
  },
  informationContainer: {
    display: "flex",
    width: "100vw",
    height: "100px",
    padding: "0.5em",
    backgroundColor: "#b5bbbf",
  },
  dropDownSide: {
    display: "flex",
    alignItems: "center",
    width: "350px",
    flexDirection: "column",
    height: "100%",
  },
  dropDown: {
    width: "220px",
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    width: "200px",
    fontSize: "1em",
    textAlign: "center",
    justifyContent: "center",
    height: "100%",
  }
}
class AppOne extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      confirmed: null,
      recovered: null,
      deaths: null,
      countries: [],
      country: null,
      flag: null,
      boxes: []
    }  
    this.getCountryData = this.getCountryData.bind(this);
    this.addBox = this.addBox.bind(this);
  }
  componentDidMount() {
    this.getData();
    this.getCountryList();
  }

  handleCountryChange = async (country) => {
    // const fetchData = await this.getCountryData(country);
  }

  async getData() {
    try {   
      const res = await Axios.get('https://covid19.mathdro.id/api');
      this.setState({
        confirmed: res.data.confirmed.value,
        recovered: res.data.recovered.value,
        deaths: res.data.deaths.value,
        country: "WorldWide",
        updated: res.data.lastUpdate
      });
    } catch(err) {
      console.log(err)
    }
  }

  async getCountryList() {
    try{
      const res = await Axios.get("https://covid19.mathdro.id/api/countries");
      let countries = Object.values(res.data.countries);      
      this.setState({
        countries
      })
    } catch(err) {
      throw err;
    }
  } 

  async getCountryData(evt) {
    if (evt.target.value === "WorldWide"){
      return this.getData();
    }
    let country = evt.target.value;
          
    const countryFlag = this.state.countries.find(name => name.name === country) 
    const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${country}`)
    this.setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value,
      country: country,
      flag: countryFlag.iso2
    })
  } 

  addBox(){
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const newBox = {
      confirmed: this.state.confirmed,
      recovered: this.state.recovered,
      deaths: this.state.deaths,
      country: this.state.country,
      date: today,
      flag: this.state.flag
    }
    this.setState(state => ({
      boxes: [...state.boxes, newBox]
    }))
  }
  render() {
    const { classes } = this.props;
    const countryOptions =  this.state.countries.map((country, i)=> {
      return  <option key={i}>{country.name}</option>
      })

    return(
      <div className={classes.CoronaApp}>
        <div className={classes.informationContainer}>
          <div className={classes.dropDownSide}>
            <h1>Corona Update: {this.state.lastUpdate}</h1>
            <FormControl>
              <NativeSelect className={classes.dropDown} onChange={this.getCountryData}>
                <option>WorldWide</option>
                {countryOptions}
              </NativeSelect>
              <button onClick={this.addBox}>Add Box</button>   
            </FormControl>
          </div>
          <div className={classes.boxContainer}>     
            <div className={classes.box}>
              <h3>Confirmed</h3>
              <h4>{this.state.confirmed}</h4>
              </div>  
            <div className={classes.box}>
              <h3>Revovered</h3>
              <h4>{this.state.recovered}</h4>        
            </div>
            <div className={classes.box}>
              <h3>Deaths</h3>
              <h4>{this.state.deaths}</h4>        
            </div>
          </div>
        </div>
        <Box {...this.state}/> 
        <Chart {...this.state} />
        {this.state.boxes && this.state.boxes.map(box => (
          <Box 
            confirmed={box.confirmed}
            recovered={box.recovered}
            deaths={box.deaths} 
            country={box.country}
            date={box.today}
            flag={box.flag}
          />
        ))}       
      </div>
    )
  }
}

export default withStyles(styles)(AppOne);