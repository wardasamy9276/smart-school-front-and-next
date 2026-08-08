"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function SmartClientsHomePage() {
  const { language } = useLanguage() as { language: string };
  const [activeCategory, setActiveCategory] = useState(0);

  const content = {
    ar: {
      tag: "Smart Star - شركاء النجاح",
      mainTitle: "نفخر بثقة كبرى المجمعات التعليمية والمدارس الرائدة",
      description:
        "نرافق مئات المؤسسات التعليمية في رحلة التحول الرقمي والإداري، لنصنع معاً معايير جديدة للتعليم الذكي في مصر والوطن العربي.",
      categories: [
        "جميع المؤسسات",
        "المدارس الدولية",
        "المجمعات التعليمية",
        "المؤسسات الأكاديمية",
      ],
      // 6 عناصر لكل تصنيف (Index 0: جميع المؤسسات)
      allClients: [
        {
          name: "مجمعات مدارس سمارت سكوول",
          type: "المجمعات التعليمية",
          location: "القاهرة، مصر",
        },
        {
          name: "مدارس المستقبل الدولية",
          type: "المدارس الدولية",
          location: "الرياض، السعودية",
        },
        {
          name: "أكاديمية النخبة التعليمية",
          type: "المؤسسات الأكاديمية",
          location: "دبي، الإمارات",
        },
        {
          name: "رواد التميز للتعليم",
          type: "المدارس الدولية",
          location: "الإسكندرية، مصر",
        },
        {
          name: "سلسلة مدارس الأفق الذكي",
          type: "المجمعات التعليمية",
          location: "الجديدة، المغرب",
        },
        {
          name: "معاهد الرواد الأهلية",
          type: "المؤسسات الأكاديمية",
          location: "عمان، الأردن",
        },
      ],
      // Index 1: المدارس الدولية
      internationalClients: [
        {
          name: "مدارس الأفق الدولية الحديثة",
          type: "المدارس الدولية",
          location: "القاهرة، مصر",
        },
        {
          name: "مدارس الكفاءات العالمية",
          type: "المدارس الدولية",
          location: "جدة، السعودية",
        },
        {
          name: "أكاديمية العالم الذكي",
          type: "المدارس الدولية",
          location: "دبي، الإمارات",
        },
        {
          name: "مدارس النور الدولية",
          type: "المدارس الدولية",
          location: "الدوحة، قطر",
        },
        {
          name: "مدارس القرن الحادي والعشرين",
          type: "المدارس الدولية",
          location: "الكويت، الكويت",
        },
        {
          name: "مدارس البتراء الدولية",
          type: "المدارس الدولية",
          location: "عمان، الأردن",
        },
      ],
      // Index 2: المجمعات التعليمية
      complexClients: [
        {
          name: "مجمع مدارس الأجيال المتكاملة",
          type: "المجمعات التعليمية",
          location: "الجيزة، مصر",
        },
        {
          name: "مجمع طارق بن زياد التعليمي",
          type: "المجمعات التعليمية",
          location: "الرياض، السعودية",
        },
        {
          name: "مجمع المستقبل الرقمي",
          type: "المجمعات التعليمية",
          location: "أبوظبي، الإمارات",
        },
        {
          name: "مجمع النور المدرسي الشامل",
          type: "المجمعات التعليمية",
          location: "الإسكندرية، مصر",
        },
        {
          name: "مجمع الواحة التعليمي",
          type: "المجمعات التعليمية",
          location: "مسقط، عمان",
        },
        {
          name: "مجمع الفجر الذكي",
          type: "المجمعات التعليمية",
          location: "المنامة، البحرين",
        },
      ],
      // Index 3: المؤسسات الأكاديمية
      academicClients: [
        {
          name: "أكاديمية العلوم المتقدمة",
          type: "المؤسسات الأكاديمية",
          location: "القاهرة، مصر",
        },
        {
          name: "معهد التقنية والعلوم الإدارية",
          type: "المؤسسات الأكاديمية",
          location: "الدمام، السعودية",
        },
        {
          name: "أكاديمية المستقبل الرقمي",
          type: "المؤسسات الأكاديمية",
          location: "الشارقة، الإمارات",
        },
        {
          name: "معهد التميز الأكاديمي",
          type: "المؤسسات الأكاديمية",
          location: "تونس، تونس",
        },
        {
          name: "أكاديمية المعرفة الذكية",
          type: "المؤسسات الأكاديمية",
          location: "بيروت، لبنان",
        },
        {
          name: "معهد الرواد للتدريب",
          type: "المؤسسات الأكاديمية",
          location: "عمان، الأردن",
        },
      ],
      ctaTitle: "هل ترغب في انضمام مؤسستك إلى قائمة شركائنا؟",
      ctaBtn: "اطلب عرض توضيحي للمنظومة",
    },
    en: {
      tag: "Smart Star - Partners of Success",
      mainTitle: "Proudly Trusted by Leading Educational Complexes & Schools",
      description:
        "We accompany hundreds of educational institutions in their digital and administrative transformation journey to set new standards for smart education across Egypt and the Arab world.",
      categories: [
        "All Institutions",
        "International Schools",
        "Educational Complexes",
        "Academic Institutions",
      ],
      allClients: [
        {
          name: "Smart Schools Complex",
          type: "Educational Complexes",
          location: "Cairo, Egypt",
        },
        {
          name: "Future International Schools",
          type: "International Schools",
          location: "Riyadh, KSA",
        },
        {
          name: "Elite Educational Academy",
          type: "Academic Institutions",
          location: "Dubai, UAE",
        },
        {
          name: "Pioneers of Excellence",
          type: "International Schools",
          location: "Alexandria, Egypt",
        },
        {
          name: "Smart Horizon Schools",
          type: "Educational Complexes",
          location: "Casablanca, Morocco",
        },
        {
          name: "Al Rowad Private Institutes",
          type: "Academic Institutions",
          location: "Amman, Jordan",
        },
      ],
      internationalClients: [
        {
          name: "Modern Horizon Int. Schools",
          type: "International Schools",
          location: "Cairo, Egypt",
        },
        {
          name: "Global Competencies Schools",
          type: "International Schools",
          location: "Jeddah, KSA",
        },
        {
          name: "Smart World Academy",
          type: "International Schools",
          location: "Dubai, UAE",
        },
        {
          name: "Al Noor International",
          type: "International Schools",
          location: "Doha, Qatar",
        },
        {
          name: "21st Century Schools",
          type: "International Schools",
          location: "Kuwait, Kuwait",
        },
        {
          name: "Petra International Schools",
          type: "International Schools",
          location: "Amman, Jordan",
        },
      ],
      complexClients: [
        {
          name: "Integrated Generations Complex",
          type: "Educational Complexes",
          location: "Giza, Egypt",
        },
        {
          name: "Tariq Bin Ziyad Complex",
          type: "Educational Complexes",
          location: "Riyadh, KSA",
        },
        {
          name: "Digital Future Complex",
          type: "Educational Complexes",
          location: "Abu Dhabi, UAE",
        },
        {
          name: "Al Noor Comprehensive School",
          type: "Educational Complexes",
          location: "Alexandria, Egypt",
        },
        {
          name: "Al Oasis Educational Complex",
          type: "Educational Complexes",
          location: "Muscat, Oman",
        },
        {
          name: "Smart Dawn Complex",
          type: "Educational Complexes",
          location: "Manama, Bahrain",
        },
      ],
      academicClients: [
        {
          name: "Advanced Sciences Academy",
          type: "Academic Institutions",
          location: "Cairo, Egypt",
        },
        {
          name: "Institute of Tech & Management",
          type: "Academic Institutions",
          location: "Dammam, KSA",
        },
        {
          name: "Digital Future Academy",
          type: "Academic Institutions",
          location: "Sharjah, UAE",
        },
        {
          name: "Academic Excellence Institute",
          type: "Academic Institutions",
          location: "Tunis, Tunisia",
        },
        {
          name: "Smart Knowledge Academy",
          type: "Academic Institutions",
          location: "Beirut, Lebanon",
        },
        {
          name: "Al Rowad Training Institute",
          type: "Academic Institutions",
          location: "Amman, Jordan",
        },
      ],
      ctaTitle: "Want to join our growing list of partners?",
      ctaBtn: "Request a System Demo",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const isRtl = language === "ar";

  // دالة لاختيار القائمة المعروضة بناءً على الزر النشط
  const getActiveClientsList = () => {
    switch (activeCategory) {
      case 1:
        return t.internationalClients;
      case 2:
        return t.complexClients;
      case 3:
        return t.academicClients;
      default:
        return t.allClients;
    }
  };

  const currentClients = getActiveClientsList();

  return (
    <div
      className="bg-[#0e495b] text-white min-h-screen flex flex-col justify-between overflow-x-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* قسم الهيدر / البداية للـ Clients Home */}
      <section className="relative py-28 px-4 md:px-12 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-400/5 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            {t.tag}
          </span>

          <div className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">
            <Typewriter
              options={{
                strings: [t.mainTitle],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
              }}
            />
          </div>

          <p className="text-white text-base md:text-lg max-w-2xl mx-auto mb-16 leading-relaxed font-normal opacity-95">
            {t.description}
          </p>

          {/* تصنيفات العملاء */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
            {t.categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === idx
                    ? "bg-white text-[#0e495b] shadow-xl scale-105 font-black"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* قائمة شركاء النجاح (تعرض بالضبط 6 كروت لكل تصنيف) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {currentClients.map((client, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-start hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 group-hover:scale-110 transition-transform">
                    <Star className="w-5 h-5 text-cyan-300" />
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/90">
                    {client.type}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {client.name}
                </h4>
                <p className="text-xs text-white/70 font-medium">
                  {client.location}
                </p>
              </div>
            ))}
          </div>

          {/* دعوة للانضمام (Call to action) */}
          <div className="p-10 md:p-14 rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/15 text-center shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
              {t.ctaTitle}
            </h3>
            <Link href="/demo">
              <button className="px-8 py-4 rounded-full bg-white text-[#0e495b] hover:bg-gray-100 font-black text-sm md:text-base transition-all duration-300 inline-flex items-center gap-3 shadow-xl cursor-pointer">
                <span>{t.ctaBtn}</span>
                <ArrowRight
                  className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
                />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
