import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Modal from '../components/ui/Modal';
// Import your new custom language selector
import LanguageFlagSelector from '../utils/LanguageSelection'; // Adjust path as necessary

const MainMenuScreen = ({ onAddNotification, aiMood }) => {
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, result } = useLanguage();
  const menu = result.mainMenu;

  return (
    <div className="screen main-menu-screen">
      {/* Main UI */}
      <div className="planet-background">
        <h1 style={{ color: 'white' }}>
          <Icon type="leaf" /> {menu.title}
        </h1>
        <p>{menu.subtitle}</p>
      </div>
      <div className="ai-helper-corner animated-ai">
        <Icon type={aiMood || 'neutralAI'} /> Eco
         <div style={{ marginTop: '1rem' }}>
          <label><strong>Choose Language:</strong></label><br />
          {/* Replace the native select with your custom component */}
          <LanguageFlagSelector 
            language={language}
            setLanguage={setLanguage}
          />
          
        </div>
      </div>
      <div className="menu-buttons">
        <Button onClick={() => navigate('/missions')} className="play-button">{menu.play}</Button>
        <Button onClick={() => setShowHowToPlayModal(true)}>{menu.howToPlay}</Button>
        <Button onClick={() => setShowSettingsModal(true)}>{menu.settings}</Button>
      </div>

      {/* How to Play Modal */}
      <Modal show={showHowToPlayModal} onClose={() => setShowHowToPlayModal(false)} title={menu.modalTitle}>
        <p>{menu.welcome}</p>
        <ol>
          {menu.steps.map((step, index) => (
            <li key={index}><strong>{step}</strong></li>
          ))}
        </ol>
        <p>{menu.goal}</p>
      </Modal>

      {/* Settings Modal (Language Selector) */}
      <Modal show={showSettingsModal} onClose={() => setShowSettingsModal(false)} title={menu.settings}>
        <div style={{ marginTop: '1rem' }}>
          <label><strong>Choose Language:</strong></label><br />
          {/* Replace the native select with your custom component */}
          <LanguageFlagSelector 
            language={language}
            setLanguage={setLanguage}
          />
          
        </div>
      </Modal>
    </div>
  );
};

export default MainMenuScreen;