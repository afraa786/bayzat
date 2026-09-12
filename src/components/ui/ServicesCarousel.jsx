import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./services-carousel.css";

const wrap = (value, length) => (value + length) % length;

const DEFAULT_REASONS = [
  {
    eyebrow: "Connected by design",
    title: "One System",
    description: "HR, payroll, time, and people data work together in one dependable platform.",
    image: new URL("../../../images/tech1.jpeg", import.meta.url).href,
  },
  {
    eyebrow: "Less manual work",
    title: "Move Faster",
    description: "Automated workflows remove repetitive tasks and keep every handoff moving.",
    image: new URL("../../../images/tech2.jpeg", import.meta.url).href,
  },
  {
    eyebrow: "Built for clarity",
    title: "Stay Informed",
    description: "Live workforce data turns complexity into clear, timely decisions.",
    image: new URL("../../../images/tech3.jpeg", import.meta.url).href,
  },
  {
    eyebrow: "Made for people",
    title: "Easy Everyday",
    description: "Simple self-service gives employees answers without unnecessary waiting.",
    image: new URL("../../../images/tech4.jpeg", import.meta.url).href,
  },
  {
    eyebrow: "Ready to grow",
    title: "Scale Smoothly",
    description: "Flexible tools support new teams, locations, and ways of working.",
    image: new URL("../../../images/tech5.jpeg", import.meta.url).href,
  },
  {
    eyebrow: "Protected throughout",
    title: "Trust Built In",
    description: "Dependable controls keep sensitive people and payroll information secure.",
    image: new URL("../../../images/tech6.jpeg", import.meta.url).href,
  },
];

export default function ServicesCarousel({ services = DEFAULT_REASONS }) {
  const [current, setCurrent] = useState(0);
  const pointerStart = useRef(null);
  const stageRef = useRef(null);

  const change = (direction) => setCurrent((index) => wrap(index + direction, services.length));
  const roleFor = (index) => {
    if (index === current) return "current";
    if (index === wrap(current + 1, services.length)) return "next";
    if (index === wrap(current - 1, services.length)) return "previous";
    return "hidden";
  };

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const stage = stageRef.current;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
    stage.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    stage.style.setProperty("--image-x", `${(-x * 3).toFixed(2)}%`);
    stage.style.setProperty("--image-y", `${(-y * 3).toFixed(2)}%`);
  };

  const resetTilt = () => {
    const stage = stageRef.current;
    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
    stage.style.setProperty("--image-x", "0%");
    stage.style.setProperty("--image-y", "0%");
  };

  return (
    <section className="services-showcase" aria-labelledby="services-showcase-title">
      <div
        className="service-slider"
        ref={stageRef}
        tabIndex="0"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") change(-1);
          if (event.key === "ArrowRight") change(1);
        }}
        onPointerDown={(event) => { pointerStart.current = event.clientX; }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.clientX - pointerStart.current;
          if (Math.abs(distance) > 45) change(distance > 0 ? -1 : 1);
          pointerStart.current = null;
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        aria-label="Why choose Crodlin carousel"
      >
        <h2 className="service-slider__label" id="services-showcase-title">Why Crodlin</h2>

        <button className="service-slider__button service-slider__button--prev" onClick={() => change(-1)} aria-label="Previous reason">
          <ArrowLeft /><span>Previous</span>
        </button>

        <div className="service-slider__stage">
          <div className="service-slider__slides">
            {services.map((service, index) => (
              <article className="service-slide" data-role={roleFor(index)} aria-hidden={index !== current} key={service.title}>
                <div className="service-slide__inner">
                  <img src={service.image} alt="" />
                </div>
              </article>
            ))}
          </div>

          <div className="service-slider__infos" aria-live="polite">
            {services.map((service, index) => (
              <div className="service-slide-info" data-role={roleFor(index)} key={service.title}>
                <p><span>{service.eyebrow}</span></p>
                <h3><span>{service.title}</span></h3>
                <div><span>{service.description}</span></div>
              </div>
            ))}
          </div>
        </div>

        <button className="service-slider__button service-slider__button--next" onClick={() => change(1)} aria-label="Next reason">
          <span>Next</span><ArrowRight />
        </button>

        <p className="service-slider__count"><span>{String(current + 1).padStart(2, "0")}</span> / {String(services.length).padStart(2, "0")}</p>
      </div>
    </section>
  );
}
