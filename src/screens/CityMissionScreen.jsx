// src/screens/CityMissionScreen.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language';
import CityMap from '../components/city/CityMap';
import CityStatusReport from '../components/city/CityStatusReport';
import DecisionCard from '../components/city/DecisionCard';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import UpgradePanel from '../components/game/UpgradePanel';
import GameGuideCity from '../components/ui/GameGuideCity';

// FIX #2: Import CITY_DISTRICTS and CITY_DECISIONS from constants
import { 
    DEPLOY_AI_CITY_DATA_COST, 
    DEPLOY_AI_CITY_ENERGY_COST, 
    CITY_DECISIONS, 
    CITY_DISTRICTS 
} from '../constants/gameConstants';

const CityMissionScreen = (props) => {
  const {
    // FIX #2: Removed cityDistricts from props
    cityAqi, cityEconomy, cityHappiness,
    dataPoints, energy, upgrades,
    onApproveDecision, onStartCityTraining, onDeployAICity, onBuyUpgrade,
    cityAIAccuracy, aiRecommendedDecisionId
  } = props;
  
  const navigate = useNavigate();
  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
  const [showGameGuide, setShowGameGuide] = useState(false);
  const { result, language } = useLanguage();

  // FIX #1: Add a loading state / guard clause
  // If language data isn't ready, don't render the component.
  if (!result) {
    return <div>Loading translations...</div>; // Or a spinner component
  }

  const text = result.cityMissionScreen;

  // This logic is now safe because we've confirmed `result` exists.
  const translatedCityDecisions = useMemo(() => {
    const decisionTranslations = result.gameData.cityDecisions;
    return CITY_DECISIONS.map(decision => ({
      ...decision,
      title: decisionTranslations[decision.id]?.title || decision.title,
      description: decisionTranslations[decision.id]?.description || decision.description
    }));
  }, [language, result.gameData.cityDecisions]);

  // FIX #2: This now uses the imported CITY_DISTRICTS constant instead of a prop.
  const translatedDistricts = useMemo(() => {
      const districtTranslations = result.gameData.cityDistricts;
      return CITY_DISTRICTS.map(district => ({
          ...district,
          name: districtTranslations[district.id]?.name || district.name
      }));
  }, [language, result.gameData.cityDistricts]);


  // If you get here, the component will render without crashing.
  return (
    <div className="panel-container">
      <div className="city-panel">
        <h1 className="panel-title">{text.title}</h1>
        <div className="panel-body">
          {/* --- LEFT PANEL --- */}
          <div className="left-panel">
            <CityMap districts={translatedDistricts} />
            <CityStatusReport aqi={cityAqi} economy={cityEconomy} happiness={cityHappiness} />
            <div className="resource-counters horizontal">
              <span title={text.resources.dataPoints}> DP <Icon type="data" /> {dataPoints} </span>
              <span title={text.resources.energy}><Icon type="energy" /> {energy} </span>
              <span title={text.resources.aiAccuracy}><Icon type="brain" /> {cityAIAccuracy}%</span>
            </div>
          </div>

          {/* --- RIGHT PANEL --- */}
          <div className="right-panel">
            <div className="decision-list">
              {translatedCityDecisions.map(decision => (
               <DecisionCard
                  key={decision.id}
                  decision={decision}
                  onApprove={onApproveDecision}
                  dataPoints={dataPoints}
                  energy={energy}
                  isRecommended={decision.id === aiRecommendedDecisionId}
                  text={text.decisionCard} 
                />
              ))}
            </div>
            
            <div className="action-buttons-mission city-actions">
              <Button onClick={onStartCityTraining}><Icon type="brain" /> {text.buttons.trainAI}</Button>
              <Button 
                onClick={onDeployAICity}
                disabled={dataPoints < DEPLOY_AI_CITY_DATA_COST || energy < DEPLOY_AI_CITY_ENERGY_COST}
              >
                <Icon type="rocket" /> {text.buttons.deployAI}
              </Button>
              <Button onClick={() => setShowUpgradePanel(true)}><Icon type="wrench" /> {text.buttons.upgrades}</Button>
              <Button onClick={() => setShowGameGuide(true)}><Icon type="❓" /> {text.buttons.help}</Button>
              <Button onClick={() => navigate('/missions')}><Icon type="⏪" /> {text.buttons.backToMissions}</Button>
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