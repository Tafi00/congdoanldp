import { motion } from "framer-motion";
import { ArrowDown, UsersRound } from "lucide-react";
import { assets } from "../../data/assets";
import { fadeUp, stagger } from "../../lib/motion";
import { Button } from "../../components/ui/Button";
import "./HeroSection.css";

export function HeroSection() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${assets.heroBackground})` }}
      aria-labelledby="hero-title"
    >
      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero__kicker" variants={fadeUp}>
            <span>Đào tạo</span>
            <i />
            <span>Bồi dưỡng</span>
            <i />
            <span>Phát triển</span>
          </motion.p>

          <motion.h1 id="hero-title" className="display hero__title" variants={fadeUp}>
            Bồi dưỡng năng lực –<br />{" "}
            Vững bước sự nghiệp giáo dục
          </motion.h1>

          <motion.p className="lead hero__description" variants={fadeUp}>
            Nâng cao chuyên môn, nghiệp vụ công đoàn, sư phạm và quản lý giáo dục
            cho đội ngũ cán bộ, giáo viên trên toàn quốc.
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp}>
            <Button href="/dang-ky" arrow>
              Đăng ký chương trình
            </Button>
            <Button href="/nop-ho-so" variant="secondary">
              Nộp hồ sơ trực tuyến
            </Button>
          </motion.div>

          <motion.div className="hero__trust" variants={fadeUp}>
            <span className="hero__trust-icon">
              <UsersRound size={23} aria-hidden="true" />
            </span>
            <span>Đơn vị trực thuộc Công đoàn Giáo dục Việt Nam</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, x: 48, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero__orb hero__orb--one"
            animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="hero__orb hero__orb--two"
            animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <img
            className="hero__people"
            src={assets.heroEducators}
            alt="Nhóm cán bộ và giáo viên cùng trao đổi chương trình bồi dưỡng"
          />
        </motion.div>
      </div>

      <a className="hero__scroll" href="#gioi-thieu" aria-label="Xem phần giới thiệu">
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
