import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bookmark,
  Check,
  CheckCircle2,
  CircleX,
  Clock3,
  GraduationCap,
  LogOut,
  Search,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../data/assets";
import { CustomSelect } from "../components/ui/CustomSelect";
import "./PracticeTestPages.css";
import "./PracticeCorrections.css";

const question = "Nội dung nào thuộc chức năng đại diện của tổ chức công đoàn?";
const answers = [
  "Bảo vệ quyền và lợi ích hợp pháp của người lao động",
  "Quản lý ngân sách nhà nước",
  "Cấp văn bằng đào tạo",
  "Ban hành chương trình giáo dục",
];
const tests = [
  {
    id: "nghiep-vu-cong-doan-01",
    category: "union",
    icon: Users,
    tag: "Nghiệp vụ công đoàn",
    title: "Đề tổng hợp số 01",
    text: "Kiểm tra kiến thức nền tảng và kỹ năng xử lý tình huống.",
    status: "Chưa làm",
    action: "Bắt đầu làm bài",
    tone: "new",
  },
  {
    id: "nghiep-vu-su-pham-01",
    category: "pedagogy",
    icon: BookOpen,
    tag: "Nghiệp vụ sư phạm",
    title: "Đề ôn tập số 01",
    text: "Ôn tập phương pháp giảng dạy và năng lực nghề nghiệp.",
    status: "Đang làm  •  18/40",
    action: "Tiếp tục",
    tone: "doing",
  },
  {
    id: "quan-ly-giao-duc-01",
    category: "management",
    icon: GraduationCap,
    tag: "Quản lý giáo dục",
    title: "Đề đánh giá số 01",
    text: "Đánh giá kiến thức quản trị và tổ chức hoạt động giáo dục.",
    status: "Đã hoàn thành  •  32/40",
    action: "Làm lại",
    tone: "done",
  },
];

const wrongQuestions = new Set([9, 20, 36]);

function FocusHeader({ review = false }: { review?: boolean }) {
  return (
    <header className="focus-header">
      <Link to="/" className="focus-brand">
        <img src={assets.logo} alt="" />
        <b>TRƯỜNG CÔNG ĐOÀN GIÁO DỤC VIỆT NAM</b>
      </Link>
      <h1>Nghiệp vụ công đoàn – Đề tổng hợp số 01</h1>
      {review ? (
        <Link
          to="/thi-thu/nghiep-vu-cong-doan-01/ket-qua"
          className="focus-back"
        >
          <ArrowLeft /> Quay lại kết quả
        </Link>
      ) : (
        <div className="focus-time">
          <Clock3 />
          <span>
            Thời gian còn lại<strong>38:24</strong>
          </span>
          <Link to="/thi-thu">
            <LogOut />
            Thoát
          </Link>
        </div>
      )}
    </header>
  );
}

export function PracticeBankPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const shownTests = tests
    .filter((test) =>
      (test.title + test.tag)
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .sort((first, second) => {
      if (sort === "progress") {
        return Number(second.tone === "doing") - Number(first.tone === "doing");
      }
      if (sort === "completed") {
        return Number(second.tone === "done") - Number(first.tone === "done");
      }
      return 0;
    });
  return (
    <div className="bank-page">
      <section className="bank-hero">
        <div className="container bank-hero__grid">
          <div>
            <p className="bank-breadcrumb">
              Trang chủ <span>/</span> <b>Thi thử</b>
            </p>
            <p className="bank-kicker">
              <i />
              NGÂN HÀNG ĐỀ
            </p>
            <h1>Thi thử trực tuyến</h1>
            <p>
              Chọn đề phù hợp, làm bài trực tuyến và nhận kết quả
              <br />
              ngay sau khi hoàn thành.
            </p>
          </div>
          <div className="latest-result">
            <h2>
              Kết quả gần nhất <BarChart3 />
            </h2>
            <div>
              <strong>
                32<small>/40</small>
              </strong>
              <span />
              <Link to="/thi-thu/nghiep-vu-cong-doan-01/ket-qua">
                Xem lịch sử <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bank-content">
        <div className="container">
          <div className="bank-tools">
            <label>
              <Search />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm đề thi"
              />
            </label>
            <CustomSelect
              className="custom-select--compact"
              ariaLabel="Sắp xếp đề thi"
              value={sort}
              onValueChange={setSort}
              options={[
                { value: "newest", label: "Mới nhất" },
                { value: "progress", label: "Đang làm" },
                { value: "completed", label: "Đã hoàn thành" },
              ]}
            />
          </div>
          <div className="bank-grid">
            {shownTests.map(({ icon: Icon, ...test }) => (
              <article className={`bank-card ${test.tone}`} key={test.title}>
                <div className="bank-card__intro">
                  <span className="bank-card__icon">
                    <Icon />
                  </span>
                  <div>
                    <small>{test.tag}</small>
                    <h2>{test.title}</h2>
                    <p>{test.text}</p>
                  </div>
                </div>
                <div className="bank-card__meta">
                  <span>
                    <BookOpen />
                    40 câu
                  </span>
                  <span>
                    <Clock3 />
                    45 phút
                  </span>
                </div>
                <p className="bank-card__status">
                  {test.tone === "done" && <CheckCircle2 />}
                  {test.status}
                </p>
                <Link to={`/thi-thu/${test.id}`}>{test.action}</Link>
              </article>
            ))}
            {shownTests.length === 0 && (
              <p className="bank-empty">Không tìm thấy đề thi phù hợp.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function QuestionGrid({
  review = false,
  current = 8,
  answered = new Set<number>(),
  numbers = Array.from({ length: 40 }, (_, index) => index + 1),
  onSelect,
}: {
  review?: boolean;
  current?: number;
  answered?: Set<number>;
  numbers?: number[];
  onSelect?: (question: number) => void;
}) {
  return (
    <div className="question-grid">
      {numbers.map((n) => (
        <button
          aria-current={n === current ? "step" : undefined}
          className={`${n === current ? "current" : ""} ${review ? (wrongQuestions.has(n) ? "wrong" : "answered") : answered.has(n) ? "answered" : ""}`}
          key={n}
          onClick={() => onSelect?.(n)}
          type="button"
        >
          {String(n).padStart(2, "0")}
          {(review || answered.has(n)) && (
            <i>{review && wrongQuestions.has(n) ? <CircleX /> : <Check />}</i>
          )}
        </button>
      ))}
    </div>
  );
}

export function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(8);
  const [answersByQuestion, setAnswersByQuestion] = useState<
    Record<number, number>
  >(() =>
    Object.fromEntries(Array.from({ length: 7 }, (_, index) => [index + 1, 0])),
  );
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(
    new Set(),
  );
  const selected = answersByQuestion[currentQuestion];
  const answeredQuestions = new Set(Object.keys(answersByQuestion).map(Number));
  const answeredCount = answeredQuestions.size;

  const selectAnswer = (answer: number) => {
    setAnswersByQuestion((current) => ({
      ...current,
      [currentQuestion]: answer,
    }));
  };

  const toggleMarked = () => {
    setMarkedQuestions((current) => {
      const next = new Set(current);
      if (next.has(currentQuestion)) next.delete(currentQuestion);
      else next.add(currentQuestion);
      return next;
    });
  };
  return (
    <div className="focus-page">
      <FocusHeader />
      <div className="exam-progress">
        <i style={{ width: `${(answeredCount / 40) * 675}px` }} />
        <span>Đã hoàn thành {answeredCount}/40 câu</span>
      </div>
      <section className="exam-layout">
        <article className="exam-question">
          <div className="exam-question__body">
            <header>
              <b>Câu {String(currentQuestion).padStart(2, "0")}</b>
              <button
                className={markedQuestions.has(currentQuestion) ? "marked" : ""}
                onClick={toggleMarked}
                type="button"
              >
                <Bookmark /> Đánh dấu
              </button>
            </header>
            <h2>{question}</h2>
            <div className="exam-options">
              {answers.map((answer, i) => (
                <button
                  onClick={() => selectAnswer(i)}
                  className={selected === i ? "selected" : ""}
                  key={answer}
                >
                  <i>{selected === i && <span />}</i>
                  {answer}
                </button>
              ))}
            </div>
          </div>
          <footer>
            <button
              disabled={currentQuestion === 1}
              onClick={() =>
                setCurrentQuestion((current) => Math.max(1, current - 1))
              }
              type="button"
            >
              <ArrowLeft />
              Câu trước
            </button>
            <span>
              <CheckCircle2 />
              Đã tự động lưu
            </span>
            <button
              className="primary"
              disabled={currentQuestion === 40}
              onClick={() =>
                setCurrentQuestion((current) => Math.min(40, current + 1))
              }
              type="button"
            >
              Câu tiếp theo
              <ArrowRight />
            </button>
          </footer>
        </article>
        <aside className="exam-sidebar">
          <h2>Danh sách câu hỏi</h2>
          <QuestionGrid
            answered={answeredQuestions}
            current={currentQuestion}
            onSelect={setCurrentQuestion}
          />
          <div className="exam-legend">
            <span>
              <i className="answered" />
              Đã trả lời
            </span>
            <span>
              <i className="current" />
              Câu hiện tại
            </span>
            <span>
              <i />
              Chưa trả lời
            </span>
          </div>
          <p>
            <b>{answeredCount}/40</b> câu đã trả lời
          </p>
          <Link to="/thi-thu/nghiep-vu-cong-doan-01/ket-qua">Nộp bài</Link>
          <div className="exam-alert">
            <AlertTriangle />
            Hãy kiểm tra các câu chưa trả lời trước khi nộp bài.
          </div>
        </aside>
      </section>
    </div>
  );
}

export function PracticeResultPage() {
  return (
    <section className="result-page">
      <div className="result-card">
        <CheckCircle2 className="result-check" />
        <h1>Kết quả thi thử</h1>
        <h2>Nghiệp vụ công đoàn – Đề tổng hợp số 01</h2>
        <i className="result-divider" />
        <p>Bạn đã hoàn thành bài thi</p>
        <div className="result-main">
          <div className="result-ring">
            <strong>
              32<small>/40</small>
            </strong>
            <span>80%</span>
          </div>
          <div className="result-summary">
            <h3>Hoàn thành tốt</h3>
            <p>Bạn đã nắm khá tốt nội dung của đề thi.</p>
            <div>
              <span className="good">
                <CheckCircle2 />
                <small>Đúng</small>
                <b>32</b>
              </span>
              <span className="bad">
                <CircleX />
                <small>Sai</small>
                <b>8</b>
              </span>
              <span>
                <Clock3 />
                <small>Thời gian</small>
                <b>31:36</b>
              </span>
            </div>
          </div>
        </div>
        <div className="result-actions">
          <Link
            className="primary"
            to="/thi-thu/nghiep-vu-cong-doan-01/xem-dap-an"
          >
            Xem đáp án
          </Link>
          <Link to="/thi-thu/nghiep-vu-cong-doan-01">Làm lại</Link>
          <Link to="/thi-thu">Về ngân hàng đề</Link>
        </div>
      </div>
    </section>
  );
}

export function AnswerReviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(8);
  const [wrongOnly, setWrongOnly] = useState(false);
  const visibleQuestions = wrongOnly
    ? Array.from(wrongQuestions)
    : Array.from({ length: 40 }, (_, index) => index + 1);
  const goToAdjacentQuestion = (direction: -1 | 1) => {
    const currentIndex = visibleQuestions.indexOf(currentQuestion);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = Math.min(
      visibleQuestions.length - 1,
      Math.max(0, safeIndex + direction),
    );
    setCurrentQuestion(visibleQuestions[nextIndex]);
  };

  return (
    <div className="focus-page">
      <FocusHeader review />
      <section className="review-layout">
        <article className="review-question">
          <div className="review-body">
            <h1>Xem lại đáp án</h1>
            <header>
              <b>Câu {String(currentQuestion).padStart(2, "0")}</b>
              <span>
                <CheckCircle2 />
                Trả lời đúng
              </span>
            </header>
            <h2>{question}</h2>
            <label>Bạn đã chọn</label>
            <div className="review-choice">
              <i />
              <span>{answers[0]}</span>
            </div>
            <label>Đáp án đúng</label>
            <div className="review-choice correct">
              <CheckCircle2 />
              <span>{answers[0]}</span>
            </div>
            <label>Giải thích</label>
            <div className="review-explain">
              <span>ⓘ</span>Tổ chức công đoàn có chức năng đại diện, chăm lo và
              bảo vệ quyền,
              <br />
              lợi ích hợp pháp của người lao động.
            </div>
          </div>
          <footer>
            <button onClick={() => goToAdjacentQuestion(-1)} type="button">
              <ArrowLeft />
              Câu trước
            </button>
            <button onClick={() => goToAdjacentQuestion(1)} type="button">
              Câu tiếp theo
              <ArrowRight />
            </button>
          </footer>
        </article>
        <aside className="review-sidebar">
          <h2>Danh sách câu</h2>
          <div className="review-tabs">
            <button
              aria-pressed={!wrongOnly}
              className={!wrongOnly ? "active" : ""}
              onClick={() => setWrongOnly(false)}
              type="button"
            >
              Tất cả
            </button>
            <button
              aria-pressed={wrongOnly}
              className={wrongOnly ? "active" : ""}
              onClick={() => {
                setWrongOnly(true);
                if (!wrongQuestions.has(currentQuestion)) {
                  setCurrentQuestion(9);
                }
              }}
              type="button"
            >
              Câu sai
            </button>
          </div>
          <QuestionGrid
            current={currentQuestion}
            numbers={visibleQuestions}
            onSelect={setCurrentQuestion}
            review
          />
          <div className="review-score">
            <span>
              <CheckCircle2 />
              <small>Đúng</small>
              <b>32</b>
            </span>
            <span>
              <CircleX />
              <small>Sai</small>
              <b>8</b>
            </span>
          </div>
        </aside>
      </section>
    </div>
  );
}
