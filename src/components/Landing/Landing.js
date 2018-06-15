import React, { Component } from "react";
import axios from "axios";
import "./Landing.css";

export default class Landing extends Component {
  state = {
    address: "",
    location: false,
    lat: 0,
    lng: 0,
    list: [],
    buttons: [
      {
        id: "4d4b7104d754a06370d81259",
        name: "Entertainment",
        active: false
      },
      { id: "4d4b7105d754a06372d81259", name: "Universities", active: false },
      { id: "4d4b7105d754a06373d81259", name: "Events", active: false },
      { id: "4d4b7105d754a06374d81259", name: "Restaurants", active: false },
      { id: "4d4b7105d754a06376d81259", name: "Nightlife", active: false },
      {
        id: "4d4b7105d754a06377d81259",
        name: "Recreation",
        active: false
      },
      { id: "4bf58dd8d48988d1fa931735", name: "Hotels", active: false },
      {
        id: "4d4b7105d754a06378d81259",
        name: "Shops",
        active: false
      },
      {
        id: "4bf58dd8d48988d1ed931735",
        name: "Travel",
        active: false
      }
    ],
    validButtons: false,
    validLocation: false
  };

  handleChange = event => {
    /* Handles the address input field...
        first, it'll check to see if the value is empty, if it is...
        it is not a valid location, else...  
    
            if the value is "Current Location" we will fire geoLocator method,
            otherwise we set everything to default state 
            and set address to the target value  */
    event.preventDefault();
    const { value } = event.target;
    if (!value) {
      this.setState({
        address: value,
        validLocation: false
      });
    } else {
      if (value !== "Current Location") {
        this.setState({
          address: value,
          location: false,
          lat: 0,
          lng: 0,
          validLocation: true
        });
      } else {
        this.geoLocator();
      }
    }
  };

  geoLocator = () => {
    /* Finds current location latitude and longitude */
    const geo = navigator.geolocation;
    if (geo) {
      geo.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          location: !this.state.location,
          address: "Current Location",
          validLocation: true
        });
      });
    } else {
      alert("Sorry your browser does not support this functionality");
    }
  };

  handleGeo = event => {
    /* Handles the geolocation button, if the location is false,
            we will hit the geoLocator method, otherwise, we will reset the state
            regarding the user location */
    event.preventDefault();
    if (!this.state.location) {
      this.geoLocator();
    } else {
      this.setState({
        address: "",
        location: false,
        lat: 0,
        lng: 0,
        validLocation: false
      });
    }
  };

  handleButton = event => {
    /* Handles the filtering of categories 
          the user will search for within the area */
    event.preventDefault();
    let changedButtons = this.state.buttons.map(button => {
      if (button.id === event.target.value) {
        button.active = !button.active;
      }
      return button;
    });
    this.setState(
      {
        buttons: changedButtons
      },
      () => {
        /* Then we are going to check to see if there are any active
           buttons to see if the form is valid to submit */
        let index = changedButtons.findIndex(e => e.active === true);
        if (index === -1) {
          this.setState({
            validButtons: false
          });
        } else {
          this.setState({
            validButtons: true
          });
        }
      }
    );
  };

  handleSubmit = event => {
    /* Handles the submit button...
           checks to see if location flag is triggered 
           (to get their current location area),
           then checks to see which categories the user wants,
           and then grabs the appropriate data from the api,
           and pass the information to App.js through App.js handleList method */
    event.preventDefault();
    const { location, lat, lng, address, buttons } = this.state;
    const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
    // For every iteration of the state.buttons, add that id string onto the categories string
    let categories = [];
    let buttonCopy = buttons.slice();
    buttonCopy.forEach(button => {
      if (button.active) {
        return categories.push(button.id);
      }
    });
    // If location is true, make it query of latitude and longitude, otherwise make it query of address
    let geoOrAddForHttp = location ? `ll=${lat},${lng}` : `near=${address}`;

    // Sending latitude, longitude or address to app.js for weather api
    let geoOrAddForWeather = location ? `${lat},${lng}` : address;

    /* If the api can not get data, shoot an alert to inform the user that it was
    not a valid address */
    axios
      .get(
        `https://api.foursquare.com/v2/venues/search?${geoOrAddForHttp}&limit=50&categoryId=${categories.join(
          ","
        )}&client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&v=20180613`
      )
      .then(res =>
        this.props.handleList(res.data.response.venues, geoOrAddForWeather)
      )
      .catch(() =>
        alert(
          `Sorry that was not a valid address. Please try a different address.`
        )
      );
  };

  render() {
    const {
      buttons,
      address,
      location,
      validButtons,
      validLocation
    } = this.state;

    /* This will create a conditional class depending on the state.location */
    let locationSwitch = ["location-button"];
    if (location) {
      locationSwitch.push("location-on");
    }

    /* Mapping through the buttons to display for user to filter through,
           by putting the buttonSwitch within the scope of each iteration,
           it will only effect that element to trigger the conditional class */
    let buttonsList = buttons.map(button => {
      let buttonSwitch = ["category-button"];
      if (button.active) {
        buttonSwitch.push("active");
      }
      return (
        <button
          className={buttonSwitch.join(" ")}
          key={button.id}
          value={button.id}
          onClick={this.handleButton}
        >
          {button.name}
        </button>
      );
    });

    return (
      <div className="landing">
        <div className="landing-header">
          <h1>
            Travel<span>Mate</span>
          </h1>
          <h4>See what's within the area</h4>
        </div>
        <form className="landing-body" onSubmit={this.handleSubmit}>
          <label className="input-container">
            Address
            <div className="location-wrapper">
              <input
                className={!validLocation ? "error" : "valid"}
                placeholder="Dallas, TX"
                name="address"
                type="text"
                value={address}
                onChange={this.handleChange}
              />
              <svg
                className={locationSwitch.join(" ")}
                name="location"
                onClick={this.handleGeo}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="000"
                  d="M12 1c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zM13 20.9v-2.9c0-0.6-0.4-1-1-1s-1 0.4-1 1v2.9c-4.2-0.5-7.5-3.8-7.9-7.9h2.9c0.6 0 1-0.4 1-1s-0.4-1-1-1h-2.9c0.4-4.2 3.7-7.5 7.9-7.9v2.9c0 0.6 0.4 1 1 1s1-0.4 1-1v-2.9c4.2 0.5 7.5 3.8 7.9 7.9h-2.9c-0.6 0-1 0.4-1 1s0.4 1 1 1h2.9c-0.4 4.2-3.7 7.5-7.9 7.9z"
                />
              </svg>
            </div>
          </label>

          <div className="category-container">{buttonsList}</div>
          <input
            disabled={!validButtons || !validLocation}
            id="submit-button"
            type="submit"
            value="submit"
          />
        </form>
      </div>
    );
  }
}
