// src/screens/OceanMissionScreen.jsx
import { useState, useEffect, useMemo,useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import UpgradePanel from '../components/game/UpgradePanel';
import GameGuideOcean from '../components/ui/GameGuideOcean';
import TutorialOverlay from '../components/ui/TutorialOverlay';
import { MAX_OCEAN_HEALTH, DEPLOY_AI_DATA_COST, DEPLOY_AI_ENERGY_COST } from '../constants/gameConstants';

const OceanMissionScreen = (props) => {
  const {
    oceanHealth, dataPoints, energy, aiAccuracy, aiMood, aiDialogue,
    onStartMinigame, onDeployAI, onBuyUpgrade, upgrades,
    // These props now come from the scalable system in App.js
    tutorialInfo,
    onStartTutorial,
    onAdvanceStep,
    onEndTutorial
  } = props;
  
  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
  const [showGameGuide, setShowGameGuide] = useState(false);
  const navigate = useNavigate();
  const { result } = useLanguage();
  const text = result.oceanMissionScreen;

  // This checks if the 'ocean' tutorial is the one that's active.
  const isTutorialActive = tutorialInfo.mission === 'ocean';

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

  // --- NEW: Define the specific steps for the Ocean Mission tutorial ---
  const oceanTutorialSteps = useMemo(() => ({
    1: {
      highlightId: 'tutorial-health-bar',
      text: "Welcome to the Ocean Mission! Your goal is to restore <strong>Ocean Health</strong> to 100%.",
      buttonText: "Next",
      action: onAdvanceStep,
    },
    2: {
      highlightId: 'tutorial-data-points',
      text: "To do this, you'll need <strong>Data Points (DP)</strong>, which you get from training me.",
      buttonText: "Next",
      action: onAdvanceStep,
    },
    3: {
      highlightId: 'tutorial-train-button',
      text: "Click <strong>'Train AI'</strong> to start the trash sorting minigame.",
      buttonText: null, // This forces the user to click the button
      action: onStartMinigame,
    },
    5: { // Step 4 happens on the minigame screen
      highlightId: 'tutorial-energy-counter',
      text: "Good work! Deploying the AI also costs <strong>Energy ⚡️</strong>.",
      buttonText: "Next",
      action: onAdvanceStep,
    },
    6: {
      highlightId: 'tutorial-deploy-button',
      text: "When you have enough resources, <strong>'Deploy AI'</strong> to automatically collect trash and clean the ocean.",
      buttonText: "Next",
      action: onAdvanceStep,
    },
    7: {
      highlightId: 'tutorial-upgrades-button',
      text: "Visit <strong>'Upgrades'</strong> to get essential items like the <strong>Solar System</strong> for more energy.",
      buttonText: "Got It!",
      action: onEndTutorial,
    }
  }), [onAdvanceStep, onEndTutorial, onStartMinigame]);

  const healthPercentage = Math.max(0, Math.min(MAX_OCEAN_HEALTH, oceanHealth));
  const pollutionOpacity = Math.max(0.1, (100 - healthPercentage) / 100);

  return (
    <div className="screen ocean-mission-screen">
      {/* This now passes the ocean-specific steps to the overlay */}
      {isTutorialActive && (
        <TutorialOverlay
          steps={oceanTutorialSteps}
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
          <Button id="tutorial-train-button" onClick={onStartMinigame} title={text.buttons.trainAITitle}>
            <Icon type="brain" /> {text.buttons.trainAI}
          </Button>
          <Button id="tutorial-deploy-button" onClick={onDeployAI} disabled={dataPoints < DEPLOY_AI_DATA_COST || energy < DEPLOY_AI_ENERGY_COST || oceanHealth >= MAX_OCEAN_HEALTH} title={text.buttons.deployAITitle}><Icon type="rocket" /> {text.buttons.deployAI}</Button>
          <Button id="tutorial-upgrades-button" onClick={() => setShowUpgradePanel(true)} title={text.buttons.upgradesTitle}><Icon type="wrench" /> {text.buttons.upgrades}</Button>
        </div>
      </div>
      <div className="ocean-footer-buttons">
        <Button onClick={onStartTutorial} className="help-button">
          <Icon type="help" /> Show Tutorial
        </Button>
        <Button onClick={() => setShowGameGuide(true)} className="help-button">
          <Icon type="help" /> Help
        </Button>
        <Button onClick={() => navigate('/missions')} className="back-button-mission">Back to Missions</Button>
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