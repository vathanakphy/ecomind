// src/components/game/forest/ForestMap.js
import React, { useState, useEffect, useRef } from 'react'; // Import hooks

// ... (TREE_TYPES constant is unchanged) ...
const TREE_TYPES = [
  { id: 'oak', visual: '🌳' },
  { id: 'pine', visual: '🌲' },
  { id: 'sequoia', visual: '🏞️' },
  { id: 'mangrove', visual: '🌿' }
];


const ForestMap = ({ forestMap, onTileClick, selectedTree }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const gridWidth = forestMap[0].length;
  const gridHeight = forestMap.length;

  // This effect calculates the correct scale for the map
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;

      const TILE_SIZE = 40; // The ideal size of a tile in pixels
      const GAP_SIZE = 3;   // The gap size in pixels

      const containerWidth = containerRef.current.offsetWidth;
      const requiredWidth = (gridWidth * TILE_SIZE) + ((gridWidth - 1) * GAP_SIZE);
      
      // Only scale down, don't scale up
      const newScale = Math.min(1, containerWidth / requiredWidth);
      setScale(newScale);
    };

    calculateScale(); // Calculate on initial render

    // Recalculate on window resize
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [gridWidth, gridHeight]); // Recalculate if the grid dimensions ever change


  const getTileVisual = (tile) => {
    if (tile.type === 'empty' && selectedTree) return '➕';
    switch (tile.type) {
      case 'young': return TREE_TYPES.find(t => t.id === tile.treeId)?.visual || '🌱';
      case 'mature': return TREE_TYPES.find(t => t.id === tile.treeId)?.visual || '🌳';
      case 'fire': return '🔥';
      case 'logged': return '🪓';
      case 'diseased': return '🤢';
      case 'fire_risk': return '🔥';
      default: return '';
    }
  };

  return (
    // Add the ref to the container
    <div className="forest-map-container" ref={containerRef}>
      <div
        className="forest-map-grid"
        style={{
          '--grid-width': gridWidth,
          // Apply the calculated scale
          transform: `scale(${scale})`,
        }}
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