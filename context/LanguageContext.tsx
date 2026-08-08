"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "ar" | "en";

const translations = {
  ar: {
    dir: "rtl",

    home: "الرئيسية",
    about: "من نحن",
    features: "المميزات",
    blog: "المدونة",
    clients: "عملاؤنا",
    contact: "تواصل معنا",

    login: "تسجيل الدخول",
    register: "إنشاء حساب",

    logoAlt: "الشعار",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",

    bookDemo: "احجز ديمو مجاني",

    student_info: "كل ما يخص الطلبة",

    // Schools
    schools: "مدارسنا",
    view_details: "عرض التفاصيل",
    no_schools: "لا توجد مدارس",

    school_default_desc: "مدرسة تقدم نظام تعليمي متكامل وخدمات تعليمية متميزة.",

    location: "العنوان",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    footer_cta_badge: "انضم إلى عائلتنا التعليمية",
    footer_cta_title: "هل تبحث عن",
    footer_cta_title_highlight: "مستقبل تعليمي مشرق",
    footer_cta_title_end: "لأبنائك؟",
    footer_cta_desc:
      "باب التسجيل مفتوح الآن للعام الدراسي الجديد. احجز مقعداً لأبنائك واستمتع بتجربة تعليمية فريدة ومتطورة.",
    footer_apply_now: "قدم الآن",
    footer_contact_admission: "تواصل مع القبول",
    footer_brand_desc:
      "صرح تعليمي متميز يهدف إلى بناء جيل واعٍ ومبتكر عبر منصات تعليمية وبيئة تربوية حديثة.",
    footer_follow_us: "تابعنا على شبكاتنا الاجتماعية",
    footer_quick_links_title: "روابط سريعة واستكشاف",
    footer_all_rights_reserved: "جميع الحقوق محفوظة للمدرسة",
    footer_privacy_policy: "سياسة الخصوصية",
    footer_terms_conditions: "الشروط والأحكام",
  },

  en: {
    dir: "ltr",

    home: "Home",
    about: "About Us",
    features: "Features",
    blog: "Blog",
    clients: "Clients",
    contact: "Contact Us",

    login: "Login",
    register: "Register",

    logoAlt: "Logo",
    openMenu: "Open Menu",
    closeMenu: "Close Menu",

    bookDemo: "Book a Free Demo",

    student_info: "Everything About Students",

    // Schools
    schools: "Our Schools",
    view_details: "View Details",
    no_schools: "No Schools Found",

    school_default_desc:
      "A school that provides an integrated educational system and excellent educational services.",

    location: "Address",
    phone: "Phone",
    email: "Email",

    // ... باقي المفاتيح القديمة ...

    // Footer Keys
    footer_cta_badge: "Join Our Educational Family",
    footer_cta_title: "Are you looking for a",
    footer_cta_title_highlight: "Bright Educational Future",
    footer_cta_title_end: "for your children?",
    footer_cta_desc:
      "Registration is now open for the new academic year. Reserve a seat for your children and enjoy a unique learning experience.",
    footer_apply_now: "Apply Now",
    footer_contact_admission: "Contact Admissions",
    footer_brand_desc:
      "A distinguished educational institution aiming to build a conscious and innovative generation through modern platforms.",
    footer_follow_us: "Follow us on social media",
    footer_quick_links_title: "Quick Links & Explore",
    footer_all_rights_reserved: "All rights reserved to the school",
    footer_privacy_policy: "Privacy Policy",
    footer_terms_conditions: "Terms & Conditions",
  },
};

type Translation = typeof translations.ar;

interface LanguageContextType {
  language: Language;
  t: Translation;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");

    if (savedLang === "ar" || savedLang === "en") {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = translations[language].dir;
    document.documentElement.lang = language;

    localStorage.setItem("lang", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        t: translations[language],
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

// const translations = {
//   ar: {
//     dir: "rtl",
//     // ... باقي المفاتيح القديمة ...

//     // Footer Keys
//     footer_cta_badge: "انضم إلى عائلتنا التعليمية",
//     footer_cta_title: "هل تبحث عن",
//     footer_cta_title_highlight: "مستقبل تعليمي مشرق",
//     footer_cta_title_end: "لأبنائك؟",
//     footer_cta_desc: "باب التسجيل مفتوح الآن للعام الدراسي الجديد. احجز مقعداً لأبنائك واستمتع بتجربة تعليمية فريدة ومتطورة.",
//     footer_apply_now: "قدم الآن",
//     footer_contact_admission: "تواصل مع القبول",
//     footer_brand_desc: "صرح تعليمي متميز يهدف إلى بناء جيل واعٍ ومبتكر عبر منصات تعليمية وبيئة تربوية حديثة.",
//     footer_follow_us: "تابعنا على شبكاتنا الاجتماعية",
//     footer_quick_links_title: "روابط سريعة واستكشاف",
//     footer_all_rights_reserved: "جميع الحقوق محفوظة للمدرسة",
//     footer_privacy_policy: "سياسة الخصوصية",
//     footer_terms_conditions: "الشروط والأحكام",
//   },

//   en: {
//     dir: "ltr",
//     // ... باقي المفاتيح القديمة ...

//     // Footer Keys
//     footer_cta_badge: "Join Our Educational Family",
//     footer_cta_title: "Are you looking for a",
//     footer_cta_title_highlight: "Bright Educational Future",
//     footer_cta_title_end: "for your children?",
//     footer_cta_desc: "Registration is now open for the new academic year. Reserve a seat for your children and enjoy a unique learning experience.",
//     footer_apply_now: "Apply Now",
//     footer_contact_admission: "Contact Admissions",
//     footer_brand_desc: "A distinguished educational institution aiming to build a conscious and innovative generation through modern platforms.",
//     footer_follow_us: "Follow us on social media",
//     footer_quick_links_title: "Quick Links & Explore",
//     footer_all_rights_reserved: "All rights reserved to the school",
//     footer_privacy_policy: "Privacy Policy",
//     footer_terms_conditions: "Terms & Conditions",
//   },
// };
