# Neighborhood React App for Udacity 
This app was created from scratch as the final project of Udacity's Front End Web Development Nanodegree Program. It is a location app for the hotels in Thessaloniki, Greece.
## Geting Started
These instructions will get you a copy of the project up and running on your local machine for reviewing and developmet purposes. 
## Functionality 
The app loads the map of Thessaloniki with preloaded and pinned the hotels of the town. The user has the ability to navigate through the map, click to markers and see the name and address of the hotel. On the left up corner there is a menu button which allows the user to display a search bar and search by hotel name. Every time a location from search results is clicked, the map is centered to this location and the InfoWindow opens. 
## Prerequisites
### Installing
- Run ```git clone 'repository_url'``` at GitBash or download zip folder of the project
- Install all project dependencies with ```npm install```
- Run ```npm start``` and the developer version of the project will run at ```localhost:3000```
### Build Mode
- Install all project dependencies with ```npm install```
- Build with ```npm build```
- Install ```npm install -g serve```
- Run ```serve -s build```
- The production version of the project will run at ```localhost:5000```

## Npm Packages used
- ```create-react-app``` see [documentation](https://github.com/facebook/create-react-app)
- ```google-maps-react``` see [documentation](https://github.com/fullstackreact/google-maps-react)
- ```escape-string-regexp``` see [documentation](https://www.npmjs.com/package/escape-string-regexp)
- ```react-debounce-input``` see [documentation](https://www.npmjs.com/package/react-debounce-input)

### API
[Google Maps Javascript API](https://developers.google.com/maps/documentation/) for Map and [Foursquare API](https://developer.foursquare.com/docs) for the locations.

### Acknowledgments
A big thank you to Udacity and Google for this 9 month journey of knowledge and all the support provided, including the amazing slack community with my fellow students who contributed with help, motivation and inspiration. 