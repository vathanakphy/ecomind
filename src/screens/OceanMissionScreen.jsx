// src/screens/OceanMissionScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import UpgradePanel from '../components/game/UpgradePanel';
import GameGuideOcean from '../components/ui/GameGuideOcean'; // Adjust path
// --- FIX IS ON THIS LINE ---
import { MAX_OCEAN_HEALTH, DEPLOY_AI_DATA_COST, DEPLOY_AI_ENERGY_COST } from '../constants/gameConstants';

const OceanMissionScreen = (props) => {
  // ... rest of the component code is unchanged
  const {
    oceanHealth, dataPoints, energy, aiAccuracy, aiMood, aiDialogue,
    onStartMinigame, onDeployAI, onBuyUpgrade, upgrades
  } = props;
  
  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
  const [showGameGuide, setShowGameGuide] = useState(false);
  const navigate = useNavigate();

  const healthPercentage = Math.max(0, Math.min(MAX_OCEAN_HEALTH, oceanHealth));
  const pollutionOpacity = Math.max(0.1, (100 - healthPercentage) / 100);

  return (
    <div className="screen ocean-mission-screen">
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
        <div className="status-bar">
          <label htmlFor="oceanHealth">Ocean Health: {healthPercentage}%</label>
          <div className="progress-bar-container" title={`Ocean Health: ${healthPercentage}%`}>
            <div className="progress-bar-fill" style={{ width: `${healthPercentage}%`, backgroundColor: `hsl(${healthPercentage * 1.2}, 70%, 50%)` }}></div>
          </div>
        </div>
        <div className="resource-counters">
          <span title="Data Points: Used for training and upgrades"><Icon type="data" /> {dataPoints} DP</span>
          <span title="Energy: Used for deploying the AI"><Icon type="energy" /> {energy} ⚡️</span>
          <span title="AI Accuracy: Affects deployment success"><Icon type="brain" /> {aiAccuracy}%</span>
        </div>

        <div className="action-buttons-mission">
          <Button onClick={onStartMinigame} title="Go to minigame to earn Data Points and improve AI."><Icon type="brain" /> TRAIN AI</Button>
          <Button onClick={onDeployAI} disabled={dataPoints < DEPLOY_AI_DATA_COST || energy < DEPLOY_AI_ENERGY_COST || oceanHealth >= MAX_OCEAN_HEALTH} title="Deploy AI to clean the ocean. Requires DP and Energy."><Icon type="rocket" /> DEPLOY AI</Button>
          <Button onClick={() => setShowUpgradePanel(true)} title="View and purchase AI upgrades."><Icon type="wrench" /> UPGRADES</Button>
        </div>
      </div>
      <div className="ocean-footer-buttons">
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