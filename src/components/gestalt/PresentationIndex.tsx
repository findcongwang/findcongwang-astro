import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import type { StorylineStep } from "./types";

interface PresentationIndexProps {
  storyline: StorylineStep[];
  currentStepIndex: number;
  onStepClick: (index: number) => void;
}

export function PresentationIndex({ storyline, currentStepIndex, onStepClick }: PresentationIndexProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [overflowLeft, setOverflowLeft] = useState(0);
  const [overflowRight, setOverflowRight] = useState(0);

  // Current section name
  const currentSection = useMemo(() => {
    if (currentStepIndex < 0 || currentStepIndex >= storyline.length) return "";
    return storyline[currentStepIndex].section || "";
  }, [storyline, currentStepIndex]);

  // Group steps by section
  const sectionGroups = useMemo(() => {
    const groups: { name: string; steps: StorylineStep[]; startIndex: number }[] = [];
    let currentSec: string | undefined;
    let currentGroup: StorylineStep[] = [];
    let startIdx = 0;

    storyline.forEach((step, i) => {
      if (step.section && step.section !== currentSec) {
        if (currentGroup.length > 0) {
          groups.push({ name: currentSec || "", steps: currentGroup, startIndex: startIdx });
        }
        currentSec = step.section;
        currentGroup = [step];
        startIdx = i;
      } else {
        currentGroup.push(step);
      }
    });
    if (currentGroup.length > 0) {
      groups.push({ name: currentSec || "", steps: currentGroup, startIndex: startIdx });
    }
    return groups;
  }, [storyline]);

  // Check overflow state
  const checkOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasLeft = el.scrollLeft > 2;
    const hasRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 2;
    setCanScrollLeft(hasLeft);
    setCanScrollRight(hasRight);

    // Count items beyond viewport
    const steps = el.querySelectorAll("[data-step-index]");
    let leftCount = 0;
    let rightCount = 0;
    const containerRect = el.getBoundingClientRect();
    steps.forEach((step) => {
      const rect = step.getBoundingClientRect();
      if (rect.right < containerRect.left) leftCount++;
      if (rect.left > containerRect.right) rightCount++;
    });
    setOverflowLeft(leftCount);
    setOverflowRight(rightCount);
  }, []);

  // Auto-scroll current step into view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || currentStepIndex < 0 || currentStepIndex >= storyline.length) return;

    const currentStep = el.querySelector(`[data-step-index="${currentStepIndex}"]`);
    if (currentStep) {
      const containerRect = el.getBoundingClientRect();
      const stepRect = currentStep.getBoundingClientRect();
      const scrollLeft = stepRect.left - containerRect.left + el.scrollLeft - (containerRect.width / 2) + (stepRect.width / 2);
      el.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }

    // Recheck overflow after scroll
    setTimeout(checkOverflow, 350);
  }, [currentStepIndex, storyline.length, checkOverflow]);

  // Monitor scroll and resize
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkOverflow();
    el.addEventListener("scroll", checkOverflow, { passive: true });
    const ro = new ResizeObserver(checkOverflow);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkOverflow);
      ro.disconnect();
    };
  }, [checkOverflow]);

  const scrollBy = useCallback((dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: "smooth" });
  }, []);

  return (
    <div ref={containerRef} className="gestalt-index">
      {/* Left overflow arrow */}
      {canScrollLeft && (
        <button
          className="gestalt-index__arrow gestalt-index__arrow--left"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
        >
          <span className="gestalt-index__arrow-icon">‹</span>
          {overflowLeft > 0 && <span className="gestalt-index__arrow-count">{overflowLeft}</span>}
        </button>
      )}

      {/* Scrollable track (hidden scrollbar) */}
      <div ref={scrollRef} className="gestalt-index__track">
        {sectionGroups.map((group) => {
          const isSectionActive = group.name === currentSection;
          return (
            <div
              key={group.name}
              className={`gestalt-index__section${isSectionActive ? " gestalt-index__section--active" : ""}`}
            >
              <span className={`gestalt-index__section-label${isSectionActive ? " gestalt-index__section-label--active" : ""}`}>
                {group.name}
              </span>
              {group.steps.map((step, idx) => {
                const globalIndex = group.startIndex + idx;
                const isCurrent = globalIndex === currentStepIndex;
                const isPast = globalIndex < currentStepIndex;
                const isInActiveSection = isSectionActive;

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
                      }${isInActiveSection && !isCurrent ? " gestalt-index__step--in-section" : ""}`}
                      onClick={() => onStepClick(globalIndex)}
                    >
                      {step.title}
                    </div>
                    {idx < group.steps.length - 1 && (
                      <span className="gestalt-index__dot">·</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Right overflow arrow */}
      {canScrollRight && (
        <button
          className="gestalt-index__arrow gestalt-index__arrow--right"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
        >
          {overflowRight > 0 && <span className="gestalt-index__arrow-count">{overflowRight}</span>}
          <span className="gestalt-index__arrow-icon">›</span>
        </button>
      )}
    </div>
  );
}

export default PresentationIndex;
