// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";

// export default function CampusFacilitiesExperience() {
//   const { language } = useLanguage();
//   const [activeFacility, setActiveFacility] = useState(0);

//   const content = {
//     ar: {
//       tag: "مرافق الحرم المدرسي الذكي",
//       title: "بيئة مادية وتكنولوجية مصممة لإلهمام العقول",
//       description:
//         "استكشف المساحات والمرافق المتطورة التي توفرها Smart Schools Complex لضمان تجربة تعليمية وإبداعية متكاملة.",
//       facilities: [
//         {
//           name: "معمل الحاسب الآلي المتطور",
//           desc: "مجهز بأحدث أجهزة الحواسيب ومنصات البرمجة والذكاء الاصطناعي لتدريب الطلاب على مهارات المستقبل التقنية.",
//           badge: "تكنولوجيا متقدمة",
//           stat: "أجهزة حديثة بمعايير عالمية",
//           icon: "💻",
//         },
//         {
//           name: "مختبرات العلوم الحديثة",
//           desc: "تجارب عملية تفاعلية تدمج بين العلوم التطبيقية والبحث العلمي المتقدم لاكتشاف شغف الطلاب بالعلوم الهندسية والطبيعية.",
//           badge: "بحث واكتشاف",
//           stat: "مختبرات آمنة ومجهزة بالكامل",
//           icon: "🔬",
//         },
//         {
//           name: "المكتبة الرقمية والورقية",
//           desc: "مكتبة ضخمة تضم آلاف الكتب والمراجع العالمية إلى جانب قواعد بيانات رقمية متكاملة تدعم البحث والاطلاع المستمر.",
//           badge: "معرفة بلا حدود",
//           stat: "+10,000 مرجع ومصدر رقمي",
//           icon: "📚",
//         },
//         {
//           name: "الملاعب والمرافق الرياضية",
//           desc: "ملاعب متكاملة لكرة القدم، السلة، والألعاب البدنية المصممة وفق أعلى معايير الأمان لبناء أجسام صحية وعقول نشطة.",
//           badge: "صحة وحيوية",
//           stat: "ملاعب مغطاة ومفتوحة",
//           icon: "⚽",
//         },
//         {
//           name: "العيادة المدرسية الشاملة",
//           desc: "رعاية طبية فورية وفريق تمريض متخصص على مدار الساعة لمتابعة صحة وسلامة الطلاب وتوفير بيئة آمنة وطمأنة تامة.",
//           badge: "رعاية واهتمام",
//           stat: "إشراف طبي دائم وآمن",
//           icon: "🏥",
//         },
//         {
//           name: "القاعات الذكية التفاعلية",
//           desc: "فصول دراسية مزودة بشاشات ذكية متطورة ونظم صوتيات حديثة تُلغي الحدود التقليدية وتحول الحصص إلى مغامرة ممتعة.",
//           badge: "تعليم تفاعلي",
//           stat: "100% شاشات ذكية رقمية",
//           icon: "🖥️",
//         },
//       ],
//     },
//     en: {
//       tag: "Smart Campus Facilities",
//       title: "Physical & Technological Environments Designed to Inspire Minds",
//       description:
//         "Explore the advanced spaces and facilities provided by Smart Schools Complex to ensure a comprehensive educational and creative experience.",
//       facilities: [
//         {
//           name: "Advanced Computer Lab",
//           desc: "Equipped with state-of-the-art computers, programming platforms, and AI tools to train students in future technical skills.",
//           badge: "Advanced Tech",
//           stat: "Modern devices with global standards",
//           icon: "💻",
//         },
//         {
//           name: "Modern Science Laboratories",
//           desc: "Interactive practical experiments merging applied sciences and advanced scientific research to discover students' passion.",
//           badge: "Research & Discovery",
//           stat: "Safe and fully equipped labs",
//           icon: "🔬",
//         },
//         {
//           name: "Digital & Paper Library",
//           desc: "A massive library housing thousands of international books alongside integrated digital databases supporting continuous research.",
//           badge: "Boundless Knowledge",
//           stat: "+10,000 references & digital sources",
//           icon: "📚",
//         },
//         {
//           name: "Sports Fields & Facilities",
//           desc: "Integrated fields for football, basketball, and athletics designed to highest safety standards for healthy bodies and active minds.",
//           badge: "Health & Vitality",
//           stat: "Indoor and outdoor courts",
//           icon: "⚽",
//         },
//         {
//           name: "Comprehensive School Clinic",
//           desc: "Immediate medical care and specialized nursing staff around the clock to monitor student health and ensure a safe environment.",
//           badge: "Care & Attention",
//           stat: "Permanent safe medical supervision",
//           icon: "🏥",
//         },
//         {
//           name: "Interactive Smart Classrooms",
//           desc: "Classrooms equipped with advanced smart screens and modern acoustic systems turning classes into engaging adventures.",
//           badge: "Interactive Learning",
//           stat: "100% digital smart screens",
//           icon: "🖥️",
//         },
//       ],
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;
//   const currentFac = t.facilities[activeFacility];

//   return (
//     <section
//       className="py-24 px-4 md:px-12 bg-gradient-to-b from-gray-50 via-white to-cyan-50/20 relative overflow-hidden"
//       dir={language === "ar" ? "rtl" : "ltr"}
//     >
//       {/* عناصر جمالية في الخلفية */}
//       <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />

//       <div className="max-w-7xl mx-auto">
//         {/* رأس السيكشن */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-sm font-bold tracking-wide border border-cyan-200">
//             {t.tag}
//           </span>
//           <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f3b4c] mb-6 tracking-tight leading-tight">
//             {t.title}
//           </h2>
//           <p className="text-gray-600 text-base md:text-lg leading-relaxed">
//             {t.description}
//           </p>
//         </div>

//         {/* تصميم تجريبي سينمائي تفاعلي حديث (بدون كروت تقليدية أو جداول) */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[2.5rem] p-6 md:p-12 border border-cyan-100 shadow-2xl shadow-cyan-950/5">
//           {/* قائمة الأزرار الجانبية التفاعلية */}
//           <div className="lg:col-span-5 flex flex-col gap-2">
//             {t.facilities.map((fac, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setActiveFacility(idx)}
//                 className={`p-4 md:p-5 rounded-2xl text-start transition-all duration-300 font-bold flex items-center justify-between cursor-pointer ${
//                   activeFacility === idx
//                     ? "bg-cyan-700 text-white shadow-lg shadow-cyan-700/25 scale-[1.02]"
//                     : "bg-gray-50/80 text-gray-700 hover:bg-cyan-50/60 hover:text-cyan-900 border border-gray-100"
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <span className="text-2xl">{fac.icon}</span>
//                   <span className="text-sm md:text-base font-extrabold leading-snug">
//                     {fac.name}
//                   </span>
//                 </div>
//                 <span
//                   className={`text-lg transition-transform ${activeFacility === idx ? "translate-x-1" : "opacity-40"}`}
//                 >
//                   →
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* لوحة العرض السينمائي التفاعلي للمرفق النشط */}
//           <div className="lg:col-span-7 bg-gradient-to-br from-cyan-900 via-[#0f3b4c] to-cyan-950 text-white rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[420px]">
//             <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

//             <div>
//               <div className="flex items-center justify-between mb-8">
//                 <span className="text-xs font-black tracking-widest uppercase text-cyan-300 bg-cyan-500/20 px-4 py-1.5 rounded-full border border-cyan-400/30">
//                   {currentFac.badge}
//                 </span>
//                 <span className="text-5xl">{currentFac.icon}</span>
//               </div>

//               <h3 className="text-2xl md:text-4xl font-black mb-6 leading-tight text-white">
//                 {currentFac.name}
//               </h3>

//               <p className="text-gray-200 text-base md:text-lg leading-relaxed font-normal mb-8">
//                 {currentFac.desc}
//               </p>
//             </div>

//             <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <span className="text-xs md:text-sm font-bold text-cyan-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
//                 ✨ {currentFac.stat}
//               </span>
//               <span className="text-xs text-gray-400 font-semibold tracking-wider">
//                 Smart Schools Complex Campus
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// 22222222222222222222222222222222222222222222222222222222222222222222222222
// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";

// export default function CampusFacilitiesMarquee() {
//   const { language } = useLanguage();
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   const content = {
//     ar: {
//       tag: "نبض الحرم المدرسي",
//       title: "مرافق عالمية مصممة لإطلاق العنان لطاقات أبنائكم",
//       description:
//         "تجربة معمارية وتكنولوجية فريدة تتوزع في كل ركن من أركان Smart Schools Complex لتوفير بيئة ملهمة ومبتكرة.",
//       facilities: [
//         {
//           name: "معمل الحاسب الآلي المتطور",
//           category: "تكنولوجيا الابتكار",
//           desc: "منظومة تقنية متكاملة مجهزة بأحدث أجهزة الحواسيب وقواعد البيانات لتعليم البرمجة والذكاء الاصطناعي.",
//           num: "01",
//           highlight: "معايير رقمية عالمية",
//         },
//         {
//           name: "مختبرات العلوم المتقدمة",
//           category: "الاستكشاف العملي",
//           desc: "مساحات علمية آمنة ومجهزة بأحدث المعدات لإجراء التجارب الكيميائية والفيزيائية والحيويّة.",
//           num: "02",
//           highlight: "تطبيق عملي مباشر",
//         },
//         {
//           name: "المكتبة الرقمية والورقية",
//           category: "مصادر المعرفة",
//           desc: "صرح ثقافي ومعرفي يضم آلاف الكتب والمراجع العالمية إلى جانب البوابات البحثية الرقمية.",
//           num: "03",
//           highlight: "+10,000 مرجع ومصدر",
//         },
//         {
//           name: "الملاعب والمرافق الرياضية",
//           category: "اللياقة والصحة",
//           desc: "ملاعب مفتوحة ومغطاة مصممة خصيصاً لممارسة الأنشطة الرياضية وبناء أجسام صحية وقوية.",
//           num: "04",
//           highlight: "ملاعب آمنة ومعتمدة",
//         },
//         {
//           name: "العيادة الطبية الشاملة",
//           category: "الرعاية والاطمئنان",
//           desc: "طاقم تمريض وإشراف طبي متكامل ومجهز بأحدث الإسعافات الأولية لضمان سلامة الطلاب دائماً.",
//           num: "05",
//           highlight: "رعاية على مدار الساعة",
//         },
//         {
//           name: "القاعات الذكية التفاعلية",
//           category: "التعليم الحديث",
//           desc: "فصول دراسية مدعومة بأحدث الشاشات الذكية وأنظمة الصوت لتجربة تعليمية شيقة وبصرية.",
//           num: "06",
//           highlight: "100% شاشات ذكية",
//         },
//       ],
//     },
//     en: {
//       tag: "Campus Pulse",
//       title:
//         "World-Class Facilities Designed to Unleash Your Children's Potential",
//       description:
//         "A unique architectural and technological experience distributed across every corner of Smart Schools Complex.",
//       facilities: [
//         {
//           name: "Advanced Computer Lab",
//           category: "Innovation Tech",
//           desc: "An integrated tech ecosystem equipped with modern computers and databases for coding and AI learning.",
//           num: "01",
//           highlight: "Global Digital Standards",
//         },
//         {
//           name: "Advanced Science Labs",
//           category: "Practical Discovery",
//           desc: "Safe scientific spaces equipped with cutting-edge equipment for chemical, physical, and biological experiments.",
//           num: "02",
//           highlight: "Direct Practical Application",
//         },
//         {
//           name: "Digital & Paper Library",
//           category: "Knowledge Sources",
//           desc: "A cultural hub housing thousands of global books and references alongside digital research portals.",
//           num: "03",
//           highlight: "+10,000 References & Sources",
//         },
//         {
//           name: "Sports Fields & Facilities",
//           category: "Fitness & Health",
//           desc: "Open and indoor courts specifically designed for athletic activities and building healthy bodies.",
//           num: "04",
//           highlight: "Safe Certified Courts",
//         },
//         {
//           name: "Comprehensive Medical Clinic",
//           category: "Care & Peace of Mind",
//           desc: "Integrated nursing and medical supervision equipped with state-of-the-art first aid to ensure student safety.",
//           num: "05",
//           highlight: "24/7 Medical Care",
//         },
//         {
//           name: "Interactive Smart Classrooms",
//           category: "Modern Education",
//           desc: "Classrooms powered by cutting-edge smart screens and sound systems for an engaging visual experience.",
//           num: "06",
//           highlight: "100% Smart Screens",
//         },
//       ],
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;

//   return (
//     <section
//       className="py-28 px-4 md:px-12 bg-[#041e2b] text-white relative overflow-hidden"
//       dir={language === "ar" ? "rtl" : "ltr"}
//     >
//       {/* خلفية ضوئية جمالية هادئة */}
//       <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-700/10 rounded-full blur-[140px] pointer-events-none" />
//       <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[140px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* رأس السيكشن */}
//         <div className="text-center max-w-3xl mx-auto mb-20">
//           <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs md:text-sm font-extrabold tracking-widest uppercase border border-cyan-400/30 backdrop-blur-md">
//             {t.tag}
//           </span>
//           <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">
//             {t.title}
//           </h2>
//           <p className="text-gray-300 text-base md:text-lg leading-relaxed">
//             {t.description}
//           </p>
//         </div>

//         {/* تصميم القائمة الطولية الانسيابية المتصلة (Accordion-Free / List Flow Layout) بدون كروت تقليدية */}
//         <div className="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
//           {t.facilities.map((fac, idx) => {
//             const isHovered = hoveredIndex === idx;
//             return (
//               <div
//                 key={idx}
//                 onMouseEnter={() => setHoveredIndex(idx)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className={`group py-8 md:py-10 px-4 md:px-8 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer relative ${
//                   isHovered ? "bg-cyan-950/40 pl-8 pr-8" : "bg-transparent"
//                 }`}
//               >
//                 {/* خلفية تفاعلية خفيفة عند الـ Hover */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-r from-cyan-700/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? "opacity-100" : ""}`}
//                 />

//                 {/* رقم المرفق والعنوان */}
//                 <div className="flex items-center gap-6 md:gap-10 relative z-10">
//                   <span className="text-xl md:text-3xl font-black text-cyan-500/60 group-hover:text-cyan-400 transition-colors">
//                     {fac.num}
//                   </span>
//                   <div>
//                     <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
//                       {fac.category}
//                     </span>
//                     <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-200 transition-colors">
//                       {fac.name}
//                     </h3>
//                   </div>
//                 </div>

//                 {/* وصف المرفق والتفاصيل الإضافية */}
//                 <div className="max-w-xl relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
//                   <p className="text-gray-300 text-sm md:text-base leading-relaxed font-normal">
//                     {fac.desc}
//                   </p>
//                   <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 text-xs font-bold whitespace-nowrap shrink-0">
//                     {fac.highlight}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* تذييل السيكشن */}
//         <div className="mt-16 text-center">
//           <span className="text-xs uppercase tracking-[0.3em] text-cyan-400/70 font-semibold">
//             Smart Schools Complex — Infrastructure & Campus Facilities
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function CampusFacilitiesGallery() {
  const { language } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const content = {
    ar: {
      tag: "الحرم المدرسي الذكي",
      title: "بيئة استثنائية تصنع شغف التعلم والابتكار",
      description:
        "نأخذك في جولة بصرية تعبيرية داخل أركان ومرافق Smart Schools Complex المجهزة بأعلى المعايير.",
      slides: [
        {
          title: "معمل الحاسب الآلي والذكاء الاصطناعي",
          subtitle: "منظومة تقنية متكاملة لجيل المستقبل",
          desc: "بيئة رقمية فائقة التطور تتيح للطلاب استكشاف لغات البرمجة الحديثة، تصميم التطبيقات، وتطبيقات الذكاء الاصطناعي في بيئة عملية مجهزة كلياً.",
          highlight: "أجهزة متطورة وشبكات سحابية",
        },
        {
          title: "مختبرات العلوم والتجارب التطبيقية",
          subtitle: "حيث تتحول النظريات إلى حقائق",
          desc: "مختبرات كيميائية وفيزيائية وحيوية مصممة بأعلى معايير الأمن والسلامة، تمنح الطلاب فرصة تنفيذ التجارب الحية وتنمية مهارات البحث العلمي.",
          highlight: "تجهيز علمي بمعايير عالمية",
        },
        {
          title: "المكتبة الرقمية وبوابات المعرفة",
          subtitle: "مصادر غير منتهية للبحث والقراءة",
          desc: "صرح ثقافي يجمع بين آلاف الكتب والمراجع العالمية وبين المنصات الرقمية المتطورة لدعم شغف القراءة والاطلاع المستمر لدى أبنائنا.",
          highlight: "+10,000 مرجع ومصدر رقمي",
        },
        {
          title: "الملاعب والمرافق الرياضية المتكاملة",
          subtitle: "بناء الأجسام النشطة والعقول السليمة",
          desc: "ملاعب مفتوحة ومغطاة مخصصة لكرة القدم، السلة، والأنشطة البدنية المختلفة المصممة لتعزيز اللياقة البدنية وروح الفريق الواحد.",
          highlight: "ملاعب مؤمنة ومجهزة بالكامل",
        },
        {
          title: "العيادة الطبية ورعاية الطلاب",
          subtitle: "اطمئنان دائم ورعاية فورية طوال اليوم",
          desc: "وحدة صحية متكاملة تدار بواسطة طاقم تمريض مؤهل وإشراف طبي دائم لضمان صحة وسلامة جميع الطلاب في كل أوقاتهم المدرسية.",
          highlight: "إشراف طبي ورعاية 24/7",
        },
        {
          title: "القاعات الذكية والتفاعلية",
          subtitle: "تعليم عصري يواكب تطلعات العصر",
          desc: "فصول دراسية مدعومة بأحدث الشاشات الذكية التفاعلية وأنظمة الصوتيات الحديثة لتجربة تعليمية بصرية مبهرة وممتعة.",
          highlight: "100% شاشات ذكية متطورة",
        },
      ],
      prev: "السابق",
      next: "التالي",
    },
    en: {
      tag: "Smart Campus",
      title: "An Exceptional Environment Inspiring Passion for Learning",
      description:
        "Taking you on an expressive visual tour inside Smart Schools Complex facilities equipped to the highest standards.",
      slides: [
        {
          title: "Computer Lab & Artificial Intelligence",
          subtitle: "An Integrated Tech Ecosystem for the Future",
          desc: "A state-of-the-art digital environment allowing students to explore modern programming languages, app design, and AI applications.",
          highlight: "Advanced devices & cloud networks",
        },
        {
          title: "Science Labs & Applied Experiments",
          subtitle: "Where Theories Turn into Facts",
          desc: "Chemistry, physics, and biology labs designed with top safety standards, giving students the chance to conduct live experiments.",
          highlight: "Global scientific standards",
        },
        {
          title: "Digital Library & Knowledge Portals",
          subtitle: "Endless Sources for Research & Reading",
          desc: "A cultural hub combining thousands of global books and advanced digital platforms to support continuous reading and learning.",
          highlight: "+10,000 references & digital sources",
        },
        {
          title: "Integrated Sports Fields & Facilities",
          subtitle: "Building Active Bodies & Sound Minds",
          desc: "Open and indoor courts dedicated to football, basketball, and physical activities designed to boost fitness and teamwork.",
          highlight: "Fully secured and equipped courts",
        },
        {
          title: "Medical Clinic & Student Care",
          subtitle: "Constant Peace of Mind & Immediate Care",
          desc: "An integrated health unit managed by qualified nursing staff and permanent medical supervision ensuring student safety all day.",
          highlight: "24/7 Medical supervision & care",
        },
        {
          title: "Interactive Smart Classrooms",
          subtitle: "Modern Education Matching Future Aspirations",
          desc: "Classrooms powered by the latest interactive smart screens and acoustic systems for an engaging visual learning experience.",
          highlight: "100% advanced smart screens",
        },
      ],
      prev: "Previous",
      next: "Next",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const current = t.slides[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % t.slides.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + t.slides.length) % t.slides.length);
  };

  return (
    <section
      className="py-24 px-4 md:px-12 bg-gradient-to-br from-[#041e2b] via-[#0f3b4c] to-[#082f49] text-white relative overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* خلفية ضوئية جمالية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* رأس السيكشن */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs md:text-sm font-extrabold tracking-widest uppercase border border-cyan-400/30 backdrop-blur-md">
            {t.tag}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">
            {t.title}
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* تصميم فخم متكامل بدون كروت مع أزرار أسهم متحركة */}
        <div className="relative text-center px-4 md:px-16 py-10 md:py-14 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
          {/* الوميض الداخلي */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* محتوى الشريحة الحالية */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300 bg-cyan-950/60 px-4 py-1.5 rounded-full border border-cyan-400/30 inline-block mb-6 shadow-inner">
              {current.highlight}
            </span>

            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 text-white leading-tight">
              {current.title}
            </h3>

            <span className="text-sm md:text-base font-bold text-cyan-200 block mb-6 md:mb-8">
              {current.subtitle}
            </span>

            <p className="text-gray-200 text-base md:text-lg leading-loose font-normal mb-10">
              {current.desc}
            </p>

            {/* أزرار السهم والتنقل والسفلية */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
              {/* سهم السابق */}
              <button
                onClick={handlePrev}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-cyan-500/30 text-white font-bold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer border border-white/10"
              >
                <span>{language === "ar" ? "→" : "←"}</span>
                <span>{t.prev}</span>
              </button>

              {/* النقاط الدائرية */}
              <div className="flex items-center gap-2">
                {t.slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                      activeIdx === idx
                        ? "w-8 md:w-12 bg-cyan-400 shadow-lg shadow-cyan-400/50"
                        : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* سهم التالي */}
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-cyan-500/30 text-white font-bold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer border border-white/10"
              >
                <span>{t.next}</span>
                <span>{language === "ar" ? "←" : "→"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
