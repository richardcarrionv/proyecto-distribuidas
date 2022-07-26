import Maps from "../components/maps/Maps";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {Marker} from "@react-google-maps/api";

const AlarmsView = () => {
  const windowUrl = window.location.search;
  const initCoords = { lat: -0.1824739406812052, lng: -78.46213540619937 };
  const [branch, setBranch] = useState(); 
  const [mapZoom, setMapZoom] = useState(8);
  const [mapCenter, setMapCoords] = useState({ ...initCoords });

  return (
    <>
      <h1>{branch}</h1>
      <Maps zoom={mapZoom} center={mapCenter} onMarkerCoordsChange={() => () => {}} >
        <Marker position={mapCenter}></Marker>
      </Maps>
    </>
  );
};

export default AlarmsView;
