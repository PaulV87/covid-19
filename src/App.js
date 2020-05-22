import React, { Component } from 'react';
import Header from './components/Header';
import CountrySelector from './components/CountrySelector';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import "./style.css";
import sizes from './styles/sizes';
import { getUrl, getCountryData } from './api/api';
import Chart from './charts/Chart';

const AppContainer = styled(Container)({  
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight:"100vh",
});

export default class App extends Component {
  state = { data : 
    { confirmed: 0,
      recovered: 0,
      deaths: 0,   
      lastUpdate: undefined
    },
    country: "Global",
  };

  componentDidMount(){
    this.getGlobalData()     
  }

  async getGlobalData() {
    const data = await getUrl();
    this.setState({ 
      data,
      country: "Global"
    });
  }

  async setCountryData(country) {
    const data = await getCountryData(country);
    this.setState({
      data,
      country: country
    })
  }

  setCountry = (country) => {
    country === "Global" ?  this.getGlobalData() : this.setCountryData(country);    
  }
  
  render() {
    const { data } = this.state;
    return (
      <AppContainer maxWidth="md">
        <Header 
          globalData={data} />
        <CountrySelector 
          setCountry={this.setCountry}/> 
        <Chart {...this.state} />
      </AppContainer>
    )
  }
}
