'use client';

import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L, { Icon, divIcon, point } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

// 🔹 ICONS
const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});

const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
  return new divIcon({
    html: `<div class="cluster-icon">${count}</div>`,
    className: 'custom-marker-cluster',
    iconSize: point(40, 40, true)
  });
};

// 🔹 HELPERS
const cleanLocationString = (rawLocation) => {
  const noParentheses = rawLocation.replace(/\([^()]*\)/g, '');
  const normalized = noParentheses.replace(/ and /gi, ',').replace(/;/g, ',');
  const parts = normalized.split(',').map(part => part.trim()).filter(Boolean);
  return [...new Set(parts)];
};

const getLatLng = async (location) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`);
    const data = await response.json();
    if (data?.length) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
  } catch (err) {
    console.error('Geocoding error:', err);
  }
  return null;
};

// 🔹 DATA
const rawDisasterData = [
  {
    id: "67f4f66de7920cc6379b3f89",
    name: "Cyclone 'Amphan'",
    location: "Balasore (Baleshwar), Bhadrak, Kendrapada and Jagatsinghpur (Odisha); East Midunapur, West Midhunapur, North24 Parganas, South24 Parganas, Nadia, Howrah, Kolkata and Hoogli (West Bengal)",
    country: "India",
    date: "20-5-2020",
    deaths: 90
  },
  {
    id: "67f4f66de7920cc6379b3f8b",
    name: "Cyclone 'Nisarga'",
    location: "Raigad, Pune Districts (Maharashtra State)",
    country: "India",
    date: "3-6-2020",
    deaths: 6
  },
  {
    id: "67f4f66de7920cc6379b3f8d",
    name: "Cyclone Nivar",
    location: "Tamil Nadu and Puducherry",
    country: "India",
    date: "25-11-2020",
    deaths: 14
  }
];

// 🔹 COMPONENT
export default function CycloneMap() {
  const [disasterEvents, setDisasterEvents] = useState([]);

  useEffect(() => {
    const enrichWithCoordinates = async () => {
      const enrichedEvents = [];

      for (const event of rawDisasterData) {
        const locations = cleanLocationString(event.location);
        for (const loc of locations) {
          const coords = await getLatLng(`${loc}, ${event.country}`);
          if (coords) {
            enrichedEvents.push({
              ...event,
              latitude: coords.lat,
              longitude: coords.lng,
              fullLocation: loc
            });
          } else {
            console.warn(`❌ Could not geocode: ${loc}`);
          }
        }
      }

      setDisasterEvents(enrichedEvents);
    };

    enrichWithCoordinates();
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[21.0, 78.0]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {disasterEvents.map((event, idx) => (
            <Marker
              key={`${event.id}-${idx}`}
              position={[event.latitude, event.longitude]}
              icon={customIcon}
            >
              <Popup>
                <strong>{event.name}</strong><br />
                {event.date}<br />
                {event.fullLocation}<br />
                Deaths: {event.deaths}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
