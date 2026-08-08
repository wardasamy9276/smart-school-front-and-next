import SmartClientsHomePage from "./SmartClientsHomePage";
import SmartClientStoriesPage from "./SmartClientStoriesPage";
import SmartSchoolBentoWidget from "./SmartSchoolBentoWidget";
function page() {
  return (
    <div>
      <SmartClientsHomePage />
      <SmartClientStoriesPage />
      <SmartSchoolBentoWidget />
    </div>
  );
}

export default page;
