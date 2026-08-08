"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function CoreValues() {
  const { language } = useLanguage();

  const translations = {
    ar: {
      tag: "رؤية مجمع سمارت التعليمي",
      title: "المبادئ والركائز التي تقود Smart Schools Complex",
      description:
        "في مجمع مدارس سمارت، نصيغ مستقبل التعليم من خلال دمج التكنولوجيا الحديثة بالقيم التربوية الأصيلة لتمكين الجيل القادم من قادة المستقبل في بيئة تفاعلية ومبتكرة.",
      values: [
        {
          title: "التحول الرقمي التعليمي",
          desc: "نتبنى أحدث منصات التعلم الذكي وأنظمة الفصول الافتراضية والواقع المعزز لضمان تجربة تعليمية تفاعلية ومتطورة توافق أحدث المعايير العالمية وتواكب متطلبات العصر الرقمي الحديث بكل كفاءة واحترافية.",
          badge: "تكنولوجيا",
        },
        {
          title: "التميز الأكاديمي الشامل",
          desc: "نطبق معايير دولية دقيقة ومناهج متطورة لضمان حصول طلاب مجمع سمارت على أعلى مستويات التأهيل العلمي والمعرفي الذي يؤهلهم للتفوق في كافة المحافل المحلية والدولية.",
          badge: "جودة",
        },
        {
          title: "تنمية الشخصية القيادية",
          desc: "نركز بعمق على صقل مهارات الثقة بالنفس، واتخاذ القرار بوعي تام، وتعزيز روح العمل الجماعي الفعّال لدى طلابنا ليكونوا رواداً وقادة في مجتمعاتهم المستقبلية.",
          badge: "قيادة",
        },
        {
          title: "الابتكار في حل المشكلات",
          desc: "نحفز طلابنا باستمرار على التفكير النقدي والبحث العلمي المتقدم لإيجاد حلول إبداعية ومبتكرة لمختلف التحديات المعاصرة بروح استباقية متجددة.",
          badge: "إبداع",
        },
        {
          title: "الشراكة المجتمعية الفعالة",
          desc: "نؤمن تماماً بأن التعليم مسؤولية مشتركة، لذا نعمل بجهد على ربط مجتمع المدرسة باستمرار بأولياء الأمور والمؤسسات المجتمعية لخلق بيئة داعمة ومترابطة.",
          badge: "تواصل",
        },
        {
          title: "بيئة تعليمية حاضنة وآمنة",
          desc: "نوفر مساحات تعليمية ومرافق آمنة ومحفزة تراعي الفروق الفردية وتهتم بكل عناية بالصحة النفسية والبدنية لكل طالب وطالبة لضمان نمو متوازن وسليم.",
          badge: "رعاية",
        },
        {
          title: "الاستدامة والوعي البيئي",
          desc: "نغرس في نفوس طلابنا مبادئ المسؤولية تجاه الكوكب والأرض من خلال مبادرات تعليمية خضراء ومستدامة تنعكس إيجابياً على سلوكهم البيئي والمجتمعي.",
          badge: "استدامة",
        },
        {
          title: "القيم والأخلاق المهنية",
          desc: "النزاهة، الاحترام المتبادل، والأمانة المطلقة هي الركائز الأساسية والثابتة التي يبني عليها طالب سمارت كافة تعاملاته وعلاقاته الشخصية والمهنية.",
          badge: "أخلاق",
        },
      ],
    },
    en: {
      tag: "Smart Schools Complex Vision",
      title: "Principles and Pillars Guiding Smart Schools Complex",
      description:
        "At Smart Schools Complex, we reshape the future of education by integrating modern technology with traditional values to empower the next generation of leaders.",
      values: [
        {
          title: "Digital Transformation",
          desc: "We leverage cutting-edge smart learning platforms, virtual classrooms, and augmented reality to ensure an advanced interactive educational experience meeting global standards.",
          badge: "Tech",
        },
        {
          title: "Holistic Excellence",
          desc: "Implementing rigorous international standards and advanced curricula to ensure our students receive top-tier scientific qualification for excellence locally and globally.",
          badge: "Quality",
        },
        {
          title: "Leadership Development",
          desc: "Focusing deeply on honing self-confidence, conscious decision-making, and effective teamwork skills among students to make them visionary leaders of tomorrow.",
          badge: "Leadership",
        },
        {
          title: "Innovative Problem Solving",
          desc: "Continuously encouraging students toward critical thinking and advanced scientific research to find creative and innovative solutions to modern-day challenges.",
          badge: "Innovation",
        },
        {
          title: "Community Partnership",
          desc: "Firmly believing that education is a shared responsibility, we actively bridge the gap between the school, parents, and community institutions for a supportive network.",
          badge: "Partnership",
        },
        {
          title: "Nurturing Environment",
          desc: "Providing safe, inspiring educational spaces that respect individual needs and attentively care for every student's mental and physical well-being for balanced growth.",
          badge: "Care",
        },
        {
          title: "Sustainability & Awareness",
          desc: "Instilling responsibility toward our planet through green and sustainable educational initiatives that positively reflect on students' environmental and societal behavior.",
          badge: "Sustainability",
        },
        {
          title: "Professional Ethics",
          desc: "Integrity, mutual respect, and absolute honesty are the steadfast foundational pillars upon which every Smart School student builds all personal and professional relations.",
          badge: "Ethics",
        },
      ],
    },
  };

  const t =
    translations[language as keyof typeof translations] || translations.ar;
  const icons = ["💻", "🎓", "👑", "💡", "🤝", "🌿", "🌎", "🛡️"];

  return (
    <section
      className="py-20 px-4 md:px-12 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-sm font-bold tracking-wide border border-cyan-200">
          {t.tag}
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f3b4c] mb-6">
          {t.title}
        </h2>
        <p className="text-gray-600 mb-16 max-w-3xl mx-auto text-lg leading-relaxed">
          {t.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.values.map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-3xl border border-cyan-100 bg-white shadow-sm hover:shadow-cyan-100 hover:shadow-xl transition-all duration-300 text-right flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-3xl group-hover:bg-cyan-700 group-hover:text-white transition-colors">
                    {icons[index]}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-50 text-cyan-700">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-bold text-lg text-cyan-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
              <div className="w-12 h-1 bg-cyan-700 mt-6 rounded-full group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
