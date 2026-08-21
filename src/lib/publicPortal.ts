export type RegistrationRecord = { code: string; program: string; programTitle?: string; studyMode: string; name: string; phone: string; email: string; organization: string; position: string; status: string; createdAt: string };
export type ApplicationRecord = { code: string; registrationCode?: string; applicantName?: string; phone: string; program?: string; programTitle?: string; documents: Array<string | { id: string; name: string; type: string }>; status: "submitted" | "reviewing" | "needs_more" | "approved" | "rejected"; createdAt: string; updatedAt?: string };
export type ExamQuestion = { position: number; prompt: string; answers: [string, string, string, string]; correct?: number; explanation?: string };
export type ExamResultRecord = { attemptId?: string; testId: string; correct: number; total: number; answers: Record<number, number>; durationSeconds: number; completedAt: string; questions?: ExamQuestion[] };
export type ProgramRecord = { slug: string; category: string; title: string; summary: string; description: string; audience: string; studyModes: string[]; duration: string; status: string };
export type ExamRecord = { id: string; category: string; title: string; text: string; durationMinutes: number; questionCount: number; questions?: ExamQuestion[] };
export type NewsRecord = { slug: string; title: string; tag: string; text: string; content?: string; imageUrl?: string; publishedAt?: string };

const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");
const LAST_REGISTRATION_KEY = "cdgd.last-registration";
const LAST_APPLICATION_KEY = "cdgd.last-application";
const VISITOR_ID_KEY = "cdgd.visitor-id";
const ATTEMPT_PREFIX = "cdgd.attempt.";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) { super(message); this.status = status; }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { ...init, headers: init?.body instanceof FormData ? init.headers : { "Content-Type": "application/json", ...init?.headers } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(payload.error || "Không thể kết nối hệ thống", response.status);
  return payload as T;
}

function readSession<T>(key: string): T | undefined {
  try { const value = sessionStorage.getItem(key); return value ? JSON.parse(value) as T : undefined; } catch { return undefined; }
}

function visitorId() {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(VISITOR_ID_KEY, id); }
  return id;
}

export const getPrograms = () => request<ProgramRecord[]>("/programs");
export const getProgram = (slug: string) => request<ProgramRecord>(`/programs/${encodeURIComponent(slug)}`);

export async function createRegistration(data: Omit<RegistrationRecord, "code" | "createdAt" | "status" | "programTitle">) {
  const record = await request<RegistrationRecord>("/registrations", { method: "POST", body: JSON.stringify(data) });
  sessionStorage.setItem(LAST_REGISTRATION_KEY, JSON.stringify({ code: record.code, phone: record.phone }));
  return record;
}

export async function findRegistration(code?: string, phone?: string) {
  if (!code || !phone) return undefined;
  try { return await request<RegistrationRecord>(`/registrations/${encodeURIComponent(code)}/verify`, { method: "POST", body: JSON.stringify({ phone }) }); }
  catch (error) { if (error instanceof ApiError && error.status === 404) return undefined; throw error; }
}

export async function getLastRegistration() {
  const reference = readSession<{ code: string; phone: string }>(LAST_REGISTRATION_KEY);
  return reference ? findRegistration(reference.code, reference.phone) : undefined;
}
export const getLastRegistrationReference = () => readSession<{ code: string; phone: string }>(LAST_REGISTRATION_KEY);

export async function createApplication(documents: File[], phone: string, registrationCode?: string) {
  const form = new FormData();
  form.append("phone", phone);
  if (registrationCode) form.append("registrationCode", registrationCode);
  documents.forEach((file, index) => form.append(`document${index + 1}`, file));
  const record = await request<ApplicationRecord>("/applications", { method: "POST", body: form });
  sessionStorage.setItem(LAST_APPLICATION_KEY, JSON.stringify({ code: record.code, phone: record.phone }));
  return record;
}

export async function findApplication(code: string, phone: string) {
  try { return await request<ApplicationRecord>("/applications/lookup", { method: "POST", body: JSON.stringify({ code, phone }) }); }
  catch (error) { if (error instanceof ApiError && error.status === 404) return undefined; throw error; }
}
export const getLastApplicationReference = () => readSession<{ code: string; phone: string }>(LAST_APPLICATION_KEY);

export const getExams = () => request<ExamRecord[]>("/exams");
export const getExam = (testId: string) => request<ExamRecord>(`/exams/${encodeURIComponent(testId)}`);

export async function saveExamResult(result: Omit<ExamResultRecord, "correct" | "total" | "completedAt">) {
  const saved = await request<ExamResultRecord>(`/exams/${encodeURIComponent(result.testId)}/attempts`, { method: "POST", body: JSON.stringify({ visitorId: visitorId(), answers: result.answers, durationSeconds: result.durationSeconds }) });
  if (saved.attemptId) sessionStorage.setItem(`${ATTEMPT_PREFIX}${result.testId}`, saved.attemptId);
  return saved;
}

export async function getExamResult(testId: string, review = false) {
  const attemptId = sessionStorage.getItem(`${ATTEMPT_PREFIX}${testId}`);
  try {
    if (review && attemptId) return request<ExamResultRecord>(`/attempts/${attemptId}?visitorId=${visitorId()}`);
    return await request<ExamResultRecord>(`/attempts/latest?visitorId=${visitorId()}&testId=${encodeURIComponent(testId)}`);
  } catch (error) { if (error instanceof ApiError && error.status === 404) return undefined; throw error; }
}

export async function getLatestExamResult() {
  try { return await request<ExamResultRecord>(`/attempts/latest?visitorId=${visitorId()}`); }
  catch (error) { if (error instanceof ApiError && error.status === 404) return undefined; throw error; }
}

export const getNews = () => request<NewsRecord[]>("/news");
export const getNewsArticle = (slug: string) => request<NewsRecord>(`/news/${encodeURIComponent(slug)}`);

export const programNames: Record<string, string> = { union: "Nghiệp vụ công đoàn", pedagogy: "Nghiệp vụ sư phạm", management: "Quản lý giáo dục" };
export const studyModeNames: Record<string, string> = { online: "Trực tuyến", offline: "Trực tiếp", flexible: "Linh hoạt" };
