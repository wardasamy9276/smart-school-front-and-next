"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export default function SmartSchoolCommandConsole() {
  const { language } = useLanguage() as { language: string };
  const [activeTab, setActiveTab] = useState(0);

  const content = {
    ar: {
      tag: "Smart School • وحدة التحكم البرمجية",
      mainTitle: "محطة العمليات المركزية لمجمع مدارس Smart School",
      description:
        "واجهة تشغيل تفاعلية متقدمة ومستقلة تماماً، مصممة لعرض تدفق البيانات الإدارية والأكاديمية عبر مسارات رقمية متصلة بلا حدود.",
      tabs: [
        {
          id: "01",
          title: "التزامن الفوري للفروع",
          subtitle: "ربط رقمي حي لـ 12 فرعاً تعليمياً",
          text: "تتم مزامنة البيانات وسجلات الحضور والغياب والتقارير الإدارية الخاصة بجميع فروع مجمع مدارس Smart School لحظياً عبر السحابة، مما يضمن اتخاذ القرار الإداري في جزء من الثانية دون أي تأخير.",
        },
        {
          id: "02",
          title: "الأتمتة الأكاديمية الذكية",
          subtitle: "إدارة +850 معلماً ومشرفاً",
          text: "تنظيم وتوزيع الجداول المدرسية، المهام التربوية، والامتحانات آلياً لخدمة أكثر من 15,000 طالب وطالبة، مما يوفر بيئة تعليمية مستقرة ومنظمة ترفع من كفاءة العملية التعليمية.",
        },
        {
          id: "03",
          title: "قناة التواصل المباشر",
          subtitle: "تشفير كامل وحماية أمنية 24/7",
          text: "بوابة إلكترونية وتطبيق مخصص يربط أولياء الأمور مباشرة بالإدارة والمعلمين، لنقل النتائج والملاحظات اليومية بشفافية كاملة وضمن أعلى معايير الحماية الرقمية.",
        },
      ],
      ctaBtn: "تفعيل النظام بالكامل",
    },
    en: {
      tag: "Smart School • Software Control Unit",
      mainTitle: "Central Operations Terminal for Smart School Complex",
      description:
        "An advanced, fully independent interactive operating interface designed to display administrative and academic data flow through boundless connected digital pathways.",
      tabs: [
        {
          id: "01",
          title: "Instant Branch Synchronization",
          subtitle: "Live digital linking for 12 educational branches",
          text: "Data, attendance records, and administrative reports for all Smart School branches are synchronized instantly via the cloud, ensuring administrative decisions are made in milliseconds.",
        },
        {
          id: "02",
          title: "Smart Academic Automation",
          subtitle: "Managing +850 teachers and supervisors",
          text: "Organizing and distributing timetables, educational tasks, and exams automatically to serve over 15,000 students, providing a stable and organized environment that boosts education quality.",
        },
        {
          id: "03",
          title: "Direct Communication Channel",
          subtitle: "Full encryption and 24/7 security protection",
          text: "An electronic portal and dedicated app connecting parents directly with administration and teachers, delivering daily results and feedback with total transparency and high security.",
        },
      ],
      ctaBtn: "Activate System Fully",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const isRtl = language === "ar";
  const activeData = t.tabs[activeTab];

  return (
    <div
      className="bg-[#0e495b] text-white min-h-screen py-24 px-6 md:px-20 flex flex-col justify-between relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-cyan-400/5 rounded-full blur-[220px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* الترويسة العلوية */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            {t.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            {t.mainTitle}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl font-normal leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* تصميم محطة العمليات (تنسيق خطي متتابع مع مؤشرات برمجية - بدون كروت نهائياً) */}
        <div className="border border-white/15 bg-white/[0.02] backdrop-blur-3xl rounded-3xl p-6 md:p-12 mb-12 shadow-2xl">
          {/* أزرار التنقل بين المسارات البرمجية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 pb-8 border-b border-white/10">
            {t.tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`text-start px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                  activeTab === idx
                    ? "bg-white text-[#0e495b] border-white font-black shadow-lg scale-105"
                    : "bg-transparent text-white border-white/10 hover:bg-white/5 font-bold"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${activeTab === idx ? "bg-[#0e495b] text-white" : "bg-white/10 text-cyan-300"}`}
                  >
                    {tab.id}
                  </span>
                  <span className="text-sm">{tab.title}</span>
                </div>
                <Terminal className="w-4 h-4 opacity-70" />
              </button>
            ))}
          </div>

          {/* محتوى الشاشة البرمجية النشطة */}
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-md bg-white/10 text-cyan-300 font-mono text-xs tracking-wider uppercase border border-white/15">
              STREAM CONFIGURATION // {activeData.subtitle}
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              {activeData.title}
            </h2>

            <p className="text-white/90 text-lg md:text-xl font-normal leading-relaxed max-w-3xl">
              {activeData.text}
            </p>
          </div>
        </div>

        {/* الشريط السفلي */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-200/70">
            SMART SCHOOL ENGINE • PROTOCOL 2026
          </span>

          <Link href="/demo">
            <button className="px-8 py-4 rounded-full bg-white text-[#0e495b] hover:bg-gray-100 font-black text-sm md:text-base transition-all duration-300 inline-flex items-center gap-3 shadow-xl cursor-pointer">
              <span>{t.ctaBtn}</span>
              <ArrowRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
