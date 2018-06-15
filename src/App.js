import React, { Component } from "react";
import Landing from "./components/Landing/Landing";
import LocalPlace from "./components/LocalPlace/LocalPlace";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";

export default class App extends Component {
  state = {
    landingPage: true,
    list: [],
    weatherArea: ""
  };

  handlePage = () => {
    // Handle the page switch
    this.setState({
      landingPage: !this.state.landingPage
    });
  };

  handleList = (list, weatherArea) => {
    // Handle the list, weather area, and toggle the page switch
    this.setState({
      landingPage: !this.state.landingPage,
      list,
      weatherArea
    });
  };

  render() {
    const { list, landingPage } = this.state;
    /* Map through the list of venues pulled from the api, and map through it...
        if the address exists and, the last index of the formattedaddress
        array country is "United States"... replace it with "USA" instead. */
    let localsList = list.map((local, i) => {
      let withinUSA = local.location;
      if (
        withinUSA.address &&
        withinUSA.formattedAddress[withinUSA.formattedAddress.length - 1] ===
          "United States"
      )
        withinUSA.formattedAddress[withinUSA.formattedAddress.length - 1] =
          "USA";
      return <LocalPlace key={local.id} local={local} i={i} />;
    });
    return (
      <div className="app">
        {landingPage ? (
          <Landing handleList={this.handleList} />
        ) : (
          <section className="locals-container">
            <Navigation
              handlePage={this.handlePage}
              weatherArea={this.state.weatherArea}
            />
            <div className="list-container">{localsList}</div>
          </section>
        )}
      </div>
    );
  }
}
