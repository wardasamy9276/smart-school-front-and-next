import ChoolsPage from "../(website)/home/choolsPage";
import Hero from "../(website)/home/Hero";
import FeaturesPage from "../(website)/home/FeaturesPage";
// import Hero from "./home/Hero";
import WhyChooseUsCard from "../(website)/home/WhyChooseUsCard";
import SchoolSlider from "../(website)/home/SchoolSlider";
import SchoolsPage from "../(website)/home/SchoolsPage";
import BookDemo from "../(website)/home/book-demo";
// import SchoolsStagesPage from "./home/SchoolsStagesPage";
import StagesPage from "../(website)/home/stagespage";
import Activities from "../(website)/home/Activities";

import SmartSchoolsRoadmapAndCenterColumn from "./features/SmartSchoolsRoadmapAndCenterColumn";
import Activitiespage from "./home/activitiespage";
// php artisan migrate:fresh --seed   للحفظ
function page() {
  return (
    <div>
      <Hero />
      <FeaturesPage />
      <Activities />
      <SmartSchoolsRoadmapAndCenterColumn />
      <SchoolSlider />
      <WhyChooseUsCard />
      <StagesPage />
      {/* <Activitiespage /> */}
      {/* <SchoolsStagesPage />  */}
      <SchoolsPage />
      <ChoolsPage />
      <BookDemo />
    </div>
  );
}

export default page;
