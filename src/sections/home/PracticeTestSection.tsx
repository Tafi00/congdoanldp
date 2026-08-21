import { BarChart3, BookOpenCheck, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";
import { assets } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import "./PracticeTestSection.css";

const features = [
  { icon: Clock3, title: "Chấm điểm tức thì" },
  { icon: BookOpenCheck, title: "Xem đáp án và giải thích" },
  { icon: BarChart3, title: "Lưu lịch sử kết quả" },
];

const mockAnswers = [
  {
    text: "Bảo vệ quyền và lợi ích hợp pháp của người lao động",
    isSelected: true,
  },
  { text: "Quản lý ngân sách nhà nước", isSelected: false },
  { text: "Cấp văn bằng đào tạo", isSelected: false },
  { text: "Ban hành chương trình giáo dục", isSelected: false },
];

export function PracticeTestSection() {
  return (
    <section
      id="thi-thu"
      className="practice-section"
      style={{ backgroundImage: `url(${assets.lightSectionBackground})` }}
      aria-labelledby="practice-title"
    >
      <div className="container practice-section__layout">
        <motion.div
          className="practice-copy"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            Thi thử trực tuyến
          </motion.p>
          <motion.h2
            id="practice-title"
            className="heading-2"
            variants={fadeUp}
          >
            Làm quen cấu trúc đề,
            <br /> tự tin trước mỗi kỳ đánh giá
          </motion.h2>
          <motion.p className="lead" variants={fadeUp}>
            Kiểm tra kiến thức, nhận kết quả ngay và ôn tập theo từng nhóm nội
            dung.
          </motion.p>
          <motion.div className="practice-features" variants={stagger}>
            {features.map(({ icon: Icon, title }) => (
              <motion.div key={title} variants={fadeUp}>
                <span>
                  <Icon size={24} />
                </span>
                <b>{title}</b>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="practice-actions" variants={fadeUp}>
            <Button href="/thi-thu">Bắt đầu thi thử</Button>
            <a href="/thi-thu">Xem ngân hàng đề →</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="practice-demo"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="practice-demo__head">
            <b>Nghiệp vụ công đoàn – Đề tổng hợp</b>
            <span>Câu 01/05</span>
            <i />
            <span>
              <Clock3 size={17} />
              44:01
            </span>
          </div>
          <h3>Nội dung nào thuộc chức năng đại diện của tổ chức công đoàn?</h3>
          <div className="practice-demo__answers">
            {mockAnswers.map(({ text, isSelected }) => (
              <div
                className={`practice-demo__option ${isSelected ? "is-selected" : ""}`}
                key={text}
              >
                <i />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="practice-demo__foot">
            <div>
              {["01", "02", "03", "04", "05"].map((n, index) => (
                <span className={index === 0 ? "active" : ""} key={n}>
                  {n}
                </span>
              ))}
            </div>
            <span className="practice-demo__next-btn">
              Câu tiếp theo →
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
