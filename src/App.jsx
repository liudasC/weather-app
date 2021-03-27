import React, { Component } from "react";
import './App.css';
import Weather from "./components/Weather"
import { getDailyWeatherByCityCountry } from "./api"

class App extends Component {
  state = {
    dailyWeather: [],
    city: 'Kaunas',
    country: 'Lithuania',
  }




  componentDidMount() {
    getDailyWeatherByCityCountry(
      {
        city: this.state.city,
        country: this.state.country,
      },
      dailyWeather => this.setState({ dailyWeather }),
      error => console.error(error))
  }

  render() {
    const dayWeather = this.state.dailyWeather.map(dayWeath =>
      <Weather
        data={dayWeath}
        key={dayWeath.sunrise}
      />
    )


  // console.log(this.state.dailyWeather);
  // console.log(this.dayWeather());
return (
  <div className="App">
    <h1>Orų prognozės Kaune</h1>
    <div className="container">{dayWeather}</div>


  </div>
);
  }
}
export default App;
