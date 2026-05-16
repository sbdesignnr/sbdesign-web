import HeroSection from "@/components/sections/HeroSection";
import StatementSection from "@/components/sections/StatementSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedWorkSection from "@/components/sections/FeaturedWorkSection";
import ProcessSection from "@/components/sections/ProcessSection";

export default function Home() {
  return (
    <main style={{ background: 'transparent' }}>
      <HeroSection />
      <StatementSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <ProcessSection />
    </main>
  );
}
