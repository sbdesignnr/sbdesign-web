import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Manifesto from "@/components/sections/Manifesto";
import Services from "@/components/sections/Services";
import SelectedWork from "@/components/sections/SelectedWork";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Manifesto />
      <Services />
      <SelectedWork />
      <Stats />
      <Process />
      <Testimonials />
      <CTASection />
    </main>
  );
}
