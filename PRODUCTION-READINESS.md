# Production readiness

## Kiến trúc hiện tại

- Frontend React/Vite nằm trong repository này.
- Backend TypeScript/Fastify nằm ở thư mục sibling `../congdoanldp-backend`.
- PostgreSQL lưu chương trình, đăng ký, hồ sơ, tài liệu, đề thi, câu hỏi, kết quả, tin tức, media, cấu hình, người dùng và audit log.
- Frontend gọi backend qua `VITE_API_URL`; môi trường local dùng Vite proxy `/api`.

## Luồng đã chạy bằng dữ liệu thật

- Danh sách/chi tiết chương trình và tin tức được đọc từ API.
- Đăng ký chương trình được validate và ghi PostgreSQL.
- Hồ sơ tải đủ ba tài liệu; server kiểm tra MIME/dung lượng và lưu dữ liệu tệp.
- Tra cứu bắt buộc khớp mã hồ sơ và số điện thoại.
- Ngân hàng đề/câu hỏi được đọc từ DB; bài thi được chấm và lưu phía server.
- CMS có đăng nhập JWT, dashboard, danh sách, chi tiết, cập nhật trạng thái, CRUD nội dung, media, cấu hình và audit log.
- Trình duyệt chỉ lưu visitor ID, token/mã phiên; không còn lưu bản ghi nghiệp vụ trong `localStorage`.

## Cấu hình triển khai

Frontend:

```env
VITE_API_URL=https://api.example.vn/api
```

Backend: sao chép `../congdoanldp-backend/.env.example`, đặt secret thực và chạy:

```bash
pnpm db:migrate
pnpm db:seed
pnpm start
```

## Khuyến nghị trước khi mở public

- Đổi mật khẩu quản trị seed và JWT secret trên môi trường production.
- Dùng HTTPS cho cả frontend/API và giới hạn `PUBLIC_APP_URL` đúng domain frontend.
- Bật backup PostgreSQL định kỳ và retention phù hợp.
- Với lưu lượng lớn, chuyển file hồ sơ/media sang object storage có quét malware; schema hiện lưu `BYTEA` vì đầu vào chỉ cung cấp PostgreSQL.
- Kết nối SMTP/SMS nếu cần gửi thông báo tự động.
