// src/components/ui/TutorialOverlay.jsx
import React, { useRef, useLayoutEffect } from 'react';
import './TutorialOverlay.css';
import Button from './Button';
import Icon from './Icon';

// The props signature is correct. We receive the steps data, the current step number,
// actions for closing, and the specific translations for this tutorial.
const TutorialOverlay = ({ steps, step, onEnd, onForceAction, translations = {} }) => {
  const dialogueRef = useRef(null);

  // We get the data for the current step directly from the 'steps' prop.
  const currentStep = steps[step];

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
        if (top + dialogueRect.height > window.innerHeight) {
            top = window.innerHeight - dialogueRect.height - 10;
        }

        dialogueEl.style.top = `${top}px`;
        dialogueEl.style.left = `${left}px`;

        // This logic correctly handles forcing a click on the highlighted element.
        // We now use onForceAction directly passed from the parent.
        if (currentStep.buttonTextKey === null) {
            const handleForcedClick = (e) => {
                e.preventDefault(); // Prevent default action if it's a link/button
                e.stopPropagation(); // Stop the event from bubbling
                onForceAction();
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

        {/* FIX 1: Use the 'translations' prop and 'textKey' from the step data */}
        <p dangerouslySetInnerHTML={{ __html: translations[currentStep.textKey] }}></p>

        {/* FIX 2: Check for 'buttonTextKey' and use it to look up the translation */}
        {currentStep.buttonTextKey && (
          // FIX 3: The action comes directly from the step data now, making this component simpler.
          <Button onClick={currentStep.action}>
            {translations[currentStep.buttonTextKey]}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TutorialOverlay;