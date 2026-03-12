import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { Footer } from "@/components/landing/Footer";
import { SEO } from "@/components/SEO";

const Landing = () => (
  <div className="min-h-screen">
    <SEO
      title="Project & Workflow Management"
      description="Plan projects, manage tasks, automate workflows, and collaborate with your team in one streamlined platform."
      path="/"
      keywords="project management, task management, workflow automation, team collaboration"
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "TaskFlow Pro",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "TaskFlow Pro helps teams organize projects, automate workflows, and collaborate in real time.",
          url: "/",
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TaskFlow Pro",
          url: "/",
          logo: "/og-taskflow.png",
        },
      ]}
    />
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
