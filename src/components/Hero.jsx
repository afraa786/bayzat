import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RibbonCta from "./RibbonCta";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ cover = false }) {
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    if (cover) return;
    const title = titleRef.current;
    const coverElement = document.querySelector(".hero-cover .is--hero");
    if (!title || !coverElement) return;
    let disposed = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const context = gsap.context(() => {
      const scale = () => Math.min(
        (coverElement.clientWidth - (window.innerWidth <= 640 ? 32 : 56)) / title.offsetWidth,
        coverElement.offsetHeight * 0.72 / title.offsetHeight,
      );
      const bottomAlignedY = () => {
        const style = getComputedStyle(title);
        const transform = new DOMMatrixReadOnly(style.transform === "none" ? undefined : style.transform);
        const bounds = title.getBoundingClientRect();
        const baseline = title.querySelector(".hero-wordmark-baseline").getBoundingClientRect().top;
        const canvas = document.createElement("canvas").getContext("2d");
        canvas.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const metrics = canvas.measureText("Crodlin");
        // Align visible letter shapes, excluding the font's empty descender space.
        const inkBottom = (baseline - bounds.top) / transform.d + metrics.actualBoundingBoxDescent;
        const restingTop = bounds.top + window.scrollY - transform.f;
        const heroBottom = coverElement.getBoundingClientRect().bottom + window.scrollY;
        return heroBottom - inkBottom * scale() - restingTop;
      };
      gsap.fromTo(title, {
        scale,
        y: bottomAlignedY,
        color: "#00BCD4",
      }, {
        scale: 1,
        y: 0,
        color: "#6B7369",
        ease: "none",
        scrollTrigger: {
          trigger: coverElement,
          start: "top top",
          end: "bottom top",
          // Keep the requested scroll transition; omit trailing motion when reduced.
          scrub: motion.matches ? true : 1,
          invalidateOnRefresh: true,
        },
      });
    });
    // Start immediately, then correct measurements when the local font loads.
    // Unrelated remote fonts must not hold up the hero animation.
    document.fonts.load('700 100px "Thunder"').then(() => {
      if (!disposed) ScrollTrigger.refresh();
    }).catch(() => {});
    return () => { disposed = true; context.revert(); };
  }, [cover]);

  if (cover) {
    return (
      <div className="minimal-goods-hero hero-cover" id="top">
        <div className="section is--hero">
          <div className="hero-editorial">
            <div className="hero-award" aria-label="Award winning agency, since 2010">
              <span className="hero-award-rule" />
              <svg viewBox="0 0 180 180" aria-hidden="true">
                <defs><path id="hero-award-ring" d="M90,90 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" /></defs>
                <text className="hero-award-ring"><textPath href="#hero-award-ring" textLength="452">AWARD WINNING AGENCY · SINCE - 2010 · </textPath></text>
                <text className="hero-award-mark" x="90" y="105" textAnchor="middle">W.</text>
              </svg>
              <span className="hero-award-rule" />
            </div>
            <h2 className="hero-editorial-title">
              <span>Let’s sharpen</span>
              <span>your brand</span>
              <span>with <i className="hero-editorial-symbol" aria-hidden="true"><i /><i /></i> quality</span>
              <span>work</span>
            </h2>
            <div className="hero-editorial-details">
              <div className="hero-editorial-stats">
                <div><p className="hero-stat-value">98%</p><p>Average clients satisfied<br />and repeating</p></div>
                <div><p className="hero-stat-value">120+</p><p>Successfully projects<br />done in 24 countries</p></div>
              </div>
              <p className="hero-editorial-description">We’re a digital products design &amp; development agency that works passionately with the digital experiences.</p>
            </div>
          </div>
          <div className="hero-wordmark-space" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <section className="minimal-goods-hero intro-section" aria-label="Crodlin" id="introduction">
      <div className="container is--header">
        <h1><span className="hero-wordmark" ref={titleRef}>Crodlin<span className="hero-wordmark-baseline" aria-hidden="true" /></span></h1>
        <div className="intro-section-copy">
          <p className="intro-section-description">We’re a dynamic startup agency specializing in innovative solutions for businesses looking to elevate their brand presence. We offer a range of services including digital marketing, branding, web development, and creative strategy to help company</p>
          <RibbonCta as="a" href="#platform" className="ribbon-btn-sm feature-block-link">Learn more</RibbonCta>
        </div>
      </div>
    </section>
  );
}
