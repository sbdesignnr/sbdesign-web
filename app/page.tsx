import HeroSection from "@/components/sections/HeroSection";
import StatementSection from "@/components/sections/StatementSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function Home() {
  return (
    <main style={{ background: 'transparent' }}>
      <HeroSection />
      <StatementSection />
      <ServicesSection />
    </main>
  );
}
