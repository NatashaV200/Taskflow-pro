import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { Footer } from "@/components/landing/Footer";

const Landing = () => (
  <div className="min-h-screen">
    <LandingNavbar />
    <HeroSection />
    <FeaturesSection />
    <WorkflowSection />
    <TestimonialsSection />
    <PricingSection />
    <Footer />
  </div>
);

export default Landing;
