"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Typewriter from "typewriter-effect";

export default function SmartFeaturesHub() {
  const { language } = useLanguage() as { language: string };
  const [activeRole, setActiveRole] = useState(0);

  const content = {
    ar: {
      tag: "مميزات Smart Schools Complex",
      title:
        "منظومة تقنية متكاملة صُممت لتلبي احتياجات كل طرف في بيئتك المدرسية",
      description:
        "اكتشف الأدوات والمميزات المتقدمة التي تقدمها منصتنا لإدارة المدارس بكفاءة واحترافية عالية في مصر والوطن العربي.",
      roles: [
        {
          title: "الإدارة المدرسية",
          badge: "التحكم الشامل ERP",
          desc: "إدارة كاملة لشؤون المدرسة والطلاب والموظفين من لوحة تحكم واحدة وسهلة.",
          features: [
            "تعديل محتوى الموقع والموقع الإلكتروني لحظياً",
            "نظام التقديم والقبول الإلكتروني للطلاب الجدد",
            "متابعة التقارير الإدارية والمالية بدقة تامة",
            "إدارة شؤون الموظفين والخطط المدرسية",
          ],
        },
        {
          title: "المعلم (LMS)",
          badge: "أدوات التدريس الذكي",
          desc: "كل ما يحتاجه المعلم لتقديم محتوى تعليمي تفاعلي وفعّال لطلابه.",
          features: [
            "إنشاء الفصول الذكية والبث المباشر",
            "تصميم الاختبارات والواجبات الإلكترونية",
            "رفع الفيديوهات والمرفقات والتحضيرات",
            "ترصيد النتائج الشهرية والتقييمات بكل سهولة",
          ],
        },
        {
          title: "الطالب",
          badge: "بوابة التعلم الشخصية",
          desc: "بيئة رقمية ممتعة تدعم الطالب في دراسته وتواصله المستمر.",
          features: [
            "مخزن شخصي للمستندات والفيديوهات التعليمية",
            "استعراض الجداول والواجبات والنتائج فوراً",
            "التواصل الآمن والمباشر مع المعلمين والزملاء",
            "المشاركة في الفصول الذكية والاختبارات",
          ],
        },
        {
          title: "ولي الأمر",
          badge: "المتابعة والاطمئنان",
          desc: "شراكة حقيقية ومتابعة لحظية ومستمرة لمسيرة الأبناء التعليمية والمالية.",
          features: [
            "متابعة فورية للحضور والغياب والتقييمات",
            "الاطلاع على كشوف الحسابات المالية والأقساط",
            "إمكانية طباعة المطالبات المالية بكل مرونة",
            "متابعة الخطط الأسبوعية وجداول الحصص",
          ],
        },
      ],
      supportBadge: "خدمة أكثر من 500 مدرسة في مصر والوطن العربي",
    },
    en: {
      tag: "Smart Schools Complex Features",
      title: "An Integrated Tech Ecosystem Designed for Every Stakeholder",
      description:
        "Discover the advanced tools and features our platform provides to manage schools efficiently across Egypt and the Arab world.",
      roles: [
        {
          title: "School Administration",
          badge: "Comprehensive ERP Control",
          desc: "Complete management of school affairs, students, and staff from a single, intuitive dashboard.",
          features: [
            "Instant website content and page management",
            "Online admission and new student registration",
            "Precise tracking of administrative & financial reports",
            "Staff affairs and school schedule management",
          ],
        },
        {
          title: "Teacher (LMS)",
          badge: "Smart Teaching Tools",
          desc: "Everything a teacher needs to deliver interactive and effective educational content.",
          features: [
            "Create smart classes and live streaming",
            "Design online exams and homework assignments",
            "Upload videos, attachments, and lesson plans",
            "Record monthly results and evaluations with ease",
          ],
        },
        {
          title: "Student",
          badge: "Personal Learning Portal",
          desc: "An engaging digital environment supporting students in their studies and continuous communication.",
          features: [
            "Personal vault for documents and educational videos",
            "Review schedules, homework, and results instantly",
            "Secure and direct communication with teachers & peers",
            "Participation in smart classes and online tests",
          ],
        },
        {
          title: "Parent",
          badge: "Monitoring & Peace of Mind",
          desc: "A true partnership and real-time follow-up of children's academic and financial journey.",
          features: [
            "Instant tracking of attendance, absence, and evaluations",
            "View financial account statements and installments",
            "Ability to print financial demands flexibly",
            "Monitor weekly plans and class timetables",
          ],
        },
      ],
      supportBadge: "Serving over 500 schools in Egypt and the Arab world",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const currentRole = t.roles[activeRole];

  return (
    <section
      className="py-24 px-4 md:px-12 bg-[#0e495b] relative overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* خلفية ضوئية جمالية */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* رأس السيكشن */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-block mb-4 px-4 py-1.5 
          rounded-full bg-white/10 text-white text-xs md:text-sm 
          font-extrabold tracking-widest uppercase border 
          border-white/20 backdrop-blur-md"
          >
            {t.tag}
          </span>

          <div className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">
            <Typewriter
              options={{
                strings: [t.title],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
              }}
            />
          </div>

          <p className="text-white text-base md:text-lg leading-relaxed font-normal">
            {t.description}
          </p>
        </div>

        {/* أزرار تبديل الأدوار (الأطراف الأربعة) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {t.roles.map((role, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRole(idx)}
              className={`px-6 py-3.5 rounded-2xl text-sm md:text-base font-black transition-all duration-300 cursor-pointer border ${
                activeRole === idx
                  ? "bg-white text-[#0e495b] border-white shadow-xl scale-105"
                  : "bg-white/5 text-white border-white/10 hover:bg-white/10"
              }`}
            >
              {role.title}
            </button>
          ))}
        </div>

        {/* محتوى الصفحة النشطة بتصميم سينمائي متكامل */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white bg-white/10 px-4 py-1.5 rounded-full border border-white/20 inline-block mb-6 shadow-inner">
              {currentRole.badge}
            </span>

            <h3 className="text-3xl md:text-4xl font-black mb-4 text-white leading-tight">
              {currentRole.title}
            </h3>

            <p className="text-white text-base md:text-lg leading-relaxed mb-8 font-normal">
              {currentRole.desc}
            </p>

            {/* قائمة المميزات التفصيلية للنظام المحدد */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {currentRole.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <span className="w-6 h-6 rounded-full bg-white text-[#0e495b] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-white text-sm md:text-base font-semibold leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* تذييل السيكشن */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white font-semibold tracking-wider">
              <span>Smart Schools Complex Enterprise System</span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-white font-bold">
                {t.supportBadge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
