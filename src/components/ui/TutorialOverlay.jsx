// src/components/ui/TutorialOverlay.jsx
import React, { useMemo, useRef, useLayoutEffect } from 'react';
import './TutorialOverlay.css';
import Button from './Button';
import Icon from './Icon';

// MODIFIED: We now accept a 'steps' object as a prop
const TutorialOverlay = ({ steps, step, onNext, onForceAction, onEnd }) => {
  const dialogueRef = useRef(null);

  // The tutorialSteps object is now gone from this file.
  // We use the 'steps' prop directly.
  const currentStep = steps[step];

  // The rest of the file remains exactly the same...
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

        if (top < 10) top = 10;
        if (top + dialogueRect.height > window.innerHeight) top = window.innerHeight - dialogueRect.height - 10;

        dialogueEl.style.top = `${top}px`;
        dialogueEl.style.left = `${left}px`;
      }
    }

    return () => {
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
    }
  }, [step, currentStep]);


  if (!currentStep) return null;

  // The 'action' for the button now comes from the 'steps' prop
  const buttonAction = currentStep.buttonText === null ? onForceAction : currentStep.action;

  return (
    <div className="tutorial-backdrop">
      <div ref={dialogueRef} className="tutorial-dialogue">
        <Button onClick={onEnd} className="tutorial-close-button">
            <Icon type="x" />
        </Button>
        <div className="ai-avatar-small"><Icon type="neutralAI" /></div>
        <p dangerouslySetInnerHTML={{ __html: currentStep.text }}></p>
        {currentStep.buttonText && (
          <Button onClick={buttonAction}>{currentStep.buttonText}</Button>
        )}
      </div>
    </div>
  );
};

export default TutorialOverlay;