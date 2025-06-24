// src/screens/ForestMissionScreen.js
import { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import TopHud from '../components/game/forest/TopHud';
import ForestMap from '../components/game/forest/ForestMap';
import PlantingMenu from '../components/game/forest/PlantingMenu';
import NotificationLog from '../components/game/forest/NotificationLog';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import UpgradePanel from '../components/game/UpgradePanel'; // <-- Import the panel
import { DEPLOY_AI_FOREST_DATA_COST, DEPLOY_AI_FOREST_ENERGY_COST } from '../constants/gameConstants';

const ForestMissionScreen = (props) => {
  const {
    co2Level, globalTemp, biodiversity, forestCoverage, forestMap,
    forestNotifications, dataPoints, energy,
    onPlantTree, onTrainAI, onDeployAIForest,
    onBuyUpgrade, onConvertBiomass, upgrades // <-- Receive new props
  } = props;
   const navigate = useNavigate();
    const [isPlanting, setIsPlanting] = useState(false);
    const [selectedTree, setSelectedTree] = useState(null);
    const [showUpgradePanel, setShowUpgradePanel] = useState(false); // <-- State for the panel
  // --- NEW: Add/remove a class to the body for the custom cursor ---
  useEffect(() => {
    if (selectedTree) {
      document.body.classList.add('planting-cursor');
    } else {
      document.body.classList.remove('planting-cursor');
    }
    // Cleanup function to remove the class if the component unmounts
    return () => {
      document.body.classList.remove('planting-cursor');
    };
  }, [selectedTree]); // Re-run this effect whenever selectedTree changes

  const handleTogglePlanting = () => {
    const newIsPlanting = !isPlanting;
    setIsPlanting(newIsPlanting);
    if (!newIsPlanting) {
      setSelectedTree(null);
    }
  };

  const handleSelectTree = (tree) => {
    setSelectedTree(tree);
  };
  
  const handleTileClick = (x, y) => {
    if (selectedTree) {
      onPlantTree(x, y, selectedTree);
    }
  };
    const loggedTileCount = forestMap.flat().filter(t => t.type === 'logged').length;

  return (
    <div className="screen forest-mission-screen">
      <TopHud
        co2Level={co2Level} globalTemp={globalTemp} biodiversity={biodiversity} forestCoverage={forestCoverage}
      />
      <div className="forest-main-content">
        <div className="left-sidebar">
          <h3>Actions</h3>
          <div className="resource-counters vertical">
            <span title="Data Points: Used for planting and upgrades"><Icon type="data" /> {dataPoints} DP</span>
            <span title="Energy: Used for AI training"><Icon type="energy" /> {energy} ⚡️</span>
          </div>

          <Button onClick={onTrainAI} title="Train AI to identify forest health">
            <Icon type="🧪" /> Train AI
          </Button>

          {/* --- MODIFICATION HERE: Button is now enabled and functional --- */}
          <Button
            onClick={onDeployAIForest}
            disabled={dataPoints < DEPLOY_AI_FOREST_DATA_COST || energy < DEPLOY_AI_FOREST_ENERGY_COST}
            title="Deploy AI to automatically plant saplings"
          >
            <Icon type="🌱" /> Deploy AI
          </Button>
          
          <Button onClick={handleTogglePlanting} className={isPlanting ? 'active' : ''}>
            <Icon type="⚖️" /> Manage Forest
          </Button>
           {upgrades.hasUpgradeBiomassGenerator && (
            <Button onClick={onConvertBiomass} disabled={loggedTileCount === 0} title="Convert 1 logged tile to energy">
              <Icon type="🔥" /> Convert Biomass ({loggedTileCount})
            </Button>
          )}

          <Button onClick={() => setShowUpgradePanel(true)}>
            <Icon type="wrench" /> Upgrades
          </Button>

          <Button onClick={() => navigate('/missions')} className="back-button-mission"> Back to Missions </Button>
        </div>
        <ForestMap
          forestMap={forestMap} onTileClick={handleTileClick} selectedTree={selectedTree}
        />
      </div>
      <NotificationLog notifications={forestNotifications} />
      {isPlanting && (
        <PlantingMenu
          onSelectTree={handleSelectTree} selectedTree={selectedTree} dataPoints={dataPoints}
        />
      )}
      <UpgradePanel
        show={showUpgradePanel}
        onClose={() => setShowUpgradePanel(false)}
        onBuyUpgrade={onBuyUpgrade}
        dataPoints={dataPoints}
        upgrades={upgrades}
      />
    </div>
  );
};

export default ForestMissionScreen;