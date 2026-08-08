import FeaturesOverview from "./FeaturesOverview";
import SmartEcosystemWorkflow from "./SmartEcosystemWorkflow";
import FeaturesList from "./FeaturesList";
import SmartSchoolsRoadmapAndCenterColumn from "./SmartSchoolsRoadmapAndCenterColumn";
import SmartSchoolsExactSixRoadmap from "./SmartSchoolsExactSixRoadmap";
function page() {
  return (
    <div>
      <FeaturesOverview />
      <SmartEcosystemWorkflow />
      <FeaturesList />
      <SmartSchoolsRoadmapAndCenterColumn />
      <SmartSchoolsExactSixRoadmap />
    </div>
  );
}

export default page;
