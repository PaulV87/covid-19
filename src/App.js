import React from 'react';
import Axios from 'axios';
import './style.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.getCountryData = this.getCountryData.bind(this);
  }
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    countries: []
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
        countries
      });
    } catch(err) {
      if(err.response.staus === 404) {
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
    const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${evt.target.value}`)
    this.setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value,
    })
  }

  renderCountryOptions(){
    return this.state.countries.map((country, i)=> {
    return <option key={i}>{country.name}</option>
    })
  }
  render() {
    return(
      <div className="container">
        <h1>Corona Update</h1>
        <select className="drop-down" onChange={this.getCountryData}>
          <option>WorldWide</option>
          {this.renderCountryOptions()}
        </select>
        <div className="flex">
          <div className="box confirmed">
            <h3>Confirmed</h3>
            <h4>{this.state.confirmed}</h4>
            </div>  
          <div className="box recovered">
            <h3>Revovered</h3>
            <h4>{this.state.recovered}</h4>        
          </div>
          <div className="box deaths">
            <h3>Deaths</h3>
            <h4>{this.state.deaths}</h4>        
          </div>
        </div>
      </div>
    )
  }
}

export default App;