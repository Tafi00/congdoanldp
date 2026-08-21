import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import {
  createApplication,
  createRegistration,
  findApplication,
  getLastRegistration,
  getLastApplicationReference,
  getLastRegistrationReference,
  getProgram,
  getPrograms,
  type ApplicationRecord,
  type ProgramRecord,
  type RegistrationRecord,
  programNames,
  studyModeNames,
} from "../lib/publicPortal";
import "./PublicJourneyPages.css";

const programIcons = { union: Users, pedagogy: BookOpen, management: GraduationCap } as const;

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
    <label className={`form-field ${className}`}>
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
    <div className={`journey-steps ${complete ? "is-complete" : ""}`}>
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
  const [programs, setPrograms] = useState<ProgramRecord[]>([]);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  useEffect(() => { void getPrograms().then(setPrograms).catch((error) => setLoadError(error instanceof Error ? error.message : "Không thể tải chương trình.")); }, []);

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
            {shown.map((p) => {
              const Icon = programIcons[p.category as keyof typeof programIcons] ?? BookOpen;
              return <article key={p.slug}>
                <div className="program-list-card__head">
                  <span>
                    <Icon size={31} />
                  </span>
                  <div>
                    <small>Đang tuyển sinh</small>
                    <h2>{p.title}</h2>
                    <p>{p.summary}</p>
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
                  <a href={`/dang-ky?program=${p.category}`}>Đăng ký</a>
                </div>
              </article>;
            })}
            {loadError && <p className="program-list-empty form-error">{loadError}</p>}
            {shown.length === 0 && (
              <p className="program-list-empty">
                Không tìm thấy chương trình phù hợp.
              </p>
            )}
          </div>
          <nav className="app-pagination" aria-label="Phân trang chương trình">
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
  const [program, setProgram] = useState<ProgramRecord | null>();
  const [activeTab, setActiveTab] = useState("Tổng quan");
  useEffect(() => { if (!slug) { setProgram(null); return; } void getProgram(slug).then(setProgram).catch(() => setProgram(null)); }, [slug]);
  const detailTabs = ["Tổng quan", "Nội dung", "Đối tượng", "Cách đăng ký"];
  if (program === undefined) return <section className="lookup-section"><div className="container lookup-not-found"><p>Đang tải chương trình...</p></div></section>;
  if (program === null) {
    return (
      <>
        <PageHero
          title="Không tìm thấy chương trình"
          description="Chương trình không tồn tại hoặc đã ngừng tuyển sinh."
          current="Chương trình"
        />
        <section className="lookup-section">
          <div className="container lookup-not-found">
            <BookOpen />
            <h2>Chọn một chương trình đang tuyển sinh</h2>
            <a href="/chuong-trinh">Xem danh sách chương trình</a>
          </div>
        </section>
      </>
    );
  }
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
                {program.description}
              </p>
              <dl className="detail-meta">
                <div>
                  <dt>
                    <Users />
                  </dt>
                  <dd>
                    <b>Đối tượng</b>{program.audience}
                  </dd>
                </div>
                <div>
                  <dt>
                    <MonitorUp />
                  </dt>
                  <dd>
                    <b>Hình thức</b>{program.studyModes.map((mode) => studyModeNames[mode] ?? mode).join(" & ")}
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
              <a href={`/dang-ky?program=${program.category}`}>Đăng ký ngay</a>
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
                    {program.description}
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
                  {program.audience}
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedProgram = searchParams.get("program") ?? "union";
  const [selectedProgram, setSelectedProgram] = useState(
    programNames[requestedProgram] ? requestedProgram : "union",
  );
  const [studyMode, setStudyMode] = useState("online");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
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
          <form
            className="wizard-card"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              setSubmitting(true);
              setSubmitError("");
              try {
                await createRegistration({
                  program: selectedProgram,
                  studyMode,
                  name: String(form.get("name") ?? "").trim(),
                  phone: String(form.get("phone") ?? "").trim(),
                  email: String(form.get("email") ?? "").trim(),
                  organization: String(form.get("organization") ?? "").trim(),
                  position: String(form.get("position") ?? "").trim(),
                });
                navigate("/dang-ky-thanh-cong");
              } catch (error) {
                setSubmitError(error instanceof Error ? error.message : "Không thể gửi đăng ký.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Steps />
            <h2>Thông tin chương trình</h2>
            <div className="wizard-grid">
              <Field label="Chương trình đăng ký">
                <CustomSelect
                  className="custom-select--full"
                  name="program"
                  value={selectedProgram}
                  onValueChange={setSelectedProgram}
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
                    <input
                      type="radio"
                      checked={studyMode === "online"}
                      name="study"
                      onChange={() => setStudyMode("online")}
                      value="online"
                    />
                    Trực tuyến
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={studyMode === "offline"}
                      name="study"
                      onChange={() => setStudyMode("offline")}
                      value="offline"
                    />
                    Trực tiếp
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={studyMode === "flexible"}
                      name="study"
                      onChange={() => setStudyMode("flexible")}
                      value="flexible"
                    />
                    Linh hoạt
                  </label>
                </div>
              </Field>
              <Field label="Họ và tên">
                <input name="name" placeholder="Nhập họ và tên" required />
              </Field>
              <Field label="Số điện thoại">
                <input
                  name="phone"
                  pattern="[0-9+ ]{9,15}"
                  placeholder="Nhập số điện thoại"
                  required
                  type="tel"
                />
              </Field>
              <Field label="Email">
                <input
                  name="email"
                  placeholder="Nhập email"
                  required
                  type="email"
                />
              </Field>
              <Field label="Đơn vị công tác">
                <input
                  name="organization"
                  placeholder="Nhập đơn vị công tác"
                  required
                />
              </Field>
              <Field label="Chức vụ" className="full">
                <input name="position" placeholder="Nhập chức vụ" required />
              </Field>
            </div>
            <div className="wizard-footer">
              <label>
                <input required type="checkbox" />
                Tôi đồng ý để nhà trường sử dụng thông tin cho công tác tuyển
                sinh.
              </label>
              <button className="wizard-submit" disabled={submitting} type="submit">
                {submitting ? "Đang gửi..." : "Tiếp tục"}
              </button>
            </div>
            {submitError && <p className="form-error" role="alert">{submitError}</p>}
          </form>
          <aside className="registration-summary">
            <h2>Thông tin đăng ký</h2>
            <div className="summary-program">
              <BookOpen />
              <b>{programNames[selectedProgram]}</b>
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
                <dd>{studyModeNames[studyMode]}</dd>
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
  const [registration, setRegistration] = useState<RegistrationRecord | null>();
  useEffect(() => { void getLastRegistration().then((value) => setRegistration(value ?? null)).catch(() => setRegistration(null)); }, []);
  if (registration === undefined) return <section className="lookup-section"><div className="container lookup-not-found"><p>Đang tải thông tin đăng ký...</p></div></section>;
  if (registration === null) {
    return (
      <>
        <PageHero title="Chưa có đăng ký" current="Đăng ký chương trình" />
        <section className="lookup-section">
          <div className="container lookup-not-found">
            <BookOpen />
            <h2>Vui lòng hoàn tất biểu mẫu đăng ký</h2>
            <p>Thông tin xác nhận chỉ hiển thị sau khi biểu mẫu được gửi.</p>
            <a href="/dang-ky">Đăng ký chương trình</a>
          </div>
        </section>
      </>
    );
  }
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
          <strong>{registration?.code ?? "Chưa có đăng ký"}</strong>
          <h3>Thông tin đăng ký</h3>
          <dl>
            <div>
              <dt>Chương trình:</dt>
              <dd>{programNames[registration?.program ?? "union"]}</dd>
              <dt>Hình thức:</dt>
              <dd>{studyModeNames[registration?.studyMode ?? "online"]}</dd>
            </div>
            <div>
              <dt>Người đăng ký:</dt>
              <dd>{registration?.name ?? "Chưa cập nhật"}</dd>
              <dt>Đơn vị công tác:</dt>
              <dd>{registration?.organization ?? "Chưa cập nhật"}</dd>
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
  const registrationReference = getLastRegistrationReference();
  const documentLabels = [
    "Phiếu đăng ký",
    "Văn bằng hoặc chứng chỉ",
    "Giấy tờ tùy thân",
  ];
  const [uploadedDocuments, setUploadedDocuments] = useState<(File | null)[]>(
    [null, null, null],
  );
  const [uploadError, setUploadError] = useState("");
  const [applicantPhone, setApplicantPhone] = useState(
    registrationReference?.phone ?? "",
  );
  const [submitting, setSubmitting] = useState(false);
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
          <form
            className="wizard-card application-wizard"
            onSubmit={async (event) => {
              event.preventDefault();
              if (completedDocuments !== documentLabels.length) {
                setUploadError(
                  "Vui lòng tải đủ 3 tài liệu trước khi tiếp tục.",
                );
                return;
              }
              setSubmitting(true);
              try {
                const application = await createApplication(
                  uploadedDocuments.filter((file): file is File => Boolean(file)),
                  applicantPhone,
                  registrationReference?.code,
                );
                navigate(`/ho-so/${application.code}`);
              } catch (error) {
                setUploadError(error instanceof Error ? error.message : "Không thể gửi hồ sơ.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Steps active={2} labels={["Thông tin", "Tài hồ sơ", "Xác nhận"]} />
            <div className="application-code">
              <FileText />
              Hồ sơ mới: <b>Chưa gửi</b>
            </div>
            <Field label="Số điện thoại đăng ký" className="application-phone">
              <input
                onChange={(event) => setApplicantPhone(event.target.value)}
                pattern="[0-9+ ]{9,15}"
                placeholder="Nhập số điện thoại để tra cứu hồ sơ"
                required
                type="tel"
                value={applicantPhone}
              />
            </Field>
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
                      <span>{file.name}</span>
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
                          if (!selectedFile) return;
                          if (selectedFile.size > 10 * 1024 * 1024) {
                            setUploadError(
                              `${selectedFile.name} vượt quá giới hạn 10 MB.`,
                            );
                            event.target.value = "";
                            return;
                          }
                          setUploadError("");
                          setUploadedDocuments((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index ? selectedFile : item,
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
            {uploadError && (
              <p className="form-error" role="alert">
                {uploadError}
              </p>
            )}
            <div className="wizard-footer">
              <button onClick={() => navigate(-1)} type="button">
                <ArrowLeft />
                Quay lại
              </button>
              <button className="wizard-submit" disabled={submitting} type="submit">
                {submitting ? "Đang gửi..." : "Tiếp tục"} <ArrowRight />
              </button>
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
  const [lookupPhone, setLookupPhone] = useState("");
  const [lookupError, setLookupError] = useState("");
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
              onSubmit={async (event) => {
                event.preventDefault();
                const application = await findApplication(lookupCode, lookupPhone);
                if (!application) {
                  setLookupError(
                    "Không tìm thấy hồ sơ khớp với mã và số điện thoại đã nhập.",
                  );
                  return;
                }
                setLookupError("");
                sessionStorage.setItem("cdgd.last-application", JSON.stringify({ code: application.code, phone: lookupPhone }));
                navigate(`/ho-so/${application.code}`);
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
                <input
                  onChange={(event) => setLookupPhone(event.target.value)}
                  placeholder="Nhập số điện thoại"
                  required
                  type="tel"
                  value={lookupPhone}
                />
              </Field>
              <button className="lookup-submit" type="submit">
                <Search />
                Tra cứu
              </button>
              {lookupError && (
                <p className="form-error" role="alert">
                  {lookupError}
                </p>
              )}
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
  const reference = getLastApplicationReference();
  const [application, setApplication] = useState<ApplicationRecord | null>();
  useEffect(() => {
    if (!code || !reference?.phone) { setApplication(null); return; }
    void findApplication(code, reference.phone).then((value) => setApplication(value ?? null)).catch(() => setApplication(null));
  }, [code, reference?.phone]);
  if (application === undefined) return <section className="lookup-section"><div className="container lookup-not-found"><p>Đang tải trạng thái hồ sơ...</p></div></section>;
  if (application === null) {
    return (
      <>
        <PageHero
          eyebrow="Theo dõi hồ sơ"
          title="Không tìm thấy hồ sơ"
          description="Mã hồ sơ không tồn tại trên thiết bị này hoặc chưa được gửi thành công."
          current="Tra cứu hồ sơ"
        />
        <section className="lookup-section">
          <div className="container lookup-not-found">
            <Search />
            <h2>Kiểm tra lại thông tin tra cứu</h2>
            <p>Vui lòng dùng đúng mã hồ sơ và số điện thoại khi đăng ký.</p>
            <a href="/tra-cuu-ho-so">Quay lại tra cứu</a>
          </div>
        </section>
      </>
    );
  }
  const completedStages =
    application.status === "approved"
      ? 4
      : application.status === "reviewing"
        ? 3
        : 1;
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
              <strong>{application.code}</strong>
            </div>
            <i />
            <div>
              <small>Trạng thái hiện tại</small>
              <span>
                {application.status === "approved"
                  ? "Đã hoàn tất"
                  : application.status === "reviewing"
                    ? "Đang kiểm tra"
                    : "Đã nộp"}
              </span>
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
                    <article
                      className={i < completedStages ? "done" : ""}
                      key={t as string}
                    >
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
                [
                  GraduationCap,
                  "Chương trình:",
                  application.programTitle ?? programNames[application.program ?? "union"],
                ],
                [
                  MonitorUp,
                  "Hình thức:",
                  "Theo đăng ký đã gửi",
                ],
                [
                  UserRound,
                  "Người đăng ký:",
                  application.applicantName ?? "Chưa cập nhật",
                ],
                [
                  FolderOpen,
                  "Tài liệu:",
                  `${application.documents.length} tệp đã nộp`,
                ],
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
