// src/constants/gameConstants.js

export const INITIAL_DATA_POINTS = 500;
export const INITIAL_ENERGY = 100;
export const INITIAL_OCEAN_HEALTH = 20;
export const INITIAL_AI_ACCURACY = 30;
export const MAX_OCEAN_HEALTH = 100;

export const DEPLOY_AI_DATA_COST = 50;
export const DEPLOY_AI_ENERGY_COST = 20;
export const LOW_ENERGY_THRESHOLD = 20; 

export const UPGRADE_SORT_SPEED_COST = 100;     
export const UPGRADE_EFFICIENT_DEPLOYMENT_COST = 150;
export const UPGRADE_ADVANCED_SENSORS_COST = 200;

export const MAX_ENERGY = 800; // The maximum energy you can store
export const UPGRADE_SOLAR_PANELS_COST = 300;
export const SOLAR_PANEL_ENERGY_GENERATION = 10; // Energy generated per tick

export const UPGRADE_BIOMASS_GENERATOR_COST = 150;
export const BIOMASS_ENERGY_PER_STUMP = 25; // Energy generated per logged tile consumed



export const TRASH_ITEMS_DATA = [
  // REMOVE the 'name' property. The 'id' is now the link to the translation.
  { id: 1, type: 'Recycle', visual: '🥤' },
  { id: 2, type: 'Compost', visual: '🍎' },
  { id: 3, type: 'Trash', visual: '🦴' },
  { id: 4, type: 'Recycle', visual: '🛍️' },
  { id: 5, type: 'Compost', visual: '🍌' },
  { id: 6, type: 'Recycle', visual: '📰' },
  { id: 7, type: 'Trash', visual: '🍾' },
  { id: 8, type: 'Recycle', visual: '🥫' },
  { id: 9, type: 'Compost', visual: '🥚' },
  { id: 10, type: 'Trash', visual: '🥡' },
];

export const MINIGAME_DURATION_SECONDS = 30;
export const MINIGAME_QUICK_BONUS_THRESHOLD = 15;
export const MINIGAME_QUICK_BONUS_DP = 20;


// =======================================================
// --- FOREST GUARDIAN MISSION CONSTANTS ---
// =======================================================

// --- HUD & Core Metrics ---
export const INITIAL_CO2_PPM = 420.0;
export const INITIAL_BIODIVERSITY = 25;
export const MAX_BIODIVERSITY = 100;

// --- Map & Tiles ---
export const FOREST_MAP_WIDTH = 15;
export const FOREST_MAP_HEIGHT = 10;

export const DEPLOY_AI_FOREST_DATA_COST = 100;
export const DEPLOY_AI_FOREST_ENERGY_COST = 50;
export const AI_PLANTING_COUNT = 10; // How many trees the AI plants at once

export const TILE_TYPES = {
  EMPTY: 'empty',
  YOUNG: 'young',
  MATURE: 'mature',
  FIRE: 'fire', // This can be for an active fire event later
  LOGGED: 'logged',
  // --- ADD THESE NEW THREATS ---
  DISEASED: 'diseased',
  FIRE_RISK: 'fire_risk',
};

// ... (At the end of the file)
export const INITIAL_FOREST_AI_ACCURACY = 15;
// --- Tree Data for Planting Menu ---
export const TREE_TYPES = [
  {
    id: 'oak',
    name: 'Oak Tree',
    visual: '🌳',
    co2Absorption: 0.05, // ppm reduction per tick per tree
    biodiversityImpact: 5,
    growthTicks: 5, // Ticks until it becomes 'MATURE'
    cost: 10, // Data Points
  },
  {
    id: 'pine',
    name: 'Pine Tree',
    visual: '🌲',
    co2Absorption: 0.03,
    biodiversityImpact: 3,
    growthTicks: 3,
    cost: 5,
  },
  {
    id: 'sequoia',
    name: 'Sequoia',
    visual: '🏞️', // Using a generic nature emoji
    co2Absorption: 0.1,
    biodiversityImpact: 10,
    growthTicks: 10,
    cost: 25,
  },
  {
    id: 'mangrove',
    name: 'Mangrove',
    visual: '🌿',
    co2Absorption: 0.08,
    biodiversityImpact: 8,
    growthTicks: 6,
    cost: 20,
  }
];

// --- AI Training Data ---
import healthy_forest_drone from '../assets/healthy-forest-drone.jpg'
import diseased_leaves from '../assets/diseased-leaves.png';
import dry_underbrush from '../assets/dry-underbrush.png';
import lush_forest_floor from '../assets/lush-forest-floor.png';
import pine_beetle_damage from '../assets/pine-beetle-damage.png';
import saplings_growing from '../assets/saplings-growing.png';

export const FOREST_AI_TRAINING_IMAGES = [
  {
    id: 1,
    visual: healthy_forest_drone,
    descriptionKey: 'desc_1', // Use key
    correctLabel: 'Healthy'
  },
  {
    id: 2,
    visual: diseased_leaves,
    descriptionKey: 'desc_2', // Use key
    correctLabel: 'Diseased'
  },
  {
    id: 3,
    visual: dry_underbrush,
    descriptionKey: 'desc_3', // Use key
    correctLabel: 'Fire Risk'
  },
  {
    id: 4,
    visual: lush_forest_floor,
    descriptionKey: 'desc_4', // Use key
    correctLabel: 'Healthy'
  },
  {
    id: 5,
    visual: pine_beetle_damage,
    descriptionKey: 'desc_5', // Use key
    correctLabel: 'Diseased'
  },
  {
    id: 6,
    visual: saplings_growing,
    descriptionKey: 'desc_6', // Use key
    correctLabel: 'Healthy'
  }
];

export const AI_TRAINING_COST_FOREST = 0; // Energy cost to start a training session

// =======================================================
// --- CITY AIR RESCUE MISSION CONSTANTS ---
// =======================================================

export const INITIAL_CITY_AQI = 125; // Average Air Quality Index (Lower is better)
export const INITIAL_CITY_ECONOMY = 80; // 0-100 scale
export const INITIAL_CITY_HAPPINESS = 60; // 0-100 scale

export const MAX_CITY_STATS = 100;

// The list of policies the player can enact
export const CITY_DECISIONS = [
    { 
        id: 'city_dec1', 
        icon: '🚕', 
        title: 'Subsidize Electric Taxis', 
        description: 'Help taxi drivers switch to electric vehicles to reduce traffic pollution.', 
        costDP: 150,
        costEnergy: 30,
        impacts: { aqi: -15, economy: -5, happiness: 10 } 
    },
    { 
        id: 'city_dec2', 
        icon: '🏭', 
        title: 'Upgrade Factory Filters', 
        description: 'Mandate modern filters on industrial smokestacks. A huge win for air quality!', 
        costDP: 250,
        costEnergy: 70,
        impacts: { aqi: -30, economy: -10, happiness: 5 }
    },
    { 
        id: 'city_dec3', 
        icon: '🌳', 
        title: 'Rooftop Garden Initiative', 
        description: 'Encourage citizens to plant gardens on their roofs. Great for air and morale!', 
        costDP: 100,
        costEnergy: 20,
        impacts: { aqi: -10, happiness: 15 }
    },
    { 
        id: 'city_dec4', 
        icon: '🚲', 
        title: 'Develop Smart Bike Lanes', 
        description: 'Create safe, interconnected bike lanes to encourage clean commuting.', 
        costDP: 200,
        costEnergy: 40,
        impacts: { aqi: -10, happiness: 10 }
    },
    { 
        id: 'city_dec5', 
        icon: '☀️', 
        title: 'Community Solar Program', 
        description: 'Power municipal buildings with solar energy, reducing reliance on fossil fuels.', 
        costDP: 400,
        costEnergy: 100,
        impacts: { aqi: -20, economy: 5 }
    },
];

export const CITY_TRAINING_PROPOSALS = [
    {
        id: 'ctp1',
        icon: '🌳',
        titleKey: 'ctp1_title',       // Use key for title
        descriptionKey: 'ctp1_desc', // Use key for description
        correctAnswer: 'Good Idea'
    },
    {
        id: 'ctp2',
        icon: '🚗',
        titleKey: 'ctp2_title',       // Use key for title
        descriptionKey: 'ctp2_desc', // Use key for description
        correctAnswer: 'Bad Idea'
    },
    {
        id: 'ctp3',
        icon: '💧',
        titleKey: 'ctp3_title',       // Use key for title
        descriptionKey: 'ctp3_desc', // Use key for description
        correctAnswer: 'Bad Idea'
    },
    {
        id: 'ctp4',
        icon: '♻️',
        titleKey: 'ctp4_title',       // Use key for title
        descriptionKey: 'ctp4_desc', // Use key for description
        correctAnswer: 'Good Idea'
    },
    {
        id: 'ctp5',
        icon: '💨',
        titleKey: 'ctp5_title',       // Use key for title
        descriptionKey: 'ctp5_desc', // Use key for description
        correctAnswer: 'Bad Idea'
    },
    {
        id: 'ctp6',
        icon: '💡',
        titleKey: 'ctp6_title',       // Use key for title
        descriptionKey: 'ctp6_desc', // Use key for description
        correctAnswer: 'Good Idea'
    }
];

export const DEPLOY_AI_CITY_DATA_COST = 200;
export const DEPLOY_AI_CITY_ENERGY_COST = 80;

export const INITIAL_CITY_AI_ACCURACY = 20; // Starts off not very smart
export const AI_RECOMMENDATION_DISCOUNT = 0.5; // 50% discount on recommended policies


export const AI_GENERATED_DECISION = {
    id: 'city_dec_AI',
    icon: '🤖',
    title: 'AI-Optimized Smart Grid',
    description: 'Use our AI to create an ultra-efficient power grid, reducing waste and pollution.',
    costDP: 100, // The policy itself still has a cost
    costEnergy: 50,
    impacts: { aqi: -25, economy: 10, happiness: 5 }
};

// The city map layout
export const CITY_DISTRICTS = [
  { id: 'd1', name: 'Downtown', baseAqi: 140 },
  { id: 'd2', name: 'Suburbs', baseAqi: 80 },
  { id: 'd3', name: 'Industrial', baseAqi: 180 },
  { id: 'd4', name: 'Greenbelt', baseAqi: 40 },
];