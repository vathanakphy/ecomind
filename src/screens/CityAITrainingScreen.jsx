// src/screens/CityAITrainingScreen.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../utils/language'; 
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import TutorialOverlay from '../components/ui/TutorialOverlay';

const CityAITrainingScreen = (props) => {
  const {
    proposals,
    currentIndex,
    onClassify,
    feedback,
    dataPoints,
    tutorialInfo
  } = props;

  const { result } = useLanguage();
   if (!result.cityAITraining) {
    return <div className="screen">Loading...</div>;
  }
  const text = result.cityAITraining;
  const tutorialText = text.tutorial;

  const shouldShowTutorial = tutorialInfo.mission === 'city' && tutorialInfo.step === 4;
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    setShowTutorial(shouldShowTutorial);
  }, [shouldShowTutorial]);

const cityTutorialStep4 = useMemo(() => {
    if (!tutorialText) return {};

    return {
      4: {
        highlightId: 'tutorial-city-training-area',
        textKey: "step4_text",
        buttonTextKey: "button_lets_go",
        action: () => setShowTutorial(false),
      }
    }
  }, [tutorialText]);

  const currentItem = proposals[currentIndex];

  if (!currentItem) {
    return (
      <div className="screen ai-training-screen">
        <h2>{text.trainingComplete}</h2>
        <Button onClick={() => onClassify(null, null, true)}>{text.returnToCity}</Button>
      </div>
    );
  }

  return (
    <div className="screen ai-training-screen">
      {showTutorial && (
        <TutorialOverlay
          steps={cityTutorialStep4}
          step={4}
          onEnd={() => setShowTutorial(false)}
        />
      )}
      
      <h2><Icon type="🏙️" /> {text.title}</h2>
      <p>{text.subtitle}</p>
      
      <div className="training-item-area city-proposal" id="tutorial-city-training-area">
        <div className="proposal-icon"><Icon type={currentItem.icon} /></div>
       <h3>{text.proposals[currentItem.titleKey]}</h3>
        <p className="training-description">
          {text.proposals[currentItem.descriptionKey]}
        </p>
      </div>

      <div className="classification-buttons">
        <Button disabled={(currentIndex + 1) === proposals.length} onClick={() => onClassify(currentItem, 'Good Idea')}>👍 {text.goodIdea}</Button>
        <Button disabled={(currentIndex + 1) === proposals.length} onClick={() => onClassify(currentItem, 'Bad Idea')}>👎 {text.badIdea}</Button>
      </div>
          
      {feedback && (
        <p className={`minigame-feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
          {feedback}
        </p>
      )}

      <p>{text.proposalLabel}: {currentIndex + 1} / {proposals.length} | {text.dataLabel}: {dataPoints}</p>
      
      {/* --- THIS BUTTON WAS MISSING --- */}
      <Button onClick={() => onClassify(null, null, true)} className="minigame-quit-button">
        {text.endTraining}
      </Button>
    </div>
  );
};

export default CityAITrainingScreen;