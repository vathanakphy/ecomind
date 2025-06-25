// src/components/city/CityMap.jsx
import React from 'react';

// --- UPDATED: This helper now returns an object with both class and text ---
const getAqiInfoForMap = (aqi) => {
  const roundedAqi = Math.round(aqi);

  if (roundedAqi <= 50) {
    return { className: 'aqi-green', statusText: 'Good' };
  }
  if (roundedAqi <= 100) {
    return { className: 'aqi-yellow', statusText: 'Moderate' };
  }
  if (roundedAqi <= 150) {
    return { className: 'aqi-orange', statusText: 'Unhealthy' };
  }
  return { className: 'aqi-red', statusText: 'Hazardous' };
};


const CityMap = ({ districts }) => (    
  <div className="city-map-card">
    <h3>AQI City Map</h3>
    <div className="city-grid">
      {districts.map((district) => {
        // --- UPDATED: Call the helper here to get the info object ---
        const aqiInfo = getAqiInfoForMap(district.aqi);
        
        return (
          <div 
            key={district.id} 
            // The class is now set from the info object
            className={`district-tile ${aqiInfo.className}`} 
            title={`AQI: ${Math.round(district.aqi)}`}
          >
            {/* --- UPDATED: Display both the name and the status text --- */}
            <span className="district-name">{district.name}</span>
            <span className="district-status">{aqiInfo.statusText}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export default CityMap;