import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import "./Button.css";

type ButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  arrow?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  arrow = false,
  ...props
}: ButtonProps) {
  return (
    <motion.a
      className={clsx("button", `button--${variant}`, className)}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 25 }}
      {...props}
    >
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" size={19} strokeWidth={2.2} />}
    </motion.a>
  );
}
