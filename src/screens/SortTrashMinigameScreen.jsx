// src/screens/SortTrashMinigameScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const SortTrashMinigameScreen = (props) => {
  const {
    minigameItems, currentItemIndex, minigameFeedback, minigameTimeLeft,
    dataPoints, onSortItem, onEndMinigame
  } = props;
  const navigate = useNavigate();
  
  const currentItem = minigameItems[currentItemIndex];

  if (!currentItem) {
    return (
      <div className="screen sort-trash-minigame">
        <p>{minigameFeedback || "Setting up training..."}</p>
        {/* The navigation is now handled in the onEndMinigame prop from App.js */}
        <Button onClick={() => onEndMinigame(false)}>Return to Mission</Button>
      </div>
    );
  }

  return (
    <div className="screen sort-trash-minigame">
      <h2><Icon type="brain" /> AI Training: Sort the Trash!</h2>
      <div className="minigame-timer"><Icon type="clock" /> Time Left: {minigameTimeLeft}s</div>
      <div className="minigame-item-area">
        <p>Identify and sort this item:</p>
        <div className="item-to-sort">{currentItem.visual} {currentItem.name}</div>
      </div>
      <div className="sorting-bins">
        <Button onClick={() => onSortItem(currentItem, 'Recycle')}><Icon type="recycle" /> RECYCLE</Button>
        <Button onClick={() => onSortItem(currentItem, 'Compost')}><Icon type="compost" /> COMPOST</Button>
        <Button onClick={() => onSortItem(currentItem, 'Trash')}><Icon type="trash" /> TRASH</Button>
      </div>
      {minigameFeedback && <p className={`minigame-feedback ${minigameFeedback.includes('Correct') ? 'correct' : minigameFeedback.includes('Oops') ? 'incorrect' : ''}`}>{minigameFeedback}</p>}
      <p>Item: {currentItemIndex + 1} / {minigameItems.length} | Data: {dataPoints}</p>
      <Button onClick={() => onEndMinigame(false)} className="minigame-quit-button">End Training</Button>
    </div>
  );
};

export default SortTrashMinigameScreen;