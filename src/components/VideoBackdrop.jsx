import { useEffect, useRef } from "react";

export default function VideoBackdrop() {
  const video = useRef(null);
  useEffect(() => {
    const element = video.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (motion.matches) element.pause();
      else element.play().catch(() => {});
    };
    sync();
    motion.addEventListener("change", sync);
    return () => { motion.removeEventListener("change", sync); element.pause(); };
  }, []);
  return (
    <>
      <div className="video-wrap">
        <video ref={video} playsInline loop muted preload="metadata" id="video-bg" aria-hidden="true">
          <source src="/videos/crodlin-waves.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="gradient-overlay" />
    </>
  );
}
