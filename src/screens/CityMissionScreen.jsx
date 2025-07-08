// src/screens/CityMissionScreen.jsx
import React, { useState, useMemo, useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language';
import CityMap from '../components/city/CityMap';
import CityStatusReport from '../components/city/CityStatusReport';
import DecisionCard from '../components/city/DecisionCard';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import UpgradePanel from '../components/game/UpgradePanel';
import GameGuideCity from '../components/ui/GameGuideCity';
import TutorialOverlay from '../components/ui/TutorialOverlay'; // Make sure this is imported
import { 
    DEPLOY_AI_CITY_DATA_COST, 
    DEPLOY_AI_CITY_ENERGY_COST, 
    CITY_DECISIONS, 
    CITY_DISTRICTS 
} from '../constants/gameConstants';

const CityMissionScreen = (props) => {
  // This component now receives all its state and functions from App.js
  const {
    cityAqi, cityEconomy, cityHappiness,
    dataPoints, energy, upgrades,
    onApproveDecision, onStartCityTraining, onDeployAICity, onBuyUpgrade,
    cityAIAccuracy, aiRecommendedDecisionId,
    // These are the tutorial props from App.js
    tutorialInfo,
    onStartTutorial,
    onAdvanceStep,
    onEndTutorial
  } = props;
  
  const navigate = useNavigate();
  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
  const [showGameGuide, setShowGameGuide] = useState(false);
  const { result, language } = useLanguage();

  // --- This is the correct way to manage the tutorial ---
  // It checks the 'mission' name from the prop passed by App.js
  const isTutorialActive = tutorialInfo.mission === 'city';

  // This hook handles the body scroll when the tutorial is active
  useEffect(() => {
    if (isTutorialActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isTutorialActive]);

  // --- ALL a `tutorialStep` state and local handler functions have been REMOVED ---
  // App.js is now in control.

  // This object defines the text and targets for each step of the City tutorial
  const cityTutorialSteps = useMemo(() => ({
    1: {
      highlightId: 'tutorial-city-status',
      text: "Welcome to the City! Your goal is to improve the city by lowering the <strong>AQI (Air Quality Index)</strong>.",
      buttonText: "Next",
      action: onAdvanceStep,
    },
    2: {
      highlightId: 'tutorial-city-resources',
      text: "You'll use <strong>Data Points</strong> and <strong>Energy</strong> to enact new city policies.",
      buttonText: "Next",
      action: onAdvanceStep,
    },
    3: {
      highlightId: 'tutorial-city-train',
      text: "Click <strong>'Train AI'</strong> to teach the AI about good vs. bad policies and earn Data Points.",
      buttonText: null, // This forces the user to click the button
      action: onStartCityTraining, // This calls the function in App.js
    },
    5: { // Step 4 happens on the training screen
      highlightId: 'tutorial-city-decisions',
      text: "This is the list of available policies. Click <strong>Approve</strong> on a card to enact it.",
      buttonText: "Next",
      action: onAdvanceStep,
    },
    6: {
      highlightId: 'tutorial-city-deploy',
      text: "<strong>'Deploy AI'</strong> to have the AI suggest a new, highly effective policy for you to approve!",
      buttonText: "Next",
      action: onAdvanceStep,
    },
    7: {
      highlightId: 'tutorial-city-upgrades',
      text: "Don't forget to visit <strong>'Upgrades'</strong> to build Solar Panels for more energy.",
      buttonText: "Got It!",
      action: onEndTutorial,
    }
  }), [onAdvanceStep, onEndTutorial, onStartCityTraining]);

  if (!result) {
    return <div>Loading translations...</div>;
  }
  const text = result.cityMissionScreen;

  const translatedCityDecisions = useMemo(() => {
    const decisionTranslations = result.gameData.cityDecisions;
    return CITY_DECISIONS.map(decision => ({
      ...decision,
      title: decisionTranslations[decision.id]?.title || decision.title,
      description: decisionTranslations[decision.id]?.description || decision.description
    }));
  }, [language, result.gameData.cityDecisions]);

  const translatedDistricts = useMemo(() => {
    const districtTranslations = result.gameData.cityDistricts;
    return CITY_DISTRICTS.map(district => ({
      ...district,
      name: districtTranslations[district.id]?.name || district.name
    }));
  }, [language, result.gameData.cityDistricts]);


  return (
    <div className="panel-container">
      {isTutorialActive && (
        <TutorialOverlay
          steps={cityTutorialSteps}
          step={tutorialInfo.step}
          onNext={onAdvanceStep}
          onEnd={onEndTutorial}
          onForceAction={onStartCityTraining}
        />
      )}
      <div className="city-panel">
        <h1 className="panel-title">{text.title}</h1>
        <div className="panel-body">
          <div className="left-panel">
            {/* ID for tutorial highlight */}
            <div id="tutorial-city-status">
              <CityMap districts={translatedDistricts} />
              <CityStatusReport aqi={cityAqi} economy={cityEconomy} happiness={cityHappiness} />
            </div>
            {/* ID for tutorial highlight */}
            <div id="tutorial-city-resources" className="resource-counters horizontal">
              <span title={text.resources.dataPoints}> DP <Icon type="data" /> {dataPoints} </span>
              <span title={text.resources.energy}><Icon type="energy" /> {energy} </span>
              <span title={text.resources.aiAccuracy}><Icon type="brain" /> {cityAIAccuracy}%</span>
            </div>
          </div>

          <div className="right-panel">
            {/* ID for tutorial highlight */}
            <div id="tutorial-city-decisions" className="decision-list">
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
              {/* ID for tutorial highlight & a simple onClick */}
              <Button id="tutorial-city-train" onClick={onStartCityTraining}><Icon type="brain" /> {text.buttons.trainAI}</Button>
              <Button id="tutorial-city-deploy" onClick={onDeployAICity} disabled={dataPoints < DEPLOY_AI_CITY_DATA_COST || energy < DEPLOY_AI_CITY_ENERGY_COST}>
                <Icon type="rocket" /> {text.buttons.deployAI}
              </Button>
              <Button id="tutorial-city-upgrades" onClick={() => setShowUpgradePanel(true)}><Icon type="wrench" /> {text.buttons.upgrades}</Button>
              {/* This button now correctly starts the 'city' tutorial */}
              <Button onClick={onStartTutorial}><Icon type="❓" /> {text.buttons.help}</Button>
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