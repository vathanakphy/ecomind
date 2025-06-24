// src/screens/MissionSelectScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const MissionSelectScreen = ({ onStartMission, isOceanMissionCompleted, isForestMissionUnlocked }) => {
  const navigate = useNavigate();

  return (
    <div className="screen mission-select-screen">
      <h2>Select a Mission</h2>
      <div className="mission-cards-container">
        {/* Ocean Mission Card */}
        <div
          className={`mission-card ${isOceanMissionCompleted ? 'completed' : ''}`}
          onClick={() => onStartMission('OceanMission')}
          title="Help clean the polluted ocean waters."
        >
          <h3>
            <Icon type="sadFish" /> Stop Ocean Pollution {isOceanMissionCompleted && <Icon type="check" />}
          </h3>
          <p>The oceans are choking with plastic. Train your AI to identify and help remove it!</p>
          <Button>START MISSION</Button>
        </div>

        {/* Forest Mission Card */}
        <div
          className={`mission-card ${!isForestMissionUnlocked ? 'locked' : ''}`}
          onClick={() => isForestMissionUnlocked && onStartMission('ForestMission')}
          title={!isForestMissionUnlocked ? "Complete Ocean Mission to unlock" : "Manage forest resources sustainably."}
        >
          <h3>
            <Icon type={isForestMissionUnlocked ? 'leaf' : 'padlock'} /> Forest Guardian
          </h3>
          <p>
            {isForestMissionUnlocked
              ? "Reduce global CO₂ by managing a vital forest ecosystem."
              : "Unlock by completing the Ocean Mission."}
          </p>
          {isForestMissionUnlocked && <Button>START MISSION</Button>}
        </div>
      </div>

      <Button onClick={() => navigate('/')}>Back to Main Menu</Button>
    </div>
  );
};

export default MissionSelectScreen;
