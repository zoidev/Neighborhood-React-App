import  React from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

/*global google*/
export class MapContainer extends React.Component {
  //error handling for google API
  componentDidMount(){
    window.gm_authFailure= ()=>{ 
        alert("We are sorry, Google API authentication failed. The map cannot load");
         document.querySelector(
          ".gm-err-container"
        ).innerHTML = `<div class="error"><p class="error-message">
         We are sorry, Google API authentication failed. The map cannot load<p></div>`;
    };
  }
  render() {
  return (

    <Map google={this.props.google} 
      initialCenter={this.props.defaultMapCenter}
      center = {this.props.visible?this.props.newCenter:this.props.defaultMapCenter}
      zoom={this.props.zoom}
      tabindex="0">

      { 
         this.props.locations.map((location)=>               
         <Marker
         key={location.id}
         onClick={(e)=>{
          this.props.onMarkerClick(location,{lat:location.location.lat, lng:location.location.lng},e)
         }
         }
         name ={location.name}
         address={location.location.address}
         position={{lat:location.location.lat, lng:location.location.lng}}
         icon = {location.id === this.props.selectedPlace.id ? this.props.markerIcon : this.props.defaultIcon}
         />)
      }           
      <InfoWindow id='infowindow'
        //using position prop to locate the infowindow and visible prop to display it
        //also using new google.maps.LatLng in order to pass latlng as numbers
        position={new google.maps.LatLng(this.props.clickedMarker.lat,this.props.clickedMarker.lng)}
        visible={this.props.visible}
        onClose={(e)=>{
          this.windowHasClosed
          this.props.resetIcon()}}>
          <div tabIndex={0} id='infowindow'>
            <h3>{this.props.selectedPlace.name}</h3>
            <p>{this.props.visible?this.props.selectedPlace.location.formattedAddress[0]:''}</p>  
          </div>
      </InfoWindow>          
    </Map>
    )
  }
} 

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAFTz7w66HksCpLdu4vB5K9lMZsAIXqTdM'
})(MapContainer)
