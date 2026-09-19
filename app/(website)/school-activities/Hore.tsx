"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  Users,
  BookOpen,
  Compass,
  Award,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
// تأكد من مسار المكون أو ادمجه هنا مباشرة

export default function SchoolActivitiesPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <main
      className="w-full min-h-screen bg-white text-slate-900 font-sans"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Hero ضخم جداً بنصوص مطولة وتفصيلية */}
      <section className="bg-gradient-to-br from-[#055169] via-[#067492] to-[#0891b2] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl text-center text-white">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <Users size={48} className="text-white" />
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-cyan-200 mb-6 border border-white/10">
            {isAr
              ? "دليل الأنشطة التربوية والبدنية الشامل"
              : "Comprehensive Educational & Physical Activities Guide"}
          </span>

          <h1 className="mb-8 text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1]">
            {isAr
              ? "استكشاف الأنشطة المدرسية وآفاق التميز"
              : "Explore School Activities & Horizons of Excellence"}
          </h1>

          <div className="space-y-6 text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-4xl mx-auto font-normal">
            <p>
              {isAr
                ? "نؤمن تماماً بأن بناء الشخصية السوية والمتكاملة للطلاب لا يقتصر فقط على التحصيل الدراسي الأكاديمي داخل الغرف الصفية، بل يمتد ليعانق ساحات الميدان الرياضي، ومختبرات الابتكار، والأنشطة اللامنهجية التي تصقل القدرات الذهنية والنفسية."
                : "We firmly believe that building a well-rounded student personality is not limited to academic achievement inside classrooms, but extends to sports fields, innovation labs, and extracurricular activities."}
            </p>
            <p>
              {isAr
                ? "من خلال بيئة تعليمية وتربوية مدروسة بعناية، نتيحة لكل طالب الفرصة الحقيقية لاكتشاف مواهبه الكامنة، وتنمية مهاراته القيادية والعمل الجماعي، وتحمل المسؤولية في بيئة آمنة، محفزة، ومعتمدة بأعلى معايير الانضباط والجودة."
                : "Through a carefully planned educational and nurturing environment, we provide every student with the real opportunity to discover hidden talents, develop leadership skills, and foster teamwork in a safe, motivating setting."}
            </p>
            <p>
              {isAr
                ? "إن برامجنا الرياضية والثقافية مصممة خصيصاً لتواكب أحدث المعايير العالمية في تطوير اللياقة البدنية، تعزيز التركيز والانضباط الذهني، وخلق جيل قادر على مواجهة تحديات المستقبل بثقة وكفاءة عالية لا تتهتز."
                : "Our sports and cultural programs are specifically designed to meet the latest global standards in developing physical fitness, enhancing focus and mental discipline, and creating a generation capable of facing future challenges."}
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section المفصولة بالكامل */}
    </main>
  );
}
