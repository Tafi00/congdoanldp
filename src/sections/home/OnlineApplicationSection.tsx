import {
  Bell,
  CheckCircle2,
  CloudUpload,
  ContactRound,
  FileText,
  LockKeyhole,
  Upload,
} from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "../../data/assets";
import { CustomSelect } from "../../components/ui/CustomSelect";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import "./OnlineApplicationSection.css";

const steps = [
  { icon: ContactRound, number: "01", title: "Điền thông tin" },
  { icon: CloudUpload, number: "02", title: "Tải hồ sơ" },
  { icon: Bell, number: "03", title: "Theo dõi kết quả" },
];

export function OnlineApplicationSection() {
  return (
    <section
      id="nop-ho-so"
      className="application-section"
      style={{ backgroundImage: `url(${assets.lightSectionBackground})` }}
      aria-labelledby="application-title"
    >
      <div className="container application-section__layout">
        <motion.div
          className="application-section__intro"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            Nộp hồ sơ trực tuyến
          </motion.p>
          <motion.h2
            id="application-title"
            className="heading-2"
            variants={fadeUp}
          >
            Hoàn tất hồ sơ nhanh chóng, theo dõi dễ dàng
          </motion.h2>
          <motion.p
            className="lead application-section__lead"
            variants={fadeUp}
          >
            Gửi hồ sơ ngay trên website và nhận thông báo khi hồ sơ được tiếp
            nhận, cần bổ sung hoặc đã hoàn tất.
          </motion.p>
          <motion.ol className="application-steps" variants={stagger}>
            {steps.map(({ icon: Icon, number, title }) => (
              <motion.li key={number} variants={fadeUp}>
                <strong>{number}</strong>
                <span className="application-steps__icon">
                  <Icon size={27} />
                </span>
                <h3>{title}</h3>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        <motion.form
          className="application-card"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="application-card__head">
            <h3>Hồ sơ đăng ký</h3>
            <span>
              <i /> Bản nháp
            </span>
          </div>
          <label>
            <span>Họ và tên</span>
            <input placeholder="Nhập họ và tên" />
          </label>
          <label>
            <span>Chương trình đăng ký</span>
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
          <label className="application-upload">
            <input className="sr-only" type="file" />
            <FileText size={52} />
            <Upload className="application-upload__badge" size={22} />
            <b>Kéo thả hồ sơ vào đây</b>
            <u>hoặc chọn tệp từ thiết bị</u>
            <small>PDF, JPG, PNG • Tối đa 10 MB/tệp</small>
          </label>
          <div className="application-file">
            <FileText size={25} />
            <span>bang-cap.pdf</span>
            <b>Đã tải lên</b>
            <CheckCircle2 size={22} />
          </div>
          <a className="application-card__submit" href="/nop-ho-so">
            Nộp hồ sơ
          </a>
          <span className="application-card__secure">
            <LockKeyhole size={18} /> Dữ liệu được bảo mật và chỉ dùng cho công
            tác tuyển sinh.
          </span>
        </motion.form>
      </div>
    </section>
  );
}
