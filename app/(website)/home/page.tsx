import ChoolsPage from "./choolsPage";
//
import FeaturesPage from "./FeaturesPage";
import Hero from "./Hero";
import WhyChooseUsCard from "./WhyChooseUsCard";
import SchoolSlider from "./SchoolSlider";
import SchoolsPage from "./SchoolsPage";
import BookDemo from "./book-demo";
// import SchoolsStagesPage from "./home/SchoolsStagesPage";
import StagesPage from "./stagespage";
import Activities from "./Activities";
// import Activitiespage from "./home/activitiespage";
// php artisan migrate:fresh --seed   للحفظ
function page() {
  return (
    <div>
      <Hero />
      <FeaturesPage />
      <Activities />
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
