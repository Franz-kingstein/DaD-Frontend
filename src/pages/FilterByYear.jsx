'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Select from 'react-select';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const years = Array.from({ length: 2025 - 2000 }, (_, i) => ({
  value: 2000 + i,
  label: 2000 + i,
}));

const disasterTypes = [
  { value: 'cyclone', label: '🌀 Cyclone' },
  { value: 'earthquake', label: '🌍 Earthquake' },
  { value: 'flood', label: '🌊 Flood' },
  { value: 'drought', label: '☀️ Drought' },
  { value: 'forestfire', label: '🔥 Forest Fire' },
];

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 6);
    }
  }, [lat, lng, map]);
  return null;
};

export default function FilterByYearMap() {
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedType, setSelectedType] = useState(disasterTypes[0]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 20.5937, lng: 78.9629 });
  const [, startTransition] = useTransition();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedYears.length || !selectedType) return;

      const allEvents = [];

      await Promise.all(
        selectedYears.map(async (yearObj) => {
          try {
            const res = await axios.get(
              `${process.env.REACT_APP_API_BASE_URL}/disasters?year=${yearObj.value}&type=${selectedType.value}`
            );
            allEvents.push(...(res.data || []));
          } catch (err) {
            console.error(`Failed to fetch ${selectedType.label} for ${yearObj.value}`, err);
          }
        })
      );

      setEvents(allEvents);
      setSelectedEvent(null);
    };

    fetchEvents();
  }, [selectedYears, selectedType]);

  useEffect(() => {
    if (selectedEvent?.location) {
      geocodeLocation(selectedEvent.location);
    }
  }, [selectedEvent]);

  const geocodeLocation = async (place) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
      );
      const data = await res.json();
      if (data.length > 0) {
        startTransition(() => {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        });
      }
    } catch (err) {
      console.error('Geocoding error:', err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#121212] text-white">
      {/* Left: Map */}
      <div className="lg:w-2/3 p-4">
        <h2 className="text-2xl font-semibold text-green-400 mb-3">
          {selectedType?.label || '🌐 Disaster'} Tracker Map
        </h2>

        <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={5} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <MarkerClusterGroup>
            {events.map((event, idx) =>
              event.latitude && event.longitude ? (
                <Marker
                  key={idx}
                  position={[event.latitude, event.longitude]}
                  eventHandlers={{
                    click: () => setSelectedEvent(event),
                  }}
                >
                  <Popup>
                    <strong>{event.name}</strong><br />
                    {event.date}<br />
                    {event.location}
                  </Popup>
                </Marker>
              ) : null
            )}
          </MarkerClusterGroup>

          {selectedEvent && (
            <RecenterMap lat={coordinates.lat} lng={coordinates.lng} />
          )}
        </MapContainer>
      </div>

      {/* Right: Filters and Info */}
      <div className="lg:w-1/3 p-6 space-y-6 border-l border-gray-700 bg-[#181818]">
        <div>
          <label className="block text-green-300 mb-2 font-semibold">🌍 Select Disaster Type</label>
          <Select
            options={disasterTypes}
            value={selectedType}
            onChange={setSelectedType}
            className="text-black"
            placeholder="Choose type..."
          />
        </div>

        <div>
          <label className="block text-green-300 mb-2 font-semibold">📅 Select Years</label>
          <Select
            isMulti
            options={years}
            className="text-black"
            onChange={setSelectedYears}
            placeholder="Pick years..."
          />
        </div>

        <div>
          <label className="block text-green-300 mb-2 font-semibold">🧭 Select Event</label>
          <select
            className="w-full p-2 bg-[#2a2a2a] rounded border border-gray-600"
            onChange={(e) => {
              const index = parseInt(e.target.value);
              if (!isNaN(index)) setSelectedEvent(events[index]);
            }}
          >
            <option value="">-- Select an event --</option>
            {events.map((event, idx) => (
              <option key={idx} value={idx}>
                {event.name || `Unnamed (${event.date})`}
              </option>
            ))}
          </select>
        </div>

        {selectedEvent && (
          <div className="bg-[#222222] p-4 border border-green-600 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-green-200">📋 Event Details</h3>
            <p><strong>Title:</strong> {selectedEvent.name}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Country:</strong> {selectedEvent.country}</p>
            <p><strong>Type:</strong> {selectedEvent.disasterType}</p>
            <p><strong>Deaths:</strong> {selectedEvent.deaths}</p>
            <p><strong>Magnitude:</strong> {selectedEvent.magnitude}</p>
          </div>
        )}
      </div>
    </div>
  );
}
