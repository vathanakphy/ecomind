// src/components/game/forest/ForestMap.js
import React from 'react';

// Helper constant
const TREE_TYPES = [
  { id: 'oak', visual: '🌳' },
  { id: 'pine', visual: '🌲' },
  { id: 'sequoia', visual: '🏞️' },
  { id: 'mangrove', visual: '🌿' }
];

const ForestMap = ({ forestMap, onTileClick, selectedTree }) => {
  const getTileVisual = (tile) => {
    if (tile.type === 'empty' && selectedTree) return '➕'; // Show a plus icon on plantable tiles
    switch (tile.type) {
      case 'young': return TREE_TYPES.find(t => t.id === tile.treeId)?.visual || '🌱';
      case 'mature': return TREE_TYPES.find(t => t.id === tile.treeId)?.visual || '🌳';
      case 'fire': return '🔥';
      case 'logged': return '🪓';
      default: return '';
    }
  };

  return (
    <div className="forest-map-container">
      <div className="forest-map-grid" style={{'--grid-width': forestMap[0].length}}>
        {forestMap.flat().map((tile) => (
          <div
            key={tile.id}
            // --- MODIFICATION HERE: The class now depends on selectedTree ---
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