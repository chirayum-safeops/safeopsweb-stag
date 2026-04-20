import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";

import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import DeliverablesSection from "@/components/DeliverablesSection";
import StakeholderSection from "@/components/StakeholderSection";
import IndustriesSection from "@/components/IndustriesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import WhySafeOpsSection from "@/components/WhySafeOpsSection";

import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <StakeholderSection />
      <ServicesSection />
      <ProcessSection />
      <DeliverablesSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <WhySafeOpsSection />
      
      <FAQSection />
      <ContactSection />
      <Footer />
      
    </div>
  );
};

export default Index;
