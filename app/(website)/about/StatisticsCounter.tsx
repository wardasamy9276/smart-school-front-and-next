// "use client";

// import React from "react";
// import { useLanguage } from "@/context/LanguageContext";

// export default function SmartEcosystemOverview() {
//   const { language } = useLanguage();

//   const content = {
//     ar: {
//       tag: "مستقبل التعليم الذكي",
//       headline:
//         "منظومة رقمية متكاملة تصنع معايير جديدة للتميز التعليمي في Smart Schools Complex",
//       description:
//         "نحن لا نقدم مجرد مدرساً أو كتاباً، بل نصيغ بيئة متكاملة تدار بأحدث تقنيات الـ ERP والـ LMS. يتقاطع فيها الإبداع البشري مع دقة الذكاء الاصطناعي لضمان إدارة ذكية، متابعة لحظية لولي الأمر، وتجربة تعليمية فريدة لكل طالب.",
//       highlights: [
//         "إدارة مدرسية ذكية بالكامل عبر السحابة",
//         "تواصل لحظي وفعال بين الإدارة، المعلم، وولي الأمر",
//         "مناهج تفاعلية ومختبرات ذكية للذكاء الاصطناعي",
//       ],
//       badgeText: "Enterprise ERP & LMS System",
//     },
//     en: {
//       tag: "The Future of Smart Education",
//       headline:
//         "An Integrated Digital Ecosystem Setting New Standards for Educational Excellence",
//       description:
//         "We don't just provide a classroom or a textbook; we engineer a comprehensive environment powered by cutting-edge ERP and LMS technologies. Where human creativity intersects with AI precision for smart management, real-time parent tracking, and unique learning.",
//       highlights: [
//         "Fully smart cloud-based school management",
//         "Real-time and effective communication across all pillars",
//         "Interactive curricula and advanced AI labs",
//       ],
//       badgeText: "Enterprise ERP & LMS System",
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;

//   return (
//     <section
//       className="py-28 px-4 md:px-12 bg-gradient-to-br from-[#082f49] via-[#0f3b4c] to-[#041e2b] text-white relative overflow-hidden"
//       dir={language === "ar" ? "rtl" : "ltr"}
//     >
//       {/* عناصر جمالية خلفية متطورة بدون كروت أو جداول */}
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-700/10 rounded-full blur-[120px] pointer-events-none" />

//       <div className="max-w-5xl mx-auto relative z-10">
//         {/* شارة الوسم */}
//         <div className="flex justify-center mb-6">
//           <span className="px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-xs md:text-sm font-extrabold tracking-widest uppercase border border-cyan-400/30 backdrop-blur-md">
//             {t.tag}
//           </span>
//         </div>

//         {/* العنوان الرئيسي الضخم */}
//         <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-8 leading-[1.3] tracking-tight text-white">
//           {t.headline}
//         </h2>

//         {/* الوصف التعريفي المنسدل */}
//         <p className="text-gray-300 text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed mb-12 font-normal">
//           {t.description}
//         </p>

//         {/* خط فاصل جمالي رفيع */}
//         <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full mb-12 opacity-80" />

//         {/* نقاط التركيز التعريفي بدون كروت */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-right">
//           {t.highlights.map((item, idx) => (
//             <div key={idx} className="flex items-center gap-3">
//               <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0 shadow-lg shadow-cyan-400/50" />
//               <span className="text-sm md:text-base font-bold text-cyan-100">
//                 {item}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* توقيع النظام أسفل السيكشن */}
//         <div className="mt-16 text-center">
//           <span className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 font-semibold">
//             {t.badgeText} — Smart Schools Complex
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SmartSpotlightSection() {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const content = {
    ar: {
      tag: "رحلة ولي الأمر والطالب والمعلم",
      title: "كيف نغير مفهوم التعليم الرقمي في Smart Schools Complex؟",
      description:
        "منظومة واحدة تربط جميع أطراف العملية التعليمية بسلاسة تامة، لتوفير بيئة تعليمية ذكية ومستدامة.",
      steps: [
        {
          title: "لإدارة المدارس والتحكم الشامل",
          subtitle: "لوحة تحكم ذكية وإدارة كاملة",
          text: "تتيح لوحة التحكم الإدارية تعديل محتوى الموقع لحظياً، متابعة التقارير المالية والإدارية، إدارة شؤون الموظفين، والتحكم الكامل بنظام القبول والتقديم الإلكتروني للطلاب الجدد بكل مرونة ودقة.",
          action: "إدارة متكاملة ERP",
        },
        {
          title: "للمعلم والعملية التعليمية",
          subtitle: "أدوات رقمية متقدمة لتدريس فعّال",
          text: "يستطيع المعلم إنشاء الفصول الذكية، رفع المحاضرات والفيديوهات المسجلة، إضافة الواجبات واختبارات الإنترنت، وترصيد النتائج الشهرية بكل سهولة لضمان تفاعل مستمر مع الطلاب.",
          action: "منصة المعلم LMS",
        },
        {
          title: "للطالب وتجربة التعلم الممتعة",
          subtitle: "بوابة تفاعلية ومخزن رقمي شخصي",
          text: "يحصل الطالب على مخزن شخصي للمستندات والفيديوهات، استعراض الجداول والواجبات، الدخول المباشر للفصول الذكية، والتواصل الآمن والمباشر مع زملائه ومعلميه.",
          action: "بوابة الطالب الذكية",
        },
        {
          title: "لولي الأمر والمتابعة اللحظية",
          subtitle: "اطمئنان دائم ومتابعة مستمرة للأبناء",
          text: "متابعة فورية للتقييمات، الحضور والغياب، كشوف الحسابات المالية ومواعيد الأقساط مع إمكانية طباعة المطالبات المالية بكل سهولة لضمان الشراكة الكاملة مع المدرسة.",
          action: "متابعة ولي الأمر",
        },
      ],
    },
    en: {
      tag: "Parents, Students & Teachers Journey",
      title: "How We Transform Digital Education at Smart Schools Complex",
      description:
        "A unified ecosystem connecting all pillars of the educational process seamlessly for a smart, sustainable learning environment.",
      steps: [
        {
          title: "For School Management & Full Control",
          subtitle: "Smart Dashboard & Complete Management",
          text: "The admin dashboard allows instant content updates, financial and HR tracking, staff management, and complete control over the online admissions system for new students with total flexibility.",
          action: "Integrated ERP Management",
        },
        {
          title: "For Teachers & The Educational Process",
          subtitle: "Advanced Digital Tools for Effective Teaching",
          text: "Teachers can create smart classes, upload recorded lectures and videos, assign homework and online exams, and record monthly results easily to ensure continuous student engagement.",
          action: "Teacher LMS Platform",
        },
        {
          title: "For Students & Engaging Learning",
          subtitle: "Interactive Portal & Personal Digital Vault",
          text: "Students get a personal vault for files and videos, review timetables and homework, access smart classes directly, and communicate securely with peers and teachers.",
          action: "Smart Student Portal",
        },
        {
          title: "For Parents & Real-time Tracking",
          subtitle: "Constant Peace of Mind & Continuous Follow-up",
          text: "Instant tracking of evaluations, attendance, financial statements, and installment dates with the ability to print financial demands easily to ensure full partnership with the school.",
          action: "Parent Dashboard",
        },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const currentStep = t.steps[activeStep];

  return (
    <section
      className="py-24 px-4 md:px-12 bg-gradient-to-b from-white via-cyan-50/20 to-white relative overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* خلفية جمالية انسيابية */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* رأس السيكشن */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-sm font-bold tracking-wide border border-cyan-200">
            {t.tag}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f3b4c] mb-6 tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* تصميم السرد التفاعلي (Interactive Storytelling Spotlight) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[2.5rem] p-8 md:p-14 border border-cyan-100 shadow-xl shadow-cyan-950/5">
          {/* قائمة الاختيار الجانبية (بدون كروت تقليدية) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {t.steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl text-start transition-all duration-300 font-bold flex items-center justify-between cursor-pointer ${
                  activeStep === idx
                    ? "bg-cyan-700 text-white shadow-lg shadow-cyan-700/25 scale-[1.02]"
                    : "bg-gray-50 text-gray-700 hover:bg-cyan-50/50 hover:text-cyan-900 border border-gray-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                      activeStep === idx
                        ? "bg-white text-cyan-700"
                        : "bg-cyan-100 text-cyan-800"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="text-sm md:text-base font-extrabold leading-snug">
                    {step.title}
                  </span>
                </div>
                <span className="text-lg">→</span>
              </button>
            ))}
          </div>

          {/* عرض التفاصيل التفاعلية المتغيرة */}
          <div className="lg:col-span-7 bg-gradient-to-br from-cyan-900 via-[#0f3b4c] to-cyan-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="text-xs font-black tracking-widest uppercase text-cyan-300 bg-cyan-500/20 px-3.5 py-1.5 rounded-full border border-cyan-400/30 inline-block mb-6">
                {currentStep.subtitle}
              </span>
              <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight text-white">
                {currentStep.title}
              </h3>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed font-normal mb-8">
                {currentStep.text}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 tracking-wider">
                {currentStep.action}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold">
                Smart Schools Complex
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
