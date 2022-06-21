import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import Geocode from "react-geocode";

import "./maps.css";
import { useEffect, useState } from "react";

const { REACT_APP_MAPS_API_KEY } = process.env;

Geocode.setApiKey(REACT_APP_MAPS_API_KEY);

export default function Maps({ address, onClose, onSave, onAddressChange }) {
  const quitoCoordinates = {
    lat: -0.1824739406812052,
    lng: -78.46213540619937,
  };

  const [zoom, setZoom] = useState(8);
  const [center, setCenter] = useState(quitoCoordinates);
  const [marker, setMarker] = useState(quitoCoordinates);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_MAPS_API_KEY,
  });

  const search = () => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setMarker({ lat: lat, lng: lng });
        setCenter({ lat: lat, lng: lng });
        setZoom(16);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => { 
    search(); 
  }, [])

  const handleSearch = () => {
    search(); 
  };

  const handleMapClick = (t) => {
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
    onAddressChange("")();
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Box className="container">
        <Box className="map-form">
          <TextField
            className="search-input"
            value={address}
            onChange={(event) => onAddressChange(event.target.value)}
            placeholder="Direccion, Ciudad, Provicia, Pais"
            id="standard-basic"
            variant="standard"
          />

          <Box className="map-form-buttons">
            <Button variant="contained" onClick={handleSearch}>
              Buscar
            </Button>
            <Button variant="contained" color="info" onClick={handleClean}>
              Limpiar
            </Button>
            <Button variant="contained" color="error" onClick={onClose}>
              salir
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={onSave(marker)}
            >
              Guardar
            </Button>
          </Box>
        </Box>
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
