"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Radar,
  Radio,
  Globe,
  Cpu,
  Send,
  CheckCircle2,
  MapPin,
  Headphones,
  ShieldAlert,
  Sparkles,
  Terminal,
} from "lucide-react";

export default function SmartSchoolRadarNexus() {
  const { language } = useLanguage() as { language: string };
  const [activeFrequency, setActiveFrequency] = useState(0);
  const [transmitted, setTransmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sector: "general",
    message: "",
  });

  const content = {
    ar: {
      badge: "Smart Star • شبكة الاتصالات الرادارّية المتقدمة",
      title: "غرفة العمليات والتواصل الاستراتيجي",
      subtitle:
        "اختر التردد الإداري المناسب للتواصل الفوري مع شبكة مجمعات Smart School، ونظامنا الذكي سيوجه طلبك مباشرة إلى القسم المعني.",
      frequencies: [
        {
          code: "FREQ-01",
          name: "الخط الساخن للإدارة العليا",
          spec: "تنسيق مجمعات المدارس الكبرى والشراكات الاستراتيجية.",
          contact: "+20 (2) 19888 - Ext 1",
          status: "متصل / استجابة فورية",
          icon: <Radio className="w-5 h-5 text-cyan-300 animate-pulse" />,
        },
        {
          code: "FREQ-02",
          name: "محطة الطوارئ والدعم السحابي",
          spec: "متابعة الأعطال التقنية وتحديثات منصة التعلم الذكي 24/7.",
          contact: "cloud.support@smartstar-edu.com",
          status: "جاهز للربط",
          icon: <Cpu className="w-5 h-5 text-cyan-300" />,
        },
        {
          code: "FREQ-03",
          name: "مكتب المتابعة الميدانية والفروع",
          spec: "الزيارات المدرسية، التقييمات اليومية، وشؤون الفروع الإقليمية.",
          contact: "القاهرة • التجمع الخامس، مبنى الابتكار التعليمي",
          status: "مفتوح حتى 6:00 م",
          icon: <MapPin className="w-5 h-5 text-cyan-300" />,
        },
      ],
      radarTitle: "بث إشارة اتصال مباشرة إلى الغرفة المركزية",
      nameLabel: "اسم المسؤول أو ولي الأمر",
      emailLabel: "البريد الإلكتروني للجهة",
      sectorLabel: "القطاع المستهدف بالبث",
      msgLabel: "نص الرسالة أو الاستفسار التقني",
      sendBtn: "إطلاق الإشارة عبر الشبكة المشفرة",
      successMsg:
        "تم التقاط إشارتك بنجاح في النظام المركزي، جاري إرسالها إلى القسم المختص.",
      sectors: [
        { id: "general", label: "شؤون عامة وإدارية" },
        { id: "tech", label: "دعم فني وتقني سحابي" },
        { id: "partnership", label: "شراكات ومجمعات جديدة" },
      ],
      terminalHeader: "SYSTEM LOGS // حالة القناة الحالية",
    },
    en: {
      badge: "Smart Star • Advanced Radar Comms Network",
      title: "Strategic Operations & Contact Nexus",
      subtitle:
        "Select the appropriate administrative frequency for direct connection with the Smart School network, and our intelligent system will route your request instantly.",
      frequencies: [
        {
          code: "FREQ-01",
          name: "Executive Management Hotline",
          spec: "Coordination of major school complexes and strategic partnerships.",
          contact: "+20 (2) 19888 - Ext 1",
          status: "Online / Instant Response",
          icon: <Radio className="w-5 h-5 text-cyan-300 animate-pulse" />,
        },
        {
          code: "FREQ-02",
          name: "Cloud Support & Emergency Station",
          spec: "Monitoring technical glitches and smart learning platform updates 24/7.",
          contact: "cloud.support@smartstar-edu.com",
          status: "Ready for Link",
          icon: <Cpu className="w-5 h-5 text-cyan-300" />,
        },
        {
          code: "FREQ-03",
          name: "Field Operations & Branch Office",
          spec: "School visits, daily evaluations, and regional branch affairs.",
          contact: "Cairo • New Cairo, Educational Innovation Hub",
          status: "Open until 6:00 PM",
          icon: <MapPin className="w-5 h-5 text-cyan-300" />,
        },
      ],
      radarTitle: "Broadcast Direct Contact Signal to Central Room",
      nameLabel: "Official / Guardian Name",
      emailLabel: "Institutional Email",
      sectorLabel: "Target Broadcast Sector",
      msgLabel: "Message Text or Technical Inquiry",
      sendBtn: "Launch Signal via Encrypted Network",
      successMsg:
        "Your signal has been successfully captured in the central system and routed to the designated department.",
      sectors: [
        { id: "general", label: "General & Administrative Affairs" },
        { id: "tech", label: "Technical & Cloud Support" },
        { id: "partnership", label: "New Partnerships & Complexes" },
      ],
      terminalHeader: "SYSTEM LOGS // Active Channel Status",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const isRtl = language === "ar";
  const activeFreq = t.frequencies[activeFrequency];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTransmitted(true);
  };

  return (
    <div
      className="bg-[#0b3845] text-white min-h-screen py-24 px-6 md:px-20 relative overflow-hidden flex flex-col justify-between selection:bg-cyan-500 selection:text-white"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* خلفية رادارية متوهجة متقدمة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[200px] pointer-events-none animate-pulse" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* رأس الصفحة الفضائي / المستقبلي */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs font-mono tracking-widest uppercase border border-white/20 backdrop-blur-md shadow-lg">
            <Radar className="w-4 h-4 text-cyan-300 animate-spin" />
            {t.badge}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* التخطيط الثوري: قسم الترددات الرادارّية يساراً ونموذج البث يميناً */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* محطة الترددات (تتفاعل وتغير بيانات العرض في Terminal) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 px-2 block">
              // SELECT FREQUENCY MATRIX
            </span>

            {t.frequencies.map((freq, idx) => (
              <div
                key={idx}
                onClick={() => setActiveFrequency(idx)}
                className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer border backdrop-blur-2xl relative overflow-hidden group ${
                  activeFrequency === idx
                    ? "bg-white/[0.08] border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-[1.02]"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
                }`}
              >
                {/* ضوء مؤشر تفاعلي */}
                {activeFrequency === idx && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-300 bg-white/10 px-3 py-1 rounded-full">
                    {freq.code}
                  </span>
                  <span className="text-xs font-mono text-white/60 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {freq.status}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl ${activeFrequency === idx ? "bg-cyan-500 text-[#0b3845]" : "bg-white/10 text-white"}`}
                  >
                    {freq.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                      {freq.name}
                    </h3>
                    <p className="text-xs text-white/70 mb-3 leading-relaxed">
                      {freq.spec}
                    </p>
                    <p className="text-sm font-mono text-cyan-200 font-bold">
                      {freq.contact}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* شاشة Terminal مصغرة تعكس تفاصيل التردد النشط */}
            <div className="bg-black/40 border border-white/10 rounded-3xl p-5 font-mono text-xs text-cyan-300/80 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 text-white/50">
                <Terminal className="w-4 h-4 text-cyan-300" />
                <span>{t.terminalHeader}</span>
              </div>
              <p className="text-white/90">
                CONNECTED TO:{" "}
                <span className="text-cyan-300 font-bold">
                  {activeFreq.name}
                </span>
              </p>
              <p className="text-white/60 mt-1">
                STATUS: SECURE_CHANNEL_READY // 100% ENCRYPTED
              </p>
            </div>
          </div>

          {/* لوحة إطلاق الإشارة (نموذج التواصل الذكي) */}
          <div className="lg:col-span-7 bg-white/[0.04] border border-white/15 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-cyan-300" />
              <h2 className="text-2xl font-black text-white">{t.radarTitle}</h2>
            </div>

            {transmitted ? (
              <div className="p-10 rounded-3xl bg-cyan-400/10 border border-cyan-400/50 text-center flex flex-col items-center justify-center gap-4 my-8">
                <CheckCircle2 className="w-16 h-16 text-cyan-300 animate-bounce" />
                <p className="text-cyan-100 text-lg font-bold leading-relaxed">
                  {t.successMsg}
                </p>
                <button
                  onClick={() => setTransmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-white text-[#0b3845] font-bold text-xs rounded-xl hover:bg-cyan-200 transition-all cursor-pointer"
                >
                  إرسال إشارة أخرى / New Signal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-cyan-200 block">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="الاسم الكريم..."
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-300 text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-cyan-200 block">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@institution.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-300 text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-cyan-200 block">
                    {t.sectorLabel}
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) =>
                      setFormData({ ...formData, sector: e.target.value })
                    }
                    className="w-full bg-[#082a34] border border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-300 text-sm font-medium transition-all cursor-pointer"
                  >
                    {t.sectors.map((sec) => (
                      <option
                        key={sec.id}
                        value={sec.id}
                        className="bg-[#0b3845] text-white"
                      >
                        {sec.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-cyan-200 block">
                    {t.msgLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="اكتب استفسارك التقني أو تفاصيل التنسيق بدقة..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-300 text-sm font-medium transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-white text-[#0b3845] hover:bg-cyan-100 font-black text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer group"
                >
                  <span>{t.sendBtn}</span>
                  <Send
                    className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                  />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* الشريط السفلي المستقبلي */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SMART STAR RADAR SYSTEM • ALL PROTOCOLS ACTIVE</span>
          </div>
          <span>SECURE CONNECTION ENCRYPTED VIA SSL-9</span>
        </div>
      </div>
    </div>
  );
}
