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
   const tutorialText = text?.tutorial;

  // --- NEW: Tutorial Logic ---
  const shouldShowTutorial = tutorialInfo.mission === 'forest' && tutorialInfo.step === 4;
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    setShowTutorial(shouldShowTutorial);
  }, [shouldShowTutorial]);

  // Define Step 4 for the tutorial overlay
  const forestTutorialStep4 = useMemo(() => {
    if (!tutorialText) return {}; // Safety check

    return {
      4: {
        highlightId: 'tutorial-forest-training-area',
        textKey: "step4_text",         // Use key
        buttonTextKey: "button_lets_go", // Use key
        action: () => setShowTutorial(false),
      }
    }
  }, [tutorialText]); // Depend on the translations object

  const currentItem = trainingImages[currentImageIndex];
  // Safety check for when translations are still loading
  if (!text || !text.descriptions || !tutorialText) {
    return <div className="screen">Loading...</div>;
  }

  if (!currentItem) {
    return (
      <div className="screen ai-training-screen">
        <h2>{text.trainingComplete}</h2>
        <Button onClick={onEndTraining}>{text.returnToMission}</Button>
      </div>
    );
  }

  return (
    <div className="screen ai-training-screen">
      {/* NEW: Render the tutorial overlay */}
      {showTutorial && (
        <TutorialOverlay
          steps={forestTutorialStep4}
          step={4}
          onEnd={() => setShowTutorial(false)} // onEnd is for the close 'x' button
          translations={tutorialText} // Pass the relevant translation object
        />
      )}

      <h2><Icon type="🧪" /> {text.title}</h2>
      <p>{text.subtitle}</p>
      <div className="training-item-area" id="tutorial-forest-training-area">
        {/* --- FIX 3: Use the key to get the translated description --- */}
        <img
          className="training-image-placeholder"
          src={currentItem.visual}
          alt={text.descriptions[currentItem.descriptionKey]}
        />
        <p className="training-description">
          {text.descriptions[currentItem.descriptionKey]}
        </p>
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