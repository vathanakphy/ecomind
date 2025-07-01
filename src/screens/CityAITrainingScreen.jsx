// src/screens/CityAITrainingScreen.jsx

import React from 'react';
// Import the useLanguage hook
import { useLanguage } from '../utils/language'; 
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const CityAITrainingScreen = (props) => {
  const {
    proposals,
    currentIndex,
    onClassify,
    feedback,
    dataPoints
  } = props;

  // Get the translated text object
  const { result } = useLanguage();
  const text = result.cityAITraining;

  const currentItem = proposals[currentIndex];

  if (!currentItem) {
    return (
      <div className="screen ai-training-screen">
        {/* Use translated text */}
        <h2>{text.trainingComplete}</h2>
        <Button onClick={() => onClassify(null, null, true)}>{text.returnToCity}</Button>
      </div>
    );
  }

  return (
    <div className="screen ai-training-screen">
      {/* Use translated text */}
      <h2><Icon type="🏙️" /> {text.title}</h2>
      <p>{text.subtitle}</p>
      
      <div className="training-item-area city-proposal">
        <div className="proposal-icon"><Icon type={currentItem.icon} /></div>
        {/* Note: currentItem.title and .description come from your data prop. 
            If they also need translation, the structure would need to handle that. */}
        <h3>{currentItem.title}</h3>
        <p className="training-description">{currentItem.description}</p>
      </div>

      <div className="classification-buttons">
        {/* Use translated text */}
        <Button disabled={(currentIndex + 1) === proposals.length} onClick={() => onClassify(currentItem, 'Good Idea')}>👍 {text.goodIdea}</Button>
        <Button disabled={(currentIndex + 1) === proposals.length} onClick={() => onClassify(currentItem, 'Bad Idea')}>👎 {text.badIdea}</Button>
      </div>
        
      {feedback && (
        <p className={`minigame-feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
          {/* The 'feedback' prop is dynamic. For full translation, the parent component 
              should pass a key like 'correct' or 'incorrect' instead of a full string. */}
          {feedback}
        </p>
      )}

      {/* Use translated text */}
      <p>{text.proposalLabel}: {currentIndex + 1} / {proposals.length} | {text.dataLabel}: {dataPoints}</p>
    </div>
  );
};

export default CityAITrainingScreen;