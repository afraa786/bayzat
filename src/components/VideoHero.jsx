import { useEffect, useRef, useState } from "react";
import { ArrowDown, Pause, Play } from "lucide-react";
import "./VideoHero.css";

export default function VideoHero() {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const video = videoRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    let manuallyPaused = false;
    let disposed = false;

    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const offset = motion.matches ? 0 : Math.max(-bounds.height, Math.min(bounds.height, -bounds.top)) * .24;
      background.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const syncPlayback = () => {
      if (motion.matches || !visible || document.hidden || manuallyPaused) video.pause();
      else video.play().then(() => { if (disposed) video.pause(); }).catch(() => {});
    };
    const onMotionChange = () => { update(); syncPlayback(); };
    const onToggle = () => {
      manuallyPaused = !video.paused;
      if (manuallyPaused) video.pause();
      else video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
      syncPlayback();
    });

    observer.observe(section);
    update();
    syncPlayback();
    section.addEventListener("toggle-video", onToggle);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", onMotionChange);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      video.pause();
      section.removeEventListener("toggle-video", onToggle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <section className="video-hero" ref={sectionRef} aria-labelledby="video-hero-title">
      <div className="video-hero-background" ref={backgroundRef} aria-hidden="true">
        <video ref={videoRef} muted loop playsInline preload="auto"
          onPlay={() => setPaused(false)} onPause={() => setPaused(true)}>
          <source src="/videos/crodlin-waves.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="video-hero-shade" aria-hidden="true" />
      <div className="container video-hero-content">
        <p className="video-hero-brand">Crodlin</p>
        <h2 className="section-title" id="video-hero-title">Built for<br />what’s next.</h2>
        <a className="video-hero-explore" href="#top">Explore Crodlin <ArrowDown size={20} aria-hidden="true" /></a>
      </div>
      <button className="video-hero-toggle" type="button"
        aria-label={paused ? "Play background video" : "Pause background video"}
        onClick={() => sectionRef.current.dispatchEvent(new Event("toggle-video"))}>
        {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
      </button>
    </section>
  );
}
