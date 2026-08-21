import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  MapPin,
  MonitorUp,
  Search,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { assets } from "../data/assets";
import "./InformationPages.css";

const news = [
  {
    slug: "huong-dan-nop-ho-so-truc-tuyen",
    image: assets.newsOnlineApplication,
    tag: "Thông báo",
    title: "Hướng dẫn nộp hồ sơ trực tuyến",
    text: "Các bước chuẩn bị và gửi hồ sơ trên hệ thống.",
  },
  {
    slug: "hoat-dong-boi-duong-nghiep-vu-cong-doan",
    image: assets.trainingClassroom,
    tag: "Hoạt động",
    title: "Hoạt động bồi dưỡng nghiệp vụ công đoàn",
    text: "Thông tin về hoạt động đào tạo và bồi dưỡng.",
  },
  {
    slug: "cap-nhat-noi-dung-chuyen-mon-giao-duc",
    image: assets.newsEducationContent,
    tag: "Chuyên môn",
    title: "Cập nhật nội dung chuyên môn giáo dục",
    text: "Tổng hợp nội dung phục vụ công tác chuyên môn.",
  },
  {
    slug: "lich-khai-giang-cac-chuong-trinh-boi-duong",
    image: assets.newsFeatureEnrollment,
    tag: "Thông báo",
    title: "Lịch khai giảng các chương trình bồi dưỡng",
    text: "Cập nhật thời gian dự kiến và hướng dẫn xác nhận tham gia.",
  },
  {
    slug: "hoi-thao-doi-moi-hoat-dong-cong-doan",
    image: assets.trainingClassroom,
    tag: "Hoạt động",
    title: "Hội thảo đổi mới hoạt động công đoàn",
    text: "Chia sẻ kinh nghiệm tổ chức hoạt động trong ngành giáo dục.",
  },
  {
    slug: "tai-lieu-quan-ly-giao-duc-cap-nhat",
    image: assets.newsEducationContent,
    tag: "Chuyên môn",
    title: "Tài liệu quản lý giáo dục cập nhật",
    text: "Nguồn tài liệu tham khảo dành cho cán bộ quản lý giáo dục.",
  },
];

const newsCategories = ["Tất cả", "Thông báo", "Hoạt động", "Chuyên môn"];
const newsPerPage = 3;

function Crumbs({ detail = false }: { detail?: boolean }) {
  return (
    <p className="info-crumb">
      <Link to="/">Trang chủ</Link> <span>/</span>{" "}
      <Link to={detail ? "/tin-tuc" : "/gioi-thieu"}>
        {detail ? "Tin tức" : "Giới thiệu"}
      </Link>
      {detail && (
        <>
          <span>/</span>
          <b>Chi tiết</b>
        </>
      )}
    </p>
  );
}

export function AboutPage() {
  return (
    <>
      <section className="about-top">
        <div className="container about-top__grid">
          <div>
            <Crumbs />
            <p className="info-kicker">VỀ NHÀ TRƯỜNG</p>
            <h1>
              Đào tạo và bồi dưỡng vì sự
              <br />
              phát triển của đội ngũ giáo dục
            </h1>
            <p>
              Trường là đơn vị sự nghiệp trực thuộc
              <br />
              Công đoàn Giáo dục Việt Nam.
            </p>
          </div>
          <div className="about-top__photo">
            <img src={assets.heroEducators} alt="Đội ngũ cán bộ giáo dục" />
          </div>
        </div>
      </section>
      <section className="about-body">
        <div className="container">
          <div className="about-cards">
            <article>
              <i>
                <GraduationCap />
              </i>
              <div>
                <h2>Chức năng</h2>
                <p>
                  Đào tạo, bồi dưỡng đội ngũ cán bộ, công chức, viên chức trong
                  hệ thống công đoàn và ngành giáo dục; bồi dưỡng chuyên môn,
                  nghiệp vụ sư phạm và quản lý giáo dục.
                </p>
              </div>
            </article>
            <article>
              <i>
                <Users />
              </i>
              <div>
                <h2>Đối tượng bồi dưỡng</h2>
                <p>
                  Cán bộ công đoàn ngành địa phương, cán bộ công đoàn các cấp,
                  giáo viên và cán bộ quản lý giáo dục.
                </p>
              </div>
            </article>
          </div>
          <article className="unit-card">
            <h2>Thông tin đơn vị</h2>
            <div>
              <span>
                <FileText />
                Mã số thuế: 0301453684
              </span>
              <span>
                <MapPin />
                205 Võ Thị Sáu, Phường Xuân Hoà,
                <br />
                Thành phố Hồ Chí Minh, Việt Nam
              </span>
              <Link to="/chuong-trinh">
                Xem chương trình đào tạo <ArrowRight />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export function NewsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const filteredNews = news.filter(
    (item) =>
      (category === "Tất cả" || item.tag === category) &&
      (item.title + item.text)
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const pageCount = Math.max(1, Math.ceil(filteredNews.length / newsPerPage));
  const shownNews = filteredNews.slice(
    (page - 1) * newsPerPage,
    page * newsPerPage,
  );

  return (
    <>
      <section className="news-hero">
        <div className="container">
          <p className="info-crumb">
            <Link to="/">Trang chủ</Link> <span>/</span> <b>Tin tức</b>
          </p>
          <div className="news-hero__main">
            <div className="news-hero__copy">
              <p className="info-kicker">TIN TỨC & THÔNG BÁO</p>
              <h1>Cập nhật thông tin từ nhà trường</h1>
              <p>
                Theo dõi thông báo tuyển sinh, hoạt động bồi dưỡng
                <br />
                và thông tin chuyên môn.
              </p>
            </div>
            <div className="news-hero__visual" aria-hidden="true">
              <img src={assets.newsFeatureEnrollment} alt="" />
            </div>
          </div>
          <article className="featured-strip">
            <div>
              <small>Thông báo</small>
              <h2>Thông tin tuyển sinh các chương trình bồi dưỡng</h2>
              <p>
                Cập nhật nội dung và hướng dẫn đăng ký chương trình
                <br />
                dành cho cán bộ, giáo viên và cán bộ quản lý giáo dục.
              </p>
            </div>
            <img
              src={assets.newsFeatureEnrollment}
              alt="Tư vấn chương trình bồi dưỡng"
            />
          </article>
        </div>
      </section>
      <section className="news-list">
        <div className="container">
          <div className="news-tools">
            <label>
              <Search />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Tìm kiếm tin tức"
              />
            </label>
            <div role="group" aria-label="Lọc tin tức">
              {newsCategories.map((item) => (
                <button
                  type="button"
                  aria-pressed={category === item}
                  className={category === item ? "active" : ""}
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setPage(1);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="news-cards">
            {shownNews.map((item) => (
              <article key={item.slug}>
                <img src={item.image} alt="" />
                <div>
                  <small>{item.tag}</small>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                  <Link to={`/tin-tuc/${item.slug}`}>
                    Xem chi tiết <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
            {shownNews.length === 0 && (
              <p className="news-empty">Không tìm thấy tin tức phù hợp.</p>
            )}
          </div>
          <nav className="news-pages" aria-label="Phân trang tin tức">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  type="button"
                  aria-current={page === pageNumber ? "page" : undefined}
                  className={page === pageNumber ? "active" : ""}
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                >
                  {String(pageNumber).padStart(2, "0")}
                </button>
              ),
            )}
            <button
              type="button"
              disabled={page === pageCount}
              onClick={() =>
                setPage((current) => Math.min(pageCount, current + 1))
              }
            >
              Tiếp theo <ArrowRight />
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}

export function NewsDetailPage() {
  const { slug } = useParams();
  const currentNews = news.find((item) => item.slug === slug);
  if (!currentNews) {
    return (
      <section className="detail-head">
        <div className="container">
          <Crumbs detail />
          <h1>Không tìm thấy bài viết</h1>
          <p>Nội dung không tồn tại hoặc đã được di chuyển.</p>
          <Link to="/tin-tuc">Quay lại danh sách tin tức</Link>
        </div>
      </section>
    );
  }
  const relatedNews = news
    .filter((item) => item.slug !== currentNews.slug)
    .slice(0, 3);

  return (
    <>
      <section className="detail-head">
        <div className="container">
          <Crumbs detail />
          <p className="info-kicker">{currentNews.tag}</p>
          <h1>{currentNews.title}</h1>
          <p>{currentNews.text}</p>
        </div>
      </section>
      <section className="detail-content">
        <div className="container detail-grid">
          <main>
            <img src={currentNews.image} alt={currentNews.title} />
            <h2>Các lĩnh vực bồi dưỡng</h2>
            <p>
              Nhà trường tổ chức các chương trình tập trung vào nghiệp vụ công
              đoàn, nghiệp vụ sư phạm và quản lý giáo dục.
            </p>
            <ul>
              <li>Nghiệp vụ công đoàn</li>
              <li>Nghiệp vụ sư phạm</li>
              <li>Quản lý giáo dục</li>
            </ul>
            <h2>Cách đăng ký</h2>
            <p>
              Người học lựa chọn chương trình, gửi thông tin đăng ký và hoàn
              thiện hồ sơ trực tuyến trên hệ thống.
            </p>
          </main>
          <aside>
            <h2>Tin liên quan</h2>
            {relatedNews.map((item, index) => {
              const Icon = [MonitorUp, Users, BookOpen][index];
              return (
                <Link to={`/tin-tuc/${item.slug}`} key={item.slug}>
                  <i>
                    <Icon />
                  </i>
                  <span>{item.title}</span>
                  <ArrowRight />
                </Link>
              );
            })}
          </aside>
        </div>
        <div className="container detail-cta">
          <span>Quan tâm đến chương trình bồi dưỡng?</span>
          <Link to="/dang-ky">
            Đăng ký chương trình <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
