// src/constants/gameConstants.js

export const INITIAL_DATA_POINTS = 50;
export const INITIAL_ENERGY = 100;
export const INITIAL_OCEAN_HEALTH = 20;
export const INITIAL_AI_ACCURACY = 30;
export const MAX_OCEAN_HEALTH = 100;

export const DEPLOY_AI_DATA_COST = 50;
export const DEPLOY_AI_ENERGY_COST = 20;

export const UPGRADE_SORT_SPEED_COST = 100;
export const UPGRADE_EFFICIENT_DEPLOYMENT_COST = 150;
export const UPGRADE_ADVANCED_SENSORS_COST = 200;

export const MAX_ENERGY = 200; // The maximum energy you can store
export const UPGRADE_SOLAR_PANELS_COST = 300;
export const SOLAR_PANEL_ENERGY_GENERATION = 5; // Energy generated per tick

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
  FIRE: 'fire',
  LOGGED: 'logged',
};

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