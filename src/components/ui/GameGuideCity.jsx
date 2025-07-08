// src/components/ui/GameGuideCity.jsx
import React from 'react';
import { useLanguage } from '../../utils/language'; // Import the hook
import Modal from './Modal';
import Icon from '../ui/Icon';

const GameGuideCity = ({ show, onClose }) => {
  // 1. Get the translation data
  const { result } = useLanguage();

  // 2. Add a guard clause to prevent rendering before translations are loaded
  if (!result) {
    return null; // Or a loading spinner inside the modal
  }
  const text = result.gameGuideCity;

  return (
    // 3. Use the translated text for the title
    <Modal show={show} onClose={onClose} title={<>🏙️ {text.title}</>}>
      {/* 4. Replace all hardcoded strings with values from the `text` object */}
      <p><strong>{text.goalTitle}</strong> {text.goalDescription}</p>
      <ol>
        <li>
          <strong>{text.step1Title}</strong> {text.step1Description}
        </li>
        <li>
          <strong><Icon type="🧠" /> {text.step2Title}</strong> {text.step2Description}
        </li>
        <li>
          <strong>{text.step3Title}</strong> {text.step3Description}
        </li>
        <li>
          <strong><Icon type="wrench" /> {text.step4Title}</strong> {text.step4Description}
        </li>
      </ol>
      <p>{text.conclusion}</p>
    </Modal>
  );
};

export default GameGuideCity;