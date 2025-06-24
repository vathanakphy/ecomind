import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

// --- Constants ---
import {
  // Shared
  INITIAL_DATA_POINTS, INITIAL_ENERGY,
  // Ocean
  INITIAL_OCEAN_HEALTH, INITIAL_AI_ACCURACY, MAX_OCEAN_HEALTH, DEPLOY_AI_DATA_COST, DEPLOY_AI_ENERGY_COST,
  // UPGRADE_SORT_SPEED_COST, UPGRADE_EFFICIENT_DEPLOYMENT_COST, UPGRADE_ADVANCED_SENSORS_COST,
  TRASH_ITEMS_DATA, MINIGAME_DURATION_SECONDS, MINIGAME_QUICK_BONUS_THRESHOLD, MINIGAME_QUICK_BONUS_DP,
  // Forest
  INITIAL_CO2_PPM, INITIAL_BIODIVERSITY, MAX_BIODIVERSITY, FOREST_MAP_WIDTH, FOREST_MAP_HEIGHT,
  TILE_TYPES, TREE_TYPES, FOREST_AI_TRAINING_IMAGES, AI_TRAINING_COST_FOREST,
  DEPLOY_AI_FOREST_DATA_COST, DEPLOY_AI_FOREST_ENERGY_COST, AI_PLANTING_COUNT,
  MAX_ENERGY, UPGRADE_SOLAR_PANELS_COST, SOLAR_PANEL_ENERGY_GENERATION,
  UPGRADE_BIOMASS_GENERATOR_COST, BIOMASS_ENERGY_PER_STUMP

} from './constants/gameConstants';

// --- Utils & UI ---
import { playSound } from './utils/audio';
import Notification from './components/ui/Notification';

// --- Screen Components ---
import MainMenuScreen from './screens/MainMenuScreen';
import MissionSelectScreen from './screens/MissionSelectScreen';
import OceanMissionScreen from './screens/OceanMissionScreen';
import SortTrashMinigameScreen from './screens/SortTrashMinigameScreen';
import ForestMissionScreen from './screens/ForestMissionScreen';
import ForestAITrainingScreen from './screens/ForestAITrainingScreen';

// --- Helper Functions ---
const generateInitialForestMap = () => {
  return Array.from({ length: FOREST_MAP_HEIGHT }, (_, y) =>
    Array.from({ length: FOREST_MAP_WIDTH }, (_, x) => ({
      id: `${x}-${y}`, x, y,
      // --- CHANGE HERE: Start with FAR fewer trees (from 0.7 to 0.95) ---
      type: Math.random() > 0.95 ? TILE_TYPES.MATURE : TILE_TYPES.EMPTY,
      treeId: Math.random() > 0.95 ? 'oak' : null,
      growth: Math.random() > 0.95 ? 5 : 0,
    }))
  );
};


// =================================================================
// --- THE MAIN APP COMPONENT ---
// =================================================================
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- SHARED STATE ---
  const [dataPoints, setDataPoints] = useState(INITIAL_DATA_POINTS);
  const [energy, setEnergy] = useState(INITIAL_ENERGY);
  const [notifications, setNotifications] = useState([]);
  const [aiMood, setAiMood] = useState('neutralAI');
  const [aiDialogue, setAiDialogue] = useState('Hi! I am Eco, your AI helper!');

  // --- OCEAN MISSION STATE ---
  const [oceanHealth, setOceanHealth] = useState(INITIAL_OCEAN_HEALTH);
  const [aiAccuracy, setAiAccuracy] = useState(INITIAL_AI_ACCURACY);
  const [isOceanMissionCompleted, setIsOceanMissionCompleted] = useState(false); // DEV: set to true to test forest
  const [hasUpgradeSortSpeed, setHasUpgradeSortSpeed] = useState(false);
  const [hasUpgradeEfficientDeployment, setHasUpgradeEfficientDeployment] = useState(false);
  const [hasUpgradeAdvancedSensors, setHasUpgradeAdvancedSensors] = useState(false);
  const [hasUpgradeSolarPanels, setHasUpgradeSolarPanels] = useState(false);
    const [hasUpgradeBiomassGenerator, setHasUpgradeBiomassGenerator] = useState(false);
  const [minigameItems, setMinigameItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [minigameFeedback, setMinigameFeedback] = useState('');
  const [minigameTimeLeft, setMinigameTimeLeft] = useState(MINIGAME_DURATION_SECONDS);
  const minigameTimerRef = useRef(null);

  // --- FOREST MISSION STATE ---
  const [isForestMissionUnlocked, setIsForestMissionUnlocked] = useState(true); // DEV: set to true to test
  const [co2Level, setCo2Level] = useState(INITIAL_CO2_PPM);
  const [globalTemp, setGlobalTemp] = useState(1.1);
  const [biodiversity, setBiodiversity] = useState(INITIAL_BIODIVERSITY);
  const [forestCoverage, setForestCoverage] = useState(0);
  const [forestMap, setForestMap] = useState(generateInitialForestMap());
  const [forestNotifications, setForestNotifications] = useState([{id: Date.now(), type: 'info', message: 'Welcome to the Forest Guardian mission!'}]);
  const [aiForestTrainingIndex, setAiForestTrainingIndex] = useState(0);
  const [forestTrainingFeedback, setForestTrainingFeedback] = useState('');

  // --- NOTIFICATION LOGIC ---
  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  }, []);
  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);
  const addForestNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setForestNotifications(prev => [...prev.slice(-10), { id, message, type }]);
  }, []);

  // --- NAVIGATION LOGIC ---
  const startMission = useCallback((mission) => {
    if (mission === 'OceanMission') {
      navigate('/missions/ocean');
      setAiDialogue("Welcome to the Ocean Mission! Let's get to work.");
      setAiMood('neutralAI');
    } else if (mission === 'ForestMission' && isForestMissionUnlocked) {
      navigate('/missions/forest');
      addForestNotification("Welcome, Guardian. The planet's fate is in your hands.", 'info');
    } else if (mission === 'ForestMission' && !isForestMissionUnlocked) {
      addNotification("Complete the Ocean Mission to unlock the Forest Guardian mission.", "error");
    }
  }, [isForestMissionUnlocked, addNotification, navigate, addForestNotification]);

  // --- OCEAN MISSION LOGIC ---
  const endMinigame = useCallback((completedAllItems = true) => {
    clearInterval(minigameTimerRef.current);
    const timeTaken = MINIGAME_DURATION_SECONDS - minigameTimeLeft;
    if (completedAllItems && timeTaken <= MINIGAME_QUICK_BONUS_THRESHOLD) {
      const bonusDP = MINIGAME_QUICK_BONUS_DP;
      setDataPoints(dp => dp + bonusDP);
      setMinigameFeedback(`Quick work! +${bonusDP} DP bonus! Minigame complete.`);
    } else {
      setMinigameFeedback("Minigame session ended.");
    }
    setTimeout(() => {
      navigate('/missions/ocean');
      setAiDialogue(`Training session complete. We've gathered valuable data!`);
      setAiMood('neutralAI');
    }, 2000);
  }, [minigameTimeLeft, navigate]);

  const handleSortItem = useCallback((item, selectedBinType) => {
    if (item.type === selectedBinType) {
      playSound('correct');
      const dataGain = hasUpgradeSortSpeed ? 15 : 10;
      setDataPoints(dp => dp + dataGain);
      setAiAccuracy(acc => Math.min(100, acc + (hasUpgradeAdvancedSensors ? 2 : 1)));
      setMinigameFeedback(`Correct! +${dataGain} DP.`);
    } else {
      playSound('incorrect');
      setAiAccuracy(acc => Math.max(0, acc - 2));
      setMinigameFeedback(`Oops! That was ${item.type}.`);
      addNotification("Incorrect sort. AI Accuracy slightly affected.", "error");
    }
    if (currentItemIndex < minigameItems.length - 1) {
      setCurrentItemIndex(idx => idx + 1);
    } else {
      endMinigame(true);
    }
  }, [hasUpgradeSortSpeed, hasUpgradeAdvancedSensors, addNotification, currentItemIndex, minigameItems.length, endMinigame]);

  const handleDeployAI = useCallback(() => {
    if (dataPoints >= DEPLOY_AI_DATA_COST && energy >= DEPLOY_AI_ENERGY_COST) {
      playSound('deploy');
      setDataPoints(dp => dp - DEPLOY_AI_DATA_COST);
      setEnergy(e => e - DEPLOY_AI_ENERGY_COST);
      let effectiveness = aiAccuracy / (hasUpgradeAdvancedSensors ? 8 : 10);
      if (hasUpgradeEfficientDeployment) effectiveness *= 1.5;
      const healthImprovement = Math.floor(effectiveness);
      setOceanHealth(oh => Math.min(MAX_OCEAN_HEALTH, oh + healthImprovement));
      setAiDialogue(`AI deployed! Ocean health improved by ${healthImprovement} points.`);
      setAiMood('happyAI');
      addNotification(`AI successfully deployed! Ocean health +${healthImprovement}.`, 'success');
    } else {
      let errorMsg = "Cannot deploy AI: ";
      if (dataPoints < DEPLOY_AI_DATA_COST) errorMsg += "Not enough Data Points. ";
      if (energy < DEPLOY_AI_ENERGY_COST) errorMsg += "Not enough Energy.";
      setAiDialogue(errorMsg);
      setAiMood('concernedAI');
      addNotification(errorMsg, 'error');
    }
  }, [dataPoints, energy, aiAccuracy, hasUpgradeAdvancedSensors, hasUpgradeEfficientDeployment, addNotification]);

 const buyUpgrade = useCallback((upgradeType) => {
    let cost = 0;
    let canAfford = false;
    let alreadyOwned = false;
    let successMsg = "";

    switch(upgradeType) {
        // ... (cases for 'sortSpeed', 'efficientDeployment', 'advancedSensors' are unchanged)
        
        // --- ADD NEW CASE FOR SOLAR PANELS ---
        case 'solarPanels':
            cost = UPGRADE_SOLAR_PANELS_COST;
            canAfford = dataPoints >= cost;
            alreadyOwned = hasUpgradeSolarPanels;
            if (canAfford && !alreadyOwned) {
                setHasUpgradeSolarPanels(true);
                successMsg = "Solar Panels installed! You will now generate energy over time.";
            }
            break;
        case 'biomassGenerator':
            cost = UPGRADE_BIOMASS_GENERATOR_COST;
            canAfford = dataPoints >= cost;
            alreadyOwned = hasUpgradeBiomassGenerator;
            if (canAfford && !alreadyOwned) {
                setHasUpgradeBiomassGenerator(true);
                // We add the button logic in the Forest screen itself
                successMsg = "Biomass Generator constructed! You can now convert logged tiles into energy.";
            }
            break;

        default: return;
    }

    if (canAfford && !alreadyOwned) {
        setDataPoints(dp => dp - cost);
        setAiDialogue(successMsg); // This dialogue might not be visible, but good to set
        addNotification(successMsg, 'success');
    } else if (alreadyOwned) {
        addNotification("Upgrade already owned.", 'info');
    } else {
        addNotification("Not enough Data Points for this upgrade.", 'error');
    }
  }, [dataPoints, hasUpgradeSortSpeed, hasUpgradeEfficientDeployment, hasUpgradeAdvancedSensors,hasUpgradeBiomassGenerator, addNotification ,hasUpgradeSolarPanels, addNotification]); // Add new dependency

  const startSortTrashMinigame = useCallback(() => {
    const shuffledItems = [...TRASH_ITEMS_DATA].sort(() => 0.5 - Math.random());
    setMinigameItems(shuffledItems);
    setCurrentItemIndex(0);
    setMinigameFeedback('');
    setMinigameTimeLeft(MINIGAME_DURATION_SECONDS);
    navigate('/missions/ocean/train');
    setAiDialogue("Training mode activated! Sort these items quickly and accurately.");
    setAiMood('thinkingAI');
  }, [navigate]);

 const convertBiomassToEnergy = useCallback(() => {
    if (!hasUpgradeBiomassGenerator) return;

    const loggedTiles = forestMap.flat().filter(tile => tile.type === TILE_TYPES.LOGGED);
    if (loggedTiles.length === 0) {
      addForestNotification("No logged tiles available to convert to biomass.", "error");
      return;
    }
    
    // Convert one stump at a time
    const tileToConvert = loggedTiles[0];
    const newEnergy = BIOMASS_ENERGY_PER_STUMP;

    setEnergy(e => Math.min(MAX_ENERGY, e + newEnergy));
    
    // Remove the stump from the map
    const newMap = forestMap.map(row => row.map(cell => ({...cell})));
    newMap[tileToConvert.y][tileToConvert.x].type = TILE_TYPES.EMPTY;
    newMap[tileToConvert.y][tileToConvert.x].treeId = null;
    setForestMap(newMap);

    addForestNotification(`Converted biomass! +${newEnergy} Energy.`, "success");
    playSound('deploy');

  }, [forestMap, hasUpgradeBiomassGenerator, addForestNotification]);
  // --- FOREST MISSION LOGIC ---
  const handlePlantTree = useCallback((x, y, tree) => {
    const tile = forestMap[y][x];
    if (tile.type === TILE_TYPES.EMPTY && dataPoints >= tree.cost) {
      setDataPoints(dp => dp - tree.cost);
      const newMap = forestMap.map(row => row.map(cell => ({...cell})));
      newMap[y][x] = { ...newMap[y][x], type: TILE_TYPES.YOUNG, treeId: tree.id, growth: 0 };
      setForestMap(newMap);
      setBiodiversity(b => Math.min(MAX_BIODIVERSITY, b + tree.biodiversityImpact));
      addForestNotification(`Planted a ${tree.name} in sector (${x},${y}).`, 'success');
    } else if (dataPoints < tree.cost) {
      addForestNotification(`Not enough Data Points to plant a ${tree.name}.`, 'error');
    }
  }, [forestMap, dataPoints, addForestNotification]);

   const handleStartForestTraining = useCallback(() => {
    if(energy >= AI_TRAINING_COST_FOREST) {
      // setEnergy(e => e - AI_TRAINING_COST_FOREST);
      setAiForestTrainingIndex(0);
      setForestTrainingFeedback(''); // <-- Reset feedback on start
      navigate('/missions/forest/train');
    } else {
      addForestNotification('Not enough energy to start an AI training session.', 'error');
    }
  }, [energy, navigate, addForestNotification]);

  const handleImageLabel = useCallback((image, selectedLabel) => {
     if (image.correctLabel === selectedLabel) {
       const dataGain = 15; // Define gain
       setDataPoints(dp => dp + dataGain);
       setForestTrainingFeedback(`Correct! +${dataGain} DP.`); // <-- Set direct feedback
     } else {
       setForestTrainingFeedback('Incorrect. Try to be more accurate.'); // <-- Set direct feedback
     }

     // Advance to next image or end training
     setTimeout(() => {
        if (aiForestTrainingIndex < FOREST_AI_TRAINING_IMAGES.length - 1) {
            setAiForestTrainingIndex(i => i + 1);
            setForestTrainingFeedback(''); // Clear feedback for next item
        } else {
            navigate('/missions/forest');
            addForestNotification('AI training session complete!', 'info');
        }
     }, 1000); // Add a small delay to let the user see the feedback
  }, [aiForestTrainingIndex, navigate, addForestNotification]);

   const handleDeployAIForest = useCallback(() => {
    if (dataPoints >= DEPLOY_AI_FOREST_DATA_COST && energy >= DEPLOY_AI_FOREST_ENERGY_COST) {
      const availableTiles = forestMap.flat().filter(tile => tile.type === TILE_TYPES.EMPTY);

      if (availableTiles.length === 0) {
        addForestNotification('Deploy failed: No empty land available to plant trees.', 'error');
        return;
      }
      
      // Subtract costs
      setDataPoints(dp => dp - DEPLOY_AI_FOREST_DATA_COST);
      setEnergy(e => e - DEPLOY_AI_FOREST_ENERGY_COST);
      playSound('deploy');

      const newMap = forestMap.map(row => row.map(cell => ({...cell})));
      const treeToPlant = TREE_TYPES.find(t => t.id === 'pine'); // AI plants the basic, fast-growing pine
      let treesPlantedCount = 0;
      let biodiversityGained = 0;

      // AI finds the best spots (for now, just the first few empty ones)
      const tilesToPlant = availableTiles.slice(0, AI_PLANTING_COUNT);

      tilesToPlant.forEach(tile => {
        newMap[tile.y][tile.x] = { ...newMap[tile.y][tile.x], type: TILE_TYPES.YOUNG, treeId: treeToPlant.id, growth: 0 };
        treesPlantedCount++;
        biodiversityGained += treeToPlant.biodiversityImpact;
      });

      setForestMap(newMap);
      setBiodiversity(b => Math.min(MAX_BIODIVERSITY, b + biodiversityGained));
      addForestNotification(`AI Deployed! Planted ${treesPlantedCount} new saplings.`, 'success');

    } else {
      let errorMsg = "Cannot deploy AI: ";
      if (dataPoints < DEPLOY_AI_FOREST_DATA_COST) errorMsg += "Not enough Data Points. ";
      if (energy < DEPLOY_AI_FOREST_ENERGY_COST) errorMsg += "Not enough Energy.";
      addForestNotification(errorMsg, 'error');
    }
  }, [dataPoints, energy, forestMap, addForestNotification]);

  // --- USEEFFECT HOOKS ---
  useEffect(() => {
    if (oceanHealth >= MAX_OCEAN_HEALTH && !isOceanMissionCompleted) {
      setIsOceanMissionCompleted(true);
      setIsForestMissionUnlocked(true);
      setAiDialogue("Fantastic! The Ocean Mission is complete! A new challenge awaits!");
      setAiMood('happyAI');
      addNotification("Ocean Mission Complete! Forest Mission Unlocked!", 'success');
    }
  }, [oceanHealth, isOceanMissionCompleted, addNotification]);

  useEffect(() => {
    if (location.pathname === '/missions/ocean') {
      if (oceanHealth < 30) { setAiDialogue("The ocean is heavily polluted."); setAiMood('concernedAI'); }
      else if (oceanHealth > 80 && oceanHealth < MAX_OCEAN_HEALTH) { setAiDialogue("We're making great progress!"); setAiMood('happyAI'); }
      else if (dataPoints < DEPLOY_AI_DATA_COST) { setAiDialogue("We need more Data Points to deploy."); setAiMood('thinkingAI'); }
      else if (energy < DEPLOY_AI_ENERGY_COST) { setAiDialogue("Energy reserves are low for deployment."); setAiMood('concernedAI'); }
      else if (!isOceanMissionCompleted) { setAiDialogue("Ready to improve ocean health!"); setAiMood('neutralAI'); }
    } else if (location.pathname === '/') {
        setAiDialogue('Hi! I am Eco, your AI helper!');
        setAiMood('neutralAI');
    }
  }, [oceanHealth, dataPoints, energy, location.pathname, isOceanMissionCompleted]);
  
  useEffect(() => {
    if (location.pathname === '/missions/ocean/train' && minigameTimeLeft > 0) {
      minigameTimerRef.current = setInterval(() => setMinigameTimeLeft(t => t - 1), 1000);
    } else if (minigameTimeLeft <= 0 && location.pathname === '/missions/ocean/train') {
      clearInterval(minigameTimerRef.current);
      endMinigame(false);
    }
    return () => clearInterval(minigameTimerRef.current);
  }, [location.pathname, minigameTimeLeft, endMinigame]);

  useEffect(() => {
    const gameTick = setInterval(() => {
      // 1. Generate energy from solar panels (if purchased)
      if (hasUpgradeSolarPanels) {
        setEnergy(e => Math.min(MAX_ENERGY, e + SOLAR_PANEL_ENERGY_GENERATION));
      }

      // 2. Run forest simulation logic
      let co2Reduction = 0, matureTrees = 0, youngTrees = 0;
      let mapNeedsUpdate = false;

      const newMap = forestMap.map(row => row.map(tile => {
        const newTile = {...tile};
        const treeData = TREE_TYPES.find(t => t.id === newTile.treeId);
        if(treeData) {
          if (newTile.type === TILE_TYPES.YOUNG) {
            youngTrees++;
            co2Reduction += treeData.co2Absorption * 0.5;
            newTile.growth++;
            if (newTile.growth >= treeData.growthTicks) {
              newTile.type = TILE_TYPES.MATURE;
              mapNeedsUpdate = true;
            }
          } else if (newTile.type === TILE_TYPES.MATURE) {
            matureTrees++;
            co2Reduction += treeData.co2Absorption;
          }
        }
        return newTile;
      }));
      
      if(mapNeedsUpdate) setForestMap(newMap);

      setCo2Level(co2 => Math.max(350, co2 - co2Reduction + 0.15));
      setGlobalTemp(1.1 + (co2Level - 420) * 0.05);
      setForestCoverage(Math.round(((matureTrees + youngTrees) / (FOREST_MAP_WIDTH * FOREST_MAP_HEIGHT)) * 100));
      
    }, 2000);

    return () => clearInterval(gameTick);
  }, [forestMap, co2Level, hasUpgradeSolarPanels]);

  // --- JSX RENDER ---
  return (
    <div className="App">
      <div className="notification-area">
        {notifications.map(n => <Notification key={n.id} {...n} onDismiss={() => dismissNotification(n.id)} />)}
      </div>
      
      <Routes>
        <Route path="/" element={<MainMenuScreen onAddNotification={addNotification} aiMood={aiMood} />} />
        <Route path="/missions" element={<MissionSelectScreen onStartMission={startMission} isOceanMissionCompleted={isOceanMissionCompleted} isForestMissionUnlocked={isForestMissionUnlocked} />} />
        
        {/* Ocean Mission Routes */}
        <Route path="/missions/ocean" element={
          <OceanMissionScreen
            oceanHealth={oceanHealth} dataPoints={dataPoints} energy={energy} aiAccuracy={aiAccuracy} aiMood={aiMood} aiDialogue={aiDialogue}
            onStartMinigame={startSortTrashMinigame} onDeployAI={handleDeployAI} onBuyUpgrade={buyUpgrade}
            upgrades={{ hasUpgradeSortSpeed, hasUpgradeEfficientDeployment, hasUpgradeAdvancedSensors, hasUpgradeSolarPanels, hasUpgradeBiomassGenerator }}          />
        }/>
        <Route path="/missions/ocean/train" element={
          <SortTrashMinigameScreen
            minigameItems={minigameItems} currentItemIndex={currentItemIndex} minigameFeedback={minigameFeedback} minigameTimeLeft={minigameTimeLeft}
            dataPoints={dataPoints} onSortItem={handleSortItem} onEndMinigame={endMinigame}
          />
        }/>

        {/* Forest Mission Routes */}
         <Route path="/missions/forest" element={
          <ForestMissionScreen
            co2Level={co2Level} globalTemp={globalTemp} biodiversity={biodiversity} forestCoverage={forestCoverage} forestMap={forestMap}
            forestNotifications={forestNotifications} dataPoints={dataPoints} energy={energy}
            onPlantTree={handlePlantTree} onTrainAI={handleStartForestTraining}
            onDeployAIForest={handleDeployAIForest}
            onBuyUpgrade={buyUpgrade}
            onConvertBiomass={convertBiomassToEnergy}
            upgrades={{ hasUpgradeSolarPanels, hasUpgradeBiomassGenerator }}
            
          />
        }/>
        <Route path="/missions/forest/train" element={
          <ForestAITrainingScreen
            trainingImages={FOREST_AI_TRAINING_IMAGES}
            currentImageIndex={aiForestTrainingIndex}
            onImageLabel={handleImageLabel}
            onEndTraining={() => navigate('/missions/forest')}
            // --- PASS NEW PROPS ---
            dataPoints={dataPoints}
            forestTrainingFeedback={forestTrainingFeedback}
          />
        }/>
      </Routes>
    </div>
  );
}

export default App;