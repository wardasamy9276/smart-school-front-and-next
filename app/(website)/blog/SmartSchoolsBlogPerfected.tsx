"use client";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, School } from "lucide-react";
import Typewriter from "typewriter-effect";
import Link from "next/link";

export default function SmartSchoolsHomePagePure() {
  const { language } = useLanguage() as {
    language: string;
    toggleLanguage?: () => void;
    setLanguage?: (lang: string) => void;
  };

  const isRtl = language === "ar";

  const content = {
    ar: {
      tag: "المنظومة الرقمية المتكاملة لمجمع مدارس سمارت سكوول",
      heroTitle: "بوابة المستقبل الرقمي لمجمع مدارس",
      heroTitleHighlight: "Smart Schools Complex",
      typewriterStrings: [
        "بوابة الواقع التعليمي الذكي",
        "نظام ERP & LMS المتكامل",
        "مستقبل التعليم الرقمي",
        "المنظومة الذكية لإدارة المدارس",
      ],
      heroDesc:
        "نُقدم لك في مجمع مدارس Smart Schools Complex رؤية تقنية وتعليمية متكاملة ومتقدمة تدمج أحدث أنظمة إدارة التعلم الذكي (LMS) والحلول الإدارية الشاملة (ERP) في منصة رقمية واحدة فائقة الجودة. نعمل بكل دقة على توفير بيئة رقمية ذكية، مترابطة، وآمنة تماماً تربط إدارة المدارس، الهيئة التدريسية المتميزة، الطلاب، وأولياء الأمور لحظة بلحظة وبكل سهولة ويسر.",
      heroBtnPrimary: "استكشف خدمات المنظومة",
      heroBtnSecondary: "طلب عرض توضيحي",
    },
    en: {
      tag: "Integrated Digital Ecosystem for Smart Schools Complex",
      heroTitle: "Gateway to the Digital Future of",
      heroTitleHighlight: "Smart Schools Complex",
      typewriterStrings: [
        "Smart Educational Portal",
        "Integrated ERP & LMS System",
        "Future of Digital Education",
        "Smart School Management System",
      ],
      heroDesc:
        "At Smart Schools Complex, we provide an integrated and advanced technical and educational vision combining state-of-the-art Learning Management Systems (LMS) with comprehensive administrative solutions (ERP) into a single high-quality digital platform. We strive with precision to deliver a smart, interconnected, and fully secure digital environment connecting school administration, distinguished teaching staff, students, and parents in real-time with ultimate ease.",
      heroBtnPrimary: "Explore System Services",
      heroBtnSecondary: "Request Demo",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;

  return (
    <div
      className="bg-[#085870] text-white min-h-screen flex flex-col justify-between overflow-x-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* محتوى الصفحة الرئيسية */}
      <main className="flex-grow flex flex-col justify-center">
        <section className="relative py-20 px-4 md:px-12 overflow-hidden">
          <div
            className="
       bg-[#0e7490]
           "
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* عنوان Smart Schools العلوي */}
            <div className="mb-4">
              <span className="text-xl md:text-2xl font-bold text-white tracking-wider uppercase">
                Smart Schools Complex
              </span>
            </div>

            {/* التايتل الفرعي العلوي */}
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium tracking-wide uppercase border border-white/20">
              {t.tag}
            </span>

            {/* العنوان الرئيسي أبيض بالكامل */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {t.heroTitle}{" "}
              <span className="text-white font-bold">
                {t.heroTitleHighlight}
              </span>
              <br />
              <span
                className="inline-block mt-2 text-white font-normal text-xl sm:text-2xl md:text-3xl"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <Typewriter
                  options={{
                    strings: t.typewriterStrings,
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                  }}
                />
              </span>
            </h1>

            {/* الفقرة الوصفية باللون الأبيض */}
            <p className="text-white text-sm md:text-base max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              {t.heroDesc}
            </p>

            {/* الأزرار الموجهة للصفحتين */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/services">
                <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-[#03141c] hover:bg-gray-200 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md">
                  {t.heroBtnPrimary} <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/demo">
                <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-transparent hover:bg-white/10 text-white font-medium text-sm border border-white/30 transition-all duration-300 cursor-pointer">
                  {t.heroBtnSecondary}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// text-[#0e7490]"
// #155e75
