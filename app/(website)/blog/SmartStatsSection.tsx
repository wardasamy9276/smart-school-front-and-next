"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Video, Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function SmartLectureCreationHub() {
  const { language } = useLanguage() as { language: string };

  // حالات البيانات للخطوة الأولى
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ meetLink: string } | null>(
    null,
  );

  const content = {
    ar: {
      tag: "Smart Star - نظام إنشاء المحاضرات الافتراضية",
      mainTitle: "إنشاء وإدارة محاضرات Google Meet بضغطة زر واحدة",
      description:
        "اتبع خطوات المعلم الذكية لجدولة وتوليد روابط المحاضرات الأونلاين وربطها بقاعدة البيانات لحظياً.",
      formTitle: "لوحة تحكم المعلم - جدول محاضرة جديدة",
      titleLabel: "عنوان المحاضرة (مثال: رياضيات - الصف الأول الإعدادي)",
      dateLabel: "موعد المحاضرة (التاريخ)",
      timeLabel: "وقت البدء",
      submitBtn: "إنشاء محاضرة وتوليد رابط Google Meet",
      loadingText: "جاري إرسال الطلب لـ Google Calendar API...",
      successMsg:
        "تم إنشاء الحدث وتوليد رابط Google Meet وحفظه بنجاح في قاعدة البيانات!",
      joinBtn: "دخول المحاضرة عبر Google Meet",
      stepsHeader: "خطوات النظام الآلية:",
      steps: [
        "1. المدرس يعبئ البيانات ويضغط 'إنشاء محاضرة'.",
        "2. السيرفر يرسل API Request إلى Google Calendar API لتوليد رابط Meet.",
        "3. النظام يحفظ الرابط تلقائياً في قاعدة البيانات (Lectures Table).",
        "4. الطلاب يدخلون المنصة ويضغطون 'دخول المحاضرة' عبر الرابط المحفوظ.",
      ],
    },
    en: {
      tag: "Smart Star - Virtual Lecture Creation",
      mainTitle: "Create & Manage Google Meet Lectures with One Click",
      description:
        "Follow the teacher's smart steps to schedule, generate online lecture links, and sync with the database instantly.",
      formTitle: "Teacher Dashboard - Schedule New Lecture",
      titleLabel: "Lecture Title (e.g., Math - Grade 7)",
      dateLabel: "Lecture Date",
      timeLabel: "Start Time",
      submitBtn: "Create Lecture & Generate Google Meet Link",
      loadingText: "Sending API Request to Google Calendar...",
      successMsg:
        "Event created, Google Meet link generated, and saved to DB successfully!",
      joinBtn: "Join Lecture via Google Meet",
      stepsHeader: "Automated System Steps:",
      steps: [
        "1. Teacher fills data & clicks 'Create Lecture'.",
        "2. Server sends API Request to Google Calendar API to generate Meet link.",
        "3. System saves the link automatically in the DB (Lectures Table).",
        "4. Students log in and click 'Join Lecture' via the saved link.",
      ],
    },
  };

  const t = content[language as keyof typeof content] || content.ar;

  // محاكاة عملية الربط البرمجي للخطوات الأربع عند الضغط
  const handleCreateLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    setLoading(true);
    setSuccessData(null);

    setTimeout(() => {
      setLoading(false);
      // محاكاة استجابة السيرفر ورابط Google Meet الوهمي الناتج عن الخطوة الثانية والثالثة
      setSuccessData({
        meetLink: "https://meet.google.com/abc-defg-hij",
      });
    }, 2000);
  };

  return (
    <section
      className="py-28 px-4 md:px-12 bg-[#0e495b] relative overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* خلفية ضوئية جمالية */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* رأس القسم */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-white/10 text-white text-xs md:text-sm font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md">
            <Video className="w-4 h-4 text-cyan-300" />
            {t.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight text-white">
            {t.mainTitle}
          </h2>
          <p className="text-white text-sm md:text-base leading-relaxed opacity-95">
            {t.description}
          </p>
        </div>

        {/* نموذج إنشاء المحاضرة (لوحة تحكم المعلم) */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 border border-white/15 shadow-2xl">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
            {t.formTitle}
          </h3>

          <form onSubmit={handleCreateLecture} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                {t.titleLabel}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-cyan-300 text-sm md:text-base"
                placeholder="..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-300" /> {t.dateLabel}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-300 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-300" /> {t.timeLabel}
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-300 text-sm md:text-base"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-white text-[#0e495b] hover:bg-gray-100 font-black text-base transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-xl disabled:opacity-50"
            >
              {loading ? t.loadingText : t.submitBtn}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* حالة النجاح وظهور رابط جوجل ميت المحفوظ في قاعدة البيانات */}
          {successData && (
            <div className="mt-8 p-6 rounded-2xl bg-white/10 border border-white/25 text-center animate-fadeIn">
              <div className="flex items-center justify-center gap-2 text-cyan-300 font-bold mb-2">
                <CheckCircle2 className="w-6 h-6" />
                <span>{t.successMsg}</span>
              </div>
              <p className="text-xs text-white/80 mb-4 break-all">
                Google Meet Link (Saved in DB): {successData.meetLink}
              </p>

              {/* الخطوة الرابعة: دخول الطلاب */}
              <a
                href={successData.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>{t.joinBtn}</span>
              </a>
            </div>
          )}
        </div>

        {/* ملخص الخطوات البرمجية للاستئناس والتوضيح */}
        <div className="mt-12 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h4 className="text-white font-bold text-sm mb-3 tracking-wide">
            {t.stepsHeader}
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-white/90">
            {t.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-300 font-bold">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
