import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

// --- Components and Utils ---
import { playSound } from './utils/audio';
import Notification from './components/ui/Notification';
import Modal from './components/ui/Modal';
import Button from './components/ui/Button';
import Icon from './components/ui/Icon';
import { useLanguage } from './utils/language';
import { musicTracks } from './data/music'
// --- Screens ---
import MainMenuScreen from './screens/MainMenuScreen';
import MissionSelectScreen from './screens/MissionSelectScreen';
import OceanMissionScreen from './screens/OceanMissionScreen';
import SortTrashMinigameScreen from './screens/SortTrashMinigameScreen';
import ForestMissionScreen from './screens/ForestMissionScreen';
import ForestAITrainingScreen from './screens/ForestAITrainingScreen';
import CityMissionScreen from './screens/CityMissionScreen'
import CityAITrainingScreen from './screens/CityAITrainingScreen';

// --- Constants (assuming they are in the correct file) ---
import {
  INITIAL_DATA_POINTS, INITIAL_ENERGY, LOW_ENERGY_THRESHOLD, MAX_ENERGY,
  INITIAL_OCEAN_HEALTH, INITIAL_AI_ACCURACY, MAX_OCEAN_HEALTH, DEPLOY_AI_DATA_COST, DEPLOY_AI_ENERGY_COST,
  UPGRADE_SORT_SPEED_COST, UPGRADE_EFFICIENT_DEPLOYMENT_COST, UPGRADE_ADVANCED_SENSORS_COST,
  TRASH_ITEMS_DATA, MINIGAME_DURATION_SECONDS, MINIGAME_QUICK_BONUS_THRESHOLD, MINIGAME_QUICK_BONUS_DP,
  INITIAL_CO2_PPM, INITIAL_BIODIVERSITY, MAX_BIODIVERSITY, FOREST_MAP_WIDTH, FOREST_MAP_HEIGHT,
  TILE_TYPES, TREE_TYPES, FOREST_AI_TRAINING_IMAGES, AI_TRAINING_COST_FOREST,
  DEPLOY_AI_FOREST_DATA_COST, DEPLOY_AI_FOREST_ENERGY_COST,
  INITIAL_FOREST_AI_ACCURACY,
  INITIAL_CITY_AQI, INITIAL_CITY_ECONOMY, INITIAL_CITY_HAPPINESS,
  CITY_DECISIONS, CITY_DISTRICTS, MAX_CITY_STATS, CITY_TRAINING_PROPOSALS,
  DEPLOY_AI_CITY_DATA_COST, DEPLOY_AI_CITY_ENERGY_COST, AI_GENERATED_DECISION,
  INITIAL_CITY_AI_ACCURACY, AI_RECOMMENDATION_DISCOUNT,
  UPGRADE_SOLAR_PANELS_COST, SOLAR_PANEL_ENERGY_GENERATION,
  UPGRADE_BIOMASS_GENERATOR_COST, BIOMASS_ENERGY_PER_STUMP
} from './constants/gameConstants';


// --- Helper Functions ---
const generateInitialForestMap = () => {
    return Array.from({ length: FOREST_MAP_HEIGHT }, (_, y) =>
      Array.from({ length: FOREST_MAP_WIDTH }, (_, x) => {
        let type = TILE_TYPES.EMPTY;
        const rand = Math.random();
        if (rand > 0.95) type = TILE_TYPES.MATURE;
        else if (rand > 0.9) type = TILE_TYPES.FIRE_RISK;
        else if (rand > 0.85) type = TILE_TYPES.DISEASED;
        return { id: `${x}-${y}`, x, y, type, treeId: null, growth: 0 };
      })
    );
};


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, language } = useLanguage();

  // --- FIX 1: Add a loading state check at the very top ---
  // This prevents the app from crashing before translations are loaded.
  if (!result.app || !result.gameData || !result.alertsLowEnergy) {
    return <div className="App">Loading...</div>;
  }
  const text = result.app;
  const gameData = result.gameData;
  // --- End of Fix 1 ---

  const [activeTutorial, setActiveTutorial] = useState({ mission: null, step: 1 });

  const startTutorial = (missionName) => {
    setActiveTutorial({ mission: missionName, step: 1 });
  };
  const advanceTutorial = () => {
    setActiveTutorial(prev => ({ ...prev, step: prev.step + 1 }));
  };
  const endTutorial = () => {
    setActiveTutorial({ mission: null, step: 1 });
  };
  
  const [dataPoints, setDataPoints] = useState(INITIAL_DATA_POINTS);
  const [energy, setEnergy] = useState(INITIAL_ENERGY);
  const [aiMood, setAiMood] = useState('neutralAI');
  // --- FIX 2: Use translated initial dialogue ---
  const [aiDialogue, setAiDialogue] = useState(text.initialDialogue);
  
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentTrackSrc, setCurrentTrackSrc] = useState(musicTracks[0].src);

  // ... (All other state hooks are the same)
  const [toasts, setToasts] = useState([]);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showLowEnergyModal, setShowLowEnergyModal] = useState(false);
  const [hasSuggestedSolar, setHasSuggestedSolar] = useState(false);
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
  const [isForestMissionUnlocked, setIsForestMissionUnlocked] = useState(true);
  const [co2Level, setCo2Level] = useState(INITIAL_CO2_PPM);
  const [globalTemp, setGlobalTemp] = useState(1.1);
  const [biodiversity, setBiodiversity] = useState(INITIAL_BIODIVERSITY);
  const [forestCoverage, setForestCoverage] = useState(0);
  const [forestMap, setForestMap] = useState(generateInitialForestMap());
  const [forestNotifications, setForestNotifications] = useState([]); // Start empty
  const [aiForestTrainingIndex, setAiForestTrainingIndex] = useState(0);
  const [forestTrainingFeedback, setForestTrainingFeedback] = useState('');
  const [forestAIAccuracy, setForestAIAccuracy] = useState(INITIAL_FOREST_AI_ACCURACY);
  const [isCityMissionUnlocked, setIsCityMissionUnlocked] = useState(true);
  const [cityAqi, setCityAqi] = useState(INITIAL_CITY_AQI);
  const [cityEconomy, setCityEconomy] = useState(INITIAL_CITY_ECONOMY);
  const [cityHappiness, setCityHappiness] = useState(INITIAL_CITY_HAPPINESS);
  const [cityDistricts, setCityDistricts] = useState(CITY_DISTRICTS);
  const [availableDecisions, setAvailableDecisions] = useState(CITY_DECISIONS);
  const [cityTrainingIndex, setCityTrainingIndex] = useState(0);
  const [cityTrainingFeedback, setCityTrainingFeedback] = useState('');
  const [cityAIAccuracy, setCityAIAccuracy] = useState(INITIAL_CITY_AI_ACCURACY);
  const [aiRecommendedDecisionId, setAiRecommendedDecisionId] = useState(null);


  const handleMusicChange = (newTrackSrc) => {
    setCurrentTrackSrc(newTrackSrc);
  };
   useEffect(() => {
    const audio = audioRef.current;
    if (audio && isMusicPlaying) {
        audio.load();
        audio.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [currentTrackSrc, isMusicPlaying]);
  
  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    const newNotification = { id, message, type };
    setNotificationHistory(prev => [newNotification, ...prev.slice(0, 49)]);
    setToasts(prev => [...prev, newNotification]);
    setTimeout(() => {
      setToasts(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const addForestNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setForestNotifications(prev => [...prev.slice(-10), { id, message, type }]);
  }, []);

  // --- START OF TRANSLATED FUNCTIONS ---

  const startMission = useCallback((mission) => {
    if (mission === 'OceanMission') {
      navigate('/missions/ocean');
      setAiDialogue(text.dialogue.oceanWelcome);
      setAiMood('neutralAI');
    } else if (mission === 'ForestMission' && isForestMissionUnlocked) {
      navigate('/missions/forest');
      // No initial notification to avoid spamming.
    } else if (mission === 'ForestMission' && !isForestMissionUnlocked) {
      addNotification(text.notifications.unlockForest, "error");
    } if (mission === 'CityMission' && isCityMissionUnlocked) {
      navigate('/missions/city');
    }
  }, [isForestMissionUnlocked, isCityMissionUnlocked, addNotification, navigate, text]);

  const endMinigame = useCallback((completedAllItems = true, timeTaken) => {
    if (completedAllItems && timeTaken && timeTaken <= MINIGAME_QUICK_BONUS_THRESHOLD) {
      const bonusDP = MINIGAME_QUICK_BONUS_DP;
      setDataPoints(dp => dp + bonusDP);
      setMinigameFeedback(text.feedback.minigameBonus.replace('{value}', bonusDP));
    } else {
      setMinigameFeedback(text.feedback.minigameEnd);
    }
    setTimeout(() => {
      navigate('/missions/ocean');
      setAiDialogue(text.dialogue.minigameEnd);
      setAiMood('neutralAI');
    }, 2000);
  }, [navigate, text]);

  const handleSortItem = useCallback((item, selectedBinType) => {
    if (item.type === selectedBinType) {
      playSound('correct');
      const dataGain = hasUpgradeSortSpeed ? 15 : 10;
      setDataPoints(dp => dp + dataGain);
      setAiAccuracy(acc => Math.min(100, acc + (hasUpgradeAdvancedSensors ? 2 : 1)));
      setMinigameFeedback(text.feedback.minigameCorrect.replace('{value}', dataGain));
    } else {
      playSound('incorrect');
      setAiAccuracy(acc => Math.max(0, acc - 2));
      setMinigameFeedback(text.feedback.minigameIncorrect.replace('{type}', item.type));
      addNotification(text.notifications.incorrectSort, "error");
    }
    if (currentItemIndex < minigameItems.length - 1) {
      setCurrentItemIndex(idx => idx + 1);
    } else {
      endMinigame(true, 999); // timeTaken is missing, passing a default value.
    }
  }, [hasUpgradeSortSpeed, hasUpgradeAdvancedSensors, addNotification, currentItemIndex, minigameItems.length, endMinigame, text]);

  const handleDeployAI = useCallback(() => {
    if (dataPoints >= DEPLOY_AI_DATA_COST && energy >= DEPLOY_AI_ENERGY_COST) {
      playSound('deploy');
      setDataPoints(dp => dp - DEPLOY_AI_DATA_COST);
      setEnergy(e => e - DEPLOY_AI_ENERGY_COST);
      let effectiveness = aiAccuracy / (hasUpgradeAdvancedSensors ? 8 : 10);
      if (hasUpgradeEfficientDeployment) effectiveness *= 1.5;
      const healthImprovement = Math.floor(effectiveness + 10);
      setOceanHealth(oh => Math.min(MAX_OCEAN_HEALTH, oh + healthImprovement));
      setAiDialogue(text.dialogue.oceanDeploy.replace('{value}', healthImprovement));
      setAiMood('happyAI');
      addNotification(text.notifications.deploySuccess.replace('{value}', healthImprovement), 'success');
    } else {
      let errorMsg = text.notifications.deployFail;
      if (dataPoints < DEPLOY_AI_DATA_COST) errorMsg += text.notifications.deployFailDP;
      if (energy < DEPLOY_AI_ENERGY_COST) errorMsg += text.notifications.deployFailEnergy;
      setAiDialogue(errorMsg);
      setAiMood('concernedAI');
      addNotification(errorMsg, 'error');
    }
  }, [dataPoints, energy, aiAccuracy, hasUpgradeAdvancedSensors, hasUpgradeEfficientDeployment, addNotification, text]);

  const buyUpgrade = useCallback((upgradeType) => {
    let cost = 0; let canAfford = false; let alreadyOwned = false; let successMsg = "";
    switch (upgradeType) {
      case 'sortSpeed':
        cost = UPGRADE_SORT_SPEED_COST; alreadyOwned = hasUpgradeSortSpeed;
        if (!alreadyOwned) successMsg = text.dialogue.upgradeSort; break;
      case 'efficientDeployment':
        cost = UPGRADE_EFFICIENT_DEPLOYMENT_COST; alreadyOwned = hasUpgradeEfficientDeployment;
        if (!alreadyOwned) successMsg = text.dialogue.upgradeDeploy; break;
      case 'advancedSensors':
        cost = UPGRADE_ADVANCED_SENSORS_COST; alreadyOwned = hasUpgradeAdvancedSensors;
        if (!alreadyOwned) successMsg = text.dialogue.upgradeSensors; break;
      case 'solarPanels':
        cost = UPGRADE_SOLAR_PANELS_COST; alreadyOwned = hasUpgradeSolarPanels;
        if (!alreadyOwned) successMsg = text.dialogue.upgradeSolar; break;
      case 'biomassGenerator':
        cost = UPGRADE_BIOMASS_GENERATOR_COST; alreadyOwned = hasUpgradeBiomassGenerator;
        if (!alreadyOwned) successMsg = text.dialogue.upgradeBiomass; break;
      default: return;
    }
    canAfford = dataPoints >= cost;
    if (canAfford && !alreadyOwned) {
      setDataPoints(dp => dp - cost);
      if (upgradeType === 'sortSpeed') setHasUpgradeSortSpeed(true);
      if (upgradeType === 'efficientDeployment') setHasUpgradeEfficientDeployment(true);
      if (upgradeType === 'advancedSensors') { setHasUpgradeAdvancedSensors(true); setAiAccuracy(acc => Math.min(100, acc + 10)); }
      if (upgradeType === 'solarPanels') { setHasUpgradeSolarPanels(true); setHasSuggestedSolar(false); }
      if (upgradeType === 'biomassGenerator') setHasUpgradeBiomassGenerator(true);
      setAiDialogue(successMsg); addNotification(successMsg, 'success');
    } else if (alreadyOwned) { addNotification(text.notifications.upgradeOwned, 'info');
    } else { addNotification(text.notifications.upgradeAfford, 'error'); }
  }, [dataPoints, hasUpgradeSortSpeed, hasUpgradeEfficientDeployment, hasUpgradeAdvancedSensors, hasUpgradeBiomassGenerator, hasUpgradeSolarPanels, addNotification, text]);

  const startSortTrashMinigame = useCallback(() => {
    const shuffledItems = [...TRASH_ITEMS_DATA].sort(() => 0.5 - Math.random());
    setMinigameItems(shuffledItems);
    setCurrentItemIndex(0);
    setMinigameFeedback('');
    setAiDialogue(text.dialogue.minigameStart);
    setAiMood('thinkingAI');
    if (activeTutorial.mission === 'ocean' && activeTutorial.step === 3) {
      advanceTutorial(); 
    }
    navigate('/missions/ocean/train');
  }, [navigate, activeTutorial, text]);

  useEffect(() => {
    if (activeTutorial.mission === 'ocean' && activeTutorial.step === 4 && location.pathname === '/missions/ocean') {
      advanceTutorial();
    }
    if (activeTutorial.mission === 'forest' && activeTutorial.step === 4 && location.pathname === '/missions/forest') {
      advanceTutorial();
    }
    if (activeTutorial.mission === 'city' && activeTutorial.step === 4 && location.pathname === '/missions/city') {
      advanceTutorial();
    }
  }, [location.pathname, activeTutorial]);

  const convertBiomassToEnergy = useCallback(() => {
    if (!hasUpgradeBiomassGenerator) return;
    const loggedTiles = forestMap.flat().filter(tile => tile.type === TILE_TYPES.LOGGED);
    if (loggedTiles.length === 0) { addForestNotification(text.notifications.noBiomass, "error"); return; }
    const tileToConvert = loggedTiles[0];
    const newEnergy = BIOMASS_ENERGY_PER_STUMP;
    setEnergy(e => Math.min(MAX_ENERGY, e + newEnergy));
    const newMap = forestMap.map(row => row.map(cell => ({ ...cell })));
    newMap[tileToConvert.y][tileToConvert.x].type = TILE_TYPES.EMPTY;
    newMap[tileToConvert.y][tileToConvert.x].treeId = null;
    setForestMap(newMap);
    addForestNotification(text.notifications.biomassSuccess.replace('{value}', newEnergy), "success");
    playSound('deploy');
  }, [forestMap, hasUpgradeBiomassGenerator, addForestNotification, text]);

  const handlePlantTree = useCallback((x, y, tree) => {
    const tile = forestMap[y][x];
    const treeName = gameData.treeTypes[tree.id]?.name || tree.id;
    if (tile.type === TILE_TYPES.EMPTY && dataPoints >= tree.cost) {
      setDataPoints(dp => dp - tree.cost);
      const newMap = forestMap.map(row => row.map(cell => ({ ...cell })));
      newMap[y][x] = { ...newMap[y][x], type: TILE_TYPES.YOUNG, treeId: tree.id, growth: 0 };
      setForestMap(newMap);
      setBiodiversity(b => Math.min(MAX_BIODIVERSITY, b + tree.biodiversityImpact));
      addForestNotification(text.notifications.plantSuccess.replace('{name}', treeName).replace('{x}', x).replace('{y}', y), 'success');
    } else if (dataPoints < tree.cost) {
      addForestNotification(text.notifications.plantFail.replace('{name}', treeName), 'error');
    }
  }, [forestMap, dataPoints, addForestNotification, gameData, text]);

  const handleStartForestTraining = useCallback(() => {
    if (energy >= AI_TRAINING_COST_FOREST) {
      if (activeTutorial.mission === 'forest' && activeTutorial.step === 3) { advanceTutorial(); }
      setAiForestTrainingIndex(0);
      setForestTrainingFeedback('');
      navigate('/missions/forest/train');
    } else { addForestNotification(text.notifications.forestTrainFail, 'error'); }
  }, [energy, navigate, activeTutorial, text]);

  const handleImageLabel = useCallback((image, selectedLabel) => {
    if (image.correctLabel === selectedLabel) {
      const dataGain = 15;
      setDataPoints(dp => dp + dataGain);
      setForestAIAccuracy(acc => Math.min(100, acc + 4));
      setForestTrainingFeedback(text.feedback.forestTrainCorrect.replace('{value}', dataGain));
      playSound('correct');
    } else {
      setForestAIAccuracy(acc => Math.max(0, acc - 2));
      setForestTrainingFeedback(text.feedback.forestTrainIncorrect);
      playSound('incorrect');
    }
    setTimeout(() => {
      if (aiForestTrainingIndex < FOREST_AI_TRAINING_IMAGES.length - 1) {
        setAiForestTrainingIndex(i => i + 1); setForestTrainingFeedback('');
      } else { navigate('/missions/forest'); addForestNotification(text.notifications.forestTrainComplete, 'info'); }
    }, 1000);
  }, [aiForestTrainingIndex, navigate, addForestNotification, text]);

  const handleDeployAIForest = useCallback(() => {
    if (dataPoints < DEPLOY_AI_FOREST_DATA_COST || energy < DEPLOY_AI_FOREST_ENERGY_COST) {
      addForestNotification(text.notifications.forestDeployFail, "error"); return;
    }
    setDataPoints(dp => dp - DEPLOY_AI_FOREST_DATA_COST);
    setEnergy(e => e - DEPLOY_AI_FOREST_ENERGY_COST);
    playSound('deploy');
    const totalTiles = FOREST_MAP_WIDTH * FOREST_MAP_HEIGHT;
    const scanPower = Math.floor(totalTiles * (forestAIAccuracy / 100));
    if (scanPower < 1) { addForestNotification(text.notifications.forestScanLowAcc, "info"); return; }
    const allTiles = forestMap.flat();
    const tilesToScan = [...allTiles].sort(() => 0.5 - Math.random()).slice(0, scanPower);
    const newMap = JSON.parse(JSON.stringify(forestMap));
    let threatFound = false;
    for (const tile of tilesToScan) {
      if (tile.type === TILE_TYPES.DISEASED || tile.type === TILE_TYPES.FIRE_RISK) {
        const threatType = tile.type; newMap[tile.y][tile.x].type = TILE_TYPES.EMPTY; setForestMap(newMap);
        addForestNotification(text.notifications.forestScanThreat.replace('{name}', threatType.replace('_', ' ')), 'success');
        threatFound = true; break;
      }
    }
    if (!threatFound) {
      const emptyTiles = tilesToScan.filter(t => t.type === TILE_TYPES.EMPTY);
      if (emptyTiles.length === 0) { addForestNotification(text.notifications.forestScanNoThreat.replace('{value}', scanPower), "info"); return; }
      const treeToPlant = TREE_TYPES.find(t => t.id === 'pine');
      const spotsToPlant = emptyTiles.slice(0, 3); let biodiversityGained = 0;
      spotsToPlant.forEach(tile => {
        newMap[tile.y][tile.x] = {...tile, type: TILE_TYPES.YOUNG, treeId: treeToPlant.id, growth: 0};
        biodiversityGained += treeToPlant.biodiversityImpact;
      });
      setForestMap(newMap);
      setBiodiversity(b => Math.min(MAX_BIODIVERSITY, b + biodiversityGained));
      addForestNotification(text.notifications.forestScanPlant.replace('{value}', scanPower).replace('{count}', spotsToPlant.length), 'success');
    }
  }, [dataPoints, energy, forestMap, forestAIAccuracy, addForestNotification, text]);

  const handleApproveCityDecision = useCallback((decision) => {
    let finalCostDP = decision.costDP; let finalCostEnergy = decision.costEnergy; let wasDiscounted = false;
    if (decision.id === aiRecommendedDecisionId) { finalCostDP *= (1 - AI_RECOMMENDATION_DISCOUNT); finalCostEnergy *= (1 - AI_RECOMMENDATION_DISCOUNT); wasDiscounted = true; }
    if (dataPoints < finalCostDP || energy < finalCostEnergy) { addNotification(text.notifications.cityPolicyFail, "error"); return; }
    setDataPoints(dp => dp - finalCostDP); setEnergy(e => e - finalCostEnergy); playSound('deploy');
    const impacts = decision.impacts;
    if (impacts.aqi) setCityAqi(aqi => Math.max(0, aqi + impacts.aqi));
    if (impacts.economy) setCityEconomy(econ => Math.min(MAX_CITY_STATS, econ + impacts.economy));
    if (impacts.happiness) setCityHappiness(happy => Math.min(MAX_CITY_STATS, happy + impacts.happiness));
    setAiRecommendedDecisionId(null);
    if (wasDiscounted) { addNotification(text.notifications.cityPolicyDiscount.replace('{name}', decision.title), 'success');
    } else { addNotification(text.notifications.cityPolicySuccess.replace('{name}', decision.title), 'success'); }
    setAvailableDecisions(prev => prev.filter(d => d.id !== decision.id));
  }, [dataPoints, energy, addNotification, aiRecommendedDecisionId, text]);

  const handleStartCityTraining = useCallback(() => {
    if (activeTutorial.mission === 'city' && activeTutorial.step === 3) { advanceTutorial(); }
    setCityTrainingIndex(0); setCityTrainingFeedback(''); navigate('/missions/city/train');
  }, [navigate, activeTutorial]);

  const handleClassifyCityProposal = useCallback((proposal, answer, isFinished = false) => {
    if (isFinished) { navigate('/missions/city'); return; }
    if (proposal.correctAnswer === answer) {
      const dataGain = 20; setDataPoints(dp => dp + dataGain); setCityAIAccuracy(acc => Math.min(100, acc + 5));
      setCityTrainingFeedback(text.feedback.cityTrainCorrect.replace('{value}', dataGain)); playSound('correct');
    } else {
      setCityAIAccuracy(acc => Math.max(0, acc - 3)); setCityTrainingFeedback(text.feedback.cityTrainIncorrect); playSound('incorrect');
    }
    setTimeout(() => {
      if (cityTrainingIndex < CITY_TRAINING_PROPOSALS.length - 1) {
        setCityTrainingIndex(i => i + 1); setCityTrainingFeedback('');
      } else { navigate('/missions/city'); addNotification(text.notifications.cityTrainComplete, 'success'); }
    }, 1200);
  }, [cityTrainingIndex, addNotification, navigate, text]);

  const handleDeployAICity = useCallback(() => {
    if (dataPoints < DEPLOY_AI_CITY_DATA_COST || energy < DEPLOY_AI_CITY_ENERGY_COST) { addNotification(text.notifications.deployFail, "error"); return; }
    if (availableDecisions.find(d => d.id === AI_GENERATED_DECISION.id)) { addNotification(text.notifications.cityAIDupe, "info"); return; }
    setDataPoints(dp => dp - DEPLOY_AI_CITY_DATA_COST); setEnergy(e => e - DEPLOY_AI_CITY_ENERGY_COST); playSound('deploy');
    setAiRecommendedDecisionId(null); setAvailableDecisions(prev => [AI_GENERATED_DECISION, ...prev]);
    addNotification(text.notifications.cityDeploySuccess, 'success');
    if (Math.random() * 100 < cityAIAccuracy) {
      let bestDecision = null; let bestScore = -Infinity;
      availableDecisions.forEach(decision => {
        const score = (decision.impacts.aqi * -2) + (decision.impacts.happiness || 0) + (decision.impacts.economy || 0);
        if (score > bestScore) { bestScore = score; bestDecision = decision; }
      });
      if (bestDecision) { setAiRecommendedDecisionId(bestDecision.id); addNotification(text.notifications.cityDeployRecommend, 'success');
      } else { addNotification(text.notifications.cityDeployRecommendFail, "info"); }
    } else {
      const refundDP = Math.round(DEPLOY_AI_CITY_DATA_COST * 0.75);
      const refundEnergy = Math.round(DEPLOY_AI_CITY_ENERGY_COST * 0.75);
      setDataPoints(dp => dp + refundDP); setEnergy(e => e + refundEnergy);
      addNotification(text.notifications.cityDeployAccFail.replace('{dp}', refundDP).replace('{energy}', refundEnergy), "error");
    }
  }, [dataPoints, energy, availableDecisions, cityAIAccuracy, addNotification, text]);

  const toggleMusic = () => {
    const shouldBePlaying = !isMusicPlaying; setIsMusicPlaying(shouldBePlaying);
    const audio = audioRef.current;
    if (audio) { if (shouldBePlaying) { audio.volume = 1.0; audio.play().catch(e => console.error("Audio play failed:", e)); } else { audio.pause(); } }
  };

  useEffect(() => {
    if (oceanHealth >= MAX_OCEAN_HEALTH && !isOceanMissionCompleted) {
      setIsOceanMissionCompleted(true); setIsForestMissionUnlocked(true);
      setAiDialogue(text.dialogue.oceanComplete); setAiMood('happyAI');
      addNotification(text.notifications.oceanComplete, 'success');
    }
  }, [oceanHealth, isOceanMissionCompleted, addNotification, text]);

  useEffect(() => {
    if (location.pathname === '/missions/ocean') {
      if (oceanHealth < 30) { setAiDialogue(text.dialogue.oceanPolluted); setAiMood('concernedAI'); }
      else if (oceanHealth > 80 && oceanHealth < MAX_OCEAN_HEALTH) { setAiDialogue(text.dialogue.oceanProgress); setAiMood('happyAI'); }
      else if (dataPoints < DEPLOY_AI_DATA_COST) { setAiDialogue(text.dialogue.oceanNeedDP); setAiMood('thinkingAI'); }
      else if (energy < DEPLOY_AI_ENERGY_COST) { setAiDialogue(text.dialogue.oceanNeedEnergy); setAiMood('concernedAI'); }
      else if (!isOceanMissionCompleted) { setAiDialogue(text.dialogue.oceanReady); setAiMood('neutralAI'); }
    } else if (location.pathname === '/') { setAiDialogue(text.initialDialogue); setAiMood('neutralAI'); }
  }, [oceanHealth, dataPoints, energy, location.pathname, isOceanMissionCompleted, text]);

  useEffect(() => {
    const gameTick = setInterval(() => {
      if (hasUpgradeSolarPanels) { setEnergy(e => Math.min(MAX_ENERGY, e + SOLAR_PANEL_ENERGY_GENERATION)); }
      let co2Reduction = 0; let matureTrees = 0; let youngTrees = 0; let mapNeedsUpdate = false;
      const newMap = forestMap.map(row => row.map(tile => {
        const newTile = { ...tile };
        const treeData = TREE_TYPES.find(t => t.id === newTile.treeId);
        if (treeData) {
          if (newTile.type === TILE_TYPES.YOUNG) {
            youngTrees++; co2Reduction += treeData.co2Absorption * 0.5; newTile.growth++;
            if (newTile.growth >= treeData.growthTicks) { newTile.type = TILE_TYPES.MATURE; mapNeedsUpdate = true; }
          } else if (newTile.type === TILE_TYPES.MATURE) { matureTrees++; co2Reduction += treeData.co2Absorption; }
        }
        return newTile;
      }));
      if (mapNeedsUpdate) setForestMap(newMap);
      setCo2Level(co2 => Math.max(350, co2 - co2Reduction + 0.15));
      setGlobalTemp(1.1 + (co2Level - 420) * 0.05);
      setForestCoverage(Math.round(((matureTrees + youngTrees) / (FOREST_MAP_WIDTH * FOREST_MAP_HEIGHT)) * 100));
      setCityAqi(aqi => aqi + 0.2);
    }, 2300);
    return () => clearInterval(gameTick);
  }, [forestMap, co2Level, hasUpgradeSolarPanels]);

  useEffect(() => {
    setCityDistricts(prevDistricts =>
      prevDistricts.map(dist => ({ ...dist, aqi: Math.round(dist.baseAqi * (cityAqi / INITIAL_CITY_AQI)) }))
    );
  }, [cityAqi]);

  useEffect(() => {
    if (!hasUpgradeSolarPanels && energy < LOW_ENERGY_THRESHOLD && !hasSuggestedSolar) {
      setShowLowEnergyModal(true); setHasSuggestedSolar(true);
      setAiDialogue(result.alertsLowEnergy.lowEnergyTitle); setAiMood('concernedAI');
      addNotification(result.alertsLowEnergy.lowEnergyTitle, 'warning'); playSound('warning');
    }
    if (energy >= LOW_ENERGY_THRESHOLD && hasSuggestedSolar) { setHasSuggestedSolar(false); }
    if (hasUpgradeSolarPanels && hasSuggestedSolar) { setHasSuggestedSolar(false); }
  }, [energy, hasUpgradeSolarPanels, hasSuggestedSolar, addNotification, result]);


  return (
    <div className="App">
      <audio ref={audioRef} src={currentTrackSrc} loop />
      <div className="ui-top-bar">
        <div className="notification-icon-container">
          {notificationHistory.length > 0 && <span className="notification-badge"></span>}
          <button onClick={() => setShowNotificationModal(true)} className="notification-icon-button">
            <Icon type="bell" />
          </button>
        </div>
        <div className="music-toggle-container">
          <button onClick={toggleMusic} className="music-toggle-button">
            <Icon type={isMusicPlaying ? 'musicOn' : 'musicOff'} />
          </button>
        </div>
      </div>
      <div className="notification-area">
        {toasts.map(n => <Notification key={n.id} {...n} onDismiss={() => setToasts(prev => prev.filter(toast => toast.id !== n.id))} />)}
      </div>

      <Routes>
        <Route path="/" element={ <MainMenuScreen onAddNotification={addNotification} aiMood={aiMood} musicTracks={musicTracks} currentTrackSrc={currentTrackSrc} onMusicChange={handleMusicChange}/> } />
        <Route path="/missions" element={<MissionSelectScreen onStartMission={startMission} isOceanMissionCompleted={isOceanMissionCompleted} isForestMissionUnlocked={isForestMissionUnlocked} isCityMissionUnlocked={isCityMissionUnlocked} />} />
        
        {/* Routes are the same... */}
        <Route path="/missions/ocean" element={<OceanMissionScreen oceanHealth={oceanHealth} dataPoints={dataPoints} energy={energy} aiAccuracy={aiAccuracy} aiMood={aiMood} aiDialogue={aiDialogue} onStartMinigame={startSortTrashMinigame} onDeployAI={handleDeployAI} onBuyUpgrade={buyUpgrade} upgrades={{ hasUpgradeSortSpeed, hasUpgradeEfficientDeployment, hasUpgradeAdvancedSensors, hasUpgradeSolarPanels, hasUpgradeBiomassGenerator }} tutorialInfo={activeTutorial} onStartTutorial={() => startTutorial('ocean')} onAdvanceStep={advanceTutorial} onEndTutorial={endTutorial} /> } />
        <Route path="/missions/ocean/train" element={ <SortTrashMinigameScreen minigameItems={minigameItems} currentItemIndex={currentItemIndex} minigameFeedback={minigameFeedback} dataPoints={dataPoints} onSortItem={handleSortItem} onEndMinigame={(completed) => endMinigame(completed, null)} tutorialInfo={activeTutorial} /> } />
        <Route path="/missions/forest" element={ <ForestMissionScreen co2Level={co2Level} globalTemp={globalTemp} biodiversity={biodiversity} forestCoverage={forestCoverage} forestMap={forestMap} forestNotifications={forestNotifications} dataPoints={dataPoints} energy={energy} onPlantTree={handlePlantTree} onTrainAI={handleStartForestTraining} onDeployAIForest={handleDeployAIForest} onBuyUpgrade={buyUpgrade} onConvertBiomass={convertBiomassToEnergy} forestAIAccuracy={forestAIAccuracy} upgrades={{ hasUpgradeSortSpeed, hasUpgradeEfficientDeployment, hasUpgradeAdvancedSensors, hasUpgradeSolarPanels, hasUpgradeBiomassGenerator }} tutorialInfo={activeTutorial} onStartTutorial={() => startTutorial('forest')} onAdvanceStep={advanceTutorial} onEndTutorial={endTutorial}/> } />
        <Route path="/missions/forest/train" element={<ForestAITrainingScreen trainingImages={FOREST_AI_TRAINING_IMAGES} currentImageIndex={aiForestTrainingIndex} onImageLabel={handleImageLabel} onEndTraining={() => navigate('/missions/forest')} dataPoints={dataPoints} forestTrainingFeedback={forestTrainingFeedback} tutorialInfo={activeTutorial}/> } />
        <Route path="/missions/city" element={ <CityMissionScreen cityAqi={cityAqi} cityEconomy={cityEconomy} cityHappiness={cityHappiness} cityDistricts={cityDistricts} cityDecisions={availableDecisions} dataPoints={dataPoints} energy={energy} upgrades={{ hasUpgradeSortSpeed, hasUpgradeEfficientDeployment, hasUpgradeAdvancedSensors, hasUpgradeSolarPanels, hasUpgradeBiomassGenerator }} onApproveDecision={handleApproveCityDecision} onStartCityTraining={handleStartCityTraining} cityAIAccuracy={cityAIAccuracy} aiRecommendedDecisionId={aiRecommendedDecisionId} onDeployAICity={handleDeployAICity} onBuyUpgrade={buyUpgrade} tutorialInfo={activeTutorial} onStartTutorial={() => startTutorial('city')} onAdvanceStep={advanceTutorial} onEndTutorial={endTutorial}/> } />
        <Route path="/missions/city/train" element={ <CityAITrainingScreen proposals={CITY_TRAINING_PROPOSALS} currentIndex={cityTrainingIndex} onClassify={handleClassifyCityProposal} feedback={cityTrainingFeedback} dataPoints={dataPoints} tutorialInfo={activeTutorial}/> } />
      </Routes>

      <Modal show={showLowEnergyModal} onClose={() => setShowLowEnergyModal(false)} title={result.alertsLowEnergy.lowEnergyTitle} >
        <p>{result.alertsLowEnergy.lowEnergyMessagePart1}</p>
        <p>{result.alertsLowEnergy.lowEnergyMessagePart2}</p>
        <Button onClick={() => setShowLowEnergyModal(false)}>{result.alertsLowEnergy.gotItButton}</Button>
      </Modal>

      <Modal show={showNotificationModal} onClose={() => setShowNotificationModal(false)} fullscreen={true}>
        <div className="notification-history-header">
          <h3>{text.modals.historyTitle}</h3>
          <Button onClick={() => setShowNotificationModal(false)} className="close-fullscreen-button"> <Icon type="x" /> </Button>
        </div>
        <div className="notification-history-list">
          {notificationHistory.length > 0 ? (
            notificationHistory.map(n => <Notification key={n.id} {...n} onDismiss={() => {}} isStatic={true} />)
          ) : ( <p className="empty-history-message">{text.modals.historyEmpty}</p> )}
        </div>
      </Modal>

    </div>
  );
}

export default App;