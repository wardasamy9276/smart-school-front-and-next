"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles, CheckCircle2, X } from "lucide-react";
import Typewriter from "typewriter-effect";

const detailedModalData: Record<
  string,
  {
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    featuresAr: string[];
    featuresEn: string[];
  }
> = {
  services: {
    titleAr: "تفاصيل خدمات المنظومة الذكية (ERP & LMS)",
    titleEn: "Smart Ecosystem Services Details (ERP & LMS)",
    descAr:
      "نظام متكامل يربط الإدارة المدرسية، المعلمين، والطلاب ببعضهم عبر منصة واحدة مدعومة بالذكاء الاصطناعي لتسهيل المتابعة الأكاديمية والمالية والإدارية بكل دقة وسلاسة.",
    descEn:
      "An integrated system connecting school administration, teachers, and students through a single AI-powered platform to facilitate academic, financial, and administrative tracking.",
    featuresAr: [
      "إدارة حضور وغياب الطلاب لحظياً مع إشعارات فورية لأولياء الأمور.",
      "نظام متكامل لإدارة الاختبارات الإلكترونية وتصحيحها الآلي.",
      "لوحة تحكم مالية ومحاسبية شاملة للمصروفات والرواتب.",
      "مكتبة رقمية تفاعلية تدعم الفصول الافتراضية المباشرة.",
    ],
    featuresEn: [
      "Real-time student attendance tracking with instant parent alerts.",
      "Integrated electronic exams and automated grading system.",
      "Comprehensive financial dashboard for fees and payroll.",
      "Interactive digital library supporting live virtual classrooms.",
    ],
  },
  demo: {
    titleAr: "طلب عرض توضيحي مباشر (Live Demo)",
    titleEn: "Live Demo Request Details",
    descAr:
      "احصل على جولة تفاعلية مخصصة مع خبرائنا الفنيين لاستعراض كافة مميزات المنصة وتجربة النظام بنفسك بما يناسب احتياجات مجمع مدارسكم.",
    descEn:
      "Get a customized interactive tour with our technical experts to explore all platform features and experience the system yourself.",
    featuresAr: [
      "عرض تجريبي مخصص يوضح كيفية إدارة النظام بالكامل.",
      "جلسة نقاش مفتوحة للإجابة على كافة الاستفسارات الفنية.",
      "استلام تقييم تقني مبدئي لاحتياجات مجمع المدارس.",
      "دعم فني وتوجيه استشاري مجاني لفريق العمل.",
    ],
    featuresEn: [
      "Customized demo showing full system management.",
      "Open Q&A session to answer all technical inquiries.",
      "Initial technical assessment for the school complex.",
      "Free technical support and advisory guidance.",
    ],
  },
};

export default function SmartSchoolsExtendedSections() {
  const { language } = useLanguage() as { language: string };
  const isRtl = language === "ar";
  const [activeModalKey, setActiveModalKey] = useState<string | null>(null);

  const t = {
    tag: isRtl
      ? "المنظومة الرقمية المتكاملة لمجمع مدارس سمارت سكوول"
      : "Integrated Digital Ecosystem for Smart Schools Complex",
    heroTitle: isRtl
      ? "بوابة المستقبل الرقمي لمجمع مدارس"
      : "Gateway to the Digital Future of",
    heroTitleHighlight: "Smart Schools Complex",
    typewriterStrings: [
      isRtl ? "بوابة الواقع التعليمي الذكي" : "Smart Educational Portal",
      isRtl ? "نظام ERP & LMS المتكامل" : "Integrated ERP & LMS System",
      isRtl ? "مستقبل التعليم الرقمي" : "Future of Digital Education",
      isRtl
        ? "المنظومة الذكية لإدارة المدارس"
        : "Smart School Management System",
    ],
    heroDesc: isRtl
      ? "نُقدم لك في مجمع مدارس Smart Schools Complex رؤية تقنية وتعليمية متكاملة ومتقدمة تدمج أحدث أنظمة إدارة التعلم الذكي (LMS) والحلول الإدارية الشاملة (ERP) في منصة رقمية واحدة فائقة الجودة."
      : "At Smart Schools Complex, we provide an integrated and advanced technical and educational vision combining Learning Management Systems (LMS) with administrative solutions (ERP).",
    btnPrimary: isRtl ? "استكشف خدمات المنظومة" : "Explore System Services",
    btnSecondary: isRtl ? "طلب عرض توضيحي" : "Request Demo",
  };

  const activeModalData = activeModalKey
    ? detailedModalData[activeModalKey]
    : null;

  return (
    <div
      className="bg-[#085870] text-white min-h-screen flex flex-col justify-between overflow-x-hidden relative"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* القسم الأول: البطل الرئيسي (Hero Section) */}
      <main className="flex-grow flex flex-col justify-center">
        <section className="relative py-24 px-4 md:px-12 border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="mb-4">
              <span className="text-xl md:text-2xl font-bold text-white tracking-wider uppercase">
                Smart Schools Complex
              </span>
            </div>

            <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium tracking-wide uppercase border border-white/20">
              {t.tag}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {t.heroTitle}{" "}
              <span className="text-white font-bold">
                {t.heroTitleHighlight}
              </span>
              <br />
              <span
                className="inline-block mt-2 text-white font-normal text-xl sm:text-2xl md:text-3xl"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <Typewriter
                  options={{
                    strings: t.typewriterStrings,
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                  }}
                />
              </span>
            </h1>

            <p className="text-white text-sm md:text-base max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              {t.heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setActiveModalKey("services")}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-[#03141c] hover:bg-gray-200 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {t.btnPrimary} <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveModalKey("demo")}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-transparent hover:bg-white/10 text-white font-medium text-sm border border-white/30 transition-all duration-300 cursor-pointer"
              >
                {t.btnSecondary}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* القسم الثاني: الرؤية الاستراتيجية والأهداف التعليمية (Vision & Goals) */}
      <section className="py-20 px-6 md:px-12 bg-[#06475c] border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-200 block mb-2">
              {isRtl ? "الفلسفة المؤسسية" : "Institutional Philosophy"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {isRtl
                ? "رؤيتنا نحو مستقبل تعليمي مستدام"
                : "Our Vision for a Sustainable Educational Future"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-white/90 text-base leading-relaxed">
              <p>
                {isRtl
                  ? "نسعى في مجمع مدارس سمارت سكوول إلى إعادة صياغة مفهوم التعليم التقليدي وتحويله إلى تجربة رقمية تفاعلية تلهم العقول وتنمي مهارات التفكير النقدي لدى الطلاب."
                  : "At Smart Schools Complex, we strive to redefine traditional education into an interactive digital experience that inspires minds and fosters critical thinking skills."}
              </p>
              <p>
                {isRtl
                  ? "نعتمد على بنية تحتية رقمية متطورة تضمن استمرارية العملية التعليمية بأعلى كفاءة ممكنة، مع توفير تقارير تحليلية دقيقة تساعد الإدارة في اتخاذ القرار السليم."
                  : "We rely on an advanced digital infrastructure that ensures the continuity of the educational process with maximum efficiency and precise analytical reports."}
              </p>
            </div>
            <div className="bg-[#053849] p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">
                {isRtl
                  ? "ركائز التطوير المستمر"
                  : "Pillars of Continuous Development"}
              </h3>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                <span>
                  {isRtl
                    ? "جودة الأداء الأكاديمي والإداري"
                    : "Academic & Administrative Quality"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                <span>
                  {isRtl
                    ? "الربط الفوري بين المدرسة ولي الأمر"
                    : "Instant School-Parent Connectivity"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                <span>
                  {isRtl
                    ? "أمان البيانات والسرية التامة"
                    : "Data Security & Absolute Confidentiality"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* القسم الثالث: الهيكل الإداري والأكاديمي (Administrative & Academic Structure) */}
      <section className="py-20 px-6 md:px-12 bg-[#053d4f] border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-200 block mb-2">
            {isRtl ? "الهيكل التنظيمي" : "Organizational Structure"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {isArTitleCheck(
              isRtl,
              "تكامل المنظومة بين الإدارة والصفوف",
              "Ecosystem Integration Between Admin & Classes",
            )}
          </h2>
          <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto mb-14 leading-relaxed">
            {isRtl
              ? "صُممت المنظومة لتخدم كافة الأطراف داخل المجمع بمرونة تامة، بدءاً من الإدارة العليا مروراً بالمعلمين ووصولاً إلى أولياء الأمور والطلاب."
              : "The system is designed to serve all parties within the complex with absolute flexibility, from senior management down to teachers, parents, and students."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#042d3c] border border-white/10 text-start">
              <h4 className="text-xl font-bold text-white mb-3">
                {isRtl ? "الإدارة العليا والمالية" : "Executive & Finance"}
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">
                {isRtl
                  ? "متابعة التقارير المالية والمصروفات وحركة الحسابات بكل دقة وأمان."
                  : "Monitoring financial reports, expenses, and accounts with precision."}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#042d3c] border border-white/10 text-start">
              <h4 className="text-xl font-bold text-white mb-3">
                {isRtl ? "الهيئة التدريسية" : "Teaching Staff"}
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">
                {isRtl
                  ? "إدارة الفصول، رصد الدرجات، وتقييم مستويات الطلاب الذكية بصورة فورية."
                  : "Managing classes, recording grades, and evaluating student levels instantly."}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#042d3c] border border-white/10 text-start">
              <h4 className="text-xl font-bold text-white mb-3">
                {isRtl ? "أولياء الأمور والطلاب" : "Parents & Students"}
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">
                {isRtl
                  ? "متابعة الحضور، الواجبات المدرسية، والتواصل المستمر مع المدرسة."
                  : "Tracking attendance, homework, and continuous communication with the school."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* القسم الرابع: إحصائيات وأرقام المنظومة (Ecosystem Metrics & Stats) */}
      <section className="py-16 px-6 md:px-12 bg-[#043342] border-b border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-4xl sm:text-5xl font-black text-white mb-2">
              ١٠٠٪
            </span>
            <span className="text-xs sm:text-sm text-white/80">
              {isRtl ? "أنظمة رقمية مؤمنة" : "Secured Systems"}
            </span>
          </div>
          <div>
            <span className="block text-4xl sm:text-5xl font-black text-white mb-2">
              ٢٤/٧
            </span>
            <span className="text-xs sm:text-sm text-white/80">
              {isRtl ? "دعم فني واستجابة" : "Support & Response"}
            </span>
          </div>
          <div>
            <span className="block text-4xl sm:text-5xl font-black text-white mb-2">
              ERP
            </span>
            <span className="text-xs sm:text-sm text-white/80">
              {isRtl ? "إدارة إدارية شاملة" : "Administrative Management"}
            </span>
          </div>
          <div>
            <span className="block text-4xl sm:text-5xl font-black text-white mb-2">
              LMS
            </span>
            <span className="text-xs sm:text-sm text-white/80">
              {isRtl ? "تعلم ذكي تفاعلي" : "Interactive Smart Learning"}
            </span>
          </div>
        </div>
      </section>

      {/* القسم الخامس: ختام وتأكيد التميز المؤسسي (Institutional Excellence Statement) */}
      <section className="py-20 px-6 md:px-12 bg-[#032936] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {isRtl
              ? "ابدأ رحلة التحول الرقمي لمجمع مدارسكم اليوم"
              : "Start Your School Complex Digital Transformation Today"}
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            {isRtl
              ? "نحن نضع بين أيديكم خبرات متراكمة وحلولاً تكنولوجية متقدمة تضمن لكم الريادة والتفوق المستمر في قطاع التعليم الحديث."
              : "We place accumulated expertise and advanced technological solutions in your hands to ensure your continuous leadership in modern education."}
          </p>
          <div className="pt-4">
            <button
              onClick={() => setActiveModalKey("demo")}
              className="px-8 py-3 rounded-full bg-white text-[#03141c] hover:bg-gray-200 font-semibold text-sm transition-all shadow-md cursor-pointer"
            >
              {isRtl
                ? "تواصل معنا لحجز نسختك"
                : "Contact Us to Reserve Your Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* نافذة التفاصيل المنبثقة (Modal Card View) */}
      {activeModalKey && activeModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#03141c] border border-[#0e7490] rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
            <button
              onClick={() => setActiveModalKey(null)}
              className="absolute top-6 end-6 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e7490]/30 text-cyan-300 text-xs font-semibold mb-4 border border-[#0e7490]/50">
              <Sparkles size={14} />
              <span>Smart Schools Ecosystem Details</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">
              {isRtl ? activeModalData.titleAr : activeModalData.titleEn}
            </h3>

            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {isRtl ? activeModalData.descAr : activeModalData.descEn}
            </p>

            <div className="space-y-3 mb-8 bg-black/30 p-6 rounded-2xl border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block mb-2">
                {isRtl
                  ? "المميزات والخصائص الرئيسية:"
                  : "Key Features & Capabilities:"}
              </span>
              {(isRtl
                ? activeModalData.featuresAr
                : activeModalData.featuresEn
              ).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-sm text-slate-200"
                >
                  <CheckCircle2
                    size={18}
                    className="text-cyan-300 shrink-0 mt-0.5"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalKey(null)}
                className="px-6 py-2.5 rounded-xl bg-[#0e7490] hover:bg-[#085870] text-white font-semibold text-sm transition-all cursor-pointer"
              >
                {isRtl ? "إغلاق النافذة" : "Close Window"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function isArTitleCheck(isRtl: boolean, arText: string, enText: string) {
  return isRtl ? arText : enText;
}
