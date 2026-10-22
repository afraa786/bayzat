import { useEffect, useRef } from "react";
import "./DominoLetters.css";

const LETTERS = [..."CRODLIN"];
const STAND_ANGLE = 86;
const OVERLAP = 0.45;

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function getCardProgress(progress, index) {
  const windowSize = 1 / (1 + OVERLAP * (LETTERS.length - 1));
  const start = index * windowSize * OVERLAP;
  const progressInCard = clamp01((progress - start) / windowSize);
  return progressInCard * progressInCard * (3 - 2 * progressInCard);
}

export default function DominoLetters() {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let frame = 0;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const paint = () => {
      frame = 0;
      const travel = root.offsetHeight - window.innerHeight;
      const progress = reducedMotion.matches || travel <= 0
        ? 0
        : clamp01(-root.getBoundingClientRect().top / travel);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rise = getCardProgress(progress, index);
        const angle = -STAND_ANGLE * (1 - rise);
        card.style.transform = `rotateX(${angle.toFixed(2)}deg)`;
        card.parentElement?.style.setProperty("--rise", rise.toFixed(3));
      });
    };

    const schedulePaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    schedulePaint();
    window.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint);
    reducedMotion.addEventListener("change", schedulePaint);

    return () => {
      window.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      reducedMotion.removeEventListener("change", schedulePaint);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="domino-gallery" ref={rootRef} aria-label="Crodlin">
      <div className="domino-gallery__sticky">
        <div className="domino-gallery__row" role="list" aria-label="Crodlin letters">
          {LETTERS.map((letter, index) => (
            <div className="domino-gallery__tile-wrap" role="listitem" key={`${letter}-${index}`}>
              <div
                className="domino-gallery__tile"
                ref={(node) => { cardRefs.current[index] = node; }}
                aria-label={letter}
              >
                <span>{letter}</span>
              </div>
              <span className="domino-gallery__shadow" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
