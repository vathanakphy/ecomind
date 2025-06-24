// src/screens/MainMenuScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Modal from '../components/ui/Modal';

const MainMenuScreen = ({ onAddNotification, aiMood }) => {
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="screen main-menu-screen">
      <div className="planet-background">
        <h1><Icon type="leaf" /> EcoMind</h1>
        <p>Train Your AI to Save the Planet</p>
      </div>
      <div className="ai-helper-corner animated-ai">
        <Icon type={aiMood || 'neutralAI'} /> Eco
      </div>
      <div className="menu-buttons">
        <Button onClick={() => navigate('/missions')} className="play-button">PLAY</Button>
        <Button onClick={() => setShowHowToPlayModal(true)}>HOW TO PLAY</Button>
        <Button onClick={() => onAddNotification("Settings are not yet implemented.", "info")}>SETTINGS</Button>
      </div>
      <Modal show={showHowToPlayModal} onClose={() => setShowHowToPlayModal(false)} title="How to Play EcoMind">
        {/* ... Modal content is unchanged ... */}
        <p>Welcome, Eco-Hero!</p>
        <ol>
          <li><strong>Select a Mission:</strong> Choose an environmental challenge to tackle.</li>
          <li><strong>Train Your AI:</strong> Play minigames like "Sort the Trash" to collect Data Points (DP) and improve your AI's Accuracy.</li>
          <li><strong>Manage Resources:</strong> Keep an eye on your Data Points and Energy.</li>
          <li><strong>Deploy AI:</strong> Use DP and Energy to send your AI into the simulation to clean the environment. The AI's success depends on its Accuracy.</li>
          <li><strong>Upgrade AI:</strong> Spend DP on upgrades to make your AI smarter and more efficient.</li>
        </ol>
        <p>Your goal is to restore environmental health to 100%!</p>
      </Modal>
    </div>
  );
};

export default MainMenuScreen;