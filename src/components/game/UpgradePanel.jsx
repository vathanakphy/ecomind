// src/components/game/UpgradePanel.js
import React from 'react';
import { useLanguage } from '../../utils/language'; // 1. Import hook
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import {
    UPGRADE_SORT_SPEED_COST,
    UPGRADE_EFFICIENT_DEPLOYMENT_COST,
    UPGRADE_ADVANCED_SENSORS_COST,
    UPGRADE_SOLAR_PANELS_COST,
    UPGRADE_BIOMASS_GENERATOR_COST
} from '../../constants/gameConstants';

const UpgradePanel = ({ show, onClose, onBuyUpgrade, dataPoints, upgrades }) => {
  // 2. Get translation data
  const { result } = useLanguage();

  // 3. Guard clause
  if (!result) {
    return <Modal show={show} onClose={onClose} title="Loading..."><div/></Modal>;
  }
  const text = result.upgradePanel;

  // Helper function to render each upgrade item to avoid repetition
  const renderUpgrade = (id, cost, hasUpgrade) => {
    const upgradeText = text.upgrades[id]; // Get text for this specific upgrade
    const isDisabled = hasUpgrade || dataPoints < cost;

    return (
      <div className={`upgrade-item ${hasUpgrade ? 'purchased' : ''}`}>
        <h4><Icon type="lightbulb" /> {upgradeText.title}</h4>
        <p>{upgradeText.description}</p>
        <p>{text.costLabel}: {cost} DP</p>
        <Button 
          onClick={() => onBuyUpgrade(id)} 
          disabled={isDisabled} 
          title={hasUpgrade ? text.purchasedTooltip : text.buyTooltip}
        >
          {hasUpgrade ? text.purchasedButton : text.buyButton}
        </Button>
      </div>
    );
  };

  return (
    // 4. Use translated title
    <Modal show={show} onClose={onClose} title={<><Icon type="wrench"/> {text.title}</>}>
      <div className="upgrade-list">
        {/* 5. Use the helper function for each upgrade */}
        {renderUpgrade('sortSpeed', UPGRADE_SORT_SPEED_COST, upgrades.hasUpgradeSortSpeed)}
        {renderUpgrade('efficientDeployment', UPGRADE_EFFICIENT_DEPLOYMENT_COST, upgrades.hasUpgradeEfficientDeployment)}
        {renderUpgrade('advancedSensors', UPGRADE_ADVANCED_SENSORS_COST, upgrades.hasUpgradeAdvancedSensors)}
        {renderUpgrade('solarPanels', UPGRADE_SOLAR_PANELS_COST, upgrades.hasUpgradeSolarPanels)}
        {/* The biomass generator is commented out in your original code, but this pattern works for it too */}
        {/* {renderUpgrade('biomassGenerator', UPGRADE_BIOMASS_GENERATOR_COST, upgrades.hasUpgradeBiomassGenerator)} */}
      </div>
    </Modal>
  );
};

export default UpgradePanel;