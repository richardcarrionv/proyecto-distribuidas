import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";

import "./maps.css";
import { useEffect, useState } from "react";

const { REACT_APP_MAPS_API_KEY } = process.env;

export default function Maps({ zoom, center,  onMarkerCoordsChange, children }) {


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_MAPS_API_KEY,
  });

  useEffect( () => {
  }, [center])

  const handleMapClick = (t) => {
    const { latLng } = t;
    const lat = latLng.lat();
    const lng = latLng.lng();
    onMarkerCoordsChange({ lat: lat, lng: lng, })();
  };
 
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Box className="container">
        <GoogleMap
          zoom={zoom}
          center={center}
          onClick={handleMapClick}
          mapContainerClassName="map-container"
        >
          {children}
        </GoogleMap>
      </Box>
    </>
  );
}
