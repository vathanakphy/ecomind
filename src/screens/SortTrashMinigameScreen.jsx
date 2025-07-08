// src/screens/SortTrashMinigameScreen.jsx
import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
import { useLanguage } from '../utils/language';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import TutorialOverlay from '../components/ui/TutorialOverlay';
import { MINIGAME_DURATION_SECONDS } from '../constants/gameConstants'; // Import constant

const SortTrashMinigameScreen = (props) => {
  const {
    minigameItems, currentItemIndex, minigameFeedback,
    dataPoints, onSortItem, onEndMinigame,
    tutorialInfo 
  } = props;

  const { result } = useLanguage();
  const text = result.sortTrashMinigame;
  
  const shouldShowTutorial = tutorialInfo.mission === 'ocean';
  const [showMinigameTutorial, setShowMinigameTutorial] = useState(shouldShowTutorial);

  // --- NEW: Timer state and logic now lives inside this component ---
  const [timeLeft, setTimeLeft] = useState(MINIGAME_DURATION_SECONDS);
  const timerRef = useRef(null);

  useEffect(() => {
    // This effect will run the timer ONLY when the tutorial is not showing.
    if (!showMinigameTutorial && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      // When time runs out, end the game.
      clearInterval(timerRef.current);
      onEndMinigame(false);
    }

    // This is a cleanup function to stop the timer if the component is removed.
    return () => clearInterval(timerRef.current);
  }, [timeLeft, showMinigameTutorial, onEndMinigame]); // Dependencies
  // --- End of new logic ---
  const handleQuitMinigame = () => {
      clearInterval(timerRef.current); // 1. Immediately stop the timer
      onEndMinigame(false);          // 2. Then call the function to navigate back
    };

  const currentItem = minigameItems[currentItemIndex];

  if (!currentItem) {
    return (
      <div className="screen sort-trash-minigame">
        <p>{minigameFeedback || text.setup}</p>
      <Button onClick={handleQuitMinigame} className="minigame-quit-button">{text.endTraining}</Button>
      </div>
    );
  }

  return (
    <div className="screen sort-trash-minigame">
      {showMinigameTutorial && (
        <TutorialOverlay step={4} onEnd={() => setShowMinigameTutorial(false)} />
      )}
      
      <h2><Icon type="brain" /> {text.title}</h2>
      {/* This now displays the local timeLeft state */}
      <div className="minigame-timer"><Icon type="clock" /> {text.timeLeft} {timeLeft}s</div>
      
      <div className="minigame-item-area" id="tutorial-minigame-area">
        <p>{text.instruction}</p>
        <div className="item-to-sort">{currentItem.visual} {currentItem.name}</div>
        <div className="sorting-bins">
            <Button onClick={() => onSortItem(currentItem, 'Recycle')}><Icon type="recycle" /> {text.buttons.recycle}</Button>
            <Button onClick={() => onSortItem(currentItem, 'Compost')}><Icon type="compost" /> {text.buttons.compost}</Button>
            <Button onClick={() => onSortItem(currentItem, 'Trash')}><Icon type="trash" /> {text.buttons.trash}</Button>
        </div>
      </div>

      {minigameFeedback && <p className={`minigame-feedback ${minigameFeedback.includes('Correct') ? 'correct' : ''}`}>{minigameFeedback}</p>}
      <p>{text.progress.item}: {currentItemIndex + 1} / {minigameItems.length} | {text.progress.data}: {dataPoints}</p>
      <Button onClick={() => onEndMinigame(false)} className="minigame-quit-button">{text.endTraining}</Button>
    </div>
  );
};

export default SortTrashMinigameScreen;