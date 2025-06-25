// src/screens/MissionSelectScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import { useLanguage } from '../utils/language'; // Import useLanguage

const MissionSelectScreen = ({ onStartMission, isOceanMissionCompleted, isForestMissionUnlocked,isCityMissionUnlocked }) => {
  const navigate = useNavigate();
  const { result } = useLanguage(); // Get the translation function
  const missions = result.missionSelectScreen; // Get translations specific to this screen

  return (
    <div className="screen mission-select-screen">
      <h2>{missions.title}</h2> {/* Use translated title */}
      <div className="mission-cards-container">
        {/* Ocean Mission Card */}
        <div
          className={`mission-card ${isOceanMissionCompleted ? 'completed' : ''}`}
          onClick={() => onStartMission('OceanMission')}
          title={missions.oceanMission.cardTitle} 
        >
          <h3>
            <Icon type="sadFish" /> {missions.oceanMission.heading} {isOceanMissionCompleted && <Icon type="check" />} {/* Use translated heading */}
          </h3>
          <p>{missions.oceanMission.description}</p> {/* Use translated description */}
          <Button>{missions.button.startMission}</Button> {/* Use translated button text */}
        </div>

        {/* Forest Mission Card */}
        <div
          className={`mission-card ${!isForestMissionUnlocked ? 'locked' : ''}`}
          onClick={() => isForestMissionUnlocked && onStartMission('ForestMission')}
          title={!isForestMissionUnlocked ? missions.forestMission.cardTitleLocked : missions.forestMission.cardTitleUnlocked} 
        >
          <h3>
            <Icon type={isForestMissionUnlocked ? 'leaf' : 'padlock'} /> {missions.forestMission.heading} {/* Use translated heading */}
          </h3>
          <p>
            {isForestMissionUnlocked
              ? missions.forestMission.descriptionUnlocked
              : missions.forestMission.descriptionLocked} {/* Use translated descriptions */}
          </p>
          {isForestMissionUnlocked && <Button>{missions.button.startMission}</Button>} {/* Use translated button text */}
        </div>
        {/* Forest Mission Card */}
         <div 
        className={`mission-card ${!isCityMissionUnlocked ? 'locked' : ''}`} 
        onClick={() => isCityMissionUnlocked && onStartMission('CityMission')}
    >
        <h3><Icon type="🏙️" /> City Air Rescue</h3>
        <p>The city's air is choking! Enact smart policies to clean the skies and keep your citizens happy.</p>
        {isCityMissionUnlocked && <Button>START MISSION</Button>}
      </div>
      </div>

      <Button onClick={() => navigate('/')}>{missions.button.backToMainMenu}</Button> {/* Use translated button text */}
    </div>
  );
};

export default MissionSelectScreen;