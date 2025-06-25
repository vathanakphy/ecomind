// src/components/ui/GameGuideOcean.js
import Button from './Button';
import Icon from './Icon';
import { useLanguage } from '../../utils/language'; // Adjust path as necessary to your useLanguage hook

const GameGuideOcean = ({ show, onClose }) => {
  const { result } = useLanguage();
  const guideText = result.gameGuideOcean; // Access the new ocean guide translations

  if (!show) {
    return null;
  }

  // A helper component to style icons within the text
  const IconText = ({ type, children }) => (
    <span className="icon-text">
      <Icon type={type} /> {children}
    </span>
  );

  return (
    <div className="game-guide-backdrop" onClick={onClose}>
      <div className="game-guide-content" onClick={(e) => e.stopPropagation()}>
        <Button onClick={onClose} className="close-button">{guideText.closeButton}</Button>
        <h2><Icon type="🌊" /> {guideText.title}</h2> {/* Using a wave icon for ocean */}
        
        <div className="guide-section">
          <h4>{guideText.section1Title}</h4>
          <ul>
            <li>
              <strong>Top HUD:</strong> {guideText.section1_li1_part1} <IconText type="waterDrop">{guideText.terms.oceanHealth}</IconText> {guideText.section1_li1_part2}
            </li>
            <li>
              <strong>Dashboard:</strong> {guideText.section1_li2_part1} <IconText type="data">{guideText.terms.dataPoints}</IconText> {guideText.section1_li2_part2} <IconText type="energy">{guideText.terms.energy}</IconText>{guideText.section1_li2_part3}
            </li>
            <li>
              <strong>AI Helper:</strong> {guideText.section1_li3}
            </li>
          </ul>
        </div>

        <div className="guide-section">
          <h4>{guideText.section2Title}</h4>
          <p>{guideText.section2_p1}</p>
          <ol>
            <li>
              <strong>Train to Sort:</strong> {guideText.section2_li1_part1} <IconText type="🧪">{guideText.terms.trainAI}</IconText> {guideText.section2_li1_part2}
            </li>
            <li>
              <strong>Sorting Bins:</strong> {guideText.section2_li2_part1}
              <ul>
                <li><Icon type="recycle" /> {guideText.section2_li2_bullet1}</li>
                <li><Icon type="compost" /> {guideText.section2_li2_bullet2}</li>
                <li><Icon type="trash" /> {guideText.section2_li2_bullet3}</li>
              </ul>
            </li>
            <li>
              <strong>Earn Rewards:</strong> {guideText.section2_li3_part1} <IconText type="data">{guideText.terms.dataPoints}</IconText> {guideText.section2_li3_part2}
            </li>
          </ol>
          <p>{guideText.section2_p2}</p>
        </div>

        <div className="guide-section">
          <h4>{guideText.section3Title}</h4>
          <ul>
            <li>
              <strong>Deploy AI:</strong> {guideText.section3_li1_part1} <IconText type="data">{guideText.terms.dataPoints}</IconText> {guideText.section3_li1_part2} <IconText type="energy">{guideText.terms.energy}</IconText>{guideText.section3_li1_part3} <IconText type="rocket">{guideText.terms.deployAI}</IconText> {guideText.section3_li1_part4}
            </li>
            <li>
              <strong>Ocean Impact:</strong> {guideText.section3_li2_part1} <IconText type="waterDrop">{guideText.terms.oceanHealth}</IconText>{guideText.section3_li2_part2}
            </li>
            <li>
              <strong>Upgrade AI:</strong> {guideText.section3_li3_part1} <IconText type="wrench">{guideText.terms.upgrades}</IconText> {guideText.section3_li3_part2}
            </li>
            <li>
              {guideText.section3_li4}
            </li>
          </ul>
        </div>
        <Button onClick={onClose} style={{marginTop: '20px'}}>{guideText.gotItButton}</Button>
      </div>
    </div>
  );
};

export default GameGuideOcean;