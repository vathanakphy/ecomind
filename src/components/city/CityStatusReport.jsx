// src/components/city/CityStatusReport.jsx
import React from 'react';
import Icon from '../ui/Icon';

// --- NEW: Helper function to get AQI details ---
const getAqiInfo = (aqi) => {
  const roundedAqi = Math.round(aqi);

  if (roundedAqi <= 50) {
    return { text: 'Good', className: 'aqi-text-green' };
  }
  if (roundedAqi <= 100) {
    return { text: 'Moderate', className: 'aqi-text-yellow' };
  }
  if (roundedAqi <= 150) {
    return { text: 'Unhealthy', className: 'aqi-text-orange' };
  }
  return { text: 'Very Unhealthy', className: 'aqi-text-red' };
};

const CityStatusReport = ({ aqi, economy, happiness }) => {
  // --- UPDATED: Use the helper function here ---
  const aqiInfo = getAqiInfo(aqi);

  const getStatusFace = (value) => {
    if (value > 75) return '😊';
    if (value > 40) return '😐';
    return '😟';
  };
  
  return (
    <div className="health-report-card">
      <h3><Icon type="📊" /> City Status</h3>
      
      {/* --- UPDATED: The AQI display logic --- */}
      <div className="report-item">
        <span>Avg. Air Quality (AQI):</span>
        <span className={`report-value ${aqiInfo.className}`}>
          {Math.round(aqi)} ({aqiInfo.text})
        </span>
      </div>

      <div className="report-item">
        <span>Economic Health:</span>
        <span className="report-value"><Icon type="💰" /> {economy}%</span>
      </div>

      <div className="report-item">
        <span>Citizen Happiness:</span>
        <span className="report-value">{getStatusFace(happiness)} {happiness}%</span>
      </div>
    </div>
  );
};

export default CityStatusReport;