"use client";

import { useLanguage } from "@/context/LanguageContext";

const aboutHeroTranslations = {
  ar: {
    badge: "من نحن - Smart Schools Complex",
    title: "نصنع المستقبل التعليمي بأحدث التقنيات والمعايير العالمية",
    description:
      "نظُم تعليمية متكاملة تجمع بين الإدارة الذكية، التعليم المدمج، وبيئة تربوية محفزة لبناء جيل مبتكر وقادر على مواكبة العصر. نحن نؤمن بأن المستقبل يُبنى بالابتكار والتكنولوجيا المستدامة.",
    details:
      "تتكون منظومة Pioneers E-School ERP من هيكل إداري وتقني متكامل تحت مراقبة خبراء في إدارة المدارس الدولية واللغات. يغطي النظام كافة الاحتياجات بدءاً من إدارة شؤون الطلاب، الحسابات، الموارد البشرية، وحتى الكنترول المدرسي، والبوابة الإلكترونية، والعيادة المدرسية، والمكتبات، والحافلات المدرسية، ليضمن تجربة رقمية شاملة لكل عناصر المنظومة التعليمية من طلاب، معلمين، وأولياء أمور.",
  },
  en: {
    badge: "About Us - Smart Schools Complex",
    title:
      "Shaping the Educational Future with Cutting-Edge Technology and Global Standards",
    description:
      "Integrated educational systems combining smart management, blended learning, and a stimulating educational environment to build an innovative generation capable of keeping pace with the era.",
    details:
      "The Pioneers E-School ERP system consists of an integrated administrative and technical framework supervised by international and language school management experts. The system covers all needs starting from student affairs, accounting, HR, school control, electronic portal, school clinic, libraries, and school buses, ensuring a comprehensive digital experience for all stakeholders.",
  },
};

export default function HeroSection() {
  const { language } = useLanguage() as { language: "ar" | "en" };
  const t = aboutHeroTranslations[language] || aboutHeroTranslations.ar;

  return (
    <section
      className="
    relative
    bg-[#0B192C]
    text-white
    min-h-screen
    flex
    items-center
    justify-center
    py-16
    sm:py-20
    md:py-24
    px-4
    sm:px-6
    md:px-12
    text-center
    overflow-hidden
    shadow-xl
  "
    >
      {/* خلفية متدرجة تجمع بين الكحلي الغامق ولمسة من اللون #0e7490 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#0e7490]/30 via-[#0B192C] to-[#0B192C] z-0"></div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-6 sm:space-y-8">
        <span className="bg-[#0e7490]/20 text-white border border-[#0e7490]/40 text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-full inline-flex items-center gap-2 shadow-md max-w-full text-center">
          {/* نقطة اللمعة المتحركة */}
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-cyan-500 shadow-[0_0_8px_#22d3ee]"></span>
          </span>

          {/* النص */}
          <span className="truncate">{t.badge}</span>
        </span>

        {/* العنوان الرئيسي */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-snug sm:leading-tight text-white">
          <span className="text-white block mb-1.5 sm:mb-2 text-xl sm:text-2xl md:text-3xl opacity-90">
            Smart Schools Complex
          </span>
          {t.title}
        </h1>

        {/* الوصف الرئيسي */}
        <p className="text-sm sm:text-base md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          {t.description}
        </p>

        {/* التفاصيل الموسعة */}
        <div className="pt-5 sm:pt-6 border-t border-gray-800 max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm md:text-lg text-gray-300 leading-relaxed text-justify md:text-center">
            {t.details}
          </p>
        </div>
      </div>
    </section>
  );
}
