import { Hero } from "../components/Hero";
import { PainPoints } from "../components/PainPoints";
import { FeatureScroll } from "../components/FeatureScroll";
import { CtaSection } from "../components/CtaSection";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <PainPoints />
      <FeatureScroll />
      <div className="hidden md:block">
        <CtaSection />
      </div>
    </>
  );
};
