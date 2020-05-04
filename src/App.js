import React from 'react';
import Axios from 'axios';
import { withStyles } from '@material-ui/styles';
import Box from './Box';
import "./style.css";

const styles = {
  informationContainer: {
    display: "flex",
    width: "100vw",
    height: "80px",
    overflow: "hidden",
    padding: "0.5em",
    backgroundColor: "#9423a8"
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
class App extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      confirmed: null,
      recovered: null,
      deaths: null,
      countries: [],
      country: null,
      boxes : [{}],
    }  
    this.getCountryData = this.getCountryData.bind(this);
    this.addBox = this.addBox.bind(this);
  }
  componentDidMount() {
    this.getData()
  }

  async getData() {
    try {   
      const resApi = await Axios.get('https://covid19.mathdro.id/api');
      const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
      //let countries = Object.keys(resCountries.data.countries);
      let countries = Object.values(resCountries.data.countries);    
      this.setState({
        confirmed: resApi.data.confirmed.value,
        recovered: resApi.data.recovered.value,
        deaths: resApi.data.deaths.value,
        countries,
        country: "WorldWide"
      });
    } catch(err) {
      if(err.response === 404) {
        this.setState({
          confirmed: 'No data available',
          recovered: 'No data available',
          deaths: 'No data available'
        })
      }
    }
  }

  async getCountryData(evt) {
    if (evt.target.value === "WorldWide"){
      return this.getData();
    }
    let country = evt.target.value;
    const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${country}`)
    this.setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value,
      country: country
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
      date: today
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
            <h1>Corona Update</h1>
            <div>
              <select className={classes.dropDown} onChange={this.getCountryData}>
                <option>WorldWide</option>
                {countryOptions}
              </select>
              <button onClick={this.addBox}>Add Box</button>   
            </div>
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
      </div>
    )
  }
}

export default withStyles(styles)(App);