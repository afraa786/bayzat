import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursor = useRef(null);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const element = cursor.current;
    const hide = () => {
      element.style.opacity = "0";
      document.documentElement.classList.remove("has-custom-cursor");
    };
    const move = (event) => {
      if (!media.matches || event.pointerType === "touch") { hide(); return; }
      element.style.left = `${event.clientX}px`;
      element.style.top = `${event.clientY}px`;
      element.style.opacity = "1";
      element.classList.toggle("custom-cursor--link", Boolean(event.target.closest("a, button, input, select, textarea, [role=button]")));
      document.documentElement.classList.add("has-custom-cursor");
    };
    const leave = (event) => { if (!event.relatedTarget) hide(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    media.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      media.removeEventListener("change", hide);
    };
  }, []);
  return <div className="custom-cursor" ref={cursor} aria-hidden="true" />;
}
