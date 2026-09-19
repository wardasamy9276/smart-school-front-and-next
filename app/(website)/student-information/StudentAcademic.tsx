"use client";

import { useLanguage } from "@/context/LanguageContext";
import { School } from "lucide-react";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

export default function SchoolsMarqueeSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const schoolsList = [
    isArabic
      ? "مجمع المدارس الذكية - الفرع الرئيسي"
      : "Smart Schools Complex - Main Branch",

    isArabic
      ? "مدرسة سمارت للغات - فرع القاهرة"
      : "Smart Language School - Cairo Branch",

    isArabic
      ? "مدرسة سمارت الدولية المتكاملة"
      : "Smart Integrated International School",

    isArabic
      ? "مدارس سمارت التجريبية المتميزة"
      : "Smart Distinguished Experimental Schools",

    isArabic ? "معهد سمارت النموذجي الأزهري" : "Smart Model Al-Azhar Institute",

    isArabic ? "مدرسة سمارت الخاصة للبنات" : "Smart Private Girls School",

    isArabic ? "مدرسة سمارت الخاصة للبنين" : "Smart Private Boys School",

    isArabic ? "مجمع سمارت للتعليم الأساسي" : "Smart Basic Education Complex",

    isArabic
      ? "مدارس سمارت لغات (فرع الجيزة)"
      : "Smart Language Schools (Giza Branch)",

    isArabic ? "مدرسة سمارت الخاصة للتمريض" : "Smart Private Nursing School",

    isArabic
      ? "مدارس سمارت التكنولوجية التطبيقية"
      : "Smart Applied Technology Schools",

    isArabic ? "مجمع سمارت لمدارس المستقبل" : "Smart Future Schools Complex",

    isArabic
      ? "مدرسة سمارت الخاصة (فرع المعادي)"
      : "Smart Private School (Maadi Branch)",

    isArabic
      ? "مدرسة سمارت الرسمية المتميزة للغات"
      : "Smart Official Distinguished Language School",

    isArabic
      ? "مجمع سمارت التربوي المتكامل"
      : "Smart Integrated Educational Complex",

    isArabic
      ? "مدارس سمارت لغات (فرع التجمع الخامس)"
      : "Smart Language Schools (5th Settlement)",

    isArabic
      ? "مدرسة سمارت الدولية الأمريكية"
      : "Smart American International School",

    isArabic
      ? "مدرسة سمارت الدولية البريطانية"
      : "Smart British International School",

    isArabic
      ? "معهد سمارت الإعدادي الثانوي"
      : "Smart Preparatory & Secondary Institute",

    isArabic
      ? "مدارس سمارت الخاصة (فرع مدينة نصر)"
      : "Smart Private Schools (Nasr City Branch)",

    isArabic
      ? "مجمع سمارت للتعليم الأساسي والمجتمعي"
      : "Smart Basic & Community Education Complex",

    isArabic
      ? "مدرسة سمارت الخاصة (فرع الهرم)"
      : "Smart Private School (Haram Branch)",

    isArabic
      ? "مدارس سمارت لغات (فرع 6 أكتوبر)"
      : "Smart Language Schools (6th of October)",

    isArabic
      ? "مدرسة سمارت المتميزة للغات والعلوم"
      : "Smart Distinguished Language & Science School",

    isArabic
      ? "معهد سمارت الابتدائي النموذجي"
      : "Smart Model Primary Institute",

    isArabic
      ? "مجمع سمارت التعليمي (فرع الشيخ زايد)"
      : "Smart Educational Complex (Sheikh Zayed)",

    isArabic
      ? "مدرسة سمارت الخاصة (فرع الإسكندرية)"
      : "Smart Private School (Alexandria Branch)",

    isArabic ? "مدارس سمارت المتطورة للغات" : "Smart Advanced Language Schools",

    isArabic
      ? "مجمع سمارت لعلوم المستقبل واللغات"
      : "Smart Future Science & Languages Complex",

    isArabic
      ? "مدرسة سمارت النموذجية الشاملة"
      : "Smart Comprehensive Model School",
  ];

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      direction: isArabic ? "rtl" : "ltr",
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 1.2,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="my-8 w-full overflow-hidden border-y 
      border-slate-200 bg-white py-14 shadow-sm"
    >
      {/* العنوان والوصف */}
      <div className="mx-auto mb-10 max-w-3xl px-6 text-center">
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full 
        bg-[#0e7490]/10 px-4 py-1.5 text-xs font-bold text-[#06647d]"
        >
          <School className="h-4 w-4" />

          <span>{isArabic ? "شبكة مجمع سمارت" : "Smart Complex Network"}</span>
        </div>

        <h2 className="text-2xl font-black text-[#06647d] sm:text-3xl">
          {isArabic
            ? "مدارس وفروع مجمع سمارت (30 مدرسة معتمدة)"
            : "Smart Complex Schools & Branches"}
        </h2>

        <p className="mt-2 text-sm text-[#06647d]">
          {isArabic
            ? "نخبة متكاملة من المدارس والمجمعات التعليمية تحت مظلة سمارت لتقديم خدمة تعليمية رائدة."
            : "An integrated elite of schools and educational complexes under the Smart umbrella."}
        </p>
      </div>

      {/* شريط المدارس */}
      <div className="relative w-full overflow-hidden">
        {/* التدرج الأيسر */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />

        {/* التدرج الأيمن */}
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />

        {/* Embla */}
        <div
          ref={emblaRef}
          className="cursor-grab overflow-hidden active:cursor-grabbing"
        >
          <div className="flex items-center gap-6">
            {schoolsList.map((school, index) => (
              <div
                key={`${school}-${index}`}
                className="inline-flex shrink-0 select-none items-center gap-3 rounded-2xl border border-slate-200/80 bg-[#f5f7fb] px-6 py-4 shadow-sm"
              >
                {/* أيقونة المدرسة */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0e7490]/10 text-[#0e7490]">
                  <School className="h-4 w-4" />
                </div>

                {/* اسم المدرسة */}
                <span className="whitespace-nowrap text-sm font-bold text-[#06647d] sm:text-base">
                  {school}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
