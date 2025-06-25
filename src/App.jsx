import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

// --- Constants ---
import {
  // Shared
  INITIAL_DATA_POINTS, INITIAL_ENERGY, LOW_ENERGY_THRESHOLD, // <-- Added LOW_ENERGY_THRESHOLD
  // Ocean
  INITIAL_OCEAN_HEALTH, INITIAL_AI_ACCURACY, MAX_OCEAN_HEALTH, DEPLOY_AI_DATA_COST, DEPLOY_AI_ENERGY_COST,
  UPGRADE_SORT_SPEED_COST, UPGRADE_EFFICIENT_DEPLOYMENT_COST, UPGRADE_ADVANCED_SENSORS_COST,
  TRASH_ITEMS_DATA, MINIGAME_DURATION_SECONDS, MINIGAME_QUICK_BONUS_THRESHOLD, MINIGAME_QUICK_BONUS_DP,
  // Forest
  INITIAL_CO2_PPM, INITIAL_BIODIVERSITY, MAX_BIODIVERSITY, FOREST_MAP_WIDTH, FOREST_MAP_HEIGHT,
  TILE_TYPES, TREE_TYPES, FOREST_AI_TRAINING_IMAGES, AI_TRAINING_COST_FOREST,
  DEPLOY_AI_FOREST_DATA_COST, DEPLOY_AI_FOREST_ENERGY_COST, AI_PLANTING_COUNT,
  INITIAL_FOREST_AI_ACCURACY,
  // Clean City
  INITIAL_CITY_AQI, INITIAL_CITY_ECONOMY, INITIAL_CITY_HAPPINESS,
  CITY_DECISIONS, CITY_DISTRICTS, MAX_CITY_STATS,CITY_TRAINING_PROPOSALS,
  DEPLOY_AI_CITY_DATA_COST, DEPLOY_AI_CITY_ENERGY_COST, AI_GENERATED_DECISION,
  INITIAL_CITY_AI_ACCURACY, AI_RECOMMENDATION_DISCOUNT,
  //Game Point
  MAX_ENERGY, UPGRADE_SOLAR_PANELS_COST, SOLAR_PANEL_ENERGY_GENERATION,
  UPGRADE_BIOMASS_GENERATOR_COST, BIOMASS_ENERGY_PER_STUMP

} from './constants/gameConstants';

// --- Utils & UI ---
import { playSound } from './utils/audio';
import Notification from './components/ui/Notification';
import Modal from './components/ui/Modal'; // <-- Import Modal
import Button from './components/ui/Button'; // <-- Import Button
import { useLanguage } from './utils/language'; // <-- Make sure useLanguage is imported

// --- Screen Components ---
import MainMenuScreen from './screens/MainMenuScreen';
import MissionSelectScreen from './screens/MissionSelectScreen';
import OceanMissionScreen from './screens/OceanMissionScreen';
import SortTrashMinigameScreen from './screens/SortTrashMinigameScreen';
import ForestMissionScreen from './screens/ForestMissionScreen';
import ForestAITrainingScreen from './screens/ForestAITrainingScreen';
import CityMissionScreen from './screens/CityMissionScreen'
import CityAITrainingScreen from './screens/CityAITrainingScreen';

// --- Helper Functions ---
const generateInitialForestMap = () => {
  return Array.from({ length: FOREST_MAP_HEIGHT }, (_, y) =>
    Array.from({ length: FOREST_MAP_WIDTH }, (_, x) => {
      let type = TILE_TYPES.EMPTY;
      const rand = Math.random();
      if (rand > 0.95) type = TILE_TYPES.MATURE;
      else if (rand > 0.9) type = TILE_TYPES.FIRE_RISK; // Add some fire risks
      else if (rand > 0.85) type = TILE_TYPES.DISEASED; // Add some diseased tiles
      
      return { id: `${x}-${y}`, x, y, type, treeId: null, growth: 0 };
    })
  );
};


// =================================================================
// --- THE MAIN APP COMPONENT ---
// =================================================================
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const {result } = useLanguage(); // Get the translation function

  // --- SHARED STATE ---
  const [dataPoints, setDataPoints] = useState(INITIAL_DATA_POINTS);
  const [energy, setEnergy] = useState(INITIAL_ENERGY);
  const [notifications, setNotifications] = useState([]);
  const [aiMood, setAiMood] = useState('neutralAI');
  const [aiDialogue, setAiDialogue] = useState('Hi! I am Eco, your AI helper!');

  // --- NEW STATE FOR LOW ENERGY POPUP ---
  const [showLowEnergyModal, setShowLowEnergyModal] = useState(false);
  // This flag prevents the modal from re-popping immediately if energy stays low
  const [hasSuggestedSolar, setHasSuggestedSolar] = useState(false); 


  // --- OCEAN MISSION STATE ---
  const [oceanHealth, setOceanHealth] = useState(INITIAL_OCEAN_HEALTH);
  const [aiAccuracy, setAiAccuracy] = useState(INITIAL_AI_ACCURACY);
  const [isOceanMissionCompleted, setIsOceanMissionCompleted] = useState(false);
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
  const [isForestMissionUnlocked, setIsForestMissionUnlocked] = useState(true);
  const [co2Level, setCo2Level] = useState(INITIAL_CO2_PPM);
  const [globalTemp, setGlobalTemp] = useState(1.1);
  const [biodiversity, setBiodiversity] = useState(INITIAL_BIODIVERSITY);
  const [forestCoverage, setForestCoverage] = useState(0);
  const [forestMap, setForestMap] = useState(generateInitialForestMap());
  const [forestNotifications, setForestNotifications] = useState([{id: Date.now(), type: 'info', message: 'Welcome to the Forest Guardian mission!'}]);
  const [aiForestTrainingIndex, setAiForestTrainingIndex] = useState(0);
  const [forestTrainingFeedback, setForestTrainingFeedback] = useState('');
  const [forestAIAccuracy, setForestAIAccuracy] = useState(INITIAL_FOREST_AI_ACCURACY);

  // --- ADD NEW STATE FOR THE CITY MISSION ---
  const [isCityMissionUnlocked, setIsCityMissionUnlocked] = useState(true); // Set true for testing
  const [cityAqi, setCityAqi] = useState(INITIAL_CITY_AQI);
  const [cityEconomy, setCityEconomy] = useState(INITIAL_CITY_ECONOMY);
  const [cityHappiness, setCityHappiness] = useState(INITIAL_CITY_HAPPINESS);
  const [cityDistricts, setCityDistricts] = useState(CITY_DISTRICTS);
  const [availableDecisions, setAvailableDecisions] = useState(CITY_DECISIONS);
  const [cityTrainingIndex, setCityTrainingIndex] = useState(0);
  const [cityTrainingFeedback, setCityTrainingFeedback] = useState('');
  const [cityAIAccuracy, setCityAIAccuracy] = useState(INITIAL_CITY_AI_ACCURACY);
  const [aiRecommendedDecisionId, setAiRecommendedDecisionId] = useState(null);

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
    } if (mission === 'CityMission' && isCityMissionUnlocked) {
      navigate('/missions/city');
    }
  },[isForestMissionUnlocked, isCityMissionUnlocked, addNotification, navigate, addForestNotification]);

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
      case 'sortSpeed':
        cost = UPGRADE_SORT_SPEED_COST;
        canAfford = dataPoints >= cost;
        alreadyOwned = hasUpgradeSortSpeed;
        if (canAfford && !alreadyOwned) {
          setHasUpgradeSortSpeed(true);
          successMsg = "Efficient Sorting Algorithm purchased!";
        }
        break;
      case 'efficientDeployment':
        cost = UPGRADE_EFFICIENT_DEPLOYMENT_COST;
        canAfford = dataPoints >= cost;
        alreadyOwned = hasUpgradeEfficientDeployment;
        if (canAfford && !alreadyOwned) {
          setHasUpgradeEfficientDeployment(true);
          successMsg = "Efficient Deployment System purchased!";
        }
        break;
      case 'advancedSensors':
        cost = UPGRADE_ADVANCED_SENSORS_COST;
        canAfford = dataPoints >= cost;
        alreadyOwned = hasUpgradeAdvancedSensors;
        if (canAfford && !alreadyOwned) {
          setHasUpgradeAdvancedSensors(true);
          setAiAccuracy(acc => Math.min(100, acc + 10)); // Immediate small accuracy boost
          successMsg = "Advanced Contaminant Sensors purchased! AI base accuracy increased.";
        }
        break;
      case 'solarPanels': // Case for buying solar panels
        cost = UPGRADE_SOLAR_PANELS_COST;
        canAfford = dataPoints >= cost;
        alreadyOwned = hasUpgradeSolarPanels;
        if (canAfford && !alreadyOwned) {
          setHasUpgradeSolarPanels(true);
          successMsg = "Solar Panels installed! You will now generate energy over time.";
          setHasSuggestedSolar(false); // Reset suggestion flag once purchased
        }
        break;
      case 'biomassGenerator':
        cost = UPGRADE_BIOMASS_GENERATOR_COST;
        canAfford = dataPoints >= cost;
        alreadyOwned = hasUpgradeBiomassGenerator;
        if (canAfford && !alreadyOwned) {
          setHasUpgradeBiomassGenerator(true);
          successMsg = "Biomass Generator constructed! You can now convert logged tiles into energy.";
        }
        break;
      default: return;
    }

    if (canAfford && !alreadyOwned) {
      setDataPoints(dp => dp - cost);
      setAiDialogue(successMsg);
      addNotification(successMsg, 'success');
    } else if (alreadyOwned) {
      addNotification("Upgrade already owned.", 'info');
    } else {
      addNotification("Not enough Data Points for this upgrade.", 'error');
    }
  }, [dataPoints, hasUpgradeSortSpeed, hasUpgradeEfficientDeployment, hasUpgradeAdvancedSensors, hasUpgradeBiomassGenerator, hasUpgradeSolarPanels, addNotification]);

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
      setAiForestTrainingIndex(0);
      setForestTrainingFeedback('');
      navigate('/missions/forest/train');
    } else {
      addForestNotification('Not enough energy to start an AI training session.', 'error');
    }
  }, [energy, navigate, addForestNotification]);

  const handleImageLabel = useCallback((image, selectedLabel) => {
    if (image.correctLabel === selectedLabel) {
      const dataGain = 15;
      setDataPoints(dp => dp + dataGain);
      setForestAIAccuracy(acc => Math.min(100, acc + 4)); // <-- INCREASE FOREST AI ACCURACY
      setForestTrainingFeedback(`Correct! +${dataGain} DP. AI Accuracy Increased!`);
      playSound('correct');
    } else {
      setForestAIAccuracy(acc => Math.max(0, acc - 2));
      setForestTrainingFeedback('Incorrect. AI Accuracy Decreased.');
      playSound('incorrect');
    }

    setTimeout(() => {
      if (aiForestTrainingIndex < FOREST_AI_TRAINING_IMAGES.length - 1) {
        setAiForestTrainingIndex(i => i + 1);
        setForestTrainingFeedback('');
      } else {
        navigate('/missions/forest');
        addForestNotification('AI training session complete!', 'info');
      }
    }, 1000);
  }, [aiForestTrainingIndex, navigate, addForestNotification]);

   const handleDeployAIForest = useCallback(() => {
    if (dataPoints < DEPLOY_AI_FOREST_DATA_COST || energy < DEPLOY_AI_FOREST_ENERGY_COST) { /* ... */ return; }

    setDataPoints(dp => dp - DEPLOY_AI_FOREST_DATA_COST);
    setEnergy(e => e - DEPLOY_AI_FOREST_ENERGY_COST);
    playSound('deploy');

    // AI logic: a chance to succeed based on accuracy
    if (Math.random() * 100 > forestAIAccuracy) {
      addForestNotification("AI Scan Failed: Accuracy too low to detect anything.", "error");
      return;
    }

    // SUCCESS: AI performs its tasks
    const threatTiles = forestMap.flat().filter(t => t.type === TILE_TYPES.DISEASED || t.type === TILE_TYPES.FIRE_RISK);
    const newMap = forestMap.map(row => row.map(cell => ({...cell})));

    if (threatTiles.length > 0) {
      // Priority 1: Handle a threat
      const tileToFix = threatTiles[0];
      const threatType = tileToFix.type;
      newMap[tileToFix.y][tileToFix.x].type = TILE_TYPES.EMPTY; // Fix the tile
      setForestMap(newMap);
      addForestNotification(`AI detected and neutralized a ${threatType.replace('_', ' ')} threat!`, 'success');
    } else {
      // Priority 2: Reforest if no threats are found
      const availableTiles = forestMap.flat().filter(tile => tile.type === TILE_TYPES.EMPTY);
      if (availableTiles.length === 0) { /* ... */ return; }
      
      const treeToPlant = TREE_TYPES.find(t => t.id === 'pine');
      const tilesToPlant = availableTiles.slice(0, AI_PLANTING_COUNT);
      let biodiversityGained = 0;

      tilesToPlant.forEach(tile => {
        newMap[tile.y][tile.x] = { ...newMap[tile.y][tile.x], type: TILE_TYPES.YOUNG, treeId: treeToPlant.id, growth: 0 };
        biodiversityGained += treeToPlant.biodiversityImpact;
      });
      
      setForestMap(newMap);
      setBiodiversity(b => Math.min(MAX_BIODIVERSITY, b + biodiversityGained));
      addForestNotification(`AI Scan Complete: No threats found. Planting ${tilesToPlant.length} new saplings.`, 'success');
    }
  }, [dataPoints, energy, forestMap, forestAIAccuracy, addForestNotification]);


  
  // --- NEW: LOGIC FOR CITY DECISIONS ---
  const handleApproveCityDecision = useCallback((decision) => {
      let finalCostDP = decision.costDP;
      let finalCostEnergy = decision.costEnergy;
      let wasDiscounted = false;
      if (decision.id === aiRecommendedDecisionId) {
        finalCostDP *= (1 - AI_RECOMMENDATION_DISCOUNT);
        finalCostEnergy *= (1 - AI_RECOMMENDATION_DISCOUNT);
        wasDiscounted = true;
      }
    if (dataPoints < decision.costDP || energy < decision.costEnergy) {
      addNotification("Not enough resources to enact this policy!", "error");
      return; 
    }

    // 1. Pay costs
    setDataPoints(dp => dp - finalCostDP);
    setEnergy(e => e - finalCostEnergy);
    playSound('deploy');

    // 2. Apply impacts
    const impacts = decision.impacts;
    if (impacts.aqi) setCityAqi(aqi => Math.max(0, aqi + impacts.aqi));
    if (impacts.economy) setCityEconomy(econ => Math.min(MAX_CITY_STATS, econ + impacts.economy));
    if (impacts.happiness) setCityHappiness(happy => Math.min(MAX_CITY_STATS, happy + impacts.happiness));

    // 3. Remove decision from list
    if (wasDiscounted) {
          addNotification(`AI Discount Applied! Enacted: ${decision.title}`, 'success');
          setAiRecommendedDecisionId(null); // Clear recommendation after use
        } else {
          addNotification(`Policy enacted: ${decision.title}`, 'success');
        }
    setAvailableDecisions(prev => prev.filter(d => d.id !== decision.id));
    addNotification(`Policy enacted: ${decision.title}`, 'success');
  }, [dataPoints, energy, addNotification, aiRecommendedDecisionId]);
 const handleStartCityTraining = useCallback(() => {
    setCityTrainingIndex(0);
    setCityTrainingFeedback('');
    navigate('/missions/city/train');
  }, [navigate]);

  const handleClassifyCityProposal = useCallback((proposal, answer, isFinished = false) => {
    if (isFinished) {
      navigate('/missions/city');
      return;
    }

    if (proposal.correctAnswer === answer) {
      const dataGain = 20;
      setDataPoints(dp => dp + dataGain);
      setCityAIAccuracy(acc => Math.min(100, acc + 5)); // <-- INCREASE AI ACCURACY
      setCityTrainingFeedback(`Correct! +${dataGain} DP. AI Accuracy Increased!`);
      playSound('correct');
    } else {
      setCityAIAccuracy(acc => Math.max(0, acc - 3)); // Penalty for being wrong
      setCityTrainingFeedback('Incorrect. AI Accuracy Decreased.');
      playSound('incorrect');
    }

    setTimeout(() => {
      if (cityTrainingIndex < CITY_TRAINING_PROPOSALS.length - 1) {
        setCityTrainingIndex(i => i + 1);
        setCityTrainingFeedback('');
      } else {
        navigate('/missions/city');
        addNotification('Policy review training complete!', 'success');
      }
    }, 1200);
  }, [cityTrainingIndex, addNotification, navigate]);
    const handleDeployAICity = useCallback(() => {
    if (dataPoints < DEPLOY_AI_CITY_DATA_COST || energy < DEPLOY_AI_CITY_ENERGY_COST) { /* ... */ }
    
    setDataPoints(dp => dp - DEPLOY_AI_CITY_DATA_COST);
    setEnergy(e => e - DEPLOY_AI_CITY_ENERGY_COST);
    playSound('deploy');
    setAiRecommendedDecisionId(null); // Clear previous recommendation

    // AI logic: a chance to succeed based on accuracy
    if (Math.random() * 100 < cityAIAccuracy) {
      // SUCCESS: Find the best policy
      let bestDecision = null;
      let bestScore = -Infinity;

      availableDecisions.forEach(decision => {
        // Simple scoring: prioritize big AQI improvements
        const score = (decision.impacts.aqi * -2) + (decision.impacts.happiness || 0) + (decision.impacts.economy || 0);
        if (score > bestScore) {
          bestScore = score;
          bestDecision = decision;
        }
      });
      
      if (bestDecision) {
        setAiRecommendedDecisionId(bestDecision.id);
        addNotification(`AI analysis complete! A high-impact policy has been recommended with a discount.`, 'success');
      } else {
        addNotification("AI could not find an optimal policy at this time.", "info");
      }
    } else {
      // FAILURE: AI is not smart enough
      addNotification("AI analysis failed: Accuracy too low. The AI couldn't determine the best policy.", "error");
    }
  }, [dataPoints, energy, availableDecisions, cityAIAccuracy, addNotification]);



  // --- USEEFFECT HOOKS ---

  // Ocean Mission Completion Check
  useEffect(() => {
    if (oceanHealth >= MAX_OCEAN_HEALTH && !isOceanMissionCompleted) {
      setIsOceanMissionCompleted(true);
      setIsForestMissionUnlocked(true);
      setAiDialogue("Fantastic! The Ocean Mission is complete! A new challenge awaits!");
      setAiMood('happyAI');
      addNotification("Ocean Mission Complete! Forest Mission Unlocked!", 'success');
    }
  }, [oceanHealth, isOceanMissionCompleted, addNotification]);

  // AI Dialogue & Mood based on current mission state
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
  
  // Minigame Timer for SortTrashMinigame
  useEffect(() => {
    if (location.pathname === '/missions/ocean/train' && minigameTimeLeft > 0) {
      minigameTimerRef.current = setInterval(() => setMinigameTimeLeft(t => t - 1), 1000);
    } else if (minigameTimeLeft <= 0 && location.pathname === '/missions/ocean/train') {
      clearInterval(minigameTimerRef.current);
      endMinigame(false);
    }
    return () => clearInterval(minigameTimerRef.current);
  }, [location.pathname, minigameTimeLeft, endMinigame]);

  // Game Tick for passive actions (solar, forest growth)
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
      setCityAqi(aqi => aqi + 0.2);
    }, 2300); // This interval affects how often solar panels generate too.

    return () => clearInterval(gameTick);
  }, [forestMap, co2Level, hasUpgradeSolarPanels]); // Dependencies ensure it re-runs if these change
 // --- UPDATE DISTRICT AQI EFFECT ---
  useEffect(() => {
    // This makes the map visually update based on the average AQI
    setCityDistricts(prevDistricts =>
      prevDistricts.map(dist => ({
        ...dist,
        aqi: Math.round(dist.baseAqi * (cityAqi / INITIAL_CITY_AQI)),
      }))
    );
  }, [cityAqi]);

  // --- NEW: Low Energy Popup Trigger ---
  useEffect(() => {
    // Conditions to show the modal:
    // 1. Solar Panels are NOT owned
    // 2. Energy is below the threshold
    // 3. We haven't already suggested it in this 'low energy' state
    if (!hasUpgradeSolarPanels && energy < LOW_ENERGY_THRESHOLD && !hasSuggestedSolar) {
      setShowLowEnergyModal(true);
      setHasSuggestedSolar(true); // Mark as suggested for this low energy period
      setAiDialogue(result.alertsLowEnergy.lowEnergyTitle); // AI helper also reacts
      setAiMood('concernedAI');
      addNotification(result.alertsLowEnergy.lowEnergyTitle, 'warning');
      playSound('warning'); // Play a sound for the alert
    }

    // Reset `hasSuggestedSolar` when energy recovers (so it can pop up again if energy drops later)
    if (energy >= LOW_ENERGY_THRESHOLD && hasSuggestedSolar) {
      setHasSuggestedSolar(false);
    }
    // If solar panels are bought, ensure the suggestion flag is permanently reset
    // (This is also handled in buyUpgrade, but a redundant check here ensures it)
    if (hasUpgradeSolarPanels && hasSuggestedSolar) {
      setHasSuggestedSolar(false);
    }
  }, [energy, hasUpgradeSolarPanels, hasSuggestedSolar, addNotification, result]); // Add `t` to dependencies

  // --- JSX RENDER ---
  return (
    <div className="App">
      <div className="notification-area">
        {notifications.map(n => <Notification key={n.id} {...n} onDismiss={() => dismissNotification(n.id)} />)}
      </div>
      
      <Routes>
        <Route path="/" element={<MainMenuScreen onAddNotification={addNotification} aiMood={aiMood} />} />
        <Route path="/missions" element={<MissionSelectScreen onStartMission={startMission} isOceanMissionCompleted={isOceanMissionCompleted} isForestMissionUnlocked={isForestMissionUnlocked} isCityMissionUnlocked={isCityMissionUnlocked} />} />
        
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
            forestAIAccuracy={forestAIAccuracy} // <-- Pass new accuracy stat
            upgrades={{ hasUpgradeSolarPanels, hasUpgradeBiomassGenerator }}
            
          />
        }/>
        <Route path="/missions/forest/train" element={
          <ForestAITrainingScreen
            trainingImages={FOREST_AI_TRAINING_IMAGES}
            currentImageIndex={aiForestTrainingIndex}
            onImageLabel={handleImageLabel}
            onEndTraining={() => navigate('/missions/forest')}
            dataPoints={dataPoints}
            forestTrainingFeedback={forestTrainingFeedback}
          />
        }/>

          <Route path="/missions/city" element={
            <CityMissionScreen
              cityAqi={cityAqi}
              cityEconomy={cityEconomy}
              cityHappiness={cityHappiness}
              cityDistricts={cityDistricts}
              cityDecisions={availableDecisions}
              dataPoints={dataPoints}
              energy={energy}
              upgrades={{ hasUpgradeSortSpeed, hasUpgradeEfficientDeployment, hasUpgradeAdvancedSensors, hasUpgradeSolarPanels, hasUpgradeBiomassGenerator }}
              onApproveDecision={handleApproveCityDecision}
              onStartCityTraining={handleStartCityTraining}
              cityAIAccuracy={cityAIAccuracy}
              aiRecommendedDecisionId={aiRecommendedDecisionId}
              onDeployAICity={handleDeployAICity} // <-- Pass Deploy function
              onBuyUpgrade={buyUpgrade}          // <-- Pass Upgrade function
            />
          } />
         <Route path="/missions/city/train" element={
          <CityAITrainingScreen
            proposals={CITY_TRAINING_PROPOSALS}
            currentIndex={cityTrainingIndex}
            onClassify={handleClassifyCityProposal}
            feedback={cityTrainingFeedback}
            dataPoints={dataPoints}
          />
        } />
      </Routes>
        {
          console.log(result  )
        }
      {/* Low Energy Solar Suggestion Modal */}
      <Modal
        show={showLowEnergyModal}
        onClose={() => setShowLowEnergyModal(false)}
        title={result.alertsLowEnergy.lowEnergyTitle} 
      >
        <p>{result.alertsLowEnergy.lowEnergyMessagePart1}</p>
        <p>{result.alertsLowEnergy.lowEnergyMessagePart2}</p>
        <Button onClick={() => setShowLowEnergyModal(false)}>{result.alertsLowEnergy.gotItButton}</Button>
      </Modal>
    </div>
  );
}

export default App;