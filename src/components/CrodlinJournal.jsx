import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CrodlinJournal.css";

const IMAGES = [
  { num: 1, alt: "Team members collaborating on payroll processes at a meeting table", title: "Building People-First Workflows", tags: ["Workflows", "Culture"] },
  { num: 2, alt: "HR specialist managing employee records on a modern laptop", title: "The New Employee Record", tags: ["Core HR", "Digital"] },
  { num: 3, alt: "Finance team reviewing workforce costs and analytics dashboard", title: "Payroll Without the Friction", tags: ["Payroll", "Finance"] },
  { num: 4, alt: "Onboarding specialist welcoming a new employee to the team", title: "A Better First Day", tags: ["Onboarding", "People"] },
  { num: 5, alt: "Manager reviewing attendance and shift scheduling data", title: "Making Every Shift Count", tags: ["Attendance", "Planning"] },
  { num: 6, alt: "Employee accessing leave and benefits information on mobile", title: "Self-Service That Feels Human", tags: ["Employee UX", "Mobile"] },
  { num: 7, alt: "Payroll administrator processing monthly payroll calculations", title: "Closing Payroll with Confidence", tags: ["Payroll", "Operations"] },
  { num: 8, alt: "Team members in a productive meeting discussing HR strategy", title: "The Rhythm of Great Teams", tags: ["Teams", "Strategy"] },
  { num: 9, alt: "Compliance officer ensuring regulatory requirements are met", title: "Compliance by Design", tags: ["Compliance", "Policy"] },
  { num: 10, alt: "Employee appreciation moment during team gathering", title: "Recognition That Resonates", tags: ["Culture", "Engagement"] },
  { num: 11, alt: "Manager providing constructive feedback in a one-on-one meeting", title: "Rethinking the One-to-One", tags: ["Leadership", "Feedback"] },
  { num: 12, alt: "HR team celebrating successful employee milestone achievement", title: "Moments Worth Celebrating", tags: ["Milestones", "People"] },
  { num: 13, alt: "Dashboard displaying real-time workforce analytics and insights", title: "From Data to Direction", tags: ["Analytics", "Insights"] },
  { num: 14, alt: "Growing team celebrating expansion and new hires", title: "Scaling Without Losing Culture", tags: ["Growth", "Culture"] },
  { num: 15, alt: "Integration workflow connecting Crodlin with business tools", title: "One Connected Workplace", tags: ["Integrations", "Automation"] },
  { num: 16, alt: "Executive reviewing comprehensive HR and payroll reports", title: "The Future of People Operations", tags: ["Leadership", "Future"] },
];

function createOverlay(article) {
  const overlay = document.createElement("div");
  overlay.className = "journal-slide-overlay";

  const title = document.createElement("h3");
  title.textContent = article.title;

  const tags = document.createElement("div");
  tags.className = "journal-slide-tags";
  article.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    tags.appendChild(tagElement);
  });

  overlay.append(title, tags);
  return overlay;
}

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

const BOARD_COLORS = [
  "#a4a49e", "#8c8c88", "#888884", "#9c9c96",
  "#90908a", "#8e8e88", "#848480", "#b2b2ac",
  "#c2c2bc", "#b6b6b0", "#aaaaa4", "#b0b0aa",
  "#94948e", "#bcbcb6", "#a6a6a0", "#8a8a84",
];

function JournalItem({ num, alt }) {
  return (
    <div className="journal-item">
      <div className="journal-index" aria-hidden="true">
        <p>{String(num).padStart(2, "0")}</p>
      </div>
      <div className="journal-img">
        <img
          src={`https://motionprompts.dev/c/lightbox/${num}.jpeg`}
          alt={alt}
          data-num={num}
          tabIndex="0"
          role="button"
          aria-label={`View frame ${num}: ${alt}`}
        />
      </div>
    </div>
  );
}

export default function CrodlinJournal() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const root = rootRef.current;
    const thumbs = root.querySelectorAll(".journal-img img");
    const previewContainer = root.querySelector(".preview-container");

    const ctx = gsap.context((self) => {
      self.add("swap", (newSlide, currentLastSlide) => {
        if (currentLastSlide) {
          gsap.to(currentLastSlide, { duration: 1, scale: 1.5, left: "-50%" });
        }
        gsap.to(newSlide, { duration: 1, right: "0%" });
        gsap.to(newSlide.querySelector(".journal-slide-overlay"), {
          duration: 0.4,
          delay: 0.55,
          opacity: 1,
          y: 0,
        });
      });
    }, rootRef);

    function selectImage(event) {
      const imgNumber = event.currentTarget.dataset.num;
      const colorIndex = parseInt(imgNumber, 10) - 1;

      root.style.setProperty("--journal-bg", BOARD_COLORS[colorIndex]);

      const article = IMAGES[colorIndex];
      const currentLastSlide = previewContainer.querySelector(".journal-slide:last-child");
      const newSlide = document.createElement("div");
      newSlide.className = "journal-slide";
      newSlide.style.right = "-100%";

      const newImg = document.createElement("img");
      newImg.src = `https://motionprompts.dev/c/lightbox/${imgNumber}.jpeg`;
      newImg.alt = event.currentTarget.alt;
      const overlay = createOverlay(article);
      overlay.style.opacity = "0";
      overlay.style.transform = "translateY(16px)";
      newSlide.append(newImg, overlay);
      previewContainer.appendChild(newSlide);

      ctx.swap(newSlide, currentLastSlide);
    }

    function handleKeyDown(event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectImage(event);
      }
    }

    thumbs.forEach((img) => {
      img.addEventListener("click", selectImage);
      img.addEventListener("keydown", handleKeyDown);
    });

    return () => {
      thumbs.forEach((img) => {
        img.removeEventListener("click", selectImage);
        img.removeEventListener("keydown", handleKeyDown);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section className="journal-section" ref={rootRef}>
      <nav className="journal-nav">
        <div className="journal-col journal-cats">
          {CATEGORIES.map((cat) => (
            <div key={cat.label} className="journal-copy">
              <p className="journal-label">{cat.label}</p>
              <p>{cat.desc}</p>
            </div>
          ))}
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
        <h2 className="journal-center-title">
          <span>The</span>
          <span>Crodlin</span>
          <span>Journal</span>
        </h2>
        <div className="journal-preview">
          <div className="preview-container">
            <div className="journal-slide">
              <img
                src="https://motionprompts.dev/c/lightbox/1.jpeg"
                alt={IMAGES[0].alt}
              />
              <div className="journal-slide-overlay">
                <h3>{IMAGES[0].title}</h3>
                <div className="journal-slide-tags">
                  {IMAGES[0].tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
