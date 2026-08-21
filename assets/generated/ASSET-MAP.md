# Bản đồ asset website

Bộ này được tạo bằng built-in `imagegen`, tách riêng khỏi typography, logo và UI. Logo chính thức tiếp tục dùng file `logo.jpg`; không tái tạo logo bằng AI.

## Bộ nhẹ dùng cho production

Website dùng trực tiếp các file WebP trong `optimized/`. Bộ production gồm 14 asset và một bản WebP của logo, tổng khoảng **0,78 MB**. Các bản PNG trung gian đã được xóa trước khi triển khai.

- Background: `optimized/backgrounds/*.webp`
- Illustration có alpha: `optimized/illustrations/*.webp`
- Ảnh tin tức: `optimized/photos/*.webp`
- Logo nhẹ: `optimized/logo.webp`

## Danh mục file

### Illustration nền trong suốt

| File | Kích thước mới (Upscaled) | Alpha | Công dụng |
| --- | ---: | :---: | --- |
| `optimized/illustrations/hero-educators-cutout.webp` | 2047×1364 (Super-sampled) | Có | Cụm 4 cán bộ/giáo viên + laptop + mặt bàn; đặt trên nền hero hoặc trang giới thiệu. |
| `optimized/illustrations/application-lookup-illustration.webp` | 1671×1671 (Super-sampled) | Có | Minh họa hồ sơ + kính lúp cho màn tra cứu hồ sơ. |
| `optimized/illustrations/brand-swoosh-decoration.webp` | 1364×2047 (Super-sampled) | Có | Dải nhận diện xanh–cyan–vàng dùng như lớp trang trí độc lập ở góc card/banner. |

### Background không chữ

| File | Kích thước mới (Upscaled) | Công dụng |
| --- | ---: | --- |
| `optimized/backgrounds/hero-background.webp` | 2090×1176 (2K Ultra-wide) | Hero trang chủ và hero trang giới thiệu; vùng trái đã chừa sạch cho nội dung. |
| `optimized/backgrounds/page-header-background.webp` | 2427×1011 (2K Ultra-wide) | Header dùng chung cho trang chương trình, hồ sơ, thi thử và tin tức. |
| `optimized/backgrounds/light-section-background.webp` | 2090×1176 (2K Ultra-wide) | Section sáng: giới thiệu, nộp hồ sơ, thi thử và các màn xác nhận. |
| `optimized/backgrounds/registration-section-background.webp` | 2090×1176 (2K Ultra-wide) | Section đăng ký chương trình màu xanh đậm. |
| `optimized/backgrounds/cta-banner-background.webp` | 2427×1011 (2K Ultra-wide) | CTA ngang; bo góc bằng CSS, không bo sẵn trong ảnh. |
| `optimized/backgrounds/footer-background.webp` | 2217×1108 (2K Ultra-wide) | Footer xanh navy; vùng giữa đủ tối để đặt chữ trắng. |
| `optimized/backgrounds/cms-login-background.webp` | 1213×2023 (2K Hi-DPI) | Nửa trái màn đăng nhập CMS; đặt logo và nội dung bằng HTML. |

### Ảnh nội dung không chữ

| File | Kích thước mới (Upscaled) | Công dụng |
| --- | ---: | --- |
| `optimized/photos/news-feature-enrollment.webp` | 2228×1254 (2K Crisp) | Tin nổi bật tuyển sinh/hoạt động tư vấn. |
| `optimized/photos/news-online-application.webp` | 2047×1364 (2K Crisp) | Tin hướng dẫn nộp hồ sơ trực tuyến. |
| `optimized/photos/training-classroom.webp` | 2228×1254 (2K Crisp) | Card hoạt động bồi dưỡng và ảnh chính bài chi tiết; có vùng crop an toàn. |
| `optimized/photos/news-education-content.webp` | 2047×1364 (2K Crisp) | Tin cập nhật nội dung chuyên môn giáo dục. |

## Ánh xạ đủ 20 màn public

| Màn | Asset dùng | Icon dựng bằng thư viện |
| --- | --- | --- |
| 01 Navbar + Hero | `hero-background.webp` + `hero-educators-cutout.webp`; logo dùng `logo.webp` | `Users`, `ArrowRight` |
| 02 Giới thiệu + chương trình | `light-section-background.webp`; có thể thêm `brand-swoosh-decoration.webp` ở góc card | `Target`, `MapPin`, `MonitorUp`, `Users`, `BookOpen`, `GraduationCap` |
| 03 Đăng ký nhanh | `registration-section-background.webp` | `CheckCircle2`, `LockKeyhole`, `ChevronRight` |
| 04 Nộp hồ sơ trực tuyến | `light-section-background.webp` | `ContactRound`, `CloudUpload`, `Bell`, `FileText`, `LockKeyhole` |
| 05 Giới thiệu thi thử | `light-section-background.webp` | `Timer`, `BookOpenCheck`, `BarChart3`, `GraduationCap` |
| 06 CTA + Footer | `cta-banner-background.webp` + `footer-background.webp`; logo dùng `logo.webp` | `GraduationCap`, `FileText`, `MapPin`, `ArrowRight` |
| 07 Chi tiết chương trình | `page-header-background.webp` | `Users`, `MonitorUp`, `BookOpen`, `Target`, `CheckCircle2` |
| 08 Ngân hàng đề | `page-header-background.webp` | `Search`, `Users`, `BookOpen`, `GraduationCap`, `Clock3`, `BarChart3` |
| 09 Làm bài thi | Không cần raster riêng; nền phẳng/CSS | `Clock3`, `LogOut`, `Bookmark`, `CheckCircle2`, `AlertTriangle` |
| 10 Kết quả thi thử | Không cần raster riêng; nền phẳng/CSS | `CircleCheckBig`, `CircleX`, `Clock3` |
| 11 Đăng ký chương trình | `page-header-background.webp` + `light-section-background.webp` | `BookOpen`, `Users`, `MonitorUp`, `CheckCircle2` |
| 12 Nộp hồ sơ | `page-header-background.webp` + `light-section-background.webp` | `FileText`, `CloudUpload`, `CircleCheckBig`, `LockKeyhole` |
| 13 Theo dõi hồ sơ | `page-header-background.webp` + `light-section-background.webp` | `CircleCheckBig`, `FileText`, `Landmark`, `Search`, `Flag`, `FolderOpen` |
| 14 Giới thiệu | `hero-background.webp` + `hero-educators-cutout.webp` | `GraduationCap`, `Users`, `FileText`, `MapPin` |
| 15 Danh sách chương trình | `page-header-background.webp` | `Search`, `SlidersHorizontal`, `Users`, `BookOpen`, `GraduationCap`, `MonitorUp` |
| 16 Đăng ký thành công | `page-header-background.webp` + `light-section-background.webp` | `CircleCheckBig`, `BookOpen`, `CloudUpload`, `House` |
| 17 Tra cứu hồ sơ | `page-header-background.webp` + `application-lookup-illustration.webp` | `Search`, `LockKeyhole`, `FilePlus2` |
| 18 Xem lại đáp án | Không cần raster riêng; nền phẳng/CSS | `CircleCheckBig`, `CircleX`, `Info`, `ArrowLeft`, `ArrowRight` |
| 19 Danh sách tin | `page-header-background.webp`, `news-feature-enrollment.webp`, `news-online-application.webp`, `training-classroom.webp`, `news-education-content.webp` | `Search`, `ArrowRight` |
| 20 Chi tiết tin | `page-header-background.webp` + `training-classroom.webp`; CTA cuối bài có thể dùng `cta-banner-background.webp` | `MonitorUp`, `Users`, `BookOpen`, `ArrowRight` |

## Ánh xạ CMS

- `cms/01-cms-login.png`: dùng `optimized/backgrounds/cms-login-background.webp`; logo dùng `optimized/logo.webp`; toàn bộ icon chức năng dùng thư viện.
- `cms/02` đến `cms/18`: không cần illustration riêng. Thumbnail thư viện/tin tức lấy từ bốn file trong `photos/`; sidebar, thống kê, trạng thái, biểu đồ nhỏ và toolbar dùng icon/SVG/CSS.
- Màn thư viện media có thể tải trực tiếp toàn bộ file trong thư mục này; không dùng ảnh mockup có chữ làm asset nội dung.

## Gợi ý triển khai

- Background: `background-size: cover; background-position: center;`.
- `hero-background.webp`: ưu tiên `background-position: center right`; đặt cutout ở cột phải bằng `object-fit: contain; object-position: right bottom`.
- `page-header-background.webp`: với màn thấp dùng `background-position: center 42%` để giữ dải nhận diện ở bên phải.
- Ảnh tin: dùng `object-fit: cover`; `training-classroom.webp` nên giữ `object-position: 55% center`.
- Illustration alpha dùng trực tiếp WebP trong `optimized/`; cả ba file đã được kiểm tra giữ đầy đủ vùng trong suốt và vùng hiển thị.
- Các icon liệt kê trong bảng nên lấy cùng một họ, ưu tiên Lucide hoặc Phosphor, stroke 1.75–2 px, không raster hóa.
