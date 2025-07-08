// src/screens/MainMenuScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language';
import Icon from '../components/ui/Icon';
import Modal from '../components/ui/Modal';
import LanguageFlagSelector from '../utils/LanguageSelection';
import ecomind from '../assets/ecomind.png'

const MainMenuScreen = ({ onAddNotification, aiMood, musicTracks, currentTrackSrc, onMusicChange }) => {
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, result } = useLanguage();
  const menu = result.mainMenu;

  return (
    <div className="screen main-menu-kid-friendly">
      {/* The extra "main-menu-container" div has been removed from here */}

      <div className="ai-buddy-corner animated-ai">
        <Icon type={aiMood || 'neutralAI'} />
        <span>Eco</span>
      </div>

      <header className="main-menu-header">
        <h1>
          <img src={ecomind} style={{ width: '100px' }} alt="Ecomind" />
          {menu.title}
        </h1>
        <p>{menu.subtitle}</p>
      </header>

      <div className="main-menu-actions">
        <button onClick={() => navigate('/missions')} className="btn-playful btn-play">
        {menu.play}
      </button>

      <button onClick={() => setShowHowToPlayModal(true)} className="btn-playful btn-how-to-play">
        {menu.howToPlay}
      </button>

      <button onClick={() => setShowSettingsModal(true)} className="btn-playful btn-settings">
        {menu.settings}
      </button>
      </div>

      <Modal show={showHowToPlayModal} onClose={() => setShowHowToPlayModal(false)} title={menu.modalTitle}>
        <p>{menu.welcome}</p>
        <ol>
          {menu.steps.map((step, index) => (
            <li key={index}><strong>{step}</strong></li>
          ))}
        </ol>
        <p>{menu.goal}</p>
      </Modal>

      <Modal
        show={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title={menu.settings}
      >
        <div className="settings-modal-content">
          {/* Language Selector */}
          <div className="settings-section">
            <label className="settings-label">🌐 Choose Language:</label>
            <LanguageFlagSelector language={language} setLanguage={setLanguage} />
          </div>

          {/* Music Selector */}
          <div className="settings-section">
            <label className="settings-label">🎵 Choose Music:</label>
            <select
              className="music-selector"
              value={currentTrackSrc}
              onChange={(e) => onMusicChange(e.target.value)}
            >
              {musicTracks.map((track) => (
                <option key={track.src} value={track.src}>
                  {track.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default MainMenuScreen;