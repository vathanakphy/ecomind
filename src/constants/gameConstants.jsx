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
    id: 'bamboo',
    name: 'Russey',
    visual: '🎍',
    description: 'A fast-growing grass that quickly helps absorb CO₂.',
    co2Absorption: 0.04, // Grows fast, so decent absorption rate
    biodiversityImpact: 2, // Less impact as it can grow in dense stands
    growthTicks: 3,        // Matures very quickly
    cost: 5,               // Cheap, early-game option
  },
  {
    id: 'sugar_palm',
    name: 'Tnaot',
    visual: '🌴',
    description: 'The national tree of Cambodia, vital to the rural landscape and economy.',
    co2Absorption: 0.06, // A solid, all-around tree
    biodiversityImpact: 6, // Supports various local fauna
    growthTicks: 6,        // Medium growth time
    cost: 15,              // A reliable mid-game choice
  },
  {
    id: 'chheuteal',
    name: 'Chheuteal Tree',
    visual: '🌳',
    description: 'A massive Dipterocarp forest tree, excellent for long-term CO₂ capture and creating forest canopy.',
    co2Absorption: 0.12,   // Very high CO₂ absorption due to its size
    biodiversityImpact: 10,  // A keystone species for forest biodiversity
    growthTicks: 12,       // Takes a long time to mature
    cost: 30,              // Expensive, late-game investment
  },
  {
    id: 'rumduol',
    name: 'Rumduol Tree',
    visual: '🌸',
    description: 'Bears the fragrant national flower of Cambodia, greatly boosting local biodiversity.',
    co2Absorption: 0.02,   // Less focus on CO₂, more on ecosystem health
    biodiversityImpact: 9, // High impact due to being the national flower
    growthTicks: 5,        // Matures at a normal pace
    cost: 20,              // A strategic choice for improving biodiversity
  }
];

// --- AI Training Data ---

export const FOREST_AI_TRAINING_IMAGES = [
  {
    id: 1,
    visual: healthy_forest_drone,
    descriptionKey: 'desc_1', // Use key
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987169/healthy-forest-drone_g50e6u.png',
    description: 'Drone footage shows a dense, closed canopy with vibrant, uniform green coloration across the upper branches.',
    correctLabel: 'Healthy'
  },
  {
    id: 2,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987169/diseased-leaves_xbkc8j.png',
    description: 'A close-up image of leaves shows distinct necrotic lesions (brown spots) and significant wilting along the edges.',
    correctLabel: 'Diseased'
  },
  {
    id: 3,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987169/dry-underbrush_mf16mf.png',
    description: 'Thermal analysis indicates extremely low moisture content in the ground-level foliage and a thick layer of dry tinder.',
    correctLabel: 'Fire Risk'
  },
  {
    id: 4,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987170/lush-forest-floor_f7wza2.png',
    description: 'The forest floor is covered in a diverse array of ferns, mosses, and wildflowers, indicating rich soil and ample water.',
    correctLabel: 'Healthy'
  },
  {
    id: 5,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987170/pine-beetle-damage_oqfq6r.png',
    description: 'Patches of pine trees are showing browning needles and small holes in the bark, consistent with beetle infestation.',
    correctLabel: 'Diseased'
  },
  {
    id: 6,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987170/saplings-growing_pgtjho.png',
    description: 'A clearing shows numerous young saplings successfully taking root and showing vigorous new leaf growth.',
    correctLabel: 'Healthy'
  },
  {
    id: 7,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987171/bark_canker_fungus_wipppb.jpg',
    description: 'Image analysis reveals a large, oozing canker on the main trunk of a tree, a sign of a severe fungal infection.',
    correctLabel: 'Diseased'
  },
  {
    id: 8,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987170/standing_dead_trees_jtj3zj.jpg',
    description: 'Lidar data shows a high density of standing dead trees with very low moisture content, acting as potential "ladder fuels".',
    correctLabel: 'Fire Risk'
  },
  {
    id: 9,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987169/forest_stream_clear_ueb12o.jpg',
    description: 'Sensor data shows high water clarity in a forest stream, indicating minimal soil erosion and a stable ecosystem.',
    correctLabel: 'Healthy'
  },
  {
    id: 10,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987170/root_rot_base_unb1kn.jpg',
    description: 'Visible decay and fungal mycelium are present at the base of several mature trees, pointing to widespread root rot.',
    correctLabel: 'Diseased'
  },
  {
    id: 11,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987169/lightning_scar_tree_zyqosv.jpg',
    description: 'A tall, isolated tree shows a long, fresh scar down its trunk from a recent lightning strike, making it susceptible to ignition.',
    correctLabel: 'Fire Risk'
  },
  {
    id: 12,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987170/wildlife_camera_deer_uerohe.jpg',
    description: 'A remote camera trap has captured multiple images of deer and other small mammals foraging, indicating a robust food web.',
    correctLabel: 'Healthy'
  },
  {
    id: 13,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987168/drought_stressed_leaves_x2cjmc.jpg',
    description: 'Thermal imaging indicates significant water stress across a sector; the leaves on many trees are curled and losing turgor.',
    correctLabel: 'Fire Risk'
  },
  {
    id: 14,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987168/decomposing_log_moss_wk3xxi.jpg',
    description: 'A fallen log is covered in thick moss and various fungi, actively decomposing and recycling nutrients back into the soil.',
    correctLabel: 'Healthy'
  },
  {
    id: 15,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751987168/insect_bore_holes_cjxksy.jpg',
    description: 'High-resolution image shows a pattern of small boreholes in tree bark with "frass" (a sawdust-like substance) accumulating below.',
    correctLabel: 'Diseased'
  },
  // --- More Scenarios Added Below ---
  {
    id: 16,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991767/diverse_bird_calls_spectrogram_bzx0mp.jpg',
    description: "A vibrant forest with many trees and birds. The scene includes various bird species singing at different pitches, creating a rich and lively soundscape. This diverse audio activity reflects a healthy, biodiverse ecosystem.",
    correctLabel: "Healthy"
  },
  {
    id: 17,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991493/low_hanging_dead_branches_kv4nul.jpg',
    description: 'Image analysis identifies numerous low-hanging dead branches on mature trees, which could carry a ground fire into the canopy.',
    correctLabel: 'Fire Risk'
  },
  {
    id: 18,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991492/witches_broom_growth_hpdn4g.jpg',
    description: 'A tree is showing multiple instances of "witches\' broom" - a dense, chaotic mass of twig growth caused by a pathogen.',
    correctLabel: 'Diseased'
  },
  {
    id: 19,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991493/intact_tree_bark_veq5wh.jpg',
    description: 'Drone close-up of several tree trunks shows bark is intact and healthy, with no signs of peeling or deep cracks.',
    correctLabel: 'Healthy'
  },
  {
    id: 20,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991493/invasive_dry_grass_t3visw.jpg',
    description: 'Field sensors detect large patches of a non-native, invasive grass species that has dried out completely, creating a continuous fuel source.',
    correctLabel: 'Fire Risk'
  },
  {
    id: 21,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991492/premature_leaf_drop_y35s0q.jpg',
    description: 'Analysis of ground cover shows a significant number of leaves have been shed from deciduous trees far ahead of the normal season.',
    correctLabel: 'Diseased'
  },
  {
    id: 22,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991492/mycorrhizal_network_scan_tymc5q.jpg',
    description: 'Sub-surface soil scan reveals a dense and thriving network of mycorrhizal fungi interconnected with tree roots.',
    correctLabel: 'Healthy'
  },
  {
    id: 23,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991492/unattended_campfire_jg72x9.jpg',
    description: 'A remote camera has spotted a smoldering, unattended campfire at an unauthorized campsite within the forest boundary.',
    correctLabel: 'Fire Risk'
  },
  {
    id: 24,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991493/leaf_miner_trails_kptobv.jpg',
    description: 'Magnified leaf image shows distinctive winding tunnels and trails within the leaf tissue, indicating a leaf miner insect infestation.',
    correctLabel: 'Diseased'
  },
  {
    id: 25,
    visual: 'https://res.cloudinary.com/dokut37k6/image/upload/v1751991492/animal_tracks_mud_ztb5lf.jpg',
    description: 'Image of a muddy path shows a variety of fresh animal tracks, including boar and deer, suggesting active animal populations.',
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
      description: 'A developer wants to build a new public park downtown, increasing green space and reducing the heat island effect.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp2',
      icon: '🚗',
      title: 'Build a New Highway Through Suburbs',
      description: 'This would increase traffic and pollution in a residential area, prioritizing cars over people.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp3',
      icon: '💧',
      title: 'Dump Industrial Waste in River',
      description: 'A factory is proposing a cheaper, but highly polluting, way to get rid of its chemical waste.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp4',
      icon: '♻️',
      title: 'Community Composting Program',
      description: 'A city-wide initiative to collect food scraps and reduce the amount of organic waste going to the landfill.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp5',
      icon: '💨',
      title: 'Remove Emission Standards for Cars',
      description: 'A proposal to make it cheaper to own older, more polluting cars, which would worsen air quality.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp6',
      icon: '💡',
      title: 'Switch Streetlights to Low-Energy LEDs',
      description: 'This will reduce the city\'s overall energy consumption and lower its carbon footprint.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp7',
      icon: '🚌',
      title: 'Expand the Public Bus System',
      description: 'Adding more bus routes to reduce reliance on personal motos and cars, easing traffic congestion and emissions.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp8',
      icon: '🏗️',
      title: 'Fill in a Natural Lake for a New Mall',
      description: 'A plan to reclaim a large urban lake for a luxury shopping center, destroying a vital natural wetland.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp9',
      icon: '☀️',
      title: 'Subsidize Rooftop Solar Panels',
      description: 'Offer financial help for homes and businesses to install solar panels, promoting clean, renewable energy.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp10',
      icon: '🛍️',
      title: 'Encourage Single-Use Plastic Bags',
      description: 'A proposal to give out free, non-biodegradable plastic bags at all markets to increase customer convenience.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp11',
      icon: '🚰',
      title: 'Install Public Water Filtration Stations',
      description: 'Provide free, clean drinking water in public spaces to reduce the widespread use of plastic water bottles.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp12',
      icon: '🛵',
      title: 'Import Cheap, Unregulated Two-Stroke Motos',
      description: 'Allow the import of older, less efficient motorbikes that produce a large amount of smoke and noise pollution.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp13',
      icon: '🏢',
      title: 'Mandate Green Roofs on New Buildings',
      description: 'Require new commercial buildings to have gardens on their roofs to help cool the city and manage rainwater.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp14',
      icon: '🚲',
      title: 'Create Protected Bicycle Lanes',
      description: 'Build a network of safe, separated bike lanes across the city to encourage carbon-free transportation.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp15',
      icon: '🏭',
      title: 'Build a Coal Power Plant on City Outskirts',
      description: 'A proposal to generate cheap electricity for the city by burning coal, a major source of air pollution and CO₂.',
      correctAnswer: 'Bad Idea'
  },
  // --- More Scenarios Added Below ---
  {
      id: 'ctp16',
      icon: '🔥',
      title: 'Build a Modern Waste-to-Energy Plant',
      description: 'Process non-recyclable city trash in a high-tech incinerator to generate electricity, reducing landfill size.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp17',
      icon: '🚧',
      title: 'Allow Construction Work 24/7',
      description: 'Remove restrictions on construction hours to speed up projects, leading to constant noise pollution in neighborhoods.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp18',
      icon: '🧑‍🌾',
      title: 'Convert Vacant Lots into Community Farms',
      description: 'Allow citizens to grow their own food in unused city spaces, promoting local food security and greening the area.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp19',
      icon: '🛣️',
      title: 'Pave Over Riverside Greenways for Parking',
      description: 'Remove natural riverfront parks and green spaces to create more parking lots for cars.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp20',
      icon: '🛺',
      title: 'Offer Incentives for Electric Tuk-Tuks',
      description: 'Provide loans or grants for drivers to switch from gasoline-powered tuk-tuks to silent, non-polluting electric models.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp21',
      icon: '🤢',
      title: 'Delay Upgrades to Sewage Treatment System',
      description: 'Postpone essential maintenance on the city\'s wastewater treatment plants, risking raw sewage leaks into waterways.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp22',
      icon: '🚶',
      title: 'Create Car-Free Pedestrian Zones',
      description: 'Designate popular market and riverside areas as "walking only" on weekends to improve safety and air quality.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp23',
      icon: '📢',
      title: 'Allow Loudspeaker Advertising Trucks',
      description: 'Permit vehicles to drive through neighborhoods broadcasting loud advertisements at all hours, increasing noise pollution.',
      correctAnswer: 'Bad Idea'
  },
  {
      id: 'ctp24',
      icon: '🌧️',
      title: 'Promote Rainwater Harvesting Systems',
      description: 'Encourage buildings to collect and store rainwater for non-drinking uses, reducing strain on the city\'s water supply.',
      correctAnswer: 'Good Idea'
  },
  {
      id: 'ctp25',
      icon: '🍲',
      title: 'Ban All Street Food Vendors',
      description: 'A plan to "clean up the streets" by banning all street food vendors, which harms local culture and small businesses.',
      correctAnswer: 'Bad Idea'
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