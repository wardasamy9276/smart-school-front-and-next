"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// تعريف واجهة البيانات من لاراڤيل
interface Stage {
  id: number;
  stage_key: string;
  badge_ar: string;
  badge_en: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  features_ar: string[];
  features_en: string[];
  icon: string;
  header_bg: string;
  badge_bg: string;
  accent_color: string;
}

export default function StagesPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // php artisan db:seed --class=AcademicStageSeeder
  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
          }/api/academic-stages`,
        );

        if (!response.ok) {
          throw new Error("فشل في جلب البيانات من الخادم");
        }

        const data = await response.json();
        setStages(data);
      } catch (err: any) {
        setError(err.message || "حدث خطأ غير متوقع");
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, []);

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-8 pt-2">
        <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold tracking-wide mb-2">
          {isAr ? "مسيرتنا التعليمية" : "Educational Path"}
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
          {isAr ? "المراحل الدراسية" : "Academic Stages"}
        </h1>
        <p className="max-w-xl mx-auto text-slate-600 text-xs md:text-sm leading-relaxed">
          {isAr
            ? "نقدم بيئة تعليمية تتطور مع الطالب في كل مرحلة عمرية لبناء شخصية أكاديمية متكاملة."
            : "Providing a tailored educational environment for every developmental stage."}
        </p>
      </section>

      {/* Loading & Error States */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-sm animate-pulse">
            {isAr ? "جاري تحميل المراحل الدراسية..." : "Loading stages..."}
          </p>
        </div>
      )}

      {error && (
        <div className="text-center py-12 text-red-500 text-sm">{error}</div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <section className="max-w-6xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="bg-white rounded-2xl shadow-md 
                hover:shadow-xl transition-all duration-300 
                overflow-hidden border border-slate-100 flex 
                flex-col justify-between"
              >
                <div>
                  {/* Header Mini */}
                  <div
                    className={`p-5 ${stage.header_bg} 
                    flex items-center justify-between`}
                  >
                    <div>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[11px] 
                          font-bold mb-1.5 ${stage.badge_bg}`}
                      >
                        {isAr ? stage.badge_ar : stage.badge_en}
                      </span>
                      <h2 className="text-lg font-bold text-slate-900">
                        {isAr ? stage.title_ar : stage.title_en}
                      </h2>
                    </div>
                    <div className="text-3xl p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                      {stage.icon}
                    </div>
                  </div>

                  {/* Content Mini */}
                  <div className="p-5">
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {isAr ? stage.description_ar : stage.description_en}
                    </p>

                    <h3
                      className="text-xs font-bold text-cyan-800 uppercase
                     tracking-wider mb-2.5"
                    >
                      {isAr ? "المميزات الرئيسية:" : "Key Features:"}
                    </h3>
                    <ul className="space-y-2">
                      {(isAr ? stage.features_ar : stage.features_en)?.map(
                        (feature, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-slate-700"
                          >
                            <span className="text-cyan-600 font-bold">✓</span>
                            <span className="leading-tight">{feature}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navigation Link */}
      <section className="max-w-6xl mx-auto text-center">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 bg-[#067492] hover:bg-[#055d75] text-white px-6 py-3 rounded-xl font-medium text-xs transition-colors shadow-sm"
        >
          <span>
            {isAr ? "استكشف الأنشطة المدرسية" : "Explore School Activities"}
          </span>
          <span>{isAr ? "←" : "→"}</span>
        </Link>
      </section>
    </main>
  );
}
