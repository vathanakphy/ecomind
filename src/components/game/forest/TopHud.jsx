// src/components/game/forest/TopHud.js
import React from 'react';
import Icon from '../../ui/Icon';

const TopHud = ({ co2Level, globalTemp, biodiversity, forestCoverage }) => {
  const tempColor = `hsl(${(30 - globalTemp * 15) * 2}, 80%, 50%)`;

  return (
    <div className="forest-hud">
      <div className="hud-item" title="Atmospheric CO₂ (Parts Per Million)">
        <Icon type="wind" /> CO₂ Level: <strong>{co2Level.toFixed(2)} ppm</strong>
      </div>
      <div className="hud-item" title="Global Temperature Anomaly">
        <Icon type="thermometer" /> Temp: <strong style={{ color: tempColor }}>+{globalTemp.toFixed(2)}°C</strong>
      </div>
      <div className="hud-item" title="Health of the ecosystem's variety of life">
        <Icon type="heart" /> Biodiversity: <strong>{biodiversity}%</strong>
        <div className="progress-bar-container small">
          <div className="progress-bar-fill" style={{ width: `${biodiversity}%` }}></div>
        </div>
      </div>
      <div className="hud-item" title="Percentage of map covered by healthy forest">
        <Icon type="tree" /> Forest Coverage: <strong>{forestCoverage}%</strong>
      </div>
    </div>
  );
};

export default TopHud;