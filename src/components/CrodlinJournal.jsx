import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./CrodlinJournal.css";

const IMAGES = [
  { num: 1, alt: "Team members collaborating on payroll processes at a meeting table" },
  { num: 2, alt: "HR specialist managing employee records on a modern laptop" },
  { num: 3, alt: "Finance team reviewing workforce costs and analytics dashboard" },
  { num: 4, alt: "Onboarding specialist welcoming a new employee to the team" },
  { num: 5, alt: "Manager reviewing attendance and shift scheduling data" },
  { num: 6, alt: "Employee accessing leave and benefits information on mobile" },
  { num: 7, alt: "Payroll administrator processing monthly payroll calculations" },
  { num: 8, alt: "Team members in a productive meeting discussing HR strategy" },
  { num: 9, alt: "Compliance officer ensuring regulatory requirements are met" },
  { num: 10, alt: "Employee appreciation moment during team gathering" },
  { num: 11, alt: "Manager providing constructive feedback in a one-on-one meeting" },
  { num: 12, alt: "HR team celebrating successful employee milestone achievement" },
  { num: 13, alt: "Dashboard displaying real-time workforce analytics and insights" },
  { num: 14, alt: "Growing team celebrating expansion and new hires" },
  { num: 15, alt: "Integration workflow connecting Crodlin with business tools" },
  { num: 16, alt: "Executive reviewing comprehensive HR and payroll reports" },
];

const CATEGORIES = [
  {
    label: "(01) Workflows",
    desc: "Streamlined HR processes from hire to retire. Frames 1 to 4.",
  },
  {
    label: "(02) Operations",
    desc: "Daily HR operations and employee management. Frames 5 to 8.",
  },
  {
    label: "(03) Insights",
    desc: "Analytics, compliance, and strategic workforce planning. Frames 9 to 12.",
  },
  {
    label: "(04) Growth",
    desc: "Scaling teams and integrating with your existing tools. Frames 13 to 16.",
  },
];

// Color palette based on image content – mapped to Crodlin's design system
const COLOR_ARRAY = [
  "var(--moss)",        // workflow deep
  "var(--moss-light)",  // workflow light
  "var(--amber)",       // operations warm
  "var(--paper-dim)",   // operations soft
  "var(--ink-soft)",    // operations deep
  "var(--moss)",        // operations forest
  "var(--amber-deep)",  // insights warm
  "var(--paper)",       // insights neutral
  "var(--moss-light)",  // insights light
  "var(--amber)",       // insights accent
  "var(--ink)",         // growth deep
  "var(--paper-dim)",   // growth soft
  "var(--moss)",        // growth forest
  "var(--amber-deep)",  // growth deep
  "var(--moss-light)",  // growth light
  "var(--amber)",       // growth final
];

function JournalItem({ num, alt }) {
  return (
    <div className="journal-item">
      <div className="journal-img">
        <img
          src={`https://motionprompts.dev/c/lightbox/${num}.jpeg`}
          alt={alt}
          data-num={num}
        />
      </div>
    </div>
  );
}

export default function CrodlinJournal() {
  const rootRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!rootRef.current) return;

    const root = rootRef.current;
    const thumbs = root.querySelectorAll(".journal-img img");
    const previewContainer = root.querySelector(".preview-container");

    const ctx = gsap.context((self) => {
      self.add("swap", (newImg, currentLastImg) => {
        if (currentLastImg) {
          gsap.to(currentLastImg, { duration: 1, scale: 1.5, left: "-50%" });
        }
        gsap.to(newImg, { duration: 1, right: "0%" });
      });
    }, rootRef);

    function handleImageClick(event) {
      const imgNumber = event.currentTarget.dataset.num;
      const colorIndex = parseInt(imgNumber, 10) - 1;

      // Set background color via CSS variable
      root.style.setProperty("--journal-bg", COLOR_ARRAY[colorIndex]);

      const currentLastImg = previewContainer.querySelector("img:last-child");
      const newImg = document.createElement("img");
      newImg.src = `/c/lightbox/${imgNumber}.jpeg`;
      newImg.alt = event.currentTarget.alt;
      newImg.style.position = "absolute";
      newImg.style.right = "-100%";
      previewContainer.appendChild(newImg);

      ctx.swap(newImg, currentLastImg);
    }

    thumbs.forEach((img) => img.addEventListener("click", handleImageClick));

    return () => {
      thumbs.forEach((img) => img.removeEventListener("click", handleImageClick));
      ctx.revert();
    };
  }, []);

  if (!mounted) return null;

  return (
    <section className="journal-section" ref={rootRef} style={{ "--journal-bg": COLOR_ARRAY[0] }}>
      <nav className="journal-nav">
        <div className="journal-col journal-intro">
          <div className="journal-copy">
            <p className="journal-label">The Crodlin Journal</p>
            <p>A visual story of HR transformation, where every frame represents a moment in your people-first journey.</p>
          </div>
        </div>
        <div className="journal-col journal-cats">
          {CATEGORIES.map((cat) => (
            <div key={cat.label} className="journal-copy">
              <p className="journal-label">{cat.label}</p>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
        <div className="journal-col journal-brand">
          <p className="journal-logo">Crodlin</p>
          <p className="journal-brand-sub">People workflows reimagined</p>
        </div>
      </nav>

      <div className="journal-container">
        <div className="journal-gallery">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="journal-row">
              {IMAGES.slice(row * 4, (row + 1) * 4).map((img) => (
                <JournalItem key={img.num} num={img.num} alt={img.alt} />
              ))}
            </div>
          ))}
        </div>
        <div className="journal-preview">
          <div className="journal-preview-meta">
            <p className="journal-label">Viewing board</p>
            <p>Each frame tells a story. Select any to explore the moment.</p>
          </div>
          <div className="preview-container">
            <img
              src="https://motionprompts.dev/c/lightbox/1.jpeg"
              alt="Team members collaborating on payroll processes at a meeting table"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
