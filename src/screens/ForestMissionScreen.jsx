// src/screens/ForestMissionScreen.js
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language';
import TopHud from '../components/game/forest/TopHud';
import ForestMap from '../components/game/forest/ForestMap';
import PlantingMenu from '../components/game/forest/PlantingMenu';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import UpgradePanel from '../components/game/UpgradePanel';
import GameGuideForest from '../components/ui/GameGuideForest'; 
import TutorialOverlay from '../components/ui/TutorialOverlay';
import { DEPLOY_AI_FOREST_DATA_COST, DEPLOY_AI_FOREST_ENERGY_COST } from '../constants/gameConstants';

const ForestMissionScreen = (props) => {
  const {
    co2Level, globalTemp, biodiversity, forestCoverage, forestMap,
    dataPoints, energy,
    onPlantTree, onTrainAI, onDeployAIForest,
    onBuyUpgrade, onConvertBiomass, upgrades,
    forestAIAccuracy,
    tutorialInfo,
    onStartTutorial,
    onAdvanceStep,
    onEndTutorial
  } = props;

  const navigate = useNavigate();
  const [isPlanting, setIsPlanting] = useState(false);
  const [selectedTree, setSelectedTree] = useState(null);
  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  
  const { result } = useLanguage();
  const text = result.forestMissionScreen;

  const isTutorialActive = tutorialInfo.mission === 'forest';
  const tutorialText = text?.tutorial;

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

const forestTutorialSteps = useMemo(() => {
    if (!tutorialText) return {}; // Safety check

    return {
      1: {
        highlightId: 'tutorial-hud',
        textKey: "step1_text",
        buttonTextKey: "button_next",
        action: onAdvanceStep,
      },
      2: {
        highlightId: 'tutorial-forest-resources',
        textKey: "step2_text",
        buttonTextKey: "button_next",
        action: onAdvanceStep,
      },
      3: {
        highlightId: 'tutorial-forest-train',
        textKey: "step3_text",
        buttonTextKey: null,
        action: onTrainAI,
      },
      5: {
        highlightId: 'tutorial-forest-deploy',
        textKey: "step5_text",
        buttonTextKey: "button_next",
        action: onAdvanceStep,
      },
      6: {
        highlightId: 'tutorial-forest-plant',
        textKey: "step6_text",
        buttonTextKey: "button_next",
        action: onAdvanceStep,
      },
      7: {
        highlightId: 'tutorial-forest-map',
        textKey: "step7_text",
        buttonTextKey: "button_got_it",
        action: onEndTutorial,
      }
    }
  }, [onAdvanceStep, onEndTutorial, onTrainAI, tutorialText]); // Add tutorialText dependency

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
  if (!text || !tutorialText) {
    return <div className="screen">Loading...</div>;
  }

  return (
    <div className="screen forest-mission-screen">
      {isTutorialActive && (
        <TutorialOverlay
          steps={forestTutorialSteps}
          step={tutorialInfo.step}
          onNext={onAdvanceStep}
          onEnd={onEndTutorial}
          onForceAction={onTrainAI}
          translations={tutorialText} // Pass the tutorial translations
        />
      )}

      <div id="tutorial-hud">
        <TopHud
          co2Level={co2Level} globalTemp={globalTemp} biodiversity={biodiversity} forestCoverage={forestCoverage}
        />
      </div>
      <div className="forest-main-content">
        <div className="forest-action-panel">
          <h3>{text.actionsTitle}</h3>
          <div id="tutorial-forest-resources" className="resource-counters vertical">
            <span title={text.resources.dataPoints}><Icon type="data" /> {dataPoints} DP</span>
            <span title={text.resources.energy}><Icon type="energy" /> {energy} ⚡️</span>
            <span title={text.resources.aiAccuracy}><Icon type="brain" /> {forestAIAccuracy}%</span>
          </div>

          <Button id="tutorial-forest-train" onClick={onTrainAI} title={text.buttons.trainAITitle}>
            <Icon type="🧪" /> {text.buttons.trainAI}
          </Button>

          <Button
            id="tutorial-forest-deploy"
            onClick={onDeployAIForest}
            disabled={dataPoints < DEPLOY_AI_FOREST_DATA_COST || energy < DEPLOY_AI_FOREST_ENERGY_COST}
            title={text.buttons.deployAITitle}
          >
            <Icon type="🌱" /> {text.buttons.deployAI}
          </Button>
          
          <Button id="tutorial-forest-plant" onClick={handleTogglePlanting} className={isPlanting ? 'active' : ''}>
            <Icon type="⚖️" /> {text.buttons.manageForest}
          </Button>

          {upgrades.hasUpgradeBiomassGenerator && (
            <Button onClick={onConvertBiomass} disabled={loggedTileCount === 0} title={text.buttons.convertBiomassTitle}>
              <Icon type="🔥" /> {text.buttons.convertBiomass} ({loggedTileCount})
            </Button>
          )}

          <Button id="tutorial-upgrades-button" onClick={() => setShowUpgradePanel(true)}>
            <Icon type="wrench" /> {text.buttons.upgrades}
          </Button>

          <Button onClick={onStartTutorial}>
            <Icon type="❓" /> {text.buttons.help}
          </Button>

          <Button onClick={() => navigate('/missions')} className="back-button-mission"> {text.buttons.backToMissions} </Button>
        </div>
        <div id="tutorial-forest-map">
          <ForestMap
            forestMap={forestMap} onTileClick={handleTileClick} selectedTree={selectedTree}
          />
        </div>
      </div>
      {isPlanting && (
        <PlantingMenu
          onSelectTree={handleSelectTree}
          selectedTree={selectedTree}
          dataPoints={dataPoints}
          onClose={handleTogglePlanting}
        />
      )}
      <UpgradePanel
        show={showUpgradePanel}
        onClose={() => setShowUpgradePanel(false)}
        onBuyUpgrade={onBuyUpgrade}
        dataPoints={dataPoints}
        upgrades={upgrades}
      />

      <GameGuideForest show={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
};

export default ForestMissionScreen;