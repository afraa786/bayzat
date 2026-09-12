import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import "./counter-curtain-hero.css";

gsap.registerPlugin(CustomEase, Flip, SplitText);
CustomEase.create("cc-hop", "0.8, 0, 0.1, 1");

const DEFAULT_IMAGES = Array.from(
  { length: 10 },
  (_, index) => `https://motionprompts.dev/c/counter-curtain-hero-reveal/img${index + 1}.jpg`,
);

export default function CounterCurtainHero({
  brand = "Crodlin",
  rotatingWords = ["People", "Payroll", "Time", "Insight", "Crodlin"],
  rows = ["Work should", "Work for", "Everyone"],
  caption = "People. Pay. Possibilities.",
  loadingCopy = "Building better work",
  images = DEFAULT_IMAGES,
}) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context((self) => {
      const preloader = root.querySelector(".cc-preloader");
      const counter = root.querySelector(".cc-preloader__counter strong");
      const rotatingWord = root.querySelector(".cc-preloader__word");
      const bar = root.querySelector(".cc-preloader__bar");
      const hero = root.querySelector(".cc-hero");
      const frame = root.querySelector(".cc-hero__frame");
      const footer = root.querySelector(".cc-hero__footer p");
      const frameImages = [...frame.querySelectorAll("img")];
      const fadingBlocks = root.querySelectorAll(".cc-preloader__row, .cc-preloader__footer");
      const splits = [...root.querySelectorAll(".cc-hero__row h1")].map((heading) =>
        SplitText.create(heading, { type: "words", mask: "words", wordsClass: "cc-word" }),
      );
      const words = splits.map((split) => split.words);
      const counterState = { value: 0 };
      const wordState = { value: 0 };
      const imageState = { value: 0 };
      let lastWord = -1;
      let lastImage = -1;

      gsap.set(words.flat(), { xPercent: (index) => index >= words[0].length && index < words[0].length + words[1].length ? 100 : -100 });
      gsap.set(footer, { opacity: 0, y: 18 });
      gsap.set(bar, { scaleX: 0 });
      frameImages.forEach((image, index) => image.classList.toggle("is-active", index === 0));

      const leftOffset = () => {
        const padding = parseFloat(getComputedStyle(hero).paddingLeft);
        return padding + hero.getBoundingClientRect().left - frame.getBoundingClientRect().left;
      };
      gsap.set(frame, { x: leftOffset });

      self.add("expandFrame", () => {
        const state = Flip.getState(frame);
        frame.classList.add("is-full");
        gsap.set(frame, { x: 0 });
        Flip.from(state, { duration: 1.25, ease: "cc-hop", absolute: true });
      });

      const timeline = gsap.timeline({ delay: 0.5 });
      timeline
        .to(counterState, {
          value: 100, duration: 3, ease: "none",
          onUpdate: () => { counter.textContent = String(Math.round(counterState.value)).padStart(3, "0"); },
        }, 0)
        .to(bar, { scaleX: 1, duration: 3, ease: "none" }, 0)
        .to(frame, { x: 0, duration: 3, ease: "none" }, 0)
        .to(wordState, {
          value: rotatingWords.length - 1, duration: 3, ease: "none",
          onUpdate: () => {
            const index = Math.round(wordState.value);
            if (index !== lastWord) { rotatingWord.textContent = rotatingWords[index]; lastWord = index; }
          },
        }, 0)
        .to(imageState, {
          value: frameImages.length * 3 - 1, duration: 3, ease: "none",
          onUpdate: () => {
            const index = Math.round(imageState.value) % frameImages.length;
            if (index !== lastImage) {
              frameImages.forEach((image, imageIndex) => image.classList.toggle("is-active", imageIndex === index));
              lastImage = index;
            }
          },
        }, 0)
        .to(fadingBlocks, { opacity: 0, filter: "blur(10px)", duration: 0.35, stagger: 0.04 }, "+=0.3")
        .to(bar, { opacity: 0, duration: 0.2 }, "<")
        .to(preloader, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "cc-hop",
          onComplete: () => { preloader.style.display = "none"; },
        })
        .to(words.flat(), { xPercent: 0, duration: 1.25, ease: "power3.out", onComplete: self.expandFrame }, "-=0.5")
        .to(footer, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "<");

      self.add("cleanup", () => {
        timeline.kill();
        splits.forEach((split) => split.revert());
        frame.classList.remove("is-full");
      });
    }, root);

    return () => {
      context.cleanup?.();
      context.revert();
    };
  }, [images, rotatingWords]);

  return (
    <div className="cc" ref={rootRef}>
      <div className="cc-preloader" aria-hidden="true">
        <div className="cc-preloader__header">
          <div className="cc-preloader__row"><strong>{brand}</strong></div>
          <div className="cc-preloader__row"><strong className="cc-preloader__word">{rotatingWords[0]}</strong></div>
        </div>
        <div className="cc-preloader__footer">
          <div className="cc-preloader__counter"><strong>000</strong></div>
          <p>{loadingCopy}</p>
        </div>
        <span className="cc-preloader__bar" />
      </div>

      <section className="cc-hero" aria-label={`${brand}: ${rows.join(" ")}`}>
        <div className="cc-hero__header">
          <div className="cc-hero__row"><h1>{rows[0]}</h1></div>
          <div className="cc-hero__row">
            <h1>{rows[1]}</h1>
            <div className="cc-hero__frame">
              {images.map((src, index) => <img src={src} alt="" key={src} className={index === 0 ? "is-active" : ""} />)}
            </div>
          </div>
          <div className="cc-hero__row"><h1>{rows[2]}</h1></div>
        </div>
        <div className="cc-hero__footer"><p>{caption}</p></div>
      </section>
    </div>
  );
}
