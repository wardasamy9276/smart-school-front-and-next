// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";
// import { Quote, Sparkles, ArrowRight, School } from "lucide-react";
// import Link from "next/link";
// import Typewriter from "typewriter-effect";

// export default function SmartSchoolLeadersTestimonials() {
//   const { language } = useLanguage() as { language: string };
//   const [activeLeader, setActiveLeader] = useState(0);

//   const content = {
//     ar: {
//       tag: "Smart School - قصص نجاح القيادات المدرسية",
//       mainTitle:
//         "كيف ساهمت Smart Star في تطوير منظومة مجمع مدارس Smart School؟",
//       description:
//         "نستعرض آراء قيادات مجمع مدارس Smart School من مديرين ومشرفين ورؤساء أقسام، وكيف أحدثت المنظومة نقلة نوعية في إدارة الفصول، متابعة المعلمين، والتواصل الفعّال مع أولياء الأمور.",
//       leaders: [
//         {
//           quote:
//             "منذ أن طبقنا منظومة Smart Star في مجمع مدارس Smart School، انتهت تماماً العشوائية الإدارية. أصبحنا نتابع حضور الطلاب، جداول الحصص، وأداء المعلمين في كافة المراحل التعليمية من شاشة واحدة وبدقة مذهلة.",
//           name: "أ. محمود عبد العزيز",
//           role: "مدير عام مجمع مدارس Smart School",
//           location: "القاهرة، مصر",
//         },
//         {
//           quote:
//             "الربط بين أولياء الأمور وإدارة المدرسة أصبح أكثر سلاسة. التقارير الأكاديمية والدرجات تصل لولي الأمر لحظياً، مما بنى جسوراً قوية من الثقة والشراكة الحقيقية بيننا.",
//           name: "أ. هدى الشريف",
//           role: "المشرفة التربوية العامة للمرحلة الإعدادية والثانوية",
//           location: "الرياض، السعودية",
//         },
//         {
//           quote:
//             "قسم اللغات والأنشطة الطلابية استفاد بشكل كبير من أدوات الفصل الافتراضي وتوزيع المهام الآلي. وفرنا الكثير من الجهد والوقت، وانعكس ذلك إيجاباً على تفوق الطلاب.",
//           name: "أ. رامي الفقي",
//           role: "رئيس قسم اللغات والتطوير التكنولوجي بـ Smart School",
//           location: "دبي، الإمارات",
//         },
//       ],
//       ctaTitle: "هل ترغب في الارتقاء بمستوى مجمع مدارسكم كـ Smart School؟",
//       ctaBtn: "اطلب استشارة وتجربة للمنظومة",
//     },
//     en: {
//       tag: "Smart School - Leadership Success Stories",
//       mainTitle:
//         "How Did Smart Star Enhance Management at Smart School Complex?",
//       description:
//         "Explore insights from Smart School leaders, principals, and coordinators on how our ecosystem revolutionized classroom management, teacher tracking, and parent communication.",
//       leaders: [
//         {
//           quote:
//             "Ever since we implemented Smart Star at Smart School, administrative chaos is gone. We track student attendance, timetables, and teacher performance across all stages from a single dashboard.",
//           name: "Mr. Mahmoud Abdel-Aziz",
//           role: "General Director of Smart School Complex",
//           location: "Cairo, Egypt",
//         },
//         {
//           quote:
//             "Connecting parents with the school administration became smoother than ever. Academic reports and grades reach parents instantly, building robust trust and true partnership.",
//           name: "Ms. Hoda Al-Sharif",
//           role: "General Educational Supervisor for Middle & High Schools",
//           location: "Riyadh, KSA",
//         },
//         {
//           quote:
//             "Our languages and student activities department benefited immensely from virtual classroom tools and automated task allocation. We saved massive time and effort.",
//           name: "Mr. Rami El-Feki",
//           role: "Head of Languages & Tech Development at Smart School",
//           location: "Dubai, UAE",
//         },
//       ],
//       ctaTitle: "Want to elevate your school complex just like Smart School?",
//       ctaBtn: "Request a Consultation & System Demo",
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;
//   const isRtl = language === "ar";
//   const currentLeader = t.leaders[activeLeader];

//   return (
//     <div
//       className="bg-[#0e495b] text-white min-h-screen flex flex-col justify-between overflow-x-hidden"
//       dir={isRtl ? "rtl" : "ltr"}
//     >
//       <section className="relative py-28 px-4 md:px-12 overflow-hidden">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-400/5 rounded-full blur-[180px] pointer-events-none" />

//         <div className="max-w-5xl mx-auto text-center relative z-10">
//           <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md shadow-lg">
//             <Sparkles className="w-4 h-4 text-cyan-300" />
//             {t.tag}
//           </span>

//           <div className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">
//             <Typewriter
//               options={{
//                 strings: [t.mainTitle],
//                 autoStart: true,
//                 loop: true,
//                 delay: 75,
//                 deleteSpeed: 50,
//               }}
//             />
//           </div>

//           <p className="text-white text-base md:text-lg max-w-4xl mx-auto mb-16 leading-relaxed font-normal opacity-95">
//             {t.description}
//           </p>

//           {/* أزرار اختيار قيادات مجمع المدارس */}
//           <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
//             {t.leaders.map((leader, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setActiveLeader(idx)}
//                 className={`px-6 py-3.5 rounded-2xl text-sm md:text-base font-bold transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
//                   activeLeader === idx
//                     ? "bg-white text-[#0e495b] shadow-xl scale-105 font-black"
//                     : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
//                 }`}
//               >
//                 <School className="w-4 h-4" />
//                 <span>{leader.name}</span>
//               </button>
//             ))}
//           </div>

//           {/* منصة عرض الرأي القيادي المدرسي (بدون كروت جامدة) */}
//           <div className="relative bg-white/5 backdrop-blur-3xl rounded-[3rem] p-8 md:p-16 border border-white/15 text-center shadow-2xl mb-20 overflow-hidden">
//             <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
//               <Quote className="w-24 h-24 text-white" />
//             </div>

//             <div className="relative z-10 max-w-3xl mx-auto">
//               <p className="text-white text-xl md:text-2xl leading-relaxed font-semibold italic mb-8 opacity-95">
//                 "{currentLeader.quote}"
//               </p>

//               <h4 className="text-xl md:text-2xl font-black text-cyan-300 mb-1">
//                 {currentLeader.name}
//               </h4>
//               <p className="text-sm md:text-base text-white/90 font-bold mb-1">
//                 {currentLeader.role}
//               </p>
//               <span className="text-xs text-white/70 uppercase tracking-widest font-medium">
//                 {currentLeader.location}
//               </span>
//             </div>
//           </div>

//           {/* زر التواصل أو الانتقال */}
//           <div className="p-10 md:p-14 rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/15 text-center shadow-2xl">
//             <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
//               {t.ctaTitle}
//             </h3>
//             <Link href="/contact">
//               <button className="px-8 py-4 rounded-full bg-white text-[#0e495b] hover:bg-gray-100 font-black text-sm md:text-base transition-all duration-300 inline-flex items-center gap-3 shadow-xl cursor-pointer">
//                 <span>{t.ctaBtn}</span>
//                 <ArrowRight
//                   className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
//                 />
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// 2222222222222222222222222222222222222222222222
// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";
// import { Sparkles, ArrowRight, Compass, Shield, Zap } from "lucide-react";
// import Link from "next/link";

// export default function SmartSchoolSplitScreen() {
//   const { language } = useLanguage() as { language: string };
//   const [activeSegment, setActiveSegment] = useState(0);

//   const content = {
//     ar: {
//       tag: "Smart School - الواجهة التفاعلية الشاملة",
//       mainTitle: "ملحمة التحول الرقمي والإداري في صرح Smart School",
//       description:
//         "نقدم لك عرضاً حياً ومباشراً يوضح بدقة كيفية إدارة العمليات اليومية والربط المؤسسي عبر منصة Smart Star، بدون أي فواصل تقليدية أو مربعات.",
//       segments: [
//         {
//           label: "الربط المركزي والفروع",
//           title: "إدارة 12 فرعاً تعليمياً من شاشة مركزية واحدة",
//           body: "يتيح النظام ربط كافة الفروع والمراحل التعليمية لمجمع مدارس Smart School لتتم مزامنة بيانات الطلاب والحضور والغياب بشكل فوري ولحظي دون أي تأخير، مما يضمن تدفقاً سلسلًا للعمليات الإدارية.",
//           indicator: "معدل استجابة 0.1 ثانية",
//         },
//         {
//           label: "الأتمتة الأكاديمية",
//           title: "تنظيم الجداول، الحصص، ورصد الدرجات بالكامل",
//           body: "تتولى المنظومة تنظيم جداول الحصص الدراسية وتوزيع المهام على أكثر من 850 معلماً ومشرفاً بدقة متناهية، مع إتاحة أدوات متطورة لإدارة الامتحانات والتقييمات التربوية المستمرة.",
//           indicator: "+850 كفاءة تعليمية نشطة",
//         },
//         {
//           label: "تواصل أولياء الأمور",
//           title: "بوابة تفاعلية ذكية تربط الأسرة بالمدرسة لحظياً",
//           body: "منصة مخصصة تتيح لأكثر من 15,000 طالب وأولياء أمورهم الاطلاع على التقارير اليومية، النتائج، والملاحظات السلوكية والأكاديمية بكل شفافة وأمان تام عبر سحابة رقمية محمية.",
//           indicator: "+15,000 مستفيد دائم",
//         },
//       ],
//       ctaText: "ارتقِ بمؤسستك التعليمية اليوم",
//       ctaBtn: "اطلب استشارة المنظومة",
//     },
//     en: {
//       tag: "Smart School - Comprehensive Interactive Interface",
//       mainTitle:
//         "The Epic of Digital & Administrative Transformation at Smart School",
//       description:
//         "We provide a live and direct display clearly showing how daily operations and institutional integration are managed via Smart Star, without traditional dividers or boxes.",
//       segments: [
//         {
//           label: "Central Connection & Branches",
//           title:
//             "Managing 12 Educational Branches from a Single Central Screen",
//           body: "The system connects all branches and educational stages of Smart School complex to sync student data, attendance, and absence instantly without delay, ensuring smooth administrative flow.",
//           indicator: "0.1s Response Rate",
//         },
//         {
//           label: "Academic Automation",
//           title: "Organizing Timetables, Classes, and Grades Completely",
//           body: "The system organizes timetables and allocates tasks to over 850 teachers and supervisors with extreme precision, providing advanced tools for managing exams and ongoing educational assessments.",
//           indicator: "+850 Active Staff",
//         },
//         {
//           label: "Parent Communication",
//           title:
//             "Smart Interactive Portal Connecting Family with School Instantly",
//           body: "A dedicated platform allowing over 15,000 students and parents to view daily reports, results, behavioral and academic notes with total transparency and absolute security.",
//           indicator: "+15,000 Active Users",
//         },
//       ],
//       ctaText: "Elevate your educational institution today",
//       ctaBtn: "Request System Consultation",
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;
//   const isRtl = language === "ar";
//   const currentSeg = t.segments[activeSegment];

//   return (
//     <div
//       className="bg-[#0e495b] text-white min-h-screen py-24 px-4 md:px-16 relative overflow-hidden flex flex-col justify-between"
//       dir={isRtl ? "rtl" : "ltr"}
//     >
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-cyan-400/5 rounded-full blur-[220px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto w-full relative z-10">
//         {/* الترويسة العليا */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md shadow-lg">
//             <Sparkles className="w-4 h-4 text-cyan-300" />
//             {t.tag}
//           </span>

//           <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">
//             {t.mainTitle}
//           </h1>

//           <p className="text-white text-base md:text-lg leading-relaxed font-normal opacity-95">
//             {t.description}
//           </p>
//         </div>

//         {/* تصميم مقسم بشاشتين متقابلين (Split-Screen Layout بدون كروت نهائياً) */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
//           {/* العمود الأيمن: أزرار اختيار الأقسام (تصميم خطي انسيابي عمودي) */}
//           <div className="lg:col-span-4 flex flex-col justify-center gap-4">
//             {t.segments.map((seg, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setActiveSegment(idx)}
//                 className={`text-start px-6 py-5 rounded-2xl transition-all duration-300 cursor-pointer border ${
//                   activeSegment === idx
//                     ? "bg-white text-[#0e495b] border-white font-black shadow-2xl scale-[1.02]"
//                     : "bg-transparent text-white border-white/15 hover:bg-white/5 font-bold"
//                 }`}
//               >
//                 <span className="text-xs opacity-70 block mb-1">
//                   القطاع 0{idx + 1}
//                 </span>
//                 <span className="text-base md:text-lg">{seg.label}</span>
//               </button>
//             ))}
//           </div>

//           {/* العمود الأيسر: مساحة العرض الديناميكية (منطقة عرض رئيسية بدون أي حدود كروت) */}
//           <div className="lg:col-span-8 flex flex-col justify-between bg-white/[0.03] border-l-2 border-cyan-300/60 p-8 md:p-12 relative">
//             <div>
//               <div className="flex items-center justify-between mb-6">
//                 <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">
//                   Smart School Live View
//                 </span>
//                 <span className="text-xs font-bold text-white/80 bg-white/10 px-4 py-1.5 rounded-full">
//                   {currentSeg.indicator}
//                 </span>
//               </div>

//               <h2 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight">
//                 {currentSeg.title}
//               </h2>

//               <p className="text-white text-base md:text-lg leading-relaxed font-normal opacity-90">
//                 {currentSeg.body}
//               </p>
//             </div>

//             <div className="pt-10 mt-10 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white/60">
//               <span>Smart Star Operating Core</span>
//               <span>Section {activeSegment + 1} of 3</span>
//             </div>
//           </div>
//         </div>

//         {/* الشريط السفلي */}
//         <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
//           <div>
//             <h4 className="text-2xl font-black text-white mb-1">{t.ctaText}</h4>
//             <p className="text-xs md:text-sm text-white/70">
//               Smart Star System - Strategic Partnership Unit
//             </p>
//           </div>

//           <Link href="/contact">
//             <button className="px-8 py-4 rounded-full bg-white text-[#0e495b] hover:bg-gray-100 font-black text-sm md:text-base transition-all duration-300 inline-flex items-center gap-3 shadow-xl cursor-pointer">
//               <span>{t.ctaBtn}</span>
//               <ArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SmartSchoolEditorialPage() {
  const { language } = useLanguage() as { language: string };

  const content = {
    ar: {
      tag: "ملف الشراكة الاستراتيجية • Smart School",
      headline: "إدارة صرح تعليمي ضخم عبر سحابة رقمية موحدة وبلا حدود.",
      paragraphOne:
        "يعتمد مجمع مدارس Smart School على البنية التحتية المتقدمة لنظام Smart Star، ليشكل نموذجاً فريداً في أتمتة العمليات الأكاديمية والإدارية والمالية عبر كافة فروعه ومراحله التعليمية.",
      paragraphTwo:
        "من خلال منظومة رقمية متكاملة، يدار الصرح بسلاسة تامة تخدم أكثر من 15,000 طالب وطالبة، وتدعم طاقماً تدريسياً يتجاوز 850 معلماً ومشرفاً، مما يضمن دقة البيانات وسرعة اتخاذ القرار على مدار الساعة.",
      highlights: [
        "ربط مركزي متزامن لجميع الفروع والمراحل الدراسية",
        "متابعة فورية للحضور، الانصراف، والتقارير الأكاديمية اليومية",
        "بوابة تفاعلية ذكية تربط الأسرة والإدارة بتشفير كامل للبيانات",
      ],
      actionLabel: "استعراض تفاصيل الاعتماد والربط",
    },
    en: {
      tag: "Strategic Partnership File • Smart School",
      headline:
        "Managing a massive educational complex via a unified, boundless digital cloud.",
      paragraphOne:
        "Smart School relies on the advanced infrastructure of Smart Star to form a unique model in automating academic, administrative, and financial operations across all its branches and stages.",
      paragraphTwo:
        "Through an integrated digital ecosystem, the complex operates smoothly, serving over 15,000 students and supporting an academic staff of over 850 teachers and supervisors, ensuring data accuracy and real-time decision making 24/7.",
      highlights: [
        "Synchronized central connection for all branches and grades",
        "Instant tracking of attendance, departure, and daily academic reports",
        "Smart interactive portal connecting family and administration with full data encryption",
      ],
      actionLabel: "View Accreditation & Integration Details",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const isRtl = language === "ar";

  return (
    <div
      className="bg-[#0e495b] text-white min-h-screen py-24 md:py-32 px-6 md:px-20 relative overflow-hidden flex flex-col justify-between"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* إضاءة خلفية ناعمة */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[250px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* الترويسة العلوية */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            {t.tag}
          </span>

          <h1 className="text-3xl md:text-6xl font-black leading-[1.2] tracking-tight text-white mb-8">
            {t.headline}
          </h1>
        </div>

        {/* النص التحريري المتصل (تصميم المقال المفتوح - Editorial Layout بدون كروت نهائياً) */}
        <div className="space-y-6 text-white/90 text-lg md:text-xl font-normal leading-relaxed border-y border-white/15 py-12 mb-12">
          <p>{t.paragraphOne}</p>
          <p>{t.paragraphTwo}</p>
        </div>

        {/* قائمة النقاط الانسيابية */}
        <div className="space-y-4 mb-16">
          {t.highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0" />
              <span className="text-white text-base md:text-lg font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* زر التوجيه النهائي */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200/80">
            Smart Star Ecosystem • Exclusive Deployment
          </span>

          <Link href="/partnership">
            <button className="px-8 py-4 rounded-full bg-white text-[#0e495b] hover:bg-gray-100 font-black text-sm md:text-base transition-all duration-300 inline-flex items-center gap-3 shadow-xl cursor-pointer">
              <span>{t.actionLabel}</span>
              <ArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
