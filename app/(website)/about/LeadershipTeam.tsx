"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LeadershipTeam() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const content = {
    ar: {
      tag: "منظومة Smart Schools Complex الشاملة",
      title: "إدارة متكاملة ومنصة تعليمية متطورة لإدارة المدارس (ERP & LMS)",
      description:
        "نقدم حلولاً برمجية متكاملة تدمج لوحة التحكم الإدارية الكاملة، منصة التعلم الذكي LMS، ونظام تخطيط موارد المؤسسات ERP لإدارة المدارس الخاصة والدولية بكل احترافية.",
      tabs: [
        {
          title: "لوحة التحكم الإدارية الشاملة",
          subtitle: "إدارة كاملة للمحتوى والبيانات والقبول",
          desc: "إمكانية التعديل الكامل على محتوى الموقع من لوحة التحكم، إضافة أخبار المدرسة والخطط الأسبوعية لحظة بلحظة، ونظام متكامل للتقديم عبر الإنترنت لتسجيل بيانات الطالب والمراحل الدراسية، مع تسجيل بيانات الأب والأم والولاية التعليمية بكل دقة وسلاسة.",
          features: [
            "تعديل محتوى الموقع بالكامل لوحة التحكم",
            "إضافة أخبار المدرسة والفعاليات الجديدة",
            "إدارة الخطط الأسبوعية وجداول الحصص",
            "نظام تقديم إلكتروني متكامل وتسجيل بيانات الطلاب وأولياء الأمور",
          ],
          icon: "⚙️",
        },
        {
          title: "نظام المعلم المتقدم (Teacher LMS)",
          subtitle: "أدوات تدريس رقمية متكاملة",
          desc: "حساب متكامل للمعلم يتيح إنشاء الاختبارات عبر الإنترنت، إضافة الواجبات المنزلية، رفع المرفقات والملفات للطلاب، إنشاء الفصول الذكية، رفع التحضيرات والفيديوهات المسجلة، ترصيد النتائج الشهرية، والبث المباشر والتواصل الفعال.",
          features: [
            "إنشاء اختبارات إلكترونية وواجبات منزلية",
            "إدارة الفصول الذكية والبث المباشر",
            "رفع الفيديوهات، الصور، والتحضيرات المدرسية",
            "ترصيد النتائج الشهرية ومتابعة الأداء",
          ],
          icon: "👨‍🏫",
        },
        {
          title: "نظام الطالب الذكي (Student Portal)",
          subtitle: "تجربة تعلم رقمية تفاعلية وممتعة",
          desc: "بوابة خاصة بالطلاب لاستعراض الواجبات والامتحانات والنتائج، عرض الصور والفيديوهات والمرفقات المرسلة من المعلمين، الدخول للفصول الذكية، الاستفادة من مخزن خاص للمستندات والفيديوهات، والقدرة على التواصل الفردي مع المعلمين والزملاء.",
          features: [
            "استعراض الواجبات والامتحانات والنتائج الشهرية",
            "الدخول المباشر للفصول الذكية والبث المباشر",
            "مخزن شخصي خاص بالفيديوهات والمستندات",
            "محادثات جزئية وآمنة مع المعلمين والطلاب",
          ],
          icon: "🎓",
        },
        {
          title: "نظام ولي الأمر (Parent Dashboard)",
          subtitle: "متابعة لحظية وموثوقة لشؤون الأبناء",
          desc: "منصة مخصصة لولي الأمر لمتابعة الواجبات، الامتحانات، المرفقات، جداول الحصص، الخطط الأسبوعية وتوزيع المناهج، متابعة التقييمات الشهرية وكشوف الحسابات المالية، ومعرفة مواعيد الأقساط مع إمكانية طباعة مطالبات الأقساط بدقة.",
          features: [
            "متابعة تقييمات الأبناء والنتائج الشهرية",
            "متابعة جدول الحصص والخطط الأسبوعية وتوزيع المناهج",
            "كشف الحساب المالي ومواعيد الأقساط وطباعة المطالبات",
            "الاطلاع المستمر على الواجبات والغياب والأنشطة",
          ],
          icon: "👪",
        },
      ],
      ctaTitle: "ابدأ التطور الرقمي اليوم مع منظومة Smart Schools Complex",
      ctaDesc:
        "تعرف على المزيد حول نظام تخطيط موارد المؤسسات المدرسية Pioneers E-School ERP وانقل مدرستك إلى المستقبل الرقمي بكل ثقة واحترافية.",
      ctaButton: "تواصل معنا وابدأ الآن",
    },
    en: {
      tag: "Comprehensive Smart Schools Complex Ecosystem",
      title: "Integrated Management & Advanced LMS/ERP School System",
      description:
        "We provide comprehensive software solutions combining full administrative control panels, smart learning LMS platforms, and ERP systems for private and international schools.",
      tabs: [
        {
          title: "Comprehensive Admin Control Panel",
          subtitle: "Full Management of Content & Admissions",
          desc: "Full ability to modify website content from the control panel, instantly add school news and weekly plans, plus an integrated online admission system to register student details, educational stages, and parent/guardianship data seamlessly.",
          features: [
            "Full website content editing via control panel",
            "Adding school news and new events",
            "Managing weekly plans and timetables",
            "Integrated online application and student/parent registration",
          ],
          icon: "⚙️",
        },
        {
          title: "Advanced Teacher System (LMS)",
          subtitle: "Integrated Digital Teaching Tools",
          desc: "An integrated teacher account enabling online exams, homework assignments, uploading student attachments, creating smart classrooms, uploading lesson plans and recorded videos, recording monthly results, and live streaming.",
          features: [
            "Create electronic exams and homework",
            "Manage smart classes and live streaming",
            "Upload videos, photos, and lesson preparations",
            "Record monthly results and track performance",
          ],
          icon: "👨‍🏫",
        },
        {
          title: "Smart Student Portal",
          subtitle: "Interactive & Engaging Digital Learning",
          desc: "A dedicated student portal to review homework, exams, and results, view media and attachments from teachers, join smart classrooms, access a dedicated storage vault for files/videos, and communicate securely with teachers and peers.",
          features: [
            "Review homework, exams, and monthly results",
            "Direct access to smart classes and live streams",
            "Personal vault for videos and documents",
            "Secure messaging with teachers and peers",
          ],
          icon: "🎓",
        },
        {
          title: "Parent Dashboard",
          subtitle: "Real-time & Reliable Monitoring of Children",
          desc: "A custom platform for parents to track homework, exams, schedules, weekly plans, curriculum distribution, monthly evaluations, financial account statements, installment schedules, and print payment demands easily.",
          features: [
            "Track children's evaluations and monthly results",
            "View schedules, weekly plans, and curriculum mapping",
            "Financial account statements, installment dates & printing demands",
            "Continuous updates on homework, attendance, and activities",
          ],
          icon: "👪",
        },
      ],
      ctaTitle: "Start Your Digital Evolution Today with Smart Schools Complex",
      ctaDesc:
        "Discover more about Pioneers E-School ERP school resource planning system and take your school into the digital future with absolute confidence.",
      ctaButton: "Contact Us & Start Now",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const currentTab = t.tabs[activeTab];

  return (
    <section
      className="py-24 px-4 md:px-12 bg-gradient-to-b from-gray-50 via-white to-cyan-50/10 relative overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* خلفية جمالية */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* رأس القسم */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-sm font-bold tracking-wide border border-cyan-200">
            {t.tag}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f3b4c] mb-6 tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* تصميم عصري متطور بدون كروت (Tabs Layout بتنسيق واسع وحديث) */}
        <div className="bg-white rounded-[2.5rem] border border-cyan-100/80 shadow-2xl shadow-cyan-950/5 p-6 md:p-12 mb-16 relative overflow-hidden">
          {/* شريط الأقسام العلوي */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10 pb-6 border-b border-gray-100">
            {t.tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`py-4 px-5 rounded-2xl text-start transition-all duration-300 font-bold flex items-center gap-3 cursor-pointer ${
                  activeTab === idx
                    ? "bg-cyan-700 text-white shadow-lg shadow-cyan-700/25 scale-[1.02]"
                    : "bg-gray-50 text-gray-700 hover:bg-cyan-50/60 hover:text-cyan-900 border border-gray-100"
                }`}
              >
                <span className="text-2xl shrink-0">{tab.icon}</span>
                <span className="text-xs md:text-sm font-extrabold leading-snug line-clamp-2">
                  {tab.title}
                </span>
              </button>
            ))}
          </div>

          {/* محتوى القسم النشط بتصميم انسيابي واسع */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* النصوص والتفاصيل */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full w-fit mb-4 border border-cyan-200">
                {currentTab.subtitle}
              </span>
              <h3 className="text-2xl md:text-4xl font-black text-[#0f3b4c] mb-4">
                {currentTab.title}
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-loose mb-8 font-medium">
                {currentTab.desc}
              </p>

              {/* قائمة الخصائص بنظام النقاط الحديث */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTab.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-3 bg-cyan-50/50 p-3.5 rounded-2xl border border-cyan-100/60"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyan-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-xs md:text-sm font-bold text-cyan-950 leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* الجزء البصري المتفاعل */}
            <div className="lg:col-span-5 bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-950 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[320px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-5xl md:text-6xl mb-6 block">
                  {currentTab.icon}
                </span>
                <h4 className="text-xl md:text-2xl font-black mb-3">
                  Smart Schools Complex LMS & ERP
                </h4>
                <p className="text-cyan-100 text-xs md:text-sm leading-relaxed opacity-90">
                  {currentTab.subtitle} - تم تصميم هذه المنظومة خصيصاً لتوفير
                  تجربة تشغيلية فريدة ومكتملة الأركان.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-cyan-200 font-semibold">
                <span>Pioneers E-School System</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white">
                  نشط الآن
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* قسم Call to Action (التوصية والربط بنظام Pioneers E-School ERP) */}
      </div>
    </section>
  );
}
