"use client";

import React, { useState, useEffect, useRef } from "react";

type Theme = "parchment" | "sepia" | "dark";
type FontSize = "sm" | "base" | "lg" | "xl";

export default function ReadingSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("parchment");
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [showToast, setShowToast] = useState(false);
  const [savedScrollPos, setSavedScrollPos] = useState<number | null>(null);
  
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("cdnt-theme") as Theme;
    const savedSize = localStorage.getItem("cdnt-font-size") as FontSize;
    const savedPosStr = localStorage.getItem("cdnt-scroll-pos");

    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("parchment");
    }

    if (savedSize) {
      setFontSize(savedSize);
      applyFontSize(savedSize);
    } else {
      applyFontSize("base");
    }

    if (savedPosStr) {
      const pos = parseFloat(savedPosStr);
      // Only prompt if scrolled down at least 150px
      if (pos > 150) {
        setSavedScrollPos(pos);
        // Show prompt after a short delay so the page can load fully
        const timer = setTimeout(() => setShowToast(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Save scroll position periodically
  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      // Throttle scroll events
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const scrollY = window.scrollY;
        // Don't save if we are at the very top or bottom
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        
        if (scrollY > 100 && scrollY < documentHeight - windowHeight - 100) {
          localStorage.setItem("cdnt-scroll-pos", scrollY.toString());
        } else if (scrollY <= 100) {
          localStorage.removeItem("cdnt-scroll-pos");
        }
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Handle clicking outside settings panel to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("theme-parchment", "theme-sepia", "theme-dark");
    root.classList.add(`theme-${t}`);
  };

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
    localStorage.setItem("cdnt-theme", t);
  };

  const applyFontSize = (size: FontSize) => {
    const root = document.documentElement;
    root.classList.remove("text-size-sm", "text-size-base", "text-size-lg", "text-size-xl");
    root.classList.add(`text-size-${size}`);
  };

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    applyFontSize(size);
    localStorage.setItem("cdnt-font-size", size);
  };

  const resumeReading = () => {
    if (savedScrollPos !== null) {
      window.scrollTo({
        top: savedScrollPos,
        behavior: "smooth",
      });
      setShowToast(false);
    }
  };

  return (
    <>
      {/* Floating Settings Button */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-cardinal text-parchment hover:bg-cardinal-light active:scale-95 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer focus:outline-none"
          aria-label="Cài đặt giao diện đọc"
        >
          <svg
            className={`w-6 h-6 transform transition-transform duration-500 ${isOpen ? "rotate-90" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </button>

        {/* Settings Panel */}
        {isOpen && (
          <div
            ref={panelRef}
            className="absolute bottom-16 right-0 w-72 p-5 bg-parchment-dark border border-gold-muted/40 rounded-xl shadow-2xl z-50 text-charcoal font-sans select-none animate-fade-in-up"
            style={{ animation: "fadeInUp 0.2s ease-out forwards" }}
          >
            <h4 className="text-xs font-bold font-[family-name:var(--font-ui)] uppercase tracking-wider text-cardinal mb-4 pb-2 border-b border-border-light">
              Tùy chọn đọc sách
            </h4>

            {/* Font Size Selector */}
            <div className="mb-4">
              <span className="block text-[11px] font-bold text-warm-gray uppercase tracking-wide mb-2">
                Kích thước chữ
              </span>
              <div className="grid grid-cols-4 gap-2">
                {(["sm", "base", "lg", "xl"] as FontSize[]).map((size) => {
                  const labels = { sm: "Nhỏ", base: "Vừa", lg: "Lớn", xl: "R.Lớn" };
                  const isActive = fontSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => handleFontSizeChange(size)}
                      className={`py-1.5 text-xs font-medium rounded-md cursor-pointer border transition-all duration-200 ${
                        isActive
                          ? "bg-cardinal text-parchment border-cardinal font-semibold"
                          : "bg-parchment text-charcoal-light border-border-light hover:bg-parchment-dark"
                      }`}
                    >
                      {labels[size]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Selector */}
            <div>
              <span className="block text-[11px] font-bold text-warm-gray uppercase tracking-wide mb-2">
                Màu sắc giao diện
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["parchment", "sepia", "dark"] as Theme[]).map((t) => {
                  const labels = { parchment: "Giấy da", sepia: "Sepia", dark: "Tối" };
                  const colorClasses = {
                    parchment: "bg-[#FDFBF7] text-[#1A1A1A] border-[#E8E0D4]",
                    sepia: "bg-[#F4ECD8] text-[#433422] border-[#DECDB3]",
                    dark: "bg-[#121212] text-[#E5DFD3] border-[#2C2C2C]",
                  };
                  const isActive = theme === t;

                  return (
                    <button
                      key={t}
                      onClick={() => handleThemeChange(t)}
                      className={`flex flex-col items-center justify-center py-2.5 rounded-lg cursor-pointer border transition-all duration-200 ${colorClasses[t]} ${
                        isActive
                          ? "ring-2 ring-cardinal border-transparent font-semibold scale-102"
                          : "opacity-85 hover:opacity-100"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider">{labels[t]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bookmark Resume Toast */}
      {showToast && (
        <div
          className="fixed bottom-6 left-6 z-40 max-w-sm p-4 bg-parchment-dark border border-gold border-l-4 border-l-cardinal rounded-r-lg shadow-2xl font-sans text-xs text-charcoal animate-fade-in-up flex flex-col gap-3 print:hidden"
          style={{
            animation: "fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <div>
            <h5 className="font-bold text-cardinal mb-0.5">Tiếp tục đọc?</h5>
            <p className="text-charcoal-light leading-relaxed font-medium">
              Chúng tôi tìm thấy tiến trình đọc cũ của bạn trong tài liệu này. Bạn có muốn cuộn xuống vị trí cũ không?
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowToast(false)}
              className="px-3 py-1.5 rounded text-warm-gray hover:text-charcoal cursor-pointer font-bold transition-colors"
            >
              Bỏ qua
            </button>
            <button
              onClick={resumeReading}
              className="px-4 py-1.5 rounded bg-cardinal text-parchment hover:bg-cardinal-light active:scale-95 cursor-pointer font-bold shadow transition-all duration-200"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}
    </>
  );
}
