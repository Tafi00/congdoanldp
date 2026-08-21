import { useState } from "react";
import { BarChart3, BookOpenCheck, CheckCircle2, Clock3 } from "lucide-react";
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

const answers = [
  "Bảo vệ quyền lợi người lao động",
  "Quản lý ngân sách nhà nước",
  "Cấp văn bằng đào tạo",
  "Ban hành chương trình giáo dục",
];

export function PracticeTestSection() {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(8);
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
            Làm quen cấu trúc đề, tự tin trước mỗi kỳ đánh giá
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
            <span>Câu {String(currentQuestion).padStart(2, "0")}/40</span>
            <i />
            <span>
              <Clock3 size={17} />
              38:24
            </span>
          </div>
          <h3>Nội dung nào thuộc chức năng đại diện của tổ chức công đoàn?</h3>
          <div className="practice-demo__answers">
            {answers.map((answer, index) => (
              <button
                aria-pressed={selectedAnswer === index}
                className={selectedAnswer === index ? "is-selected" : ""}
                key={answer}
                onClick={() => setSelectedAnswer(index)}
                type="button"
              >
                <i />
                {answer}
              </button>
            ))}
          </div>
          <div className="practice-demo__foot">
            <div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <button
                  aria-current={n === currentQuestion ? "step" : undefined}
                  className={n === currentQuestion ? "active" : ""}
                  key={n}
                  onClick={() => setCurrentQuestion(n)}
                  type="button"
                >
                  {String(n).padStart(2, "0")}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentQuestion((current) =>
                  current === 8 ? 1 : current + 1,
                )
              }
              type="button"
            >
              Câu tiếp theo →
            </button>
          </div>
          <aside className="practice-result">
            <div>
              <b>Kết quả gần nhất</b>
              <BarChart3 size={20} />
            </div>
            <strong>
              32<small>/40</small>
            </strong>
            <span>
              <CheckCircle2 size={18} />
              Hoàn thành tốt
            </span>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
