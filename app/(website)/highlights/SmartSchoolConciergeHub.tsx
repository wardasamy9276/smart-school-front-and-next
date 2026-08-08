"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Send,
  Headphones,
  Globe,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";

export default function SmartSchoolConciergeHub() {
  const { language } = useLanguage() as { language: string };
  const [activeSegment, setActiveSegment] = useState(0);
  const [sentStatus, setSentStatus] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    mobile: "",
    inquiryText: "",
  });

  const content = {
    ar: {
      tag: "Smart Star • منصة الكونيرج الرقمي",
      headline: "تواصل حصري ومباشر مع قطاع إدارة مجمعات Smart School",
      subheading:
        "صممنا هذه البناءة لتكون بوابتك الخاصة لطلب الاستشارات، تفعيل الاشتراكات، أو ربط الفروع التعليمية عبر استجابة فورية ومخصصة.",
      segments: [
        {
          title: "الاستشارات الإدارية والربط",
          code: "DESK-01",
          detail:
            "مخصص لمديري المجمعات والمدارس الراغبين في أتمتة فروعهم بالكامل عبر نظام Smart Star.",
        },
        {
          title: "الدعم التقني والتشغيلي الميداني",
          code: "DESK-02",
          detail:
            "فريق هندسي متواجد على مدار الساعة لمتابعة الكفاءة التقنية وسرعة تدفق البيانات.",
        },
        {
          title: "شؤون أولياء الأمور والمنظومة",
          code: "DESK-03",
          detail:
            "الرد على استفسارات الأسر ومتابعة تقارير الأداء اليومية للطلاب داخل الفروع.",
        },
      ],
      formTitle: "احجز جلستك الإدارية أو أرسل استفسارك",
      namePlace: "اسم المسؤول أو ولي الأمر",
      emailPlace: "البريد الإلكتروني للجهة",
      phonePlace: "رقم الهاتف / واتساب",
      msgPlace: "اكتب تفاصيل طلبك أو استفسارك هنا بكل أريحية...",
      submitBtn: "إرسال الطلب إلى مكتب الإدارة",
      successText:
        "تم استلام طلبك بنجاح، وسيتواصل معك مدير القطاع المختص في أقرب وقت.",
    },
    en: {
      tag: "Smart Star • Digital Concierge Hub",
      headline:
        "Exclusive & Direct Contact with Smart School Management Sector",
      subheading:
        "We designed this gateway to be your dedicated portal for requesting consultations, activating subscriptions, or integrating educational branches.",
      segments: [
        {
          title: "Administrative & Integration Consulting",
          code: "DESK-01",
          detail:
            "Dedicated to complex and school managers wishing to fully automate their branches via Smart Star.",
        },
        {
          title: "Technical & Field Operations Support",
          code: "DESK-02",
          detail:
            "An engineering team available 24/7 to monitor technical efficiency and data flow speed.",
        },
        {
          title: "Parents & Ecosystem Affairs",
          code: "DESK-03",
          detail:
            "Answering family inquiries and tracking daily student performance reports across branches.",
        },
      ],
      formTitle: "Book Your Administrative Session or Send Inquiry",
      namePlace: "Official Name / Parent Name",
      emailPlace: "Institution Email Address",
      phonePlace: "Phone / WhatsApp Number",
      msgPlace: "Write your request or inquiry details here...",
      submitBtn: "Dispatch Request to Management Office",
      successText:
        "Your request has been successfully received. The responsible sector director will contact you shortly.",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const isRtl = language === "ar";
  const currentDesk = t.segments[activeSegment];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentStatus(true);
  };

  return (
    <div
      className="bg-[#0e495b] text-white min-h-screen py-24 px-6 md:px-20 flex flex-col justify-between relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] bg-cyan-400/5 rounded-full blur-[250px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* الترويسة الرئيسية */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            {t.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight max-w-4xl">
            {t.headline}
          </h1>
          <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed max-w-3xl">
            {t.subheading}
          </p>
        </div>

        {/* تخطيط عصري مفتوح: أقسام المكاتب الاستشارية التفاعلية وجانب إدخال البيانات */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* الجانب الأيمن: مكاتب الاستقبال المتعددة (بدون كروت تقليدية، تصميم مساحي متصل) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-300 block mb-2 px-1">
                SELECT SUPPORT DESK // مكاتب الدعم
              </span>
              {t.segments.map((seg, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSegment(idx)}
                  className={`w-full text-start px-6 py-5 rounded-3xl transition-all duration-300 cursor-pointer border flex flex-col gap-1.5 ${
                    activeSegment === idx
                      ? "bg-white text-[#0e495b] border-white font-black shadow-2xl scale-[1.02]"
                      : "bg-white/[0.02] text-white border-white/15 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-mono px-2.5 py-0.5 rounded-md ${activeSegment === idx ? "bg-[#0e495b] text-white" : "bg-white/10 text-cyan-200"}`}
                    >
                      {seg.code}
                    </span>
                    <ArrowUpRight
                      className={`w-4 h-4 ${activeSegment === idx ? "text-[#0e495b]" : "text-white/60"}`}
                    />
                  </div>
                  <span className="text-base md:text-lg font-bold">
                    {seg.title}
                  </span>
                </button>
              ))}
            </div>

            {/* صندوق معلومات المكتب النشط */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl">
              <span className="text-xs font-mono text-cyan-300 uppercase block mb-1">
                DESK BRIEF // نبذة المكتب
              </span>
              <p className="text-sm text-white/90 font-normal leading-relaxed">
                {currentDesk.detail}
              </p>
            </div>
          </div>

          {/* الجانب الأيسر: نموذج التواصل التفاعلي الواسع والمدمج */}
          <div className="lg:col-span-7 bg-white/[0.03] border border-white/20 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <Headphones className="w-6 h-6 text-cyan-300" />
              <h2 className="text-2xl font-black text-white">{t.formTitle}</h2>
            </div>

            {sentStatus ? (
              <div className="p-8 rounded-2xl bg-cyan-400/10 border border-cyan-300 text-center">
                <p className="text-cyan-200 text-lg font-bold leading-relaxed">
                  {t.successText}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    required
                    placeholder={t.namePlace}
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm font-medium"
                  />
                  <input
                    type="email"
                    required
                    placeholder={t.emailPlace}
                    value={formData.emailAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, emailAddress: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm font-medium"
                  />
                </div>

                <input
                  type="tel"
                  required
                  placeholder={t.phonePlace}
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm font-medium"
                />

                <textarea
                  required
                  rows={4}
                  placeholder={t.msgPlace}
                  value={formData.inquiryText}
                  onChange={(e) =>
                    setFormData({ ...formData, inquiryText: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm font-medium resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-white text-[#0e495b] hover:bg-gray-100 font-black text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-xl cursor-pointer"
                >
                  <span>{t.submitBtn}</span>
                  <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* الشريط السفلي الموحد */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-200/70">
            SMART SCHOOL • CONCIERGE PROTOCOL 2026
          </span>
          <span className="text-xs text-white/50 font-mono">
            Smart Star Ecosystem • Direct Communication Desk
          </span>
        </div>
      </div>
    </div>
  );
}
