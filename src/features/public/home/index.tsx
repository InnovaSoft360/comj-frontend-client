import HeroSection from "./hero-section";
import LocalizatioSection from "./localization-section"
import InformationSection from "./information-section"
import ProcessoSection from "./processo-section";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <LocalizatioSection/>
      <InformationSection/>
      <ProcessoSection />
    </section>
  );
}
