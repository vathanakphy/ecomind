import React, { useMemo, useRef, useLayoutEffect } from 'react';
import './TutorialOverlay.css';
import Button from './Button';
import Icon from './Icon';

const TutorialOverlay = ({ step, onNext, onForceAction, onEnd }) => {
  const dialogueRef = useRef(null);

  const tutorialSteps = useMemo(() => ({
    1: {
      highlightId: 'tutorial-health-bar',
      text: "Welcome to the Ocean Mission! You can see how polluted our ocean is. Our main goal is right here: to get <strong>Ocean Health</strong> back up to 100%!",
      buttonText: "Next",
      action: onNext,
    },
    2: {
      highlightId: 'tutorial-data-points',
      text: "To clean the ocean, you first need to teach me how. This process generates <strong>Data Points (DP)</strong>. We'll use these to fund our entire operation.",
      buttonText: "Next",
      action: onNext,
    },
    3: {
      highlightId: 'tutorial-train-button',
      text: "Let's get started! Click <strong>'Train AI'</strong> to begin a sorting minigame. This is how we earn our first Data Points.",
      buttonText: null,
      action: onForceAction,
    },
    4: {
      highlightId: 'tutorial-minigame-area',
      text: "Your job is simple: look at the item, and put it in the correct bin. Correct sorts earn us more <strong>Data Points</strong> and improve my accuracy!",
      buttonText: "Let's Go!",
      action: onEnd,
    },
    5: {
      highlightId: 'tutorial-energy-counter',
      text: "Great work! Now, notice our <strong>Energy ⚡️</strong>. Deploying me to clean the ocean uses both Data Points and Energy, so keep an eye on it.",
      buttonText: "Next",
      action: onNext,
    },
    6: {
      highlightId: 'tutorial-deploy-button',
      text: "When you have enough <strong>Data Points & Energy</strong>, press <strong>'Deploy AI'</strong>. This sends me out to automatically <strong>collect trash</strong> from the ocean, which is how we improve its health!",
      buttonText: "Next",
      action: onNext,
    },
    7: {
      highlightId: 'tutorial-upgrades-button',
      text: "Finally, visit the <strong>'Upgrades'</strong> panel. You'll need more energy, so it's crucial to buy the <strong>Solar System</strong> to generate it automatically!",
      buttonText: "Got it!",
      action: onEnd,
    }
  }), [onNext, onForceAction, onEnd]);

  const currentStep = tutorialSteps[step];

  useLayoutEffect(() => {
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
    });

    if (currentStep?.highlightId) {
      const elementToHighlight = document.getElementById(currentStep.highlightId);
      const dialogueEl = dialogueRef.current;

      if (elementToHighlight && dialogueEl) {
        elementToHighlight.classList.add('tutorial-highlight');
        
        const targetRect = elementToHighlight.getBoundingClientRect();
        const dialogueRect = dialogueEl.getBoundingClientRect();

        let top = targetRect.top + (targetRect.height / 2) - (dialogueRect.height / 2);
        let left = targetRect.right + 20;

        if (left + dialogueRect.width > window.innerWidth) {
          left = targetRect.left - dialogueRect.width - 20;
        }

        if (top < 10) {
            top = 10;
        }
        if (top + dialogueRect.height > window.innerHeight) {
            top = window.innerHeight - dialogueRect.height - 10;
        }

        dialogueEl.style.top = `${top}px`;
        dialogueEl.style.left = `${left}px`;

        if (currentStep.buttonText === null) {
            const handleForcedClick = () => {
                currentStep.action();
                elementToHighlight.removeEventListener('click', handleForcedClick);
            };
            elementToHighlight.addEventListener('click', handleForcedClick);
            return () => elementToHighlight.removeEventListener('click', handleForcedClick);
        }
      }
    }

    return () => {
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
    }
  }, [step, currentStep, onForceAction]);

  if (!currentStep) return null;

  return (
    <div className="tutorial-backdrop">
      <div ref={dialogueRef} className="tutorial-dialogue">
        <Button onClick={onEnd} className="tutorial-close-button">
            <Icon type="x" />
        </Button>
        <div className="ai-avatar-small"><Icon type="neutralAI" /></div>
        <p dangerouslySetInnerHTML={{ __html: currentStep.text }}></p>
        {currentStep.buttonText && (
          <Button onClick={currentStep.action}>{currentStep.buttonText}</Button>
        )}
      </div>
    </div>
  );
};

export default TutorialOverlay;