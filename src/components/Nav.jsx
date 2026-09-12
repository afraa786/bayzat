import { useEffect, useRef, useState } from "react";
import Squiggle from "./Squiggle";
import "./TakeoverNav.css";

const links = [
  ["Platform", "#platform"], ["Solutions", "/solutions"],
  ["Why Crodlin", "/why-crodlin"], ["Resources", "/#faq"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    if (!open) return;
    const button = trigger.current;
    const background = [...document.querySelectorAll("main, footer")];
    const inertStates = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current.querySelector("a");
    first?.focus({ preventScroll: true });
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const items = [trigger.current, ...panel.current.querySelectorAll("a, button")];
      const index = items.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault(); items.at(-1).focus();
      } else if (!event.shiftKey && index === items.length - 1) {
        event.preventDefault(); items[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      background.forEach((element, index) => { element.inert = inertStates[index]; });
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header className="takeover-header">
      <div className={`sticky-nav ${open ? "" : "difference"}`}>
        <button id="nav-btn" ref={trigger} className={open ? "menu is-open" : "menu"} onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="takeover-nav">
          <svg className="icon" viewBox="20 20 60 60" aria-hidden="true">
            <path className="top-line" d="M30,37 L70,37" />
            <path className="middle-line" d="M30,50 L70,50" />
            <path className="bottom-line" d="M30,63 L70,63" />
          </svg>
        </button>
      </div>
      <div id="takeover-nav" className={open ? "shown" : ""} ref={panel} inert={!open} role="dialog" aria-modal={open ? true : undefined} aria-label="Main navigation">
        <div className="takeover-contact">
          <div className="takeover-topographic" />
          <div className="takeover-contact-content">
            <p className="takeover-kicker">People. Pay. Possibilities.</p>
            <h2>Build a better workplace with us<span>.</span></h2>
            <a className="takeover-contact-link" href="#get-started" onClick={() => setOpen(false)}>Let’s talk about your team ↗</a>
            <p>HR, payroll, and workforce management.<br />All together with Crodlin.</p>
          </div>
        </div>
        <nav className="takeover-menu" aria-label="Main">
          <ul>
            {links.map(([label, href]) => <li key={label}><a href={href} onClick={() => setOpen(false)}><span className="nav-trigger-label">{label}<Squiggle /></span></a></li>)}
          </ul>
          <a className="takeover-demo" href="#get-started" onClick={() => setOpen(false)}>Get a free demo ↗</a>
        </nav>
      </div>
    </header>
  );
}
