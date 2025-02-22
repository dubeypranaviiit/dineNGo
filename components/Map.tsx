import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat, lng, address }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={15} className="h-72 w-full rounded-lg border">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
