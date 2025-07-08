// src/screens/SortTrashMinigameScreen.jsx
import React, { useState, useEffect, useMemo,useRef  } from 'react';
import { useLanguage } from '../utils/language';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import TutorialOverlay from '../components/ui/TutorialOverlay';
import { MINIGAME_DURATION_SECONDS } from '../constants/gameConstants';

const SortTrashMinigameScreen = (props) => {
  const {
    minigameItems, currentItemIndex, minigameFeedback,
    dataPoints, onSortItem, onEndMinigame,
    tutorialInfo 
  } = props;

  const { result } = useLanguage();
  const text = result.sortTrashMinigame;
  
  const [showMinigameTutorial, setShowMinigameTutorial] = useState(false);

  useEffect(() => {
    const shouldShow = tutorialInfo.mission === 'ocean' && tutorialInfo.step === 4;
    setShowMinigameTutorial(shouldShow);
  }, [tutorialInfo]);

  // Define just the step needed for this screen
  const oceanTutorialStep4 = useMemo(() => ({
    4: {
      highlightId: 'tutorial-minigame-area',
      text: "Your job is simple: look at the item, and put it in the correct bin. Correct sorts earn us more <strong>Data Points</strong> and improve my accuracy!",
      buttonText: "Let's Go!",
      action: () => setShowMinigameTutorial(false),
    }
  }), []);

  const [timeLeft, setTimeLeft] = useState(MINIGAME_DURATION_SECONDS);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!showMinigameTutorial && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      onEndMinigame(false);
    }
    return () => clearInterval(timerRef.current);
  }, [timeLeft, showMinigameTutorial, onEndMinigame]);

  const handleQuitMinigame = () => {
    clearInterval(timerRef.current);
    onEndMinigame(false);
  };

  const currentItem = minigameItems[currentItemIndex];

  if (!currentItem) {
    return (
      <div className="screen sort-trash-minigame">
        <p>{minigameFeedback || text.setup}</p>
        <Button onClick={() => onEndMinigame(false)}>{text.returnToMission}</Button>
      </div>
    );
  }

  return (
    <div className="screen sort-trash-minigame">
      {showMinigameTutorial && (
        <TutorialOverlay 
            steps={oceanTutorialStep4}
            step={4} 
            onEnd={() => setShowMinigameTutorial(false)} />
      )}
      
      <h2><Icon type="brain" /> {text.title}</h2>
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
      <Button onClick={handleQuitMinigame} className="minigame-quit-button">{text.endTraining}</Button>
    </div>
  );
};

export default SortTrashMinigameScreen;