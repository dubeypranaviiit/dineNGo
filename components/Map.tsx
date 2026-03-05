// "use client";

// import dynamic from "next/dynamic";
// import { useEffect } from "react";
// import L, { LatLngExpression, Icon } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import markerIconPng from "leaflet/dist/images/marker-icon.png";
// import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// // Lazy load React-Leaflet components to avoid SSR issues
// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false }
// );
// const Popup = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Popup),
//   { ssr: false }
// );

// interface MapProps {
//   lat: number;
//   lng: number;
//   address: string;
// }

// const Map: React.FC<MapProps> = ({ lat, lng, address }) => {
//   const position: LatLngExpression = [lat, lng];

//   useEffect(() => {
  
//     if (typeof window !== "undefined" && L) {
//       const DefaultIcon = new Icon({
//         iconUrl: markerIconPng.src,
//         shadowUrl: markerShadowPng.src,
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [1, -34],
//         shadowSize: [41, 41],
//       });


//       (L.Marker as any).prototype.options.icon = DefaultIcon;
//     }
//   }, []);

//   return (
//     <div className="h-72 w-full rounded-lg border overflow-hidden">
//       <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={position}>
//           <Popup>{address}</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default Map;
"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Dynamically load React Leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Fix marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  lat: number;
  lng: number;
  address: string;
}

const Map: React.FC<MapProps> = ({ lat, lng, address }) => {
  const position: LatLngExpression = [lat, lng];

  return (
    <div className="h-72 w-full rounded-lg border overflow-hidden">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
