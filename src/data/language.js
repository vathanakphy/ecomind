export const translations = {
  eng: {
    mainMenu: {
      title: "EcoMind",
      subtitle: "Train Your AI to Save the Planet",
      play: "PLAY",
      howToPlay: "HOW TO PLAY",
      settings: "SETTINGS",
      modalTitle: "How to Play EcoMind",
      welcome: "Welcome, Eco-Hero!",
      steps: [
        "Select a Mission: Choose an environmental challenge to tackle.",
        'Train Your AI: Play minigames like "Sort the Trash" to collect Data Points (DP) and improve your AI\'s Accuracy.',
        "Manage Resources: Keep an eye on your Data Points and Energy.",
        "Deploy AI: Use DP and Energy to send your AI into the simulation to clean the environment. The AI's success depends on its Accuracy.",
        "Upgrade AI: Spend DP on upgrades to make your AI smarter and more efficient.",
      ],
      goal: "Your goal is to restore environmental health to 100%!",
    },
    missionSelectScreen: {
      title: "Select a Mission",
      oceanMission: {
        cardTitle: "Help clean the polluted ocean waters.",
        heading: "Stop Ocean Pollution",
        description:
          "The oceans are choking with plastic. Train your AI to identify and help remove it!",
      },
      forestMission: {
        heading: "Forest Guardian",
        descriptionUnlocked:
          "Reduce global CO₂ by managing a vital forest ecosystem.",
        descriptionLocked: "Unlock by completing the Ocean Mission.",
        cardTitleLocked: "Complete Ocean Mission to unlock",
        cardTitleUnlocked: "Manage forest resources sustainably.",
      },
      cityMission: {
        heading: "City Air Rescue",
        descriptionUnlocked:
          "The city's air is choking! Enact smart policies to clean the skies and keep your citizens happy.",
        descriptionLocked: "Unlock by completing the Forest Mission.",
        cardTitleUnlocked: "Tackle urban air pollution.",
        cardTitleLocked: "Complete Forest Mission to unlock.",
      },

      button: {
        startMission: "START MISSION",
        backToMainMenu: "Back to Main Menu",
      },
    },
    gameGuideForest: {
      title: "Forest Guardian Guide",
      closeButton: "Close",
      gotItButton: "Got It!",
      and: "and",

      terms: {
        co2Level: "CO₂ Level",
        globalTemp: "Global Temp",
        biodiversity: "Biodiversity",
        dataPoints: "Data Points",
        dataPointsAbbr: "DP",
        energy: "Energy",
        trainAI: "Train AI",
        manageForest: "Manage Forest",
        deployAI: "Deploy AI",
        upgrades: "Upgrades",
        biomassGenerator: "Biomass Generator",
        loggedTiles: "logged tiles",
        aiAccuracy: "AI Accuracy",
        diseased: "Diseased",
        fireRisk: "Fire Risk",
      },

      section1Title: "Understanding Your Environment",
      section1_li1_part1: "The Top HUD shows the current",
      section1_li1_part2: "and",
      section1_li1_part3: "Your goal is to lower CO₂ by increasing",
      section1_li1_part4: "and forest coverage.",
      section1_li2_part1: "The Map shows you healthy trees",
      section1_li2_part2: "(young)",
      section1_li2_part3: "(mature), and",
      section1_li2_part4: "stumps from",
      section1_li2_part5: "logging.",
      mapThreatsIntro: "Watch out for threats like",
      section1_li3_part1: "The Left Sidebar shows your",
      section1_li3_part2: "your",

      section2Title: "Core Gameplay Loop",
      trainWardenIntro: "Click the",
      trainWardenPurpose:
        "button to teach it how to spot threats like disease and fire risk. This increases your",
      trainWardenReward: "and earns you free",
      deployWardenIntro: "Click",
      deployWardenLogic: "to send it on a health scan. It has two priorities:",
      priority1Title: "Priority 1: Neutralize Threats",
      priority1Desc:
        "If the AI finds a diseased or fire risk tile, it will fix it automatically.",
      priority2Title: "Priority 2: Reforestation",
      priority2Desc:
        "If no threats are found, the AI will plant new saplings to help the forest grow.",
      section2_li2_part1: "Click",
      section2_li2_part2:
        "to open the planting menu and manually plant trees using your Data Points.",

      section3Title: "Advanced Strategies",
      section3_li1_part1: "Use the Button",
      section3_li1_part2:
        "button to get permanent improvements like Solar Panels for passive energy, or the",
      section3_li1_part3: "for a quick energy boost from stumps.",
      section3_li2_part1:
        "If you need energy, you can log parts of your forest and use the",
      section3_li2_part2: "to convert the stumps into",
      section3_li2_part3: ".",
    },
    gameGuideOcean: {
      closeButton: "✖",
      title: "How to Play: Ocean Mission",
      section1Title: "1. Understanding Your Dashboard",
      section1_li1_part1: "Your main goal is to improve the",
      section1_li1_part2:
        "and keep it high. It represents the cleanliness of the ocean.",
      section1_li2_part1: "This is your AI's dashboard. You'll track your",
      section1_li2_part2: "and",
      section1_li2_part3: ".",
      section1_li3: "Your AI assistant will provide helpful tips and guidance.",

      section2Title: "2. The Core Gameplay Loop: Sort the Trash",
      section2_p1:
        "The ocean is full of trash! Your job is to train your AI to identify different types of pollution.",
      section2_li1_part1: "Click",
      section2_li1_part2: "to enter the 'Sort the Trash' minigame.",
      section2_li2_part1:
        "Drag and drop the falling trash items into the correct bins:",
      section2_li2_bullet1: "Recycle Bin",
      section2_li2_bullet2: "Compost Bin",
      section2_li2_bullet3: "Trash Bin",
      section2_li3_part1: "Each correct sort earns you",
      section2_li3_part2: "and improves your AI's accuracy.",
      section2_p2:
        "The higher your AI's accuracy, the more effective your deployments will be!",

      section3Title: "3. Winning Strategy: AI Deployment & Upgrades",
      section3_li1_part1: "Once you've collected enough",
      section3_li1_part2: "and",
      section3_li1_part3: ", click",
      section3_li1_part4: "to send your AI out.",
      section3_li2_part1:
        "Deploying your AI will consume resources but directly improve the",
      section3_li2_part2: ".",
      section3_li3_part1: "Visit the",
      section3_li3_part2:
        "section to spend your Data Points on permanent improvements, like making your AI clean more efficiently.",
      section3_li4:
        "Keep training, deploying, and upgrading until the ocean is sparkling clean!",

      gotItButton: "Got It, Let's Go!",

      terms: {
        oceanHealth: "Ocean Health",
        dataPoints: "Data Points",
        energy: "Energy",
        trainAI: "TRAIN AI",
        deployAI: "DEPLOY AI",
        upgrades: "UPGRADES",
        recycle: "RECYCLE",
        compost: "COMPOST",
        trash: "TRASH",
      },
    },
    "gameGuideCity": {
  "title": "City Air Rescue Guide",
  "goalTitle": "Your Goal:",
  "goalDescription": "Clean the city's air by lowering the Average Air Quality (AQI) as much as possible!",
  "step1Title": "Check the Map & Status:",
  "step1Description": "The left panel shows you which districts are polluted and your city's overall health.",
  "step2Title": "Train AI:",
  "step2Description": "Click \"Train AI\" to play a minigame where you review policy ideas. This is your main way to earn Data Points (DP) for free!",
  "step3Title": "Enact Policies:",
  "step3Description": "The right panel shows a list of policies. Use your DP and Energy to \"Approve\" them. Each policy has different effects on your city's AQI, Economy, and Happiness.",
  "step4Title": "Manage Resources:",
  "step4Description": "Use the \"Upgrades\" button to buy permanent improvements, like Solar Panels for energy generation.",
  "conclusion": "Balance the environment and the economy to become a successful city manager!"
},
    alertsLowEnergy: {
      lowEnergyTitle:
        "Low Energy Alert! purchasing Solar Panels from the Upgrades ",
      lowEnergyMessagePart1:
        "Your energy reserves are critically low. You might not be able to deploy AI or train!",
      lowEnergyMessagePart2:
        "Consider purchasing Solar Panels from the Upgrades menu to generate energy automatically over time.",
      gotItButton: "Got It",
    },
  "cityAITraining": {
    "title": "City AI Training",
    "subtitle": "Classify these city proposals to help train the AI.",
    "goodIdea": "Good Idea",
    "badIdea": "Bad Idea",
    "proposalLabel": "Proposal",
    "dataLabel": "Data",
    "trainingComplete": "Training Complete!",
    "returnToCity": "Return to City",
    "endTraining": "End Training",
    "tutorial": {
      "step4_text": "Review each proposal and classify it as a 'Good Idea' or 'Bad Idea' to earn Data Points and improve the AI.",
      "button_lets_go": "Let's Go!"
    },
    "proposals": {
      "ctp1_title": "Replace Parking Lot with Park",
      "ctp1_desc": "A developer wants to build a new public park downtown.",
      "ctp2_title": "Build a New Highway Through Suburbs",
      "ctp2_desc": "This would increase traffic and pollution in a residential area.",
      "ctp3_title": "Dump Industrial Waste in River",
      "ctp3_desc": "A factory is proposing a cheaper way to get rid of its waste.",
      "ctp4_title": "Community Composting Program",
      "ctp4_desc": "A city-wide initiative to reduce landfill waste.",
      "ctp5_title": "Remove Emission Standards for Cars",
      "ctp5_desc": "A proposal to make it cheaper to own older, more polluting cars.",
      "ctp6_title": "Switch Streetlights to Low-Energy LEDs",
      "ctp6_desc": "This will reduce the city's overall energy consumption."
    }
  },
    cityMissionScreen: {
      title: "City Air Rescue",
      resources: {
        dataPoints: "Data Points",
        energy: "Energy",
        aiAccuracy: "City AI Accuracy",
      },
      buttons: {
        trainAI: "Train AI",
        deployAI: "Deploy AI",
        upgrades: "Upgrades",
        help: "Help",
        backToMissions: "Back to Missions",
      },
  "decisionCard": {
    "approve": "APPROVE",
    "recommended": "AI Recommended!", // Add this key
    "cost": "Cost",
    "effects": "Effects"
  }, "tutorial": {
      "button_next": "Next",
      "button_got_it": "Got It!",
      "step1_text": "Welcome to the City! Your goal is to improve the city by lowering the <strong>AQI (Air Quality Index)</strong>.",
      "step2_text": "You'll use <strong>Data Points</strong> and <strong>Energy</strong> to enact new city policies.",
      "step3_text": "Click <strong>'Train AI'</strong> to teach the AI about good vs. bad policies and earn Data Points.",
      "step5_text": "This is the list of available policies. Click <strong>Approve</strong> on a card to enact it.",
      "step6_text": "<strong>'Deploy AI'</strong> to have the AI suggest a new, highly effective policy for you to approve!",
      "step7_text": "Don't forget to visit <strong>'Upgrades'</strong> to build Solar Panels for more energy."
    }
    },
    forestAITraining: {
      trainingComplete: "Training Complete!",
      returnToMission: "Return to Mission",
      title: "AI Training: Image Analysis",
      subtitle: "Classify the image to improve AI accuracy.",
      labels: {
        healthy: "Healthy",
        diseased: "Diseased",
        fireRisk: "Fire Risk",
      },
      progress: {
        image: "Image",
        data: "Data",
      },
      endTraining: "End Training",
        "descriptions": {
      "desc_1": "Healthy canopy, vibrant green.",
      "desc_2": "Leaves with brown spots and wilting.",
      "desc_3": "Very dry, brown undergrowth, potential tinder.",
      "desc_4": "Lush and green, diverse plant life.",
      "desc_5": "Browning pine needles, signs of infestation.",
      "desc_6": "Young trees showing new growth."
    },
    // New keys for the tutorial
    "tutorial": {
      "step4_text": "Label these images correctly to improve the AI's accuracy and earn Data Points.",
      "button_lets_go": "Let's Go!"
    }
    },
    forestMissionScreen: {
      actionsTitle: "Actions",
      resources: {
        dataPoints: "Data Points: Used for planting and upgrades",
        energy: "Energy: Used for AI training",
        aiAccuracy: "Forest AI Accuracy",
      },
      buttons: {
        trainAI: "Train AI",
        trainAITitle: "Train AI to identify forest health",
        deployAI: "Deploy AI",
        deployAITitle: "Deploy AI to automatically plant saplings",
        manageForest: "Manage Forest",
        convertBiomass: "Convert Biomass",
        convertBiomassTitle: "Convert 1 logged tile to energy",
        upgrades: "Upgrades",
        help: "Help",
        backToMissions: "Back to Missions",
      },
      "tileTypes": {
    "empty": "Empty",
    "young": "Young Sapling",
    "mature": "Mature Tree",
    "fire": "On Fire",
    "logged": "Logged",
    "diseased": "Diseased",
    "fire_risk": "Fire Risk",
    "plantable": "Plantable" // For the hover state on empty tiles
  },// New keys for the tutorial steps
    "tutorial": {
      "button_next": "Next",
      "button_got_it": "Got It!",
      "step1_text": "Welcome to the Forest Mission! Your goal is to lower <strong>CO₂</strong> and temperature by restoring the forest.",
      "step2_text": "You'll need <strong>Data Points</strong> and <strong>Energy</strong>. Get Data Points by training the AI.",
      "step3_text": "Click <strong>'Train AI'</strong> to teach it to identify healthy and unhealthy trees.",
      "step5_text": "Use DP and Energy to <strong>Deploy AI</strong>. It will automatically remove threats or plant new trees!",
      "step6_text": "Click <strong>'Manage Forest'</strong> to open the menu and plant trees yourself. This is the best way to lower CO₂!",
      "step7_text": "This is your forest. Click on empty tiles to plant the trees you select from the menu."
    }
    },
    oceanMissionScreen: {
      oceanHealthLabel: "Ocean Health",
      resources: {
        dataPointsTitle: "Data Points: Used for training and upgrades",
        energyTitle: "Energy: Used for deploying the AI",
        aiAccuracyTitle: "AI Accuracy: Affects deployment success",
      },
      buttons: {
        trainAI: "TRAIN AI",
        trainAITitle: "Go to minigame to earn Data Points and improve AI.",
        deployAI: "DEPLOY AI",
        deployAITitle: "Deploy AI to clean the ocean. Requires DP and Energy.",
        upgrades: "UPGRADES",
        upgradesTitle: "View and purchase AI upgrades.",
        help: "Help",
        backToMissions: "Back to Missions",
      }, // New keys for the footer
    "showTutorial": "Show Tutorial",
    "help": "Help",
    "backToMissions": "Back to Missions",
    // New keys for the tutorial steps
    "tutorial": {
      "button_next": "Next",
      "button_got_it": "Got It!",
      "step1_text": "Welcome to the Ocean Mission! Your goal is to restore <strong>Ocean Health</strong> to 100%.",
      "step2_text": "To do this, you'll need <strong>Data Points (DP)</strong>, which you get from training me.",
      "step3_text": "Click <strong>'Train AI'</strong> to start the trash sorting minigame.",
      "step5_text": "Good work! Deploying the AI also costs <strong>Energy ⚡️</strong>.",
      "step6_text": "When you have enough resources, <strong>'Deploy AI'</strong> to automatically collect trash and clean the ocean.",
      "step7_text": "Visit <strong>'Upgrades'</strong> to get essential items like the <strong>Solar System</strong> for more energy."
    }
    },
    sortTrashMinigame: {
      setup: "Setting up training...",
      returnToMission: "Return to Mission",
      title: "AI Training: Sort the Trash!",
      timeLeft: "Time Left:",
      instruction: "Identify and sort this item:",
      buttons: {
        recycle: "RECYCLE",
        compost: "COMPOST",
        trash: "TRASH",
      },
      progress: {
        item: "Item",
        data: "Data",
      },
      endTraining: "End Training",
    },
    gameData: {
      trashItems: {
        1: { name: "Plastic Bottle" },
        2: { name: "Apple Core" },
        3: { name: "Fish Bones" },
        4: { name: "Plastic Bag" },
        5: { name: "Banana Peel" },
        6: { name: "Old Newspaper" },
        7: { name: "Broken Glass" },
        8: { name: "Tin Can" },
        9: { name: "Egg Shells" },
        10: { name: "Styrofoam Cup" },
      },
      treeTypes: {
        oak: { name: "Oak Tree" },
        pine: { name: "Pine Tree" },
        sequoia: { name: "Sequoia" },
        mangrove: { name: "Mangrove" },
      },
      forestTraining: {
        1: { description: "Healthy canopy, vibrant green." },
        2: { description: "Leaves with brown spots and wilting." },
        3: { description: "Very dry, brown undergrowth, potential tinder." },
        4: { description: "Lush and green, diverse plant life." },
        5: { description: "Browning pine needles, signs of infestation." },
        6: { description: "Young trees showing new growth." },
      },
      cityDecisions: {
        city_dec1: {
          title: "Subsidize Electric Taxis",
          description:
            "Help taxi drivers switch to electric vehicles to reduce traffic pollution.",
        },
        city_dec2: {
          title: "Upgrade Factory Filters",
          description:
            "Mandate modern filters on industrial smokestacks. A huge win for air quality!",
        },
        city_dec3: {
          title: "Rooftop Garden Initiative",
          description:
            "Encourage citizens to plant gardens on their roofs. Great for air and morale!",
        },
        city_dec4: {
          title: "Develop Smart Bike Lanes",
          description:
            "Create safe, interconnected bike lanes to encourage clean commuting.",
        },
        city_dec5: {
          title: "Community Solar Program",
          description:
            "Power municipal buildings with solar energy, reducing reliance on fossil fuels.",
        },
        city_dec_AI: {
          title: "AI-Optimized Smart Grid",
          description:
            "Use our AI to create an ultra-efficient power grid, reducing waste and pollution.",
        },
      },
      cityTrainingProposals: {
        ctp1: {
          title: "Replace Parking Lot with Park",
          description: "A developer wants to build a new public park downtown.",
        },
        ctp2: {
          title: "Build a New Highway Through Suburbs",
          description:
            "This would increase traffic and pollution in a residential area.",
        },
        ctp3: {
          title: "Dump Industrial Waste in River",
          description:
            "A factory is proposing a cheaper way to get rid of its waste.",
        },
        ctp4: {
          title: "Community Composting Program",
          description: "A city-wide initiative to reduce landfill waste.",
        },
        ctp5: {
          title: "Remove Emission Standards for Cars",
          description:
            "A proposal to make it cheaper to own older, more polluting cars.",
        },
        ctp6: {
          title: "Switch Streetlights to Low-Energy LEDs",
          description:
            "This will reduce the city's overall energy consumption.",
        },
      },
      cityDistricts: {
        d1: { name: "Downtown" },
        d2: { name: "Suburbs" },
        d3: { name: "Industrial" },
        d4: { name: "Greenbelt" },
      },
    },
    cityStatusReport: {
      title: "City Status",
      aqiLabel: "Avg. Air Quality (AQI):",
      economyLabel: "Economic Health:",
      happinessLabel: "Citizen Happiness:",
      aqiLevels: {
        good: "Good",
        moderate: "Moderate",
        unhealthy: "Unhealthy",
        veryUnhealthy: "Very Unhealthy",
      },
    },
    "upgradePanel": {
  "title": "Upgrade Your AI's Green Brain!",
  "costLabel": "Cost",
  "buyButton": "BUY",
  "purchasedButton": "PURCHASED",
  "purchasedTooltip": "Already purchased",
  "buyTooltip": "Purchase this upgrade",
  "upgrades": {
    "sortSpeed": {
      "title": "Efficient Sorting Algorithm",
      "description": "Your AI learns faster from sorting. Earns +15 DP instead of +10 in minigame."
    },
    "efficientDeployment": {
      "title": "Efficient Deployment",
      "description": "Your AI cleans 1.5x more effectively per deployment."
    },
    "advancedSensors": {
      "title": "Advanced Contaminant Sensors",
      "description": "Improves AI's base learning and deployment precision. (+10 AI Accuracy on purchase, better learning rate, more effective deployment)."
    },
    "solarPanels": {
      "title": "Solar Panel Installation",
      "description": "Build a renewable energy grid. Passively generates 5 Energy every few seconds."
    },
    "biomassGenerator": {
      "title": "Biomass Generator",
      "description": "Convert logged forest tiles (stumps) directly into a burst of energy. Adds a new action button in the forest."
    }
  }
},"app": {
    "initialDialogue": "Hi! I am Eco, your AI helper!",
    "notifications": {
      "unlockForest": "Complete the Ocean Mission to unlock the Forest Guardian mission.",
      "incorrectSort": "Incorrect sort. AI Accuracy slightly affected.",
      "deploySuccess": "AI successfully deployed! Ocean health +{value}.",
      "deployFail": "Cannot deploy AI: ",
      "deployFailDP": "Not enough Data Points. ",
      "deployFailEnergy": "Not enough Energy.",
      "upgradeOwned": "Upgrade already owned.",
      "upgradeAfford": "Not enough Data Points for this upgrade.",
      "oceanComplete": "Ocean Mission Complete! Forest Mission Unlocked!",
      "noBiomass": "No logged tiles available to convert to biomass.",
      "biomassSuccess": "Converted biomass! +{value} Energy.",
      "plantSuccess": "Planted a {name} in sector ({x},{y}).",
      "plantFail": "Not enough Data Points to plant a {name}.",
      "forestTrainFail": "Not enough energy to start an AI training session.",
      "forestTrainComplete": "AI training session complete!",
      "forestDeployFail": "Not enough resources to deploy the Forest Warden AI.",
      "forestScanLowAcc": "AI Scan Complete: Accuracy is too low to scan any tiles. Please train the AI.",
      "forestScanThreat": "AI scanned a section of the forest and neutralized a {name} threat!",
      "forestScanNoThreat": "AI scanned {value} tiles and found no threats or empty space to plant.",
      "forestScanPlant": "AI scanned {value} tiles and found no threats. Planting {count} new saplings.",
      "cityPolicyFail": "Not enough resources to enact this policy!",
      "cityPolicyDiscount": "AI Discount Applied! Enacted: {name}",
      "cityPolicySuccess": "Policy enacted: {name}",
      "cityTrainComplete": "Policy review training complete!",
      "cityDeploySuccess": "AI Deployed! A new, optimized policy is now available for your review.",
      "cityDeployRecommend": "AI analysis complete! A high-impact policy has been recommended with a discount.",
      "cityDeployRecommendFail": "AI could not find an optimal policy, but the analysis cost has been paid.",
      "cityDeployAccFail": "AI analysis failed: Accuracy too low. Partially refunded {dp} DP and {energy} Energy.",
      "cityAIDupe": "AI has already provided its optimal policy solution."
    },
    "feedback": {
      "minigameBonus": "Quick work! +{value} DP bonus! Minigame complete.",
      "minigameEnd": "Minigame session ended.",
      "minigameCorrect": "Correct! +{value} DP.",
      "minigameIncorrect": "Oops! That was {type}.",
      "forestTrainCorrect": "Correct! +{value} DP. AI Accuracy Increased!",
      "forestTrainIncorrect": "Incorrect. AI Accuracy Decreased.",
      "cityTrainCorrect": "Correct! +{value} DP. AI Accuracy Increased!",
      "cityTrainIncorrect": "Incorrect. AI Accuracy Decreased."
    },
    "dialogue": {
      "oceanWelcome": "Welcome to the Ocean Mission! Let's get to work.",
      "oceanProgress": "We're making great progress!",
      "oceanPolluted": "The ocean is heavily polluted.",
      "oceanNeedDP": "We need more Data Points to deploy.",
      "oceanNeedEnergy": "Energy reserves are low for deployment.",
      "oceanReady": "Ready to improve ocean health!",
      "oceanComplete": "Fantastic! The Ocean Mission is complete! A new challenge awaits!",
      "minigameStart": "Training mode activated! Sort these items quickly and accurately.",
      "minigameEnd": "Training session complete. We've gathered valuable data!",
      "upgradeSort": "Efficient Sorting Algorithm purchased!",
      "upgradeDeploy": "Efficient Deployment System purchased!",
      "upgradeSensors": "Advanced Contaminant Sensors purchased! AI base accuracy increased.",
      "upgradeSolar": "Solar Panels installed! You will now generate energy over time.",
      "upgradeBiomass": "Biomass Generator constructed! You can now convert logged tiles into energy."
    },
    "modals": {
      "historyTitle": "Notification History",
      "historyEmpty": "No notifications yet."
    }
  },CityMap:{
    cityMap:'AQI City Map',
  }
  },

  kh: {
    mainMenu: {
      title: "Ecomind",
      subtitle: "ហ្វឹកហាត់ AI របស់អ្នកដើម្បីជួយសង្គ្រោះផែនដី",
      play: "ចាប់ផ្ដើម",
      howToPlay: "របៀបលេង",
      settings: "ការកំណត់",
      modalTitle: "របៀបលេង Ecomind",
      welcome: "សូមស្វាគមន៍ វីរបុរស-eco!",
      steps: [
        "ជ្រើសបេសកកម្ម: ជ្រើសបញ្ហាបរិស្ថានណាមួយដើម្បីដោះស្រាយ។",
        'ហ្វឹកហាត់ AI: លេងល្បែងដូចជា "តម្រៀបសំរាម" ដើម្បីប្រមូលពិន្ទុទិន្នន័យ និងធ្វើឲ្យ AI ឆ្លាត។',
        "គ្រប់គ្រងធនធាន: ពិនិត្យពិន្ទុទិន្នន័យ និងថាមពល។",
        "ដាក់អនុវត្ត AI: ប្រើ DP និងថាមពលដើម្បីអនុវត្ត AI។ ភាពជោគជ័យអាស្រ័យលើភាពត្រឹមត្រូវ។",
        "ធ្វើឲ្យ AI ខ្លាំងឡើង: ប្រើ DP ដើម្បីធ្វើឲ្យ AI របស់អ្នកឆ្លាតនិងមានប្រសិទ្ធភាព។",
      ],
      goal: "គោលដៅបស់អ្នកគឺធ្វើឲ្យបរិស្ថានស្អាតបាន 100%!",
    },
    missionSelectScreen: {
      title: "ជ្រើសរើសបេសកកម្ម",
      oceanMission: {
        cardTitle: "ជួយសម្អាតមហាសមុទ្រដែលរងការបំពុល។",
        heading: "បញ្ឈប់ការបំពុលមហាសមុទ្រ",
        description:
          "មហាសមុទ្រកំពុងតែរងការបំពុលដោយសារប្លាស្ទិក។ បណ្តុះបណ្តាល AI របស់អ្នកឱ្យស្គាល់ប្រភេទប្លាស្ទិក និងជួយប្រមូលសម្រាម!",
      },
      forestMission: {
        heading: "អ្នកយាមព្រៃឈើ",
        descriptionUnlocked:
          "កាត់បន្ថយ CO₂ ដោយគ្រប់គ្រងប្រព័ន្ធអេកូឡូស៊ីព្រៃឈើដ៏សំខាន់។",
        descriptionLocked: "ដោះសោដោយបំពេញបេសកកម្មក្នុងមហាសមុទ្រ។",
        cardTitleLocked: "បំពេញបេសកកម្មមហាសមុទ្រដើម្បីដោះសោ",
        cardTitleUnlocked: "គ្រប់គ្រងធនធានព្រៃឈើប្រកបដោយនិរន្តរភាព។",
      },
      cityMission: {
        heading: "សម្អាតខ្យល់ពុលក្នុងទីក្រុង",
        descriptionUnlocked:
          "ខ្យល់អាកាសក្នុងទីក្រុងកំពុងតែអាប់អួរខ្លាំងណាស់! សូមដាក់ចេញនូវវិធានការឆ្លាតវៃ ដើម្បីសម្អាតបរិយាកាស និងរក្សាប្រជាពលរដ្ឋឱ្យមានសុភមង្គល។",
        descriptionLocked: "ដោះសោដោយបំពេញបេសកកម្មព្រៃឈើ។",
        cardTitleUnlocked: "ដោះស្រាយបញ្ហាបំពុលខ្យល់ក្នុងទីក្រុង។",
        cardTitleLocked: "បំពេញបេសកកម្មព្រៃឈើដើម្បីដោះសោ។",
      },
      button: {
        startMission: "ចាប់ផ្តើមបេសកកម្ម",
        backToMainMenu: "ត្រឡប់ទៅទំព័រដើម",
      },
    },
    gameGuideForest: {
      title: "របៀបលេង:បេសកកម្មអ្នកការពារព្រៃឈើ",
      closeButton: "បិទ",
      gotItButton: "យល់ហើយ!",
      and: "និង",

      terms: {
        co2Level: "កម្រិត CO₂",
        globalTemp: "សីតុណ្ហភាពសកល",
        biodiversity: "ជីវចម្រុះ",
        dataPoints: "ពិន្ទុ",
        dataPointsAbbr: "DP",
        energy: "ថាមពល",
        trainAI: "បណ្តុះបណ្តាល AI",
        manageForest: "គ្រប់គ្រងព្រៃឈើ",
        deployAI: "ដាក់អោយ AI ធ្វើការ",
        upgrades: "ការអភិវឌ្ឍឲ្យប្រសើរឡើង",
        biomassGenerator: "ម៉ាស៊ីនផលិតថាមពលពីកាកសំណល់",
        loggedTiles: "ផ្ទៃដីដែលបានកាប់ឈើ",
        aiAccuracy: "ភាពត្រឹមត្រូវនៃ AI",
        diseased: "ដើមឈើមាន​​ជំងឺ",
        fireRisk: "ហានិភ័យនៃអគ្គីភ័យ",
      },

      section1Title: "ការយល់ដឹងអំពីបរិស្ថានរបស់អ្នក",
      section1_li1_part1: "ផ្នែកខាងលើនៃ Screenបង្ហាញអំពី",
      section1_li1_part2: "និង",
      section1_li1_part3: "គោលដៅរបស់អ្នកគឺកាត់បន្ថយ CO₂ ដោយបង្កើន",
      section1_li1_part4: "និងការដាំដើមឈើ។",
      section1_li2_part1: "ផែនទីបង្ហាញដើមឈើដែលមានសុខភាពល្អ",
      section1_li2_part2: "(ក្មេង)",
      section1_li2_part3: "(ចាស់) និង",
      section1_li2_part4: "ដើមឈើដែលត្រូវបានកាប់",
      section1_li2_part5: "ដោយការកាប់ឈើ។",
      mapThreatsIntro: "សូមប្រុងប្រយ័ត្ននឹងហានិភ័យដូចជា",
      section1_li3_part1: "ផ្នែកខាងឆ្វេងបង្ហាញពី",
      section1_li3_part2: "",

      section2Title: "វដ្តនៃការលេងហ្គេម",
      trainWardenIntro: "ចុចលើប៊ូតុង",
      trainWardenPurpose:
        "ដើម្បីបង្រៀនវាអោយស្គាល់ហានិភ័យដូចជារោគសញ្ញា និងហានិភ័យអគ្គីភ័យ។ វានឹងបង្កើន",
      trainWardenReward: "និងធ្វើអោយអ្នកទទួលបានពិន្ទុស្វ័យប្រវត្តិ",
      deployWardenIntro: "ចុច",
      deployWardenLogic:
        "ដើម្បីវាអោយធ្វើការស្វែងរកដើមឈើដែលមានសុខភាពល្អ។ វាមានអាទិភាពពីរចម្បង៖",
      priority1Title: "អាទិភាពទី 1៖ បន្ថយហានិភ័យ",
      priority1Desc:
        "បើ AI រកឃើញផ្ទៃដីដែលមានជំងឺ ឬហានិភ័យអគ្គីភ័យ វានឹងដោះស្រាយដោយស្វ័យប្រវត្តិ។",
      priority2Title: "អាទិភាពទី 2៖ ដាំព្រៃឡើងវិញ",
      priority2Desc:
        "បើមិនមានហានិភ័យណាដែលត្រូវដោះស្រាយទេ AI នឹងដាំដើមឈើថ្មី ដើម្បីឲ្យព្រៃលូតលាស់ឡើងវិញ។",
      section2_li2_part1: "ចុច",
      section2_li2_part2:
        "ដើម្បីបើកម៉ឺនុយដាំដើមឈើ និងដាំដើមឈើខ្លួនឯងដោយប្រើពិន្ទុទិន្នន័យ។",

      section3Title: "យុទ្ធសាស្ត្រឆាប់ឈ្នះ",
      section3_li1_part1: "ប្រើប៊ូតុង",
      section3_li1_part2:
        "ដើម្បីទទួលបានការអភិវឌ្ឍអចិន្ត្រៃយ៍ ដូចជា បន្ទះសូឡា សម្រាប់ថាមពលសកម្ម ឬ",
      section3_li1_part3:
        "សម្រាប់ការបង្កើនថាមពលឆាប់រហ័សពីផ្ទៃដីនៃគល់ឈើដែលបានកាប់។",
      section3_li2_part1:
        "បើសិនអ្នកត្រូវការថាមពល  អ្នកអាចកាប់ផ្នែកខ្លះនៃព្រៃរបស់អ្នក ហើយប្រើ",
      section3_li2_part2: "ដើម្បីបំប្លែងគល់ឈើទៅជា",
      section3_li2_part3: "។",
    },
    gameGuideOcean: {
      closeButton: "✖",
      title: "របៀបលេង: បេសកកម្មមហាសមុទ្រ",
      section1Title: "1. ស្វែងយល់ពីផ្ទាំងរបស់អ្នក",
      section1_li1_part1: "គោលដៅចម្បងរបស់អ្នកគឺបង្កើន",
      section1_li1_part2: "ហើយរក្សាវាឱ្យខ្ពស់។ វាបង្ហាញពីភាពស្អាតនៃមហាសមុទ្រ។",
      section1_li2_part1: "នេះគឺជាផ្ទាំងគ្រប់គ្រង AI របស់អ្នក។ អ្នកនឹងតាមដាន",
      section1_li2_part2: "និង",
      section1_li2_part3: "របស់អ្នក។",
      section1_li3:
        "ជំនួយការ AI របស់អ្នកនឹងផ្តល់គន្លឹះ និងការណែនាំដែលមានប្រយោជន៍។",

      section2Title: "2. វដ្តនៃការលេងហ្គេម: តម្រៀបសំរាម",
      section2_p1:
        "មហាសមុទ្រពោរពេញដោយសំរាម! ភារកិច្ចរបស់អ្នកគឺបណ្តុះបណ្តាល AI របស់អ្នកឱ្យកំណត់អត្តសញ្ញាណប្រភេទនៃការបំពុលផ្សេងៗគ្នា។",
      section2_li1_part1: "ចុច",
      section2_li1_part2: "ដើម្បីចូលទៅកាន់Mini Game តម្រៀបសំរាម'។",
      section2_li2_part1: "អូសនិងទម្លាក់សំរាមចូលទៅក្នុងធុងដែលត្រឹមត្រូវ៖",
      section2_li2_bullet1: "ធុងសំរាមកែច្នៃ",
      section2_li2_bullet2: "ធុងជីកំប៉ុស",
      section2_li2_bullet3: "ធុងសំរាម",
      section2_li3_part1: "រាល់ការតម្រៀបត្រឹមត្រូវនីមួយៗនឹងផ្តល់ឱ្យអ្នកនូវ",
      section2_li3_part2: "និងបង្កើនភាពត្រឹមត្រូវរបស់ AI របស់អ្នក។",
      section2_p2:
        "ភាពត្រឹមត្រូវរបស់ AI របស់អ្នកកាន់តែខ្ពស់ ការដាក់ពង្រាយរបស់អ្នកកាន់តែមានប្រសិទ្ធភាព!",

      section3Title: "3. យុទ្ធសាស្ត្រឆាប់ឈ្នះ: ការដាក់ពង្រាយ AI និងការអាប់ដេត",
      section3_li1_part1: "នៅពេលដែលអ្នកបានប្រមូលគ្រប់គ្រាន់",
      section3_li1_part2: "និង",
      section3_li1_part3: "ហើយ ចុច",
      section3_li1_part4: "ដើម្បីបញ្ជូន AI របស់អ្នកចេញ។",
      section3_li2_part1:
        "ការដាក់ពង្រាយ AI របស់អ្នកនឹងប្រើប្រាស់ធនធាន ប៉ុន្តែដោយផ្ទាល់បង្កើន",
      section3_li2_part2: "។",
      section3_li3_part1: "ចូលទៅកាន់ផ្នែក",
      section3_li3_part2:
        "ដើម្បីចំណាយពិន្ទុទិន្នន័យរបស់អ្នកលើការអភិវឌ្ឍជាអចិន្ត្រៃយ៍ ដូចជាការធ្វើឱ្យ AI របស់អ្នកសម្អាតបានកាន់តែមានប្រសិទ្ធភាព។",
      section3_li4:
        "បន្តបណ្តុះបណ្តាល ដាក់ពង្រាយ និងអាប់ដេតរហូតទាល់តែមហាសមុទ្រស្អាតបាត!",

      gotItButton: "យល់ហើយ តោះទៅ!",

      terms: {
        oceanHealth: "សុខភាពមហាសមុទ្រ",
        dataPoints: "ពិន្ទុទិន្នន័យ",
        energy: "ថាមពល",
        trainAI: "បណ្តុះបណ្តាល AI",
        deployAI: "ដាក់ពង្រាយ AI",
        upgrades: "ការអាប់ដេត",
        recycle: "កែច្នៃ",
        compost: "ជីកំប៉ុស",
        trash: "សំរាម",
      },
    },
    "gameGuideCity": {
  "title": "របៀបលេង: បេសកកម្មសង្គ្រោះខ្យល់ក្នុងទីក្រុង",
  "goalTitle": "គោលដៅរបស់អ្នក:",
  "goalDescription": "សម្អាតខ្យល់ក្នុងទីក្រុងដោយកាត់បន្ថយស្ថានភាពពុលក្នុងខ្យល់ជាមធ្យម (AQI) ឱ្យបានទាបបំផុតតាមដែលអាចធ្វើទៅបាន!",
  "step1Title": "ពិនិត្យមើលស្ថានភាពក្នុងផែនទី :",
  "step1Description": "ផ្ទាំងខាងឆ្វេងបង្ហាញអ្នកពីតំបន់ណាដែលរងការបំពុល និងសុខភាពទូទៅនៃទីក្រុងរបស់អ្នក។",
  "step2Title": "បណ្តុះបណ្តាល AI:",
  "step2Description": "ចុច \"បណ្តុះបណ្តាល AI\" ដើម្បីលេងMini Game។ នេះជាមធ្យោបាយចម្បងរបស់អ្នកដើម្បីទទួលបាន ពិន្ទុទិន្នន័យ (DP) !",
  "step3Title": "អនុវត្តគោលការណ៍:",
  "step3Description": "ផ្ទាំងខាងស្តាំបង្ហាញបញ្ជីគោលការណ៍។ ប្រើ DP និង ថាមពល របស់អ្នកដើម្បី \"យល់ព្រម\" លើគោលការណ៍ទាំងនោះ។ គោលការណ៍នីមួយៗមានឥទ្ធិពលខុសៗគ្នាលើ AQI, សេដ្ឋកិច្ច, និងក្ដីសុខរបស់ទីក្រុងអ្នក។",
  "step4Title": "គ្រប់គ្រងធនធាន:",
  "step4Description": "ប្រើប៊ូតុង \"ការធ្វើឱ្យប្រសើរឡើង\" ដើម្បីទិញការអភិវឌ្ឍអចិន្ត្រៃយ៍ ដូចជាបន្ទះសូឡាសម្រាប់ការបង្កើតថាមពល។",
  "conclusion": "ធ្វើឱ្យមានតុល្យភាពរវាងបរិស្ថាន និងសេដ្ឋកិច្ច ដើម្បីក្លាយជាអ្នកគ្រប់គ្រងទីក្រុងដ៏ជោគជ័យ!"
},
    alertsLowEnergy: {
      lowEnergyTitle:
        "ថាមពលទាប!!! ពិចារណាក្នុងការទិញ បន្ទះសូឡា ពីម៉ឺនុយ ការអាប់ដេត ",
      lowEnergyMessagePart1:
        "ថាមពលបម្រុងរបស់អ្នកទាបណាស់។ អ្នកប្រហែលជាមិនអាចដាក់ពង្រាយ AI ឬហ្វឹកហាត់បានទេ!",
      lowEnergyMessagePart2:
        "ពិចារណាទិញ **បន្ទះសូឡា** ពីម៉ឺនុយ **ការអាប់ដេត** ដើម្បីបង្កើតថាមពលដោយស្វ័យប្រវត្តិទៅតាមពេលវេលា។",
      gotItButton: "យល់ហើយ",
    },
  "cityAITraining": {
    "title": "ការបណ្តុះបណ្តាល AI ទីក្រុង",
    "subtitle": "ចាត់ថ្នាក់សំណើទីក្រុងទាំងនេះដើម្បីជួយបណ្តុះបណ្តាល AI។",
    "goodIdea": "គំនិតល្អ",
    "badIdea": "គំនិតមិនល្អ",
    "proposalLabel": "សំណើ",
    "dataLabel": "ទិន្នន័យ",
    "trainingComplete": "ការបណ្តុះបណ្តាលបានបញ្ចប់!",
    "returnToCity": "ត្រឡប់ទៅទីក្រុងវិញ",
    "endTraining": "បញ្ចប់ការបណ្តុះបណ្តាល",
    "tutorial": {
      "step4_text": "ពិនិត្យមើលសំណើនិមួយៗ ហើយចាត់ថ្នាក់វាជា 'គំនិតល្អ' ឬ 'គំនិតមិនល្អ' ដើម្បីទទួលបានពិន្ទុទិន្នន័យ និងកែលម្អ AI។",
      "button_lets_go": "តោះទៅ!"
    },
    "proposals": {
      "ctp1_title": "ជំនួសកន្លែងចតឡានដោយសួនច្បារ",
      "ctp1_desc": "អ្នកអភិវឌ្ឍន៍ម្នាក់ចង់សាងសង់សួនសាធារណៈថ្មីមួយនៅកណ្តាលទីក្រុង។",
      "ctp2_title": "សាងសង់ផ្លូវHigh-wayថ្មីឆ្លងកាត់ជាយក្រុង",
      "ctp2_desc": "នឹងបង្កើនចរាចរណ៍ និងការបំពុលនៅក្នុងតំបន់លំនៅដ្ឋាន។",
      "ctp3_title": "ចាក់កាកសំណល់ឧស្សាហកម្មចូលទន្លេ",
      "ctp3_desc": "រោងចក្រមួយកំពុងស្នើវិធីថោកដើម្បីកម្ចាត់កាកសំណល់របស់ខ្លួន។",
      "ctp4_title": "សហគមន៍ធ្វើជីកំប៉ុស្ត",
      "ctp4_desc": "គំនិតផ្តួចផ្តើមទូទាំងទីក្រុងដើម្បីកាត់បន្ថយកាកសំណល់កន្លែងចាក់សំរាម។",
      "ctp5_title": "លុបចោលស្តង់ដារបំភាយឧស្ម័នសម្រាប់រថយន្ត",
      "ctp5_desc": "សំណើដើម្បីធ្វើឱ្យការកាន់កាប់រថយន្តចាស់ៗ ដែលបំពុលច្រើន កាន់តែថោក។",
      "ctp6_title": "ប្តូរភ្លើងបំភ្លឺផ្លូវទៅជាអំពូល LED ដែលស៊ីភ្លើងតិច",
      "ctp6_desc": "នឹងកាត់បន្ថយការប្រើប្រាស់ថាមពលសរុបរបស់ទីក្រុង។"
    }
  },

    cityMissionScreen: {
      title: "បេសកកម្មសង្គ្រោះខ្យល់ក្នុងទីក្រុង",
      resources: {
        dataPoints: "ពិន្ទុទិន្នន័យ",
        energy: "ថាមពល",
        aiAccuracy: "ភាពត្រឹមត្រូវ AI ទីក្រុង",
      },
      buttons: {
        trainAI: "បណ្តុះបណ្តាល AI",
        deployAI: "ដាក់ពង្រាយ AI",
        upgrades: "ការធ្វើឲ្យប្រសើរឡើង",
        help: "ជំនួយ",
        backToMissions: "ត្រឡប់ទៅបេសកកម្ម",
      },
  "decisionCard": {
    "approve": "យល់ព្រម",
    "recommended": "AI បានណែនាំ!", // Add the Khmer translation
    "cost": "តម្លៃ",
    "effects": "ផលទទួលបាន"
  },  "tutorial": {
      "button_next": "បន្ទាប់",
      "button_got_it": "យល់ព្រម!",
      "step1_text": "សូមស្វាគមន៍មកកាន់ទីក្រុង! គោលដៅរបស់អ្នកគឺកែលម្អទីក្រុងដោយបន្ថយ <strong>AQI (ជាតិពុលក្នុងខ្យល់)</strong>។",
      "step2_text": "អ្នកនឹងប្រើ <strong>ពិន្ទុទិន្នន័យ</strong> និង <strong>ថាមពល</strong> ដើម្បីអនុម័តគោលការណ៏ក្នុងទីក្រុងថ្មី។",
      "step3_text": "ចុច <strong>'បង្វឹក AI'</strong> ដើម្បីបង្រៀន AI អំពីគោលការណ៏ល្អ និងអាក្រក់ ហើយទទួលបានពិន្ទុទិន្នន័យ។",
      "step5_text": "នេះគឺជាបញ្ជីនៃគោលការណ៏ដែលមាន។ ចុច <strong>អនុម័ត</strong> នៅលើកាតដើម្បីអនុវត្តវា។",
      "step6_text": "<strong>'ដាក់ពង្រាយ AI'</strong> ដើម្បីឱ្យ AI ស្នើគោលការណ៏ថ្មីដែលមានប្រសិទ្ធភាពខ្ពស់សម្រាប់អ្នកដើម្បីអនុម័ត!",
      "step7_text": "កុំភ្លេចចូលទៅកាន់ <strong>'ការដំឡើងកំណែ'</strong> ដើម្បីសាងសង់បន្ទះសូឡាសម្រាប់ថាមពលបន្ថែម។"
    }
    },
    forestAITraining: {
      trainingComplete: "ការបណ្តុះបណ្តាលបានបញ្ចប់!",
      returnToMission: "ត្រឡប់ទៅបេសកកម្មវិញ",
      title: "ការបណ្តុះបណ្តាល AI: វិភាគរូបភាព",
      subtitle: "ចាត់ថ្នាក់រូបភាពដើម្បីបង្កើនភាពត្រឹមត្រូវរបស់ AI។",
      labels: {
        healthy: "មានសុខភាពល្អ",
        diseased: "កំពុងរងគ្រោះ",
        fireRisk: "ហានិភ័យភ្លើង",
      },
      progress: {
        image: "រូបភាព",
        data: "ទិន្នន័យ",
      },
      endTraining: "បញ្ចប់ការបណ្តុះបណ្តាល",
        "descriptions": {
      "desc_1": "គ្រប់ដណ្ដប់ដោយដើមឈើបៃតង, ពណ៌បៃតងរស់រវើក។",
      "desc_2": "ស្លឹកមានស្នាមអុចៗពណ៌ត្នោត និងស្រពោន។",
      "desc_3": "រុក្ខជាតិក្រោមដីស្ងួតខ្លាំង, អាចបង្កជាភ្លើង។",
      "desc_4": "ខៀវស្រងាត់, មានជីវិតរុក្ខជាតិចម្រុះ។",
      "desc_5": "ស្លឹកស្រល់ប្រែពណ៌ត្នោត, សញ្ញានៃភាពទទួលការបំផ្លាញដោយសត្វល្អិត។",
      "desc_6": "កូនឈើបង្ហាញពីការលូតលាស់ថ្មី។"
    },
    // New keys for the tutorial
    "tutorial": {
      "step4_text": "ដាក់ស្លាករូបភាពទាំងនេះឱ្យត្រឹមត្រូវ ដើម្បីបង្កើនភាពត្រឹមត្រូវរបស់ AI និងទទួលបានពិន្ទុទិន្នន័យ។",
      "button_lets_go": "តោះទៅ!"
    }
    },
    forestMissionScreen: {
      actionsTitle: "សកម្មភាព",
      resources: {
        dataPoints: "ពិន្ទុទិន្នន័យ: ប្រើសម្រាប់ដាំ និងធ្វើឲ្យប្រសើរឡើង",
        energy: "ថាមពល: ប្រើសម្រាប់ការបណ្តុះបណ្តាល AI",
        aiAccuracy: "ភាពត្រឹមត្រូវ AI ព្រៃឈើ",
      },
      buttons: {
        trainAI: "បណ្តុះបណ្តាល AI",
        trainAITitle: "បណ្តុះបណ្តាល AI ដើម្បីកំណត់សុខភាពព្រៃឈើ",
        deployAI: "ដាក់ពង្រាយ AI",
        deployAITitle: "ដាក់ពង្រាយ AI ដើម្បីដាំកូនឈើដោយស្វ័យប្រវត្តិ",
        manageForest: "គ្រប់គ្រងព្រៃឈើ",
        convertBiomass: "បំប្លែងជីវម៉ាស",
        convertBiomassTitle: "បំប្លែងដីដែលបានកាប់ឈើ ១ ទៅជាថាមពល",
        upgrades: "ការធ្វើឲ្យប្រសើរឡើង",
        help: "ជំនួយ",
        backToMissions: "ត្រឡប់ទៅបេសកកម្ម",
      },
       "tileTypes": {
    "empty": "គ្មាន",
    "young": "កូនឈើ",
    "mature": "ឈើធំ",
    "fire": "កំពុងឆេះ",
    "logged": "បានកាប់",
    "diseased": "មានជំងឺ",
    "fire_risk": "ហានិភ័យភ្លើង",
    "plantable": "អាចដាំបាន"
  },"tutorial": {
      "button_next": "បន្ទាប់",
      "button_got_it": "យល់ព្រម!",
      "step1_text": "សូមស្វាគមន៍មកកាន់បេសកកម្មព្រៃឈើ! គោលដៅរបស់អ្នកគឺបន្ថយ <strong>CO₂</strong> និងសីតុណ្ហភាពដោយការស្តារព្រៃឈើឡើងវិញ។",
      "step2_text": "អ្នកនឹងត្រូវការ <strong>ពិន្ទុទិន្នន័យ</strong> និង <strong>ថាមពល</strong>។ ទទួលបានពិន្ទុទិន្នន័យតាមរយៈការបង្វឹក AI។",
      "step3_text": "ចុច <strong>'បង្វឹក AI'</strong> ដើម្បីបង្រៀនវាឱ្យស្គាល់ដើមឈើដែលមានសុខភាពល្អ និងមិនល្អ។",
      "step5_text": "ប្រើ DP និងថាមពលដើម្បី <strong>ដាក់ពង្រាយ AI</strong>។ វានឹងដកចេញនូវការគំរាមកំហែង ឬដាំដើមឈើថ្មីដោយស្វ័យប្រវត្តិ!",
      "step6_text": "ចុច <strong>'គ្រប់គ្រងព្រៃឈើ'</strong> ដើម្បីបើកម៉ឺនុយ និងដាំដើមឈើដោយខ្លួនឯង។ នេះជាវិធីល្អបំផុតដើម្បីបន្ថយ CO₂!",
      "step7_text": "នេះជាព្រៃឈើរបស់អ្នក។ ចុចលើក្រឡាទទេដើម្បីដាំដើមឈើដែលអ្នកជ្រើសរើសពីម៉ឺនុយ។"
    }
    },
    oceanMissionScreen: {
      oceanHealthLabel: "ស្ថានភាពមហាសមុទ្រ",
      resources: {
        dataPointsTitle:
          "ពិន្ទុទិន្នន័យ៖ ប្រើសម្រាប់បណ្តុះបណ្តាល និងធ្វើឲ្យប្រសើរឡើង",
        energyTitle: "ថាមពល៖ ប្រើសម្រាប់ដាក់ពង្រាយ AI",
        aiAccuracyTitle:
          "ភាពត្រឹមត្រូវរបស់ AI៖ ប៉ះពាល់ដល់ភាពជោគជ័យនៃការដាក់ពង្រាយ",
      },
      buttons: {
        trainAI: "បណ្តុះបណ្តាល AI",
        trainAITitle:
          "ទៅកាន់Mini Gameដើម្បីទទួលបានពិន្ទុទិន្នន័យ និងបង្កើនសមត្ថភាព AI។",
        deployAI: "ដាក់ពង្រឺង AI",
        deployAITitle:
          "ដាក់ពង្រាយ AI ដើម្បីសម្អាតមហាសមុទ្រ។ ត្រូវការ DP និងថាមពល។",
        upgrades: "ការធ្វើឲ្យប្រសើរឡើង",
        upgradesTitle: "មើល និងទិញការធ្វើឲ្យប្រសើរឡើងសម្រាប់ AI។",
        help: "ជំនួយ",
        backToMissions: "ត្រឡប់ទៅបេសកកម្ម",
      }, // New keys for the footer
    "showTutorial": "បង្ហាញការណែនាំ",
    "help": "ជំនួយ",
    "backToMissions": "ត្រឡប់ទៅបេសកកម្ម",
    // New keys for the tutorial steps
    "tutorial": {
      "button_next": "បន្ទាប់",
      "button_got_it": "យល់ព្រម!",
      "step1_text": "សូមស្វាគមន៍មកកាន់បេសកកម្មមហាសមុទ្រ! គោលដៅរបស់អ្នកគឺដើម្បីស្តារ <strong>សុខភាពមហាសមុទ្រ</strong> ឱ្យដល់ 100% ឡើងវិញ។",
      "step2_text": "ដើម្បីធ្វើដូចនេះ អ្នកនឹងត្រូវការ <strong>ពិន្ទុទិន្នន័យ (DP)</strong> ដែលអ្នកទទួលបានពីការបង្វឹកខ្ញុំ។",
      "step3_text": "ចុច <strong>'បង្វឹក AI'</strong> ដើម្បីចាប់ផ្តើមល្បែងតម្រៀបសំរាម។",
      "step5_text": "ធ្វើបានល្អ! ការដាក់ពង្រាយ AI ក៏ត្រូវចំណាយ <strong>ថាមពល ⚡️</strong> ផងដែរ។",
      "step6_text": "នៅពេលអ្នកមានធនធានគ្រប់គ្រាន់ សូម <strong>'ដាក់ពង្រាយ AI'</strong> ដើម្បីប្រមូលសំរាម និងសម្អាតមហាសមុទ្រដោយស្វ័យប្រវត្តិ។",
      "step7_text": "ចូលទៅកាន់ <strong>'ការដំឡើងកំណែ'</strong> ដើម្បីទទួលបានរបស់សំខាន់ៗដូចជា <strong>ប្រព័ន្ធសូឡា</strong> សម្រាប់ថាមពលបន្ថែម។"
    }
    },
    sortTrashMinigame: {
      setup: "កំពុងរៀបចំការបណ្តុះបណ្តាល...",
      returnToMission: "ត្រឡប់ទៅបេសកកម្មវិញ",
      title: "ការបណ្តុះបណ្តាល AI: តម្រៀបសំរាម!",
      timeLeft: "ពេលវេលានៅសល់៖",
      instruction: "កំណត់អត្តសញ្ញាណ និងតម្រៀបវត្ថុនេះ៖",
      buttons: {
        recycle: "កែច្នៃ",
        compost: "ជីកំប៉ុស",
        trash: "សំរាម",
      },
      progress: {
        item: "វត្ថុ",
        data: "ទិន្នន័យ",
      },
      endTraining: "បញ្ចប់ការបណ្តុះបណ្តាល",
    },
    gameData: {
      trashItems: {
        1: { name: "ដប​ជ័រ" },
        2: { name: "ស្នូលផ្លែប៉ោម" },
        3: { name: "ឆ្អឹងត្រី" },
        4: { name: "ថង់​ប្លា​ស្ទិ​ក" },
        5: { name: "សំបកចេក" },
        6: { name: "កាសែតចាស់" },
        7: { name: "បំបែងកែវ" },
        8: { name: "កំប៉ុងដែក" },
        9: { name: "សំបកស៊ុត" },
        10: { name: "ពែងស្នោ" },
      },
      treeTypes: {
        oak: { name: "ដើមឈើអុក" },
        pine: { name: "ដើមស្រល់" },
        sequoia: { name: "ដើមសេក្វូយ៉ា" },
        mangrove: { name: "ដើមកោងកាង" },
      },
      forestTraining: {
        1: { description: "ដំបូលព្រៃមានសុខភាពល្អ, ពណ៌បៃតងរស់រវើក។" },
        2: { description: "ស្លឹកមានស្នាមអុចៗពណ៌ត្នោត និងស្រពោន។" },
        3: { description: "រុក្ខជាតិក្រោមដីស្ងួតខ្លាំង, អាចបង្កជាភ្លើង។" },
        4: { description: "ខៀវស្រងាត់, មានជីវិតរុក្ខជាតិចម្រុះ។" },
        5: {
          description: "ស្លឹកស្រល់ប្រែពណ៌ត្នោត, សញ្ញានៃការបំផ្លាញដោយសត្វល្អិត។",
        },
        6: { description: "កូនឈើបង្ហាញពីការលូតលាស់ថ្មី។" },
      },
      cityDecisions: {
        city_dec1: {
          title: "ជួយបង់ថ្លៃតាក់ស៊ីអគ្គិសនី",
          description:
            "ជួយអ្នកបើកបរតាក់ស៊ីប្ដូរទៅប្រើប្រាស់រថយន្តអគ្គិសនី ដើម្បីកាត់បន្ថយការបំពុលចរាចរណ៍។",
        },
        city_dec2: {
          title: "ដំឡើងរោងចក្រឱ្យទាន់សម័យ",
          description:
            "តម្រូវឱ្យមានភាពទំនើបៗនៅលើបំពង់ផ្សែងឧស្សាហកម្ម។ ជាជ័យជម្នះដ៏ធំធេងសម្រាប់គុណភាពខ្យល់!",
        },
        city_dec3: {
          title: "ដាំសួនច្បារនៅលើដំបូល",
          description:
            "លើកទឹកចិត្តប្រជាពលរដ្ឋឱ្យដាំដំណាំលើដំបូលផ្ទះរបស់ពួកគេ។ ",
        },
        city_dec4: {
          title: "អភិវឌ្ឍន៍គន្លងផ្លូវកង់",
          description:
            "បង្កើតគន្លងផ្លូវកង់ដែលមានសុវត្ថិភាព និងតភ្ជាប់គ្នា ដើម្បីលើកទឹកចិត្តដល់អ្នកធ្វើដំណើរដោយកង់។",
        },
        city_dec5: {
          title: "សហគមន៍ប្រើប្រាស់ថាមពលSolar",
          description:
            "ផ្តល់ថាមពលដល់អគារដោយថាមពលពន្លឺព្រះអាទិត្យ និងកាត់បន្ថយការពឹងផ្អែកលើឥន្ធនៈ។",
        },
        city_dec_AI: {
          title: "បណ្ដាញអគ្គិសនីឆ្លាតវៃបង្កើនប្រសិទ្ធភាពដោយ AI",
          description:
            "ប្រើប្រាស់ AI របស់យើងដើម្បីបង្កើតបណ្ដាញអគ្គិសនីដែលមានប្រសិទ្ធភាពខ្ពស់បំផុត កាត់បន្ថយការខ្ជះខ្ជាយ និងការបំពុល។",
        },
      },
      cityTrainingProposals: {
        ctp1: {
          title: "ប្តូរកន្លែងចតឡានទៅជាសួនច្បារ",
          description:
            "អ្នកអភិវឌ្ឍន៍ម្នាក់ចង់សាងសង់សួនសាធារណៈថ្មីនៅកណ្តាលក្រុង។",
        },
        ctp2: {
          title: "សាងសង់ផ្លូវHigh way ថ្មីកាត់តំបន់ជាយក្រុង",
          description:
            "នេះនឹងបង្កើនការកកស្ទះចរាចរណ៍ និងការបំពុលនៅតំបន់លំនៅដ្ឋាន។",
        },
        ctp3: {
          title: "បោះចោលកាកសំណល់ឧស្សាហកម្មចូលទន្លេ",
          description:
            "រោងចក្រមួយកំពុងស្នើវិធីសាស្រ្តដែលមានតម្លៃថោកដើម្បីកម្ចាត់កាកសំណល់របស់ខ្លួន។",
        },
        ctp4: {
          title: "កម្មវិធីជីកំប៉ុស្តសហគមន៍",
          description:
            "គំនិតផ្តួចផ្តើមក្នុងទីក្រុងដើម្បីកាត់បន្ថយកាកសំណល់ពីកន្លែងចាក់សំរាម។",
        },
        ctp5: {
          title: "លុបចោលការបំពុលរបស់រថយន្ត",
          description: "គោលបំណងដើម្បីធ្វើឱ្យទ្បានចាស់មានតម្លៃថោក។",
        },
        ctp6: {
          title: "ប្តូរភ្លើងបំភ្លឺផ្លូវទៅជាអំពូល LED ដែលស៊ីភ្លើងតិច",
          description: "កាត់បន្ថយការប្រើប្រាស់ថាមពលសរុបរបស់ទីក្រុង។",
        },
      },
      cityDistricts: {
        d1: { name: "Downtown" },
        d2: { name: "Suburbs" },
        d3: { name: "Industrial" },
        d4: { name: "Greenbelt" },
      },
    },
    cityStatusReport: {
      title: "ស្ថានភាពទីក្រុង",
      aqiLabel: "គុណភាពខ្យល់ជាមធ្យម (AQI):",
      economyLabel: "ស្ថានភាពសេដ្ឋកិច្ច:",
      happinessLabel: "ក្ដីសុខប្រជាជន:",
      aqiLevels: {
        good: "ល្អ",
        moderate: "មធ្យម",
        unhealthy: "មិនល្អចំពោះសុខភាព",
        veryUnhealthy: "គ្រោះថ្នាក់ខ្លាំង",
      },
    }, "upgradePanel": {
    "title": "ដំឡើងកំណែAI's Green Brain​របស់អ្នក!",
    "costLabel": "តម្លៃ",
    "buyButton": "ទិញ",
    "purchasedButton": "បានទិញរួចហើយ",
    "purchasedTooltip": "បានទិញរួចហើយ",
    "buyTooltip": "ទិញការដំឡើងកំណែនេះ",
    "upgrades": {
      "sortSpeed": {
        "title": "ក្បួនដោះស្រាយការតម្រៀបប្រកបដោយប្រសិទ្ធភាព",
        "description": "AI របស់អ្នករៀនលឿនជាងមុនពីការតម្រៀប។ ទទួលបាន +15 DP ជំនួសឱ្យ +10 នៅក្នុង minigame។"
      },
      "efficientDeployment": {
        "title": "ការដាក់ពង្រាយប្រកបដោយប្រសិទ្ធភាព",
        "description": "AI របស់អ្នកសម្អាតបាន 1.5 ដង កាន់តែមានប្រសិទ្ធភាពរាល់ពេលដាក់ពង្រាយ។"
      },
      "advancedSensors": {
        "title": "ឧបករណ៍ចាប់សញ្ញាបំពុលកម្រិតខ្ពស់",
        "description": "បង្កើនការរៀនមូលដ្ឋានរបស់ AI និងភាពជាក់លាក់នៃការដាក់ពង្រាយ។ (+10 ភាពត្រឹមត្រូវរបស់ AI នៅពេលទិញ, អត្រារៀនសូត្រកាន់តែប្រសើរ, ការដាក់ពង្រាយកាន់តែមានប្រសិទ្ធភាព)។"
      },
      "solarPanels": {
        "title": "ការដំឡើងបន្ទះស្រូបពន្លឺព្រះអាទិត្យ",
        "description": "បង្កើតបណ្ដាញថាមពលកកើតឡើងវិញ។ បង្កើតថាមពល 5 ដោយអសកម្មរៀងរាល់ពីរបីវិនាទីម្តង។"
      },
      "biomassGenerator": {
        "title": "ម៉ាស៊ីនផលិតថាមពលពីកាកសំណល់",
        "description": "បំលែងក្បឿងព្រៃឈើដែលបានកាប់ (គល់ឈើ) ដោយផ្ទាល់ទៅជាថាមពលភ្លាមៗ។ បន្ថែមប៊ូតុងសកម្មភាពថ្មីនៅក្នុងព្រៃ។"
      }
    }
  },"app": {
    "initialDialogue": "សួស្តី! ខ្ញុំ Eco ជាជំនួយការ AI របស់អ្នក!",
    "notifications": {
      "unlockForest": "បំពេញបេសកកម្មមហាសមុទ្រដើម្បីដោះសោបេសកកម្មអ្នកការពារព្រៃឈើ។",
      "incorrectSort": "ការតម្រៀបមិនត្រឹមត្រូវ។ ភាពត្រឹមត្រូវរបស់ AI ត្រូវបានប៉ះពាល់បន្តិចបន្តួច។",
      "deploySuccess": "AI ត្រូវបានដាក់ពង្រាយដោយជោគជ័យ! សុខភាពមហាសមុទ្រ +{value}។",
      "deployFail": "មិនអាចដាក់ពង្រាយ AI បានទេ៖ ",
      "deployFailDP": "ពិន្ទុទិន្នន័យមិនគ្រប់គ្រាន់។ ",
      "deployFailEnergy": "ថាមពលមិនគ្រប់គ្រាន់។",
      "upgradeOwned": "ការដំឡើងកំណែត្រូវបានធ្វើរួចហើយ។",
      "upgradeAfford": "ពិន្ទុទិន្នន័យមិនគ្រប់គ្រាន់សម្រាប់ការដំឡើងកំណែនេះ។",
      "oceanComplete": "បេសកកម្មមហាសមុទ្របានបញ្ចប់! បេសកកម្មព្រៃឈើត្រូវបានដោះសោ!",
      "noBiomass": "គ្មានក្រឡាដែលបានកាប់ឈើដែលអាចបំប្លែងទៅជាជីវម៉ាស់បានទេ។",
      "biomassSuccess": "បានបំប្លែងជីវម៉ាស់! +{value} ថាមពល។",
      "plantSuccess": "បានដាំ {name} នៅក្នុងផ្នែក ({x},{y})។",
      "plantFail": "ពិន្ទុទិន្នន័យមិនគ្រប់គ្រាន់ដើម្បីដាំ {name}។",
      "forestTrainFail": "ថាមពលមិនគ្រប់គ្រាន់ដើម្បីចាប់ផ្តើមវគ្គបណ្តុះបណ្តាល AI។",
      "forestTrainComplete": "វគ្គបណ្តុះបណ្តាល AI បានបញ្ចប់!",
      "forestDeployFail": "ធនធានមិនគ្រប់គ្រាន់ដើម្បីដាក់ពង្រាយ AI អោយថែរក្សាព្រៃឈើ។",
      "forestScanLowAcc": "ការស្កេន AI បានបញ្ចប់៖ ភាពត្រឹមត្រូវទាបពេកមិនអាចស្កេនក្រឡាណាមួយបានទេ។ សូមបណ្តុះបណ្តាល AI។",
      "forestScanThreat": "AI បានរកឃើញ និងបញ្ឈប់គ្រោះថ្នាក់ {name} នៅក្នុងព្រៃ!",
      "forestScanNoThreat": "AI បានស្កេនក្រឡា {value} ហើយមិនបានរកឃើញការគ្រោះថ្នាក់ ឬកន្លែងទទេដើម្បីដាំទេ។",
      "forestScanPlant": "AI បានស្កេនក្រឡា {value} ហើយមិនបានរកឃើញការគ្រោះថ្នាក់។ កំពុងដាំកូនឈើថ្មី {count} ដើម។",
      "cityPolicyFail": "ធនធានមិនគ្រប់គ្រាន់ដើម្បីអនុម័តគោលការណ៏នេះ!",
      "cityPolicyDiscount": "ការបញ្ចុះតម្លៃ AI ត្រូវបានអនុវត្ត! បានអនុម័ត៖ {name}",
      "cityPolicySuccess": "គោលការណ៏ត្រូវបានអនុម័ត៖ {name}",
      "cityTrainComplete": "ការបណ្តុះបណ្តាលពិនិត្យគោលការណ៏បានបញ្ចប់!",
      "cityDeploySuccess": "AI ត្រូវបានដាក់ពង្រាយ! គោលការណ៏ថ្មីដែលត្រូវបានបង្កើនប្រសិទ្ធភាពឥឡូវនេះអាចរកបានសម្រាប់ការពិនិត្យរបស់អ្នក។",
      "cityDeployRecommend": "ការវិភាគ AI បានបញ្ចប់! គោលការណ៏ដែលមានផលប៉ះពាល់ខ្ពស់ត្រូវបានណែនាំជាមួយនឹងការបញ្ចុះតម្លៃ។",
      "cityDeployRecommendFail": "AI មិនអាចរកឃើញដំណោះស្រាយគោលការណ៏ដ៏ល្អបំផុតទេ ប៉ុន្តែការចំណាយលើការវិភាគត្រូវបានបង់រួចហើយ។",
      "cityDeployAccFail": "ការវិភាគ AI បរាជ័យ៖ ភាពត្រឹមត្រូវទាបពេក។ បានបង្វិលសង {dp} DP និង {energy} ថាមពលវិញមួយផ្នែក។",
      "cityAIDupe": "AI បានផ្តល់ដំណោះស្រាយគោលការណ៏ដ៏ល្អបំផុតរបស់ខ្លួនរួចហើយ។"
    },
    "feedback": {
      "minigameBonus": "ធ្វើបានលឿន! ប្រាក់រង្វាន់ DP +{value}! ល្បែងតូចបានបញ្ចប់។",
      "minigameEnd": "វគ្គល្បែងតូចបានបញ្ចប់។",
      "minigameCorrect": "ត្រឹមត្រូវ! +{value} DP។",
      "minigameIncorrect": "អូ! នោះជា {type}។",
      "forestTrainCorrect": "ត្រឹមត្រូវ! +{value} DP។ ភាពត្រឹមត្រូវរបស់ AI បានកើនឡើង!",
      "forestTrainIncorrect": "មិនត្រឹមត្រូវ។ ភាពត្រឹមត្រូវរបស់ AI បានថយចុះ។",
      "cityTrainCorrect": "ត្រឹមត្រូវ! +{value} DP។ ភាពត្រឹមត្រូវរបស់ AI បានកើនឡើង!",
      "cityTrainIncorrect": "មិនត្រឹមត្រូវ។ ភាពត្រឹមត្រូវរបស់ AI បានថយចុះ។"
    },
    "dialogue": {
      "oceanWelcome": "សូមស្វាគមន៍មកកាន់បេសកកម្មមហាសមុទ្រ! តោះចាប់ផ្តើមការងារ។",
      "oceanProgress": "យើងកំពុងរីកចម្រើនយ៉ាងខ្លាំង!",
      "oceanPolluted": "មហាសមុទ្រត្រូវបានបំពុលយ៉ាងខ្លាំង។",
      "oceanNeedDP": "យើងត្រូវការពិន្ទុទិន្នន័យបន្ថែមទៀតដើម្បីដាក់ពង្រាយ។",
      "oceanNeedEnergy": "ទុនបម្រុងថាមពលទាបសម្រាប់ការដាក់ពង្រាយ។",
      "oceanReady": "ត្រៀមខ្លួនដើម្បីកែលម្អសុខភាពមហាសមុទ្រ!",
      "oceanComplete": "អស្ចារ្យណាស់! បេសកកម្មមហាសមុទ្របានបញ្ចប់! បញ្ហាប្រឈមថ្មីកំពុងរង់ចាំ!",
      "minigameStart": "របៀបបណ្តុះបណ្តាលត្រូវបានដំណើរការ! តម្រៀបរបស់របរទាំងនេះឱ្យបានលឿន និងត្រឹមត្រូវ។",
      "minigameEnd": "វគ្គបណ្តុះបណ្តាលបានបញ្ចប់។ យើងបានប្រមូលទិន្នន័យដ៏មានតម្លៃ!",
      "upgradeSort": "ក្បួនដោះស្រាយការតម្រៀបប្រកបដោយប្រសិទ្ធភាពត្រូវបានទិញ!",
      "upgradeDeploy": "ប្រព័ន្ធដាក់ពង្រាយប្រកបដោយប្រសិទ្ធភាពត្រូវបានទិញ!",
      "upgradeSensors": "ឧបករណ៍ចាប់សញ្ញាបំពុលកម្រិតខ្ពស់ត្រូវបានទិញ! ភាពត្រឹមត្រូវមូលដ្ឋានរបស់ AI បានកើនឡើង។",
      "upgradeSolar": "បន្ទះសូឡាត្រូវបានដំឡើង! ឥឡូវនេះអ្នកនឹងបង្កើតថាមពលតាមពេលវេលា។",
      "upgradeBiomass": "ម៉ាស៊ីនបង្កើតជីវម៉ាស់ត្រូវបានសាងសង់! ឥឡូវនេះអ្នកអាចបំប្លែងក្រឡាដែលបានកាប់ឈើទៅជាថាមពល។"
    },
    "modals": {
      "historyTitle": "ប្រវត្តិការជូនដំណឹង",
      "historyEmpty": "មិនទាន់មានការជូនដំណឹងនៅឡើយទេ។"
    }
  },CityMap:{
    cityMap:'ផែនទីនៃទីក្រុង AQI',
  }
  },
};
