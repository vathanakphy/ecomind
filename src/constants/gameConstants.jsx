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
  { id: 1, name: 'Plastic Bottle', type: 'Recycle', visual: '🥤' },
  { id: 2, name: 'Apple Core', type: 'Compost', visual: '🍎' },
  { id: 3, name: 'Fish Bones', type: 'Trash', visual: '🦴' },
  { id: 4, name: 'Plastic Bag', type: 'Recycle', visual: '🛍️' },
  { id: 5, name: 'Banana Peel', type: 'Compost', visual: '🍌' },
  { id: 6, name: 'Old Newspaper', type: 'Recycle', visual: '📰' },
  { id: 7, name: 'Broken Glass', type: 'Trash', visual: '🍾' },
  { id: 8, name: 'Tin Can', type: 'Recycle', visual: '🥫' },
  { id: 9, name: 'Egg Shells', type: 'Compost', visual: '🥚' },
  { id: 10, name: 'Styrofoam Cup', type: 'Trash', visual: '🥡' },
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
    description: 'Healthy canopy, vibrant green.',
    correctLabel: 'Healthy'
  },
  {
    id: 2,
    visual: diseased_leaves,
    description: 'Leaves with brown spots and wilting.',
    correctLabel: 'Diseased'
  },
  {
    id: 3,
    visual: dry_underbrush,
    description: 'Very dry, brown undergrowth, potential tinder.',
    correctLabel: 'Fire Risk'
  },
  {
    id: 4,
    visual: lush_forest_floor,
    description: 'Lush and green, diverse plant life.',
    correctLabel: 'Healthy'
  },
  {
    id: 5,
    visual: pine_beetle_damage,
    description: 'Browning pine needles, signs of infestation.',
    correctLabel: 'Diseased'
  },
  {
    id: 6,
    visual: saplings_growing,
    description: 'Young trees showing new growth.',
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
        title: 'Replace Parking Lot with Park',
        description: 'A developer wants to build a new public park downtown.',
        correctAnswer: 'Good Idea'
    },
    {
        id: 'ctp2',
        icon: '🚗',
        title: 'Build a New Highway Through Suburbs',
        description: 'This would increase traffic and pollution in a residential area.',
        correctAnswer: 'Bad Idea'
    },
    {
        id: 'ctp3',
        icon: '💧',
        title: 'Dump Industrial Waste in River',
        description: 'A factory is proposing a cheaper way to get rid of its waste.',
        correctAnswer: 'Bad Idea'
    },
    {
        id: 'ctp4',
        icon: '♻️',
        title: 'Community Composting Program',
        description: 'A city-wide initiative to reduce landfill waste.',
        correctAnswer: 'Good Idea'
    },
    {
        id: 'ctp5',
        icon: '💨',
        title: 'Remove Emission Standards for Cars',
        description: 'A proposal to make it cheaper to own older, more polluting cars.',
        correctAnswer: 'Bad Idea'
    },
    {
        id: 'ctp6',
        icon: '💡',
        title: 'Switch Streetlights to Low-Energy LEDs',
        description: 'This will reduce the city\'s overall energy consumption.',
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