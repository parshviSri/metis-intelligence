import Nav from "../components/layout/Nav";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Framework from "../components/sections/Framework";
import DiagnosticPreview from "../components/sections/DiagnosticPreview";
import CaseStudies from "../components/sections/CaseStudies";
import SocialProof from "../components/sections/SocialProof";
import CTA from "../components/sections/CTA";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Framework />
      <DiagnosticPreview />
      <CaseStudies />
      <SocialProof />
      <Footer />
    </div>
  );
}
