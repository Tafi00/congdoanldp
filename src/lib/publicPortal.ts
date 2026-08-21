export type RegistrationRecord = {
  code: string;
  program: string;
  studyMode: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  position: string;
  createdAt: string;
};

export type ApplicationRecord = {
  code: string;
  registrationCode?: string;
  phone: string;
  documents: string[];
  status: "submitted" | "reviewing" | "approved";
  createdAt: string;
};

export type ExamResultRecord = {
  testId: string;
  correct: number;
  total: number;
  answers: Record<number, number>;
  durationSeconds: number;
  completedAt: string;
};

const REGISTRATIONS_KEY = "cdgd.registrations";
const APPLICATIONS_KEY = "cdgd.applications";
const EXAM_RESULTS_KEY = "cdgd.exam-results";

function readRecords<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]") as T[];
  } catch {
    return [];
  }
}

function writeRecords<T>(key: string, records: T[]) {
  localStorage.setItem(key, JSON.stringify(records));
}

function makeCode(prefix: string) {
  const date = new Date();
  const year = date.getFullYear();
  const suffix = `${date.getTime()}`.slice(-6);
  return `${prefix}-${year}-${suffix}`;
}

export function createRegistration(
  data: Omit<RegistrationRecord, "code" | "createdAt">,
) {
  const record: RegistrationRecord = {
    ...data,
    code: makeCode("DK"),
    createdAt: new Date().toISOString(),
  };
  writeRecords(REGISTRATIONS_KEY, [
    ...readRecords<RegistrationRecord>(REGISTRATIONS_KEY),
    record,
  ]);
  sessionStorage.setItem("cdgd.last-registration", record.code);
  return record;
}

export function getLastRegistration() {
  const records = readRecords<RegistrationRecord>(REGISTRATIONS_KEY);
  const code = sessionStorage.getItem("cdgd.last-registration");
  return records.find((record) => record.code === code) ?? records.at(-1);
}

export function findRegistration(code?: string) {
  if (!code) return undefined;
  return readRecords<RegistrationRecord>(REGISTRATIONS_KEY).find(
    (record) => record.code === code,
  );
}

export function createApplication(documents: string[], phone?: string) {
  const registration = getLastRegistration();
  const record: ApplicationRecord = {
    code: makeCode("HS"),
    registrationCode: registration?.code,
    phone: phone?.trim() || registration?.phone || "",
    documents,
    status: "submitted",
    createdAt: new Date().toISOString(),
  };
  writeRecords(APPLICATIONS_KEY, [
    ...readRecords<ApplicationRecord>(APPLICATIONS_KEY),
    record,
  ]);
  sessionStorage.setItem("cdgd.last-application", record.code);
  return record;
}

export function findApplication(code: string, phone?: string) {
  const normalizedCode = code.trim().toUpperCase();
  const normalizedPhone = phone?.replace(/\s/g, "");
  return readRecords<ApplicationRecord>(APPLICATIONS_KEY).find(
    (record) =>
      record.code.toUpperCase() === normalizedCode &&
      (!normalizedPhone || record.phone.replace(/\s/g, "") === normalizedPhone),
  );
}

export function saveExamResult(result: ExamResultRecord) {
  const records = readRecords<ExamResultRecord>(EXAM_RESULTS_KEY).filter(
    (record) => record.testId !== result.testId,
  );
  writeRecords(EXAM_RESULTS_KEY, [...records, result]);
}

export function getExamResult(testId: string) {
  return readRecords<ExamResultRecord>(EXAM_RESULTS_KEY).find(
    (record) => record.testId === testId,
  );
}

export function getLatestExamResult() {
  return readRecords<ExamResultRecord>(EXAM_RESULTS_KEY).at(-1);
}

export const programNames: Record<string, string> = {
  union: "Nghiệp vụ công đoàn",
  pedagogy: "Nghiệp vụ sư phạm",
  management: "Quản lý giáo dục",
};

export const studyModeNames: Record<string, string> = {
  online: "Trực tuyến",
  offline: "Trực tiếp",
  flexible: "Linh hoạt",
};
