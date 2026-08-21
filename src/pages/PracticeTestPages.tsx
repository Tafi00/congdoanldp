import { useCallback, useEffect, useMemo, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { assets } from "../data/assets";
import { getPracticeQuestions } from "../data/practiceTests";
import {
  getExamResult,
  getLatestExamResult,
  saveExamResult,
} from "../lib/publicPortal";
import { CustomSelect } from "../components/ui/CustomSelect";
import "./PracticeTestPages.css";
import "./PracticeCorrections.css";

const tests = [
  {
    id: "nghiep-vu-cong-doan-01",
    category: "union",
    icon: Users,
    tag: "Nghiệp vụ công đoàn",
    title: "Đề tổng hợp số 01",
    text: "Kiểm tra kiến thức nền tảng và kỹ năng xử lý tình huống.",
  },
  {
    id: "nghiep-vu-su-pham-01",
    category: "pedagogy",
    icon: BookOpen,
    tag: "Nghiệp vụ sư phạm",
    title: "Đề ôn tập số 01",
    text: "Ôn tập phương pháp giảng dạy và năng lực nghề nghiệp.",
  },
  {
    id: "quan-ly-giao-duc-01",
    category: "management",
    icon: GraduationCap,
    tag: "Quản lý giáo dục",
    title: "Đề đánh giá số 01",
    text: "Đánh giá kiến thức quản trị và tổ chức hoạt động giáo dục.",
  },
];

function getTest(id?: string) {
  return tests.find((test) => test.id === id) ?? tests[0];
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function FocusHeader({
  review = false,
  remainingSeconds = 45 * 60,
}: {
  review?: boolean;
  remainingSeconds?: number;
}) {
  const { id } = useParams();
  const test = getTest(id);
  return (
    <header className="focus-header">
      <Link to="/" className="focus-brand">
        <img src={assets.logo} alt="" />
        <b>TRƯỜNG CÔNG ĐOÀN GIÁO DỤC VIỆT NAM</b>
      </Link>
      <h1>
        {test.tag} – {test.title}
      </h1>
      {review ? (
        <Link to={`/thi-thu/${test.id}/ket-qua`} className="focus-back">
          <ArrowLeft /> Quay lại kết quả
        </Link>
      ) : (
        <div className="focus-time">
          <Clock3 />
          <span>
            Thời gian còn lại<strong>{formatTime(remainingSeconds)}</strong>
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
  const latestResult = getLatestExamResult();
  const latestTest = getTest(latestResult?.testId);
  const shownTests = tests
    .filter((test) =>
      (test.title + test.tag)
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .sort((first, second) => {
      if (sort === "completed") {
        return (
          Number(Boolean(getExamResult(second.id))) -
          Number(Boolean(getExamResult(first.id)))
        );
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
          {latestResult ? (
            <div className="latest-result">
              <div className="latest-result__head">
                <span>
                  <small>Lần thi gần nhất</small>
                  <h2>Kết quả của bạn</h2>
                </span>
                <i>
                  <BarChart3 />
                </i>
              </div>
              <div className="latest-result__body">
                <strong className="latest-result__score">
                  {latestResult.correct}
                  <small>/{latestResult.total}</small>
                </strong>
                <div className="latest-result__summary">
                  <span>
                    <CheckCircle2 />
                    {latestResult.correct / latestResult.total >= 0.8
                      ? "Hoàn thành tốt"
                      : "Đã hoàn thành"}
                  </span>
                  <b>{latestTest.tag}</b>
                  <p>
                    Đúng{" "}
                    {Math.round(
                      (latestResult.correct / latestResult.total) * 100,
                    )}
                    % tổng số câu hỏi
                  </p>
                  <Link to={`/thi-thu/${latestResult.testId}/ket-qua`}>
                    Xem lịch sử <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="latest-result latest-result--empty">
              <div className="latest-result__head">
                <span>
                  <small>Kết quả cá nhân</small>
                  <h2>Chưa có bài thi</h2>
                </span>
                <i>
                  <BarChart3 />
                </i>
              </div>
              <p>Hoàn thành một đề thi để xem điểm số và lịch sử tại đây.</p>
              <Link to={`/thi-thu/${tests[0].id}`}>
                Bắt đầu làm bài <ArrowRight />
              </Link>
            </div>
          )}
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
                { value: "completed", label: "Đã hoàn thành" },
              ]}
            />
          </div>
          <div className="bank-grid">
            {shownTests.map(({ icon: Icon, ...test }) => {
              const result = getExamResult(test.id);
              const total = getPracticeQuestions(test.id).length;
              return (
                <article
                  className={`bank-card ${result ? "done" : "new"}`}
                  key={test.title}
                >
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
                      {total} câu
                    </span>
                    <span>
                      <Clock3 />
                      45 phút
                    </span>
                  </div>
                  <p className="bank-card__status">
                    {result && <CheckCircle2 />}
                    {result
                      ? `Đã hoàn thành  •  ${result.correct}/${result.total}`
                      : "Chưa làm"}
                  </p>
                  <Link to={`/thi-thu/${test.id}`}>
                    {result ? "Làm lại" : "Bắt đầu làm bài"}
                  </Link>
                </article>
              );
            })}
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
  current = 1,
  answered = new Set<number>(),
  numbers = [],
  wrong = new Set<number>(),
  onSelect,
}: {
  review?: boolean;
  current?: number;
  answered?: Set<number>;
  numbers?: number[];
  wrong?: Set<number>;
  onSelect?: (question: number) => void;
}) {
  return (
    <div className="question-grid">
      {numbers.map((n) => (
        <button
          aria-current={n === current ? "step" : undefined}
          className={`${n === current ? "current" : ""} ${review ? (wrong.has(n) ? "wrong" : "answered") : answered.has(n) ? "answered" : ""}`}
          key={n}
          onClick={() => onSelect?.(n)}
          type="button"
        >
          {String(n).padStart(2, "0")}
          {(review || answered.has(n)) && (
            <i>{review && wrong.has(n) ? <CircleX /> : <Check />}</i>
          )}
        </button>
      ))}
    </div>
  );
}

export function ExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = getTest(id);
  const questions = useMemo(() => getPracticeQuestions(test.id), [test.id]);
  const total = questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answersByQuestion, setAnswersByQuestion] = useState<
    Record<number, number>
  >({});
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(
    new Set(),
  );
  const [remainingSeconds, setRemainingSeconds] = useState(45 * 60);
  const [startedAt] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(
      () => setRemainingSeconds((seconds) => Math.max(0, seconds - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);
  const current = questions[currentQuestion - 1];
  const selected = answersByQuestion[currentQuestion];
  const answeredQuestions = new Set(Object.keys(answersByQuestion).map(Number));
  const answeredCount = answeredQuestions.size;

  const submitExam = useCallback(() => {
    const correct = questions.reduce(
      (score, item, index) =>
        score + (answersByQuestion[index + 1] === item.correct ? 1 : 0),
      0,
    );
    saveExamResult({
      testId: test.id,
      correct,
      total,
      answers: answersByQuestion,
      durationSeconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
      completedAt: new Date().toISOString(),
    });
    navigate(`/thi-thu/${test.id}/ket-qua`);
  }, [answersByQuestion, navigate, questions, startedAt, test.id, total]);
  useEffect(() => {
    if (remainingSeconds === 0) submitExam();
  }, [remainingSeconds, submitExam]);

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
      <FocusHeader remainingSeconds={remainingSeconds} />
      <div className="exam-progress">
        <div>
          <i style={{ width: `${(answeredCount / total) * 100}%` }} />
        </div>
        <span>
          Đã hoàn thành {answeredCount}/{total} câu
        </span>
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
            <h2>{current.prompt}</h2>
            <div className="exam-options">
              {current.answers.map((answer, i) => (
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
              Đã ghi nhận
            </span>
            <button
              className="primary"
              disabled={currentQuestion === total}
              onClick={() =>
                setCurrentQuestion((questionNumber) =>
                  Math.min(total, questionNumber + 1),
                )
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
            numbers={Array.from({ length: total }, (_, index) => index + 1)}
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
            <b>
              {answeredCount}/{total}
            </b>{" "}
            câu đã trả lời
          </p>
          <button className="exam-submit" onClick={submitExam} type="button">
            Nộp bài
          </button>
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
  const { id } = useParams();
  const test = getTest(id);
  const result = getExamResult(test.id);
  if (!result) {
    return (
      <section className="result-page">
        <div className="result-card">
          <h1>Chưa có kết quả</h1>
          <p>Hãy hoàn thành bài thi trước khi xem kết quả.</p>
          <div className="result-actions">
            <Link className="primary" to={`/thi-thu/${test.id}`}>
              Bắt đầu làm bài
            </Link>
            <Link to="/thi-thu">Về ngân hàng đề</Link>
          </div>
        </div>
      </section>
    );
  }
  const percentage = Math.round((result.correct / result.total) * 100);
  const minutes = Math.floor(result.durationSeconds / 60);
  const seconds = result.durationSeconds % 60;
  return (
    <section className="result-page">
      <div className="result-card">
        <CheckCircle2 className="result-check" />
        <h1>Kết quả thi thử</h1>
        <h2>
          {test.tag} – {test.title}
        </h2>
        <i className="result-divider" />
        <p>Bạn đã hoàn thành bài thi</p>
        <div className="result-main">
          <div className="result-ring">
            <strong>
              {result.correct}
              <small>/{result.total}</small>
            </strong>
            <span>{percentage}%</span>
          </div>
          <div className="result-summary">
            <h3>
              {percentage >= 80
                ? "Hoàn thành tốt"
                : percentage >= 50
                  ? "Đã hoàn thành"
                  : "Cần ôn tập thêm"}
            </h3>
            <p>Kết quả được tính trực tiếp từ các câu trả lời của bạn.</p>
            <div>
              <span className="good">
                <CheckCircle2 />
                <small>Đúng</small>
                <b>{result.correct}</b>
              </span>
              <span className="bad">
                <CircleX />
                <small>Sai</small>
                <b>{result.total - result.correct}</b>
              </span>
              <span>
                <Clock3 />
                <small>Thời gian</small>
                <b>
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </b>
              </span>
            </div>
          </div>
        </div>
        <div className="result-actions">
          <Link className="primary" to={`/thi-thu/${test.id}/xem-dap-an`}>
            Xem đáp án
          </Link>
          <Link to={`/thi-thu/${test.id}`}>Làm lại</Link>
          <Link to="/thi-thu">Về ngân hàng đề</Link>
        </div>
      </div>
    </section>
  );
}

export function AnswerReviewPage() {
  const { id } = useParams();
  const test = getTest(id);
  const questions = getPracticeQuestions(test.id);
  const result = getExamResult(test.id);
  const wrongQuestions = new Set(
    questions
      .map((item, index) =>
        result?.answers[index + 1] === item.correct ? null : index + 1,
      )
      .filter(
        (questionNumber): questionNumber is number => questionNumber !== null,
      ),
  );
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [wrongOnly, setWrongOnly] = useState(false);
  const visibleQuestions = wrongOnly
    ? Array.from(wrongQuestions)
    : Array.from({ length: questions.length }, (_, index) => index + 1);
  const current = questions[currentQuestion - 1];
  const selectedAnswer = result?.answers[currentQuestion];
  const isCorrect = selectedAnswer === current.correct;
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
                {isCorrect ? <CheckCircle2 /> : <CircleX />}
                {isCorrect ? "Trả lời đúng" : "Trả lời sai"}
              </span>
            </header>
            <h2>{current.prompt}</h2>
            <label>Bạn đã chọn</label>
            <div className="review-choice">
              <i />
              <span>
                {selectedAnswer === undefined
                  ? "Chưa trả lời"
                  : current.answers[selectedAnswer]}
              </span>
            </div>
            <label>Đáp án đúng</label>
            <div className="review-choice correct">
              <CheckCircle2 />
              <span>{current.answers[current.correct]}</span>
            </div>
            <label>Giải thích</label>
            <div className="review-explain">
              <span>ⓘ</span>
              {current.explanation}
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
                  setCurrentQuestion(Array.from(wrongQuestions)[0] ?? 1);
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
            wrong={wrongQuestions}
          />
          <div className="review-score">
            <span>
              <CheckCircle2 />
              <small>Đúng</small>
              <b>{result?.correct ?? 0}</b>
            </span>
            <span>
              <CircleX />
              <small>Sai</small>
              <b>{result ? result.total - result.correct : questions.length}</b>
            </span>
          </div>
        </aside>
      </section>
    </div>
  );
}
