// src/components/ui/GameGuideCity.jsx
import React from 'react';
import Modal from './Modal';
import Icon from '../ui/Icon';

const GameGuideCity = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose} title={<>🏙️ City Air Rescue Guide</>}>
      <p><strong>Your Goal:</strong> Clean the city's air by lowering the Average Air Quality (AQI) as much as possible!</p>
      <ol>
        <li>
          <strong>Check the Map & Status:</strong> The left panel shows you which districts are polluted and your city's overall health.
        </li>
        <li>
          <strong><Icon type="🧠" /> Train AI:</strong> Click "Train AI" to play a minigame where you review policy ideas. This is your main way to earn <strong>Data Points (DP)</strong> for free!
        </li>
        <li>
          <strong>Enact Policies:</strong> The right panel shows a list of policies. Use your DP and <strong>Energy</strong> to "Approve" them. Each policy has different effects on your city's AQI, Economy, and Happiness.
        </li>
        <li>
          <strong><Icon type="wrench" /> Manage Resources:</strong> Use the "Upgrades" button to buy permanent improvements, like Solar Panels for energy generation.
        </li>
      </ol>
      <p>Balance the environment and the economy to become a successful city manager!</p>
    </Modal>
  );
};

export default GameGuideCity;