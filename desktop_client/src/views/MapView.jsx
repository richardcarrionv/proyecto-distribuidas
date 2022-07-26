import {
  GoogleMap,
  useLoadScript,
  Marker,
  HeatmapLayer,
  Circle,
  MarkerClusterer,
  InfoWindow, GoogleMapsMarkerClusterer, GoogleMarkerClusterer,
} from "@react-google-maps/api";
import {Box} from "@mui/material";
import Geocode from "react-geocode";
import Dialog from "@mui/material/Dialog";
import {Button, DialogActions, DialogContent} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import {useEffect, useState} from "react";
import useApi from "../hooks/useApi";
import useDisplay from "../hooks/useDisplay";

const {REACT_APP_MAPS_API_KEY} = process.env;
Geocode.setApiKey(REACT_APP_MAPS_API_KEY);

export default function Maps() {
  const api = useApi('/branches')
  const [data, setData] = useState([])
  const display = useDisplay(false)
  const [center, setCenter] = useState({lat: -0.1824739406812052, lng: -78.46213540619937})
  const [branch, setBranch] = useState({})

  const mapStyle = {
    width: "100vw",
    height: "100vh",
  }
  const options = {
    averageCenter: true,
    label: 'white',
  }

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: REACT_APP_MAPS_API_KEY,
  });

  const onMarkerClick = (branch) => {
    setBranch(branch);
    setCenter({lat: parseFloat(branch.latitude), lng: parseFloat(branch.longitude)})
    display.show();
  }

  if (!isLoaded) return <div>Loading...</div>;

  const renderCluster = (value) => {
    if (value) {
      return (<GoogleMarkerClusterer options={options}>
        {(clusterer) =>
          api.data.map(b => (
            <Marker
              label={b.id}
              onClick={() => {
                onMarkerClick(b)
              }}
              position={{lat: parseFloat(b.latitude), lng: parseFloat(b.longitude)}} clusterer={clusterer}/>
          ))
        }
      </GoogleMarkerClusterer>)
    }
    return (<GoogleMarkerClusterer options={options}>
      {(clusterer) =>
        api.data.map(b => (
          <Marker
            label={b.id}
            onClick={() => {
              onMarkerClick(b)
            }}
            position={{lat: parseFloat(b.latitude), lng: parseFloat(b.longitude)}} clusterer={clusterer}/>
        ))
      }
    </GoogleMarkerClusterer>)
  }

  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <GoogleMap
        zoom={9}
        center={center}
        mapContainerStyle={mapStyle}
      >
        {renderCluster(Math.random() > 0.5 ? true : false)}
      </GoogleMap>
      <Dialog open={display.display} maxWidth="100%" sx={{height: "80%", width: "80%"}}>
        <DialogTitle sx={{backgroundColor: "whitesmoke", textAlign: "Center"}}>
          Id: {branch.id}, {branch.name}
        </DialogTitle>
        <DialogContent sx={{display: "flex", flexDirection: "column"}} dividers>
          <p>Provincia: {branch.province}</p>
          <p>Ciudad: {branch.city}</p>
          <p>Direccion: {branch.address}</p>
          <p>Telefono: {branch.phone}</p>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={display.hide}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}