import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./services-carousel.css";

const wrap = (value, length) => (value + length) % length;

const DEFAULT_SERVICES = [
  {
    eyebrow: "Core operations",
    title: "One connected source of truth",
    description: "Bring employee records, documents, policies, and everyday HR workflows into one dependable place.",
    image: new URL("../../../images/office1.jpeg", import.meta.url).href,
  },
  {
    eyebrow: "Payroll",
    title: "Pay people with confidence",
    description: "Turn complex payroll work into a clear, controlled process with fewer handoffs and fewer surprises.",
    image: new URL("../../../images/office2.jpeg", import.meta.url).href,
  },
  {
    eyebrow: "Time and attendance",
    title: "Make every working hour visible",
    description: "Connect schedules, attendance, leave, and approvals so managers can act before small gaps become problems.",
    image: new URL("../../../images/office3.jpeg", import.meta.url).href,
  },
  {
    eyebrow: "Employee experience",
    title: "Give people answers without the wait",
    description: "Simple self-service experiences put payslips, requests, documents, and updates directly in employees’ hands.",
    image: new URL("../../../images/tech2.jpeg", import.meta.url).href,
  },
  {
    eyebrow: "Workforce insight",
    title: "See what your organization needs next",
    description: "Turn live workforce information into decisions leaders can understand, trust, and act on.",
    image: new URL("../../../images/image3.jpg", import.meta.url).href,
  },
];

export default function ServicesCarousel({ services = DEFAULT_SERVICES }) {
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
      <div className="services-showcase__heading container">
        <p className="eyebrow">What Crodlin does</p>
        <h2 id="services-showcase-title">Services designed around how work moves</h2>
      </div>

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
        aria-label="Crodlin services carousel"
      >
        <p className="service-slider__label" aria-hidden="true">Services</p>

        <button className="service-slider__button service-slider__button--prev" onClick={() => change(-1)} aria-label="Previous service">
          <ChevronLeft />
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

        <button className="service-slider__button service-slider__button--next" onClick={() => change(1)} aria-label="Next service">
          <ChevronRight />
        </button>

        <p className="service-slider__count"><span>{String(current + 1).padStart(2, "0")}</span> / {String(services.length).padStart(2, "0")}</p>
      </div>
    </section>
  );
}
