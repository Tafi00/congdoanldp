import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "../../data/assets";
import { fadeUp } from "../../lib/motion";
import "./PageHero.css";

type PageHeroProps={eyebrow?:string;title:string;description?:string;current:string};
export function PageHero({eyebrow,title,description,current}:PageHeroProps){return <section className="page-hero" style={{backgroundImage:`url(${assets.pageHeaderBackground})`}}><motion.div className="container" initial="hidden" animate="visible" variants={fadeUp}><nav className="page-hero__crumbs" aria-label="Đường dẫn"><a href="/">Trang chủ</a><ChevronRight size={15}/><span>{current}</span></nav>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h1 className="heading-1">{title}</h1>{description&&<p className="lead">{description}</p>}</motion.div></section>}
