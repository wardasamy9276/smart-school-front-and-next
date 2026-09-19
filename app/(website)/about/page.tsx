import HeroSection from "./HeroSection";
import VisionMission from "./VisionMission";
import CoreValues from "./CoreValues";
// import FounderMessage from "./FounderMessage";
import SchoolMilestones from "./SchoolMilestones";
import LeadershipTeam from "./LeadershipTeam";
import StatisticsCounter from "./StatisticsCounter";
import CampusFacilities from "./CampusFacilities";

import VideoGallery from "./VideoGallery";

// import AccreditationPartners from "./AccreditationPartners";
// import CallToAction from "./CallToAction";
function page() {
  return (
    <div>
      <HeroSection />
      <VideoGallery />
      <VisionMission />
      <CoreValues />
      {/* <FounderMessage /> */}
      <SchoolMilestones />
      <LeadershipTeam />
      <StatisticsCounter />
      <CampusFacilities />
      {/* <AccreditationPartners /> */}
      {/* <CallToAction /> */}
    </div>
  );
}

export default page;
