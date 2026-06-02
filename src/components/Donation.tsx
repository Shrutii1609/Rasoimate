import React, { useState, useEffect } from 'react';
import { Heart, MapPin, TrendingUp } from 'lucide-react';
import { DonationStats, Shelter } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default icon paths in Vite
// @ts-expect-error - adjusting Leaflet icon path resolution for Vite
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

const Donation: React.FC = () => {
  const [donationStats, setDonationStats] = useState<DonationStats>({
    currentMeals: 350,
    targetMeals: 500,
    percentage: 70
  });

  const [position, setPosition] = useState<[number, number]>([12.9716, 77.5946]); // fallback: Bengaluru

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => {},
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  const [shelters] = useState<Shelter[]>([
    {
      id: '1',
      name: 'Hope Shelter',
      distance: '1.2 km away',
      location: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: '2',
      name: 'Food for All',
      distance: '2.5 km away',
      location: { lat: 12.9752, lng: 77.5993 }
    },
    {
      id: '3',
      name: 'Helping Hands',
      distance: '3.0 km away',
      location: { lat: 12.9698, lng: 77.5920 }
    }
  ]);

  const handleDonate = () => {
    const confirmed = confirm('Are you sure you want to donate surplus food? A nearby shelter will contact you soon.');
    
    if (!confirmed) return;
    
    // Simulate donation progress
    setDonationStats(prev => ({
      ...prev,
      currentMeals: Math.min(prev.currentMeals + Math.floor(Math.random() * 10 + 5), prev.targetMeals),
      percentage: Math.min(((prev.currentMeals + Math.floor(Math.random() * 10 + 5)) / prev.targetMeals) * 100, 100)
    }));
    
    alert('Thank you for your donation request! A nearby shelter will contact you soon. Your contribution makes a real difference in the community.');
  };

  return (
    <section id="donate" className="py-16 bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-heading">Donate Surplus Food</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Make a difference in your community by sharing excess food
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-heading">Monthly Impact</h4>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">Meals Donated This Month</p>
            
            <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${donationStats.percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              <span className="text-green-600">{donationStats.currentMeals}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 dark:text-gray-300">{donationStats.targetMeals}</span>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {donationStats.percentage.toFixed(0)}% of monthly goal achieved
            </p>

            <div className="mt-4">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-report'));
                  const el = document.getElementById('reports');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow hover:shadow-lg"
              >
                Generate Monthly Report
              </button>
            </div>
          </div>
        </div>

          {/* Shelters Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-500" />
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-heading">Nearby Shelters</h4>
            </div>
            
            <div className="space-y-4 mb-6">
              {shelters.map((shelter) => (
                <div
                  key={shelter.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/70 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{shelter.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{shelter.distance}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleDonate}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Heart className="w-6 h-6" />
              Donate Now
            </button>
          </div>

          {/* Map Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-heading">Location Map</h4>
            
            <div className="rounded-2xl overflow-hidden mb-4" style={{ height: 240 }}>
              <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>Your location</Popup>
                </Marker>
                {shelters.map((s) => (
                  <Marker key={s.id} position={[s.location.lat, s.location.lng]}>
                    <Popup>
                      <strong>{s.name}</strong><br />{s.distance}
                    </Popup>
                  </Marker>
                ))}
                {/* Metro city markers */}
                {[ 
                  { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
                  { id: 'delhi', name: 'Delhi', lat: 28.6139, lng: 77.2090 },
                  { id: 'noida', name: 'Noida', lat: 28.5355, lng: 77.3910 },
                  { id: 'kolkata', name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
                ].map((c) => (
                  <Marker key={c.id} position={[c.lat, c.lng]}>
                    <Popup>{c.name}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            
            <p className="text-center font-semibold text-green-600 dark:text-green-300 text-lg">
              Thank you for making a difference!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;