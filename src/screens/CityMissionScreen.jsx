// src/screens/CityMissionScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityMap from '../components/city/CityMap';
import CityStatusReport from '../components/city/CityStatusReport';
import DecisionCard from '../components/city/DecisionCard';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import UpgradePanel from '../components/game/UpgradePanel'; // <-- Import UpgradePanel
import GameGuideCity from '../components/ui/GameGuideCity';
import { DEPLOY_AI_CITY_DATA_COST, DEPLOY_AI_CITY_ENERGY_COST } from '../constants/gameConstants'; // <-- Import costs

const CityMissionScreen = (props) => {
  const {
    cityAqi, cityEconomy, cityHappiness, cityDistricts, cityDecisions,
    dataPoints, energy, upgrades,
    onApproveDecision, onStartCityTraining, onDeployAICity, onBuyUpgrade,
        cityAIAccuracy, aiRecommendedDecisionId 

  } = props;
  const navigate = useNavigate();

  // --- ADD STATE FOR THE UPGRADE PANEL ---
  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
  const [showGameGuide, setShowGameGuide] = useState(false);

  return (
    <div className="panel-container">
      <div className="city-panel">
        <h1 className="panel-title">City Air Rescue</h1>
        <div className="panel-body">
          {/* --- LEFT PANEL --- */}
          <div className="left-panel">
            <CityMap districts={cityDistricts} />
            <CityStatusReport aqi={cityAqi} economy={cityEconomy} happiness={cityHappiness} />
            <div className="resource-counters horizontal">
              <span title="Data Points"> DP <Icon type="data" /> {dataPoints} </span>
              <span title="Energy"><Icon type="energy" /> {energy} </span>
              <span title="City AI Accuracy"><Icon type="brain" /> {cityAIAccuracy}%</span>
            </div>
          </div>

          {/* --- RIGHT PANEL --- */}
          <div className="right-panel">
            <div className="decision-list">
              {cityDecisions.map(decision => (
               <DecisionCard
                  key={decision.id}
                  decision={decision}
                  onApprove={props.onApproveDecision}
                  dataPoints={props.dataPoints}
                  energy={props.energy}
                  isRecommended={decision.id === aiRecommendedDecisionId} // <-- Pass recommendation flag
                />
              ))}
            </div>
            
            {/* --- COMPLETE ACTION BUTTONS --- */}
            <div className="action-buttons-mission city-actions">
              <Button onClick={onStartCityTraining}><Icon type="brain" /> Train AI</Button>
              <Button 
                onClick={onDeployAICity}
                disabled={dataPoints < DEPLOY_AI_CITY_DATA_COST || energy < DEPLOY_AI_CITY_ENERGY_COST}
              >
                <Icon type="rocket" /> Deploy AI
              </Button>
              <Button onClick={() => setShowUpgradePanel(true)}><Icon type="wrench" /> Upgrades</Button>
              <Button onClick={() => setShowGameGuide(true)}><Icon type="❓" /> Help</Button>
              <Button onClick={() => navigate('/missions')}><Icon type="⏪" /> Back to Missions</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- RENDER THE MODALS --- */}
      <UpgradePanel
        show={showUpgradePanel}
        onClose={() => setShowUpgradePanel(false)}
        onBuyUpgrade={onBuyUpgrade}
        dataPoints={dataPoints}
        upgrades={upgrades}
      />
      <GameGuideCity
        show={showGameGuide}
        onClose={() => setShowGameGuide(false)}
      />
    </div>
  );
};

export default CityMissionScreen;