// src/screens/ForestAITrainingScreen.js
import { useState, useEffect, useMemo } from 'react'; // ADD hooks
import { useLanguage } from '../utils/language';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import TutorialOverlay from '../components/ui/TutorialOverlay'; // ADD import

const ForestAITrainingScreen = ({
  trainingImages,
  currentImageIndex,
  onImageLabel,
  onEndTraining,
  dataPoints,
  forestTrainingFeedback,
  tutorialInfo // ADD new prop
}) => {
  const { result } = useLanguage();
  const text = result.forestAITraining;

  // --- NEW: Tutorial Logic ---
  const shouldShowTutorial = tutorialInfo.mission === 'forest' && tutorialInfo.step === 4;
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    setShowTutorial(shouldShowTutorial);
  }, [shouldShowTutorial]);

  // Define Step 4 for the tutorial overlay
  const forestTutorialStep4 = useMemo(() => ({
    4: {
      highlightId: 'tutorial-forest-training-area',
      text: "Label these images correctly to improve the AI's accuracy and earn Data Points.",
      buttonText: "Let's Go!",
      action: () => setShowTutorial(false),
    }
  }), []);
  // --- End of Tutorial Logic ---

  const currentItem = trainingImages[currentImageIndex];

  if (!currentItem) {
    return (
      <div className="screen ai-training-screen">
        <h2>{text.trainingComplete}</h2>
        <Button onClick={onEndTraining}>{text.returnToMission}</Button>
      </div>
    );
  }

  return(
    <div className="screen ai-training-screen">
      {/* NEW: Render the tutorial overlay */}
      {showTutorial && (
        <TutorialOverlay
          steps={forestTutorialStep4}
          step={4}
          onEnd={() => setShowTutorial(false)}
        />
      )}

      <h2><Icon type="🧪" /> {text.title}</h2>
      <p>{text.subtitle}</p>
      <div className="training-item-area" id="tutorial-forest-training-area">
        <img className="training-image-placeholder" src={currentItem.visual} alt={currentItem.description} />
        <p className="training-description">{currentItem.description}</p>
      </div>
      <div className="classification-buttons">
        <Button onClick={() => onImageLabel(currentItem, 'Healthy')}>{text.labels.healthy}</Button>
        <Button onClick={() => onImageLabel(currentItem, 'Diseased')}>{text.labels.diseased}</Button>
        <Button onClick={() => onImageLabel(currentItem, 'Fire Risk')}>{text.labels.fireRisk}</Button>
      </div>

      {forestTrainingFeedback && (
        <p className={`minigame-feedback ${forestTrainingFeedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
          {forestTrainingFeedback}
        </p>
      )}

      <p>{text.progress.image}: {currentImageIndex + 1} / {trainingImages.length} | {text.progress.data}: {dataPoints}</p>

      <Button onClick={onEndTraining} className="minigame-quit-button">{text.endTraining}</Button>
    </div>
  );
};

export default ForestAITrainingScreen;