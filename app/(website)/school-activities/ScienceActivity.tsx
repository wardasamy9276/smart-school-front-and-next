"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  Trophy,
  Dumbbell,
  Waves,
  Target,
  Bike,
  ArrowUpRight,
} from "lucide-react";

const disciplines = [
  {
    num: "01",
    icon: Trophy,
    titleAr: "كرة القدم التنافسية",
    titleEn: "Competitive Football",
    descAr:
      "تطوير مهارات العمل الجماعي، اللياقة البدنية والسرعة والتكتيكات الجماعية.",
    descEn:
      "Developing teamwork skills, physical fitness, speed, and collective tactics.",
  },
  {
    num: "02",
    icon: Waves,
    titleAr: "السباحة والرياضات المائية",
    titleEn: "Swimming & Aquatic Sports",
    descAr:
      "بناء القوة والمرونة وتعزيز التركيز والانضباط النفسي داخل بيئة مائية آمنة.",
    descEn:
      "Building strength, flexibility, and enhancing focus in a safe aquatic environment.",
  },
  {
    num: "03",
    icon: Target,
    titleAr: "تدريبات الرماية والتركيز",
    titleEn: "Archery & Focus Training",
    descAr:
      "صقل مهارات الدقة العالية، التحكم التام بالحركة، والصبر واتخاذ القرار.",
    descEn:
      "Honing high precision, total motor control, patience, and decision-making.",
  },
  {
    num: "04",
    icon: Dumbbell,
    titleAr: "اللياقة البدنية والصحة",
    titleEn: "Fitness & Health",
    descAr: "تمارين التحمل، تعزيز المرونة وتبني أسلوب حياة نشط وصحي منذ الصغر.",
    descEn:
      "Endurance exercises, flexibility enhancement, and healthy lifestyle habits.",
  },
];

export default function SportsBentoAccordion() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="w-full bg-[#030712] py-28 text-white font-sans"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* عنوان رئيسي بسيط وفاخر بعيد عن الأشكال التقليدية */}
        <div className="mb-16 border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] block mb-2">
              {isAr ? "مجالات النشاط الرياضي" : "SPORTS DISCIPLINES"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              {isAr
                ? "مسارات الأداء والتدريب المعتمدة"
                : "Accredited Performance & Training Tracks"}
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-md">
            {isAr
              ? "تصميم هيكلي يعرض البرامج الرياضية بأسلوب قروء، مباشر ومنظم دون أي عناصر بصرية مزدحمة."
              : "A structural design displaying sports programs in a direct, readable, and organized format."}
          </p>
        </div>

        {/* تصميم القائمة المجدولة الخطية (Structured Table / Row Layout - بدون كروت نهائياً) */}
        <div className="w-full divide-y divide-slate-800 border-t border-b border-slate-800">
          {disciplines.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative grid grid-cols-1 lg:grid-cols-12 items-center py-8 px-4 sm:px-8 transition-colors duration-300 hover:bg-slate-900/60"
              >
                {/* الرقم والأيقونة */}
                <div className="lg:col-span-3 flex items-center gap-6 mb-4 lg:mb-0">
                  <span className="text-2xl font-mono font-bold text-slate-600 group-hover:text-[#38bdf8] transition-colors">
                    {item.num}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-[#38bdf8] group-hover:bg-[#067492] group-hover:text-white transition-all">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors lg:hidden">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                </div>

                {/* العنوان للشاشات الكبيرة */}
                <div className="lg:col-span-4 hidden lg:block">
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                </div>

                {/* الوصف */}
                <div className="lg:col-span-4 text-slate-400 text-sm md:text-base leading-relaxed">
                  {isAr ? item.descAr : item.descEn}
                </div>

                {/* زر أو أيقونة التوجيه */}
                <div className="lg:col-span-1 flex justify-end mt-4 lg:mt-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:bg-[#067492] group-hover:text-white group-hover:border-[#067492] transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
