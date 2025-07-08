// src/screens/CityMissionScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language'; // Import the language hook
import CityMap from '../components/city/CityMap';
import CityStatusReport from '../components/city/CityStatusReport';
import DecisionCard from '../components/city/DecisionCard';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import UpgradePanel from '../components/game/UpgradePanel';
import GameGuideCity from '../components/ui/GameGuideCity';
import { DEPLOY_AI_CITY_DATA_COST, DEPLOY_AI_CITY_ENERGY_COST } from '../constants/gameConstants';

const CityMissionScreen = (props) => {
  const {
    cityAqi, cityEconomy, cityHappiness, cityDistricts, cityDecisions,
    dataPoints, energy, upgrades,
    onApproveDecision, onStartCityTraining, onDeployAICity, onBuyUpgrade,

    cityAIAccuracy, aiRecommendedDecisionId

  } = props;
  
  const navigate = useNavigate();

  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
  const [showGameGuide, setShowGameGuide] = useState(false);

  // Get translations
  const { result } = useLanguage();
  const text = result.cityMissionScreen;

  return (
    <div className="panel-container">
      <div className="city-panel">
        <h1 className="panel-title">{text.title}</h1> {/* Translated */}
        <div className="panel-body">
          {/* --- LEFT PANEL --- */}
          <div className="left-panel">
            <CityMap districts={cityDistricts} />
            <CityStatusReport aqi={cityAqi} economy={cityEconomy} happiness={cityHappiness} />
            <div className="resource-counters horizontal">

              <span title={text.resources.dataPoints}> DP <Icon type="data" /> {dataPoints} </span> {/* Translated */}
              <span title={text.resources.energy}><Icon type="energy" /> {energy} </span> {/* Translated */}
              <span title={text.resources.aiAccuracy}><Icon type="brain" /> {cityAIAccuracy}%</span> {/* Translated */}

            </div>
          </div>

          {/* --- RIGHT PANEL --- */}
          <div className="right-panel">
            <div className="decision-list">
              {cityDecisions.map(decision => (
               <DecisionCard
                  key={decision.id}
                  decision={decision}

                  onApprove={onApproveDecision}
                  dataPoints={dataPoints}
                  energy={energy}

                  isRecommended={decision.id === aiRecommendedDecisionId}
                />
              ))}
            </div>
            
            <div className="action-buttons-mission city-actions">
              <Button onClick={onStartCityTraining}><Icon type="brain" /> {text.buttons.trainAI}</Button> {/* Translated */}
              <Button 
                onClick={onDeployAICity}
                disabled={dataPoints < DEPLOY_AI_CITY_DATA_COST || energy < DEPLOY_AI_CITY_ENERGY_COST}
              >
                <Icon type="rocket" /> {text.buttons.deployAI} {/* Translated */}
              </Button>
              <Button onClick={() => setShowUpgradePanel(true)}><Icon type="wrench" /> {text.buttons.upgrades}</Button> {/* Translated */}
              <Button onClick={() => setShowGameGuide(true)}><Icon type="❓" /> {text.buttons.help}</Button> {/* Translated */}
              <Button onClick={() => navigate('/missions')}><Icon type="⏪" /> {text.buttons.backToMissions}</Button> {/* Translated */}
            </div>
          </div>
        </div>
      </div>
      
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