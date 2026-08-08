"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AccreditationPartners() {
  const { language } = useLanguage();

  const content = {
    ar: {
      tag: "شبكة الانتشار والاعتمادات",
      title: "نخدم أكثر من 500 مدرسة في مصر ودول الخليج والوطن العربي",
      description:
        "نفخر بثقة نخبة من المؤسسات التعليمية الكبرى والجهات المعتمدة، لنكون الشريك التقني والإداري الأول لتطوير التعليم.",
      statsNumber: "+500",
      statsLabel: "مدرسة ومؤسسة تعليمية تعتمد على منظومتنا",
      partners: [
        { name: "الاعتماد الدولي للجودة والتميز", type: "جهة اعتماد أكاديمي" },
        {
          name: "وزارة التربية والتعليم والتعليم الفني",
          type: "شريك استراتيجي حكومي",
        },
        {
          name: "شريك التحول الرقمي والذكاء الاصطناعي",
          type: "شريك تقني معتمد",
        },
        { name: "شبكة المدارس الدولية الخاصة", type: "عملاء مميزون" },
        {
          name: "منظومة إدارة الموارد المدرسية ERP",
          type: "حلول تقنية متكاملة",
        },
      ],
    },
    en: {
      tag: "Expansion Network & Accreditations",
      title:
        "Serving Over 500 Schools Across Egypt, the Gulf, and the Arab World",
      description:
        "We take pride in the trust of elite educational institutions and certified entities, acting as the premier technical and administrative partner.",
      statsNumber: "+500",
      statsLabel: "Schools & Educational Institutions Relying on Our Ecosystem",
      partners: [
        {
          name: "International Quality & Excellence Accreditation",
          type: "Academic Accreditation Body",
        },
        {
          name: "Ministry of Education & Technical Education",
          type: "Strategic Government Partner",
        },
        {
          name: "Digital Transformation & AI Partner",
          type: "Certified Tech Partner",
        },
        {
          name: "International Private Schools Network",
          type: "Distinguished Clients",
        },
        {
          name: "School ERP Resource Management System",
          type: "Integrated Tech Solutions",
        },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.ar;

  return (
    <section
      className="py-28 px-4 md:px-12 bg-white relative overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto">
        {/* رأس السيكشن */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs md:text-sm font-extrabold tracking-wide border border-cyan-200">
            {t.tag}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f3b4c] mb-6 tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* تصميم عصري مختلف تماماً (Editorial Impact Showcase) بدون كروت أو جدول */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-gradient-to-br from-cyan-900 via-[#0f3b4c] to-cyan-950 text-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* خلفية ضوئية */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* الرقم البارز الضخم (+500 مدرسة) */}
          <div className="lg:w-1/2 text-center lg:text-start relative z-10 border-b lg:border-b-0 lg:border-l lg:border-white/10 pb-10 lg:pb-0 lg:pl-12">
            <span className="text-6xl md:text-8xl font-black text-cyan-300 block mb-4 tracking-tighter">
              {t.statsNumber}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              {t.statsLabel}
            </h3>
            <p className="text-cyan-100/80 text-sm md:text-base leading-relaxed">
              تنتشر نجاحاتنا عبر جمهوره الواسع في مصر، دول الخليج العربي، ومختلف
              مدن الوطن العربي لدعم التحول الرقمي المدرسي.
            </p>
          </div>

          {/* قائمة الشركاء والاعتمادات بتصميم طولي منسق بدون كروت */}
          <div className="lg:w-1/2 flex flex-col gap-6 relative z-10 w-full">
            {t.partners.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-4 border-b border-white/10 group"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-300 block mb-1">
                    {partner.type}
                  </span>
                  <h4 className="text-lg md:text-xl font-black text-white group-hover:text-cyan-200 transition-colors">
                    {partner.name}
                  </h4>
                </div>
                <span className="text-cyan-400 text-xl font-bold group-hover:translate-x-1 transition-transform">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
