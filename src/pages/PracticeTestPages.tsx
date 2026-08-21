import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, BarChart3, BookOpen, Bookmark, Check, CheckCircle2, CircleX, Clock3, GraduationCap, LogOut, Search, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CustomSelect } from "../components/ui/CustomSelect";
import { assets } from "../data/assets";
import { getExam, getExamResult, getExams, getLatestExamResult, saveExamResult, type ExamQuestion, type ExamRecord, type ExamResultRecord } from "../lib/publicPortal";
import "./PracticeTestPages.css";
import "./PracticeCorrections.css";

const categoryInfo = {
  union: { tag: "Nghiệp vụ công đoàn", icon: Users },
  pedagogy: { tag: "Nghiệp vụ sư phạm", icon: BookOpen },
  management: { tag: "Quản lý giáo dục", icon: GraduationCap },
} as const;

function infoFor(category?: string) {
  return categoryInfo[category as keyof typeof categoryInfo] ?? categoryInfo.union;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function FocusHeader({ test, review = false, remainingSeconds = 45 * 60 }: { test: ExamRecord; review?: boolean; remainingSeconds?: number }) {
  return <header className="focus-header">
    <Link to="/" className="focus-brand"><img src={assets.logo} alt="" /><b>TRƯỜNG CÔNG ĐOÀN GIÁO DỤC VIỆT NAM</b></Link>
    <h1>{infoFor(test.category).tag} – {test.title}</h1>
    {review ? <Link to={`/thi-thu/${test.id}/ket-qua`} className="focus-back"><ArrowLeft /> Quay lại kết quả</Link> :
      <div className="focus-time"><Clock3 /><span>Thời gian còn lại<strong>{formatTime(remainingSeconds)}</strong></span><Link to="/thi-thu"><LogOut />Thoát</Link></div>}
  </header>;
}

function LoadingState({ message = "Đang tải dữ liệu..." }: { message?: string }) {
  return <section className="result-page"><div className="result-card"><p>{message}</p></div></section>;
}

export function PracticeBankPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [tests, setTests] = useState<ExamRecord[]>([]);
  const [results, setResults] = useState<Record<string, ExamResultRecord | undefined>>({});
  const [latestResult, setLatestResult] = useState<ExamResultRecord>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const catalog = await getExams();
        const [latest, completed] = await Promise.all([getLatestExamResult(), Promise.all(catalog.map(async (test) => [test.id, await getExamResult(test.id)] as const))]);
        if (!active) return;
        setTests(catalog); setLatestResult(latest); setResults(Object.fromEntries(completed));
      } catch (reason) { if (active) setError(reason instanceof Error ? reason.message : "Không thể tải ngân hàng đề."); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, []);

  const latestTest = tests.find((test) => test.id === latestResult?.testId);
  const shownTests = [...tests].filter((test) => (test.title + infoFor(test.category).tag).toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => sort === "completed" ? Number(Boolean(results[b.id])) - Number(Boolean(results[a.id])) : 0);

  return <div className="bank-page">
    <section className="bank-hero"><div className="container bank-hero__grid">
      <div><p className="bank-breadcrumb">Trang chủ <span>/</span> <b>Thi thử</b></p><p className="bank-kicker"><i />NGÂN HÀNG ĐỀ</p><h1>Thi thử trực tuyến</h1><p>Chọn đề phù hợp, làm bài trực tuyến và nhận kết quả<br />ngay sau khi hoàn thành.</p></div>
      {latestResult && latestTest ? <div className="latest-result">
        <div className="latest-result__head"><span><small>Lần thi gần nhất</small><h2>Kết quả của bạn</h2></span><i><BarChart3 /></i></div>
        <div className="latest-result__body"><strong className="latest-result__score">{latestResult.correct}<small>/{latestResult.total}</small></strong><div className="latest-result__summary"><span><CheckCircle2 />{latestResult.correct / latestResult.total >= .8 ? "Hoàn thành tốt" : "Đã hoàn thành"}</span><b>{infoFor(latestTest.category).tag}</b><p>Đúng {Math.round(latestResult.correct / latestResult.total * 100)}% tổng số câu hỏi</p><Link to={`/thi-thu/${latestResult.testId}/ket-qua`}>Xem lịch sử <ArrowRight /></Link></div></div>
      </div> : <div className="latest-result latest-result--empty"><div className="latest-result__head"><span><small>Kết quả cá nhân</small><h2>Chưa có bài thi</h2></span><i><BarChart3 /></i></div><p>Hoàn thành một đề thi để xem điểm số và lịch sử tại đây.</p>{tests[0] && <Link to={`/thi-thu/${tests[0].id}`}>Bắt đầu làm bài <ArrowRight /></Link>}</div>}
    </div></section>
    <section className="bank-content"><div className="container">
      <div className="bank-tools"><label><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm đề thi" /></label><CustomSelect className="custom-select--compact" ariaLabel="Sắp xếp đề thi" value={sort} onValueChange={setSort} options={[{ value: "newest", label: "Mới nhất" }, { value: "completed", label: "Đã hoàn thành" }]} /></div>
      {error && <p className="form-error" role="alert">{error}</p>}{loading && <p>Đang tải ngân hàng đề...</p>}
      <div className="bank-grid">{shownTests.map((test) => { const result = results[test.id]; const Icon = infoFor(test.category).icon; return <article className={`bank-card ${result ? "done" : "new"}`} key={test.id}>
        <div className="bank-card__intro"><span className="bank-card__icon"><Icon /></span><div><small>{infoFor(test.category).tag}</small><h2>{test.title}</h2><p>{test.text}</p></div></div>
        <div className="bank-card__meta"><span><BookOpen />{test.questionCount} câu</span><span><Clock3 />{test.durationMinutes} phút</span></div>
        <p className="bank-card__status">{result && <CheckCircle2 />}{result ? `Đã hoàn thành  •  ${result.correct}/${result.total}` : "Chưa làm"}</p><Link to={`/thi-thu/${test.id}`}>{result ? "Làm lại" : "Bắt đầu làm bài"}</Link>
      </article>; })}{!loading && shownTests.length === 0 && <p className="bank-empty">Không tìm thấy đề thi phù hợp.</p>}</div>
    </div></section>
  </div>;
}

function QuestionGrid({ review = false, current = 1, answered = new Set<number>(), numbers = [], wrong = new Set<number>(), onSelect }: { review?: boolean; current?: number; answered?: Set<number>; numbers?: number[]; wrong?: Set<number>; onSelect?: (question: number) => void }) {
  return <div className="question-grid">{numbers.map((number) => <button aria-current={number === current ? "step" : undefined} className={`${number === current ? "current" : ""} ${review ? (wrong.has(number) ? "wrong" : "answered") : answered.has(number) ? "answered" : ""}`} key={number} onClick={() => onSelect?.(number)} type="button">{String(number).padStart(2, "0")}{(review || answered.has(number)) && <i>{review && wrong.has(number) ? <CircleX /> : <Check />}</i>}</button>)}</div>;
}

export function ExamPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<ExamRecord>();
  const [loadError, setLoadError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<number, number>>({});
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set());
  const [remainingSeconds, setRemainingSeconds] = useState(45 * 60);
  const [startedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { let active = true; void getExam(id).then((record) => { if (active) { setTest(record); setRemainingSeconds(record.durationMinutes * 60); } }).catch((reason) => { if (active) setLoadError(reason instanceof Error ? reason.message : "Không thể tải đề thi."); }); return () => { active = false; }; }, [id]);
  useEffect(() => { if (!test) return; const timer = window.setInterval(() => setRemainingSeconds((seconds) => Math.max(0, seconds - 1)), 1000); return () => window.clearInterval(timer); }, [test]);

  const questions = test?.questions ?? [];
  const total = questions.length;
  const current = questions[currentQuestion - 1];
  const selected = answersByQuestion[currentQuestion];
  const answeredQuestions = useMemo(() => new Set(Object.keys(answersByQuestion).map(Number)), [answersByQuestion]);

  const submitExam = useCallback(async () => {
    if (!test || submitting) return;
    setSubmitting(true);
    try { await saveExamResult({ testId: test.id, answers: answersByQuestion, durationSeconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)) }); navigate(`/thi-thu/${test.id}/ket-qua`); }
    catch (reason) { setLoadError(reason instanceof Error ? reason.message : "Không thể nộp bài."); setSubmitting(false); }
  }, [answersByQuestion, navigate, startedAt, submitting, test]);
  useEffect(() => { if (test && remainingSeconds === 0) void submitExam(); }, [remainingSeconds, submitExam, test]);

  if (loadError && !test) return <LoadingState message={loadError} />;
  if (!test || !current) return <LoadingState message="Đang tải đề thi..." />;
  const toggleMarked = () => setMarkedQuestions((items) => { const next = new Set(items); if (next.has(currentQuestion)) next.delete(currentQuestion); else next.add(currentQuestion); return next; });

  return <div className="focus-page"><FocusHeader test={test} remainingSeconds={remainingSeconds} />
    <div className="exam-progress"><div><i style={{ width: `${total ? answeredQuestions.size / total * 100 : 0}%` }} /></div><span>Đã hoàn thành {answeredQuestions.size}/{total} câu</span></div>
    <section className="exam-layout"><article className="exam-question"><div className="exam-question__body"><header><b>Câu {String(currentQuestion).padStart(2, "0")}</b><button className={markedQuestions.has(currentQuestion) ? "marked" : ""} onClick={toggleMarked} type="button"><Bookmark /> Đánh dấu</button></header><h2>{current.prompt}</h2><div className="exam-options">{current.answers.map((answer, index) => <button onClick={() => setAnswersByQuestion((items) => ({ ...items, [currentQuestion]: index }))} className={selected === index ? "selected" : ""} key={answer} type="button"><i>{selected === index && <span />}</i>{answer}</button>)}</div></div>
      <footer><button disabled={currentQuestion === 1} onClick={() => setCurrentQuestion((number) => Math.max(1, number - 1))} type="button"><ArrowLeft />Câu trước</button><span><CheckCircle2 />Đã ghi nhận</span><button className="primary" disabled={currentQuestion === total} onClick={() => setCurrentQuestion((number) => Math.min(total, number + 1))} type="button">Câu tiếp theo<ArrowRight /></button></footer></article>
      <aside className="exam-sidebar"><h2>Danh sách câu hỏi</h2><QuestionGrid answered={answeredQuestions} current={currentQuestion} numbers={Array.from({ length: total }, (_, index) => index + 1)} onSelect={setCurrentQuestion} /><div className="exam-legend"><span><i className="answered" />Đã trả lời</span><span><i className="current" />Câu hiện tại</span><span><i />Chưa trả lời</span></div><p><b>{answeredQuestions.size}/{total}</b> câu đã trả lời</p><button className="exam-submit" disabled={submitting} onClick={() => void submitExam()} type="button">{submitting ? "Đang nộp..." : "Nộp bài"}</button>{loadError && <p className="form-error">{loadError}</p>}<div className="exam-alert"><AlertTriangle />Hãy kiểm tra các câu chưa trả lời trước khi nộp bài.</div></aside>
    </section></div>;
}

export function PracticeResultPage() {
  const { id = "" } = useParams();
  const [test, setTest] = useState<ExamRecord>();
  const [result, setResult] = useState<ExamResultRecord | null>();
  useEffect(() => { void Promise.all([getExam(id), getExamResult(id)]).then(([exam, record]) => { setTest(exam); setResult(record ?? null); }).catch(() => setResult(null)); }, [id]);
  if (result === undefined || !test) return <LoadingState />;
  if (result === null) return <section className="result-page"><div className="result-card"><h1>Chưa có kết quả</h1><p>Hãy hoàn thành bài thi trước khi xem kết quả.</p><div className="result-actions"><Link className="primary" to={`/thi-thu/${id}`}>Bắt đầu làm bài</Link><Link to="/thi-thu">Về ngân hàng đề</Link></div></div></section>;
  const percentage = Math.round(result.correct / result.total * 100);
  return <section className="result-page"><div className="result-card"><CheckCircle2 className="result-check" /><h1>Kết quả thi thử</h1><h2>{infoFor(test.category).tag} – {test.title}</h2><i className="result-divider" /><p>Bạn đã hoàn thành bài thi</p><div className="result-main"><div className="result-ring"><strong>{result.correct}<small>/{result.total}</small></strong><span>{percentage}%</span></div><div className="result-summary"><h3>{percentage >= 80 ? "Hoàn thành tốt" : percentage >= 50 ? "Đã hoàn thành" : "Cần ôn tập thêm"}</h3><p>Kết quả được chấm và lưu trực tiếp trên hệ thống.</p><div><span className="good"><CheckCircle2 /><small>Đúng</small><b>{result.correct}</b></span><span className="bad"><CircleX /><small>Sai</small><b>{result.total - result.correct}</b></span><span><Clock3 /><small>Thời gian</small><b>{formatTime(result.durationSeconds)}</b></span></div></div></div><div className="result-actions"><Link className="primary" to={`/thi-thu/${test.id}/xem-dap-an`}>Xem đáp án</Link><Link to={`/thi-thu/${test.id}`}>Làm lại</Link><Link to="/thi-thu">Về ngân hàng đề</Link></div></div></section>;
}

export function AnswerReviewPage() {
  const { id = "" } = useParams();
  const [test, setTest] = useState<ExamRecord>();
  const [result, setResult] = useState<ExamResultRecord | null>();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [wrongOnly, setWrongOnly] = useState(false);
  useEffect(() => { void Promise.all([getExam(id), getExamResult(id, true)]).then(([exam, record]) => { setTest(exam); setResult(record ?? null); }).catch(() => setResult(null)); }, [id]);
  if (result === undefined || !test) return <LoadingState />;
  if (result === null || !result.questions?.length) return <LoadingState message="Không tìm thấy bài làm để xem đáp án." />;
  const questions = result.questions as Array<ExamQuestion & { correct: number; explanation: string }>;
  const wrongQuestions = new Set(questions.filter((item) => result.answers[item.position] !== item.correct).map((item) => item.position));
  const visibleQuestions = wrongOnly ? Array.from(wrongQuestions) : questions.map((item) => item.position);
  const current = questions.find((item) => item.position === currentQuestion) ?? questions[0];
  const selectedAnswer = result.answers[current.position];
  const isCorrect = selectedAnswer === current.correct;
  const adjacent = (direction: -1 | 1) => { const index = Math.max(0, visibleQuestions.indexOf(current.position)); setCurrentQuestion(visibleQuestions[Math.min(visibleQuestions.length - 1, Math.max(0, index + direction))] ?? 1); };
  return <div className="focus-page"><FocusHeader review test={test} /><section className="review-layout"><article className="review-question"><div className="review-body"><h1>Xem lại đáp án</h1><header><b>Câu {String(current.position).padStart(2, "0")}</b><span>{isCorrect ? <CheckCircle2 /> : <CircleX />}{isCorrect ? "Trả lời đúng" : "Trả lời sai"}</span></header><h2>{current.prompt}</h2><label>Bạn đã chọn</label><div className="review-choice"><i /><span>{selectedAnswer === undefined ? "Chưa trả lời" : current.answers[selectedAnswer]}</span></div><label>Đáp án đúng</label><div className="review-choice correct"><CheckCircle2 /><span>{current.answers[current.correct]}</span></div><label>Giải thích</label><div className="review-explain"><span>ⓘ</span>{current.explanation}</div></div><footer><button onClick={() => adjacent(-1)} type="button"><ArrowLeft />Câu trước</button><button onClick={() => adjacent(1)} type="button">Câu tiếp theo<ArrowRight /></button></footer></article>
    <aside className="review-sidebar"><h2>Danh sách câu</h2><div className="review-tabs"><button aria-pressed={!wrongOnly} className={!wrongOnly ? "active" : ""} onClick={() => setWrongOnly(false)} type="button">Tất cả</button><button aria-pressed={wrongOnly} className={wrongOnly ? "active" : ""} onClick={() => { setWrongOnly(true); if (!wrongQuestions.has(current.position)) setCurrentQuestion(Array.from(wrongQuestions)[0] ?? 1); }} type="button">Câu sai</button></div><QuestionGrid current={current.position} numbers={visibleQuestions} onSelect={setCurrentQuestion} review wrong={wrongQuestions} /><div className="review-score"><span><CheckCircle2 /><small>Đúng</small><b>{result.correct}</b></span><span><CircleX /><small>Sai</small><b>{result.total - result.correct}</b></span></div></aside></section></div>;
}
