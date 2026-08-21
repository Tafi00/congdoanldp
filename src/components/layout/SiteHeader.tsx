import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { assets } from "../../data/assets";
import { Button } from "../ui/Button";
import "./SiteHeader.css";

const navItems = [
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Chương trình", to: "/chuong-trinh" },
  { label: "Nộp hồ sơ", to: "/nop-ho-so" },
  { label: "Thi thử", to: "/thi-thu" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink
          to="/"
          className="brand"
          aria-label="Trường Công đoàn Giáo dục Việt Nam"
        >
          <span className="brand__mark">
            <img src={assets.logo} alt="" />
          </span>
          <span className="brand__name">
            Trường Công đoàn Giáo dục Việt&nbsp;Nam
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="site-nav__link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button className="site-header__cta" href="/dang-ky">
          Đăng ký học
        </Button>

        <button
          className="menu-trigger"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Điều hướng di động"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mobile-nav__inner">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Button href="/dang-ky" onClick={() => setOpen(false)}>
                Đăng ký học
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
