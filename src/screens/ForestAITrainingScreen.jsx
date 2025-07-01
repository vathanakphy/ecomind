// src/screens/ForestAITrainingScreen.js
import React from 'react';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const ForestAITrainingScreen = ({
  trainingImages,
  currentImageIndex,
  onImageLabel,
  onEndTraining,
  dataPoints,
  forestTrainingFeedback
}) => {
  const currentItem = trainingImages[currentImageIndex];

  if (!currentItem) {
    return (
      <div className="screen ai-training-screen">
        <h2>Training Complete!</h2>
        <Button onClick={onEndTraining}>Return to Mission</Button>
      </div>
    );
  }
  
  // FIX: Removed a duplicated block of code that was here.

  return(
    <div className="screen ai-training-screen">
      <h2><Icon type="test-tube" /> AI Training: Image Analysis</h2>
      <p>Classify the image to improve AI accuracy.</p>
      <div className="training-item-area">
        <img className="training-image-placeholder" src={currentItem.visual} alt={currentItem.description} />
        <p className="training-description">{currentItem.description}</p>
      </div>
      {/* This container will now be responsive */}
      <div className="classification-buttons">
        <Button onClick={() => onImageLabel(currentItem, 'Healthy')}>Healthy</Button>
        <Button onClick={() => onImageLabel(currentItem, 'Diseased')}>Diseased</Button>
        <Button onClick={() => onImageLabel(currentItem, 'Fire Risk')}>Fire Risk</Button>
      </div>

      {forestTrainingFeedback && (
        <p className={`minigame-feedback ${forestTrainingFeedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
          {forestTrainingFeedback}
        </p>
      )}

      <p>Image: {currentImageIndex + 1} / {trainingImages.length} | Data: {dataPoints}</p>
      <Button onClick={onEndTraining} className="minigame-quit-button">End Training</Button>
    </div>
  );
};

export default ForestAITrainingScreen;