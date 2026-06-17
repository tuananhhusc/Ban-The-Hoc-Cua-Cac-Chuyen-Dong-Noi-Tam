import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cdnt-document.veritas.vn"),
  title:
    "Bản Thể Học Của Các Chuyển Động Nội Tâm — Sự Phân định giữa \"Tiếng Ồn\" và Tiếng \"Thật\"",
  description:
    "Báo cáo phân tích toàn diện về bản thể học của các chuyển động nội tâm, sự phân định thiêng liêng theo linh đạo Dòng Tên, tâm lý học và thần bí học.",
  authors: [{ name: "Nghiên cứu Tổng hợp" }],
  keywords: [
    "phân định thiêng liêng",
    "Dòng Tên",
    "Ignatian spirituality",
    "chuyển động nội tâm",
    "thần học",
    "tâm lý học",
    "phân tâm học",
    "thần bí học",
  ],
  alternates: {
    canonical: "https://cdnt-document.veritas.vn",
  },
  openGraph: {
    title:
      "Bản Thể Học Của Các Chuyển Động Nội Tâm — Sự Phân định giữa \"Tiếng Ồn\" và Tiếng \"Thật\"",
    description:
      "Báo cáo phân tích toàn diện về bản thể học của các chuyển động nội tâm theo lăng kính Linh đạo I-nhã và tâm lý học hiện đại.",
    type: "article",
    locale: "vi_VN",
    url: "https://cdnt-document.veritas.vn",
    siteName: "Đọc sách Veritas",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bản Thể Học Của Các Chuyển Động Nội Tâm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Bản Thể Học Của Các Chuyển Động Nội Tâm — Sự Phân định giữa \"Tiếng Ồn\" và Tiếng \"Thật\"",
    description:
      "Báo cáo phân tích toàn diện về bản thể học của các chuyển động nội tâm.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-parchment text-charcoal">
        {children}
      </body>
    </html>
  );
}
