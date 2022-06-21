import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import Geocode from "react-geocode";

import "./maps.css";
import { useEffect, useState } from "react";

const { REACT_APP_MAPS_API_KEY } = process.env;
Geocode.setApiKey(REACT_APP_MAPS_API_KEY);

export default function Maps({ zoom, center,  onSave }) {

  const [marker, setMarker] = useState(center);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_MAPS_API_KEY,
  });

  const handleMapClick = (t) => {
    const { latLng } = t;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarker({ lat: lat, lng: lng, });
    onSave(marker)(); 
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
          <Marker position={marker} />
        </GoogleMap>
      </Box>
    </>
  );
}
