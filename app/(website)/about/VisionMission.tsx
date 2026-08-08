"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Item {
  image: string;
  title: string;
  description: string;
  details: string;
  btnText: string;
}

export default function VisionMission() {
  const { language } = useLanguage() as { language: "ar" | "en" };
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const activeItem = activeCardIndex !== null ? items[activeCardIndex] : null;

  useEffect(() => {
    setActiveCardIndex(null);
    setLoading(true);

    fetch(`http://127.0.0.1:8000/api/vision-mission?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.items)) {
          setItems(data.items.slice(0, 8));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch vision missions:", err);
        setLoading(false);
      });
  }, [language]);

  if (loading) {
    return (
      <div className="text-center py-24 text-white text-lg font-medium">
        {language === "ar" ? "جاري التحميل..." : "Loading..."}
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-slate-950">
      <style jsx>{`
        @keyframes rotate-border {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .border-animation {
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 280deg,
            #38bdf8 360deg
          );
          animation: rotate-border 3s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* شبكة الكروت مع تحسين التجاوب */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative group p-[2px] rounded-[2rem] overflow-hidden bg-white/5 transition-transform hover:scale-[1.02] sm:hover:scale-105 duration-500 flex flex-col h-[280px]"
            >
              {/* إزالة التحقق من الهوفر ليعمل الدوران بشكل مستمر */}
              <div className="border-animation pointer-events-none"></div>

              {/* محتوى الكارت الداخلي */}
              <div className="relative bg-[#000b18] hover:bg-[#07111e] rounded-[1.9rem] h-[calc(100%-4px)] m-[2px] flex flex-col z-10 transition-colors duration-300 shadow-xl overflow-hidden">
                {/* الصورة تأخذ نصف الكارت العلوي */}
                <div className="w-full h-1/2 overflow-hidden border-b border-[#38bdf8]/20 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* المحتوى في النصف السفلي متمركز في المنتصف مع حشو مناسب للشاشات الصغيرة */}
                <div className="h-1/2 px-3 py-2 sm:p-3 flex flex-col items-center justify-between text-center">
                  <div className="w-full">
                    <h3 className="text-white font-extrabold mb-1 text-xs sm:text-sm tracking-wide truncate">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveCardIndex(index)}
                    className="w-full py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-black text-[10px] sm:text-[11px] rounded-lg transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    {item.btnText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* عرض التفاصيل الكاملة متجاوب مع الشاشات الصغيرة */}
        {activeItem && (
          <div className="mt-10 sm:mt-14 bg-[#07111e] border-2 border-[#38bdf8]/60 p-6 sm:p-8 md:p-12 rounded-3xl relative animate-fadeIn shadow-[0_0_50px_rgba(6,182,212,0.15)] text-white">
            <button
              onClick={() => setActiveCardIndex(null)}
              className={`absolute top-4 sm:top-6 ${
                language === "ar" ? "left-4 sm:left-6" : "right-4 sm:right-6"
              } p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-full transition-all cursor-pointer shadow-md z-20`}
              aria-label="Close details"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-center">
              <div className="flex-1 space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#38bdf8] tracking-wide">
                  {activeItem.title}
                </h3>
                <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose text-justify pt-1 sm:pt-2 font-normal">
                  {activeItem.details}
                </p>
              </div>
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-[#38bdf8]/30 shadow-2xl flex-shrink-0">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-56 sm:h-72 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
