"use client";

import { useLanguage } from "@/context/LanguageContext";
import React, { useEffect, useState } from "react";

interface StudentActivity {
  id?: number;
  icon: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
}

export default function ActivitiesPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [activities, setActivities] = useState<StudentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
          }/api/student-activities`,
        );
        if (res.ok) {
          const data = await res.json();
          setActivities(data);
        }
      } catch (err) {
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <section className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-16">
        <div className="text-center mb-12">
          <span className="text-cyan-700 text-sm font-semibold tracking-wider uppercase">
            {isAr ? "بناء الشخصية المتكاملة" : "Holistic Development"}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">
            {isAr ? "الأنشطة المدرسية واللاصفية" : "Extracurricular Activities"}
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mt-3">
            {isAr
              ? "نؤمن بأن التعلم لا يقتصر على قاعات الدراسة، لذلك نوفر بيئة أنشطة متكاملة تساعد الطالب على صقل مهاراته واكتشاف مواهبه."
              : "We believe learning extends beyond classrooms, offering an enriched activity environment to uncover every student's potential."}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            {isAr ? "جاري التحميل..." : "Loading..."}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-cyan-50/50 border border-gray-100 hover:border-cyan-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl mb-4">
                  {act.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {isAr ? act.title_ar : act.title_en}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isAr ? act.desc_ar : act.desc_en}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
