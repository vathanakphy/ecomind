// src/components/city/CityStatusReport.jsx
import React from 'react';
import Icon from '../ui/Icon';
import { useLanguage } from '../../utils/language';

// --- NEW: Helper function to get AQI details ---// --- MODIFIED: The function now takes the translated text as an argument ---
const getAqiInfo = (aqi, aqiLevelsText) => {
  const roundedAqi = Math.round(aqi);

  // The logic now uses the provided text object instead of hardcoded strings
  if (roundedAqi <= 50) {
    return { text: aqiLevelsText.good, className: 'aqi-text-green' };
  }
  if (roundedAqi <= 100) {
    return { text: aqiLevelsText.moderate, className: 'aqi-text-yellow' };
  }
  if (roundedAqi <= 150) {
    return { text: aqiLevelsText.unhealthy, className: 'aqi-text-orange' };
  }
  return { text: aqiLevelsText.veryUnhealthy, className: 'aqi-text-red' };
};

const CityStatusReport = ({ aqi, economy, happiness }) => {
  // --- UPDATED: Use the helper function here ---
  
  // Get translations
  const { result } = useLanguage();

  // Guard clause: Don't render if translations are not yet loaded
  if (!result) {
    return null; // or a loading skeleton
  }

  // Get the specific text object for this component
  const text = result.cityStatusReport;

  // Pass the AQI value AND the translated text to the helper
  const aqiInfo = getAqiInfo(aqi, text.aqiLevels);

  const getStatusFace = (value) => {
    if (value > 75) return '😊';
    if (value > 40) return '😐';
    return '😟';
  };
  
  return (
    <div className="health-report-card">
       <h3><Icon type="📊" /> {text.title}</h3> {/* Translated */}
      
      {/* --- UPDATED: The AQI display logic --- */}
      <div className="report-item">
        <span>{text.aqiLabel}</span> {/* Translated */}
        <span className={`report-value ${aqiInfo.className}`}>
          {Math.round(aqi)} ({aqiInfo.text}) {/* Translated */}
        </span>
      </div>

      <div className="report-item">
        <span>{text.economyLabel}</span> {/* Translated */}
        <span className="report-value"><Icon type="💰" /> {economy}%</span>
      </div>

      <div className="report-item">
        <span>{text.happinessLabel}</span> {/* Translated */}
        <span className="report-value">{getStatusFace(happiness)} {happiness}%</span>
      </div>
    </div>
  );
};

export default CityStatusReport;