import { FileText, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";
import { assets } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import "./HomeCtaSection.css";

export function HomeCtaSection() {
  return (
    <section className="home-cta">
      <motion.div
        className="container home-cta__panel"
        style={{ backgroundImage: `url(${assets.ctaBannerBackground})` }}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger}
      >
        <motion.span className="home-cta__icon" variants={fadeUp}>
          <GraduationCap size={48} />
        </motion.span>
        <motion.div variants={fadeUp}>
          <h2>Sẵn sàng nâng cao năng lực chuyên môn?</h2>
          <p>
            Chọn chương trình phù hợp và bắt đầu hành trình học tập cùng nhà
            trường.
          </p>
        </motion.div>
        <motion.div className="home-cta__actions" variants={fadeUp}>
          <Button href="/dang-ky" variant="accent">
            Đăng ký chương trình →
          </Button>
          <Button href="/nop-ho-so" variant="secondary">
            <FileText size={19} /> Nộp hồ sơ trực tuyến →
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
