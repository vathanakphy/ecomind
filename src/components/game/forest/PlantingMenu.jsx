// src/components/game/forest/PlantingMenu.js
import React from 'react';
// FIX: Import from central constants file
import { TREE_TYPES } from '../../../constants/gameConstants';
import Icon from '../../ui/Icon';

// NEW: Added the 'onClose' prop for the new button
const PlantingMenu = ({ onSelectTree, selectedTree, dataPoints, onClose }) => {
  return (
    <div className="planting-menu">
      <div className="planting-menu-header">
        <h4>Select a Tree to Plant</h4>
        {/* NEW: The "X" button to close the menu */}
        <button onClick={onClose} className="close-popup-button">
          <Icon type="x" />
        </button>
      </div>
      <ul>
        {TREE_TYPES.map((tree) => {
          const isSelected = selectedTree && selectedTree.id === tree.id;
          const isDisabled = dataPoints < tree.cost;
          return (
            <li
              key={tree.id}
              className={`${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => !isDisabled && onSelectTree(tree)}
              title={isDisabled ? `Not enough Data Points (costs ${tree.cost})` : `Cost: ${tree.cost} DP`}
            >
              <span className="tree-visual">{tree.visual}</span>
              <div className="tree-info">
                <strong>{tree.name}</strong>    
                {/* FIX: Correctly display stats */}
                <span>CO₂: -{tree.co2Absorption}/tick | Bio: +{tree.biodiversityImpact}</span>
              </div>
              <span className="tree-cost">{tree.cost} DP</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlantingMenu;