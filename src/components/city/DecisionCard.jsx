// src/components/city/DecisionCard.jsx
import { AI_RECOMMENDATION_DISCOUNT } from '../../constants/gameConstants'; // Import discount
import Icon from '../ui/Icon';
import Button from '../ui/Button';
export default function DecisionCard ({ decision, onApprove, dataPoints, energy, isRecommended })  {
  // Apply discount for display purposes if recommended
  const displayCostDP = isRecommended ? decision.costDP * (1 - AI_RECOMMENDATION_DISCOUNT) : decision.costDP;
  const displayCostEnergy = isRecommended ? decision.costEnergy * (1 - AI_RECOMMENDATION_DISCOUNT) : decision.costEnergy;

  const canAfford = dataPoints >= displayCostDP && energy >= displayCostEnergy;

  return (
    // --- ADD CONDITIONAL CLASS FOR HIGHLIGHTING ---
    <div className={`decision-card ${!canAfford ? 'disabled' : ''} ${isRecommended ? 'recommended-by-ai' : ''}`}>
      {isRecommended && <div className="ai-recommend-banner">AI Recommended!</div>}
      {/* ... icon and content ... */}
      <div className="decision-content">
        <h4>{decision.title}</h4>
        <p>{decision.description}</p>
        <div className="decision-footer">
          <span className={`cost ${isRecommended ? 'discounted' : ''}`}>
            {isRecommended && <span className="original-cost">{decision.costDP}</span>}
            <Icon type="data" /> {displayCostDP}
            {isRecommended && <span className="original-cost">{decision.costEnergy}</span>}
            <Icon type="energy" /> {displayCostEnergy}
          </span>
        </div>
      </div>
      <Button onClick={() => onApprove(decision)} disabled={!canAfford} className="approve-button">
        APPROVE
      </Button>
    </div>
  );
};