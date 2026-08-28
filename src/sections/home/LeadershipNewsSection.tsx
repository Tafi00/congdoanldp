import { ArrowUpRight, BookOpenCheck, CalendarDays, Handshake, UserRoundCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { assets } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import "./LeadershipNewsSection.css";

const articleUrl =
  "https://giaoducthoidai.vn/truong-cong-doan-giao-duc-viet-nam-co-ban-giam-hieu-moi-post789017.html";

const milestones = [
  {
    icon: UserRoundCheck,
    title: "Ban giám hiệu mới",
    text: "Th.S Hồ Như Duyến được bổ nhiệm làm Hiệu trưởng nhà trường.",
  },
  {
    icon: BookOpenCheck,
    title: "Khởi động đào tạo",
    text: "Mở đầu chặng đường đổi mới hoạt động đào tạo và bồi dưỡng.",
  },
  {
    icon: Handshake,
    title: "Mở rộng hợp tác",
    text: "Tăng cường kết nối với các đơn vị để xây dựng mô hình hiện đại.",
  },
];

export function LeadershipNewsSection() {
  return (
    <section className="leadership-news" aria-labelledby="leadership-news-title">
      <div className="container leadership-news__inner">
        <motion.div
          className="leadership-news__copy"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow="Dấu mốc mới · 21.08.2026"
              title={
                <span id="leadership-news-title">
                  Trường Công đoàn Giáo dục Việt Nam có Ban giám hiệu mới
                </span>
              }
              description="Lễ khởi động lại hoạt động đào tạo mở ra chặng đường chuyển mình, hướng tới mô hình bồi dưỡng hiện đại và đáp ứng tốt hơn yêu cầu của ngành Giáo dục, tổ chức Công đoàn."
            />
          </motion.div>

          <motion.div className="leadership-news__meta" variants={fadeUp}>
            <CalendarDays size={17} aria-hidden="true" />
            <span>TP. Hồ Chí Minh · 21 tháng 8, 2026</span>
          </motion.div>

          <motion.a
            className="leadership-news__link"
            href={articleUrl}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
          >
            Đọc bài viết trên Giáo dục &amp; Thời đại <ArrowUpRight size={18} aria-hidden="true" />
          </motion.a>
        </motion.div>

        <motion.figure
          className="leadership-news__collage"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="leadership-news__image-main">
            <img
              src={assets.articleSchool01}
              alt="Tập thể Ban giám hiệu và lãnh đạo các phòng ban nhà trường ra mắt"
            />
            <span className="leadership-news__image-badge">Tin nổi bật</span>
          </div>
          <div className="leadership-news__image-secondary leadership-news__image-secondary--top">
            <img src={assets.articleSchool02} alt="Đại diện nhà trường phát biểu tại buổi lễ" />
          </div>
          <div className="leadership-news__image-secondary leadership-news__image-secondary--bottom">
            <img src={assets.articleSchool05} alt="Lễ ký kết hợp tác tại chương trình" />
          </div>
          <figcaption>Ảnh: Báo Giáo dục &amp; Thời đại</figcaption>
        </motion.figure>
      </div>

      <div className="container leadership-news__milestones" aria-label="Các điểm nhấn của sự kiện">
        {milestones.map(({ icon: Icon, title, text }, index) => (
          <motion.article
            className="leadership-news__milestone"
            key={title}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ delay: index * 0.08 }}
          >
            <span className="leadership-news__milestone-index">0{index + 1}</span>
            <span className="leadership-news__milestone-icon">
              <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
