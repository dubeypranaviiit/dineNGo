// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const Map = ({ lat, lng, address }) => {
//   return (
//     <MapContainer center={[lat, lng]} zoom={15} className="h-72 w-full rounded-lg border">
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker position={[lat, lng]}>
//         <Popup>{address}</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default Map;
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Fix default marker icon issue in Next.js
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

interface MapProps {
  lat: number;
  lng: number;
  address: string;
}

const Map: React.FC<MapProps> = ({ lat, lng, address }) => {
  const position: LatLngExpression = [lat, lng];

  useEffect(() => {
    // Fix leaflet's default icon path issue in Next.js
    const DefaultIcon = new Icon({
      iconUrl: markerIconPng.src,
      shadowUrl: markerShadowPng.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
    <MapContainer center={position} zoom={15} className="h-72 w-full rounded-lg border">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
