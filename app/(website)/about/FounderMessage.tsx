"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SmartCampusExperience() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const content = {
    ar: {
      tag: "تجربة الحرم الجامعي الذكي",
      title: "اكتشف بيئة المستقبل في Smart Schools Complex",
      description:
        "نصمم بيئة تعليمية تفاعلية ومتكاملة تجمع بين أحدث الابتكارات التكنولوجية والمساحات الملهمة لضمان رحلة تعليمية استثنائية لكل طالب.",
      tabs: [
        {
          title: "الفصول الذكية التفاعلية",
          subtitle: "تكنولوجيا تعليمية متطورة",
          desc: "شاشات تفاعلية ذكية، أنظمة صوتيات متقدمة، واتصال فائق السرعة يتيح للطلاب التفاعل مع المناهج بطريقة بصرية وعملية شيقة.",
          highlight: "تفاعل كامل 100%",
          icon: "🖥️",
        },
        {
          title: "معامل الذكاء الاصطناعي",
          subtitle: "ابتكار وعمل تطبيقي",
          desc: "مختبرات مجهزة بأحدث أدوات الروبوتكس والبرمجة لتأهيل عقول الطلاب منذ الصغر على التفكير البرمجي وحل المشكلات الهندسية.",
          highlight: "مستقبل رقمي واعد",
          icon: "🤖",
        },
        {
          title: "الملاعب والمرافق الرياضية",
          subtitle: "بناء جسدي وعقلي متوازن",
          desc: "مساحات خضراء واسعة وملاعب مغطاة ومفتوحة تلبي كافة الأنشطة الرياضية لتعزيز الصحة البدنية وروح الفريق الواحد.",
          highlight: "صحة وحيوية",
          icon: "⚽",
        },
        {
          title: "الاستدامة والبيئة الخضراء",
          subtitle: "مسؤولية تجاه الكوكب",
          desc: "حرم جامعي صديق للبيئة يعتمد على الطاقة النظيفة ومساحات خضراء مستدامة لترسيخ الوعي البيئي لدى الأجيال القادمة.",
          highlight: "طاقة نظيفة",
          icon: "🌱",
        },
      ],
      statsTitle: "أرقام تتحدث عن إنجازاتنا",
      stats: [
        { number: "+25", label: "عاماً من التميز التعليمي" },
        { number: "+98%", label: "نسبة رضا أولياء الأمور" },
        { number: "100%", label: "فصول ذكية ومجهزة" },
        { number: "+15", label: "شراكة دولية معتمدة" },
      ],
    },
    en: {
      tag: "Smart Campus Experience",
      title: "Explore the Future Environment at Smart Schools Complex",
      description:
        "We design an interactive, comprehensive educational environment combining cutting-edge tech innovations with inspiring spaces for an exceptional journey.",
      tabs: [
        {
          title: "Interactive Smart Classrooms",
          subtitle: "Advanced Educational Tech",
          desc: "Smart interactive screens, advanced acoustics, and high-speed connectivity enabling students to engage with curricula visually and practically.",
          highlight: "100% Interactive",
          icon: "🖥️",
        },
        {
          title: "AI & Robotics Labs",
          subtitle: "Innovation & Applied Work",
          desc: "Labs equipped with state-of-the-art robotics and coding tools to train young minds in algorithmic thinking and engineering problem-solving.",
          highlight: "Promising Digital Future",
          icon: "🤖",
        },
        {
          title: "Sports Fields & Facilities",
          subtitle: "Balanced Physical & Mental Growth",
          desc: "Vast green spaces and indoor-outdoor courts catering to diverse athletic activities to boost physical health and teamwork.",
          highlight: "Health & Vitality",
          icon: "⚽",
        },
        {
          title: "Sustainability & Green Campus",
          subtitle: "Responsibility Toward the Planet",
          desc: "An eco-friendly campus relying on clean energy and sustainable green areas to instill environmental awareness in coming generations.",
          highlight: "Clean Energy",
          icon: "🌱",
        },
      ],
      statsTitle: "Numbers That Speak of Our Achievements",
      stats: [
        { number: "+25", label: "Years of Educational Excellence" },
        { number: "+98%", label: "Parent Satisfaction Rate" },
        { number: "100%", label: "Smart & Equipped Classrooms" },
        { number: "+15", label: "Accredited International Partnerships" },
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const currentTab = t.tabs[activeTab];

  return (
    <section
      className="py-24 px-4 md:px-12 bg-gradient-to-b from-gray-50 via-white to-cyan-50/20 relative overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* عناصر جمالية في الخلفية */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* رأس القسم */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-sm font-bold tracking-wide border border-cyan-200">
            {t.tag}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f3b4c] mb-6 tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* التبويبات التفاعلية (Interactive Tabs) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {t.tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`p-4 rounded-2xl text-start transition-all duration-300 border font-bold flex flex-col gap-2 ${
                activeTab === idx
                  ? "bg-cyan-700 text-white border-cyan-700 shadow-lg shadow-cyan-700/20 scale-[1.02]"
                  : "bg-white text-gray-700 border-gray-100 hover:border-cyan-200 hover:bg-cyan-50/40"
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-sm md:text-base line-clamp-1">
                {tab.title}
              </span>
            </button>
          ))}
        </div>

        {/* محتوى التبويب النشط */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-cyan-100 shadow-xl shadow-cyan-950/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full w-fit mb-4 border border-cyan-200">
              {currentTab.subtitle}
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-cyan-950 mb-4">
              {currentTab.title}
            </h3>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 font-medium">
              {currentTab.desc}
            </p>
            <div className="flex items-center gap-3 text-cyan-800 font-bold bg-cyan-50/80 p-4 rounded-2xl w-fit border border-cyan-100">
              <span className="w-3 h-3 rounded-full bg-cyan-700 animate-pulse" />
              <span>{currentTab.highlight}</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-cyan-700 to-cyan-950 rounded-2xl h-64 md:h-80 flex flex-col items-center justify-center text-white p-6 shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {currentTab.icon}
            </span>
            <h4 className="font-extrabold text-xl text-center">
              Smart Schools Complex
            </h4>
            <p className="text-xs text-cyan-200 mt-2 text-center opacity-80">
              معايير عالمية لعالم رقمي متطور
            </p>
          </div>
        </div>

        {/* قسم الإحصائيات والأرقام */}
        <div className="bg-cyan-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-700/10 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-10 text-cyan-100">
            {t.statsTitle}
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {t.stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="text-3xl md:text-5xl font-black text-cyan-300 mb-2">
                  {stat.number}
                </span>
                <span className="text-sm md:text-base text-gray-300 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
