"use client";

import { Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import SportsActivity from "./SportsActivity";
import ArtActivity from "./ArtActivity";
import MusicActivity from "./MusicActivity";
// import CulturalActivity from "./CulturalActivity";
import ScienceActivity from "./ScienceActivity";
import Hero from "../school-activities/Hore";
import SchoolsSlider from "../home/SchoolSlider";

export default function SchoolActivitiesPage() {
  return (
    <>
      <Hero />
      <ArtActivity />
      <SchoolsSlider />
      <MusicActivity />
      {/* <CulturalActivity /> */}
      <ScienceActivity />

      {/* <CompetitionsActivity /> */}
    </>
  );
}
