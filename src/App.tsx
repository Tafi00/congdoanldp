import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";
import { ScrollToTop } from "./components/layout/ScrollToTop";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const CmsApp = lazy(() =>
  import("./pages/cms/CmsApp").then((module) => ({ default: module.CmsApp })),
);
const ProgramsPage = lazy(() =>
  import("./pages/PublicJourneyPages").then((module) => ({
    default: module.ProgramsPage,
  })),
);
const ProgramDetailPage = lazy(() =>
  import("./pages/PublicJourneyPages").then((module) => ({
    default: module.ProgramDetailPage,
  })),
);
const ProgramRegistrationPage = lazy(() =>
  import("./pages/PublicJourneyPages").then((module) => ({
    default: module.ProgramRegistrationPage,
  })),
);
const RegistrationSuccessPage = lazy(() =>
  import("./pages/PublicJourneyPages").then((module) => ({
    default: module.RegistrationSuccessPage,
  })),
);
const ApplicationFormPage = lazy(() =>
  import("./pages/PublicJourneyPages").then((module) => ({
    default: module.ApplicationFormPage,
  })),
);
const ApplicationLookupPage = lazy(() =>
  import("./pages/PublicJourneyPages").then((module) => ({
    default: module.ApplicationLookupPage,
  })),
);
const ApplicationStatusPage = lazy(() =>
  import("./pages/PublicJourneyPages").then((module) => ({
    default: module.ApplicationStatusPage,
  })),
);
const PracticeBankPage = lazy(() =>
  import("./pages/PracticeTestPages").then((module) => ({
    default: module.PracticeBankPage,
  })),
);
const ExamPage = lazy(() =>
  import("./pages/PracticeTestPages").then((module) => ({
    default: module.ExamPage,
  })),
);
const PracticeResultPage = lazy(() =>
  import("./pages/PracticeTestPages").then((module) => ({
    default: module.PracticeResultPage,
  })),
);
const AnswerReviewPage = lazy(() =>
  import("./pages/PracticeTestPages").then((module) => ({
    default: module.AnswerReviewPage,
  })),
);
const AboutPage = lazy(() =>
  import("./pages/InformationPages").then((module) => ({
    default: module.AboutPage,
  })),
);
const NewsPage = lazy(() =>
  import("./pages/InformationPages").then((module) => ({
    default: module.NewsPage,
  })),
);
const NewsDetailPage = lazy(() =>
  import("./pages/InformationPages").then((module) => ({
    default: module.NewsDetailPage,
  })),
);

function LegalPage({ title }: { title: string }) {
  return (
    <div className="container" style={{ paddingBlock: 80 }}>
      <h1 className="heading-1">{title}</h1>
      <p className="lead">
        Trường Công đoàn Giáo dục Việt Nam cam kết bảo vệ thông tin người dùng
        và chỉ sử dụng dữ liệu phục vụ đăng ký, tuyển sinh, đào tạo và hỗ trợ
        học viên theo đúng mục đích đã thông báo.
      </p>
      <p>
        Khi sử dụng website, người dùng có trách nhiệm cung cấp thông tin chính
        xác, bảo mật mã hồ sơ và liên hệ nhà trường khi cần điều chỉnh hoặc xóa
        dữ liệu cá nhân.
      </p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="container" style={{ paddingBlock: 80 }}>
      <h1 className="heading-1">Không tìm thấy trang</h1>
      <p className="lead">Đường dẫn không tồn tại hoặc đã được thay đổi.</p>
      <a className="button button--primary" href="/">
        Về trang chủ
      </a>
    </div>
  );
}

export function App() {
  const { pathname } = useLocation();
  const isCms = pathname.startsWith("/cms");
  const isExamFocus = /^\/thi-thu\/[^/]+(?:\/xem-dap-an)?$/.test(pathname);
  return (
    <>
      {!isCms && !isExamFocus && <SiteHeader />}
      <ScrollToTop />
      <main>
        <Suspense
          fallback={
            <div className="route-loading" aria-label="Đang tải nội dung">
              <i />
            </div>
          }
        >
          <Routes>
            <Route path="/cms/*" element={<CmsApp />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/chuong-trinh" element={<ProgramsPage />} />
            <Route path="/chuong-trinh/:slug" element={<ProgramDetailPage />} />
            <Route path="/dang-ky" element={<ProgramRegistrationPage />} />
            <Route
              path="/dang-ky-thanh-cong"
              element={<RegistrationSuccessPage />}
            />
            <Route path="/nop-ho-so" element={<ApplicationFormPage />} />
            <Route path="/tra-cuu-ho-so" element={<ApplicationLookupPage />} />
            <Route path="/ho-so/:code" element={<ApplicationStatusPage />} />
            <Route path="/thi-thu" element={<PracticeBankPage />} />
            <Route path="/thi-thu/:id" element={<ExamPage />} />
            <Route
              path="/thi-thu/:id/ket-qua"
              element={<PracticeResultPage />}
            />
            <Route
              path="/thi-thu/:id/xem-dap-an"
              element={<AnswerReviewPage />}
            />
            <Route path="/gioi-thieu" element={<AboutPage />} />
            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route path="/tin-tuc/:slug" element={<NewsDetailPage />} />
            <Route
              path="/chinh-sach-bao-mat"
              element={<LegalPage title="Chính sách bảo mật" />}
            />
            <Route
              path="/dieu-khoan-su-dung"
              element={<LegalPage title="Điều khoản sử dụng" />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isCms && !isExamFocus && <SiteFooter />}
    </>
  );
}
