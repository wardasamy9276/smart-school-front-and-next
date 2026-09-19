"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  Library,
  FileText,
  Trophy,
  CreditCard,
  Users,
  MessageSquare,
  ClipboardList,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";

export default function StudentServicesPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const services = [
    {
      icon: Library,
      ar: "المكتبة الإلكترونية",
      en: "Digital Library",
      descAr: "الوصول إلى الكتب والمراجع والمصادر التعليمية الإلكترونية.",
      descEn: "Access books, references and educational resources.",
      count: "120+",
    },
    {
      icon: FileText,
      ar: "المستندات والملفات",
      en: "Documents & Files",
      descAr: "تحميل ومتابعة المستندات والملفات الخاصة بالطالب.",
      descEn: "Download and manage student documents and files.",
      count: "18",
    },
    {
      icon: Trophy,
      ar: "الأنشطة الطلابية",
      en: "Student Activities",
      descAr: "المسابقات والأنشطة والفعاليات المدرسية.",
      descEn: "Competitions, activities and school events.",
      count: "24",
    },
    {
      icon: CreditCard,
      ar: "المدفوعات والمصروفات",
      en: "Payments & Fees",
      descAr: "متابعة المصروفات والفواتير والمدفوعات.",
      descEn: "Track fees, invoices and payments.",
      count: "6",
    },
    {
      icon: Users,
      ar: "المعلمون",
      en: "Teachers",
      descAr: "التعرف على المعلمين والتواصل معهم.",
      descEn: "View teachers and communicate with them.",
      count: "14",
    },
    {
      icon: MessageSquare,
      ar: "الرسائل والتواصل",
      en: "Messages",
      descAr: "التواصل مع الإدارة والمعلمين بسهولة.",
      descEn: "Communicate with administration and teachers.",
      count: "32",
    },
    {
      icon: ClipboardList,
      ar: "طلبات الخدمات",
      en: "Service Requests",
      descAr: "تقديم ومتابعة طلبات الخدمات الإلكترونية.",
      descEn: "Submit and track electronic service requests.",
      count: "5",
    },
  ];

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 py-16"
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <span className="text-cyan-700 font-bold">
            {isArabic ? "الخدمات الإلكترونية" : "Electronic Services"}
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-4">
            {isArabic ? "خدمات الطالب" : "Student Services"}
          </h1>

          <p className="text-gray-500 text-lg md:text-xl leading-9 mt-6">
            {isArabic
              ? "مجموعة متكاملة من الخدمات الإلكترونية التي يحتاج إليها الطالب وولي الأمر."
              : "A complete collection of electronic services for students and parents."}
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:-translate-y-2 hover:shadow-2xl hover:bg-cyan-950 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center group-hover:bg-white/10">
                    <Icon
                      size={30}
                      className="text-cyan-700 group-hover:text-cyan-300"
                    />
                  </div>

                  <span className="text-2xl font-black text-gray-300 group-hover:text-white/30">
                    {service.count}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-gray-900 group-hover:text-white mt-8">
                  {isArabic ? service.ar : service.en}
                </h2>

                <p className="text-gray-500 group-hover:text-cyan-100 leading-8 mt-4 min-h-[80px]">
                  {isArabic ? service.descAr : service.descEn}
                </p>

                <button className="mt-7 flex items-center gap-3 text-cyan-700 group-hover:text-white font-bold">
                  {isArabic ? "عرض الخدمة" : "View Service"}

                  {isArabic ? (
                    <ArrowUpLeft size={20} />
                  ) : (
                    <ArrowUpRight size={20} />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <section className="mt-14 bg-gradient-to-r from-cyan-950 to-cyan-700 rounded-[2rem] p-8 md:p-12 text-white flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black">
              {isArabic ? "هل تحتاج إلى مساعدة؟" : "Need Help?"}
            </h2>

            <p className="text-cyan-100 text-lg mt-4">
              {isArabic
                ? "يمكنك التواصل مع إدارة المدرسة أو فريق الدعم."
                : "Contact the school administration or support team."}
            </p>
          </div>

          <button className="bg-white text-cyan-900 px-9 py-4 rounded-2xl font-black hover:scale-105 transition">
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </button>
        </section>
      </div>
    </main>
  );
}
