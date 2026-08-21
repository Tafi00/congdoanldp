# Production readiness

## Đã hoàn thiện trong frontend

- Đăng ký chương trình có validation, sinh mã và hiển thị đúng dữ liệu đã nhập.
- Nộp hồ sơ bắt đầu từ trạng thái trống, kiểm tra loại tệp/số lượng/kích thước và sinh mã hồ sơ.
- Tra cứu xác minh đồng thời mã hồ sơ và số điện thoại.
- Thi thử có ngân hàng câu hỏi theo từng đề, đồng hồ, chấm điểm và xem lại đáp án theo bài làm.
- Tìm kiếm, lọc, sắp xếp, phân trang và các route public hoạt động.
- Route không hợp lệ có empty/error state thay vì hiển thị dữ liệu mẫu.

## Bắt buộc trước khi vận hành đa người dùng

- API và cơ sở dữ liệu cho đăng ký, hồ sơ, trạng thái xử lý và kết quả thi.
- Object storage và cơ chế quét tệp cho tài liệu tải lên.
- Xác thực, phân quyền và audit log cho CMS.
- Kết nối email/SMS để gửi mã và thông báo trạng thái.
- Nội dung pháp lý chính thức được đơn vị phụ trách phê duyệt.

Trong kiến trúc Vite hiện tại, dữ liệu hành trình public được lưu cục bộ trong
`localStorage` của trình duyệt để các luồng hoạt động xuyên trang. Dữ liệu này
không đồng bộ giữa thiết bị và không thay thế backend production.
