// src/components/game/forest/ForestMap.js
import React from 'react';
import { useLanguage } from '../../../utils/language'; // 1. Import the hook
import { TREE_TYPES } from '../../../constants/gameConstants';

const ForestMap = ({ forestMap, onTileClick, selectedTree }) => {
  // 2. Get the translation data
  const { result } = useLanguage();

  // 3. Guard clause to prevent crash on initial render
  if (!result) {
    return <div className="forest-map-container loading">Loading Map...</div>;
  }
  const tileTypeText = result.forestMissionScreen.tileTypes;
  
  const gridWidth = forestMap[0].length;

  const getTileVisual = (tile) => {
    // This function uses emojis and can remain as is.
    if (tile.type === 'empty' && selectedTree) return '➕';
    const treeData = TREE_TYPES.find(t => t.id === tile.treeId);
    switch (tile.type) {
      case 'young': return treeData?.visual || '🌱';
      case 'mature': return treeData?.visual || '🌳';
      case 'fire': return '🔥';
      case 'logged': return '🪓';
      case 'diseased': return '🤢';
      case 'fire_risk': return '🔥';
      default: return '';
    }
  };
  
  // 4. Helper function to generate the translated title for tooltips
  const getTileTitle = (tile) => {
    const coords = `(${tile.x}, ${tile.y})`;
    
    // Check for the special 'plantable' state first
    if (selectedTree && tile.type === 'empty') {
      const statusText = tileTypeText.plantable || 'Plantable';
      return `${coords} - ${statusText}`;
    }
    
    // Look up the translation for the tile's type, with a fallback
    const statusText = tileTypeText[tile.type] || tile.type;
    return `${coords} - ${statusText}`;
  };

  return (
    <div className="forest-map-container">
      <div
        className="forest-map-grid"
        style={{ '--grid-width': gridWidth }}
      >
        {forestMap.flat().map((tile) => (
          <div
            key={tile.id}
            // The class name uses the original, untranslated tile.type, which is correct for CSS.
            className={`tile tile-${tile.type} ${selectedTree && tile.type === 'empty' ? 'plantable' : ''}`}
            onClick={() => onTileClick(tile.x, tile.y)}
            // 5. Use the new helper function to set the translated title
            title={getTileTitle(tile)}
          >
            <span className="tile-visual">{getTileVisual(tile)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForestMap;