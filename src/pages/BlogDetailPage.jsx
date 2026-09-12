import { ArrowLeft, ArrowRight } from "lucide-react";
import { POSTS } from "./BlogPage";
import "./BlogDetailPage.css";

export default function BlogDetailPage({ slug }) {
  const index = POSTS.findIndex((entry) => entry.slug === slug);
  const post = POSTS[index];

  if (!post) {
    return (
      <section className="article-not-found">
        <p>Journal not found</p>
        <h1>This story is not available.</h1>
        <a href="/blog"><ArrowLeft /> Back to journals</a>
      </section>
    );
  }

  const nextPost = POSTS[(index + 1) % POSTS.length];

  return (
    <article className="article-page">
      <header className="article-hero">
        <a className="article-back" href="/blog"><ArrowLeft /> All journals</a>
        <div className="article-hero__meta">
          <span>{post.category}</span>
          <span>Crodlin — {post.date}</span>
          <span>{post.number}</span>
        </div>
        <h1>{post.title}</h1>
      </header>

      <figure className="article-cover">
        <img src={post.image} alt="" />
      </figure>

      <div className="article-body">
        <aside>
          <p>Journal {post.number}</p>
          <p>6 minute read</p>
        </aside>
        <div className="article-copy">
          <p className="article-lede">The best workplace systems create clarity without asking people to think about the machinery behind them.</p>
          <p>Growing organizations rarely struggle because they lack information. They struggle because the information they need lives in different places, moves through disconnected processes, and reaches people too late. The result is more administration, slower decisions, and less confidence.</p>
          <h2>Make the work feel simple</h2>
          <p>Crodlin brings people, payroll, time, and operational workflows together. When every team works from the same source of truth, routine tasks become easier to complete and important exceptions become easier to see.</p>
          <blockquote>Technology should remove uncertainty and give people more room to do meaningful work.</blockquote>
          <h2>Design for what comes next</h2>
          <p>A connected foundation does more than improve today’s process. It gives a growing business the flexibility to add teams, adapt policies, and make decisions without rebuilding the way work gets done.</p>
        </div>
      </div>

      <a className="article-next" href={`/blog/${nextPost.slug}`}>
        <span>Read next</span>
        <strong>{nextPost.title}</strong>
        <ArrowRight aria-hidden="true" />
      </a>
    </article>
  );
}
