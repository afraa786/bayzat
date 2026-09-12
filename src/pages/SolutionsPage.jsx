import SolutionsHero from "../components/SolutionsHero";
import FeatureRow from "../components/FeatureRow";
import { CinematicList } from "../components/ui/cinematic-list";
import FeatureSections from "../components/FeatureSections";
import ExpandingServices from "../components/ExpandingServices";

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <FeatureRow />
      <CinematicList />
      <FeatureSections />
      <ExpandingServices />
    </>
  );
}
