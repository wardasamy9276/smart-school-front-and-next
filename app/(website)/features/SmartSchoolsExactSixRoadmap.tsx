// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";

// export default function SmartSchoolsCentralBarDesign() {
//   const { language } = useLanguage();
//   const [activeCard, setActiveCard] = useState<number | null>(null);

//   const isRtl = language === "ar";

//   const content = {
//     ar: {
//       tag: "Smart Schools Complex - المنظومة الذكية",
//       title: "الهندسة التشغيلية المتكاملة لإدارة المدارس",
//       description:
//         "تصميم عصري مبتكر يربط بين وحدات النظام التعليمي عبر شريط مركزي مضيء ومتحرك.",
//       cards: [
//         {
//           num: "01",
//           title: "التسجيل والقبول الإلكتروني",
//           desc: "إدارة شاملة لعمليات قبول الطلاب الجدد، مراجعة المستندات، وتنظيم ملفات المتقدمين في منصة موحدة وآمنة.",
//           category: "SMS Core",
//         },
//         {
//           num: "02",
//           title: "نظام التعلم الذكي (LMS)",
//           desc: "فصول افتراضية متقدمة، اختبارات إلكترونية، ودفاتر درجات تفاعلية تدمج الطالب والمعلم بسلاسة.",
//           category: "LMS Portal",
//         },
//         {
//           num: "03",
//           title: "الإدارة المالية والرسوم",
//           desc: "تخطيط دقيق لهياكل الرسوم الدراسية، متابعة المصروفات، وإصدار التقارير المالية بشفافية تامة.",
//           category: "Finance Unit",
//         },
//         {
//           num: "04",
//           title: "شؤون الموظفين والموارد البشرية",
//           desc: "إدارة متكاملة لكشوف المرتبات، قسائم الرواتب، متابعة حضور العاملين، وتنظيم الهيكل الإداري.",
//           category: "HR Management",
//         },
//         {
//           num: "05",
//           title: "الجداول المدرسية والحضور",
//           desc: "تنظيم الجداول الزمنية اليومية، رصد الحضور والغياب للطلاب بشكل آلي، وتوفير تنبيهات فورية.",
//           category: "Attendance",
//         },
//         {
//           num: "06",
//           title: "تطبيق الموبايل والتواصل",
//           desc: "أداة تواصل فعالة تربط ولي الأمر بالمدرسة عبر المؤتمرات المرئية، الاستطلاعات، والمدونات.",
//           category: "Mobile Connect",
//         },
//       ],
//       centerBar: ["SMART SCHOOLS", "ERP & LMS ECOSYSTEM", "ACTIVE MODULES"],
//     },
//     en: {
//       tag: "Smart Schools Complex - Intelligent Ecosystem",
//       title: "Integrated Operational Architecture for Schools",
//       description:
//         "An innovative modern layout connecting educational system modules through a glowing, interactive central bar.",
//       cards: [
//         {
//           num: "01",
//           title: "Online Admission & Registration",
//           desc: "Comprehensive management of new student admissions, document verification, and applicant records.",
//           category: "SMS Core",
//         },
//         {
//           num: "02",
//           title: "Smart Learning System (LMS)",
//           desc: "Advanced virtual classrooms, online exams, and interactive gradebooks bridging students and teachers.",
//           category: "LMS Portal",
//         },
//         {
//           num: "03",
//           title: "Financial & Fee Management",
//           desc: "Precise planning of tuition fee structures, tracking expenses, and transparent financial reporting.",
//           category: "Finance Unit",
//         },
//         {
//           num: "04",
//           title: "Human Resources & Payroll",
//           desc: "Complete management of payrolls, pay slips, staff attendance tracking, and organizational structure.",
//           category: "HR Management",
//         },
//         {
//           num: "05",
//           title: "Timetables & Attendance",
//           desc: "Organizing daily schedules, automated student attendance tracking, and instant automated alerts.",
//           category: "Attendance",
//         },
//         {
//           num: "06",
//           title: "Mobile App & Communication",
//           desc: "Effective communication tool connecting parents with the school via video conferences and polls.",
//           category: "Mobile Connect",
//         },
//       ],
//       centerBar: ["SMART SCHOOLS", "ERP & LMS ECOSYSTEM", "ACTIVE MODULES"],
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;

//   return (
//     <section
//       className="bg-[#03141c] text-white py-32 px-4 md:px-12 relative overflow-hidden"
//       dir={isRtl ? "rtl" : "ltr"}
//     >
//       {/* خلفية ضوئية جمالية */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* رأس السيكشن */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <span className="inline-block mb-4 px-5 py-2 rounded-full bg-cyan-500/15 text-cyan-300 text-xs md:text-sm font-extrabold tracking-widest uppercase border border-cyan-400/30 backdrop-blur-md shadow-lg shadow-cyan-950/50">
//             {t.tag}
//           </span>
//           <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-white leading-tight">
//             {t.title}
//           </h2>
//           <p className="text-gray-300 text-base md:text-lg leading-relaxed font-normal">
//             {t.description}
//           </p>
//         </div>

//         {/* =========================================================
//            الشريط المركزي المشترك في المنتصف تماماً (ينور ومتحرك)
//          ========================================================= */}
//         <div className="mb-24 flex items-center justify-center">
//           <div className="w-full max-w-2xl bg-[#061d28]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-full py-4 px-8 flex items-center justify-between shadow-[0_0_45px_rgba(6,182,212,0.3)] relative overflow-hidden">
//             {/* تأثير إضاءة خلفية متحركة */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-pulse pointer-events-none" />

//             <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 drop-shadow-[0_0_8px_#22d3ee]">
//               {t.centerBar[0]}
//             </span>

//             <div className="h-5 w-px bg-cyan-500/60 animate-ping" />

//             <span className="text-xs md:text-sm font-mono font-black tracking-widest text-white drop-shadow-[0_0_15px_#22d3ee] px-5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-400/60 shadow-inner">
//               {t.centerBar[1]}
//             </span>

//             <div className="h-5 w-px bg-cyan-500/60 animate-ping" />

//             <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 drop-shadow-[0_0_8px_#22d3ee]">
//               {t.centerBar[2]}
//             </span>
//           </div>
//         </div>

//         {/* =========================================================
//            شبكة الـ 6 كروت بتصميم هندسي فريد ومتفاعل
//          ========================================================= */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {t.cards.map((card, idx) => {
//             const isHovered = activeCard === idx;
//             return (
//               <div
//                 key={idx}
//                 onMouseEnter={() => setActiveCard(idx)}
//                 onMouseLeave={() => setActiveCard(null)}
//                 className={`bg-[#061c27]/85 backdrop-blur-xl rounded-[2.5rem] p-8 border transition-all duration-500 flex flex-col justify-between relative overflow-hidden group ${
//                   isHovered
//                     ? "border-cyan-400 shadow-[0_12px_40px_rgba(6,182,212,0.25)] bg-[#072433] -translate-y-2"
//                     : "border-cyan-500/20 hover:border-cyan-500/40"
//                 }`}
//               >
//                 {/* شريط مضيء متحرك بالأعلى */}
//                 <div
//                   className={`absolute top-0 right-12 w-28 h-1 transition-all duration-300 ${isHovered ? "bg-cyan-400 shadow-[0_0_15px_#22d3ee]" : "bg-cyan-500/30 group-hover:bg-cyan-400"}`}
//                 />

//                 <div>
//                   <div className="flex items-center justify-between mb-6">
//                     <span className="text-xs font-mono font-black text-cyan-300 bg-cyan-950/80 px-3.5 py-1.5 rounded-xl border border-cyan-500/30 shadow-sm">
//                       {card.num}
//                     </span>
//                     <span className="text-xs font-semibold text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
//                       {card.category}
//                     </span>
//                   </div>

//                   <h3 className="text-2xl font-black text-white mb-4 leading-snug group-hover:text-cyan-300 transition-colors">
//                     {card.title}
//                   </h3>

//                   <p className="text-gray-300 text-sm md:text-base leading-relaxed font-normal">
//                     {card.desc}
//                   </p>
//                 </div>

//                 <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-cyan-400">
//                   <span>Smart Schools Complex</span>
//                   <span
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${isHovered ? "bg-cyan-400 shadow-[0_0_12px_#22d3ee]" : "bg-white/20"}`}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SmartSchoolsPerfectTimeline() {
  const { language } = useLanguage();
  const isRtl = language === "ar";

  const content = {
    ar: {
      tag: "البنية التشغيلية لمجمع مدارس Smart Schools",
      title: "المسار التقني المتكامل لرحلة الطالب ولي الأمر",
      description:
        "تصميم متناسق تماماً يلغي المسافات الفارغة، يعتمد على كروت منسدقة بدون حدود، وشريط رفيع يتوسطه عقد مضيئة.",
      steps: [
        {
          num: "01",
          title: "بوابة التقديم والقبول الرقمي",
          desc: "استقبال طلبات الالتحاق للمراحل التعليمية المختلفة، مراجعة الشروط والمستندات، وجدولة اختبارات القبول آلياً عبر النظام.",
          tagline: "ADMISSION_MODULE",
        },
        {
          num: "02",
          title: "منصة الفصول الذكية وLMS",
          desc: "إدارة المحتوى التعليمي، الفصول الافتراضية المباشرة، الواجبات المنزلية، والاختبارات الشهرية والنهائية للطلاب.",
          tagline: "E_LEARNING",
        },
        {
          num: "03",
          title: "إدارة الشؤون المالية والرسوم",
          desc: "توزيع الأقساط المدرسية، متابعة سداد المصروفات، وإصدار الفواتير وسندات القبض الإلكترونية لولي الأمر بشفافية.",
          tagline: "FINANCE_ERP",
        },
        {
          num: "04",
          title: "نظام الموارد البشرية وشؤون المعلمين",
          desc: "إدارة عقود الهيئة التدريسية والإدارية، كشوف المرتبات الشهرية، ومتابعة الحضور والإنصراف للبصمة.",
          tagline: "HR_STAFF",
        },
        {
          num: "05",
          title: "جداول الحصص ومتابعة الحضور اليومي",
          desc: "توليد الجداول المدرسية الأسبوعية، ورصد حضور وغياب الطلاب بالفصول الدراسية مع إرسال إشعارات فورية.",
          tagline: "SCHEDULES_ATTENDANCE",
        },
        {
          num: "06",
          title: "تطبيق أولياء الأمور والتواصل المباشر",
          desc: "تطبيق موبايل متكامل لإبقاء ولي الأمر على اطلاع مستمر بمستوى الطالب، التقارير الأكاديمية، والفعاليات المدرسية.",
          tagline: "MOBILE_PORTAL",
        },
      ],
    },
    en: {
      tag: "Smart Schools Complex Operational Architecture",
      title: "Integrated Technical Pathway for Students & Parents",
      description:
        "A perfectly balanced layout eliminating dead spaces, featuring borderless cards and a thin glowing central timeline.",
      steps: [
        {
          num: "01",
          title: "Digital Admission & Registration Portal",
          desc: "Handling student enrollment applications for all educational stages, document verification, and automated test scheduling.",
          tagline: "ADMISSION_MODULE",
        },
        {
          num: "02",
          title: "Smart Classrooms & LMS Platform",
          desc: "Managing educational content, live virtual classes, homework assignments, and monthly/final student exams.",
          tagline: "E_LEARNING",
        },
        {
          num: "03",
          title: "Financial Affairs & Fee Management",
          desc: "Structuring school installments, tracking payment progress, and issuing digital invoices and receipts transparently.",
          tagline: "FINANCE_ERP",
        },
        {
          num: "04",
          title: "Human Resources & Teacher Affairs",
          desc: "Managing faculty and administrative contracts, monthly payrolls, and tracking biometric attendance.",
          tagline: "HR_STAFF",
        },
        {
          num: "05",
          title: "Timetables & Daily Attendance Tracking",
          desc: "Generating weekly school schedules, tracking student attendance in classrooms, and sending instant alerts.",
          tagline: "SCHEDULES_ATTENDANCE",
        },
        {
          num: "06",
          title: "Parent App & Direct Communication",
          desc: "Integrated mobile application keeping parents constantly updated on student performance, academic reports, and events.",
          tagline: "MOBILE_PORTAL",
        },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.ar;

  return (
    <section
      className="bg-[#03141c] text-white py-20 px-4 md:px-8 relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* خلفية ضوئية خافتة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* رأس السيكشن */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-extrabold tracking-widest uppercase border border-cyan-400/30 backdrop-blur-md shadow-md">
            {t.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed font-normal">
            {t.description}
          </p>
        </div>

        <div className="relative">
          {/* الشريط الرفيع في المنتصف (يصل بين أول الكروت لآخرها بدقة) */}
          <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-emerald-400 to-cyan-400 shadow-[0_0_12px_#22d3ee] hidden md:block" />

          <div className="flex flex-col gap-6 relative">
            {t.steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* الكارد: عرض 48% لكل جانب لإلغاء أي فراغات ضخمة */}
                  <div className="w-full md:w-[48%]">
                    <div className="bg-[#061c27]/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl relative group hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300">
                      {/* شريط مضيء صغير أعلى الكارد */}
                      <div className="absolute top-0 right-6 w-12 h-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold text-cyan-400">
                          {step.tagline}
                        </span>
                        <span className="text-[11px] font-mono font-black text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-full">
                          {step.num}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* الدائرة المركزية على الشريط الرفيع في المنتصف تماماً */}
                  <div className="hidden md:flex items-center justify-center w-[4%] relative z-10">
                    <div className="w-4 h-4 rounded-full bg-[#03141c] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_10px_#22d3ee]">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    </div>
                  </div>

                  {/* المساحة المقابلة للجانب الآخر */}
                  <div className="hidden md:block w-[48%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
