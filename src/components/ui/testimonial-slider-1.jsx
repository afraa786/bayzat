import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import "./testimonial-slider-1.css";

export function TestimonialSlider({ reviews, className = "" }) {
  const [slide, setSlide] = useState({ index: 0, previous: null, direction: 1, revision: 0 });
  if (!reviews?.length) return null;
  const index = slide.index % reviews.length;
  const active = reviews[index];
  const previous = slide.previous === null ? null : reviews[slide.previous % reviews.length];
  const goTo = (next, direction) => setSlide(current => ({
    index: (next + reviews.length) % reviews.length,
    previous: current.index,
    direction,
    revision: current.revision + 1,
  }));

  return (
    <div className={`review-slider ${className}`} role="region" aria-roledescription="carousel" aria-label="Client reviews"
      style={{ "--review-direction": slide.direction }}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); goTo(index + 1, 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); goTo(index - 1, -1); }
      }}>
      <div className="review-slider-meta">
        <div className="review-slider-index">
          <span>{String(index + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span>
          <p>Reviews</p>
        </div>
        <div className="review-slider-thumbnails" aria-label="Choose a review">
          {reviews.map((review, thumbnailIndex) => thumbnailIndex === index ? null : (
            <button type="button" key={review.id} onClick={() => goTo(thumbnailIndex, thumbnailIndex > index ? 1 : -1)} aria-label={`View review from ${review.name}`}>
              <img src={review.thumbnailSrc || review.imageSrc} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      <div className="review-slider-image" key={`image-${slide.revision}`}>
        {previous && <img className="review-image-out" src={previous.imageSrc} alt="" aria-hidden="true" />}
        <img className={previous ? "review-image-in" : ""} src={active.imageSrc} alt={active.imageAlt || active.name} />
      </div>
      <div className="review-slider-main">
        <div className="review-slider-text" aria-live="polite" aria-atomic="true">
          <div className={slide.revision ? "review-copy-in" : ""} key={`copy-${slide.revision}`}>
            <p className="review-slider-affiliation">{active.affiliation}</p>
            <h3>{active.name}</h3>
            <Quote className="review-slider-quote-icon" size={32} aria-hidden="true" />
            <blockquote>{active.quote}</blockquote>
          </div>
        </div>
        <div className="review-slider-controls">
          <button type="button" onClick={() => goTo(index - 1, -1)} aria-label="Previous review" disabled={reviews.length < 2}><ArrowLeft size={22} aria-hidden="true" /></button>
          <button type="button" onClick={() => goTo(index + 1, 1)} aria-label="Next review" disabled={reviews.length < 2}><ArrowRight size={22} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
