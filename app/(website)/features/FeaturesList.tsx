"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

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

  // حالة للتحكم في عرض كل الكروت أو الاكتفاء بـ 6 فقط
  const [showAll, setShowAll] = useState(false);

  // حالات التحكم في النصوص المفتوحة داخل الكروت (Expanded Cards)
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/features")
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
    return (
      <div className="text-center p-12 text-cyan-600 font-bold">
        جاري تحميل الميزات...
      </div>
    );
  if (error)
    return (
      <div className="text-center p-12 text-red-500 font-bold">
        حدث خطأ: {error}
      </div>
    );
  if (features.length === 0)
    return (
      <div className="text-center p-12 text-gray-500">
        لا توجد ميزات مسجلة في قاعدة البيانات.
      </div>
    );

  const isRtl = language === "ar";

  // دالة تبديل زر عرض المزيد / عرض أقل للكروت الرئيسية
  const toggleShowAllCards = () => {
    setShowAll((prev) => !prev);
  };

  // دالة لتبديل حالة النص داخل الكارد الواحد
  const toggleCardExpand = (id: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // عرض أول 6 كروت إذا لم يتم الضغط على عرض المزيد، أو عرض الكل إذا تم الضغط
  const displayedFeatures = showAll ? features : features.slice(0, 6);

  return (
    <section
      className="py-24 px-4 md:px-12 bg-gray-50/50"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* رأس السيكشن */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs md:text-sm font-extrabold tracking-wide border border-cyan-200">
            {isRtl
              ? "مميزات Pioneers E-School ERP"
              : "Pioneers E-School ERP Features"}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f3b4c] mb-6 tracking-tight">
            {isRtl
              ? "نظام متكامل لإدارة مؤسستك التعليمية"
              : "Comprehensive System for Your Educational Institution"}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {isRtl
              ? "استعرض كافة الوحدات والأدوات الذكية التي صُممت خصيصاً لأتمتة وتطوير العمليات المدرسية."
              : "Explore all modules and smart tools designed specifically to automate and enhance school operations."}
          </p>
        </div>

        {/* شبكة الكروت (متساوية في الطول والعرض، مع أنيميشن هادئ وشادو خفيف جداً) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedFeatures.map((feature) => {
            const title = isRtl ? feature.title_ar : feature.title_en;
            const description = isRtl
              ? feature.description_ar
              : feature.description_en;

            const descriptionItems = description
              .split("\n")
              .map((item) => item.trim())
              .filter((item) => item.length > 0);

            const isExpanded = !!expandedCards[feature.id];

            return (
              <div
                key={feature.id}
                className="bg-white rounded-[2rem] p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-2px_rgba(0,0,0,0.025)] border border-gray-100/80 flex flex-col justify-between h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                      ERP Module
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-[#0f3b4c] mb-4 leading-snug">
                    {title}
                  </h3>

                  {/* الوصف مع تحكم في الطول */}
                  <div
                    className={`text-gray-600 text-sm md:text-base leading-relaxed transition-all duration-300 ${
                      isExpanded ? "" : "line-clamp-3"
                    }`}
                  >
                    <ul className="flex flex-col gap-2">
                      {descriptionItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-500 font-bold mt-1">
                            ▪
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* زر "عرض المزيد" الخاص بالكارد الداخلي */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleCardExpand(feature.id)}
                    className="text-xs md:text-sm font-extrabold text-cyan-600 hover:text-cyan-800 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>
                      {isExpanded
                        ? isRtl
                          ? "عرض أقل"
                          : "Show Less"
                        : isRtl
                          ? "عرض المزيد"
                          : "Read More"}
                    </span>
                    <span
                      className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    >
                      ↓
                    </span>
                  </button>
                  <span className="text-xs text-gray-400 font-semibold">
                    Pioneers E-School
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* زر "عرض المزيد" أو "عرض أقل" الرئيسي لإظهار/إخفاء باقي الكروت */}
        {features.length > 6 && (
          <div className="mt-16 text-center">
            <button
              onClick={toggleShowAllCards}
              className="px-10 py-4 rounded-2xl bg-[#0f3b4c] hover:bg-cyan-600 text-white font-black text-base shadow-[0_4px_20px_rgba(15,59,76,0.15)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              {showAll
                ? isRtl
                  ? "عرض أقل من المميزات"
                  : "Show Less Features"
                : isRtl
                  ? "عرض المزيد من المميزات"
                  : "Show More Features"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
