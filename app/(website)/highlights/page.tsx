import { useLanguage } from "@/context/LanguageContext";
import SmartSchoolHexagonGrid from "./SmartSchoolHexagonGrid";
import SmartSchoolConciergeHub from "./SmartSchoolConciergeHub";
import SmartSchoolRadarNexus from "./SmartSchoolRadarNexus";

import Contact from "./contact";

function page() {
  return (
    <div>
      <SmartSchoolRadarNexus />
      <SmartSchoolHexagonGrid />
      <SmartSchoolConciergeHub />
      <Contact />
    </div>
  );
}

export default page;
