// src/components/game/forest/ForestMap.js
import React from 'react';
import { TREE_TYPES } from '../../../constants/gameConstants';

// This is a much simpler component that doesn't need to calculate scale.
const ForestMap = ({ forestMap, onTileClick, selectedTree }) => {
  const gridWidth = forestMap[0].length;

  const getTileVisual = (tile) => {
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

  return (
    // The container will now handle scrolling via CSS
    <div className="forest-map-container">
      <div
        className="forest-map-grid"
        style={{ '--grid-width': gridWidth }}
      >
        {forestMap.flat().map((tile) => (
          <div
            key={tile.id}
            className={`tile tile-${tile.type} ${selectedTree && tile.type === 'empty' ? 'plantable' : ''}`}
            onClick={() => onTileClick(tile.x, tile.y)}
            title={`(${tile.x}, ${tile.y}) - ${tile.type}`}
          >
            <span className="tile-visual">{getTileVisual(tile)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForestMap;   