"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
// import Register from "";
export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const { language, t, toggleLanguage } = useLanguage();

  // إنهاء التحميل بعد 1.5 ثانية لإعطاء تجربة بصرية ممتعة بدون تأخير المستخدم
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "+201000000000";
  const whatsappMessage = encodeURIComponent(
    "مرحباً، أرغب الاستفسار عن منظومة Smart Star لـ Smart School",
  );
  const phoneNumber = "+20219888";

  const navData = [
    { id: 1, label: t.home, to: "/" },
    { id: 2, label: t.about, to: "/about" },
    { id: 3, label: t.features, to: "/features" },
    { id: 4, label: t.blog, to: "/blog" },
    { id: 5, label: t.clients, to: "/clients" },
    { id: 6, label: t.contact, to: "/highlights" },
  ];

  return (
    <>
      {/* 1. شاشة التحميل الأولية الاحترافية والجاذبة (Splash Loader) */}
      {isLoading && (
        <div className="fixed inset-0 z-[99999] bg-gradient-to-br from-[#062c38] via-[#0e495b] to-[#08222c] flex flex-col items-center justify-center overflow-hidden transition-all duration-700">
          {/* الخلفية المضيئة الملونة في المنتصف */}
          <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] bg-teal-400/15 rounded-full blur-[80px] animate-ping pointer-events-none" />

          {/* حاوية الانيميشن الدائرية المضيئة */}
          <div className="relative flex items-center justify-center">
            {/* الحلقة الخارجية المضيئة تدور باتجاه الساعة */}
            <div className="absolute -inset-10 rounded-full border-2 border-dashed border-cyan-400/80 animate-[spin_6s_linear_infinite] shadow-[0_0_25px_rgba(34,211,238,0.3)]" />

            {/* الحلقة الداخلية تدور بعكس اتجاه الساعة بألوان متدرجة */}
            <div className="absolute -inset-6 rounded-full border-2 border-t-cyan-300 border-r-teal-200 border-b-transparent border-l-cyan-500 animate-[spin_3s_linear_infinite_reverse]" />

            {/* الهالة المضيئة النابضة */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-400 to-teal-300 opacity-20 blur-lg animate-pulse" />

            {/* الإطار الزجاجي الأنيق الذي يحتوي اللوجو */}
            <div className="relative z-10 w-28 h-28 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
              <Image
                src="/assets/loogo/image.png"
                alt="Logo"
                width={70}
                height={70}
                className="w-16 md:w-20 h-16 md:h-20 object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)] animate-pulse"
                priority
              />
            </div>
          </div>

          {/* النص والعبارة الترحيبية تحت الانيميشن */}
          <div className="relative z-10 text-center mt-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-cyan-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
              Smart Star
            </div>
            <p className="text-white/90 font-extrabold text-base md:text-lg tracking-wide animate-pulse">
              جاري تحضير التجربة الرقمية...
            </p>
          </div>
        </div>
      )}

      {/* 2. محتوى الـ Navbar */}
      <nav className="bg-cyan-800 text-white shadow-md">
        <div className="container mx-auto px-4 md:px-10 py-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/loogo/image.png"
                alt={t.logoAlt}
                width={80}
                height={80}
                className="w-14 md:w-16 h-14 md:h-16 object-contain"
                priority
              />
            </Link>

            <div className="flex items-center gap-8">
              <ul className="hidden md:flex gap-6 font-medium">
                {navData.map((item) => {
                  const isActive = pathname === item.to;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.to}
                        className={`relative pb-1 transition-colors duration-200 ${
                          isActive
                            ? "text-cyan-200 font-bold"
                            : "hover:text-cyan-200"
                        } after:absolute ${
                          language === "ar" ? "after:right-0" : "after:left-0"
                        } after:-bottom-0.5 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${
                          isActive
                            ? "after:w-full"
                            : "after:w-0 hover:after:w-full"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 text-xs font-semibold border border-white/40 rounded-lg hover:bg-white/15 transition-colors uppercase tracking-wider"
              >
                {language === "ar" ? "English 🌐" : "عربي 🌐"}
              </button>

              <Link
                href="/register"
                className="px-5 py-2 text-sm font-medium bg-white text-cyan-800 rounded-lg shadow hover:bg-cyan-50 transition-colors"
              >
                {t.login}
              </Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 text-xs border border-white/40 rounded hover:bg-white/10"
              >
                {language === "ar" ? "EN" : "عربي"}
              </button>

              <button
                onClick={() => setOpen((prev) => !prev)}
                className="text-2xl p-1 focus:outline-none"
                aria-label={open ? t.closeMenu : t.openMenu}
                aria-expanded={open}
                type="button"
              >
                {open ? "✕" : "☰"}
              </button>
            </div>
          </div>

          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              open ? "max-h-[400px] mt-4 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="flex flex-col gap-2 bg-white text-gray-800 p-4 rounded-lg shadow-lg">
              {navData.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <li key={item.id} className="text-center">
                    <Link
                      href={item.to}
                      onClick={() => setOpen(false)}
                      className={`block py-2.5 px-4 rounded-md font-medium transition-colors ${
                        isActive
                          ? "bg-cyan-100 text-cyan-800 font-bold"
                          : "hover:bg-cyan-50 hover:text-cyan-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}

              <hr className="my-2 border-gray-200" />

              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full py-2.5 text-center rounded-md bg-cyan-800 text-white font-medium hover:bg-cyan-900 transition-colors"
              >
                {t.login}
              </Link>
            </ul>
          </div>
        </div>
      </nav>

      {/* 3. عناصر التواصل الثابتة أسفل الشاشة */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center justify-center">
        <div className="absolute -inset-3 rounded-full bg-cyan-400/30 blur-md animate-pulse pointer-events-none" />
        <div className="absolute -inset-4 rounded-full border-2 border-dashed border-cyan-300/60 animate-[spin_10s_linear_infinite] pointer-events-none" />

        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Contact"
          className="relative z-10 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer text-3xl"
        >
          <FaWhatsapp />
        </a>

        <a
          href={`tel:${phoneNumber}`}
          aria-label="Phone Call"
          className="relative z-10 w-14 h-14 rounded-full bg-[#0e495b] hover:bg-[#135d74] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer border border-white/20"
        >
          <Phone className="w-6 h-6 fill-white" />
        </a>
      </div>
    </>
  );
}
