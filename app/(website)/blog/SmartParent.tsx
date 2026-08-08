// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";
// import {
//   ShieldAlert,
//   CheckCircle,
//   FileText,
//   Wallet,
//   Sparkles,
// } from "lucide-react";

// export default function SmartParentPortalSection() {
//   const { language } = useLanguage() as { language: string };
//   const [activeTab, setActiveTab] = useState(0);

//   const content = {
//     ar: {
//       tag: "Smart Star - بوابة ولي الأمر الذكية",
//       mainTitle: "اطمئنان لحظي ومتابعة شاملة لمسيرة أبنائك التعليمية",
//       description:
//         "صُممت هذه المنظومة لتربط ولي الأمر بالمدرسة في الوقت الفعلي، لتوفير الشفافية الكاملة، متابعة الحضور والغياب، والاطلاع على التقارير المالية والأكاديمية بكل سهولة.",
//       tabs: [
//         {
//           title: "متابعة الحضور اليومي",
//           headline: "إشعارات فورية عند دخول وخروج الطالب",
//           desc: "يتلقى ولي الأمر تنبيهاً مباشراً لحظة دخول الطالب للمدرسة أو الفصل، مع تقارير شهرية دقيقة عن نسب الحضور والغياب والالتزام.",
//           icon: <CheckCircle className="w-5 h-5 text-cyan-300" />,
//         },
//         {
//           title: "النتائج والتقارير الأكاديمية",
//           headline: "رؤية تحليلية لمستوى الأداء الدراسي",
//           desc: "استعراض درجات الاختبارات الشهرية، الواجبات، والتقييمات السلوكية أولاً بأول لمساعدة الأبناء على التطور المستمر.",
//           icon: <FileText className="w-5 h-5 text-cyan-300" />,
//         },
//         {
//           title: "المصروفات والحسابات المالية",
//           headline: "شفافية كاملة في الأقساط والمطالبات",
//           desc: "إمكانية الاطلاع على كشوف الحسابات المالية، متابعة الأقساط المستحقة، واستخراج الإيصالات والمطالبات بكل مرونة وأمان.",
//           icon: <Wallet className="w-5 h-5 text-cyan-300" />,
//         },
//         {
//           title: "التواصل المباشر مع المعلمين",
//           headline: "شراكة حقيقية بين البيت والمدرسة",
//           desc: "قناة اتصال آمنة ومباشرة تتيح لولي الأمر التحدث مع معلمي المادة ومناقشة المستوى الدراسي في أي وقت.",
//           icon: <ShieldAlert className="w-5 h-5 text-cyan-300" />,
//         },
//       ],
//     },
//     en: {
//       tag: "Smart Star - Parent Portal",
//       mainTitle:
//         "Real-time Peace of Mind & Complete Tracking for Your Children",
//       description:
//         "Designed to connect parents with the school in real-time, ensuring total transparency, attendance tracking, and financial/academic updates.",
//       tabs: [
//         {
//           title: "Daily Attendance Tracking",
//           headline: "Instant Notifications Upon Student Arrival",
//           desc: "Parents receive direct alerts the moment the student enters the school or class, along with precise monthly attendance reports.",
//           icon: <CheckCircle className="w-5 h-5 text-cyan-300" />,
//         },
//         {
//           title: "Grades & Academic Reports",
//           headline: "Analytical Insight into Academic Performance",
//           desc: "Review monthly test scores, homework, and behavioral evaluations step-by-step to support continuous student growth.",
//           icon: <FileText className="w-5 h-5 text-cyan-300" />,
//         },
//         {
//           title: "Financial Accounts & Fees",
//           headline: "Full Transparency in Installments & Dues",
//           desc: "Easily view financial account statements, track upcoming installments, and print demands securely and flexibly.",
//           icon: <Wallet className="w-5 h-5 text-cyan-300" />,
//         },
//         {
//           title: "Direct Teacher Communication",
//           headline: "A True Partnership Between Home and School",
//           desc: "A secure, direct communication channel allowing parents to chat with teachers and discuss academic progress anytime.",
//           icon: <ShieldAlert className="w-5 h-5 text-cyan-300" />,
//         },
//       ],
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;
//   const currentTab = t.tabs[activeTab];

//   return (
//     <section
//       className="py-28 px-4 md:px-12 bg-[#0e495b] relative overflow-hidden"
//       dir={language === "ar" ? "rtl" : "ltr"}
//     >
//       {/* لمسات خلفية ضوئية جمالية */}
//       <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[160px] pointer-events-none" />

//       <div className="max-w-5xl mx-auto relative z-10">
//         {/* رأس القسم */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md">
//             <Sparkles className="w-4 h-4 text-cyan-300" />
//             {t.tag}
//           </span>
//           <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">
//             {t.mainTitle}
//           </h2>
//           <p className="text-white text-base md:text-lg leading-relaxed font-normal opacity-95">
//             {t.description}
//           </p>
//         </div>

//         {/* أزرار التبديل الأفقية الانسيابية */}
//         <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
//           {t.tabs.map((tab, idx) => (
//             <button
//               key={idx}
//               onClick={() => setActiveTab(idx)}
//               className={`px-6 py-3.5 rounded-2xl text-sm md:text-base font-bold transition-all duration-500 cursor-pointer flex items-center gap-2.5 ${
//                 activeTab === idx
//                   ? "bg-white text-[#0e495b] shadow-2xl scale-105 font-black"
//                   : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
//               }`}
//             >
//               <span>{tab.icon}</span>
//               <span>{tab.title}</span>
//             </button>
//           ))}
//         </div>

//         {/* المساحة المركزية الكبرى لعرض المحتوى */}
//         <div className="relative bg-white/5 backdrop-blur-3xl rounded-[3rem] p-8 md:p-20 border border-white/15 text-center shadow-2xl overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent pointer-events-none" />

//           <div className="relative z-10 max-w-3xl mx-auto">
//             <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-200 bg-white/10 px-5 py-2 rounded-full border border-white/20 inline-block mb-6 shadow-inner">
//               Smart Star Family Ecosystem
//             </span>

//             <h3 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight tracking-tight">
//               {currentTab.headline}
//             </h3>

//             <p className="text-white text-lg md:text-xl leading-relaxed font-normal opacity-95">
//               {currentTab.desc}
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function SmartStarSplitSection() {
  const { language } = useLanguage() as { language: string };

  const content = {
    ar: {
      tag: "Smart Star - المستقبل الرقمي",
      title: "منظومة متكاملة تضع مؤسستك في صدارة التميز التعليمي",
      description:
        "نحن نقدم رؤية متقدمة تدمج أحدث أنظمة الإدارة والتحكم السحابي لتوفير بيئة تعليمية ذكية، آمنة، وسهلة الاستخدام لكل أطراف العملية التعليمية.",
      points: [
        "إدارة شاملة لجميع شؤون المدارس والطلاب لحظياً",
        "واجهات مستخدم ملساء، سريعة، ومصممة بعناية فائقة",
        "دعم فني وتطوير مستمر يواكب أحدث المعايير العالمية",
      ],
      btnText: "استكشف مميزات النظام",
    },
    en: {
      tag: "Smart Star - Digital Future",
      title:
        "An Integrated Ecosystem Placing Your Institution at the Forefront",
      description:
        "We provide an advanced vision combining cutting-edge management and cloud control systems to deliver a smart, secure, and user-friendly educational environment.",
      points: [
        "Comprehensive real-time management for schools & students",
        "Smooth, fast user interfaces crafted with precision",
        "Continuous technical support aligned with global standards",
      ],
      btnText: "Explore System Features",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const isRtl = language === "ar";

  return (
    <section
      className="py-28 px-4 md:px-12 bg-[#0e495b] relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* خلفية ضوئية جمالية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-400/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* الجانب الأيمن: الصورة / العنصر البصري السينمائي */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative w-full h-[380px] md:h-[450px] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/15 backdrop-blur-2xl shadow-2xl flex items-center justify-center group">
              {/* لمسات بصرية داخل الإطار */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-white/5 pointer-events-none" />

              <div className="relative z-10 text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-10 h-10 text-cyan-300" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                  Smart Star Cloud
                </h3>
                <p className="text-white/80 text-sm md:text-base font-medium">
                  Enterprise Education Ecosystem
                </p>
              </div>
            </div>
          </div>

          {/* الجانب الأيسر: المحتوى والنصوص */}
          <div className="order-1 lg:order-2 text-start">
            <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              {t.tag}
            </span>

            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">
              {t.title}
            </h2>

            <p className="text-white text-base md:text-lg mb-8 leading-relaxed font-normal opacity-95">
              {t.description}
            </p>

            {/* النقاط التفصيلية */}
            <div className="space-y-4 mb-10">
              {t.points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0 mt-1" />
                  <span className="text-white text-base font-semibold leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* زر التوجيه */}
            <button className="px-8 py-4 rounded-full bg-white text-[#0e495b] hover:bg-gray-100 font-black text-sm md:text-base transition-all duration-300 flex items-center gap-3 shadow-xl cursor-pointer">
              <span>{t.btnText}</span>
              <ArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
