//"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Dumbbell,
  Flame,
  Zap,
  Award,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Clock,
} from "lucide-react";

const trainingFlows = [
  {
    step: "01",
    titleAr: "مرحلة الإحماء العصبي والحركي",
    titleEn: "Neuromotor Warm-Up Phase",
    timeAr: "١٥ دقيقة",
    timeEn: "15 Mins",
    intensityAr: "منخفضة إلى متوسطة",
    intensityEn: "Low to Medium",
    descAr:
      "تهيئة العضلات والجهاز العصبي، وتحسين تدفق الدم وزيادة مدى الحركة قبل البدء بالتمارين المكثفة.",
    descEn:
      "Preparing muscles and nervous system, enhancing blood flow, and increasing range of motion.",
  },
  {
    step: "02",
    titleAr: "التدريب التكتيكي وتطوير المهارات",
    titleEn: "Tactical & Skill Development",
    timeAr: "٤٥ دقيقة",
    timeEn: "45 Mins",
    intensityAr: "عالية الكثافة",
    intensityEn: "High Intensity",
    descAr:
      "التطبيق العملي للخطط الرياضية، التدريب الجماعي، وتنمية سرعة الاستجابة والتنسيق الحركي.",
    descEn:
      "Practical application of sports strategies, team training, and developing reaction speed.",
  },
  {
    step: "03",
    titleAr: "التهدئة واستعادة العافية البدنية",
    titleEn: "Cool-Down & Physical Recovery",
    timeAr: "١٥ دقيقة",
    timeEn: "15 Mins",
    intensityAr: "استرخائية",
    intensityEn: "Relaxation",
    descAr:
      "تمارين الإطالة العميقة، تنظيم التنفس، وإعادة معدل ضربات القلب إلى وضعه الطبيعي بنجاح.",
    descEn:
      "Deep stretching exercises, breathing control, and returning heart rate to normal.",
  },
];

export default function SportsTimelineFlow() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [activeStep, setActiveStep] = useState(0);

  const currentItem = trainingFlows[activeStep];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative w-full bg-[#020617] py-28 text-white overflow-hidden font-sans"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        {/* ترويسة المسار الزمني */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#067492]/10 px-4 py-1.5 text-xs font-bold text-[#38bdf8] border border-[#067492]/30 mb-4">
            <Zap size={14} />
            <span>{isAr ? "دورة التدريب اليومية" : "Daily Training Flow"}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            {isAr
              ? "كيف تسير الجلسة التدريبية لطلابنا؟"
              : "How is a Student Training Session Structured?"}
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            {isAr
              ? "نتبع منهجية علمية دقيقة ومتسلسلة لضمان تحقيق الاستفادة القصوى وبناء قدرات بدنية مستدامة."
              : "We follow a precise sequential methodology to ensure maximum benefit and sustainable physical abilities."}
          </p>
        </div>

        {/* تصميم المسار التدريبي الخطي (Timeline Flow - بعيداً عن الكروت تماماً) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* الجانب الأيمن / الأيسر: أزرار التنقل بين المراحل كشريط تفاعلي */}
          <div className="lg:col-span-5 space-y-4">
            {trainingFlows.map((flow, index) => {
              const isActive = index === activeStep;
              return (
                <div
                  key={flow.step}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer group flex items-center justify-between p-6 rounded-2xl transition-all duration-300 border ${
                    isActive
                      ? "bg-[#067492]/20 border-[#067492] text-white shadow-lg shadow-[#067492]/10 scale-[1.02]"
                      : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`text-xl font-black font-mono transition-colors ${isActive ? "text-[#38bdf8]" : "text-slate-600 group-hover:text-slate-400"}`}
                    >
                      {flow.step}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">
                        {isAr ? flow.titleAr : flow.titleEn}
                      </h4>
                      <span className="text-xs text-slate-400 flex items-center gap-2">
                        <Clock size={12} />
                        <span>{isAr ? flow.timeAr : flow.timeEn}</span>
                      </span>
                    </div>
                  </div>
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${isActive ? "bg-[#067492] text-white" : "bg-slate-800 text-slate-500"}`}
                  >
                    {isAr ? (
                      <ChevronLeft size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* الجانب الآخر: لوحة العرض التفاعلية للمرحلة المختارة */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-[36px] p-8 md:p-12 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 end-0 h-40 w-40 rounded-full bg-[#067492]/10 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
              <span className="text-sm font-mono text-[#38bdf8] uppercase tracking-wider">
                PHASE // {currentItem.step}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3.5 py-1 text-xs font-semibold text-amber-400">
                <Flame size={14} />
                {isAr ? currentItem.intensityAr : currentItem.intensityEn}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
              {isAr ? currentItem.titleAr : currentItem.titleEn}
            </h3>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10">
              {isAr ? currentItem.descAr : currentItem.descEn}
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-800 text-xs text-slate-400">
              <ShieldCheck className="text-emerald-400" size={18} />
              <span>
                {isAr
                  ? "مطبق بعناية تحت إشراف الجهاز الفني الرياضي"
                  : "Supervised carefully by the professional training staff"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
