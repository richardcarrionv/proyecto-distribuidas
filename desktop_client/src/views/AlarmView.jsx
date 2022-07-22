import Maps from "../components/maps/Maps";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AlarmView = () => {
  const windowUrl = window.location.search;
  const initCoords = { lat: -0.1824739406812052, lng: -78.46213540619937 };
  const [params, setParams] = useSearchParams();
  const [branch, setBranch] = useState(); 
  const [mapZoom, setMapZoom] = useState(8);
  const [mapCenter, setMapCoords] = useState({ ...initCoords });


  useEffect(() => {
    window.api.receive("notification", (data) => { 

    })
    //setBranch(params.get("branch"))
    //const lat = parseFloat(params.get("lat"));
    //const lng = parseFloat(params.get("lng"));
    //const coords = { lat: lat, lng: lng };
    //console.log(coords)
    //setMapCoords(coords);
    //setMapZoom(16);
  }, []);
  return (
    <>
      <h1>{branch}</h1>
      <Maps zoom={mapZoom} center={mapCenter} onSave={(marker) => () => {}} />
    </>
  );
};

export default AlarmView;
