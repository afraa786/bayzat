import "./App.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import FeatureRow from "./components/FeatureRow";
import FeatureSections from "./components/FeatureSections";
import Testimonials from "./components/Testimonials";
import LeadCapture from "./components/LeadCapture";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero cover />
        <Hero />
        <LogoMarquee />
        <FeatureRow />
        <FeatureSections />
        <Testimonials />
        <LeadCapture />
        <Faq />
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}
