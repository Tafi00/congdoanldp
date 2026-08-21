import { ArrowRight, FileText, MapPin } from "lucide-react";
import { assets } from "../../data/assets";
import "./SiteFooter.css";

const LinkColumn = ({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) => (
  <div className="site-footer__links">
    <h2>{title}</h2>
    <nav aria-label={title}>
      {links.map(([label, href]) => (
        <a href={href} key={label}>
          {label}
          <ArrowRight size={15} />
        </a>
      ))}
    </nav>
  </div>
);

export function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{ backgroundImage: `url(${assets.footerBackground})` }}
    >
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src={assets.logo} alt="" />
          <strong>
            Trường Công đoàn
            <br />
            Giáo dục Việt Nam
          </strong>
          <i />
          <p>
            Đơn vị sự nghiệp trực thuộc
            <br />
            Công đoàn Giáo dục Việt Nam.
          </p>
        </div>
        <LinkColumn
          title="Khám phá"
          links={[
            ["Giới thiệu", "/gioi-thieu"],
            ["Chương trình đào tạo", "/chuong-trinh"],
            ["Tin tức", "/tin-tuc"],
          ]}
        />
        <LinkColumn
          title="Dịch vụ trực tuyến"
          links={[
            ["Đăng ký học", "/dang-ky"],
            ["Nộp hồ sơ", "/nop-ho-so"],
            ["Thi thử", "/thi-thu"],
          ]}
        />
        <div className="site-footer__contact">
          <h2>Thông tin liên hệ</h2>
          <span>
            <i>
              <FileText size={19} />
            </i>
            <span>Mã số thuế: 0301453684</span>
          </span>
          <span>
            <i>
              <MapPin size={19} />
            </i>
            <span>
              205 Võ Thị Sáu, Phường Xuân Hoà,
              <br />
              Thành phố Hồ Chí Minh, Việt Nam
            </span>
          </span>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© 2026 Trường Công đoàn Giáo dục Việt Nam</span>
        <div>
          <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
          <i />
          <a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a>
        </div>
      </div>
    </footer>
  );
}
