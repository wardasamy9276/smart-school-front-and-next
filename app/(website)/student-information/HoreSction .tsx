"use client";

import { useLanguage } from "@/context/LanguageContext";

// جعل الخصائص اختيارية باستخدام علامة الاستفهام ?
interface HoreProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

function Hore({ searchQuery = "", setSearchQuery = () => {} }: HoreProps) {
  const { language, t } = useLanguage();

  const isAr = language === "ar";

  return (
    <div>
      {/* Hero Section */}
      <section
        dir={isAr ? "rtl" : "ltr"}
        className="relative flex h-[100vh] items-center justify-center overflow-hidden bg-gradient-to-br from-[#0e7490] via-[#085064] to-[#043340] px-4 py-16 text-white sm:px-6 lg:px-8"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] opacity-10 [background-size:16px_16px]" />

        {/* Main Content */}
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          {/* Animated Academy Badge */}
          <div className="mb-6 flex justify-center">
            <span className="animate-move-badge inline-block rounded-full border border-[#9E7C2F]/30 bg-white px-8 py-3 text-lg font-bold tracking-wide text-[#9E7C2F] shadow-lg">
              {t.hero_academy_badge}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t.hero_title_start}{" "}
            <span className="text-[#9E7C2F]">{t.hero_title_highlight}</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-5xl text-lg leading-relaxed text-slate-200">
            {t.hero_description}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Courses */}
            <a
              href="/courses"
              className="rounded-2xl bg-[#9E7C2F] px-9 py-4 text-base font-black text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#866b28] hover:shadow-xl"
            >
              {t.explore_courses}
            </a>

            {/* Schools */}
            <a
              href="/schools"
              className="rounded-2xl border-2 border-white bg-white/10 px-9 py-4 text-base font-black text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#0e7490]"
            >
              {t.browse_schools}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hore;
