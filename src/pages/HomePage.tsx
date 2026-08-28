import { HeroSection } from "../sections/home/HeroSection";
import { AboutProgramsSection } from "../sections/home/AboutProgramsSection";
import { RegistrationSection } from "../sections/home/RegistrationSection";
import { OnlineApplicationSection } from "../sections/home/OnlineApplicationSection";
import { PracticeTestSection } from "../sections/home/PracticeTestSection";
import { HomeCtaSection } from "../sections/home/HomeCtaSection";
import { LeadershipNewsSection } from "../sections/home/LeadershipNewsSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <LeadershipNewsSection />
      <AboutProgramsSection />
      <RegistrationSection />
      <OnlineApplicationSection />
      <PracticeTestSection />
      <HomeCtaSection />
    </>
  );
}
