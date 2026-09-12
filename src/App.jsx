import "./App.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import VideoHero from "./components/VideoHero";
import LogoMarquee from "./components/LogoMarquee";
import FeatureRow from "./components/FeatureRow";
import { CinematicList } from "./components/ui/cinematic-list";
import FeatureSections from "./components/FeatureSections";
import ExpandingServices from "./components/ExpandingServices";
import Testimonials from "./components/Testimonials";
import CrodlinJournal from "./components/CrodlinJournal";
import LeadCapture from "./components/LeadCapture";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import PageShell from "./components/PageShell";
import SolutionsPage from "./pages/SolutionsPage";
import WhyCrodlinPage from "./pages/WhyCrodlinPage";

export default function App() {
  if (window.location.pathname === "/solutions") {
    return <PageShell mainClassName="solutions-page"><SolutionsPage /></PageShell>;
  }

  if (window.location.pathname === "/why-crodlin") {
    return <PageShell mainClassName="why-crodlin-page"><WhyCrodlinPage /></PageShell>;
  }

  return (
    <>
      <Nav />
      <main>
        <VideoHero />
        <Hero cover />
        <Hero />
        <LogoMarquee />
        <FeatureRow />
        <CinematicList />
        <FeatureSections />
        <ExpandingServices />
        <Testimonials />
        <CrodlinJournal />
        <LeadCapture />
        <Faq />
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}
