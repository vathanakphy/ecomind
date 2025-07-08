// src/components/city/CityMap.jsx
import React from 'react';
import { useLanguage } from '../../utils/language';

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
 
const CityMap = ({ districts }) => {
  const { result } = useLanguage();
  // Guard clause: Don't render if translations are not yet loaded
  if (!result) {
    return null; // or a loading skeleton
  }
  // Get the specific text object for this component
  const text = result.CityMap;

  return (
    <div className="city-map-card">
      <h3>{text.cityMap}</h3>
      <div className="city-grid">
        {districts.map((district) => {
          const aqiInfo = getAqiInfoForMap(district.aqi);
          return (
            <div 
              key={district.id} 
              className={`district-tile ${aqiInfo.className}`} 
              title={`AQI: ${Math.round(district.aqi)}`}
            >
              <span className="district-name">{district.name}</span>
              <span className="district-status">{aqiInfo.statusText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CityMap;