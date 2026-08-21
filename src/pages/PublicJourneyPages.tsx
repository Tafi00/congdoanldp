import { useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  MonitorUp,
  Search,
  UserRound,
  Users,
} from "lucide-react";
import { PageHero } from "../components/layout/PageHero";
import { CustomSelect } from "../components/ui/CustomSelect";
import { assets } from "../data/assets";
import "./PublicJourneyPages.css";

const programs = [
  {
    slug: "nghiep-vu-cong-doan",
    category: "union",
    icon: Users,
    title: "Nghiệp vụ công đoàn",
    text: "Bồi dưỡng kỹ năng tổ chức, quản lý và hoạt động công đoàn.",
  },
  {
    slug: "nghiep-vu-su-pham",
    category: "pedagogy",
    icon: BookOpen,
    title: "Nghiệp vụ sư phạm",
    text: "Cập nhật phương pháp giảng dạy và năng lực nghề nghiệp.",
  },
  {
    slug: "quan-ly-giao-duc",
    category: "management",
    icon: GraduationCap,
    title: "Quản lý giáo dục",
    text: "Nâng cao năng lực quản trị cho cán bộ quản lý giáo dục.",
  },
];

const programCategories = [
  { value: "all", label: "Tất cả" },
  { value: "union", label: "Công đoàn" },
  { value: "pedagogy", label: "Sư phạm" },
  { value: "management", label: "Quản lý giáo dục" },
];

const programsPerPage = 2;

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
  labels = ["Chương trình", "Thông tin cá nhân", "Xác nhận"],
}: {
  active?: number;
  complete?: boolean;
  labels?: [string, string, string];
}) {
  return (
    <div className={`mock-steps ${complete ? "is-complete" : ""}`}>
      {labels.map((label, i) => {
        const n = i + 1;
        return (
          <div className={complete || n === active ? "active" : ""} key={label}>
            <strong>{String(n).padStart(2, "0")}</strong>
            <span>{label}</span>
            {i < 2 && <i />}
          </div>
        );
      })}
    </div>
  );
}

export function ProgramsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filteredPrograms = programs
    .filter(
      (program) =>
        (category === "all" || program.category === category) &&
        program.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .sort((first, second) => {
      if (sort === "name") return first.title.localeCompare(second.title, "vi");
      if (sort === "popular") return second.title.length - first.title.length;
      return 0;
    });
  const pageCount = Math.max(
    1,
    Math.ceil(filteredPrograms.length / programsPerPage),
  );
  const shown = filteredPrograms.slice(
    (page - 1) * programsPerPage,
    page * programsPerPage,
  );

  const selectCategory = (value: string) => {
    setCategory(value);
    setPage(1);
  };
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
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Tìm kiếm chương trình"
              />
            </label>
            <nav aria-label="Lọc chương trình theo lĩnh vực">
              {programCategories.map((item) => (
                <button
                  aria-pressed={category === item.value}
                  className={category === item.value ? "active" : ""}
                  key={item.value}
                  onClick={() => selectCategory(item.value)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <CustomSelect
              className="custom-select--compact"
              ariaLabel="Sắp xếp chương trình"
              value={sort}
              onValueChange={(value) => {
                setSort(value);
                setPage(1);
              }}
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
            {shown.length === 0 && (
              <p className="program-list-empty">
                Không tìm thấy chương trình phù hợp.
              </p>
            )}
          </div>
          <nav className="mock-pagination" aria-label="Phân trang chương trình">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  aria-current={page === pageNumber ? "page" : undefined}
                  className={page === pageNumber ? "active" : ""}
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  type="button"
                >
                  {String(pageNumber).padStart(2, "0")}
                </button>
              ),
            )}
            <button
              disabled={page === pageCount}
              onClick={() =>
                setPage((current) => Math.min(current + 1, pageCount))
              }
              type="button"
            >
              Tiếp theo <ArrowRight size={17} />
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}

export function ProgramDetailPage() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug) || programs[0];
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const detailTabs = ["Tổng quan", "Nội dung", "Đối tượng", "Cách đăng ký"];
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
            {detailTabs.map((tab) => (
              <button
                aria-pressed={activeTab === tab}
                className={activeTab === tab ? "active" : ""}
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </nav>
          {activeTab === "Tổng quan" ? (
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
          ) : (
            <article className="detail-tab-panel">
              <h2>{activeTab}</h2>
              {activeTab === "Nội dung" && (
                <ul>
                  <li>Vai trò và chức năng công đoàn</li>
                  <li>Tổ chức hoạt động công đoàn</li>
                  <li>Kỹ năng đại diện và hỗ trợ</li>
                  <li>Quản lý theo ngành</li>
                </ul>
              )}
              {activeTab === "Đối tượng" && (
                <p>
                  Chương trình dành cho cán bộ công đoàn, công chức, viên chức,
                  giáo viên và cán bộ quản lý trong ngành giáo dục.
                </p>
              )}
              {activeTab === "Cách đăng ký" && (
                <p>
                  Chọn chương trình, điền thông tin đăng ký và hoàn thiện hồ sơ
                  trực tuyến. Bộ phận tuyển sinh sẽ liên hệ xác nhận lịch học.
                </p>
              )}
            </article>
          )}
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
  const navigate = useNavigate();
  const documentLabels = [
    "Phiếu đăng ký",
    "Văn bằng hoặc chứng chỉ",
    "Giấy tờ tùy thân",
  ];
  const [uploadedDocuments, setUploadedDocuments] = useState<(string | null)[]>(
    ["phieu-dang-ky.pdf", "van-bang.pdf", null],
  );
  const completedDocuments = uploadedDocuments.filter(Boolean).length;

  return (
    <>
      <PageHero
        eyebrow="Hồ sơ trực tuyến"
        title="Nộp hồ sơ đăng ký"
        description="Tải tài liệu lên hệ thống và kiểm tra đầy đủ trước khi gửi đến nhà trường."
        current="Nộp hồ sơ trực tuyến"
      />
      <section className="wizard-section">
        <div className="container wizard-layout application-layout">
          <form className="wizard-card application-wizard">
            <Steps active={2} labels={["Thông tin", "Tài hồ sơ", "Xác nhận"]} />
            <div className="application-code">
              <FileText />
              Hồ sơ: <b>HS-2026-001</b>
            </div>
            <h2>Tài liệu hồ sơ</h2>
            {documentLabels.map((label, index) => {
              const file = uploadedDocuments[index];
              return (
                <div className="document-row" key={label}>
                  <div>
                    <b>{label}</b>
                    <small>PDF, JPG, PNG • Tối đa 10 MB</small>
                  </div>
                  {file ? (
                    <div className="uploaded-file">
                      <FileText />
                      <span>{file}</span>
                      <b>Đã tải lên</b>
                      <CheckCircle2 />
                      <button
                        aria-label={`Xóa ${label}`}
                        onClick={() =>
                          setUploadedDocuments((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index ? null : item,
                            ),
                          )
                        }
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="document-upload">
                      <input
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="sr-only"
                        onChange={(event) => {
                          const selectedFile = event.target.files?.[0];
                          if (selectedFile)
                            setUploadedDocuments((current) =>
                              current.map((item, itemIndex) =>
                                itemIndex === index ? selectedFile.name : item,
                              ),
                            );
                        }}
                        type="file"
                      />
                      <CloudUpload />
                      Chọn tệp hoặc kéo thả vào đây
                    </label>
                  )}
                </div>
              );
            })}
            <div className="wizard-footer">
              <button onClick={() => navigate(-1)} type="button">
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
              <span className="draft-badge">
                <i />
                Bản nháp
              </span>
            </header>
            <p>
              Hoàn thành <b>{completedDocuments}/3</b> tài liệu
            </p>
            <div className="progress-bar">
              <i style={{ width: `${(completedDocuments / 3) * 100}%` }} />
            </div>
            <ol>
              <li className="done">
                <Check />
                Thông tin đã hoàn tất
              </li>
              <li className={completedDocuments > 0 ? "done" : ""}>
                {completedDocuments > 0 ? <Check /> : <b>02</b>}
                Đã tải {completedDocuments} tài liệu
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
  const navigate = useNavigate();
  const [lookupCode, setLookupCode] = useState("");
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
                navigate(`/ho-so/${lookupCode.trim()}`);
              }}
            >
              <h2>Tra cứu hồ sơ</h2>
              <Field label="Mã hồ sơ">
                <input
                  onChange={(event) => setLookupCode(event.target.value)}
                  placeholder="Ví dụ: HS-2026-001"
                  required
                  value={lookupCode}
                />
              </Field>
              <Field label="Số điện thoại đăng ký">
                <input placeholder="Nhập số điện thoại" required type="tel" />
              </Field>
              <button className="lookup-submit" type="submit">
                <Search />
                Tra cứu
              </button>
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
              <a href="#thong-tin-ho-so">
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
            <aside className="tracking-info" id="thong-tin-ho-so">
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
