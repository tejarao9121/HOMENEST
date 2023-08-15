import React from 'react'
import './MapPrc.css'
import {GoogleMap,LoadScript} from '@react-google-maps/api'

    const apiKey='AIzaSyC_bYbyJo8vp-Dn2yVPP2p1DmS9US86_Ds';



    const MapPrc = () => {
      const mapStyles = {
        height: '400px',
        width: '100%'
      };
    
      const defaultCenter = {
        lat: 40.7128, 
        lng: -74.0060 
      };
    
      return (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={defaultCenter}
          />
        </LoadScript>
      );
    };
    
  export default MapPrc;