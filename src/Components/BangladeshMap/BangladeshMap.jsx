import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiSearch } from 'react-icons/fi';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const highlightIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const FlyTo = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 15, { duration: 2 });
  }
  return null;
};

const BangladeshMap = ({ outlets }) => {
  const [search, setSearch] = useState('');
  const [foundOutlet, setFoundOutlet] = useState(null);

  const filteredSuggestions = outlets.filter(outlet =>
    outlet.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    const found = outlets.find(outlet =>
      outlet.city.toLowerCase().includes(search.toLowerCase())
    );
    setFoundOutlet(found || null);
  };

  const handleSuggestionClick = (outlet) => {
    setSearch(outlet.city);
    // DO NOT immediately fly
    // user clicks Search after selecting suggestion
  };

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <form onSubmit={handleSearch} className="flex justify-center items-center gap-2 mb-2 relative">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {search && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white shadow rounded w-full mt-1 max-h-52 overflow-y-auto">
              {filteredSuggestions.map((outlet, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-lime-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(outlet)}
                >
                  {outlet.city}, {outlet.district}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button 
          type="submit" 
          className="btn rounded-full px-6 bg-lime-400 hover:bg-lime-500 border-none text-white"
        >
          Search
        </button>
      </form>

      <div className="divider my-4 w-full max-w-2xl mx-auto"></div>

      <h2 className="text-2xl font-semibold text-center mb-4">
        We deliver almost all over Bangladesh
      </h2>

      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow">
        <MapContainer 
          center={[23.6850, 90.3563]} 
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {foundOutlet && <FlyTo position={[foundOutlet.latitude, foundOutlet.longitude]} />}

          {outlets.map((outlet, index) => (
            <Marker
              key={index}
              position={[outlet.latitude, outlet.longitude]}
              icon={foundOutlet && outlet.city === foundOutlet.city ? highlightIcon : defaultIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{outlet.district}</h3>
                  <p><strong>City:</strong> {outlet.city}</p>
                  <p><strong>Areas:</strong> {outlet.covered_area.join(', ')}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
