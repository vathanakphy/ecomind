// src/components/game/forest/PlantingMenu.js
import { TREE_TYPES } from '../../../constants/gameConstants';
import Icon from '../../ui/Icon';

const PlantingMenu = ({ onSelectTree, selectedTree, dataPoints }) => {
  return (
    <div className="planting-menu">
      <h4><Icon type="🌱"/> Select a Tree to Plant</h4>
      <ul>
        {TREE_TYPES.map(tree => (
          <li
            key={tree.id}
            className={`${selectedTree?.id === tree.id ? 'selected' : ''} ${dataPoints < tree.cost ? 'disabled' : ''}`}
            onClick={() => dataPoints >= tree.cost && onSelectTree(tree)}
            title={`Cost: ${tree.cost} DP`}
          >
            <span className="tree-visual">{tree.visual}</span>
            <div className="tree-info">
              <strong>{tree.name}</strong>
              <span>CO₂: {tree.co2Absorption * 100} | Bio: +{tree.biodiversityImpact}</span>
            </div>
            <span className="tree-cost">{tree.cost} <Icon type="data" /></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantingMenu;