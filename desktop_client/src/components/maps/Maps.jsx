import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import Geocode from "react-geocode";

import "./maps.css";
import { useState } from "react";

const { REACT_APP_MAPS_API_KEY } = process.env;

Geocode.setApiKey(REACT_APP_MAPS_API_KEY);

export default function Maps() {
  const quitoCoordinates = {
    lat: -0.1824739406812052,
    lng: -78.46213540619937,
  }

  const [zoom, setZoom] = useState(8);
  const [center, setCenter] = useState(quitoCoordinates); 
  const [address, setAddress] = useState("Quito, Pichincha, Ecuador");
  const [marker, setMarker] = useState(quitoCoordinates);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_MAPS_API_KEY,
  });

  const handleSearch = () => {
    console.log(process.env);
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setMarker({ lat: lat, lng: lng, });
        setCenter({ lat: lat, lng: lng, });
        setZoom(15);
      },
      (error) => {}
    );
  };

  const handleMapClick = (t) => {
    console.log(t)
    const { latLng } = t;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarker({
      lat: lat,
      lng: lng,
    });
  };

  const handleClean = () => {
    setZoom(8);
    setCenter(quitoCoordinates);
    setAddress(""); 
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Box>
        <TextField
          sx={{ width: "50%" }}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          id="standard-basic"
          variant="standard"
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
        <Button variant="contained" color="info" onClick={handleClean}>
          Limpiar
        </Button>
        {}
      </Box>
      <GoogleMap
        zoom={zoom}
        center={center}
        onClick={handleMapClick}
        mapContainerClassName="map-container"
      >
        <Marker position={marker} />
      </GoogleMap>
    </>
  );
}
