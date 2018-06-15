import React, { Component } from "react";
import Geocode from "react-geocode";
import "./LocalPlace.css";
import placeholderImg from "../../img/placeholder.png";

export default class LocalPlace extends Component {
  state = {
    address: ""
  };
  componentDidMount() {
    /* When the component mounts and the local props address does not exist...
        fire the geocode function to convert the locations latitude and longitude
        to a formatted address, and store it in the store.address */
    const { address, lat, lng } = this.props.local.location;
    if (!address) {
      Geocode.fromLatLng(`${lat}`, `${lng}`).then(
        response => {
          this.setState({
            address: response.results[0].formatted_address
          });
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  render() {
    const { categories, name, location } = this.props.local;

    /* Conditional styling, depending on which order card it is, 
        and if there is an available icon */
    const cardStyle = {
      cardMain: {
        backgroundColor:
          this.props.i % 2 === 0
            ? "rgb(65, 105, 225, 0.5)"
            : "rgb(65, 105, 225, 0.4)"
      },
      cardImg: categories[0]
        ? {
            width: "48px",
            margin: "0 8px 4px 8px"
          }
        : {
            width: "30px",
            margin: "5px 20px 0 20px"
          }
    };

    /* Conditional image choice, depending on whether 
        there is an available icon from the api */
    const availableIcon = categories[0]
      ? `
  ${categories[0].icon.prefix}64${categories[0].icon.suffix}`
      : `${placeholderImg}`;

    /* Conditional to make sure a valid address will be put out onto the DOM */
    const availableAddress = location.address
      ? location.formattedAddress.join(", ")
      : this.state.address;

    /* This will be the google search link for the name of the location */
    const googleSearch = `http://google.com/search?q=${name
      .split(" ")
      .join("+")}`;

    /* This will be the google map search link for the address of the current location */
    const mapSearch = `https://www.google.com/maps/place/${availableAddress
      .split(" ")
      .join("+")}`;

    return (
      <div className="card" style={cardStyle.cardMain}>
        <div className="img-container">
          <img style={cardStyle.cardImg} src={availableIcon} alt="site" />
        </div>
        <div className="card-content">
          <div className="card-head">
            <h2>{name}</h2>
            <h3>{categories[0] && categories[0].name}</h3>
          </div>
          <p>{availableAddress}</p>
        </div>
        <div className="links-container">
          <a href={googleSearch}>
            <svg
              className="link-svg"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                className="svg-effects"
                d="M16 0c-8.838 0-16 7.162-16 16s7.162 16 16 16 16-7.163 16-16-7.163-16-16-16zM16.238 28c-6.631 0-12-5.369-12-12s5.369-12 12-12c3.238 0 5.95 1.181 8.037 3.138l-3.256 3.138c-0.894-0.856-2.45-1.85-4.781-1.85-4.1 0-7.438 3.394-7.438 7.575s3.344 7.575 7.438 7.575c4.75 0 6.531-3.413 6.806-5.175h-6.806v-4.113h11.331c0.1 0.6 0.188 1.2 0.188 1.988 0.006 6.856-4.588 11.725-11.519 11.725z"
              />
            </svg>
          </a>
          <a href={mapSearch}>
            <svg
              className="link-svg"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="28"
              viewBox="0 0 32 28"
            >
              <path
                className="svg-effects"
                d="M31.563 0.172c0.266 0.187 0.438 0.5 0.438 0.828v22c0 0.406-0.25 0.781-0.625 0.922l-10 4c-0.25 0.109-0.5 0.109-0.75 0l-9.625-3.844-9.625 3.844c-0.125 0.063-0.25 0.078-0.375 0.078-0.203 0-0.391-0.063-0.562-0.172-0.266-0.187-0.438-0.5-0.438-0.828v-22c0-0.406 0.25-0.781 0.625-0.922l10-4c0.25-0.109 0.5-0.109 0.75 0l9.625 3.844 9.625-3.844c0.313-0.125 0.656-0.094 0.938 0.094zM11.5 2.281v19.844l9 3.594v-19.844zM2 5.672v19.844l8.5-3.391v-19.844zM30 22.328v-19.844l-8.5 3.391v19.844z"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  }
}
