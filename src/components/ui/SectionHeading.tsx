import type { ReactNode } from "react";
import clsx from "clsx";
import "./SectionHeading.css";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={clsx("section-heading", `section-heading--${align}`, className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="heading-2 section-heading__title">{title}</h2>
      {description && <p className="lead section-heading__description">{description}</p>}
    </div>
  );
}
