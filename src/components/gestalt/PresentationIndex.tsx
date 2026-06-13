import React, { useRef, useEffect, useMemo } from "react";
import type { StorylineStep } from "./types";

interface PresentationIndexProps {
  storyline: StorylineStep[];
  currentStepIndex: number;
  onStepClick: (index: number) => void;
}

export function PresentationIndex({ storyline, currentStepIndex, onStepClick }: PresentationIndexProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll current step into view
    const container = containerRef.current;
    if (!container || currentStepIndex < 0 || currentStepIndex >= storyline.length) return;

    const currentStep = container.querySelector(`[data-step-index="${currentStepIndex}"]`);
    if (currentStep) {
      const containerRect = container.getBoundingClientRect();
      const stepRect = currentStep.getBoundingClientRect();

      const scrollLeft = stepRect.left - containerRect.left + container.scrollLeft - (containerRect.width / 2) + (stepRect.width / 2);
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [currentStepIndex, storyline.length]);

  // Group steps by section
  const sectionGroups = useMemo(() => {
    const groups: Record<string, StorylineStep[]> = {};
    let currentSection: string | undefined;

    storyline.forEach((step) => {
      if (step.section) {
        currentSection = step.section;
      }
      if (!groups[currentSection!]) {
        groups[currentSection!] = [];
      }
      groups[currentSection!].push(step);
    });

    return groups;
  }, [storyline]);

  return (
    <div ref={containerRef} className="gestalt-index">
      {Object.entries(sectionGroups).map(([sectionName, steps]) => (
        <div key={sectionName} className="gestalt-index__section">
          <span className="gestalt-index__section-label">{sectionName}</span>
          {steps.map((step, idx) => {
            const globalIndex = storyline.indexOf(step);
            const isCurrent = globalIndex === currentStepIndex;
            const isPast = globalIndex < currentStepIndex;

            return (
              <React.Fragment key={step.id}>
                <div
                  data-step-index={globalIndex}
                  className={`gestalt-index__step${
                    isCurrent
                      ? " gestalt-index__step--current"
                      : isPast
                        ? " gestalt-index__step--past"
                        : " gestalt-index__step--future"
                  }`}
                  onClick={() => onStepClick(globalIndex)}
                >
                  {step.title}
                </div>
                {idx < steps.length - 1 && (
                  <span className="gestalt-index__separator" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default PresentationIndex;
