// src/components/ui/Icon.js
import React from 'react';

const Icon = ({ type, className = '' }) => {
  const icons = {
    // General & UI
    'alert-triangle': '⚠️',
    'arrow-right-circle': '➡️',
    bell: '🔔',
    check: '✔️',
    'check-circle': '✅',
    clock: '⏰',
    edit: '✏️',
    fire: '🔥',
    gear: '⚙️',
    heart: '❤️',
    help: '❓',
    'help-circle': '❓',
    info: 'ℹ️',
    leaf: '🌿',
    lightbulb: '💡',
    lock: '🔒',
    padlock: '🔒',
    'test-tube': '🧪',
    thermometer: '🌡️',
    tree: '🌳',
    warning: '⚠️',
    wind: '💨',
    wrench: '🔧',
    x: '❌',
    'x-circle': '❌',

    // --- ADD THESE TWO LINES ---
    musicOn: '🎵',
    musicOff: '🔇',

    // Game Specific
    brain: '🧠',
    compost: '🍂',
    data: '💾',
    energy: '⚡️',
    recycle: '♻️',
    rocket: '🚀',
    sadFish: '😟🐠',
    seedling: '🌱',
    trash: '🗑️',
    city:'🏙️',
    // AI Moods
    happyAI: '😊',
    concernedAI: '😟',
    neutralAI: '🤖',
    thinkingAI: '🤔',
  };

  // If an icon is found in the list, display it. Otherwise, display the text `type` itself.
  return <span className={`icon ${className}`}>{icons[type] || type}</span>;
};

export default Icon;