import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import ListView from './ListView.js'
import Header from './Header.js'
import Footer from './Footer.js'
import escapeRegExp from 'escape-string-regexp';

/*global google*/  
class App extends Component {
  state= {
    locations: [],
    defaultlocations: [],
    defaultMapCenter : {lat:40.640063,lng: 22.944419},
    newCenter:{lat:40.640063,lng: 22.944419},
    showingInfoWindow: false,
    selectedPlace: {}, 
    error: false,
    errorFetch:'',
    markerIcon: {},
    defaultIcon:{},
    //new active marker
    clickedMarker: {},
    zoom: 14,
    //manage search
    query:'',
    searchedlocations:[],
    //manage focus when menu is closed
    menuHidden: true
    } 

  componentDidMount() {
    this.fetchPlaces();    
  }
  //fetching locations from foursquare API
  fetchPlaces = () => {
    fetch(
      `https://api.foursquare.com/v2/venues/search?ll=40.640063,22.944419&intent=browse&radius=10000&query=hotel
       &client_id=QCFBXZGK2QRK05MBIGNVL3CX2AQE03LF5U1IZI3XOPX5FALK&client_secret=YO3V23EIZ5ZXTOR2ZQWIOBLH1IOYDW1VZG0AJ5ELQWJWM55C&v=20180728`
    )
      .then(response => {
      	//API error handling source https://googlechrome.github.io/samples/fetch-api/fetch-success-error-handlers.html
      	if (response.ok){
      		return response;
      	}
      	throw Error(response.statusText);
      })
      .then(response=>{
      	return response.json()
      })
      .then(data => {
        this.setState({
          defaultlocations: data.response.venues,
          locations: data.response.venues
        });
      })
      .catch((e)=> {
       alert('Something went wrong.Foursquare API is not responding.') 
      });
  };

  componentWillMount() {
    let icon = {
        url: 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png'
    }
    this.setState({
      markerIcon: icon,
      defaultIcon: icon
    })  
  }
  //opens infowindow when a marker is clicked
  onMarkerClick=(latlng, marker, event)=>{
  //console.log(this.state.newCenter)
  this.setState({
    selectedPlace: latlng,
    clickedMarker: marker,
    showingInfoWindow: true,
    newCenter: marker,
    zoom: 16
    });
  this.changeIcon()
  console.log(this.state.selectedPlace.id)
  }
  //changes marker icon when clicked
  changeIcon=()=>{
  let icon={
          url:'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png',
          anchor: new google.maps.Point(32,32),
          scaledSize: new google.maps.Size(64,64)}
    this.setState({
    markerIcon: icon
    })
  }
  //reset icon, map and close infowindow when infowindow close button is clicked 
  resetIcon=()=>{
  	this.setState({
  		markerIcon: this.state.defaultIcon,
  		newCenter: this.state.defaultMapCenter,
  		showingInfoWindow: false,
  		zoom: 14
  	})
  }
  // HandleTextSearch Changed to change locations array state value 
  // and resets the locations if there is no query
  HandleTextSearch = (event, query, locationsArr) => {
	if(query){
	      this.setState({
	      locations : locationsArr
	    })
	    }
		else{
	      	this.setState({
	        locations: this.state.defaultlocations
	      })
	    }
    }
    //manage instant search results on user input 
    updateQuery = (query) => {
    this.setState({ query: query});
    console.log(this.state.query)
    if (query){
  
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      //filter defaultlocations array and not locations because we want every query 
      //to be searched for all locations and not for the already filtered
      let searchedlocations= this.state.defaultlocations.filter((location)=> 
      match.test(location.name));
      
	      if(query!==''){
	      	this.setState({
	      		searchedlocations: searchedlocations
	      		})
	      	console.log(this.state.searchedlocations)
	      }else{
	      	this.setState({
	      		searchedlocations: this.state.locations
	      	})
	      }


	    }
	else{
	      this.setState({
	      		searchedlocations: this.state.locations
	      	})
	    }
    }	
  //manage click on locations list and opens the corresponding infowindow 
  onItemClicked=(a)=>{
  this.onMarkerClick(a,{lat:a.location.lat,lng:a.location.lng})
  this.changeIcon()
  }
  //manage tabIndex
  changeMenuHidden=()=>{
  	this.setState({
  		menuHidden: !this.state.menuHidden
  	})
  	//console.log(this.state.menuHidden)
  }

  render(){
  	
    return (
      <div className="App">
        <Header changeMenuHidden = {this.changeMenuHidden}/>      
        <Map locations={this.state.locations}
             onMarkerClick = {this.onMarkerClick}
             visible={this.state.showingInfoWindow}
             selectedPlace={this.state.selectedPlace}
             markerIcon = {this.state.markerIcon}
             defaultIcon = {this.state.defaultIcon}
             changeIcon = {this.changeIcon}
             resetIcon = {this.resetIcon}
             clickedMarker= {this.state.clickedMarker}
             defaultMapCenter = {this.state.defaultMapCenter}
             newCenter = {this.state.newCenter}
             zoom = {this.state.zoom}
             role="application"
             />
        <ListView 
             defaultlocations={this.state.defaultlocations}
             locations={this.state.locations}
             visible={this.state.showingInfoWindow}
             selectedPlace={this.state.selectedPlace}
             HandleTextSearch = {this.HandleTextSearch} 
             onItemClicked = {this.onItemClicked}
             //for search
             query={this.state.query}
             searchedlocations= {this.state.searchedlocations}
             updateQuery = {this.updateQuery}
             //for tabIndex
             menuHidden = {this.state.menuHidden}         
            />
        <Footer/>
      </div>
    )
  }
}

export default App;


