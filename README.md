# TravelMate - Coding Challenge for Match.com

TravelMate is an application for people who are seeking for any events, activities, restaurants, bars, and etc. that are around a certain area.

This application was created with:

- ReactJS
- <a href="https://developer.foursquare.com">Foursquare API</a> - for local destinations
- <a href="https://www.apixu.com/api.aspx">APIXU API</a> - for weather forecast

## Getting Started

Once you have cloned the application, you will have to run:

```
yarn
```

OR

```
npm install
```

to install the requirements to run the application.

Once that is completed, you will have to run:

```
yarn start
```

OR

```
npm start
```

to run the application.

## Application Rundown

Landing Page:

- User must input a valid address.
- If the user does not want to put in a specific area, the user is able to click the current location icon on the right of the input box to find local things to do.
- Then the user must select at least one of the categories to search for.

Listing Page:

- The listing page will display all the local activities filtered by the category the user has chosen.
- User is able to make best judgment of what activity is best, by checking the current weather that is displayed on the top right-hand corner of the screen.
- User can click on "G" icon link for Google, to search the activity's name.
- User can click on the Map icon link for Google Map, to search where the exact location is on google maps.

## Future Implications

Some ways I would like to expand on the application in the future:

- The API did not provide any images for the locations that are reliable. I would like to implement another API that would provide me with good snapshots of the locations to provide the user with more of an idea to what the location is like.
- Implement Google Maps API to give the user the ability to see the nearby locations directly from the application; rather than being re-routed to google maps website.
- Give the application a dating twist. This could be a very practical tool for couple's that have a hard time deciding on what to do on a certain day, or if they are on a trip, they could use this tool to find something to do on some spare time.

## Requirements

The package.json file contains a list of all the dependencies required to run this application.

### Third-Party Libraries Honorable Mentions

- React-Geocode

## Author(s)

- Jinyeob Kim <a href="https://github.com/JinCodingKim">JinCodingKim</a>
