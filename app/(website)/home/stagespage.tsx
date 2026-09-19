"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
// php artisan db:seed --class=WhyChooseUsSeeder
// php artisan db:seed --class=WhyChooseUsSeeder
// php artisan db:seed --class=WhyChooseUsSeeder
// php artisan db:seed --class=WhyChooseUsSeeder

export default function StagesPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-sm animate-pulse">
            {isAr ? "جاري تحميل المراحل الدراسية..." : "Loading stages..."}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-12 text-red-500 text-sm">{error}</div>
      )}

      {/* Cards */}
      {!loading && !error && (
        <section className="max-w-6xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="group h-[330px]"
                style={{ perspective: "1000px" }}
              >
                {/* Flip Container */}
                <div
                  className="
                    relative
                    w-full
                    h-full
                    transition-transform
                    duration-700
                    ease-in-out
                    [transform-style:preserve-3d]
                    group-hover:[transform:rotateY(180deg)]
                  "
                >
                  {/* =========================
                      FRONT FACE
                  ========================== */}
                  <div
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      bg-white
                      rounded-2xl
                      shadow-md
                      border
                      border-slate-100
                      overflow-hidden
                      [backface-visibility:hidden]
                      flex
                      flex-col
                    "
                  >
                    {/* Header */}
                    <div
                      className={`
                        p-5
                        ${stage.header_bg}
                        flex
                        items-center
                        justify-between
                      `}
                    >
                      <div>
                        <span
                          className={`
                            inline-block
                            px-2.5
                            py-1
                            rounded-md
                            text-[11px]
                            font-bold
                            mb-1.5
                            ${stage.badge_bg}
                          `}
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

                    {/* Content */}
                    <div className="p-5 flex-1">
                      <p className="text-slate-600 text-xs leading-relaxed mb-4">
                        {isAr ? stage.description_ar : stage.description_en}
                      </p>

                      <h3
                        className="
                          text-xs
                          font-bold
                          text-cyan-800
                          uppercase
                          tracking-wider
                          mb-2.5
                        "
                      >
                        {isAr ? "المميزات الرئيسية:" : "Key Features:"}
                      </h3>

                      <ul className="space-y-2">
                        {(isAr ? stage.features_ar : stage.features_en)?.map(
                          (feature, fIdx) => (
                            <li
                              key={fIdx}
                              className="
                              flex
                              items-start
                              gap-2
                              text-xs
                              text-slate-700
                            "
                            >
                              <span className="text-cyan-600 font-bold">✓</span>

                              <span className="leading-tight">{feature}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    {/* Hover Hint */}
                    <div className="absolute bottom-3 left-0 right-0 text-center">
                      <span className="text-[10px] text-slate-400">
                        {isAr
                          ? "مرر الماوس لمعرفة المزيد"
                          : "Hover to learn more"}
                      </span>
                    </div>
                  </div>

                  {/* =========================
                      BACK FACE
                  ========================== */}
                  <div
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      rounded-2xl
                      shadow-xl
                      overflow-hidden
                      [backface-visibility:hidden]
                      [transform:rotateY(180deg)]
                      flex
                      flex-col
                      justify-center
                      items-center
                      text-center
                      p-7
                      bg-[#067492]
                      text-white
                    "
                  >
                    {/* Icon */}
                    <div
                      className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-white/15
                        flex
                        items-center
                        justify-center
                        text-4xl
                        mb-5
                        shadow-sm
                      "
                    >
                      {stage.icon}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-4">
                      {isAr
                        ? `اكتشف ${stage.title_ar}`
                        : `Discover ${stage.title_en}`}
                    </h2>

                    {/* Different Text */}
                    <p className="text-sm leading-7 text-white/90 mb-5">
                      {isAr
                        ? `هذه المرحلة تساعد الطالب على تطوير مهاراته واكتشاف قدراته بشكل تدريجي، مع توفير تجربة تعليمية مناسبة لاحتياجاته وطموحاته.`
                        : `This stage helps students develop their skills and discover their abilities through a supportive learning experience designed around their needs and goals.`}
                    </p>

                    {/* Different Information */}
                    <div className="space-y-2 text-xs text-white/90">
                      <p>
                        {isAr
                          ? "✦ تعلم مستمر وتطور تدريجي"
                          : "✦ Continuous learning and growth"}
                      </p>

                      <p>
                        {isAr
                          ? "✦ بناء المهارات والثقة"
                          : "✦ Building skills and confidence"}
                      </p>

                      <p>
                        {isAr
                          ? "✦ إعداد الطالب للمرحلة التالية"
                          : "✦ Preparing students for the next stage"}
                      </p>
                    </div>

                    {/* Back Hint */}
                    <div className="absolute bottom-3 left-0 right-0">
                      <span className="text-[10px] text-white/60">
                        {isAr ? "مرر الماوس للخلف" : "Move away to return"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="max-w-6xl mx-auto text-center">
        <Link
          href="/school-activities"
          className="
            inline-flex
            items-center
            gap-2
            bg-[#067492]
            hover:bg-[#055d75]
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            text-xs
            transition-colors
            shadow-sm
          "
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
