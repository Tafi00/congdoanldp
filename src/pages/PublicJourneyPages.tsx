import { useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  CircleCheckBig,
  CloudUpload,
  FileText,
  Flag,
  FolderOpen,
  GraduationCap,
  Home,
  Info,
  Landmark,
  LockKeyhole,
  MapPin,
  MonitorUp,
  Search,
  UserRound,
  Users,
} from "lucide-react";
import { PageHero } from "../components/layout/PageHero";
import { Button } from "../components/ui/Button";
import { CustomSelect } from "../components/ui/CustomSelect";
import { assets } from "../data/assets";
import "./PublicJourneyPages.css";

const programs = [
  {
    slug: "nghiep-vu-cong-doan",
    icon: Users,
    title: "Nghiệp vụ công đoàn",
    text: "Bồi dưỡng kỹ năng tổ chức, quản lý và hoạt động công đoàn.",
  },
  {
    slug: "nghiep-vu-su-pham",
    icon: BookOpen,
    title: "Nghiệp vụ sư phạm",
    text: "Cập nhật phương pháp giảng dạy và năng lực nghề nghiệp.",
  },
  {
    slug: "quan-ly-giao-duc",
    icon: GraduationCap,
    title: "Quản lý giáo dục",
    text: "Nâng cao năng lực quản trị cho cán bộ quản lý giáo dục.",
  },
];

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`mock-field ${className}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Steps({
  active = 1,
  complete = false,
}: {
  active?: number;
  complete?: boolean;
}) {
  return (
    <div className={`mock-steps ${complete ? "is-complete" : ""}`}>
      {[
        [1, "Chương trình"],
        [2, "Thông tin cá nhân"],
        [3, "Xác nhận"],
      ].map(([n, label], i) => (
        <div className={complete || n === active ? "active" : ""} key={label}>
          <strong>{String(n).padStart(2, "0")}</strong>
          <span>{label}</span>
          {i < 2 && <i />}
        </div>
      ))}
    </div>
  );
}

export function ProgramsPage() {
  const [query, setQuery] = useState("");
  const shown = programs.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHero
        eyebrow="Chương trình đào tạo"
        title="Chọn chương trình phù hợp với nhu cầu phát triển"
        description="Khám phá các chương trình bồi dưỡng dành cho cán bộ công đoàn, giáo viên và cán bộ quản lý giáo dục."
        current="Chương trình"
      />
      <section className="program-list-section">
        <div className="container">
          <div className="program-filter">
            <label>
              <Search size={19} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm chương trình"
              />
            </label>
            <nav>
              <button className="active">Tất cả</button>
              <button>Công đoàn</button>
              <button>Sư phạm</button>
              <button>Quản lý giáo dục</button>
            </nav>
            <CustomSelect
              className="custom-select--compact"
              ariaLabel="Sắp xếp chương trình"
              defaultValue="newest"
              options={[
                { value: "newest", label: "Mới nhất" },
                { value: "popular", label: "Phổ biến nhất" },
                { value: "name", label: "Theo tên A–Z" },
              ]}
            />
          </div>
          <div className="program-list-grid">
            {shown.map(({ icon: Icon, ...p }) => (
              <article key={p.slug}>
                <div className="program-list-card__head">
                  <span>
                    <Icon size={31} />
                  </span>
                  <div>
                    <small>Đang tuyển sinh</small>
                    <h2>{p.title}</h2>
                    <p>{p.text}</p>
                  </div>
                </div>
                <dl>
                  <div>
                    <dt>
                      <UserRound size={18} />
                      Đối tượng
                    </dt>
                    <dd>Cán bộ, viên chức ngành giáo dục</dd>
                  </div>
                  <div>
                    <dt>
                      <MonitorUp size={18} />
                      Hình thức
                    </dt>
                    <dd>Trực tuyến & trực tiếp</dd>
                  </div>
                </dl>
                <div className="program-list-card__actions">
                  <a href={`/chuong-trinh/${p.slug}`}>Xem chi tiết</a>
                  <a href="/dang-ky">Đăng ký</a>
                </div>
              </article>
            ))}
          </div>
          <div className="mock-pagination">
            <button className="active">01</button>
            <button>02</button>
            <button>
              Tiếp theo <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export function ProgramDetailPage() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug) || programs[0];
  return (
    <>
      <section
        className="program-detail-hero"
        style={{ backgroundImage: `url(${assets.pageHeaderBackground})` }}
      >
        <div className="container">
          <nav className="detail-crumbs">
            <a href="/">Trang chủ</a>
            <span>/</span>
            <a href="/chuong-trinh">Chương trình</a>
            <span>/</span>
            <b>{program.title}</b>
          </nav>
          <div className="program-detail-hero__layout">
            <div>
              <span className="status-pill">
                <Users size={18} />
                Đang tuyển sinh
              </span>
              <h1 className="heading-1">{program.title}</h1>
              <p className="lead">
                Bồi dưỡng kiến thức và kỹ năng tổ chức, quản lý, triển khai hoạt
                động công đoàn trong ngành giáo dục.
              </p>
              <dl className="detail-meta">
                <div>
                  <dt>
                    <Users />
                  </dt>
                  <dd>
                    <b>Đối tượng</b>Cán bộ công đoàn, viên chức ngành giáo dục
                  </dd>
                </div>
                <div>
                  <dt>
                    <MonitorUp />
                  </dt>
                  <dd>
                    <b>Hình thức</b>Trực tuyến & trực tiếp
                  </dd>
                </div>
              </dl>
            </div>
            <aside className="detail-register-card">
              <h2>Đăng ký chương trình</h2>
              {[
                "Tư vấn lộ trình phù hợp",
                "Hỗ trợ hoàn thiện hồ sơ",
                "Thông báo lịch học qua hệ thống",
              ].map((x) => (
                <p key={x}>
                  <Check />
                  {x}
                </p>
              ))}
              <a href="/dang-ky">Đăng ký ngay</a>
              <a href="/nop-ho-so">Nộp hồ sơ trực tuyến</a>
            </aside>
          </div>
        </div>
      </section>
      <section className="program-detail-body">
        <div className="container">
          <nav className="detail-tabs">
            <button className="active">Tổng quan</button>
            <button>Nội dung</button>
            <button>Đối tượng</button>
            <button>Cách đăng ký</button>
          </nav>
          <div className="detail-overview-grid">
            <article>
              <span>
                <BookOpen size={34} />
              </span>
              <div>
                <h2>Tổng quan</h2>
                <p>
                  Chương trình tập trung vào năng lực thực hành, giúp học viên
                  vận dụng hiệu quả nghiệp vụ công đoàn trong môi trường giáo
                  dục.
                </p>
              </div>
            </article>
            <article>
              <h2>Nội dung bồi dưỡng</h2>
              {[
                "Vai trò và chức năng công đoàn",
                "Tổ chức hoạt động công đoàn",
                "Kỹ năng đại diện và hỗ trợ",
                "Quản lý theo ngành",
              ].map((x) => (
                <p key={x}>
                  <span>
                    <GraduationCap size={20} />
                    {x}
                  </span>
                  <ArrowRight size={17} />
                </p>
              ))}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export function ProgramRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Đăng ký học"
        title="Đăng ký chương trình bồi dưỡng"
        description="Điền thông tin theo từng bước để nhà trường tiếp nhận và tư vấn chương trình phù hợp."
        current="Đăng ký chương trình"
      />
      <section className="wizard-section">
        <div className="container wizard-layout">
          <form className="wizard-card">
            <Steps />
            <h2>Thông tin chương trình</h2>
            <div className="wizard-grid">
              <Field label="Chương trình đăng ký">
                <CustomSelect
                  className="custom-select--full"
                  defaultValue="union"
                  options={[
                    { value: "union", label: "Nghiệp vụ công đoàn" },
                    { value: "pedagogy", label: "Nghiệp vụ sư phạm" },
                    { value: "management", label: "Quản lý giáo dục" },
                  ]}
                />
              </Field>
              <Field label="Hình thức học">
                <div className="radio-row">
                  <label>
                    <input type="radio" defaultChecked name="study" />
                    Trực tuyến
                  </label>
                  <label>
                    <input type="radio" name="study" />
                    Trực tiếp
                  </label>
                  <label>
                    <input type="radio" name="study" />
                    Linh hoạt
                  </label>
                </div>
              </Field>
              <Field label="Họ và tên">
                <input placeholder="Nhập họ và tên" />
              </Field>
              <Field label="Số điện thoại">
                <input placeholder="Nhập số điện thoại" />
              </Field>
              <Field label="Email">
                <input placeholder="Nhập email" />
              </Field>
              <Field label="Đơn vị công tác">
                <input placeholder="Nhập đơn vị công tác" />
              </Field>
              <Field label="Chức vụ" className="full">
                <input placeholder="Nhập chức vụ" />
              </Field>
            </div>
            <div className="wizard-footer">
              <label>
                <input type="checkbox" />
                Tôi đồng ý để nhà trường sử dụng thông tin cho công tác tuyển
                sinh.
              </label>
              <a href="/dang-ky-thanh-cong">Tiếp tục</a>
            </div>
          </form>
          <aside className="registration-summary">
            <h2>Thông tin đăng ký</h2>
            <div className="summary-program">
              <BookOpen />
              <b>Nghiệp vụ công đoàn</b>
            </div>
            <dl>
              <div>
                <dt>
                  <Users />
                  Đối tượng:
                </dt>
                <dd>Cán bộ công đoàn, viên chức ngành giáo dục</dd>
              </div>
              <div>
                <dt>
                  <MonitorUp />
                  Hình thức:
                </dt>
                <dd>Trực tuyến & trực tiếp</dd>
              </div>
            </dl>
            <h3>Bạn sẽ nhận được</h3>
            {[
              "Tư vấn lộ trình",
              "Hỗ trợ hoàn thiện hồ sơ",
              "Thông báo qua hệ thống",
            ].map((x) => (
              <p key={x}>
                <Check />
                {x}
              </p>
            ))}
            <a href="/chuong-trinh/nghiep-vu-cong-doan">
              Xem chi tiết chương trình <ArrowRight />
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}

export function RegistrationSuccessPage() {
  return (
    <>
      <PageHero title="Hoàn tất đăng ký" current="Hoàn tất" />
      <section className="completion-section">
        <div className="container completion-card">
          <Steps complete />
          <CircleCheckBig className="completion-icon" />
          <h2>Đăng ký đã được gửi thành công</h2>
          <p>
            Nhà trường đã tiếp nhận thông tin và sẽ cập nhật trạng thái qua hệ
            thống.
          </p>
          <small>Mã đăng ký</small>
          <strong>DK-2026-001</strong>
          <h3>Thông tin đăng ký</h3>
          <dl>
            <div>
              <dt>Chương trình:</dt>
              <dd>Nghiệp vụ công đoàn</dd>
              <dt>Hình thức:</dt>
              <dd>Trực tuyến</dd>
            </div>
            <div>
              <dt>Người đăng ký:</dt>
              <dd>Nguyễn Văn A</dd>
              <dt>Đơn vị công tác:</dt>
              <dd>Đơn vị giáo dục</dd>
            </div>
          </dl>
          <div className="completion-actions">
            <a href="/chuong-trinh">
              <BookOpen />
              Xem chương trình
            </a>
            <a className="primary" href="/nop-ho-so">
              <CloudUpload />
              Nộp hồ sơ trực tuyến
            </a>
            <a href="/">
              <Home />
              Về trang chủ
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function ApplicationFormPage() {
  return (
    <>
      <PageHero
        eyebrow="Hồ sơ trực tuyến"
        title="Nộp hồ sơ đăng ký"
        description="Tải tài liệu lên hệ thống và kiểm tra đầy đủ trước khi gửi đến nhà trường."
        current="Nộp hồ sơ trực tuyến"
      />
      <section className="wizard-section">
        <div className="container wizard-layout">
          <form className="wizard-card application-wizard">
            <Steps active={2} />
            <div className="application-code">
              <FileText />
              Hồ sơ: <b>HS-2026-001</b>
            </div>
            <h2>Tài liệu hồ sơ</h2>
            {[
              ["Phiếu đăng ký", "phieu-dang-ky.pdf", true],
              ["Văn bằng hoặc chứng chỉ", "van-bang.pdf", true],
              ["Giấy tờ tùy thân", "", false],
            ].map(([label, file, done]) => (
              <div className="document-row" key={label as string}>
                <div>
                  <b>{label as string}</b>
                  <small>PDF, JPG, PNG • Tối đa 10 MB</small>
                </div>
                {done ? (
                  <div className="uploaded-file">
                    <FileText />
                    <span>{file as string}</span>
                    <b>Đã tải lên</b>
                    <CheckCircle2 />
                    <button>×</button>
                  </div>
                ) : (
                  <label className="document-upload">
                    <input className="sr-only" type="file" />
                    <CloudUpload />
                    Chọn tệp hoặc kéo thả vào đây
                  </label>
                )}
              </div>
            ))}
            <div className="wizard-footer">
              <button>
                <ArrowLeft />
                Quay lại
              </button>
              <a href="/ho-so/HS-2026-001">
                Tiếp tục <ArrowRight />
              </a>
            </div>
          </form>
          <aside className="application-progress">
            <header>
              <h2>Trạng thái hồ sơ</h2>
              <span>
                <i />
                Bản nháp
              </span>
            </header>
            <p>
              Hoàn thành <b>2/3</b> tài liệu
            </p>
            <div className="progress-bar">
              <i />
            </div>
            <ol>
              <li className="done">
                <Check />
                Thông tin đã hoàn tất
              </li>
              <li className="done">
                <Check />
                Đã tải 2 tài liệu
              </li>
              <li>
                <b>03</b>Chưa xác nhận hồ sơ
              </li>
            </ol>
            <footer>
              <LockKeyhole />
              Dữ liệu được bảo mật và chỉ dùng cho công tác tuyển sinh.
            </footer>
          </aside>
        </div>
      </section>
    </>
  );
}

export function ApplicationLookupPage() {
  return (
    <>
      <PageHero
        eyebrow="Tra cứu trực tuyến"
        title="Theo dõi trạng thái hồ sơ"
        description="Nhập mã hồ sơ và thông tin đăng ký để xem tiến độ xử lý."
        current="Tra cứu hồ sơ"
      />
      <section className="lookup-section">
        <div className="container">
          <div className="lookup-card">
            <form>
              <h2>Tra cứu hồ sơ</h2>
              <Field label="Mã hồ sơ">
                <input placeholder="Ví dụ: HS-2026-001" />
              </Field>
              <Field label="Số điện thoại đăng ký">
                <input placeholder="Nhập số điện thoại" />
              </Field>
              <a href="/ho-so/HS-2026-001">
                <Search />
                Tra cứu
              </a>
              <p>
                <LockKeyhole />
                Thông tin chỉ được sử dụng để xác minh hồ sơ.
              </p>
            </form>
            <div>
              <img
                src={assets.applicationLookupIllustration}
                alt="Minh họa tra cứu hồ sơ"
              />
            </div>
          </div>
          <div className="lookup-steps">
            {[
              [
                "01",
                "Nhập thông tin",
                "Nhập mã hồ sơ và số điện thoại đã đăng ký",
              ],
              [
                "02",
                "Xác minh hồ sơ",
                "Hệ thống xác minh thông tin để tìm hồ sơ của bạn.",
              ],
              [
                "03",
                "Xem trạng thái",
                "Xem chi tiết trạng thái và tiến độ xử lý hồ sơ.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <strong>{n}</strong>
                <span>
                  <b>{t}</b>
                  <small>{d}</small>
                </span>
              </div>
            ))}
          </div>
          <a className="new-application" href="/nop-ho-so">
            <FileText />
            Nộp hồ sơ mới
          </a>
        </div>
      </section>
    </>
  );
}

export function ApplicationStatusPage() {
  const { code } = useParams();
  return (
    <>
      <PageHero
        eyebrow="Theo dõi hồ sơ"
        title="Hồ sơ đã được gửi thành công"
        description="Theo dõi tiến độ xử lý và bổ sung tài liệu khi có yêu cầu từ nhà trường."
        current="Tra cứu hồ sơ"
      />
      <section className="tracking-section">
        <div className="container">
          <div className="tracking-summary">
            <CircleCheckBig />
            <div>
              <small>Mã hồ sơ</small>
              <strong>{code || "HS-2026-001"}</strong>
            </div>
            <i />
            <div>
              <small>Trạng thái hiện tại</small>
              <span>Đang tiếp nhận</span>
            </div>
            <div className="tracking-summary__actions">
              <a href="#">
                <FileText />
                Xem hồ sơ
              </a>
              <a href="/nop-ho-so">
                <CloudUpload />
                Bổ sung tài liệu
              </a>
            </div>
          </div>
          <div className="tracking-layout">
            <div>
              <section className="tracking-timeline">
                <h2>Tiến độ xử lý</h2>
                {[
                  [
                    CheckCircle2,
                    "Đã nộp hồ sơ",
                    "Hồ sơ đã được lưu trên hệ thống",
                    "Đã ghi nhận",
                  ],
                  [
                    Landmark,
                    "Nhà trường đã tiếp nhận",
                    "Đã chuyển đến bộ phận phụ trách",
                    "Đã tiếp nhận",
                  ],
                  [Search, "Đang kiểm tra hồ sơ", "Chờ cập nhật", ""],
                  [Flag, "Hoàn tất xử lý", "Chưa hoàn tất", ""],
                ].map(([I, t, d, s], i) => {
                  const Icon = I as typeof CheckCircle2;
                  return (
                    <article className={i < 2 ? "done" : ""} key={t as string}>
                      <strong>
                        {i === 0 ? <Check /> : String(i + 1).padStart(2, "0")}
                      </strong>
                      <span>
                        <Icon />
                        <i>
                          <b>{t as string}</b>
                          <small>{d as string}</small>
                        </i>
                      </span>
                      <em>{s as string}</em>
                    </article>
                  );
                })}
              </section>
              <section className="tracking-request">
                <h2>Yêu cầu bổ sung</h2>
                <p>
                  <Info />
                  Hiện chưa có yêu cầu bổ sung tài liệu.
                </p>
              </section>
            </div>
            <aside className="tracking-info">
              <h2>Thông tin hồ sơ</h2>
              {[
                [GraduationCap, "Chương trình:", "Nghiệp vụ công đoàn"],
                [MonitorUp, "Hình thức:", "Trực tuyến"],
                [UserRound, "Người đăng ký:", "Nguyễn Văn A"],
                [FolderOpen, "Tài liệu:", "3 tệp đã nộp"],
              ].map(([I, l, v]) => {
                const Icon = I as typeof GraduationCap;
                return (
                  <p key={l as string}>
                    <Icon />
                    <span>{l as string}</span>
                    <b>{v as string}</b>
                  </p>
                );
              })}
              <footer>
                <LockKeyhole />
                Thông tin hồ sơ được bảo mật trên hệ thống.
              </footer>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
