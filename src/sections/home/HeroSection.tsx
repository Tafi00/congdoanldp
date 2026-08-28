import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  UsersRound,
} from "lucide-react";
import { assets } from "../../data/assets";
import { fadeUp, stagger } from "../../lib/motion";
import { Button } from "../../components/ui/Button";
import "./HeroSection.css";

const heroSlides = [
  {
    image: assets.heroEvent01,
    label: "Khởi động hoạt động đào tạo",
    title: ["Bồi dưỡng năng lực", "Vững bước sự nghiệp giáo dục"],
    description:
      "Nâng cao chuyên môn, nghiệp vụ công đoàn, sư phạm và quản lý giáo dục cho đội ngũ cán bộ, giáo viên trên toàn quốc.",
    alt: "Cán bộ phát biểu tại lễ khởi động hoạt động đào tạo",
  },
  {
    image: assets.heroEvent02,
    label: "Đồng hành cùng đội ngũ",
    title: ["Đồng hành cùng đội ngũ", "kiến tạo tương lai giáo dục"],
    description:
      "Tạo không gian học tập thực tiễn, nơi mỗi cán bộ được tiếp thêm năng lực và cảm hứng để phát triển nghề nghiệp.",
    alt: "Cán bộ giáo dục phát biểu tại sự kiện",
  },
  {
    image: assets.heroEvent03,
    label: "Kết nối cộng đồng giáo dục",
    title: ["Kết nối tri thức", "lan tỏa giá trị giáo dục"],
    description:
      "Gắn kết cán bộ, giảng viên và các đơn vị giáo dục để chia sẻ kinh nghiệm, cùng nâng cao chất lượng đội ngũ.",
    alt: "Đại biểu tham dự chương trình đào tạo",
  },
  {
    image: assets.heroEvent04,
    label: "Chia sẻ tri thức thực tiễn",
    title: ["Từ thực tiễn", "đến năng lực dẫn dắt"],
    description:
      "Các chương trình bồi dưỡng được thiết kế sát với công việc, giúp người học tự tin ứng dụng ngay trong đơn vị.",
    alt: "Hai cán bộ ký kết thỏa thuận tại chương trình",
  },
  {
    image: assets.heroEvent05,
    label: "Vững bước sự nghiệp giáo dục",
    title: ["Trao cơ hội học tập", "mở rộng hướng phát triển"],
    description:
      "Linh hoạt về nội dung và hình thức, đồng hành cùng cán bộ công đoàn, giáo viên và cán bộ quản lý trên cả nước.",
    alt: "Đại diện chương trình trao quyết định",
  },
  {
    image: assets.heroEvent06,
    label: "Lan tỏa tinh thần học tập",
    title: ["Đổi mới để thích ứng", "với yêu cầu mới"],
    description:
      "Cập nhật phương pháp, công nghệ và tư duy quản trị để đội ngũ giáo dục luôn sẵn sàng trước những chuyển động mới.",
    alt: "Đại biểu trao đổi trong lễ khởi động",
  },
  {
    image: assets.heroEvent07,
    label: "Cùng nhau phát triển",
    title: ["Gắn kết đội ngũ", "nâng tầm nhà trường"],
    description:
      "Cùng xây dựng một cộng đồng giáo dục đoàn kết, chuyên nghiệp và bền vững từ nền tảng gần 50 năm phát triển.",
    alt: "Tập thể cán bộ giáo dục chụp ảnh lưu niệm",
  },
] as const;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const activeSlide = heroSlides[activeIndex];

  const goToSlide = useCallback((index: number) => {
    const nextIndex = (index + heroSlides.length) % heroSlides.length;
    setActiveIndex(nextIndex);
  }, []);

  useEffect(() => {
    if (isPaused || isHovering) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isHovering, isPaused]);

  return (
    <section
      className="hero hero--slider"
      aria-labelledby="hero-title"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="hero__slides" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            className={`hero__slide ${index === activeIndex ? "is-active" : ""}`}
            key={slide.image}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          key={activeIndex}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero__kicker" variants={fadeUp}>
            <span>Đào tạo</span>
            <i />
            <span>Bồi dưỡng</span>
            <i />
            <span>Phát triển</span>
          </motion.p>

          <motion.p className="hero__slide-label" variants={fadeUp} aria-live="polite">
            <span />
            {activeSlide.label}
          </motion.p>

          <motion.h1 id="hero-title" className="display hero__title" variants={fadeUp}>
            {activeSlide.title[0]} <br /> {activeSlide.title[1]}
          </motion.h1>

          <motion.p className="lead hero__description" variants={fadeUp}>
            {activeSlide.description}
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp}>
            <Button href="/dang-ky" arrow>
              Đăng ký chương trình
            </Button>
            <Button href="/nop-ho-so" variant="secondary">
              Nộp hồ sơ trực tuyến
            </Button>
          </motion.div>

          <motion.div className="hero__trust" variants={fadeUp}>
            <span className="hero__trust-icon">
              <UsersRound size={21} aria-hidden="true" />
            </span>
            <span>Đơn vị trực thuộc Công đoàn Giáo dục Việt Nam</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__gallery-note" aria-hidden="true">
        <span className="hero__gallery-note-index">{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="hero__gallery-note-divider" />
        <span>{String(heroSlides.length).padStart(2, "0")}</span>
        <span className="hero__gallery-note-copy">Hoạt động nổi bật</span>
      </div>

      <div className="hero__controls" aria-label="Điều khiển ảnh nổi bật">
        <button
          className="hero__control hero__control--arrow"
          type="button"
          onClick={() => goToSlide(activeIndex - 1)}
          aria-label="Ảnh trước"
        >
          <ChevronLeft size={19} aria-hidden="true" />
        </button>

        <div className="hero__dots" role="tablist" aria-label="Chọn ảnh nổi bật">
          {heroSlides.map((slide, index) => (
            <button
              className={`hero__dot ${index === activeIndex ? "is-active" : ""}`}
              key={slide.image}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Xem ảnh ${index + 1}: ${slide.label}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <button
          className="hero__control hero__control--arrow"
          type="button"
          onClick={() => goToSlide(activeIndex + 1)}
          aria-label="Ảnh tiếp theo"
        >
          <ChevronRight size={19} aria-hidden="true" />
        </button>

        <button
          className="hero__control hero__control--pause"
          type="button"
          aria-pressed={isPaused}
          aria-label={isPaused ? "Tiếp tục tự động chuyển ảnh" : "Tạm dừng tự động chuyển ảnh"}
          onClick={() => setIsPaused((paused) => !paused)}
        >
          {isPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      </div>

      <p className="sr-only">{activeSlide.alt}</p>

      <a className="hero__scroll" href="#gioi-thieu" aria-label="Xem phần giới thiệu">
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
