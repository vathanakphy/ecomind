// src/screens/ForestMissionScreen.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language'; // Import the language hook
import TopHud from '../components/game/forest/TopHud';
import ForestMap from '../components/game/forest/ForestMap';
import PlantingMenu from '../components/game/forest/PlantingMenu';
// import NotificationLog from '../components/game/forest/NotificationLog';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import UpgradePanel from '../components/game/UpgradePanel';
import GameGuideFoest from '../components/ui/GameGuideForest'; // Note: Typo in original filename 'Foest' -> 'Forest' might be needed
import { DEPLOY_AI_FOREST_DATA_COST, DEPLOY_AI_FOREST_ENERGY_COST } from '../constants/gameConstants';

const ForestMissionScreen = (props) => {
  const {
    co2Level, globalTemp, biodiversity, forestCoverage, forestMap,
    dataPoints, energy,
    onPlantTree, onTrainAI, onDeployAIForest,
    onBuyUpgrade, onConvertBiomass, upgrades,
    forestAIAccuracy
  } = props;

  const navigate = useNavigate();
  const [isPlanting, setIsPlanting] = useState(false);
  const [selectedTree, setSelectedTree] = useState(null);
  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  
  // Get translations
  const { result } = useLanguage();
  const text = result.forestMissionScreen;

  useEffect(() => {
    if (selectedTree) {
      document.body.classList.add('planting-cursor');
    } else {
      document.body.classList.remove('planting-cursor');
    }
    return () => {
      document.body.classList.remove('planting-cursor');
    };
  }, [selectedTree]);

  const handleTogglePlanting = () => {
    const newIsPlanting = !isPlanting;
    setIsPlanting(newIsPlanting);
    if (!newIsPlanting) {
      setSelectedTree(null);
    }
  };

  const handleSelectTree = (tree) => {
    setSelectedTree(tree);
     setIsPlanting(false) 
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
        <div className="forest-action-panel">
          <h3>Actions</h3>
          <div className="resource-counters vertical">
            <span title={text.resources.dataPoints}><Icon type="data" /> {dataPoints} DP</span> {/* Translated */}
            <span title={text.resources.energy}><Icon type="energy" /> {energy} ⚡️</span> {/* Translated */}
            <span title={text.resources.aiAccuracy}><Icon type="brain" /> {forestAIAccuracy}%</span> {/* Translated */}
          </div>

          <Button onClick={onTrainAI} title={text.buttons.trainAITitle}> {/* Translated */}
            <Icon type="🧪" /> {text.buttons.trainAI} {/* Translated */}
          </Button>

          <Button
            onClick={onDeployAIForest}
            disabled={dataPoints < DEPLOY_AI_FOREST_DATA_COST || energy < DEPLOY_AI_FOREST_ENERGY_COST}
            title={text.buttons.deployAITitle} /* Translated */
          >
            <Icon type="🌱" /> {text.buttons.deployAI} {/* Translated */}
          </Button>
          
          <Button onClick={handleTogglePlanting} className={isPlanting ? 'active' : ''}>
            <Icon type="⚖️" /> {text.buttons.manageForest} {/* Translated */}
          </Button>

           {upgrades.hasUpgradeBiomassGenerator && (
            <Button onClick={onConvertBiomass} disabled={loggedTileCount === 0} title={text.buttons.convertBiomassTitle}> {/* Translated */}
              <Icon type="🔥" /> {text.buttons.convertBiomass} ({loggedTileCount}) {/* Translated */}
            </Button>
          )}

          <Button onClick={() => setShowUpgradePanel(true)}>
            <Icon type="wrench" /> {text.buttons.upgrades} {/* Translated */}
          </Button>

          <Button onClick={() => setShowGuide(true)}>
            <Icon type="❓" /> {text.buttons.help} {/* Translated */}
          </Button>

          <Button onClick={() => navigate('/missions')} className="back-button-mission"> {text.buttons.backToMissions} </Button> {/* Translated */}
        </div>
        <ForestMap
          forestMap={forestMap} onTileClick={handleTileClick} selectedTree={selectedTree}
        />
      </div>
      {isPlanting && (
        <PlantingMenu
          onSelectTree={handleSelectTree}
          selectedTree={selectedTree}
          dataPoints={dataPoints}
          onClose={handleTogglePlanting}  // <-- ADD THIS LINE
        />
      )}
      <UpgradePanel
        show={showUpgradePanel}
        onClose={() => setShowUpgradePanel(false)}
        onBuyUpgrade={onBuyUpgrade}
        dataPoints={dataPoints}
        upgrades={upgrades}
      />

      <GameGuideFoest show={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
};

export default ForestMissionScreen;