import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./BlogPage.css";

export const POSTS = [
  ["A Better Way to Run HR", "People", "office1.jpeg"],
  ["Payroll Without the Friction", "Payroll", "tech2.jpeg"],
  ["What Growing Teams Need Next", "Growth", "office3.jpeg"],
  ["Turn Workforce Data Into Direction", "Insights", "tech1.jpeg"],
  ["The Modern Employee Experience", "People", "office2.jpeg"],
  ["Time Tracking That Works", "Operations", "tech3.jpeg"],
  ["Building Trust Into Every Payslip", "Payroll", "tech4.jpeg"],
  ["One Platform, Fewer Handoffs", "Platform", "office4.jpeg"],
  ["How Great Teams Stay Aligned", "Culture", "tech5.jpeg"],
  ["Automation With a Human Side", "Workflows", "furniture1.jpeg"],
  ["The New Rhythm of Work", "Future of work", "tech6.jpeg"],
  ["Scaling Without Added Complexity", "Growth", "furniture2.jpeg"],
  ["Clarity for Every Manager", "Leadership", "lighting1.jpeg"],
  ["A Practical Guide to People Data", "Insights", "furniture3.jpeg"],
  ["Why Connected Operations Win", "Operations", "lighting2.jpeg"],
].map(([title, category, image], index) => ({
  title,
  category,
  image: new URL(`../../images/${image}`, import.meta.url).href,
  date: "2026",
  number: String(index + 1).padStart(2, "0"),
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
}));

const PAGE_SIZE = 8;

export default function BlogPage() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shownPosts = POSTS.slice(0, visible);
  const hasMore = visible < POSTS.length;

  return (
    <div className="blog-page">
      <header className="blog-hero">
        <p className="blog-hero__eyebrow">Ideas for better work</p>
        <h1>Journals</h1>
      </header>

      <section className="blog-feed" aria-labelledby="recent-journals">
        <div className="blog-feed__intro">
          <p>Recent journal</p>
          <div>
            <h2 id="recent-journals">Ideas worth<br />sharing.</h2>
            <p>Perspectives on people, payroll, operations, and building a workplace ready for what comes next.</p>
          </div>
        </div>

        <div className="blog-grid">
          {shownPosts.map((post) => (
            <article className="blog-card" key={post.title}>
              <a className="blog-card__image" href={`/blog/${post.slug}`} aria-label={post.title}>
                <img src={post.image} alt="" />
                <span>{post.number}</span>
              </a>
              <div className="blog-card__meta">
                <span>{post.category}</span>
                <span>Crodlin — {post.date}</span>
              </div>
              <h3>
                <a href={`/blog/${post.slug}`}>{post.title}<ArrowUpRight aria-hidden="true" /></a>
              </h3>
            </article>
          ))}
        </div>

        <div className="blog-more">
          {hasMore ? (
            <button type="button" onClick={() => setVisible((count) => Math.min(count + 5, POSTS.length))}>
              View more <span aria-hidden="true">+</span>
            </button>
          ) : (
            <p>All journals loaded.</p>
          )}
        </div>
      </section>
    </div>
  );
}
