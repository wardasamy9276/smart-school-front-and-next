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

    hero_academy_badge: "أكاديمية سمارت اسكول الذكية",

    hero_title_start: "طور مهاراتك وانطلق نحو",
    hero_title_highlight: "مستقبلك الأكاديمي",

    hero_description:
      "اكتشف مجموعة متنوعة من الكورسات التعليمية المصممة لمساعدتك على تطوير مهاراتك وتحقيق أهدافك الأكاديمية.",

    explore_courses: "استكشف الدورات",
    browse_schools: "تصفح المدارس",

    /* =========================
       Dashboard
    ========================= */

    dashboard_title: "لوحة التحكم",

    dashboard_total_students: "إجمالي الطلاب",
    dashboard_students_desc: "عدد الطلاب المسجلين في النظام",

    dashboard_total_teachers: "إجمالي المعلمين",
    dashboard_teachers_desc: "عدد المعلمين المسجلين في النظام",

    dashboard_total_parents: "إجمالي أولياء الأمور",
    dashboard_parents_desc: "عدد أولياء الأمور المسجلين",

    dashboard_total_schools: "إجمالي المدارس",
    dashboard_schools_desc: "عدد المدارس المسجلة في النظام",

    dashboard_total_courses: "إجمالي الكورسات",
    dashboard_courses_desc: "عدد الكورسات المتاحة",

    dashboard_total_classes: "إجمالي الفصول",
    dashboard_classes_desc: "عدد الفصول الدراسية",

    dashboard_attendance: "الحضور والغياب",
    dashboard_attendance_desc: "إجمالي سجلات الحضور والغياب",

    dashboard_notifications: "الإشعارات",
    dashboard_notifications_desc: "عدد الإشعارات الموجودة",

    dashboard_elearning: "مركز التعلم الإلكتروني",
    dashboard_manage: "إدارة ومتابعة العملية التعليمية",

    dashboard_live_classes: "المحاضرات المباشرة",
    dashboard_live_classes_desc:
      "المحاضرات التي يمكن للطلاب الانضمام إليها الآن",

    dashboard_manage_classes: "إدارة المحاضرات",

    dashboard_upcoming_classes: "المحاضرات القادمة",
    dashboard_upcoming_desc: "المحاضرات المجدولة في النظام",

    dashboard_recorded_videos: "الفيديوهات المسجلة",
    dashboard_recorded_videos_desc: "مكتبة المحاضرات المسجلة للطلاب",

    dashboard_courses: "الكورسات",
    dashboard_courses_section_desc: "جميع الكورسات المتاحة في النظام",

    dashboard_manage_courses: "إدارة الكورسات",

    dashboard_articles: "المقالات",
    dashboard_articles_desc: "آخر المحتوى المنشور",

    dashboard_quick_actions: "إجراءات سريعة",
    dashboard_quick_actions_desc: "أهم الإجراءات لإدارة المنصة",

    dashboard_live_now: "مباشر الآن",

    dashboard_join_class: "انضم للمحاضرة",
    dashboard_start_class: "بدء محاضرة",
    dashboard_start_live_class: "بدء محاضرة مباشرة",

    dashboard_add_course: "إضافة كورس",
    dashboard_add_video: "إضافة فيديو مسجل",
    dashboard_add_article: "إضافة مقال",

    dashboard_watch_video: "مشاهدة الفيديو",
    dashboard_view_course: "عرض الكورس",
    dashboard_view_all: "عرض الكل",

    dashboard_video_library: "مكتبة الفيديوهات",
    dashboard_educational_content: "المحتوى التعليمي",
    dashboard_news_content: "الأخبار والمحتوى",

    dashboard_teacher: "المعلم",

    dashboard_no_live_classes: "لا توجد محاضرات مباشرة حاليًا",

    dashboard_no_upcoming_classes: "لا توجد محاضرات قادمة",

    dashboard_no_recorded_videos: "لا توجد فيديوهات مسجلة",

    dashboard_no_courses: "لا توجد كورسات متاحة",

    dashboard_no_articles: "لا توجد مقالات متاحة",

    dashboard_refresh: "تحديث",
    dashboard_warning: "تنبيه",
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

    schools: "Our Schools",
    view_details: "View Details",
    no_schools: "No Schools Found",

    school_default_desc:
      "A school that provides an integrated educational system and excellent educational services.",

    location: "Address",
    phone: "Phone",
    email: "Email",

    footer_cta_badge: "Join Our Educational Family",
    footer_cta_title: "Are you looking for a",
    footer_cta_title_highlight: "Bright Educational Future",
    footer_cta_title_end: "for your children?",

    footer_cta_desc:
      "Registration is now open for the new academic year. Reserve a seat for your children and enjoy a unique learning experience.",

    footer_apply_now: "Apply Now",
    footer_contact_admission: "Contact Admissions",

    footer_brand_desc:
      "A distinguished educational institution aiming to build a conscious and innovative generation through modern educational platforms and a modern educational environment.",

    footer_follow_us: "Follow us on social media",
    footer_quick_links_title: "Quick Links & Explore",

    footer_all_rights_reserved: "All rights reserved to the school",
    footer_privacy_policy: "Privacy Policy",
    footer_terms_conditions: "Terms & Conditions",

    hero_academy_badge: "Smart School Academy",

    hero_title_start: "Develop your skills and move toward",
    hero_title_highlight: "Your Academic Future",

    hero_description:
      "Discover a wide range of educational courses designed to help you develop your skills and achieve your academic goals.",

    explore_courses: "Explore Courses",
    browse_schools: "Browse Schools",

    /* =========================
       Dashboard
    ========================= */

    dashboard_title: "Dashboard",

    dashboard_total_students: "Total Students",
    dashboard_students_desc: "Number of students registered in the system",

    dashboard_total_teachers: "Total Teachers",
    dashboard_teachers_desc: "Number of teachers registered in the system",

    dashboard_total_parents: "Total Parents",
    dashboard_parents_desc: "Number of registered parents",

    dashboard_total_schools: "Total Schools",
    dashboard_schools_desc: "Number of schools registered in the system",

    dashboard_total_courses: "Total Courses",
    dashboard_courses_desc: "Number of available courses",

    dashboard_total_classes: "Total Classes",
    dashboard_classes_desc: "Number of classes in the system",

    dashboard_attendance: "Attendance",
    dashboard_attendance_desc: "Total attendance records",

    dashboard_notifications: "Notifications",
    dashboard_notifications_desc: "Number of available notifications",

    dashboard_elearning: "E-Learning Center",
    dashboard_manage: "Manage and monitor the learning process",

    dashboard_live_classes: "Live Classes",
    dashboard_live_classes_desc: "Classes that students can join right now",

    dashboard_manage_classes: "Manage Classes",

    dashboard_upcoming_classes: "Upcoming Classes",
    dashboard_upcoming_desc: "Scheduled classes in the system",

    dashboard_recorded_videos: "Recorded Videos",
    dashboard_recorded_videos_desc: "Library of recorded classes for students",

    dashboard_courses: "Courses",
    dashboard_courses_section_desc: "All courses available in the system",

    dashboard_manage_courses: "Manage Courses",

    dashboard_articles: "Articles",
    dashboard_articles_desc: "Latest published content",

    dashboard_quick_actions: "Quick Actions",
    dashboard_quick_actions_desc:
      "The most important actions for managing the platform",

    dashboard_live_now: "Live Now",

    dashboard_join_class: "Join Class",
    dashboard_start_class: "Start a Class",
    dashboard_start_live_class: "Start Live Class",

    dashboard_add_course: "Add Course",
    dashboard_add_video: "Add Recorded Video",
    dashboard_add_article: "Add Article",

    dashboard_watch_video: "Watch Video",
    dashboard_view_course: "View Course",
    dashboard_view_all: "View All",

    dashboard_video_library: "Video Library",
    dashboard_educational_content: "Manage Educational Content",

    dashboard_news_content: "News & Content",

    dashboard_teacher: "Teacher",

    dashboard_no_live_classes: "No live classes at the moment",

    dashboard_no_upcoming_classes: "No upcoming classes",

    dashboard_no_recorded_videos: "No recorded videos",

    dashboard_no_courses: "No courses available",

    dashboard_no_articles: "No articles available",

    dashboard_refresh: "Refresh",
    dashboard_warning: "Warning",
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
