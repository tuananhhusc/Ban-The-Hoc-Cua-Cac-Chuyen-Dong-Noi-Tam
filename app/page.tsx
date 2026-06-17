import fs from "fs";
import path from "path";
import HeroSection from "@/components/HeroSection";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import ReadingSettings from "@/components/ReadingSettings";

// Calculate estimated reading time (Vietnamese avg ~200 words/min)
function calculateReadingTime(text: string): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / 200);
}

export default function HomePage() {
  // Read the markdown content at build time (Server Component)
  const articlePath = path.join(process.cwd(), "content", "article.md");
  let content = "";
  try {
    content = fs.readFileSync(articlePath, "utf-8");
  } catch {
    content =
      "# Nội dung đang được chuẩn bị\n\nVui lòng thêm file `content/article.md` vào dự án.";
  }

  // Remove the H1 title from the markdown (we render it in the Hero)
  const contentWithoutTitle = content.replace(/^#\s+.+\n*/m, "");

  const readingTime = calculateReadingTime(content);

  return (
    <>
      <ReadingProgressBar />
      <ReadingSettings />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title="Bản Thể Học Của Các Chuyển Động Nội Tâm"
          subtitle="Sự Phân định giữa &ldquo;Tiếng Ồn&rdquo; và Tiếng &ldquo;Thật&rdquo;"
          author="Nghiên cứu Tổng hợp"
          date="17 tháng 6, 2026"
          readingTime={readingTime}
        />

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex gap-8 lg:gap-12 relative">
            {/* Table of Contents — Left Sidebar (Desktop) */}
            <TableOfContents />

            {/* Article Content */}
            <div className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">
              <MarkdownRenderer content={contentWithoutTitle} />

              {/* Footer ornament */}
              <div className="mt-16 mb-8 flex items-center justify-center">
                <div className="hero-ornament w-full max-w-xs">
                  ✝
                </div>
              </div>

              {/* Disclaimer / Footer note */}
              <footer className="border-t border-border-light pt-8 pb-4">
                <p className="text-sm text-warm-gray font-[family-name:var(--font-ui)] text-center leading-relaxed italic">
                  Ad Maiorem Dei Gloriam — Để Vinh Danh Thiên Chúa Hơn
                </p>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
