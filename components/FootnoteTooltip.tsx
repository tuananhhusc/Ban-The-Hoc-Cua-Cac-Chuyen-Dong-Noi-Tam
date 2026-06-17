"use client";

import React, { useState, useRef, useEffect } from "react";

interface FootnoteTooltipProps {
  id: number;
  text: string;
  url?: string;
  children: React.ReactNode;
}

export default function FootnoteTooltip({ id, text, url, children }: FootnoteTooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    }

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  const toggleTooltip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(!visible);
  };

  return (
    <span className="relative inline-block group/fn select-none" ref={triggerRef}>
      <sup
        className="prose-sup-trigger font-sans cursor-pointer transition-all duration-200"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={toggleTooltip}
      >
        {children}
      </sup>

      {/* Tooltip Card */}
      {visible && (
        <span
          ref={tooltipRef}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-parchment border border-gold-muted/40 rounded-lg shadow-xl text-xs text-charcoal leading-relaxed font-sans normal-case text-left pointer-events-auto animate-fade-in-up"
          style={{
            animation: "fadeInUp 0.2s ease-out forwards",
            filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.08))",
          }}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {/* Small Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-parchment -mt-[1px]"></span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gold-muted/40 -mt-[0px] z-[-1]"></span>

          <span className="block font-bold text-cardinal mb-1 font-[family-name:var(--font-ui)] uppercase tracking-wider text-[10px]">
            Chú thích [{id}]
          </span>
          <span className="block text-charcoal-light font-medium mb-2">{text}</span>
          
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-navy hover:text-cardinal transition-colors font-[family-name:var(--font-ui)]"
            >
              Xem nguồn gốc
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </a>
          )}
        </span>
      )}
    </span>
  );
}
