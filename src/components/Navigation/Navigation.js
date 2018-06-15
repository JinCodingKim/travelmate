import React, { Component } from "react";
import axios from "axios";
import weatherIcon from "../../img/cloud.png";
import backIcon from "../../img/back.png";
import "./Navigation.css";

export default class Navigation extends Component {
  state = {
    weatherInfo: []
  };

  componentDidMount() {
    /* When the component mounts, it will fire off this http request to the weather api 
        and grab the appropriate weather condition and temperature */
    axios
      .get(
        `http://api.apixu.com/v1/current.json?key=${
          process.env.REACT_APP_WEATHER_KEY
        }&q=${this.props.weatherArea}`
      )
      .then(area => this.setState({ weatherInfo: area.data.current }));
  }
  render() {
    const { weatherInfo } = this.state;
    /* weatherDisplay is a conditional to check to see if the weather api was able
    to retrieve the appropriation information...
    if it wasn't able just put the placeholder icon image */
    let weatherDisplay = weatherInfo.condition ? (
      <div className="weather">
        <p>{weatherInfo.temp_f}&#176;</p>
        <img src={weatherInfo.condition.icon} alt="weather" />
      </div>
    ) : (
      <img src={weatherIcon} alt="weather" />
    );
    return (
      <nav className="nav-bar">
        <img src={backIcon} alt="back" onClick={this.props.handlePage} />
        <h1>
          Travel<span>Mate</span>
        </h1>
        {weatherDisplay}
      </nav>
    );
  }
}
