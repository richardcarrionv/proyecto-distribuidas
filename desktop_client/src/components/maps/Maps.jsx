import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import "./maps.css";

export default function Maps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAPS_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
function Map() {
  const center = { lat: -0.1824739406812052, lng: -78.46213540619937 }

  return (
    <GoogleMap zoom={8} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
