import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const BangladeshMap = () => {
  return (
    <div className="h-[500px] w-full rounded-xl shadow overflow-hidden">
      <MapContainer 
        center={[23.6850, 90.3563]} // Bangladesh center
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        {/* Example marker for Dhaka */}
        <Marker position={[23.8103, 90.4125]}>
          <Popup>
            Dhaka - We deliver here!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
