"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Feature {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
}

export default function SmartSchoolsExactSixRoadmap() {
  const { language } = useLanguage();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAll, setShowAll] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  <div className="text-center p-12 text-cyan-400 font-bold bg-[#041e2b]">
    جاري التحميل...
  </div>;

  if (error)
    return (
      <div className="text-center p-12 text-red-400 font-bold bg-[#041e2b]">
        حدث خطأ: {error}
      </div>
    );

  const isRtl = language === "ar";
  const displayedFeatures = showAll ? features : features.slice(0, 6);

  const toggleCardExpand = (id: number) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="bg-[#041e2b] text-white min-h-screen overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* =========================================================
        1. السيكشن الأول: 6 كروت بنفس تصميم الصورة تماماً، 
           مع خط رفيع جداً ومتحرك ومنور يمر بمنتصف الكروت وبينها.
         ========================================================= */}
      <section className="relative py-28 px-4 md:px-12 overflow-hidden">
        {/* خلفية ضوئية خافتة مطابقة للصورة */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-cyan-500/10 rounded-full blur-[190px] pointer-events-none" />

        {/* خط رفيع جداً ومتحرك ومنور يمر بين الكروت وفي المنتصف تماماً */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
          <svg
            className="w-full h-full max-w-7xl opacity-60"
            viewBox="0 0 1200 800"
            fill="none"
          >
            <path
              d="M 150 150 Q 600 50 1050 250 T 600 650"
              stroke="url(#thinGlowingLine)"
              strokeWidth="2"
              strokeDasharray="8 8"
              className="animate-[dash_15s_linear_infinite]"
            />
            <defs>
              <linearGradient
                id="thinGlowingLine"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* عنوان السيكشن */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="inline-block mb-4 px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-xs md:text-sm font-extrabold tracking-widest uppercase border border-cyan-400/30 backdrop-blur-md">
              {isRtl
                ? "خريطة منظومة Smart Schools Complex"
                : "Smart Schools Complex Roadmap"}
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
              {isRtl
                ? "رحلة رقمية متكاملة لإدارة مدرستك"
                : "An Integrated Digital Journey"}
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {isRtl
                ? "انتقل بمؤسستك التعليمية إلى آفاق جديدة من الأتمتة عبر خطوات ذكية ومنظمة بدقة تامة."
                : "Transition your educational institution to new horizons of automation through smart, structured steps."}
            </p>
          </div>

          {/* شبكة الـ 6 كروت الكبيرة بنمط متعرج مطابق للصورة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
            {/* STEP_01 */}
            <div className="bg-[#072533]/85 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-cyan-500/30 shadow-2xl relative group transition-all duration-500">
              <div className="absolute top-0 right-12 w-28 h-1 bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
              <span className="text-xs font-mono tracking-widest text-cyan-400 mb-4 block">
                STEP_01
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                {isRtl ? "التسجيل والقبول الإلكتروني" : "Online Admission"}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {isRtl
                  ? "نظام أساسي يساعد في إدارة مهام القبول اليومية وتسهيل تسجيل الطلاب الجدد عبر منصة موحدة وآمنة تماماً."
                  : "An essential platform helping manage daily admission tasks and simplifying new student registration."}
              </p>
            </div>

            {/* STEP_02 (مزاحة للأعلى قليلاً) */}
            <div className="bg-[#072533]/85 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-emerald-500/30 shadow-2xl relative group transition-all duration-500 lg:-mt-8">
              <div className="absolute top-0 right-12 w-28 h-1 bg-emerald-400 shadow-[0_0_12px_#34d399]" />
              <span className="text-xs font-mono tracking-widest text-emerald-400 mb-4 block">
                STEP_02
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                {isRtl ? "نظام التعليم الذكي (LMS)" : "Smart Learning (LMS)"}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {isRtl
                  ? "رقمنة تجربة التعلم عبر الإنترنت، فصول ذكية، اختبارات إلكترونية، ودفاتر درجات تفاعلية للطلاب والمعلمين."
                  : "Digitizing the online learning experience, smart classes, electronic tests, and interactive gradebooks."}
              </p>
            </div>

            {/* STEP_03 */}
            <div className="bg-[#072533]/85 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-amber-500/30 shadow-2xl relative group transition-all duration-500">
              <div className="absolute top-0 right-12 w-28 h-1 bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
              <span className="text-xs font-mono tracking-widest text-amber-400 mb-4 block">
                STEP_03
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                {isRtl
                  ? "الإدارة المالية والرسوم"
                  : "Financial & Fees Management"}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {isRtl
                  ? "تخطيط وتخصيص هياكل الرسوم المختلفة للطلاب، وإدارة الموارد البشرية وكشوف المرتبات وقسائم الرواتب بدقة."
                  : "Planning and allocating fee structures, managing human resources, payrolls, and employee slips accurately."}
              </p>
            </div>

            {/* STEP_04 (مزاحة للأعلى قليلاً) */}
            <div className="bg-[#072533]/85 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-rose-500/30 shadow-2xl relative group transition-all duration-500 lg:-mt-8">
              <div className="absolute top-0 right-12 w-28 h-1 bg-rose-400 shadow-[0_0_12px_#fb7185]" />
              <span className="text-xs font-mono tracking-widest text-rose-400 mb-4 block">
                STEP_04
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                {isRtl
                  ? "التواصل والتعاون الفعال"
                  : "Collaboration & Communication"}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {isRtl
                  ? "أداة تعاون ممتازة باستخدام المؤتمرات المرئية، الاستطلاعات، المدونات، وتطبيق الموبايل لربط أطراف المنظومة."
                  : "An excellent collaboration tool using video conferences, polls, blogs, and a mobile app to connect stakeholders."}
              </p>
            </div>

            {/* STEP_05 */}
            <div className="bg-[#072533]/85 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-purple-500/30 shadow-2xl relative group transition-all duration-500">
              <div className="absolute top-0 right-12 w-28 h-1 bg-purple-400 shadow-[0_0_12px_#c084fc]" />
              <span className="text-xs font-mono tracking-widest text-purple-400 mb-4 block">
                STEP_05
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                {isRtl ? "إدارة الجداول والحضور" : "Schedules & Attendance"}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {isRtl
                  ? "تنظيم الجداول المدرسية اليومية ومتابعة حضور وغياب الطلاب والمعلمين بلحظة وتوفير تقارير آلية."
                  : "Organizing daily school timetables and tracking student and staff attendance with automated reports."}
              </p>
            </div>

            {/* STEP_06 (مزاحة للأعلى قليلاً) */}
            <div className="bg-[#072533]/85 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-blue-500/30 shadow-2xl relative group transition-all duration-500 lg:-mt-8">
              <div className="absolute top-0 right-12 w-28 h-1 bg-blue-400 shadow-[0_0_12px_#60a5fa]" />
              <span className="text-xs font-mono tracking-widest text-blue-400 mb-4 block">
                STEP_06
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                {isRtl
                  ? "التقارير والتحليلات الذكية"
                  : "Smart Reports & Analytics"}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {isRtl
                  ? "لوحات معلومات متقدمة تعرض تحليلات شاملة لأداء المدرسة ومستوى الطلاب المالي والأكاديمي."
                  : "Advanced dashboards displaying comprehensive analytics of school performance and academic status."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* فاصل جمالي */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* =========================================================
        2. السيكشن الثاني: عرض كروت الداتا (6 كروت ثم زر المزيد/أقل)
         ========================================================= */}

      {/* إضافة الأنيماشن للخط المتحرك */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
}
