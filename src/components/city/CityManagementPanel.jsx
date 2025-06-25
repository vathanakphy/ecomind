// src/components/city/CityManagementPanel.jsx
import React, { useState } from 'react';
import CityMap from './CityMap';
import HealthReport from './HealthReport';
import DecisionCard from './DecisionCard';
import Icon from './Icon';
import './CityManagementPanel.css';

// --- NEW: Import data from the constants file ---
import { 
    INITIAL_CITY_STATS, 
    INITIAL_DISTRICTS, 
    ALL_DECISIONS 
} from '../../constants/gameConstants'; // Adjust path if needed

const CityManagementPanel = () => {
  // --- State is now initialized from the imported constants ---
  const [stats, setStats] = useState(INITIAL_CITY_STATS);
  const [districts, setDistricts] = useState(INITIAL_DISTRICTS);
  const [decisions, setDecisions] = useState(ALL_DECISIONS);

  const handleApproveDecision = (approvedDecision) => {
    // 1. Pay the cost
    setStats(prev => ({ ...prev, credits: prev.credits - approvedDecision.cost }));

    // 2. Apply the impacts (this is a simplified logic model)
    // A real game would use a more robust system, but this demonstrates the concept.
    if (approvedDecision.id === 'dec1') { // E-Taxis
        setDistricts(prev => prev.map(d => ({ ...d, aqi: Math.max(0, d.aqi - 20) })));
        setStats(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 5) }));
    }
    if (approvedDecision.id === 'dec2') { // Close Factory
        setDistricts(prev => prev.map(d => (d.id === 'd3' ? { ...d, aqi: 20 } : d)));
        setStats(prev => ({ ...prev, economy: 'Struggling', happiness: Math.max(0, prev.happiness - 15) }));
    }
    if (approvedDecision.id === 'dec3') { // Plant Trees
        setDistricts(prev => prev.map(d => ({ ...d, aqi: Math.max(0, d.aqi - 10) })));
        setStats(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 10) }));
    }
    // ... you would add specific, fine-tuned logic for each decision here ...

    // 3. Remove the decision from the list
    setDecisions(prev => prev.filter(d => d.id !== approvedDecision.id));
  };

  return (
    <div className="panel-container">
      <div className="city-panel">
        <h1 className="panel-title">City Control Panel</h1>

        <div className="panel-body">
          {/* --- Left Panel --- */}
          <div className="left-panel">
            <CityMap districts={districts} />
            <HealthReport stats={stats} />
          </div>

          {/* --- Right Panel --- */}
          <div className="right-panel">
            <div className="decision-list">
              {decisions.length > 0 ? (
                decisions.map(decision => (
                    <DecisionCard
                        key={decision.id}
                        decision={decision}
                        onApprove={handleApproveDecision}
                        credits={stats.credits}
                    />
                ))
              ) : (
                <div className="no-decisions">
                    <h3>All decisions made for now!</h3>
                    <p>Great work managing the city.</p>
                </div>
              )}
            </div>
            <button className="back-button">
              <Icon type="back" /> Back to City
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityManagementPanel;