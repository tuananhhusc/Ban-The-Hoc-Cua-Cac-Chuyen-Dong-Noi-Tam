"use client";

import { useEffect, useState, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Parse headings from the rendered DOM
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: TocItem[] = [];

    elements.forEach((el) => {
      const id = el.id;
      if (id) {
        items.push({
          id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        });
      }
    });

    setHeadings(items);
  }, []);

  // Scroll spy using IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting from the top
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the one closest to the top
          const sorted = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
        setIsOpen(false);
      }
    },
    []
  );

  // Close mobile panel on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop Sidebar ToC */}
      <nav
        className="hidden lg:block sticky top-24 self-start w-64 flex-shrink-0 max-h-[calc(100vh-7rem)] overflow-y-auto"
        aria-label="Mục lục bài viết"
      >
        <div className="pb-6">
          <h2
            className="font-[family-name:var(--font-ui)] text-xs font-semibold uppercase tracking-widest text-warm-gray mb-4 px-3"
          >
            Mục lục
          </h2>
          <ul className="space-y-0.5">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollTo(heading.id)}
                  className={`toc-link w-full text-left ${
                    heading.level === 3 ? "toc-link-h3" : ""
                  } ${activeId === heading.id ? "active" : ""}`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile ToC Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-30 w-12 h-12 bg-cardinal text-parchment rounded-full shadow-lg flex items-center justify-center hover:bg-cardinal-light transition-colors"
        aria-label="Mở mục lục"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4h14M3 8h10M3 12h14M3 16h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Mobile Overlay */}
      <div
        className={`mobile-toc-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Slide-in Panel */}
      <div className={`mobile-toc-panel ${isOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-[family-name:var(--font-ui)] text-sm font-semibold uppercase tracking-widest text-warm-gray"
          >
            Mục lục
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-warm-gray hover:text-charcoal transition-colors"
            aria-label="Đóng mục lục"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollTo(heading.id)}
                className={`toc-link w-full text-left ${
                  heading.level === 3 ? "toc-link-h3" : ""
                } ${activeId === heading.id ? "active" : ""}`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
