import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import type { StorylineStep } from "./types";
import type { DualTrackSlide } from "./types-v2";

interface PresentationIndexProps {
  slides: DualTrackSlide[];
  currentSlideIndex: number;
  onSlideClick: (index: number) => void;
}

export function PresentationIndex({ slides, currentSlideIndex, onSlideClick }: PresentationIndexProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [overflowLeft, setOverflowLeft] = useState(0);
  const [overflowRight, setOverflowRight] = useState(0);

  // Current section name
  const currentSection = useMemo(() => {
    if (currentSlideIndex < 0 || currentSlideIndex >= slides.length) return "";
    return slides[currentSlideIndex].section || "";
  }, [slides, currentSlideIndex]);

  // Group steps by section
  const sectionGroups = useMemo(() => {
    const groups: { name: string; slides: DualTrackSlide[]; startIndex: number }[] = [];
    let currentSec: string | undefined;
    let currentGroup: DualTrackSlide[] = [];
    let startIdx = 0;

    slides.forEach((slide, i) => {
      if (slide.section && slide.section !== currentSec) {
        if (currentGroup.length > 0) {
          groups.push({ name: currentSec || "", slides: currentGroup, startIndex: startIdx });
        }
        currentSec = slide.section;
        currentGroup = [slide];
        startIdx = i;
      } else {
        currentGroup.push(slide);
      }
    });
    if (currentGroup.length > 0) {
      groups.push({ name: currentSec || "", slides: currentGroup, startIndex: startIdx });
    }
    return groups;
  }, [slides]);

  // Check overflow state
  const checkOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasLeft = el.scrollLeft > 2;
    const hasRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 2;
    setCanScrollLeft(hasLeft);
    setCanScrollRight(hasRight);

    // Count items beyond viewport
      const slides = el.querySelectorAll("[data-slide-index]");
      let leftCount = 0;
      let rightCount = 0;
      const containerRect = el.getBoundingClientRect();
      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        if (rect.right < containerRect.left) leftCount++;
        if (rect.left > containerRect.right) rightCount++;
      });
      setOverflowLeft(leftCount);
      setOverflowRight(rightCount);
    },
    []);
  // Auto-scroll current slide into view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || currentSlideIndex < 0 || currentSlideIndex >= slides.length) return;

    const scrollToCurrent = (behavior: ScrollBehavior = "smooth") => {
      const currentSlide = el.querySelector(`[data-slide-index="${currentSlideIndex}"]`);
      if (!currentSlide) return;
      const containerRect = el.getBoundingClientRect();
      const slideRect = currentSlide.getBoundingClientRect();
      const scrollLeft =
        slideRect.left - containerRect.left + el.scrollLeft - containerRect.width / 2 + slideRect.width / 2;
      el.scrollTo({ left: scrollLeft, behavior });
    };

    scrollToCurrent("auto");
    requestAnimationFrame(() => {
      scrollToCurrent("auto");
      setTimeout(checkOverflow, 50);
    });
  }, [currentSlideIndex, slides.length, checkOverflow]);

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
               {group.slides.map((slide, idx) => {
                 const globalIndex = group.startIndex + idx;
                 const isCurrent = globalIndex === currentSlideIndex;
                 const isPast = globalIndex < currentSlideIndex;
                 const isInActiveSection = isSectionActive;

                 return (
                   <React.Fragment key={slide.id}>
                     <div
                       data-slide-index={globalIndex}
                       className={`gestalt-index__step${
                         isCurrent
                           ? " gestalt-index__step--current"
                           : isPast
                             ? " gestalt-index__step--past"
                             : " gestalt-index__step--future"
                       }${isInActiveSection && !isCurrent ? " gestalt-index__step--in-section" : ""}`}
                       onClick={() => onSlideClick(globalIndex)}
                     >
                       {slide.title}
                     </div>
                     {idx < group.slides.length - 1 && (
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
