"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext"; // عدل المسار حسب مجلد المشروع لديك

interface Feature {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
}

export default function FeaturesList() {
  const { language } = useLanguage();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/features")
      // php artisan db:seed --class=FeatureSeeder ///////
      .then((res) => {
        if (!res.ok) throw new Error("تعذر جلب الميزات من السيرفر");
        return res.json();
      })
      .then((data) => {
        setFeatures(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center p-8">جاري تحميل الميزات...</div>;
  if (error)
    return <div className="text-center p-8 text-red-500">حدث خطأ: {error}</div>;
  if (features.length === 0)
    return (
      <div className="text-center p-8">
        لا توجد ميزات مسجلة في قاعدة البيانات.
      </div>
    );

  const isRtl = language === "ar";

  return (
    <div className="flex flex-col gap-6 p-6 w-full" dir={isRtl ? "rtl" : "ltr"}>
      {features.map((feature) => {
        const title = isRtl ? feature.title_ar : feature.title_en;
        const description = isRtl
          ? feature.description_ar
          : feature.description_en;

        // تحويل نص الوصف الممتد إلى نقاط قائمة (List Items)
        const descriptionItems = description
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0);

        return (
          <div
            key={feature.id}
            className="flex flex-col items-center md:items-start w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center md:text-start"
          >
            <h2 className="text-xl md:text-2xl font-bold text-cyan-700 mb-4 w-full">
              {title}
            </h2>

            <ul className="flex flex-col gap-2 w-full text-gray-800 text-base md:text-lg leading-relaxed">
              {descriptionItems.map((item, idx) => (
                <li key={idx} className="w-full text-center md:text-start">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
