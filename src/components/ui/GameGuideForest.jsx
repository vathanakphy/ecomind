// src/components/ui/GameGuideForest.js
import React from 'react';
import Button from './Button';
import Icon from './Icon';
import { useLanguage } from '../../utils/language'; // Your path might vary

const GameGuideForest = ({ show, onClose }) => {
  const { result } = useLanguage();
  const guideText = result.gameGuideForest;

  if (!show) {
    return null;
  }

  const IconText = ({ type, children }) => (
    <span className="icon-text">
      <Icon type={type} /> {children}
    </span>
  );

  return (
    <div className="game-guide-backdrop" onClick={onClose}>
      <div className="game-guide-content" onClick={(e) => e.stopPropagation()}>
        <Button onClick={onClose} className="close-button">{guideText.closeButton}</Button>
        <h2><Icon type="🗺️" /> {guideText.title}</h2>

        <div className="guide-section">
          <h4>{guideText.section1Title}</h4>
          <ul>
            <li>
              <strong>Top HUD:</strong> {guideText.section1_li1_part1} <IconText type="co2">{guideText.terms.co2Level}</IconText> {guideText.section1_li1_part2} <IconText type="temperature">{guideText.terms.globalTemp}</IconText>. {guideText.section1_li1_part3} <IconText type="biodiversity">{guideText.terms.biodiversity}</IconText> {guideText.section1_li1_part4}
            </li>
            {/* --- UPDATED: Added new threats to the map description --- */}
            <li>
              <strong>The Map:</strong> {guideText.section1_li2_part1} `🌱`, `🌳`, {guideText.section1_li2_part4} `🪓`. {guideText.mapThreatsIntro} <IconText type="🤢">{guideText.terms.diseased}</IconText> {guideText.and} <IconText type="🔥">{guideText.terms.fireRisk}</IconText>.
            </li>
            <li>
              <strong>Left Sidebar:</strong> {guideText.section1_li3_part1}<IconText type="data">{guideText.terms.dataPoints}</IconText>, <IconText type="energy">{guideText.terms.energy}</IconText>, {guideText.and} {guideText.section1_li3_part2} <IconText type="brain">{guideText.terms.aiAccuracy}</IconText>.
            </li>
          </ul>
        </div>

        <div className="guide-section">
          <h4>{guideText.section2Title}</h4>
          <ol>
            {/* --- UPDATED: Explained the purpose of training --- */}
            <li>
              <strong>Train the AI Warden:</strong> {guideText.trainWardenIntro} <IconText type="🧪">{guideText.terms.trainAI}</IconText> {guideText.trainWardenPurpose} <IconText type="brain">{guideText.terms.aiAccuracy}</IconText> {guideText.trainWardenReward} <IconText type="data">{guideText.terms.dataPointsAbbr}</IconText>.
            </li>
            {/* --- UPDATED: Explained the new Deploy AI logic --- */}
            <li>
              <strong>Deploy Your AI Warden:</strong> {guideText.deployWardenIntro} <IconText type="🌱">{guideText.terms.deployAI}</IconText>. {guideText.deployWardenLogic}
              <ul>
                <li><strong>{guideText.priority1Title}:</strong> {guideText.priority1Desc}</li>
                <li><strong>{guideText.priority2Title}:</strong> {guideText.priority2Desc}</li>
              </ul>
            </li>
            <li>
              <strong>Plant Manually:</strong> {guideText.section2_li2_part1} <IconText type="⚖️">{guideText.terms.manageForest}</IconText> {guideText.section2_li2_part2}
            </li>
          </ol>
        </div>

        <div className="guide-section">
          <h4>{guideText.section3Title}</h4>
          <ul>
            <li>
              <strong>Upgrade Early:</strong> {guideText.section3_li1_part1} <IconText type="wrench">{guideText.terms.upgrades}</IconText> {guideText.section3_li1_part2} <IconText type="🔥">{guideText.terms.biomassGenerator}</IconText> {guideText.section3_li1_part3}
            </li>
            <li>
              <strong>Create a Resource Loop:</strong> {guideText.section3_li2_part1} <IconText type="🪓">{guideText.terms.loggedTiles}</IconText> {guideText.section3_li2_part2} <IconText type="energy">{guideText.terms.energy}</IconText>{guideText.section3_li2_part3}
            </li>
          </ul>
        </div>
        <Button onClick={onClose} style={{marginTop: '20px'}}>{guideText.gotItButton}</Button>
      </div>
    </div>
  );
};

export default GameGuideForest;