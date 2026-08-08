// // "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/context/LanguageContext";
// import { Sparkles, Send, MapPin, Mail, PhoneCall, Radio, Shield, Globe2, MessageSquareCode } from "lucide-react";

// export default function SmartSchoolInteractiveConsole() {
//   const { language } = useLanguage() as { language: string };
//   const [activeChannel, setActiveChannel] = useState(0);
//   const [formSent, setFormSent] = useState(false);
//   const [inputVal, setInputVal] = useState({ user: "", mail: "", note: "" });

//   const content = {
//     ar: {
//       tag: "Smart School • محطة الاتصال الاستراتيجي",
//       mainTitle: "قنوات التواصل المركزي وربط المؤسسات التعليمية",
//       description: "اختر مسار الاتصال المناسب لاحتياجات صرحك التعليمي، وسيتولى فريق الخبراء لدينا المتابعة الفورية.",
//       channels: [
//         {
//           name: "غرفة العمليات المركزية",
//           type: "خط ساخن مباشر",
//           contact: "+20 (2) 19888",
//           desc: "مخصص للرد السريع على إدارات المدارس وتنسيق الربط الشامل.",
//           icon: <PhoneCall className="w-6 h-6 text-cyan-300" />,
//         },
//         {
//           name: "الدعم الفني والتقني",
//           type: "استجابة سريعة 24/7",
//           contact: "support@smartstar-edu.com",
//           desc: "متابعة الأعطال التقنية وتحديثات النظام السحابي للمجمعات.",
//           icon: <Shield className="w-6 h-6 text-cyan-300" />,
//         },
//         {
//           name: "إدارة الفروع الإقليمية",
//           type: "المقر الرئيسي",
//           contact: "القاهرة، التجمع الخامس - مصر",
//           desc: "الزيارات الميدانية والاجتماعات الاستراتيجية لمجلس الإدارة.",
//           icon: <MapPin className="w-6 h-6 text-cyan-300" />,
//         },
//       ],
//       quickTitle: "إرسال إشعار مباشر لغرفة الدعم",
//       namePlace: "اسم المسؤول أو الإداري",
//       mailPlace: "البريد الإلكتروني الرسمي",
//       notePlace: "اكتب رسالتك أو تفاصيل استفسارك التقني...",
//       btnSend: "إرسال الإشعار السحابي",
//       successNotice: "تم إرسال إشعارك بنجاح إلى النظام المركزي، جاري التوجيه للرد.",
//     },
//     en: {
//       tag: "Smart School • Strategic Communication Console",
//       mainTitle: "Central Communication Channels & Educational Integration",
//       description: "Choose the appropriate communication pathway for your educational complex, and our expert team will follow up instantly.",
//       channels: [
//         {
//           name: "Central Operations Room",
//           type: "Direct Hotline",
//           contact: "+20 (2) 19888",
//           desc: "Dedicated to rapid response for school administrations and comprehensive integration coordination.",
//           icon: <PhoneCall className="w-6 h-6 text-cyan-300" />,
//         },
//         {
//           name: "Technical & IT Support",
//           type: "24/7 Rapid Response",
//           contact: "support@smartstar-edu.com",
//           desc: "Tracking technical issues and cloud system updates for complexes.",
//           icon: <Shield className="w-6 h-6 text-cyan-300" />,
//         },
//         {
//           name: "Regional Branch Management",
//           type: "Main Headquarters",
//           contact: "Cairo, New Cairo - Egypt",
//           desc: "Field visits and strategic board meetings.",
//           icon: <MapPin className="w-6 h-6 text-cyan-300" />,
//         },
//       ],
//       quickTitle: "Send Direct Notice to Support Room",
//       namePlace: "Official Name / Administrator",
//       mailPlace: "Official Email Address",
//       notePlace: "Write your message or technical inquiry details...",
//       btnSend: "Dispatch Cloud Notice",
//       successNotice: "Your notice has been successfully sent to the central system. Routing for response.",
//     },
//   };

//   const t = content[language as keyof typeof content] || content.ar;
//   const isRtl = language === "ar";
//   const selectedChan = t.channels[activeChannel];

//   const handleSend = (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormSent(true);
//   };

//   return (
//     <div
//       className="bg-[#0e495b] text-white min-h-screen py-24 px-6 md:px-20 flex flex-col justify-between relative overflow-hidden"
//       dir={isRtl ? "rtl" : "ltr"}
//     >
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-cyan-400/5 rounded-full blur-[240px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto w-full relative z-10">

//         {/* الترويسة العليا */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs font-extrabold tracking-widest uppercase border border-white/20 backdrop-blur-md">
//             <Sparkles className="w-3.5 h-3.5" />
//             {t.tag}
//           </span>
//           <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
//             {t.mainTitle}
//           </h1>
//           <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed">
//             {t.description}
//           </p>
//         </div>

//         {/* تخطيط استثنائي: لوحة تشغيل أفقية تفاعلية للاتصال */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">

//           {/* الجانب الأيمن: أزرار التبديل بين قنوات الاتصال */}
//           <div className="lg:col-span-5 flex flex-col gap-4">
//             {t.channels.map((chan, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setActiveChannel(idx)}
//                 className={`text-start px-6 py-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between border ${
//                   activeChannel === idx
//                     ? "bg-white text-[#0e495b] border-white font-black shadow-xl scale-102"
//                     : "bg-white/[0.02] text-white border-white/10 hover:bg-white/[0.06]"
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <span className={`p-3 rounded-xl ${activeChannel === idx ? "bg-[#0e495b] text-white" : "bg-white/10"}`}>
//                     {chan.icon}
//                   </span>
//                   <div>
//                     <span className="text-xs opacity-75 block font-mono">{chan.type}</span>
//                     <span className="text-base font-bold">{chan.name}</span>
//                   </div>
//                 </div>
//                 <Radio className={`w-4 h-4 ${activeChannel === idx ? "text-[#0e495b] animate-pulse" : "text-cyan-300"}`} />
//               </button>
//             ))}
//           </div>

//           {/* الجانب الأيسر: شاشة عرض القناة النشطة وتفاصيلها */}
//           <div className="lg:col-span-7 bg-white/[0.03] border border-white/15 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
//             <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/10 rounded-full blur-2xl" />

//             <div>
//               <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 block mb-3 bg-white/10 px-3 py-1 rounded-md inline-block">
//                 CHANNEL ACTIVE // {selectedChan.type}
//               </span>
//               <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
//                 {selectedChan.name}
//               </h2>
//               <p className="text-xl md:text-2xl font-bold text-cyan-200 mb-6 font-mono">
//                 {selectedChan.contact}
//               </p>
//               <p className="text-white/90 text-base md:text-lg font-normal leading-relaxed">
//                 {selectedChan.desc}
//               </p>
//             </div>

//             <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
//               <span>SMART STAR PROTOCOL</span>
//               <span>SECURE LINE 0{activeChannel + 1}</span>
//             </div>
//           </div>

//         </div>

//         {/* نموذج الإرسال السريع المدمج أسفل المحطة */}
//         <div className="max-w-3xl mx-auto bg-white/[0.04] border border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
//           <div className="flex items-center gap-3 mb-6">
//             <MessageSquareCode className="w-6 h-6 text-cyan-300" />
//             <h3 className="text-xl font-black text-white">{t.quickTitle}</h3>
//           </div>

//           {formSent ? (
//             <div className="p-6 rounded-2xl bg-cyan-400/10 border border-cyan-300 text-center">
//               <p className="text-cyan-200 font-bold">{t.successNotice}</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSend} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   required
//                   placeholder={t.namePlace}
//                   value={inputVal.user}
//                   onChange={(e) => setInputVal({ ...inputVal, user: e.target.value })}
//                   className="w-full bg-white/5 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm"
//                 />
//                 <input
//                   type="email"
//                   required
//                   placeholder={t.mailPlace}
//                   value={inputVal.mail}
//                   onChange={(e) => setInputVal({ ...inputVal, mail: e.target.value })}
//                   className="w-full bg-white/5 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm"
//                 />
//               </div>

//               <textarea
//                 required
//                 rows={3}
//                 placeholder={t.notePlace}
//                 value={inputVal.note}
//                 onChange={(e) => setInputVal({ ...inputVal, note: e.target.value })}
//                 className="w-full bg-white/5 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm resize-none"
//               />

//               <button
//                 type="submit"
//                 className="w-full py-3.5 rounded-xl bg-white text-[#0e495b] hover:bg-gray-100 font-black text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
//               >
//                 <span>{t.btnSend}</span>
//                 <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
//               </button>
//             </form>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Send,
  MapPin,
  Mail,
  PhoneCall,
  Radio,
  Shield,
  Globe2,
  MessageSquareCode,
} from "lucide-react";

export default function SmartSchoolInteractiveConsole() {
  const { language } = useLanguage() as { language: string };
  const [activeChannel, setActiveChannel] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [inputVal, setInputVal] = useState({ user: "", mail: "", note: "" });

  const content = {
    ar: {
      tag: "Smart School • محطة الاتصال الاستراتيجي",
      mainTitle: "قنوات التواصل المركزي وربط المؤسسات التعليمية",
      description:
        "اختر مسار الاتصال المناسب لاحتياجات صرحك التعليمي، وسيتولى فريق الخبراء لدينا المتابعة الفورية.",
      channels: [
        {
          name: "غرفة العمليات المركزية",
          type: "خط ساخن مباشر",
          contact: "+20 (2) 19888",
          desc: "مخصص للرد السريع على إدارات المدارس وتنسيق الربط الشامل.",
          icon: <PhoneCall className="w-6 h-6 text-cyan-300" />,
        },
        {
          name: "الدعم الفني والتقني",
          type: "استجابة سريعة 24/7",
          contact: "support@smartstar-edu.com",
          desc: "متابعة الأعطال التقنية وتحديثات النظام السحابي للمجمعات.",
          icon: <Shield className="w-6 h-6 text-cyan-300" />,
        },
        {
          name: "إدارة الفروع الإقليمية",
          type: "المقر الرئيسي",
          contact: "القاهرة، التجمع الخامس - مصر",
          desc: "الزيارات الميدانية والاجتماعات الاستراتيجية لمجلس الإدارة.",
          icon: <MapPin className="w-6 h-6 text-cyan-300" />,
        },
      ],
      quickTitle: "إرسال إشعار مباشر لغرفة الدعم",
      namePlace: "اسم المسؤول أو الإداري",
      mailPlace: "البريد الإلكتروني الرسمي",
      notePlace: "اكتب رسالتك أو تفاصيل استفسارك التقني...",
      btnSend: "إرسال الإشعار السحابي",
      successNotice:
        "تم إرسال إشعارك بنجاح إلى النظام المركزي، جاري التوجيه للرد.",
    },
    en: {
      tag: "Smart School • Strategic Communication Console",
      mainTitle: "Central Communication Channels & Educational Integration",
      description:
        "Choose the appropriate communication pathway for your educational complex, and our expert team will follow up instantly.",
      channels: [
        {
          name: "Central Operations Room",
          type: "Direct Hotline",
          contact: "+20 (2) 19888",
          desc: "Dedicated to rapid response for school administrations and comprehensive integration coordination.",
          icon: <PhoneCall className="w-6 h-6 text-cyan-300" />,
        },
        {
          name: "Technical & IT Support",
          type: "24/7 Rapid Response",
          contact: "support@smartstar-edu.com",
          desc: "Tracking technical issues and cloud system updates for complexes.",
          icon: <Shield className="w-6 h-6 text-cyan-300" />,
        },
        {
          name: "Regional Branch Management",
          type: "Main Headquarters",
          contact: "Cairo, New Cairo - Egypt",
          desc: "Field visits and strategic board meetings.",
          icon: <MapPin className="w-6 h-6 text-cyan-300" />,
        },
      ],
      quickTitle: "Send Direct Notice to Support Room",
      namePlace: "Official Name / Administrator",
      mailPlace: "Official Email Address",
      notePlace: "Write your message or technical inquiry details...",
      btnSend: "Dispatch Cloud Notice",
      successNotice:
        "Your notice has been successfully sent to the central system. Routing for response.",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;
  const isRtl = language === "ar";
  const selectedChan = t.channels[activeChannel];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div
      className="bg-[#0e495b] text-white min-h-screen py-24 px-6 md:px-20 flex flex-col justify-between relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-cyan-400/5 rounded-full blur-[240px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* الترويسة العليا */}
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

        {/* تخطيط استثنائي: لوحة تشغيل أفقية تفاعلية للاتصال */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          {/* الجانب الأيمن: أزرار التبديل بين قنوات الاتصال */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {t.channels.map((chan, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChannel(idx)}
                className={`text-start px-6 py-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                  activeChannel === idx
                    ? "bg-white text-[#0e495b] border-white font-black shadow-xl scale-102"
                    : "bg-white/[0.02] text-white border-white/10 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`p-3 rounded-xl ${activeChannel === idx ? "bg-[#0e495b] text-white" : "bg-white/10"}`}
                  >
                    {chan.icon}
                  </span>
                  <div>
                    <span className="text-xs opacity-75 block font-mono">
                      {chan.type}
                    </span>
                    <span className="text-base font-bold">{chan.name}</span>
                  </div>
                </div>
                <Radio
                  className={`w-4 h-4 ${activeChannel === idx ? "text-[#0e495b] animate-pulse" : "text-cyan-300"}`}
                />
              </button>
            ))}
          </div>

          {/* الجانب الأيسر: شاشة عرض القناة النشطة وتفاصيلها */}
          <div className="lg:col-span-7 bg-white/[0.03] border border-white/15 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/10 rounded-full blur-2xl" />

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 block mb-3 bg-white/10 px-3 py-1 rounded-md inline-block">
                CHANNEL ACTIVE // {selectedChan.type}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
                {selectedChan.name}
              </h2>
              <p className="text-xl md:text-2xl font-bold text-cyan-200 mb-6 font-mono">
                {selectedChan.contact}
              </p>
              <p className="text-white/90 text-base md:text-lg font-normal leading-relaxed">
                {selectedChan.desc}
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>SMART STAR PROTOCOL</span>
              <span>SECURE LINE 0{activeChannel + 1}</span>
            </div>
          </div>
        </div>

        {/* نموذج الإرسال السريع المدمج أسفل المحطة */}
        <div className="max-w-3xl mx-auto bg-white/[0.04] border border-white/20 rounded-3xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquareCode className="w-6 h-6 text-cyan-300" />
            <h3 className="text-xl font-black text-white">{t.quickTitle}</h3>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-cyan-400/10 border border-cyan-300 text-center">
              <p className="text-cyan-200 font-bold">{t.successNotice}</p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder={t.namePlace}
                  value={inputVal.user}
                  onChange={(e) =>
                    setInputVal({ ...inputVal, user: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm"
                />
                <input
                  type="email"
                  required
                  placeholder={t.mailPlace}
                  value={inputVal.mail}
                  onChange={(e) =>
                    setInputVal({ ...inputVal, mail: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm"
                />
              </div>

              <textarea
                required
                rows={3}
                placeholder={t.notePlace}
                value={inputVal.note}
                onChange={(e) =>
                  setInputVal({ ...inputVal, note: e.target.value })
                }
                className="w-full bg-white/5 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300 text-sm resize-none"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white text-[#0e495b] hover:bg-gray-100 font-black text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{t.btnSend}</span>
                <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
