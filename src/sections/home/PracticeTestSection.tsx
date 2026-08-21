import { useEffect, useState } from "react";
import { BarChart3, BookOpenCheck, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";
import { assets } from "../../data/assets";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import { getPracticeQuestions } from "../../data/practiceTests";
import "./PracticeTestSection.css";

const features = [
  { icon: Clock3, title: "Chấm điểm tức thì" },
  { icon: BookOpenCheck, title: "Xem đáp án và giải thích" },
  { icon: BarChart3, title: "Lưu lịch sử kết quả" },
];

const previewQuestions = getPracticeQuestions("nghiep-vu-cong-doan-01");

export function PracticeTestSection() {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [remainingSeconds, setRemainingSeconds] = useState(45 * 60);
  useEffect(() => {
    const timer = window.setInterval(
      () => setRemainingSeconds((seconds) => Math.max(0, seconds - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);
  const preview = previewQuestions[currentQuestion - 1];
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
            <span>
              Câu {String(currentQuestion).padStart(2, "0")}/
              {String(previewQuestions.length).padStart(2, "0")}
            </span>
            <i />
            <span>
              <Clock3 size={17} />
              {String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:
              {String(remainingSeconds % 60).padStart(2, "0")}
            </span>
          </div>
          <h3>{preview.prompt}</h3>
          <div className="practice-demo__answers">
            {preview.answers.map((answer, index) => (
              <button
                aria-pressed={selectedAnswers[currentQuestion] === index}
                className={
                  selectedAnswers[currentQuestion] === index
                    ? "is-selected"
                    : ""
                }
                key={answer}
                onClick={() =>
                  setSelectedAnswers((answersByQuestion) => ({
                    ...answersByQuestion,
                    [currentQuestion]: index,
                  }))
                }
                type="button"
              >
                <i />
                {answer}
              </button>
            ))}
          </div>
          <div className="practice-demo__foot">
            <div>
              {previewQuestions
                .map((_, index) => index + 1)
                .map((n) => (
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
                  current === previewQuestions.length ? 1 : current + 1,
                )
              }
              type="button"
            >
              Câu tiếp theo →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
