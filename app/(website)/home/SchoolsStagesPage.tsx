"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useEffect, useState } from "react";

interface EducationalStage {
  id: string | number;
  badge_ar: string;
  badge_en: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  description_ar: string;
  description_en: string;
  features_ar: string[];
  features_en: string[];
  icon: string;
  color: string;
}

export default function StagesPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [stages, setStages] = useState<EducationalStage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/educational-stages`,
        );
        if (res.ok) {
          const data = await res.json();
          setStages(data);
        }
      } catch (err) {
        console.error("Error fetching stages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStages();
  }, []);

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <section className="max-w-6xl mx-auto text-center mb-16 pt-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-[#9E7C2F] text-sm font-semibold mb-4">
          {isAr ? "مسيرتنا التعليمية" : "Our Educational Journey"}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-cyan-800 mb-6 leading-tight">
          {isAr ? "المراحل الدراسية" : "Educational Stages"}
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
          {isAr
            ? "نقدم رحلة تعليمية متكاملة تتدرج مع نمو الطالب الأكاديمي والشخصي لبناء شخصية متوازنة ومبدعة."
            : "We offer a comprehensive educational journey tailored to student growth at every academic milestone."}
        </p>
      </section>

      {loading ? (
        <div className="text-center py-20 text-gray-500">
          {isAr ? "جاري التحميل..." : "Loading..."}
        </div>
      ) : (
        <section className="max-w-6xl mx-auto space-y-12 mb-20">
          {stages.map((stage, idx) => (
            <div
              key={stage.id}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl 
              transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div
                  className={`lg:col-span-4 bg-gradient-to-br ${stage.color} p-8 text-white flex flex-col justify-between relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold mb-4">
                      {isAr ? stage.badge_ar : stage.badge_en}
                    </span>
                    <div className="text-5xl mb-4">{stage.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {isAr ? stage.title_ar : stage.title_en}
                    </h3>
                    <p className="text-white/90 text-sm font-medium leading-relaxed">
                      {isAr ? stage.subtitle_ar : stage.subtitle_en}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/20 text-xs text-white/80 font-mono relative z-10">
                    0{idx + 1} / 0{stages.length}
                  </div>
                </div>

                <div className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">
                      {isAr ? "عن المرحلة:" : "About this stage:"}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                      {isAr ? stage.description_ar : stage.description_en}
                    </p>

                    <h4 className="text-lg font-bold text-gray-800 mb-3">
                      {isAr ? "أبرز ما يميز المرحلة:" : "Stage Highlights:"}
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                      {(isAr ? stage.features_ar : stage.features_en)?.map(
                        (feature, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-start gap-2.5 text-sm text-gray-700"
                          >
                            <span className="text-emerald-600 font-bold mt-0.5">
                              ✓
                            </span>
                            <span>{feature}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
