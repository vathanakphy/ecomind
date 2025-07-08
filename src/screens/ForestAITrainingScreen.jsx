// src/screens/ForestAITrainingScreen.js
import { useLanguage } from '../utils/language'; // Import the hook
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
  // Get translations
  const { result } = useLanguage();
  const text = result.forestAITraining;

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
      <h2><Icon type="🧪" /> {text.title}</h2>
      <p>{text.subtitle}</p>
      <div className="training-item-area">
        <img className="training-image-placeholder" src={currentItem.visual} alt={currentItem.description} />
        <p className="training-description">{currentItem.description}</p>
      </div>
      {/* This container will now be responsive */}
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