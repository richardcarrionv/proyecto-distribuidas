import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions, DialogContent } from "@mui/material";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const { REACT_APP_MAPS_API_KEY } = process.env;

const AlarmDialog = ({ data, open, onClose }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: REACT_APP_MAPS_API_KEY,
  });
  const handleClose = () => {
    onClose();
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Dialog open={open} maxWidth="100%" sx={{ height: "80%", width: "80%" }}>
      <DialogTitle sx={{ backgroundColor: "whitesmoke", textAlign: "Center" }}>
        {data.branch}, {data.province}, {data.city}, {data.address}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }} dividers>
        <GoogleMap
          zoom={16}
          center={{
            lat: parseFloat(data.latitude),
            lng: parseFloat(data.longitude),
          }}
          mapContainerClassName="map-container"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlarmDialog;
