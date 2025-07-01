// src/screens/SortTrashMinigameScreen.js
import React from 'react';
import { useLanguage } from '../utils/language'; // Import the hook
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const SortTrashMinigameScreen = (props) => {
  const {
    minigameItems, currentItemIndex, minigameFeedback, minigameTimeLeft,
    dataPoints, onSortItem, onEndMinigame
  } = props;

  // Get translations
  const { result } = useLanguage();
  const text = result.sortTrashMinigame;

  const currentItem = minigameItems[currentItemIndex];

  if (!currentItem) {
    return (
      <div className="screen sort-trash-minigame">
        {/* Translated */}
        <p>{minigameFeedback || text.setup}</p>
        {/* Translated */}
        <Button onClick={() => onEndMinigame(false)}>{text.returnToMission}</Button>
      </div>
    );
  }

  return (
    <div className="screen sort-trash-minigame">
      {/* Translated */}
      <h2><Icon type="brain" /> {text.title}</h2>
      {/* Translated */}
      <div className="minigame-timer"><Icon type="clock" /> {text.timeLeft} {minigameTimeLeft}s</div>
      <div className="minigame-item-area">
        {/* Translated */}
        <p>{text.instruction}</p>
        <div className="item-to-sort">{currentItem.visual} {currentItem.name}</div>
      </div>
      <div className="sorting-bins">
        {/* Translated */}
        <Button onClick={() => onSortItem(currentItem, 'Recycle')}><Icon type="recycle" /> {text.buttons.recycle}</Button>
        {/* Translated */}
        <Button onClick={() => onSortItem(currentItem, 'Compost')}><Icon type="compost" /> {text.buttons.compost}</Button>
        {/* Translated */}
        <Button onClick={() => onSortItem(currentItem, 'Trash')}><Icon type="trash" /> {text.buttons.trash}</Button>
      </div>
      {minigameFeedback && <p className={`minigame-feedback ${minigameFeedback.includes('Correct') ? 'correct' : minigameFeedback.includes('Oops') ? 'incorrect' : ''}`}>{minigameFeedback}</p>}
      {/* Translated */}
      <p>{text.progress.item}: {currentItemIndex + 1} / {minigameItems.length} | {text.progress.data}: {dataPoints}</p>
      {/* Translated */}
      <Button onClick={() => onEndMinigame(false)} className="minigame-quit-button">{text.endTraining}</Button>
    </div>
  );
};

export default SortTrashMinigameScreen;