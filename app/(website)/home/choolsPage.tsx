"use client";

import { useLanguage } from "@/context/LanguageContext";

const pioneersData = [
  {
    title_ar: "إدارة الحضور والغياب",
    title_en: "Attendance Management",
    description_ar:
      "متابعة حضور وغياب الطلاب وإصدار التقارير اليومية والدورية.",
    description_en:
      "Track student attendance and absence and generate daily and periodic reports.",
  },
  {
    title_ar: "الجداول الدراسية",
    title_en: "Class Schedules",
    description_ar: "إنشاء وتنظيم الجداول الدراسية وتوزيع الحصص بسهولة.",
    description_en:
      "Create and organize class schedules and distribute lessons easily.",
  },
  {
    title_ar: "التقارير والمتابعة",
    title_en: "Reports and Monitoring",
    description_ar: "تقارير مفصلة عن أداء الطلاب يمكن طباعتها أو تصديرها.",
    description_en:
      "Detailed student performance reports that can be printed or exported.",
  },
  {
    title_ar: "الرسائل والتواصل",
    title_en: "Messaging and Communication",
    description_ar: "إرسال رسائل مباشرة للطلاب وأولياء الأمور بسهولة.",
    description_en: "Send messages directly to students and parents easily.",
  },
  {
    title_ar: "الأمان والحماية",
    title_en: "Security and Protection",
    description_ar:
      "حماية البيانات باستخدام أنظمة أمان متقدمة للحفاظ على السرية.",
    description_en:
      "Protect data using advanced security systems to maintain confidentiality.",
  },
  {
    title_ar: "إدارة المستخدمين",
    title_en: "User Management",
    description_ar: "إضافة مستخدمين وتحديد الصلاحيات بسهولة.",
    description_en: "Add users and manage their permissions easily.",
  },
];

export default function PioneersPage() {
  const { language } = useLanguage();

  return (
    <main
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 py-16 px-5"
    >
      <section className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-4xl font-bold text-center text-[#9E7C2F] mb-8">
          Pioneers E-School SMS
        </h1>

        <p className="text-gray-700 text-lg leading-9 mb-8 text-center ">
          {language === "ar"
            ? "نظام متكامل لإدارة المدارس يساعد المؤسسات التعليمية على إدارة العمليات اليومية بسهولة وكفاءة من خلال حلول رقمية حديثة."
            : "An integrated school management system that helps educational institutions manage daily operations easily and efficiently through modern digital solutions."}
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-center">
          {pioneersData.map((item, index) => (
            <div key={index} className="p-5 rounded-xl bg-gray-50">
              <h2 className="font-bold text-xl mb-3">
                {language === "ar" ? item.title_ar : item.title_en}
              </h2>

              <p className="text-gray-600">
                {language === "ar" ? item.description_ar : item.description_en}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
