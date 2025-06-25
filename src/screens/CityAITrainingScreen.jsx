// src/screens/CityAITrainingScreen.jsx
import React from 'react';
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

  const currentItem = proposals[currentIndex];

  if (!currentItem) {
    return (
      <div className="screen ai-training-screen">
        <h2>Training Session Complete!</h2>
        <Button onClick={() => onClassify(null, null, true)}>Return to City</Button>
      </div>
    );
  }

  return (
    <div className="screen ai-training-screen">
      <h2><Icon type="🏙️" /> AI Training: Policy Review</h2>
      <p>Is this a good or bad idea for the city's health?</p>
      
      <div className="training-item-area city-proposal">
        <div className="proposal-icon"><Icon type={currentItem.icon} /></div>
        <h3>{currentItem.title}</h3>
        <p className="training-description">{currentItem.description}</p>
      </div>

      <div className="classification-buttons">
        <Button disabled={(currentIndex+1)===proposals.length} onClick={() => onClassify(currentItem, 'Good Idea')}>👍 Good Idea</Button>
        <Button disabled={(currentIndex+1)===proposals.length}  onClick={() => onClassify(currentItem, 'Bad Idea')}>👎 Bad Idea</Button>
      </div>
        
      {feedback && (
        <p className={`minigame-feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
          {feedback}
        </p>
      )}

      <p>Proposal: {currentIndex + 1} / {proposals.length} | Data: {dataPoints}</p>
    </div>
  );
};

export default CityAITrainingScreen;