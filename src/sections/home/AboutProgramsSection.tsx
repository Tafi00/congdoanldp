import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MapPinned,
  MonitorUp,
  Target,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { assets } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import "./AboutProgramsSection.css";

type Metric = {
  icon: LucideIcon;
  value: string;
  label: string;
};

type Program = {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
};

const metrics: Metric[] = [
  { icon: Target, value: "03", label: "Lĩnh vực trọng tâm" },
  { icon: MapPinned, value: "Toàn quốc", label: "Phạm vi đào tạo" },
  { icon: MonitorUp, value: "Linh hoạt", label: "Trực tuyến & trực tiếp" },
];

const programs: Program[] = [
  {
    icon: UsersRound,
    title: "Nghiệp vụ công đoàn",
    description: "Bồi dưỡng kỹ năng tổ chức, quản lý và hoạt động công đoàn.",
    to: "/chuong-trinh/nghiep-vu-cong-doan",
  },
  {
    icon: BookOpen,
    title: "Nghiệp vụ sư phạm",
    description: "Cập nhật phương pháp giảng dạy và năng lực nghề nghiệp.",
    to: "/chuong-trinh/nghiep-vu-su-pham",
  },
  {
    icon: GraduationCap,
    title: "Quản lý giáo dục",
    description: "Nâng cao năng lực quản trị cho cán bộ quản lý giáo dục.",
    to: "/chuong-trinh/quan-ly-giao-duc",
  },
];

export function AboutProgramsSection() {
  return (
    <section
      id="gioi-thieu"
      className="about-programs"
      style={{ backgroundImage: `url(${assets.lightSectionBackground})` }}
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="about-programs__top">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <SectionHeading
              eyebrow="Về nhà trường"
              title={
                <span id="about-title">
                  Nơi bồi dưỡng đội ngũ giáo dục và cán bộ công đoàn
                </span>
              }
              description="Trường là đơn vị sự nghiệp trực thuộc Công đoàn Giáo dục Việt Nam, thực hiện đào tạo, bồi dưỡng chuyên môn, nghiệp vụ sư phạm, quản lý giáo dục và công tác công đoàn."
            />
            <Link className="about-programs__learn-more" to="/gioi-thieu">
              Tìm hiểu về nhà trường <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            className="metric-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {metrics.map(({ icon: Icon, value, label }) => (
              <motion.article key={label} className="metric-card" variants={fadeUp}>
                <span className="metric-card__icon">
                  <Icon size={31} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <strong>{value}</strong>
                <span>{label}</span>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="featured-programs"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p className="featured-programs__label" variants={fadeUp}>
            Chương trình nổi bật
          </motion.p>
          <div className="program-grid">
            {programs.map(({ icon: Icon, title, description, to }) => (
              <motion.article className="program-card" key={title} variants={fadeUp}>
                <span className="program-card__accent" />
                <img
                  className="program-card__swoosh"
                  src={assets.brandSwooshDecoration}
                  alt=""
                  aria-hidden="true"
                />
                <span className="program-card__icon">
                  <Icon size={37} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="heading-3">{title}</h3>
                <p>{description}</p>
                <span className="program-card__status">
                  <UsersRound size={16} /> Đang tuyển sinh
                </span>
                <Link className="program-card__link" to={to} aria-label={`Xem ${title}`}>
                  Xem chi tiết <ArrowRight size={18} />
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
