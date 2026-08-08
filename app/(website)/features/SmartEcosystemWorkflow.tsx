// // "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";

// export default function MagazineFeaturesOverview() {
//   const { language } = useLanguage();
//   const [activeFeature, setActiveFeature] = useState(0);

//   const content = {
//     ar: {
//       tag: "مميزات Smart Schools Complex",
//       title: "خمس ركائز تقنية تعيد صياغة مفهوم الإدارة المدرسية الحديثة",
//       description: "تصميم تجريدي انسيابي يدمج بين قوة أنظمة الـ ERP المتكاملة، وسهولة تصفح المنظومة الرقمية.",
//       features: [
//         {
//           num: "01",
//           title: "لوحة التحكم الإدارية والتقديم الإلكتروني",
//           subtitle: "إدارة شاملة، مرنة، ولحظية",
//           desc: "تحكم كامل في محتوى الموقع، إدارة الأخبار، الخطط الأسبوعية، وتنظيم ملفات تقديم الطلاب الجدد بكفاءة تامة دون أي تعقيدات ورقية.",
//           metric: "تحكم 100% لحظي",
//         },
//         {
//           num: "02",
//           title: "نظام المعلم المتقدم (Teacher LMS)",
//           subtitle: "أدوات ذكية لتعليم تفاعلي مبهر",
//           desc: "يتيح للمعلمين إنشاء الفصول الذكية، إعداد الاختبارات والواجبات الإلكترونية، رفع الفيديوهات المسجلة، والتحضيرات المدرسية بكل سلاسة.",
//           metric: "فصول ذكية واختبارات",
//         },
//         {
//           num: "03",
//           title: "بوابة الطالب الذكية والمخزن الشخصي",
//           subtitle: "بيئة تعليمية ممتعة ومستقلة",
//           desc: "استعراض الواجبات والنتائج فوراً، مخزن خاص للملفات والفيديوهات، فصول تفاعلية، وتواصل آمن ومباشر مع المعلمين والزملاء.",
//           metric: "مخزن ومراسلات آمنة",
//         },
//         {
//           num: "04",
//           title: "نظام ولي الأمر المالي ومتابعة الأبناء",
//           subtitle: "اطمئنان دائم وشفافية كاملة",
//           desc: "متابعة الحضور، الغياب، والتقييمات الشهرية، مع مراجعة كشوف الحسابات المالية، مواعيد الأقساط، وإمكانية طباعة المطالبات بكل مرونة.",
//           metric: "كشوفات ومتابعة مالية",
//         },
//         {
//           num: "05",
//           title: "خدمة أكثر من 500 مدرسة إقليمياً",
//           subtitle: "شريكك التقني الموثوق في مصر والوطن العربي",
//           desc: "خبرة عميقة ومنظومة معتمدة تخدم مئات المؤسسات التعليمية الكبرى بدعم فني مستمر وتحديثات رقمية متواصلة على مدار الساعة.",
//           metric: "+500 مدرسة معتمدة",
//         },
//       ],
//     },
//     en: {
//       tag: "Smart Schools Complex Features",
//       title: "Five Technical Pillars Redefining Modern School Management",
//       description: "A fluid editorial design combining powerful ERP integration with seamless digital navigation.",
//       features: [
//         {
//           num: "01",
//           title: "Admin Dashboard & Online Admission",
//           subtitle: "Comprehensive, Flexible, & Real-time Management",
//           desc: "Full control over website content, news, weekly plans, and organized new student registration files without paperwork complexity.",
//           metric: "100% Real-time control",
//         },
//         {
//           num: "02",
//           title: "Advanced Teacher System (Teacher LMS)",
//           subtitle: "Smart Tools for Engaging Education",
//           desc: "Allows teachers to create smart classes, set online exams/homework, upload recorded videos, and lesson plans smoothly.",
//           metric: "Smart classes & exams",
//         },
//         {
//           num: "03",
//           title: "Smart Student Portal & Personal Vault",
//           subtitle: "An Engaging & Independent Learning Environment",
//           desc: "Review homework and results instantly, personal vault for files/videos, interactive classes, and secure direct communication.",
//           metric: "Secure vault & chat",
//         },
//         {
//           num: "04",
//           title: "Parent Financial & Student Monitoring System",
//           subtitle: "Constant Peace of Mind & Complete Transparency",
//           desc: "Track attendance, absence, and evaluations, review financial account statements, installment dates, and print demands flexibly.",
//           metric: "Financial tracking",
//         },
//         {
//           num: "05",
//           title: "Serving Over 500 Schools Regionally",
//           subtitle: "Your Trusted Technical Partner Across the Arab World",
//           desc: "Deep expertise and certified ecosystem serving hundreds of major educational institutions with continuous 24/7 technical support.",
//           metric: "+500 Trusted schools",
//         },
//       ],
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;
//   const current = t.features[activeFeature];

//   return (
//     <section
//       className="py-28 px-4 md:px-12 bg-[#041e2b] text-white relative overflow-hidden"
//       dir={language === "ar" ? "rtl" : "ltr"}
//     >
//       {/* خلفية ضوئية جمالية خافتة */}
//       <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

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

//         {/* تصميم عمودي مجلة (Editorial Split Layout) بدون كروت تقليدية وبدون تكرار */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-b border-white/10 py-16">

//           {/* قائمة الأقسام الجانبية (تصميم خطي نظيف) */}
//           <div className="lg:col-span-5 flex flex-col divide-y divide-white/10">
//             {t.features.map((feat, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setActiveFeature(idx)}
//                 className={`py-6 text-start transition-all duration-300 flex items-center justify-between group cursor-pointer px-4 rounded-2xl ${
//                   activeFeature === idx
//                     ? "bg-cyan-950/60 pl-6 border-l-4 border-cyan-400"
//                     : "hover:bg-white/5 opacity-70 hover:opacity-100"
//                 }`}
//               >
//                 <div className="flex items-center gap-6">
//                   <span className={`text-xl font-black ${activeFeature === idx ? "text-cyan-400" : "text-gray-500"}`}>
//                     {feat.num}
//                   </span>
//                   <span className={`text-lg md:text-xl font-bold ${activeFeature === idx ? "text-white" : "text-gray-300"}`}>
//                     {feat.title}
//                   </span>
//                 </div>
//                 <span className={`text-cyan-400 transition-transform ${activeFeature === idx ? "translate-x-1" : "opacity-0"}`}>
//                   ✦
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* لوحة العرض التفاعلية الكبرى (Typography Showcase) */}
//           <div className="lg:col-span-7 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-8">
//                 <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300 bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-400/30">
//                   {current.metric}
//                 </span>
//                 <span className="text-2xl font-black text-cyan-500/50">
//                   {current.num} / 05
//                 </span>
//               </div>

//               <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
//                 {current.title}
//               </h3>

//               <span className="text-sm md:text-base font-bold text-cyan-200 block mb-8">
//                 {current.subtitle}
//               </span>

//               <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-loose font-normal mb-10">
//                 {current.desc}
//               </p>

//               <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-cyan-300 font-semibold tracking-wider">
//                 <span>Smart Schools Complex Ecosystem</span>
//                 <span>Enterprise Grade</span>
//               </div>
//             </div>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";

// export default function MagazineFeaturesOverview() {
//   const { language } = useLanguage();
//   const [activeFeature, setActiveFeature] = useState(0);

//   const content = {
//     ar: {
//       tag: "مميزات Smart Schools Complex",
//       title: "خمس ركائز تقنية تعيد صياغة مفهوم الإدارة المدرسية الحديثة",
//       description:
//         "تصميم تجريدي انسيابي يدمج بين قوة أنظمة الـ ERP المتكاملة، وسهولة تصفح المنظومة الرقمية.",
//       features: [
//         {
//           num: "01",
//           title: "لوحة التحكم الإدارية والتقديم الإلكتروني",
//           subtitle: "إدارة شاملة، مرنة، ولحظية",
//           desc: "تحكم كامل في محتوى الموقع، إدارة الأخبار، الخطط الأسبوعية، وتنظيم ملفات تقديم الطلاب الجدد بكفاءة تامة دون أي تعقيدات ورقية.",
//           metric: "تحكم 100% لحظي",
//         },
//         {
//           num: "02",
//           title: "نظام المعلم المتقدم (Teacher LMS)",
//           subtitle: "أدوات ذكية لتعليم تفاعلي مبهر",
//           desc: "يتيح للمعلمين إنشاء الفصول الذكية، إعداد الاختبارات والواجبات الإلكترونية، رفع الفيديوهات المسجلة، والتحضيرات المدرسية بكل سلاسة.",
//           metric: "فصول ذكية واختبارات",
//         },
//         {
//           num: "03",
//           title: "بوابة الطالب الذكية والمخزن الشخصي",
//           subtitle: "بيئة تعليمية ممتعة ومستقلة",
//           desc: "استعراض الواجبات والنتائج فوراً، مخزن خاص للملفات والفيديوهات، فصول تفاعلية، وتواصل آمن ومباشر مع المعلمين والزملاء.",
//           metric: "مخزن ومراسلات آمنة",
//         },
//         {
//           num: "04",
//           title: "نظام ولي الأمر المالي ومتابعة الأبناء",
//           subtitle: "اطمئنان دائم وشفافية كاملة",
//           desc: "متابعة الحضور، الغياب، والتقييمات الشهرية، مع مراجعة كشوف الحسابات المالية، مواعيد الأقساط، وإمكانية طباعة المطالبات بكل مرونة.",
//           metric: "كشوفات ومتابعة مالية",
//         },
//         {
//           num: "05",
//           title: "خدمة أكثر من 500 مدرسة إقليمياً",
//           subtitle: "شريكك التقني الموثوق في مصر والوطن العربي",
//           desc: "خبرة عميقة ومنظومة معتمدة تخدم مئات المؤسسات التعليمية الكبرى بدعم فني مستمر وتحديثات رقمية متواصلة على مدار الساعة.",
//           metric: "+500 مدرسة معتمدة",
//         },
//       ],
//     },
//     en: {
//       tag: "Smart Schools Complex Features",
//       title: "Five Technical Pillars Redefining Modern School Management",
//       description:
//         "A fluid editorial design combining powerful ERP integration with seamless digital navigation.",
//       features: [
//         {
//           num: "01",
//           title: "Admin Dashboard & Online Admission",
//           subtitle: "Comprehensive, Flexible, & Real-time Management",
//           desc: "Full control over website content, news, weekly plans, and organized new student registration files without paperwork complexity.",
//           metric: "100% Real-time control",
//         },
//         {
//           num: "02",
//           title: "Advanced Teacher System (Teacher LMS)",
//           subtitle: "Smart Tools for Engaging Education",
//           desc: "Allows teachers to create smart classes, set online exams/homework, upload recorded videos, and lesson plans smoothly.",
//           metric: "Smart classes & exams",
//         },
//         {
//           num: "03",
//           title: "Smart Student Portal & Personal Vault",
//           subtitle: "An Engaging & Independent Learning Environment",
//           desc: "Review homework and results instantly, personal vault for files/videos, interactive classes, and secure direct communication.",
//           metric: "Secure vault & chat",
//         },
//         {
//           num: "04",
//           title: "Parent Financial & Student Monitoring System",
//           subtitle: "Constant Peace of Mind & Complete Transparency",
//           desc: "Track attendance, absence, and evaluations, review financial account statements, installment dates, and print demands flexibly.",
//           metric: "Financial tracking",
//         },
//         {
//           num: "05",
//           title: "Serving Over 500 Schools Regionally",
//           subtitle: "Your Trusted Technical Partner Across the Arab World",
//           desc: "Deep expertise and certified ecosystem serving hundreds of major educational institutions with continuous 24/7 technical support.",
//           metric: "+500 Trusted schools",
//         },
//       ],
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;
//   const current = t.features[activeFeature];

//   return (
//     <section
//       className="py-28 px-4 md:px-12 bg-[#041e2b] text-white relative overflow-hidden"
//       dir={language === "ar" ? "rtl" : "ltr"}
//     >
//       {/* خلفية ضوئية جمالية خافتة */}
//       <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

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

//         {/* تصميم عمودي مجلة (Editorial Split Layout) بدون كروت تقليدية وبدون تكرار */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-b border-white/10 py-16">
//           {/* قائمة الأقسام الجانبية (تصميم خطي نظيف) */}
//           <div className="lg:col-span-5 flex flex-col divide-y divide-white/10">
//             {t.features.map((feat, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setActiveFeature(idx)}
//                 className={`py-6 text-start transition-all duration-300 flex items-center justify-between group cursor-pointer px-4 rounded-2xl ${
//                   activeFeature === idx
//                     ? "bg-cyan-950/60 pl-6 border-l-4 border-cyan-400"
//                     : "hover:bg-white/5 opacity-70 hover:opacity-100"
//                 }`}
//               >
//                 <div className="flex items-center gap-6">
//                   <span
//                     className={`text-xl font-black ${activeFeature === idx ? "text-cyan-400" : "text-gray-500"}`}
//                   >
//                     {feat.num}
//                   </span>
//                   <span
//                     className={`text-lg md:text-xl font-bold ${activeFeature === idx ? "text-white" : "text-gray-300"}`}
//                   >
//                     {feat.title}
//                   </span>
//                 </div>
//                 <span
//                   className={`text-cyan-400 transition-transform ${activeFeature === idx ? "translate-x-1" : "opacity-0"}`}
//                 >
//                   ✦
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* لوحة العرض التفاعلية الكبرى (Typography Showcase) */}
//           <div className="lg:col-span-7 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-8">
//                 <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300 bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-400/30">
//                   {current.metric}
//                 </span>
//                 <span className="text-2xl font-black text-cyan-500/50">
//                   {current.num} / 05
//                 </span>
//               </div>

//               <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
//                 {current.title}
//               </h3>

//               <span className="text-sm md:text-base font-bold text-cyan-200 block mb-8">
//                 {current.subtitle}
//               </span>

//               <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-loose font-normal mb-10">
//                 {current.desc}
//               </p>

//               <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-cyan-300 font-semibold tracking-wider">
//                 <span>Smart Schools Complex Ecosystem</span>
//                 <span>Enterprise Grade</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";

// export default function InteractiveSchoolEcosystemMap() {
//   const { language } = useLanguage();
//   const [activePortal, setActivePortal] = useState(0);

//   const content = {
//     ar: {
//       tag: "خريطة المنظومة التفاعلية",
//       title: "استكشف بوابات Smart Schools Complex المترابطة",
//       description:
//         "اضغط على أي بوابة رقمية أدناه لتتعرف على نبض العمليات الخاصة بها وكيف تتكامل لحظياً داخل مجمع المدارس.",
//       portals: [
//         {
//           id: "admin",
//           name: "بوابة الإدارة العليا",
//           subtitle: "مركز القيادة والتحكم الشامل",
//           desc: "الصلاحية المطلقة لتعديل محتوى الموقع لحظياً، إدارة شؤون الموظفين، متابعة التقارير المالية، وتنظيم بوابات القبول والتقديم الإلكتروني للطلاب الجدد بكفاءة تامة.",
//           stat: "100%",
//           statLabel: "تحكم سيادي بالمنظومة",
//           features: [
//             "تعديل الموقع لحظياً",
//             "إدارة شؤون الطلاب والقبول",
//             "متابعة التقارير والرسوم",
//           ],
//         },
//         {
//           id: "teacher",
//           name: "منصة المعلم الرقمي",
//           subtitle: "أدوات تدريس متطورة (LMS)",
//           desc: "تمكن المعلمين من إنشاء الفصول الذكية، رفع المحاضرات والفيديوهات المسجلة، إعداد الاختبارات والواجبات الإلكترونية، وترصيد النتائج الشهرية بكل سهولة.",
//           stat: "5x",
//           statLabel: "سرعة في إنجاز المهام",
//           features: [
//             "فصول وبث مباشر",
//             "اختبارات إلكترونية",
//             "ترصيد وتصحيح آلي",
//           ],
//         },
//         {
//           id: "student",
//           name: "بوابة الطالب الذكية",
//           subtitle: "تجربة تعلم ممتعة ومستقلة",
//           desc: "بيئة رقمية تمنح الطالب مخزناً شخصياً للمستندات والكتب الرقمية، استعراض الواجبات والنتائج فوراً، والدخول في الفصول التفاعلية مع محادثات آمنة وموجهة.",
//           stat: "24/7",
//           statLabel: "وصول دائم للمحتوى",
//           features: [
//             "مخزن شخصي للملفات",
//             "متابعة الجداول والواجبات",
//             "تواصل آمن ومباشر",
//           ],
//         },
//         {
//           id: "parent",
//           name: "متابعة ولي الأمر",
//           subtitle: "شفافية مالية وأكاديمية كاملة",
//           desc: "متابعة دقيقة لمستوى الأبناء، الحضور والغياب، كشوف الحسابات المالية، مواعيد الأقساط، وإمكانية طباعة المطالبات بكل مرونة لضمان شراكة حقيقية مع المدرسة.",
//           stat: "0%",
//           statLabel: "جهد في المتابعة والاطمئنان",
//           features: [
//             "متابعة تقييمات الأبناء",
//             "كشوفات الحساب والأقساط",
//             "طباعة المطالبات المالية",
//           ],
//         },
//       ],
//     },
//     en: {
//       tag: "Interactive Ecosystem Map",
//       title: "Explore the Interconnected Smart Schools Complex Portals",
//       description:
//         "Click any digital portal below to discover its operational pulse and how it integrates in real-time across the school complex.",
//       portals: [
//         {
//           id: "admin",
//           name: "Administration Portal",
//           subtitle: "Comprehensive Command & Control Center",
//           desc: "Absolute authority to update website content instantly, manage staff affairs, track financial reports, and organize online admissions for new students seamlessly.",
//           stat: "100%",
//           statLabel: "Sovereign System Control",
//           features: [
//             "Instant website updates",
//             "Student affairs & admissions",
//             "Financial reports tracking",
//           ],
//         },
//         {
//           id: "teacher",
//           name: "Teacher LMS Platform",
//           subtitle: "Advanced Teaching Tools",
//           desc: "Empowers teachers to create smart classes, upload recorded lectures, set online exams and assignments, and record monthly results with absolute ease.",
//           stat: "5x",
//           statLabel: "Faster Task Execution",
//           features: [
//             "Smart classes & live streams",
//             "Online exams",
//             "Automated grading",
//           ],
//         },
//         {
//           id: "student",
//           name: "Student Smart Portal",
//           subtitle: "Engaging & Independent Learning",
//           desc: "A digital environment providing a personal storage vault for documents/books, instant homework and result reviews, and secure interactive messaging.",
//           stat: "24/7",
//           statLabel: "Continuous Content Access",
//           features: [
//             "Personal storage vault",
//             "Timetable & homework tracking",
//             "Secure messaging",
//           ],
//         },
//         {
//           id: "parent",
//           name: "Parent Monitoring Portal",
//           subtitle: "Complete Financial & Academic Transparency",
//           desc: "Precise tracking of children's academic levels, attendance, financial account statements, installment schedules, and flexible invoice printing.",
//           stat: "0%",
//           statLabel: "Effort in Following Up",
//           features: [
//             "Track student evaluations",
//             "Account statements & installments",
//             "Print financial demands",
//           ],
//         },
//       ],
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;
//   const current = t.portals[activePortal];

//   return (
//     <section
//       className="py-28 px-4 md:px-12 bg-gradient-to-br from-[#020d14] via-[#06222f] to-[#041e2b] text-white relative overflow-hidden"
//       dir={language === "ar" ? "rtl" : "ltr"}
//     >
//       {/* خلفية ضوئية متحركة وخافتة */}
//       <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

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

//         {/* أزرار اختيار البوابات الأربع */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
//           {t.portals.map((portal, idx) => (
//             <button
//               key={portal.id}
//               onClick={() => setActivePortal(idx)}
//               className={`p-6 rounded-3xl text-start transition-all duration-500 cursor-pointer border flex flex-col justify-between gap-4 ${
//                 activePortal === idx
//                   ? "bg-cyan-500 text-[#020d14] border-cyan-300 shadow-2xl shadow-cyan-500/30 scale-105"
//                   : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
//               }`}
//             >
//               <span
//                 className={`text-xs font-black tracking-widest ${activePortal === idx ? "text-[#020d14]/70" : "text-cyan-400"}`}
//               >
//                 0{idx + 1}
//               </span>
//               <div>
//                 <h3 className="text-base md:text-lg font-black leading-snug mb-1">
//                   {portal.name}
//                 </h3>
//                 <span
//                   className={`text-xs block font-semibold ${activePortal === idx ? "text-[#020d14]/80" : "text-gray-400"}`}
//                 >
//                   {portal.subtitle}
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* شاشة العرض الديناميكية الكبرى (Interactive Blueprint Display) */}
//         <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
//             {/* التفاصيل والوصف */}
//             <div className="lg:col-span-7">
//               <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300 bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-400/30 inline-block mb-6 shadow-inner">
//                 {current.subtitle}
//               </span>

//               <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
//                 {current.name}
//               </h3>

//               <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-loose font-normal mb-8">
//                 {current.desc}
//               </p>

//               {/* نقاط القوة داخل البوابة */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {current.features.map((feat, idx) => (
//                   <div
//                     key={idx}
//                     className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs md:text-sm font-bold text-cyan-200"
//                   >
//                     ✓ {feat}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* بطاقة الإحصائية البارزة */}
//             <div className="lg:col-span-5 bg-gradient-to-br from-cyan-950 via-[#06222f] to-[#041e2b] rounded-[2.5rem] p-8 md:p-10 border border-cyan-500/30 text-center shadow-2xl relative">
//               <span className="text-6xl md:text-8xl font-black text-cyan-400 block mb-4 tracking-tighter">
//                 {current.stat}
//               </span>
//               <h4 className="text-lg md:text-xl font-bold text-white mb-2">
//                 {current.statLabel}
//               </h4>
//               <p className="text-gray-400 text-xs md:text-sm">
//                 مدمج بالكامل داخل بيئة Smart Schools Complex
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function PioneersEcosystemOverview() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const content = {
    ar: {
      tag: "Pioneers E-School ERP System",
      title: "منظومة تخطيط موارد المؤسسات التعليمية الكل في واحد",
      description:
        "نظام أساسي يساعد في إدارة المهام التعليمية والإدارية اليومية من منصة واحدة، للانتقال إلى نظام رقمي بالكامل.",
      tabs: [
        {
          title: "النظرة العامة والشمولية",
          subtitle: "إدارة شاملة من منصة واحدة",
          desc: "نظام تخطيط موارد المؤسسات التعليمية (School ERP) يوفر تجربة سهلة الاستخدام مع وصول مخصص للمعلمين، الموظفين، الطلاب، وأولياء الأمور لإدارة المهام اليومية وأتمتة العمليات من قبول الطلاب إلى رقمنة التعلم.",
          points: [
            "أتمتة العمليات اليومية للمؤسسة بالكامل",
            "وصول مخصص (معلمين، موظفين، طلاب، أولياء أمور)",
            "إدارة شاملة لعمليات القبول والتعلم عبر الإنترنت",
          ],
        },
        {
          title: "الوحدات الأساسية والإدارية",
          subtitle: "جداول، حضور، امتحانات وموارد بشرية",
          desc: "تضم المنظومة وحدات لإدارة الجدول الزمني، الحضور والغياب، الفصول عبر الإنترنت، الامتحانات، دفاتر الدرجات، المكتبة، المواصلات، وتقويم الأحداث، بالإضافة لوحدة موارد بشرية لإدارة الرواتب وقسائم الموظفين.",
          points: [
            "إدارة الجدول الزمني، الحضور، والمكتبة والمواصلات",
            "دفاتر الدرجات والامتحانات الرقمية",
            "وحدة موارد بشرية متكاملة لرواتب وقسائم الموظفين",
          ],
        },
        {
          title: "الإدارة المالية وهياكل الرسوم",
          subtitle: "تخطيط وتخصيص الرسوم الدراسية",
          desc: "تساعدك الوحدة المالية المتقدمة على تخطيط وتخصيص هياكل الرسوم المختلفة للطلاب بدقة وسهولة لضمان الشفافية وإدارة المصروفات بكفاءة.",
          points: [
            "تخطيط وتخصيص هياكل الرسوم المختلفة",
            "إدارة المستحقات والتقارير المالية بدقة",
            "شفافية كاملة في الحسابات المدرسية",
          ],
        },
        {
          title: "أدوات التعاون والتواصل المتطورة",
          subtitle: "مؤتمرات مرئية ومدونات واستطلاعات",
          desc: "يعد النظام أداة تعاون ممتازة باستخدام المكونات الإضافية، المناقشات، الاستطلاعات، المدونات، والمؤتمرات المرئية لتعزيز التفاعل المستمر.",
          points: [
            "المؤتمرات المرئية والفصول التفاعلية",
            "المدونات والاستطلاعات والمناقشات الحية",
            "أدوات تواصل فعالة بين أطراف العملية التعليمية",
          ],
        },
        {
          title: "الهندسة الثلاثية المتكاملة",
          subtitle: "إدارة، تعليم عن بعد، وتطبيق موبايل",
          desc: "منظومة أنشئت تحت مراقبة خبراء إدارة المدارس الدولية واللغات، وتتكون من جزء إداري (SMS)، جزء للتعليم عن بعد (LMS)، وتطبيق هاتف محمول (Mobile App) لضمان التواصل المستمر.",
          points: [
            "جزء إداري متكامل (School Management System - SMS)",
            "جزء للتعليم عن بعد (Learning Management System - LMS)",
            "تطبيق موبايل لاستكمال التواصل الفعال",
          ],
        },
      ],
      badgeText: "إشراف خبراء إدارة المدارس الدولية واللغات",
    },
    en: {
      tag: "Pioneers E-School ERP System",
      title: "All-in-One Educational Enterprise Resource Planning",
      description:
        "An ultimate platform helping manage daily educational and administrative tasks from a single dashboard to transition into a fully digital system.",
      tabs: [
        {
          title: "Overview & Comprehensive Scope",
          subtitle: "All-in-One Management Platform",
          desc: "School ERP provides an easy-to-use experience with login access for teachers, non-teaching staff, students, parents, and administrative personnel to automate daily operations.",
          points: [
            "Complete automation of daily institutional operations",
            "Dedicated access for teachers, staff, students, & parents",
            "Seamless management from student admission to digital learning",
          ],
        },
        {
          title: "Core & Administrative Modules",
          subtitle: "Schedules, Attendance, Exams & HR",
          desc: "Includes modules for timetables, attendance, online classes, exams, gradebooks, library, transport, calendar, events, plus a full HR unit for payroll and employee slips.",
          points: [
            "Timetable, attendance, library & transport management",
            "Digital gradebooks and examinations",
            "Full HR module for payroll and employee pay slips",
          ],
        },
        {
          title: "Financial Management & Fee Structures",
          subtitle: "Plan and Allocate Student Fees",
          desc: "The financial unit helps you plan and allocate different fee structures for students easily and accurately, ensuring absolute transparency.",
          points: [
            "Plan and customize various student fee structures",
            "Precise management of dues and financial reports",
            "Complete transparency in school accounts",
          ],
        },
        {
          title: "Advanced Collaboration & Communication",
          subtitle: "Video Conferences, Blogs & Polls",
          desc: "Pioneers E-School ERP is an excellent collaboration tool using plugins, discussions, polls, blogs, and video conferencing to foster active engagement.",
          points: [
            "Video conferencing and interactive classes",
            "Blogs, polls, and live discussions",
            "Effective communication tools among stakeholders",
          ],
        },
        {
          title: "Triple Integrated Architecture",
          subtitle: "Admin SMS, Remote LMS & Mobile App",
          desc: "Built under the supervision of international and language school experts, comprising an Admin System (SMS), a Remote Learning System (LMS), and a dedicated Mobile App.",
          points: [
            "School Management System (SMS) for administration",
            "Learning Management System (LMS) for remote learning",
            "Mobile App for seamless stakeholder communication",
          ],
        },
      ],
      badgeText: "Supervised by International & Language School Experts",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const current = t.tabs[activeTab];

  return (
    <section
      className="py-24 px-4 md:px-12 bg-gradient-to-br from-[#041e2b] via-[#0f3b4c] to-[#082f49] text-white relative overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* خلفية ضوئية جمالية هادئة */}
      <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
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

        {/* أزرار التنقل بين المحاور الخمسة (تصميم فريد ونظيف) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
          {t.tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`p-4 rounded-2xl text-start transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 border ${
                activeTab === idx
                  ? "bg-cyan-500 text-[#041e2b] border-cyan-300 shadow-xl shadow-cyan-500/30 scale-105"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                className={`text-xs font-black tracking-widest ${activeTab === idx ? "text-[#041e2b]/70" : "text-cyan-400"}`}
              >
                0{idx + 1}
              </span>
              <span className="text-xs md:text-sm font-black line-clamp-2 leading-snug">
                {tab.title}
              </span>
            </button>
          ))}
        </div>

        {/* لوحة عرض التفاصيل للتبويب النشط */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300 bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-400/30 inline-block mb-6 shadow-inner">
              {current.subtitle}
            </span>

            <h3 className="text-3xl md:text-4xl font-black mb-4 text-white leading-tight">
              {current.title}
            </h3>

            <p className="text-gray-200 text-base md:text-lg leading-loose font-normal mb-8">
              {current.desc}
            </p>

            {/* النقاط التفصيلية */}
            <div className="grid grid-cols-1 gap-4 mb-10">
              {current.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <span className="w-6 h-6 rounded-full bg-cyan-400 text-[#041e2b] flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-200 text-sm md:text-base font-semibold">
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            {/* تذييل اللوحة */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cyan-300 font-semibold tracking-wider">
              <span>Pioneers E-School ERP & SMS & LMS Ecosystem</span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-white font-bold">
                {t.badgeText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
