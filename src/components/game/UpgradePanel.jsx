// src/components/game/UpgradePanel.js
import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
// --- FIX IS ON THIS LINE ---
import { 
    UPGRADE_SORT_SPEED_COST,
    UPGRADE_EFFICIENT_DEPLOYMENT_COST,
    UPGRADE_ADVANCED_SENSORS_COST ,
    UPGRADE_SOLAR_PANELS_COST,
    UPGRADE_BIOMASS_GENERATOR_COST
} from '../../constants/gameConstants';

const UpgradePanel = ({ show, onClose, onBuyUpgrade, dataPoints, upgrades }) => {
  // ... rest of the component is unchanged
  return (
    <Modal show={show} onClose={onClose} title={<><Icon type="wrench"/> Upgrade Your AI's Green Brain!</>}>
      <div className="upgrade-list">
        <div className={`upgrade-item ${upgrades.hasUpgradeSortSpeed ? 'purchased' : ''}`}>
          <h4><Icon type="lightbulb" /> Efficient Sorting Algorithm</h4>
          <p>Your AI learns faster from sorting. Earns +15 DP instead of +10 in minigame.</p>
          <p>Cost: {UPGRADE_SORT_SPEED_COST} DP</p>
          <Button onClick={() => onBuyUpgrade('sortSpeed')} disabled={upgrades.hasUpgradeSortSpeed || dataPoints < UPGRADE_SORT_SPEED_COST} title={upgrades.hasUpgradeSortSpeed ? "Already purchased" : "Purchase this upgrade"}>
            {upgrades.hasUpgradeSortSpeed ? 'PURCHASED' : 'BUY'}
          </Button>
        </div>
        <div className={`upgrade-item ${upgrades.hasUpgradeEfficientDeployment ? 'purchased' : ''}`}>
          <h4><Icon type="rocket" /> Efficient Deployment</h4>
          <p>Your AI cleans 1.5x more effectively per deployment.</p>
          <p>Cost: {UPGRADE_EFFICIENT_DEPLOYMENT_COST} DP</p>
          <Button onClick={() => onBuyUpgrade('efficientDeployment')} disabled={upgrades.hasUpgradeEfficientDeployment || dataPoints < UPGRADE_EFFICIENT_DEPLOYMENT_COST} title={upgrades.hasUpgradeEfficientDeployment ? "Already purchased" : "Purchase this upgrade"}>
            {upgrades.hasUpgradeEfficientDeployment ? 'PURCHASED' : 'BUY'}
          </Button>
        </div>
        <div className={`upgrade-item ${upgrades.hasUpgradeAdvancedSensors ? 'purchased' : ''}`}>
          <h4><Icon type="brain" /> Advanced Contaminant Sensors</h4>
          <p>Improves AI's base learning and deployment precision. (+10 AI Accuracy on purchase, better learning rate, more effective deployment).</p>
          <p>Cost: {UPGRADE_ADVANCED_SENSORS_COST} DP</p>
          <Button onClick={() => onBuyUpgrade('advancedSensors')} disabled={upgrades.hasUpgradeAdvancedSensors || dataPoints < UPGRADE_ADVANCED_SENSORS_COST} title={upgrades.hasUpgradeAdvancedSensors ? "Already purchased" : "Purchase this upgrade"}>
            {upgrades.hasUpgradeAdvancedSensors ? 'PURCHASED' : 'BUY'}
          </Button>
        </div>
        <div className={`upgrade-item ${upgrades.hasUpgradeSolarPanels ? 'purchased' : ''}`}>
            <h4><Icon type="☀️" /> Solar Panel Installation</h4>
            <p>Build a renewable energy grid. Passively generates 5 Energy every few seconds.</p>
            <p>Cost: {UPGRADE_SOLAR_PANELS_COST} DP</p>
            <Button 
              onClick={() => onBuyUpgrade('solarPanels')} 
              disabled={upgrades.hasUpgradeSolarPanels || dataPoints < UPGRADE_SOLAR_PANELS_COST} 
              title={upgrades.hasUpgradeSolarPanels ? "Already purchased" : "Purchase this upgrade"}
            >
              {upgrades.hasUpgradeSolarPanels ? 'PURCHASED' : 'BUY'}
            </Button>
        </div>
        {/* <div className={`upgrade-item ${upgrades.hasUpgradeBiomassGenerator ? 'purchased' : ''}`}>
            <h4><Icon type="🔥" /> Biomass Generator</h4>
            <p>Convert logged forest tiles (stumps) directly into a burst of energy. Adds a new action button in the forest.</p>
            <p>Cost: {UPGRADE_BIOMASS_GENERATOR_COST} DP</p>
            <Button 
              onClick={() => onBuyUpgrade('biomassGenerator')} 
              disabled={upgrades.hasUpgradeBiomassGenerator || dataPoints < UPGRADE_BIOMASS_GENERATOR_COST} 
            >
              {upgrades.hasUpgradeBiomassGenerator ? 'PURCHASED' : 'BUY'}
            </Button>
        </div> */}
      </div>
    </Modal>
  );
};

export default UpgradePanel;