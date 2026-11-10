import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./layout-grid.css";

export function LayoutGrid({ cards }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  return (
    <div className="layout-grid">
      {cards
        .filter((card) => card.id !== selected?.id)
        .map((card) => (
          <motion.button
            aria-label={`View ${card.title}`}
            className={`layout-grid__card ${card.className || ""}`}
            key={card.id}
            layoutId={`layout-grid-card-${card.id}`}
            onClick={() => setSelected(card)}
            type="button"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
          >
            <img
              alt={card.imageAlt}
              className="layout-grid__image"
              src={card.thumbnail}
              loading="lazy"
              decoding="async"
            />
            <span className="layout-grid__shade" />
            <span className="layout-grid__title">{card.title}</span>
            <span className="layout-grid__open">Explore</span>
          </motion.button>
        ))}

      <AnimatePresence>
        {selected && (
          <>
            <motion.button
              aria-label="Close details"
              className="layout-grid__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              type="button"
            />
            <motion.article
              aria-label={`${selected.title} details`}
              aria-modal="true"
              className="layout-grid__selected"
              layoutId={`layout-grid-card-${selected.id}`}
              role="dialog"
              style={{ x: "-50%", y: "-50%" }}
            >
              <img
                alt={selected.imageAlt}
                className="layout-grid__image"
                src={selected.thumbnail}
              />
              <div className="layout-grid__selected-shade" />
              <button
                aria-label="Close details"
                className="layout-grid__close"
                onClick={() => setSelected(null)}
                type="button"
              >
                Close <span aria-hidden="true">×</span>
              </button>
              <div className="layout-grid__content">{selected.content}</div>
            </motion.article>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
