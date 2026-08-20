import { HeroSection } from "../sections/home/HeroSection";
import { AboutProgramsSection } from "../sections/home/AboutProgramsSection";
import { RegistrationSection } from "../sections/home/RegistrationSection";
import { OnlineApplicationSection } from "../sections/home/OnlineApplicationSection";
import { PracticeTestSection } from "../sections/home/PracticeTestSection";
import { HomeCtaSection } from "../sections/home/HomeCtaSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutProgramsSection />
      <RegistrationSection />
      <OnlineApplicationSection />
      <PracticeTestSection />
      <HomeCtaSection />
    </>
  );
}
