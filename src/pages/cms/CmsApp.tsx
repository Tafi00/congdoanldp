import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  CircleCheckBig,
  ClipboardCheck,
  FileQuestion,
  FileText,
  FolderOpen,
  GraduationCap,
  Image,
  LayoutDashboard,
  Menu,
  Newspaper,
  Plus,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Upload,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { assets } from "../../data/assets";
import { CustomSelect } from "../../components/ui/CustomSelect";
import "./CmsApp.css";
import "./CmsCorrections.css";

const nav = [
  ["/cms/dashboard", LayoutDashboard, "Tổng quan"],
  ["/cms/programs", BookOpen, "Chương trình"],
  ["/cms/registrations", UserCheck, "Đăng ký học"],
  ["/cms/applications", FolderOpen, "Hồ sơ"],
  ["/cms/exams", ClipboardCheck, "Thi thử"],
  ["/cms/news", Newspaper, "Tin tức"],
  ["/cms/media", Image, "Thư viện"],
  ["/cms/users", Users, "Người dùng"],
  ["/cms/settings", Settings, "Cấu hình"],
] as const;

const tableRows = {
  programs: [
    ["Nghiệp vụ công đoàn", "Công tác công đoàn", "06 tuần", "Đang tuyển"],
    ["Nghiệp vụ sư phạm", "Chuyên môn giáo dục", "08 tuần", "Đang tuyển"],
    ["Quản lý giáo dục", "Quản lý", "08 tuần", "Bản nháp"],
  ],
  registrations: [
    ["Đỗ Minh Anh", "0908 234 560", "Nghiệp vụ công đoàn", "Mới"],
    ["Nguyễn Hoàng Nam", "0912 885 234", "Quản lý giáo dục", "Đã liên hệ"],
    ["Lê Thị Thu", "0986 221 178", "Nghiệp vụ sư phạm", "Đã xác nhận"],
  ],
  applications: [
    ["CDGD-2026-001", "Trần Ngọc Hà", "Nghiệp vụ công đoàn", "Đang kiểm tra"],
    ["CDGD-2026-002", "Phạm Quốc Anh", "Quản lý giáo dục", "Chờ phê duyệt"],
    ["CDGD-2026-003", "Vũ Thanh Mai", "Nghiệp vụ sư phạm", "Đã duyệt"],
  ],
  exams: [
    ["Kiến thức nền tảng về tổ chức công đoàn", "20 câu", "30 phút", "Đang mở"],
    ["Phương pháp và kỹ năng sư phạm", "25 câu", "35 phút", "Đang mở"],
    ["Năng lực quản trị cơ sở giáo dục", "30 câu", "40 phút", "Bản nháp"],
  ],
  questions: [
    [
      "CĐ-001",
      "Vai trò trọng tâm của tổ chức công đoàn...",
      "Nghiệp vụ công đoàn",
      "Cơ bản",
    ],
    [
      "SP-014",
      "Nguyên tắc lựa chọn phương pháp giảng dạy...",
      "Nghiệp vụ sư phạm",
      "Trung bình",
    ],
    [
      "QL-008",
      "Nội dung cốt lõi của quản trị nhà trường...",
      "Quản lý giáo dục",
      "Nâng cao",
    ],
  ],
  news: [
    [
      "Thông báo tuyển sinh các chương trình bồi dưỡng năm 2026",
      "Tuyển sinh",
      "18/08/2026",
      "Đã đăng",
    ],
    [
      "Hướng dẫn nộp hồ sơ trực tuyến nhanh chóng",
      "Hướng dẫn",
      "15/08/2026",
      "Đã đăng",
    ],
    [
      "Không khí lớp bồi dưỡng nghiệp vụ công đoàn",
      "Hoạt động",
      "10/08/2026",
      "Bản nháp",
    ],
  ],
};

function Login() {
  return (
    <section className="cms-login">
      <div
        className="cms-login__visual"
        style={{ backgroundImage: `url(${assets.cmsLoginBackground})` }}
      >
        <div className="cms-login__brand">
          <img src={assets.logo} alt="Trường Công đoàn Giáo dục Việt Nam" />
          <h1>TRƯỜNG CÔNG ĐOÀN GIÁO DỤC VIỆT NAM</h1>
          <p>HỆ THỐNG QUẢN TRỊ NỘI DUNG</p>
        </div>
        <ul>
          <li>
            <GraduationCap />
            Quản lý chương trình
          </li>
          <li>
            <FolderOpen />
            Tiếp nhận hồ sơ
          </li>
          <li>
            <ClipboardCheck />
            Quản trị thi thử
          </li>
        </ul>
      </div>
      <div className="cms-login__right">
        <form>
          <h1>Đăng nhập CMS</h1>
          <p>Sử dụng tài khoản quản trị để tiếp tục.</p>
          <label>
            <span>Tên đăng nhập</span>
            <input type="text" placeholder="Nhập tên đăng nhập" />
          </label>
          <label>
            <span>Mật khẩu</span>
            <input type="password" placeholder="Nhập mật khẩu" />
          </label>
          <div className="cms-login__options">
            <label>
              <input type="checkbox" />
              Ghi nhớ đăng nhập
            </label>
            <a href="#">Quên mật khẩu?</a>
          </div>
          <a className="cms-login__button" href="/cms/dashboard">
            Đăng nhập
          </a>
        </form>
        <small className="cms-login__secure">
          <ShieldCheck />
          Khu vực dành cho người dùng được cấp quyền.
        </small>
      </div>
    </section>
  );
}

function CmsHeader({ title, onMenu }: { title: string; onMenu: () => void }) {
  return (
    <header className="cms-topbar">
      <button className="cms-menu" onClick={onMenu} aria-label="Mở menu">
        <Menu />
      </button>
      <div className="cms-breadcrumb">
        <b>CMS</b>
        <span>/</span>
        {title}
      </div>
      <label className="cms-global-search">
        <Search />
        <input placeholder="Tìm kiếm trong CMS" />
      </label>
      <div className="cms-topbar__actions">
        <button aria-label="Thông báo">
          <Bell size={20} />
          <i />
        </button>
        <div className="cms-user">
          <span>QT</span>
          <div>
            <b>Quản trị viên</b>
            <small>Administrator</small>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

function CmsSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  return (
    <aside className={`cms-sidebar ${open ? "is-open" : ""}`}>
      <div className="cms-brand">
        <img src={assets.logo} alt="" />
        <strong>VNEU CMS</strong>
        <button onClick={onClose}>
          <X />
        </button>
      </div>
      <nav aria-label="Điều hướng CMS">
        {nav.map(([href, Icon, label]) => (
          <a
            className={pathname.startsWith(href) ? "is-active" : ""}
            href={href}
            key={href}
          >
            <Icon size={19} />
            {label}
          </a>
        ))}
      </nav>
      <div className="cms-sidebar__footer">
        <ShieldCheck size={20} />
        <span>
          <b>Hệ thống an toàn</b>
          <small>Phiên bản 1.0</small>
        </span>
      </div>
    </aside>
  );
}

function PageActions({ editor = false }: { editor?: boolean }) {
  return (
    <div className="cms-page-actions">
      <button className="ghost">
        <Upload size={18} />
        Xuất dữ liệu
      </button>
      <button className="primary">
        {editor ? (
          <>
            <Save size={18} />
            Lưu thay đổi
          </>
        ) : (
          <>
            <Plus size={18} />
            Thêm mới
          </>
        )}
      </button>
    </div>
  );
}

function DataTable({ type }: { type: keyof typeof tableRows }) {
  const headings = {
    programs: ["Tên chương trình", "Nhóm", "Thời lượng", "Trạng thái"],
    registrations: ["Học viên", "Điện thoại", "Chương trình", "Trạng thái"],
    applications: ["Mã hồ sơ", "Người nộp", "Chương trình", "Trạng thái"],
    exams: ["Tên đề thi", "Số câu", "Thời gian", "Trạng thái"],
    questions: ["Mã câu", "Nội dung", "Chủ đề", "Độ khó"],
    news: ["Tiêu đề", "Danh mục", "Ngày đăng", "Trạng thái"],
  }[type];
  return (
    <div className="cms-table-card">
      <div className="cms-table-tools">
        <label>
          <Search size={18} />
          <input placeholder="Tìm kiếm..." />
        </label>
        <CustomSelect
          className="custom-select--compact"
          ariaLabel="Lọc trạng thái"
          defaultValue="all"
          options={[
            { value: "all", label: "Tất cả trạng thái" },
            { value: "active", label: "Đang hoạt động" },
            { value: "draft", label: "Bản nháp" },
          ]}
        />
      </div>
      <div className="cms-table-wrap">
        <table>
          <thead>
            <tr>
              {headings.map((x) => (
                <th key={x}>{x}</th>
              ))}
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {tableRows[type].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>
                    {j === 3 ? (
                      <span className={`cms-status cms-status--${i}`}>
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
                <td>
                  <a
                    href={
                      type === "applications"
                        ? "/cms/applications/CDGD-2026-001"
                        : type === "registrations"
                          ? "/cms/registrations/1"
                          : `/cms/${type}/edit`
                    }
                  >
                    Xem
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cms-pagination">
        <span>Hiển thị 1–3 trong 24 mục</span>
        <div>
          <button>‹</button>
          <button className="active">1</button>
          <button>2</button>
          <button>›</button>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <div className="cms-heading">
        <div>
          <p>Tổng quan hoạt động hôm nay</p>
          <h2>Xin chào, Quản trị viên</h2>
        </div>
        <CustomSelect
          className="custom-select--compact"
          ariaLabel="Khoảng thời gian"
          defaultValue="30"
          options={[
            { value: "7", label: "7 ngày gần nhất" },
            { value: "30", label: "30 ngày gần nhất" },
            { value: "90", label: "90 ngày gần nhất" },
          ]}
        />
      </div>
      <div className="cms-stats">
        {[
          [Users, "128", "Đăng ký mới", "+12%"],
          [FolderOpen, "46", "Hồ sơ đang xử lý", "+8%"],
          [ClipboardCheck, "1.284", "Lượt thi thử", "+18%"],
          [Newspaper, "24", "Bài viết", "+3"],
        ].map(([I, n, l, c]) => {
          const Icon = I as typeof Users;
          return (
            <article key={l as string}>
              <span>
                <Icon size={23} />
              </span>
              <div>
                <small>{l as string}</small>
                <strong>{n as string}</strong>
                <b>{c as string}</b>
              </div>
            </article>
          );
        })}
      </div>
      <div className="cms-dashboard-grid">
        <section className="cms-panel cms-chart">
          <header>
            <div>
              <h3>Lượt đăng ký</h3>
              <p>6 tháng gần nhất</p>
            </div>
            <Activity size={20} />
          </header>
          <div className="fake-chart">
            {[45, 68, 54, 82, 73, 96, 78, 102, 91, 124, 112, 138].map(
              (h, i) => (
                <i key={i} style={{ height: `${h}px` }} />
              ),
            )}
          </div>
          <div className="chart-labels">
            <span>Tháng 3</span>
            <span>Tháng 4</span>
            <span>Tháng 5</span>
            <span>Tháng 6</span>
            <span>Tháng 7</span>
            <span>Tháng 8</span>
          </div>
        </section>
        <section className="cms-panel">
          <header>
            <div>
              <h3>Hồ sơ theo trạng thái</h3>
              <p>Cập nhật theo thời gian thực</p>
            </div>
          </header>
          <div className="donut-wrap">
            <div className="fake-donut">
              <strong>326</strong>
              <small>Tổng hồ sơ</small>
            </div>
            <ul>
              <li>
                <i />
                Đã duyệt <b>58%</b>
              </li>
              <li>
                <i />
                Đang xử lý <b>27%</b>
              </li>
              <li>
                <i />
                Cần bổ sung <b>15%</b>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <section className="cms-panel cms-recent">
        <header>
          <div>
            <h3>Hoạt động gần đây</h3>
            <p>Các cập nhật mới trên hệ thống</p>
          </div>
          <a href="/cms/applications">Xem tất cả</a>
        </header>
        {[
          [CircleCheckBig, "Hồ sơ CDGD-2026-003 đã được duyệt", "2 phút trước"],
          [UserCheck, "Có đăng ký mới từ Đỗ Minh Anh", "18 phút trước"],
          [FileText, "Bài viết tuyển sinh đã được cập nhật", "1 giờ trước"],
        ].map(([I, t, time]) => {
          const Icon = I as typeof CircleCheckBig;
          return (
            <div className="activity-row" key={t as string}>
              <span>
                <Icon size={19} />
              </span>
              <p>
                <b>{t as string}</b>
                <small>{time as string}</small>
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}

const listStats = {
  programs: [
    [BookOpen, "03", "Tổng chương trình"],
    [Users, "03", "Đang tuyển sinh"],
    [FileText, "00", "Bản nháp"],
  ],
  registrations: [
    [Users, "42", "Tổng đăng ký"],
    [UserCheck, "12", "Đăng ký mới"],
    [CircleCheckBig, "18", "Đã xác nhận"],
  ],
  applications: [
    [FolderOpen, "46", "Tổng hồ sơ"],
    [FileText, "12", "Đang tiếp nhận"],
    [CircleCheckBig, "18", "Hoàn tất"],
  ],
  exams: [
    [ClipboardCheck, "06", "Tổng đề thi"],
    [CircleCheckBig, "04", "Đang mở"],
    [BarChart3, "1.284", "Lượt làm bài"],
  ],
  questions: [
    [FileQuestion, "128", "Tổng câu hỏi"],
    [BookOpen, "03", "Chủ đề"],
    [CircleCheckBig, "96", "Đang sử dụng"],
  ],
  news: [
    [Newspaper, "24", "Tổng bài viết"],
    [CircleCheckBig, "18", "Đã đăng"],
    [FileText, "06", "Bản nháp"],
  ],
} as const;
function ListPage({
  type,
  title,
  description,
}: {
  type: keyof typeof tableRows;
  title: string;
  description: string;
}) {
  return (
    <>
      <div className="cms-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <PageActions />
      </div>
      <div className="cms-stats cms-stats--three">
        {listStats[type].map(([I, n, l]) => {
          const Icon = I;
          return (
            <article key={l}>
              <span>
                <Icon />
              </span>
              <div>
                <small>{l}</small>
                <strong>{n}</strong>
              </div>
            </article>
          );
        })}
      </div>
      <DataTable type={type} />
    </>
  );
}

function EditorPage({ kind }: { kind: "program" | "exam" | "news" }) {
  const labels = {
    program: ["Chỉnh sửa chương trình", "Nghiệp vụ công đoàn"],
    exam: ["Chỉnh sửa đề thi", "Kiến thức nền tảng về tổ chức công đoàn"],
    news: ["Soạn thảo bài viết", "Không khí lớp bồi dưỡng nghiệp vụ công đoàn"],
  }[kind];
  return (
    <>
      <div className="cms-heading">
        <div>
          <p>Cập nhật nội dung và cấu hình</p>
          <h2>{labels[0]}</h2>
        </div>
        <PageActions editor />
      </div>
      <div className="cms-editor-layout">
        <form className="cms-panel cms-editor">
          <label>
            <span>Tiêu đề</span>
            <input defaultValue={labels[1]} />
          </label>
          <div className="cms-form-grid">
            <label>
              <span>Danh mục</span>
              <CustomSelect
                className="custom-select--full"
                defaultValue="union"
                options={[
                  { value: "union", label: "Công tác công đoàn" },
                  { value: "education", label: "Chuyên môn giáo dục" },
                  { value: "management", label: "Quản lý giáo dục" },
                ]}
              />
            </label>
            <label>
              <span>Trạng thái</span>
              <CustomSelect
                className="custom-select--full"
                defaultValue="active"
                options={[
                  { value: "active", label: "Đang hoạt động" },
                  { value: "draft", label: "Bản nháp" },
                  { value: "closed", label: "Đã đóng" },
                ]}
              />
            </label>
          </div>
          <label>
            <span>Mô tả ngắn</span>
            <textarea
              rows={3}
              defaultValue="Nội dung thực tiễn, được thiết kế phù hợp với nhu cầu của đội ngũ cán bộ và giáo viên."
            />
          </label>
          <label>
            <span>Nội dung chi tiết</span>
            <div className="editor-toolbar">
              <button type="button">
                <b>B</b>
              </button>
              <button type="button">
                <i>I</i>
              </button>
              <button type="button">☷</button>
              <button type="button">🔗</button>
            </div>
            <textarea
              className="rich-editor"
              rows={12}
              defaultValue="Nhập nội dung chi tiết tại đây..."
            />
          </label>
        </form>
        <aside className="cms-panel cms-publish">
          <h3>Xuất bản</h3>
          <div>
            <span>Trạng thái</span>
            <b>Đang hoạt động</b>
          </div>
          <div>
            <span>Cập nhật lần cuối</span>
            <b>20/08/2026</b>
          </div>
          <button className="primary">
            <Save size={17} />
            Lưu thay đổi
          </button>
          <button className="danger">Xóa nội dung</button>
        </aside>
      </div>
    </>
  );
}

function DetailPage({ application = false }: { application?: boolean }) {
  return (
    <>
      <div className="cms-heading">
        <div>
          <p>{application ? "Mã hồ sơ CDGD-2026-001" : "Đăng ký #REG-0248"}</p>
          <h2>{application ? "Kiểm duyệt hồ sơ" : "Chi tiết đăng ký học"}</h2>
        </div>
        <div className="cms-page-actions">
          <button className="ghost">Từ chối</button>
          <button className="primary">
            <Check size={18} />
            {application ? "Phê duyệt hồ sơ" : "Xác nhận đăng ký"}
          </button>
        </div>
      </div>
      <div className="cms-detail-grid">
        <section className="cms-panel">
          <h3>Thông tin người đăng ký</h3>
          <dl className="cms-detail-list">
            <div>
              <dt>Họ và tên</dt>
              <dd>Trần Ngọc Hà</dd>
            </div>
            <div>
              <dt>Số điện thoại</dt>
              <dd>0908 234 560</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>ngocha@example.com</dd>
            </div>
            <div>
              <dt>Đơn vị công tác</dt>
              <dd>Công đoàn Giáo dục TP. Hồ Chí Minh</dd>
            </div>
            <div>
              <dt>Chương trình</dt>
              <dd>Nghiệp vụ công đoàn</dd>
            </div>
          </dl>
        </section>
        <aside className="cms-panel">
          <h3>{application ? "Tài liệu hồ sơ" : "Lịch sử xử lý"}</h3>
          {application ? (
            <div className="cms-files">
              {["Phiếu đăng ký.pdf", "CCCD.pdf", "Văn bằng.jpg"].map((x) => (
                <a key={x} href="#">
                  <FileText size={20} />
                  <span>
                    <b>{x}</b>
                    <small>Đã tải lên</small>
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="cms-timeline">
              <p>
                <i />
                Đã tiếp nhận đăng ký<small>20/08/2026 · 08:30</small>
              </p>
              <p>
                <i />
                Đã gọi tư vấn<small>20/08/2026 · 14:15</small>
              </p>
            </div>
          )}
          <label className="cms-note">
            <span>Ghi chú nội bộ</span>
            <textarea rows={5} placeholder="Thêm ghi chú..." />
          </label>
        </aside>
      </div>
    </>
  );
}

function Results() {
  return (
    <>
      <div className="cms-heading">
        <div>
          <p>Phân tích hiệu quả luyện tập</p>
          <h2>Báo cáo kết quả thi thử</h2>
        </div>
        <PageActions />
      </div>
      <div className="cms-stats cms-stats--three">
        <article>
          <span>
            <Users />
          </span>
          <div>
            <small>Lượt làm bài</small>
            <strong>1.284</strong>
            <b>+18%</b>
          </div>
        </article>
        <article>
          <span>
            <BarChart3 />
          </span>
          <div>
            <small>Điểm trung bình</small>
            <strong>7.6</strong>
            <b>+0.4</b>
          </div>
        </article>
        <article>
          <span>
            <CircleCheckBig />
          </span>
          <div>
            <small>Tỷ lệ đạt</small>
            <strong>82%</strong>
            <b>+6%</b>
          </div>
        </article>
      </div>
      <section className="cms-panel cms-result-chart">
        <h3>Phân bố điểm số</h3>
        <div className="horizontal-bars">
          {[
            ["Dưới 5", 18],
            ["5–6.5", 42],
            ["6.5–8", 76],
            ["8–9", 58],
            ["9–10", 31],
          ].map(([l, v]) => (
            <div key={l as string}>
              <span>{l as string}</span>
              <i>
                <b style={{ width: `${v}%` }} />
              </i>
              <strong>{v as number}%</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Media() {
  const media = [
    assets.newsFeatureEnrollment,
    assets.newsOnlineApplication,
    assets.trainingClassroom,
    assets.newsEducationContent,
    assets.heroEducators,
    assets.applicationLookupIllustration,
  ];
  return (
    <>
      <div className="cms-heading">
        <div>
          <p>Quản lý ảnh và tài nguyên website</p>
          <h2>Thư viện media</h2>
        </div>
        <div className="cms-page-actions">
          <button className="primary">
            <Upload size={18} />
            Tải tệp lên
          </button>
        </div>
      </div>
      <div className="cms-media-toolbar">
        <label>
          <Search size={18} />
          <input placeholder="Tìm tệp..." />
        </label>
        <CustomSelect
          className="custom-select--compact"
          ariaLabel="Lọc định dạng"
          defaultValue="all"
          options={[
            { value: "all", label: "Tất cả định dạng" },
            { value: "webp", label: "WebP" },
            { value: "png", label: "PNG" },
            { value: "jpg", label: "JPG" },
          ]}
        />
      </div>
      <div className="media-grid">
        {media.map((src, i) => (
          <article key={src}>
            <img src={src} alt="" />
            <div>
              <b>asset-{i + 1}.webp</b>
              <small>WebP · đã tối ưu</small>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function UsersPage() {
  return (
    <>
      <div className="cms-heading">
        <div>
          <p>Quản lý tài khoản và quyền truy cập</p>
          <h2>Người dùng & phân quyền</h2>
        </div>
        <PageActions />
      </div>
      <div className="user-grid">
        {[
          ["QT", "Nguyễn Minh Quản", "admin@vneu.edu.vn", "Quản trị viên"],
          ["BT", "Lê Thanh Bình", "bientap@vneu.edu.vn", "Biên tập viên"],
          ["TS", "Phạm Thu Sơn", "tuyensinh@vneu.edu.vn", "Tuyển sinh"],
        ].map(([av, n, e, r]) => (
          <article className="cms-panel" key={e}>
            <span>{av}</span>
            <h3>{n}</h3>
            <p>{e}</p>
            <b>{r}</b>
            <button>Chỉnh sửa quyền</button>
          </article>
        ))}
      </div>
    </>
  );
}

function SettingsPage() {
  return (
    <>
      <div className="cms-heading">
        <div>
          <p>Thông tin đơn vị và cấu hình chung</p>
          <h2>Cài đặt hệ thống</h2>
        </div>
        <PageActions editor />
      </div>
      <form className="cms-panel settings-form">
        <h3>Thông tin đơn vị</h3>
        <div className="cms-form-grid">
          <label>
            <span>Tên đơn vị</span>
            <input defaultValue="Trường Công đoàn Giáo dục Việt Nam" />
          </label>
          <label>
            <span>Mã số thuế</span>
            <input defaultValue="0301453684" />
          </label>
          <label>
            <span>Số điện thoại</span>
            <input defaultValue="(028) 3932 0085" />
          </label>
          <label>
            <span>Email</span>
            <input defaultValue="contact@congdoangiaoduc.edu.vn" />
          </label>
        </div>
        <label>
          <span>Địa chỉ</span>
          <textarea
            rows={3}
            defaultValue="205 Võ Thị Sáu, Phường Xuân Hoà, Thành phố Hồ Chí Minh, Việt Nam"
          />
        </label>
        <h3>Cấu hình thông báo</h3>
        {[
          "Thông báo khi có đăng ký mới",
          "Thông báo khi có hồ sơ mới",
          "Gửi báo cáo tổng hợp hàng tuần",
        ].map((x, i) => (
          <label className="toggle-row" key={x}>
            <span>{x}</span>
            <input type="checkbox" defaultChecked={i < 2} />
          </label>
        ))}
      </form>
    </>
  );
}

function WebsiteContent() {
  const blocks = [
    ["01", "Navbar & Hero", "Đang hiển thị"],
    ["02", "Giới thiệu & chương trình", "Đang hiển thị"],
    ["03", "Đăng ký chương trình", "Đang hiển thị"],
    ["04", "Nộp hồ sơ trực tuyến", "Đang hiển thị"],
    ["05", "Thi thử", "Đang hiển thị"],
    ["06", "CTA & Footer", "Đang hiển thị"],
  ];
  return (
    <>
      <div className="cms-heading">
        <div>
          <p>Điều chỉnh nội dung landing page</p>
          <h2>Quản trị nội dung website</h2>
        </div>
        <PageActions editor />
      </div>
      <div className="content-blocks">
        {blocks.map(([n, t, s]) => (
          <article className="cms-panel" key={n}>
            <span className="drag">⋮⋮</span>
            <strong>{n}</strong>
            <div>
              <h3>{t}</h3>
              <p>{s}</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <i />
            </label>
            <button>Chỉnh sửa</button>
          </article>
        ))}
      </div>
    </>
  );
}

function getView(path: string) {
  if (path === "/cms/dashboard" || path === "/cms/")
    return ["Tổng quan", <Dashboard />] as const;
  if (path.includes("programs/edit"))
    return ["Chương trình", <EditorPage kind="program" />] as const;
  if (path === "/cms/programs")
    return [
      "Chương trình",
      <ListPage
        type="programs"
        title="Danh sách chương trình"
        description="Quản lý chương trình đào tạo và tuyển sinh"
      />,
    ] as const;
  if (path.match(/registrations\/.+/))
    return ["Đăng ký học", <DetailPage />] as const;
  if (path === "/cms/registrations")
    return [
      "Đăng ký học",
      <ListPage
        type="registrations"
        title="Danh sách đăng ký"
        description="Theo dõi và tư vấn học viên quan tâm"
      />,
    ] as const;
  if (path.match(/applications\/.+/))
    return ["Hồ sơ", <DetailPage application />] as const;
  if (path === "/cms/applications")
    return [
      "Hồ sơ",
      <ListPage
        type="applications"
        title="Danh sách hồ sơ"
        description="Tiếp nhận và kiểm duyệt hồ sơ trực tuyến"
      />,
    ] as const;
  if (path.includes("exams/edit"))
    return ["Đề thi", <EditorPage kind="exam" />] as const;
  if (path === "/cms/exams")
    return [
      "Đề thi",
      <ListPage
        type="exams"
        title="Danh sách đề thi"
        description="Quản lý cấu trúc và thời gian làm bài"
      />,
    ] as const;
  if (path === "/cms/questions")
    return [
      "Câu hỏi",
      <ListPage
        type="questions"
        title="Ngân hàng câu hỏi"
        description="Tổ chức câu hỏi theo chủ đề và độ khó"
      />,
    ] as const;
  if (path === "/cms/exam-results")
    return ["Kết quả thi", <Results />] as const;
  if (path.includes("news/edit"))
    return ["Bài viết", <EditorPage kind="news" />] as const;
  if (path === "/cms/news")
    return [
      "Bài viết",
      <ListPage
        type="news"
        title="Danh sách bài viết"
        description="Quản lý tin tức và nội dung chuyên môn"
      />,
    ] as const;
  if (path === "/cms/media") return ["Thư viện", <Media />] as const;
  if (path === "/cms/users") return ["Người dùng", <UsersPage />] as const;
  if (path === "/cms/settings") return ["Cài đặt", <SettingsPage />] as const;
  if (path === "/cms/website-content")
    return ["Nội dung website", <WebsiteContent />] as const;
  return ["Tổng quan", <Dashboard />] as const;
}

export function CmsApp() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const view = useMemo(() => getView(pathname), [pathname]);
  if (pathname === "/cms" || pathname === "/cms/login") return <Login />;
  return (
    <div className="cms-shell">
      <CmsSidebar open={menu} onClose={() => setMenu(false)} />
      <div className="cms-main">
        <CmsHeader title={view[0]} onMenu={() => setMenu(true)} />
        <div className="cms-content">{view[1]}</div>
      </div>
      {menu && (
        <button
          className="cms-backdrop"
          aria-label="Đóng menu"
          onClick={() => setMenu(false)}
        />
      )}
    </div>
  );
}
