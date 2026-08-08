"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext"; // <--- أضف مسار الـ Hook الصحيح هنا

import {
  Sparkles,
  Send,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Headphones,
} from "lucide-react";

export default function SmartContactHubPage() {
  const { language } = useLanguage() as { language: string };
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const content = {
    ar: {
      tag: "Smart Star • تواصل معنا",
      mainTitle: "قنوات الاتصال المباشر والدعم الفني لمجمع مدارس Smart School",
      description:
        "نحن هنا لخدمتكم على مدار الساعة. اختر الطريقة الأنسب لك لتتواصل مع فريق الدعم الفني، المبيعات، أو الاستشارات الإدارية.",
      channels: [
        {
          title: "الخط الساخن المباشر",
          detail: "+20 (2) 19888 - تواصل فوري مع فريق المبيعات والتشغيل",
          icon: <PhoneCall className="w-6 h-6 text-cyan-300" />,
        },
        {
          title: "البريد الإلكتروني الرسمي",
          detail: "support@smartstar-edu.com - استجابة خلال أقل من ساعة",
          icon: <Mail className="w-6 h-6 text-cyan-300" />,
        },
        {
          title: "المقر الرئيسي للمجمعات",
          detail: "القاهرة، التجمع الخامس - مصر (إدارة فروع Smart School)",
          icon: <MapPin className="w-6 h-6 text-cyan-300" />,
        },
        {
          title: "ساعات العمل الرسمية",
          detail:
            "السبت إلى الخميس: 8:00 صباحاً حتى 6:00 مساءً (توقيت القاهرة)",
          icon: <Clock className="w-6 h-6 text-cyan-300" />,
        },
      ],
      formTitle: "أرسل استفسارك الإداري مباشرة",
      namePlaceholder: "اسم المسؤول أو الإداري",
      emailPlaceholder: "البريد الإلكتروني الرسمي للمؤسسة",
      phonePlaceholder: "رقم الهاتف / الجوال",
      msgPlaceholder: "اكتب تفاصيل استفسارك أو طلب ربط المجمع...",
      sendBtn: "إرسال الرسالة إلى غرفة التشغيل",
      successMsg:
        "تم إرسال طلبك بنجاح، وسيتواصل معك فريق الدعم المختص خلال دقائق قليلة.",
    },
    en: {
      tag: "Smart Star • Contact Us",
      mainTitle:
        "Direct Communication & Technical Support Channels for Smart School",
      description:
        "We are here to serve you 24/7. Choose the most convenient way to reach out to our technical support, sales, or management consulting teams.",
      channels: [
        {
          title: "Direct Hotline",
          detail: "+20 (2) 19888 - Instant contact with sales & operations",
          icon: <PhoneCall className="w-6 h-6 text-cyan-300" />,
        },
        {
          title: "Official Email",
          detail: "support@smartstar-edu.com - Response in under an hour",
          icon: <Mail className="w-6 h-6 text-cyan-300" />,
        },
        {
          title: "Complex Headquarters",
          detail: "Cairo, New Cairo - Egypt (Smart School Management)",
          icon: <MapPin className="w-6 h-6 text-cyan-300" />,
        },
        {
          title: "Official Working Hours",
          detail: "Saturday to Thursday: 8:00 AM to 6:00 PM (Cairo Time)",
          icon: <Clock className="w-6 h-6 text-cyan-300" />,
        },
      ],
      formTitle: "Send Your Administrative Inquiry Directly",
      namePlaceholder: "Official Name / Administrator",
      emailPlaceholder: "Official Institution Email",
      phonePlaceholder: "Phone / Mobile Number",
      msgPlaceholder: "Write your inquiry or system integration request...",
      sendBtn: "Dispatch Message to Operations Room",
      successMsg:
        "Your request has been successfully sent. Our specialized support team will contact you shortly.",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const isRtl = language === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div
        className="bg-[#0e495b] text-white min-h-screen py-24 px-6 md:px-20 flex flex-col justify-between relative overflow-hidden"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-cyan-400/5 rounded-full blur-[240px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              {t.tag}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              {t.mainTitle}
            </h1>
            <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed">
              {t.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {t.channels.map((ch, idx) => (
              <div
                key={idx}
                className="border-t-2 border-cyan-300 pt-6 pb-4 px-4 bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/15">
                    {ch.icon}
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">
                    {ch.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm font-normal leading-relaxed">
                    {ch.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-white/15 bg-white/[0.03] backdrop-blur-3xl rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Headphones className="w-6 h-6 text-cyan-300" />
              <h2 className="text-2xl font-black text-white">{t.formTitle}</h2>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-cyan-400/10 border border-cyan-300 text-center">
                <p className="text-cyan-200 text-lg font-bold">
                  {t.successMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 text-sm font-medium"
                  />
                  <input
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 text-sm font-medium"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={t.phonePlaceholder}
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState({ ...formState, phone: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 text-sm font-medium"
                  />
                </div>

                <textarea
                  required
                  rows={4}
                  placeholder={t.msgPlaceholder}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 focus:outline-none focus:border-cyan-300 text-sm font-medium"
                />

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="px-10 py-4 rounded-full bg-white text-[#0e495b] hover:bg-gray-100 font-black text-sm md:text-base transition-all duration-300 inline-flex items-center gap-3 shadow-xl cursor-pointer"
                  >
                    <span>{t.sendBtn}</span>
                    <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
