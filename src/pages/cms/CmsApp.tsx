import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Activity, BookOpen, Check, CircleCheckBig, ClipboardCheck, FileText, FolderOpen, GraduationCap, Image, LayoutDashboard, LogOut, Menu, Newspaper, Plus, Save, Search, Settings, ShieldCheck, Upload, UserCheck, Users, X } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CustomSelect } from "../../components/ui/CustomSelect";
import { assets } from "../../data/assets";
import { cmsLogin, cmsLogout, createResource, deleteResource, getCmsUser, getDashboard, getResource, getResourceItem, hasCmsToken, mediaUrl, updateOrganization, updateResource, updateStatus, uploadMedia, type CmsUser } from "../../lib/cmsApi";
import "./CmsApp.css";
import "./CmsCorrections.css";

const nav = [
  ["/cms/dashboard", LayoutDashboard, "Tổng quan"], ["/cms/programs", BookOpen, "Chương trình"], ["/cms/registrations", UserCheck, "Đăng ký học"], ["/cms/applications", FolderOpen, "Hồ sơ"], ["/cms/exams", ClipboardCheck, "Thi thử"], ["/cms/news", Newspaper, "Tin tức"], ["/cms/media", Image, "Thư viện"], ["/cms/users", Users, "Người dùng"], ["/cms/settings", Settings, "Cấu hình"],
] as const;

const statusLabels: Record<string, string> = { recruiting: "Đang tuyển", draft: "Bản nháp", closed: "Đã đóng", new: "Mới", contacted: "Đã liên hệ", confirmed: "Đã xác nhận", rejected: "Từ chối", submitted: "Đã nộp", reviewing: "Đang kiểm tra", needs_more: "Cần bổ sung", approved: "Đã duyệt", active: "Đang mở", published: "Đã đăng" };
const categoryLabels: Record<string, string> = { union: "Công tác công đoàn", pedagogy: "Chuyên môn giáo dục", management: "Quản lý giáo dục" };
const formatDate = (value: unknown) => value ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(String(value))) : "—";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setSubmitting(true); setError("");
    try { await cmsLogin(String(form.get("username")), String(form.get("password"))); navigate("/cms/dashboard"); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Không thể đăng nhập."); }
    finally { setSubmitting(false); }
  };
  return <section className="cms-login"><div className="cms-login__visual" style={{ backgroundImage: `url(${assets.cmsLoginBackground})` }}><div className="cms-login__brand"><img src={assets.logo} alt="Trường Công đoàn Giáo dục Việt Nam" /><h1>TRƯỜNG CÔNG ĐOÀN GIÁO DỤC VIỆT NAM</h1><p>HỆ THỐNG QUẢN TRỊ NỘI DUNG</p></div><ul><li><GraduationCap />Quản lý chương trình</li><li><FolderOpen />Tiếp nhận hồ sơ</li><li><ClipboardCheck />Quản trị thi thử</li></ul></div><div className="cms-login__right"><form onSubmit={submit}><h1>Đăng nhập CMS</h1><p>Sử dụng tài khoản quản trị để tiếp tục.</p><label><span>Tên đăng nhập</span><input name="username" autoComplete="username" required /></label><label><span>Mật khẩu</span><input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="cms-login__button" disabled={submitting} type="submit">{submitting ? "Đang xác thực..." : "Đăng nhập"}</button></form><small className="cms-login__secure"><ShieldCheck />Khu vực dành cho người dùng được cấp quyền.</small></div></section>;
}

function CmsHeader({ title, user, onMenu, onLogout }: { title: string; user?: CmsUser; onMenu: () => void; onLogout: () => void }) {
  return <header className="cms-topbar"><button className="cms-menu" onClick={onMenu} aria-label="Mở menu"><Menu /></button><div className="cms-breadcrumb"><b>CMS</b><span>/</span>{title}</div><div className="cms-topbar__actions"><div className="cms-user"><span>QT</span><div><b>{user?.displayName ?? user?.username ?? "Quản trị viên"}</b><small>{user?.role ?? "admin"}</small></div></div><button onClick={onLogout} aria-label="Đăng xuất"><LogOut size={19} /></button></div></header>;
}

function CmsSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  return <aside className={`cms-sidebar ${open ? "is-open" : ""}`}><div className="cms-brand"><img src={assets.logo} alt="" /><strong>VNEU CMS</strong><button onClick={onClose}><X /></button></div><nav aria-label="Điều hướng CMS">{nav.map(([href, Icon, label]) => <Link className={pathname.startsWith(href) ? "is-active" : ""} to={href} key={href} onClick={onClose}><Icon size={19} />{label}</Link>)}</nav><div className="cms-sidebar__footer"><ShieldCheck size={20} /><span><b>Kết nối an toàn</b><small>Dữ liệu PostgreSQL</small></span></div></aside>;
}

function Dashboard() {
  const [data, setData] = useState<Record<string, unknown>>();
  const [error, setError] = useState("");
  useEffect(() => { void getDashboard().then(setData).catch((reason) => setError(reason instanceof Error ? reason.message : "Không thể tải tổng quan.")); }, []);
  if (!data && !error) return <p>Đang tải tổng quan...</p>;
  const stats = [[Users, data?.registrations ?? 0, "Đăng ký"], [FolderOpen, data?.applications ?? 0, "Tổng hồ sơ"], [ClipboardCheck, data?.attempts ?? 0, "Lượt thi thử"], [Newspaper, data?.news ?? 0, "Bài viết"]] as const;
  return <><div className="cms-heading"><div><p>Dữ liệu cập nhật trực tiếp từ hệ thống</p><h2>Tổng quan vận hành</h2></div></div>{error && <p className="form-error">{error}</p>}<div className="cms-stats">{stats.map(([Icon, value, label]) => <article key={label}><span><Icon size={23} /></span><div><small>{label}</small><strong>{String(value)}</strong></div></article>)}</div><div className="cms-dashboard-grid"><section className="cms-panel"><header><div><h3>Hồ sơ đang xử lý</h3><p>Cập nhật theo thời gian thực</p></div><Activity /></header><div className="donut-wrap"><div className="fake-donut"><strong>{String(data?.applications ?? 0)}</strong><small>Tổng hồ sơ</small></div><ul><li><i />Đã duyệt <b>{String(data?.approved ?? 0)}</b></li><li><i />Đang xử lý <b>{String(data?.processing ?? 0)}</b></li></ul></div></section><section className="cms-panel cms-recent"><header><div><h3>Audit log gần đây</h3><p>Các thao tác quản trị đã ghi nhận</p></div></header>{((data?.recent as Array<Record<string, unknown>>) ?? []).map((item, index) => <div className="activity-row" key={index}><span><CircleCheckBig size={19} /></span><p><b>{String(item.action)} · {String(item.entity_type)}</b><small>{formatDate(item.created_at)}</small></p></div>)}</section></div></>;
}

type ResourceName = "programs" | "registrations" | "applications" | "exams" | "questions" | "news" | "users";
const resourceConfig: Record<ResourceName, { title: string; description: string; columns: Array<[string, string]>; creatable?: boolean }> = {
  programs: { title: "Danh sách chương trình", description: "Quản lý chương trình đào tạo và tuyển sinh", creatable: true, columns: [["title","Tên chương trình"],["category","Nhóm"],["duration","Thời lượng"],["status","Trạng thái"]] },
  registrations: { title: "Danh sách đăng ký", description: "Theo dõi và tư vấn học viên quan tâm", columns: [["full_name","Học viên"],["phone","Điện thoại"],["program_title","Chương trình"],["status","Trạng thái"]] },
  applications: { title: "Danh sách hồ sơ", description: "Tiếp nhận và kiểm duyệt hồ sơ trực tuyến", columns: [["code","Mã hồ sơ"],["full_name","Người nộp"],["program_title","Chương trình"],["status","Trạng thái"]] },
  exams: { title: "Danh sách đề thi", description: "Quản lý cấu trúc và thời gian làm bài", creatable: true, columns: [["title","Tên đề thi"],["question_count","Số câu"],["duration_minutes","Thời gian"],["status","Trạng thái"]] },
  questions: { title: "Ngân hàng câu hỏi", description: "Câu hỏi đang được sử dụng trong các đề", columns: [["position","STT"],["prompt","Nội dung"],["exam_title","Đề thi"],["category","Nhóm"]] },
  news: { title: "Danh sách bài viết", description: "Quản lý tin tức và nội dung chuyên môn", creatable: true, columns: [["title","Tiêu đề"],["category","Danh mục"],["published_at","Ngày đăng"],["status","Trạng thái"]] },
  users: { title: "Người dùng & phân quyền", description: "Tài khoản có quyền truy cập CMS", columns: [["display_name","Người dùng"],["username","Tên đăng nhập"],["role","Vai trò"],["active","Hoạt động"]] },
};

function displayCell(key: string, value: unknown) {
  if (key === "status") return statusLabels[String(value)] ?? String(value);
  if (key === "category") return categoryLabels[String(value)] ?? String(value);
  if (key.includes("_at")) return formatDate(value);
  if (key === "duration_minutes") return `${value} phút`;
  if (key === "question_count") return `${value} câu`;
  if (key === "active") return value ? "Đang hoạt động" : "Đã khóa";
  return String(value ?? "—");
}

function ResourceList({ resource }: { resource: ResourceName }) {
  const config = resourceConfig[resource];
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [query, setQuery] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); void getResource(resource).then((data) => setItems(data.items)).catch((reason) => setError(reason instanceof Error ? reason.message : "Không thể tải dữ liệu.")).finally(() => setLoading(false)); }, [resource]);
  const shown = items.filter((item) => Object.values(item).join(" ").toLowerCase().includes(query.toLowerCase()));
  const exportCsv = () => { const lines = [config.columns.map(([,label]) => label), ...shown.map((item) => config.columns.map(([key]) => String(item[key] ?? "")))]; const blob = new Blob(["\ufeff" + lines.map((row) => row.map((cell) => `"${cell.replaceAll('"','""')}"`).join(",")).join("\n")], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${resource}.csv`; anchor.click(); URL.revokeObjectURL(url); };
  return <><div className="cms-heading"><div><h2>{config.title}</h2><p>{config.description}</p></div><div className="cms-page-actions"><button className="ghost" onClick={exportCsv}><Upload size={18} />Xuất dữ liệu</button>{config.creatable && <Link className="primary" to={`/cms/${resource}/edit`}><Plus size={18} />Thêm mới</Link>}</div></div><div className="cms-stats cms-stats--three"><article><span><FileText /></span><div><small>Tổng dữ liệu</small><strong>{items.length}</strong></div></article></div><div className="cms-table-card"><div className="cms-table-tools"><label><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm..." /></label></div>{error && <p className="form-error">{error}</p>}<div className="cms-table-wrap"><table><thead><tr>{config.columns.map(([,label]) => <th key={label}>{label}</th>)}<th>Thao tác</th></tr></thead><tbody>{shown.map((row) => <tr key={String(row.id)}>{config.columns.map(([key]) => <td key={key}>{key === "status" ? <span className="cms-status">{displayCell(key,row[key])}</span> : displayCell(key,row[key])}</td>)}<td>{resource === "registrations" || resource === "applications" ? <Link to={`/cms/${resource}/${row.id}`}>Xem</Link> : config.creatable ? <Link to={`/cms/${resource}/edit?id=${row.id}`}>Sửa</Link> : "—"}</td></tr>)}</tbody></table>{loading && <p>Đang tải dữ liệu...</p>}{!loading && !shown.length && <p>Không có dữ liệu phù hợp.</p>}</div><div className="cms-pagination"><span>Hiển thị {shown.length} trong {items.length} mục</span></div></div></>;
}

function DetailPage({ resource, id }: { resource: "registrations" | "applications"; id: string }) {
  const [item, setItem] = useState<Record<string, unknown>>(); const [note, setNote] = useState(""); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  useEffect(() => { void getResourceItem(resource,id).then(setItem).catch((reason) => setError(reason instanceof Error ? reason.message : "Không thể tải chi tiết.")); }, [id,resource]);
  const changeStatus = async (status: string) => { setSaving(true); setError(""); try { await updateStatus(resource,id,status,note); setItem(await getResourceItem(resource,id)); } catch (reason) { setError(reason instanceof Error ? reason.message : "Không thể cập nhật."); } finally { setSaving(false); } };
  if (!item && !error) return <p>Đang tải chi tiết...</p>;
  const documents = (item?.documents as Array<Record<string, unknown>>) ?? [];
  return <><div className="cms-heading"><div><p>{String(item?.code ?? "")}</p><h2>{resource === "applications" ? "Kiểm duyệt hồ sơ" : "Chi tiết đăng ký học"}</h2></div><div className="cms-page-actions"><button className="ghost" disabled={saving} onClick={() => void changeStatus("rejected")}>Từ chối</button><button className="primary" disabled={saving} onClick={() => void changeStatus(resource === "applications" ? "approved" : "confirmed")}><Check size={18} />{resource === "applications" ? "Phê duyệt hồ sơ" : "Xác nhận đăng ký"}</button></div></div>{error && <p className="form-error">{error}</p>}<div className="cms-detail-grid"><section className="cms-panel"><h3>Thông tin người đăng ký</h3><dl className="cms-detail-list">{[["Họ và tên",item?.name ?? item?.applicantName],["Số điện thoại",item?.phone],["Email",item?.email],["Đơn vị công tác",item?.organization],["Chương trình",item?.programTitle],["Trạng thái",statusLabels[String(item?.status)] ?? item?.status]].map(([label,value]) => value ? <div key={String(label)}><dt>{String(label)}</dt><dd>{String(value)}</dd></div> : null)}</dl></section><aside className="cms-panel"><h3>{resource === "applications" ? "Tài liệu hồ sơ" : "Xử lý đăng ký"}</h3>{documents.length > 0 && <div className="cms-files">{documents.map((file) => <div key={String(file.id)}><FileText /><span><b>{String(file.name)}</b><small>{String(file.type)}</small></span></div>)}</div>}<label className="cms-note"><span>Ghi chú nội bộ</span><textarea value={note} onChange={(event) => setNote(event.target.value)} rows={5} placeholder="Thêm ghi chú..." /></label>{resource === "applications" && <button className="primary" disabled={saving} onClick={() => void changeStatus("needs_more")}>Yêu cầu bổ sung</button>}</aside></div></>;
}

type EditorResource = "programs" | "news" | "exams";
function EditorPage({ resource }: { resource: EditorResource }) {
  const navigate = useNavigate(); const [params] = useSearchParams(); const id = params.get("id");
  const [data, setData] = useState<Record<string, unknown>>({}); const [error,setError] = useState(""); const [saving,setSaving] = useState(false);
  useEffect(() => { if (id) void getResourceItem(resource,id).then(setData).catch((reason) => setError(reason instanceof Error ? reason.message : "Không thể tải dữ liệu.")); }, [id,resource]);
  const field = (key: string, fallback = "") => String(data[key] ?? fallback);
  const set = (key: string, value: unknown) => setData((current) => ({ ...current, [key]: value }));
  const save = async (event: FormEvent) => { event.preventDefault(); setSaving(true); setError(""); try { let payload: Record<string,unknown>; if (resource === "programs") payload = { slug: field("slug"), category: field("category","union"), title: field("title"), summary: field("summary"), description: field("description"), audience: field("audience"), duration: field("duration"), status: field("status","draft") }; else if (resource === "news") payload = { slug: field("slug"), title: field("title"), category: field("category","Thông báo"), summary: field("summary"), content: field("content"), status: field("status","draft") }; else payload = { slug: field("slug"), category: field("category","union"), title: field("title"), summary: field("summary"), durationMinutes: Number(data.duration_minutes ?? data.durationMinutes ?? 45), status: field("status","draft") }; if (id) await updateResource(resource,id,payload); else await createResource(resource,payload); navigate(`/cms/${resource}`); } catch (reason) { setError(reason instanceof Error ? reason.message : "Không thể lưu dữ liệu."); } finally { setSaving(false); } };
  const remove = async () => { if (!id || !window.confirm("Bạn chắc chắn muốn xóa dữ liệu này?")) return; try { await deleteResource(resource,id); navigate(`/cms/${resource}`); } catch (reason) { setError(reason instanceof Error ? reason.message : "Không thể xóa."); } };
  return <><div className="cms-heading"><div><p>Dữ liệu được lưu trực tiếp vào PostgreSQL</p><h2>{id ? "Chỉnh sửa" : "Thêm mới"} {resource === "programs" ? "chương trình" : resource === "news" ? "bài viết" : "đề thi"}</h2></div></div><form className="cms-editor-layout" onSubmit={save}><div className="cms-panel cms-editor"><label><span>Tiêu đề</span><input value={field("title")} onChange={(event) => set("title",event.target.value)} required /></label><label><span>Slug</span><input value={field("slug")} onChange={(event) => set("slug",event.target.value)} required /></label><div className="cms-form-grid"><label><span>Danh mục</span><CustomSelect className="custom-select--full" value={field("category",resource === "news" ? "Thông báo" : "union")} onValueChange={(value) => set("category",value)} options={resource === "news" ? [{value:"Thông báo",label:"Thông báo"},{value:"Hoạt động",label:"Hoạt động"},{value:"Chuyên môn",label:"Chuyên môn"}] : [{value:"union",label:"Công tác công đoàn"},{value:"pedagogy",label:"Chuyên môn giáo dục"},{value:"management",label:"Quản lý giáo dục"}]} /></label><label><span>Trạng thái</span><CustomSelect className="custom-select--full" value={field("status","draft")} onValueChange={(value) => set("status",value)} options={resource === "programs" ? [{value:"draft",label:"Bản nháp"},{value:"recruiting",label:"Đang tuyển"},{value:"closed",label:"Đã đóng"}] : resource === "news" ? [{value:"draft",label:"Bản nháp"},{value:"published",label:"Đã đăng"}] : [{value:"draft",label:"Bản nháp"},{value:"active",label:"Đang mở"},{value:"closed",label:"Đã đóng"}]} /></label></div><label><span>Mô tả ngắn</span><textarea rows={3} value={field("summary")} onChange={(event) => set("summary",event.target.value)} required /></label>{resource === "programs" && <><label><span>Đối tượng</span><textarea value={field("audience")} onChange={(event) => set("audience",event.target.value)} /></label><label><span>Thời lượng</span><input value={field("duration")} onChange={(event) => set("duration",event.target.value)} /></label></>}{resource === "exams" && <label><span>Thời gian (phút)</span><input type="number" min={1} max={240} value={String(data.duration_minutes ?? data.durationMinutes ?? 45)} onChange={(event) => set("durationMinutes",Number(event.target.value))} /></label>}<label><span>Nội dung chi tiết</span><textarea className="rich-editor" rows={12} value={field(resource === "news" ? "content" : "description")} onChange={(event) => set(resource === "news" ? "content" : "description",event.target.value)} /></label></div><aside className="cms-panel cms-publish"><h3>Xuất bản</h3>{error && <p className="form-error">{error}</p>}<button className="primary" disabled={saving} type="submit"><Save />{saving ? "Đang lưu..." : "Lưu thay đổi"}</button>{id && <button className="danger" type="button" onClick={() => void remove()}>Xóa nội dung</button>}</aside></form></>;
}

function MediaPage() {
  const [items,setItems] = useState<Array<Record<string,unknown>>>([]); const [error,setError] = useState("");
  const load = () => void getResource("media").then((data) => setItems(data.items)).catch((reason) => setError(reason instanceof Error ? reason.message : "Không thể tải media."));
  useEffect(load, []);
  return <><div className="cms-heading"><div><p>Quản lý tệp lưu trên hệ thống</p><h2>Thư viện media</h2></div><label className="primary"><Upload />Tải tệp lên<input className="sr-only" type="file" accept="image/*,.pdf" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadMedia(file).then(load).catch((reason) => setError(reason instanceof Error ? reason.message : "Không thể tải tệp.")); }} /></label></div>{error && <p className="form-error">{error}</p>}<div className="media-grid">{items.map((item) => <article key={String(item.id)}>{String(item.mime_type).startsWith("image/") ? <img src={mediaUrl(String(item.id))} alt="" /> : <FileText size={64} />}<div><b>{String(item.original_name)}</b><small>{String(item.mime_type)} · {Math.round(Number(item.size_bytes)/1024)} KB</small></div></article>)}</div></>;
}

function SettingsPage() {
  const [data,setData] = useState({ name:"",taxCode:"",phone:"",email:"",address:"" }); const [message,setMessage] = useState("");
  useEffect(() => { void getResource("settings").then((result) => { const org = result.items.find((item) => item.key === "organization")?.value as typeof data | undefined; if (org) setData(org); }); }, []);
  const save = async (event: FormEvent) => { event.preventDefault(); setMessage(""); try { await updateOrganization(data); setMessage("Đã lưu cấu hình."); } catch (reason) { setMessage(reason instanceof Error ? reason.message : "Không thể lưu."); } };
  return <><div className="cms-heading"><div><p>Thông tin đơn vị và cấu hình chung</p><h2>Cài đặt hệ thống</h2></div></div><form className="cms-panel settings-form" onSubmit={save}><h3>Thông tin đơn vị</h3><div className="cms-form-grid">{[["name","Tên đơn vị"],["taxCode","Mã số thuế"],["phone","Số điện thoại"],["email","Email"]].map(([key,label]) => <label key={key}><span>{label}</span><input type={key === "email" ? "email" : "text"} value={data[key as keyof typeof data]} onChange={(event) => setData((current) => ({...current,[key]:event.target.value}))} required /></label>)}</div><label><span>Địa chỉ</span><textarea rows={3} value={data.address} onChange={(event) => setData((current) => ({...current,address:event.target.value}))} required /></label>{message && <p>{message}</p>}<button className="primary" type="submit"><Save />Lưu thay đổi</button></form></>;
}

function resolveView(pathname: string) {
  const detail = pathname.match(/^\/cms\/(registrations|applications)\/([^/]+)$/); if (detail) return [detail[1] === "applications" ? "Hồ sơ" : "Đăng ký học", <DetailPage resource={detail[1] as "registrations"|"applications"} id={detail[2]} />] as const;
  const editor = pathname.match(/^\/cms\/(programs|news|exams)\/edit$/); if (editor) return ["Chỉnh sửa", <EditorPage resource={editor[1] as EditorResource} />] as const;
  const resource = pathname.match(/^\/cms\/(programs|registrations|applications|exams|questions|news|users)$/); if (resource) return [resourceConfig[resource[1] as ResourceName].title, <ResourceList resource={resource[1] as ResourceName} />] as const;
  if (pathname === "/cms/media") return ["Thư viện", <MediaPage />] as const;
  if (pathname === "/cms/settings") return ["Cấu hình", <SettingsPage />] as const;
  return ["Tổng quan", <Dashboard />] as const;
}

export function CmsApp() {
  const { pathname } = useLocation(); const navigate = useNavigate(); const [menu,setMenu] = useState(false); const [user,setUser] = useState<CmsUser>(); const [checking,setChecking] = useState(true);
  const isLogin = pathname === "/cms" || pathname === "/cms/login";
  useEffect(() => { if (isLogin) { setChecking(false); return; } if (!hasCmsToken()) { navigate("/cms/login"); setChecking(false); return; } void getCmsUser().then((result) => setUser(result.user)).catch(() => { cmsLogout(); navigate("/cms/login"); }).finally(() => setChecking(false)); }, [isLogin,navigate]);
  const view = useMemo(() => resolveView(pathname), [pathname]);
  if (isLogin) return <Login />;
  if (checking) return <p className="cms-content">Đang xác thực phiên quản trị...</p>;
  return <div className="cms-shell"><CmsSidebar open={menu} onClose={() => setMenu(false)} /><div className="cms-main"><CmsHeader title={view[0]} user={user} onMenu={() => setMenu(true)} onLogout={() => { cmsLogout(); navigate("/cms/login"); }} /><div className="cms-content">{view[1]}</div></div>{menu && <button className="cms-backdrop" aria-label="Đóng menu" onClick={() => setMenu(false)} />}</div>;
}
