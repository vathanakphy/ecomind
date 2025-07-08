// src/screens/OceanMissionScreen.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import UpgradePanel from '../components/game/UpgradePanel';
import GameGuideOcean from '../components/ui/GameGuideOcean';
import TutorialOverlay from '../components/ui/TutorialOverlay';
import { MAX_OCEAN_HEALTH, DEPLOY_AI_DATA_COST, DEPLOY_AI_ENERGY_COST } from '../constants/gameConstants';

const OceanMissionScreen = (props) => {
  // These are all the props this component needs.
  // Notice we get the tutorial state AND functions from App.js.
  const {
    oceanHealth, dataPoints, energy, aiAccuracy, aiMood, aiDialogue,
    onStartMinigame, onDeployAI, onBuyUpgrade, upgrades,
    tutorialInfo,
    onStartTutorial,
    onAdvanceStep,
    onEndTutorial
  } = props;
  
  // This component only needs its own local state for UI panels, not the tutorial.
  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
  const [showGameGuide, setShowGameGuide] = useState(false);
  const navigate = useNavigate();
  const { result } = useLanguage();
  const text = result.oceanMissionScreen;

  // REMOVED: All local tutorial state (`isTutorialActive`, `tutorialStep`)
  // REMOVED: All local tutorial handler functions (`startTutorial`, `handleNextTutorialStep`, etc.)

  // This correctly checks if the 'ocean' tutorial is the one that's active.
  const isTutorialActive = tutorialInfo.mission === 'ocean';

  // This one useEffect hook is all we need to handle the body scroll.
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

  const healthPercentage = Math.max(0, Math.min(MAX_OCEAN_HEALTH, oceanHealth));
  const pollutionOpacity = Math.max(0.1, (100 - healthPercentage) / 100);

  return (
    <div className="screen ocean-mission-screen">
      {/* The TutorialOverlay is now correctly controlled by props from App.js */}
      {isTutorialActive && (
        <TutorialOverlay
          step={tutorialInfo.step}
          onNext={onAdvanceStep}
          onEnd={onEndTutorial}
          onForceAction={onStartMinigame}
        />
      )}
      
      <div className="environment-view ocean-view" style={{ '--pollution-opacity': pollutionOpacity }}>
        {healthPercentage < 80 && <div className="pollution-item plastic-bottle" style={{animationDelay: '0s'}}>🥤</div>}
        {healthPercentage < 60 && <div className="pollution-item plastic-bag" style={{animationDelay: '0.5s'}}>🛍️</div>}
        {healthPercentage < 40 && <div className="pollution-item oil-slick" style={{animationDelay: '1s'}}></div>}
        {healthPercentage < 20 && <div className="pollution-item tire" style={{animationDelay: '1.5s'}}>🔘</div>}
        {healthPercentage > 50 && <div className="clean-item happy-fish" style={{animationDelay: '0s'}}>🐠</div>}
        {healthPercentage > 70 && <div className="clean-item coral" style={{animationDelay: '0.5s'}}>🌊</div>}
        {healthPercentage > 90 && <div className="clean-item sun-rays">✨</div>}
      </div>

      <div className="ai-helper-mission">
        <div className="ai-avatar"><Icon type={aiMood} /></div>
        <div className="dialogue-box">{aiDialogue}</div>
      </div>

      <div className="main-ui-dashboard">
        <div className="status-bar" id="tutorial-health-bar">
          <label htmlFor="oceanHealth">{text.oceanHealthLabel}: {healthPercentage}%</label>
          <div className="progress-bar-container" title={`${text.oceanHealthLabel}: ${healthPercentage}%`}>
            <div className="progress-bar-fill" style={{ width: `${healthPercentage}%`, backgroundColor: `hsl(${healthPercentage * 1.2}, 70%, 50%)` }}></div>
          </div>
        </div>
        <div className="resource-counters">
          <span title={text.resources.dataPointsTitle} id="tutorial-data-points"><Icon type="data" /> {dataPoints} DP</span>
          <span title={text.resources.energyTitle} id="tutorial-energy-counter"><Icon type="energy" /> {energy} ⚡️</span>
          <span title={text.resources.aiAccuracyTitle}><Icon type="brain" /> {aiAccuracy}%</span>
        </div>

        <div className="action-buttons-mission">
          {/* This button's onClick is now simply onStartMinigame. App.js handles the logic. */}
          <Button id="tutorial-train-button" onClick={onStartMinigame} title={text.buttons.trainAITitle}>
              <Icon type="brain" /> {text.buttons.trainAI}
          </Button>
          <Button id="tutorial-deploy-button" onClick={onDeployAI} disabled={dataPoints < DEPLOY_AI_DATA_COST || energy < DEPLOY_AI_ENERGY_COST || oceanHealth >= MAX_OCEAN_HEALTH} title={text.buttons.deployAITitle}><Icon type="rocket" /> {text.buttons.deployAI}</Button>
          <Button id="tutorial-upgrades-button" onClick={() => setShowUpgradePanel(true)} title={text.buttons.upgradesTitle}><Icon type="wrench" /> {text.buttons.upgrades}</Button>
        </div>
      </div>
      <div className="ocean-footer-buttons">
        {/* This button now correctly calls the onStartTutorial prop from App.js */}
        <Button onClick={onStartTutorial} className="help-button">
          <Icon type="help" /> Show Tutorial
        </Button>
        <Button onClick={() => setShowGameGuide(true)} className="help-button">
          <Icon type="help" /> {text.buttons.help}
        </Button>
        <Button onClick={() => navigate('/missions')} className="back-button-mission">{text.buttons.backToMissions}</Button>
      </div>
      
     <UpgradePanel 
        show={showUpgradePanel} 
        onClose={() => setShowUpgradePanel(false)}
        onBuyUpgrade={onBuyUpgrade}
        dataPoints={dataPoints}
        upgrades={upgrades}
      />

      <GameGuideOcean
        show={showGameGuide}
        onClose={() => setShowGameGuide(false)}
      />
    </div>
  );
};

export default OceanMissionScreen;