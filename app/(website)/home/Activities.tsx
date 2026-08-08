"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useEffect, useState } from "react";

interface LmsSection {
  id?: number;
  role?: string;
  icon: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
}

export default function LmsSystemPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // الأزرار الثلاثة: معلم، طالب، ولي أمر
  const [activeRole, setActiveRole] = useState<
    "teacher" | "student" | "parent"
  >("teacher");

  const [sections, setSections] = useState<LmsSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // جلب الـ 42 كارت مرة واحدة عند فتح الصفحة
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/lms-system-sections`,
        );

        if (!res.ok) {
          throw new Error("فشل في جلب البيانات");
        }

        const data = await res.json();
        setSections(data); // يفترض أن الـ API ترجع 42 كارت
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  // تقسيم الـ 42 كارت على الأزرار الثلاثة بالتساوي (14 لكل زرار)
  // - المعلم: أول 14 كارت (من 0 إلى 13)
  // - الطالب: الـ 14 كارت التالية (من 14 إلى 27)
  // - ولي الأمر: الـ 14 كارت الأخيرة (من 28 إلى 42)
  const getRoleSections = () => {
    if (activeRole === "teacher") return sections.slice(0, 14);
    if (activeRole === "student") return sections.slice(14, 28);
    if (activeRole === "parent") return sections.slice(28, 42);
    return [];
  };

  const displayedSections = getRoleSections();

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-900 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-cyan-500 selection:text-white"
    >
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-16 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-cyan-900/20 via-transparent to-blue-900/20 blur-3xl"></div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold tracking-wide mb-4 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          {isAr
            ? "نظام إدارة التعلم الإلكتروني المتكامل"
            : "Learning Management System"}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          Pioneers E-School LMS
        </h1>
        <p className="max-w-3xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
          {isAr
            ? "منصة تعليمية ذكية وخاصة متكاملة تربط الطلاب، المعلمين، وأولياء الأمور في بيئة رقمية واحدة لتسهيل العملية التعليمية ومتابعة الأداء بدقة."
            : "An integrated smart platform connecting students, teachers, and parents in a single digital environment to streamline education."}
        </p>
      </div>

      {/* الأزرار الثلاثة الأساسية (المعلم، الطالب، ولي الأمر) */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700/60 backdrop-blur-md">
          <button
            onClick={() => setActiveRole("teacher")}
            className={`flex-1 min-w-[140px] py-3 px-6 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
              activeRole === "teacher"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/50"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            {isAr ? "👨‍🏫 حساب نظام المعلم" : "Teacher System"}
          </button>

          <button
            onClick={() => setActiveRole("student")}
            className={`flex-1 min-w-[140px] py-3 px-6 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
              activeRole === "student"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/50"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            {isAr ? "🎓 حساب نظام الطالب" : "Student System"}
          </button>

          <button
            onClick={() => setActiveRole("parent")}
            className={`flex-1 min-w-[140px] py-3 px-6 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
              activeRole === "parent"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/50"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            {isAr ? "👨‍👩‍👧 حساب نظام ولي الأمر" : "Parent System"}
          </button>
        </div>
      </div>

      {/* Loading & Error */}
      {loading && (
        <div className="text-center py-20 text-cyan-400 animate-pulse text-sm">
          {isAr ? "جاري تحميل البيانات..." : "Loading data..."}
        </div>
      )}

      {error && (
        <div className="max-w-md mx-auto text-center py-8 bg-rose-950/50 border border-rose-800 rounded-2xl p-4 my-4 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* عرض الـ 14 كارت الخاصة بالزرار المحدد */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto mb-16 px-2">
          {displayedSections.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm col-span-full">
              {isAr ? "لا توجد بيانات متاحة حالياً." : "No data available."}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedSections.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="relative bg-slate-800/50 border border-slate-700/60 rounded-3xl p-8 hover:border-cyan-500/50 transition-all group overflow-hidden flex flex-col items-center text-center justify-between shadow-lg hover:shadow-cyan-500/10 min-h-[280px]"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"></div>

                  <div className="w-full flex flex-col items-center">
                    <div className="text-4xl mb-5 p-4 bg-slate-900/90 rounded-2xl w-fit group-hover:scale-110 transition-transform shadow-inner border border-slate-700/50">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {isAr ? item.title_ar : item.title_en}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {isAr ? item.desc_ar : item.desc_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
