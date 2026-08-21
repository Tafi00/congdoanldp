import { Check, ChevronRight, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { assets } from "../../data/assets";
import { CustomSelect } from "../../components/ui/CustomSelect";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import { createRegistration } from "../../lib/publicPortal";
import "./RegistrationSection.css";

const benefits = [
  "Nội dung thực tiễn",
  "Hình thức học linh hoạt",
  "Hỗ trợ trong suốt khóa học",
];

const steps = [
  ["01", "Chọn chương trình", "Khám phá và chọn khóa học phù hợp."],
  ["02", "Gửi thông tin", "Điền thông tin đăng ký nhanh chóng."],
  ["03", "Nhận tư vấn", "Bộ phận tuyển sinh liên hệ tư vấn."],
];

export function RegistrationSection() {
  const navigate = useNavigate();
  return (
    <section
      id="dang-ky-nhanh"
      className="registration-section"
      style={{
        backgroundImage: `url(${assets.registrationSectionBackground})`,
      }}
      aria-labelledby="registration-title"
    >
      <div className="container">
        <motion.div
          className="registration-panel"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          <motion.div className="registration-panel__intro" variants={fadeUp}>
            <p className="eyebrow">Đăng ký chương trình</p>
            <h2 id="registration-title" className="heading-2">
              Chọn chương trình phù hợp với nhu cầu phát triển của bạn
            </h2>
            <p className="lead">
              Để lại thông tin, bộ phận tuyển sinh sẽ liên hệ tư vấn lộ trình
              học phù hợp.
            </p>

            <ul className="registration-benefits">
              {benefits.map((benefit) => (
                <li key={benefit}>
                  <span>
                    <Check size={19} strokeWidth={2.4} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            className="registration-form"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              createRegistration({
                program: String(form.get("program") ?? "union"),
                studyMode: "flexible",
                name: String(form.get("name") ?? "").trim(),
                phone: String(form.get("phone") ?? "").trim(),
                email: "",
                organization: String(form.get("organization") ?? "").trim(),
                position: "",
              });
              navigate("/dang-ky-thanh-cong");
            }}
            variants={fadeUp}
          >
            <h3 className="heading-3">Thông tin đăng ký</h3>
            <label>
              <span>Chương trình quan tâm</span>
              <CustomSelect
                className="custom-select--full"
                name="program"
                placeholder="Chọn chương trình"
                options={[
                  { value: "union", label: "Nghiệp vụ công đoàn" },
                  { value: "pedagogy", label: "Nghiệp vụ sư phạm" },
                  { value: "management", label: "Quản lý giáo dục" },
                ]}
              />
            </label>
            <label>
              <span>Họ và tên</span>
              <input
                name="name"
                type="text"
                placeholder="Nhập họ và tên"
                autoComplete="name"
                required
              />
            </label>
            <label>
              <span>Số điện thoại</span>
              <input
                name="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                autoComplete="tel"
                required
              />
            </label>
            <label>
              <span>Đơn vị công tác</span>
              <input
                name="organization"
                type="text"
                placeholder="Nhập đơn vị công tác"
                required
              />
            </label>
            <motion.button whileTap={{ scale: 0.985 }} type="submit">
              Gửi đăng ký
            </motion.button>
            <p className="registration-form__security">
              <LockKeyhole size={16} /> Thông tin của bạn được bảo mật.
            </p>
          </motion.form>
        </motion.div>

        <motion.ol
          className="registration-steps"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          {steps.map(([number, title, description], index) => (
            <motion.li key={number} variants={fadeUp}>
              <strong>{number}</strong>
              <span>
                <b>{title}</b>
                <small>{description}</small>
              </span>
              {index < steps.length - 1 && (
                <i>
                  <ChevronRight size={17} />
                </i>
              )}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
