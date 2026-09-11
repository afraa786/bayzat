import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "./CrodlinDifference.css";
import connectedWorkspace from "../../images/office1.jpeg";
import focusedWorkspace from "../../images/office4.jpeg";
import growingWorkspace from "../../images/office3.jpeg";

gsap.registerPlugin(ScrollTrigger, SplitText);

const SLIDES = [
  {
    title: "People first. Everything connected.",
    body: "Bring employee records, leave, and benefits together. Give your people one place to find what they need, and your team more time to support them.",
    label: "One connected team",
    image: connectedWorkspace,
    alt: "A warm workspace with a wooden desk and upholstered chair",
  },
  {
    title: "Less busywork. More possibility.",
    body: "Connect attendance, payroll, and expenses in one workflow. Turn repetitive tasks into smooth approvals, so the work keeps moving.",
    label: "Work that flows",
    image: focusedWorkspace,
    alt: "A softly lit desk with a notebook and modern lamp",
  },
  {
    title: "Built to grow with you.",
    body: "From your next hire to your next chapter, keep hiring, workforce costs, and everyday decisions connected. A clearer picture at every stage of growth.",
    label: "Room to grow",
    image: growingWorkspace,
    alt: "Two sculpted wooden chairs in a bright shared space",
  },
];

function Copy({ index, className = "" }) {
  return (
    <div className={`difference-copy ${className}`} data-copy={index}>
      <h3>{SLIDES[index].title}</h3>
      <p>{SLIDES[index].body}</p>
    </div>
  );
}

function Photo({ index, className = "" }) {
  return (
    <div className={`difference-photo ${className}`} data-photo={index}>
      <div className="difference-photo-frame">
        <img src={SLIDES[index].image} alt={SLIDES[index].alt} loading="lazy" decoding="async" />
        <p className="difference-image-tag">{SLIDES[index].label}</p>
      </div>
    </div>
  );
}

export default function FeatureSections() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let cancelled = false;
      let context;
      const splits = [];
      document.fonts.ready.then(() => {
        if (cancelled) return;
        context = gsap.context(() => {
          const select = gsap.utils.selector(root);
          let playhead = 0;
          const textSetters = new Map();
          const easeText = gsap.parseEase("power2.inOut");
          const textOffset = index => {
            const time = playhead;
            // Clear the outgoing lines before revealing their replacements.
            const start = index === 0 ? 1.65 : 2.05;
            const amount = easeText(gsap.utils.clamp(0, 1, (time - start) / .5));
            return index === 0 ? -110 * amount : 110 * (1 - amount);
          };
          select(".difference-col-3 .difference-copy").forEach((copy, index) => {
            copy.querySelectorAll("h3, p").forEach((element) => {
              splits.push(SplitText.create(element, {
                type: "lines", mask: "lines", autoSplit: true,
                onSplit(split) {
                  const setY = gsap.quickSetter(split.lines, "yPercent");
                  textSetters.set(element, { index, setY });
                  setY(textOffset(index));
                },
              }));
            });
          });
          const syncText = () => {
            playhead = sequence.time();
            textSetters.forEach(({ index, setY }) => setY(textOffset(index)));
            const phase = playhead < 1.2 ? 0 : playhead < 2.55 ? 1 : 2;
            if (root.dataset.phase !== String(phase)) {
              root.dataset.phase = String(phase);
              select("[data-copy], [data-photo]").forEach(panel => panel.setAttribute("aria-hidden", String(Number(panel.dataset.copy ?? panel.dataset.photo) !== phase)));
            }
          };
          gsap.set(select(".difference-col-2, .difference-col-3, .difference-col-4"), { xPercent: 100, x: 0, y: 0 });
          gsap.set(select(".difference-col-3, .difference-col-4"), { yPercent: 100 });
          // One scroll range owns the pin and every transition, including reverse scrolling.
          const sequence = gsap.timeline({
            defaults: { ease: "power2.inOut", duration: 1.05 },
            onUpdate: syncText,
            scrollTrigger: {
              trigger: root, start: "top top", end: () => `+=${root.offsetHeight * 3.6}`,
              pin: true, pinSpacing: true, scrub: .8, anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          sequence
            .to(select(".difference-col-1"), { opacity: 0, scale: .92 }, .3)
            .to(select(".difference-col-2"), { xPercent: 0 }, .3)
            .to(select(".difference-col-3"), { yPercent: 0 }, .3)
            .to(select(".difference-photo-1 img"), { scale: 1.12 }, .3)
            .to(select(".difference-photo-2"), { clipPath: "inset(0 0 0% 0)" }, .3)
            .to(select(".difference-photo-2 img"), { scale: 1 }, .3)
            .to(select(".difference-col-2"), { opacity: 0, scale: .92 }, 1.65)
            .to(select(".difference-col-3"), { xPercent: 0 }, 1.65)
            .to(select(".difference-col-4"), { yPercent: 0 }, 1.65)
            // Hold the complete final pair before releasing the section.
            .to({}, { duration: .9 }, 2.7);
          syncText();
          // Release the entire section together. Translating its inner wrapper
          // during the exit pushes the cards outside the clipped section bounds.
          ScrollTrigger.refresh();
        }, root);
      });
      return () => {
        cancelled = true;
        context?.revert();
        splits.forEach(split => split.revert());
        root.querySelectorAll("[data-copy], [data-photo]").forEach(panel => panel.removeAttribute("aria-hidden"));
      };
    }, root);
    return () => media.revert();
  }, []);

  return (
    <section className="difference-section" id="platform" ref={rootRef} aria-labelledby="difference-title">
      <div className="container difference-inner">
        <div className="difference-heading">
          <h2 id="difference-title">Featured Work</h2>
          <p><em>Excellency in creative designs</em></p>
        </div>
        <div className="difference-stage" aria-label="Featured Work carousel" aria-roledescription="carousel">
          <div className="difference-col difference-col-1"><Copy index={0} /></div>
          <div className="difference-col difference-col-2"><Photo index={0} className="difference-photo-1" /><Photo index={1} className="difference-photo-2" /></div>
          <div className="difference-col difference-col-3"><div className="difference-copy-surface"><Copy index={1} /><Copy index={2} className="difference-copy-next" /></div></div>
          <div className="difference-col difference-col-4"><Photo index={2} /></div>
        </div>

      </div>
    </section>
  );
}
