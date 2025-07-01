//filename MainMenuScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/language';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Modal from '../components/ui/Modal';
import LanguageFlagSelector from '../utils/LanguageSelection';

const MainMenuScreen = ({ onAddNotification, aiMood }) => {
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, result } = useLanguage();
  const menu = result.mainMenu;

  return (
    <div className="screen main-menu-kid-friendly">
      <div className="main-menu-container">

        {/* MOVED: The AI buddy is now the first item for a proper mobile layout */}
        <div className="ai-buddy-corner animated-ai">
          <Icon type={aiMood || 'neutralAI'} />
          <span>Eco</span>
        </div>

        {/* Title Section */}
        <header className="main-menu-header">
          <h1>
            <Icon type="leaf" /> {menu.title}
          </h1>
          <p>{menu.subtitle}</p>
        </header>

        {/* Action Buttons */}
        <div className="main-menu-actions">
          <Button onClick={() => navigate('/missions')} className="btn-playful btn-play">
            {menu.play}
          </Button>
          <Button onClick={() => setShowHowToPlayModal(true)} className="btn-playful btn-how-to-play">
            {menu.howToPlay}
          </Button>
          <Button onClick={() => setShowSettingsModal(true)} className="btn-playful btn-settings">
            {menu.settings}
          </Button>
        </div>
      </div>

      {/* Modals remain unchanged */}
      <Modal show={showHowToPlayModal} onClose={() => setShowHowToPlayModal(false)} title={menu.modalTitle}>
        <p>{menu.welcome}</p>
        <ol>
          {menu.steps.map((step, index) => (
            <li key={index}><strong>{step}</strong></li>
          ))}
        </ol>
        <p>{menu.goal}</p>
      </Modal>

      <Modal show={showSettingsModal} onClose={() => setShowSettingsModal(false)} title={menu.settings}>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <label><strong>Choose Language:</strong></label><br />
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