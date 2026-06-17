# Chuyển Động Nội Tâm (CDNT) - Nền Tảng Đọc Học Thuật

**Chuyển Động Nội Tâm** là một ứng dụng web học thuật được thiết kế chuyên biệt để trình bày các bài viết thần học và linh đạo sâu sắc. Dự án tập trung vào trải nghiệm đọc tối ưu (typography học thuật), tương tác thông minh (chú thích popover) và tính cá nhân hóa (chế độ đọc, cỡ chữ).

## 🚀 Tính Năng Nổi Bật

- **Trải Nghiệm Đọc Cá Nhân Hóa (Reading Settings):** Cho phép người đọc tự do điều chỉnh cỡ chữ (từ nhỏ đến rất lớn) và giao diện màu sắc (Sáng, Giấy da - Sepia, Tối). Các cài đặt này được lưu trữ ở Local Storage để tự động khôi phục cho những lần truy cập sau.
- **Chú Thích Thông Minh (Smart Footnotes):** Thay vì phải cuộn xuống cuối trang để xem tài liệu tham khảo, ứng dụng tự động phân tích cú pháp Markdown và hiển thị các chú thích (footnotes) trực tiếp thông qua một Popover (Tooltip) tương tác ngay khi người dùng bấm vào các con số chú thích.
- **Giao Diện Học Thuật (Academic Typography):** Sử dụng các font chữ chuẩn mực, có chân (serif) cho văn bản chính để tăng cường tính nghiêm trang và học thuật. Thiết kế khoảng cách dòng và đoạn tối ưu cho văn bản tiếng Việt dài.
- **Tối Ưu SEO & Open Graph:** Cấu hình metadata đầy đủ với thẻ Canonical, Twitter Card, và hình ảnh Open Graph (OG) được tự động tạo nhằm đảm bảo bài viết hiện thị hoàn hảo khi chia sẻ lên các mạng xã hội.
- **Hỗ Trợ In Ấn (Print Optimization):** Ứng dụng cung cấp bảng định dạng CSS Print chuyên biệt, tự động ẩn đi các thành phần UI không cần thiết (Mục lục, Cài đặt) và tối ưu hóa phông nền, màu chữ khi người dùng in bài viết ra giấy.
- **Giao Diện Tương Thích Mọi Thiết Bị (Responsive):** Cấu trúc layout chia cột thông minh. Trên mobile, Mục lục được neo gọn ở góc dưới bên trái và Bảng Cài đặt nằm gọn ở góc dưới bên phải, không cản trở việc đọc.

## 🛠️ Công Nghệ Sử Dụng

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Thư viện UI:** [React 19](https://react.dev/)
- **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/)
- **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Xử lý Nội dung:** `react-markdown`, `remark-gfm`, `rehype-raw`

## 📂 Cấu Trúc Dự Án

```
cdnt-app/
├── app/
│   ├── globals.css         # Chứa biến màu chủ đề, CSS cho print và Markdown styles
│   ├── layout.tsx          # Root Layout bao gồm cấu hình Metadata và SEO
│   └── page.tsx            # Trang chính, tập hợp các components
├── components/
│   ├── MarkdownRenderer.tsx # Render nội dung Markdown và xử lý logic Popover chú thích
│   ├── ReadingSettings.tsx  # Cung cấp bảng điều khiển font chữ và theme (Sáng/Tối/Giấy da)
│   └── TableOfContents.tsx  # Gợi ý mục lục động
├── content/
│   └── article.md          # Nơi lưu trữ nội dung bài viết gốc
├── public/                 # Các tài nguyên tĩnh (favicon, hình ảnh)
└── README.md
```

## ⚙️ Hướng Dẫn Cài Đặt và Khởi Chạy

### Yêu Cầu Hệ Thống
- Node.js (phiên bản 18.x trở lên)
- Trình quản lý gói `npm`, `yarn`, hoặc `pnpm`.

### Các Bước Cài Đặt

1. **Clone mã nguồn (nếu có Git):**
   ```bash
   git clone <repository_url>
   cd cdnt-app
   ```

2. **Cài đặt các gói phụ thuộc:**
   ```bash
   npm install
   ```

3. **Chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   *Mở trình duyệt và truy cập `http://localhost:3000` (hoặc cổng hiển thị trên terminal) để xem kết quả.*

4. **Xây dựng ứng dụng (Production Build):**
   Để kiểm tra mã nguồn hoặc triển khai lên hosting:
   ```bash
   npm run build
   npm run start
   ```

## 📜 Giấy Phép & Tác Giả

Dự án được xây dựng với mục tiêu phổ biến các kiến thức thần học tâm linh tại Việt Nam một cách học thuật và chỉnh chu nhất. Bản quyền nội dung bài viết thuộc về các tác giả liên quan.
