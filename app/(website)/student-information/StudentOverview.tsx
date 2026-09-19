"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  Clock3,
  BookOpen,
  Users,
  X,
  UserRound,
  GraduationCap,
} from "lucide-react";

interface Instructor {
  name: string;
  role: string;
  avatar: string;
}

interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  instructor: Instructor;
  duration: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  price: string;
  image: string;
}

interface ApiCourse {
  id: number;
  course_id: string;
  title: string;
  category: string;
  description: string | null;
  instructor_name: string;
  instructor_role: string | null;
  instructor_avatar: string | null;
  duration: string | null;
  lessons_count: number;
  students_count: number;
  rating: number | string;
  price: string | null;
  image: string | null;
}

const API_URL = "http://127.0.0.1:8000/api/courses";

/* =========================================================
   النصوص العامة
========================================================= */

const TEXT = {
  ar: {
    courses: "الدورات التعليمية",
    heroDescription: "اكتشف الدورات التعليمية وطوّر مهاراتك مع أفضل المدرسين.",
    searchPlaceholder: "ابحث عن دورة...",
    searchResults: "نتائج البحث",
    searchFor: "نتائج البحث عن:",
    courseCount: "دورة",
    allCourses: "جميع الدورات",
    courseCountLabel: "عدد الدورات:",
    clearSearch: "مسح البحث",

    noCourses: "لا توجد دورات مطابقة",
    noCoursesDescription: "جربي كتابة اسم دورة أو مادة أخرى.",
    showAllCourses: "عرض كل الدورات",

    loading: "جاري تحميل الكورسات...",
    pleaseWait: "برجاء الانتظار",

    serverErrorTitle: "تعذر تحميل الكورسات",
    serverError: "تعذر تحميل الكورسات من السيرفر",
    retry: "إعادة المحاولة",

    details: "التفاصيل",
    enrollNow: "سجل الآن",
    enrolled: "تم التسجيل ✓",
    enrollCourse: "سجل في الدورة",

    duration: "مدة الدورة",
    lessons: "عدد الدروس",
    students: "الطلاب",
    student: "طالب",
    rating: "التقييم",
    studentRating: "تقييم الطلاب",
    coursePrice: "سعر الدورة",

    lesson: "درس",

    all: "الكل",
    technology: "تكنولوجيا",
    languages: "لغات وترجمة",
    selfDevelopment: "تطوير ذاتي",
    mathematics: "رياضيات",
  },

  en: {
    courses: "Educational Courses",
    heroDescription:
      "Discover educational courses and develop your skills with the best instructors.",
    searchPlaceholder: "Search for a course...",
    searchResults: "Search Results",
    searchFor: "Search results for:",
    courseCount: "courses",
    allCourses: "All Courses",
    courseCountLabel: "Number of courses:",
    clearSearch: "Clear Search",

    noCourses: "No matching courses",
    noCoursesDescription: "Try searching for another course or subject.",
    showAllCourses: "Show All Courses",

    loading: "Loading courses...",
    pleaseWait: "Please wait",

    serverErrorTitle: "Unable to load courses",
    serverError: "Unable to load courses from the server",
    retry: "Try Again",

    details: "Details",
    enrollNow: "Enroll Now",
    enrolled: "Enrolled ✓",
    enrollCourse: "Enroll in Course",

    duration: "Course Duration",
    lessons: "Lessons",
    students: "Students",
    student: "Student",
    rating: "Rating",
    studentRating: "Student Rating",
    coursePrice: "Course Price",

    lesson: "Lessons",

    all: "All",
    technology: "Technology",
    languages: "Languages & Translation",
    selfDevelopment: "Self Development",
    mathematics: "Mathematics",
  },
} as const;

/* =========================================================
   ترجمة بيانات الكورسات القادمة من Laravel
========================================================= */

const COURSE_TRANSLATIONS: Record<string, string> = {
  /* =========================
     Categories
  ========================= */

  تكنولوجيا: "Technology",
  "لغات وترجمة": "Languages & Translation",
  "تطوير ذاتي": "Self Development",
  رياضيات: "Mathematics",

  /* =========================
     Technology
  ========================= */

  "أساسيات البرمجة وعلوم الحاسب للأطفال":
    "Programming & Computer Science Basics for Children",

  "دورة تفاعلية تهدف لتعليم الأطفال مبادئ البرمجة والتفكير المنطقي باستخدام أحدث الوسائل.":
    "An interactive course that teaches children programming basics and logical thinking using modern learning methods.",

  "أ. أحمد محمود": "Mr. Ahmed Mahmoud",
  "معلم حاسب آلي": "Computer Science Teacher",

  "الروبوتات التعليمية ومشاريع الذكاء الاصطناعي":
    "Educational Robotics & Artificial Intelligence Projects",

  "اكتشف عالم الروبوتات وتصميم الدوائر الذكية وبرمجتها بطريقة عملية وممتعة.":
    "Discover robotics, smart circuit design, and programming in a practical and enjoyable way.",

  "م. خالد عمر": "Eng. Khaled Omar",
  "مهندس ميكاترونكس": "Mechatronics Engineer",

  "تصميم واجهات المستخدم UI/UX للمبتدئين": "UI/UX Design for Beginners",

  "تعلم أساسيات تصميم التطبيقات والمواقع وجعلها سهلة وجذابة للمستخدمين.":
    "Learn the basics of application and website design and make them easy and attractive for users.",

  "أ. ريم خالد": "Ms. Reem Khaled",
  "مصممة واجهات": "UI Designer",

  "تطوير تطبيقات الجوال بلغة سويفت": "Mobile App Development with Swift",

  "اصنع تطبيقاتك الخاصة لأجهزة آبل بكل مساعدة وسهولة من الصفر حتى الاحتراف.":
    "Build your own Apple applications from scratch to professional level with ease.",

  "م. طارق العلي": "Eng. Tarek Al Ali",
  "مطور تطبيقات": "Application Developer",

  "مقدمة في الأمن السيبراني وحماية البيانات":
    "Introduction to Cybersecurity & Data Protection",

  "تعرف على كيفية تأمين حساباتك الشخصية وفهم أساسيات الحماية الرقمية.":
    "Learn how to secure your personal accounts and understand the basics of digital protection.",

  "د. سامر النجار": "Dr. Samer Al Najjar",
  "خبير أمن معلومات": "Information Security Expert",

  "تحليل البيانات باستخدام بايثون": "Data Analysis Using Python",

  "دورة عملية لتحويل البيانات العشوائية إلى رسومات بيانية وتقارير مفيدة.":
    "A practical course for transforming raw data into useful charts and reports.",

  "أ. هبة الله": "Ms. Heba Allah",
  "محللة بيانات": "Data Analyst",

  /* =========================
     Languages
  ========================= */

  "البرنامج المتقدم للغة الإنجليزية (تحدث وكتابة)":
    "Advanced English Program (Speaking & Writing)",

  "تطوير مهارات المحادثة والاستماع والقواعد بأسلوب تفاعلي يناسب مختلف المراحل.":
    "Develop speaking, listening, and grammar skills through an interactive approach suitable for different levels.",

  "د. سارة أحمد": "Dr. Sara Ahmed",
  "خريجة تدريس دولي": "International Teaching Graduate",

  "أساسيات الترجمة الفورية والتحريرية":
    "Basics of Simultaneous & Written Translation",

  "تعلم قواعد وأصول الترجمة الاحترافية بين اللغة العربية والإنجليزية بدقة.":
    "Learn the rules and principles of professional Arabic-English translation accurately.",

  "أ. ماجد عبد الله": "Mr. Magdy Abdullah",
  "مترجم معتمد": "Certified Translator",

  "اللغة الفرنسية للمبتدئين من الصفر": "French for Beginners from Scratch",

  "ابدأ رحلتك في تعلم الفرنسية بطريقة ممتعة وبسيطة وسهلة الفهم.":
    "Start your French learning journey in a fun, simple, and easy-to-understand way.",

  "أ. ماري لوران": "Ms. Marie Laurent",
  "معلمة لغة فرنسية": "French Language Teacher",

  "مهارات الإلقاء والمحادثة باللغة الإنجليزية":
    "English Presentation & Conversation Skills",

  "تخلص من الخوف وتحدث بطلاقة أمام الجمهور والنقاشات الحية.":
    "Overcome fear and speak fluently in front of audiences and during live discussions.",

  "مدربة محادثة": "Conversation Trainer",

  "اللغة الألمانية للمراحل الدراسية": "German Language for School Levels",

  "أساسيات القواعد والمفردات الألمانية بطرق تدريس حديثة.":
    "German grammar and vocabulary basics using modern teaching methods.",

  "أ. هانس فيبر": "Mr. Hans Weber",
  "معلم لغة ألمانية": "German Language Teacher",

  "إعداد اختبارات الإنجليزي الدولية (IELTS / TOEFL)":
    "International English Test Preparation (IELTS / TOEFL)",

  "استراتيجيات مجربة للحصول على أعلى الدرجات في اختبارات إتقان اللغة.":
    "Proven strategies to achieve high scores in English proficiency tests.",

  "د. جون سميث": "Dr. John Smith",
  "مختبر دولي": "International Examiner",

  /* =========================
     Self Development
  ========================= */

  "تنمية الذاكرة ومهارات التفكير الإبداعي":
    "Memory Development & Creative Thinking Skills",

  "تقنيات حديثة لزيادة التركيز، سرعة الحفظ، وتنظيم الوقت للتفوق الدراسي.":
    "Modern techniques to improve focus, memory, and time management for academic success.",

  "أ. محمد إبراهيم": "Mr. Mohamed Ibrahim",
  "مدرب تنمية بشرية": "Human Development Trainer",

  "فن الإلقاء والخطابة وثقة النفس للشباب":
    "Public Speaking & Self-Confidence for Youth",

  "كيف تقف أمام الجمهور وتلقي خطاباً مؤثراً بثبات وجاذبية.":
    "Learn how to stand before an audience and deliver an impactful speech with confidence.",

  "أ. ليلى حسن": "Ms. Laila Hassan",
  "مدربة مهارات حياة": "Life Skills Trainer",

  "إدارة الوقت وتنظيم جدول المذاكرة اليومي":
    "Time Management & Daily Study Planning",

  "تخلص من التسويف وضاعف إنجازك الدراسي واليومي بخطوات بسيطة.":
    "Overcome procrastination and improve your academic and daily productivity with simple steps.",

  "مهارات القيادة وحل المشكلات للناشئين":
    "Leadership & Problem-Solving Skills for Young Students",

  "بناء الشخصية القيادية القادرة على اتخاذ القرار الصحيح في الأوقات الصعبة.":
    "Build leadership skills and the ability to make the right decisions in difficult situations.",

  "د. حسام الدين": "Dr. Hossam El Din",
  "استشاري تربوي": "Educational Consultant",

  "الذكاء العاطفي وبناء العلاقات الإيجابية":
    "Emotional Intelligence & Building Positive Relationships",

  "كيف تفهم مشاعرك ومشاعر الآخرين لتحسين علاقاتك الاجتماعية.":
    "Learn how to understand your emotions and others' emotions to improve your social relationships.",

  "أساسيات ريادة الأعمال ومشاريع الطلاب":
    "Entrepreneurship Basics & Student Projects",

  "كيف تحول فكرتك البسيطة إلى مشروع تجاري ناجح ومستدام.":
    "Learn how to turn your simple idea into a successful and sustainable business.",

  "أ. زياد عبد الله": "Mr. Ziad Abdullah",
  "رائد أعمال": "Entrepreneur",

  /* =========================
     Mathematics
  ========================= */

  "أسرار التفوق في الرياضيات والقدرات":
    "Secrets of Excellence in Mathematics & Aptitude Tests",

  "استراتيجيات ذهنية وحلول سريعة للمسائل المعقدة واختبارات القدرات.":
    "Mental strategies and quick solutions for complex problems and aptitude tests.",

  "أ. فاطمة الزهراء": "Ms. Fatma Al Zahraa",
  "معلمة رياضيات خبيرة": "Expert Mathematics Teacher",

  "المهارات المتقدمة في الجبر والهندسة": "Advanced Algebra & Geometry Skills",

  "فهم عميق للنظريات الرياضية وطرق حل المسائل بطرق إبداعية.":
    "Gain a deep understanding of mathematical theories and creative problem-solving methods.",

  "د. إبراهيم عادل": "Dr. Ibrahim Adel",
  "أستاذ رياضيات": "Mathematics Professor",

  "الحساب الذهني السريع وتنمية الذكاء":
    "Fast Mental Math & Intelligence Development",

  "تدريبات يومية لحساب العمليات الكبيرة في سرعة البرق بدون آلة حاسبة.":
    "Daily exercises for solving large calculations quickly without a calculator.",

  "مقدمة في علم الإحصاء والاحتمالات":
    "Introduction to Statistics & Probability",

  "تطبيق مفاهيم الإحصاء وتحليل الاحتمالات بأسلوب سهل وبسيط.":
    "Learn statistics and probability concepts through a simple and easy approach.",

  "التفاضل والتكامل للمرحلة الثانوية": "Calculus for Secondary School",

  "شرح مبسط ومفصل لمناهج التفاضل والتكامل مع أمثلة امتحانية.":
    "A simple and detailed explanation of calculus with exam examples.",

  "أ. سعيد عبد الرحيم": "Mr. Saeed Abdel Rahim",
  "معلم أول رياضيات": "Senior Mathematics Teacher",

  "الأولمبياد في الرياضيات للطلاب المتميزين":
    "Mathematics Olympiad for Outstanding Students",

  "مسائل تحدي واستراتيجيات عليا لحل مسابقات الرياضيات الدولية.":
    "Challenging problems and advanced strategies for solving international mathematics competitions.",
};

/* =========================================================
   ترجمة النص القادم من Laravel
========================================================= */

function translateText(text: string, language: "ar" | "en") {
  if (!text) return "";

  if (language === "ar") {
    return text;
  }

  return COURSE_TRANSLATIONS[text] || text;
}

/* =========================================================
   ترجمة المدة
========================================================= */

function translateDuration(text: string, language: "ar" | "en") {
  if (!text) return "";

  if (language === "ar") {
    return text;
  }

  return text
    .replaceAll("أسبوعاً", "weeks")
    .replaceAll("أسابيع", "weeks")
    .replaceAll("أسبوع", "week")
    .replaceAll("شهور", "months")
    .replaceAll("شهر", "month")
    .replaceAll("أيام", "days")
    .replaceAll("يوم", "day")
    .replaceAll("ساعات", "hours")
    .replaceAll("ساعة", "hour")
    .replaceAll("دقائق", "minutes")
    .replaceAll("دقيقة", "minute");
}

/* =========================================================
   ترجمة السعر
========================================================= */

function translatePrice(text: string, language: "ar" | "en") {
  if (!text) return "";

  if (language === "ar") {
    return text;
  }

  return text.replaceAll("مجاني", "Free").replaceAll("ر.س", "SAR");
}

/* =========================================================
   الصفحة
========================================================= */

export default function SmartSchoolsCoursesPage() {
  const { language } = useLanguage();

  const currentLanguage: "ar" | "en" = language === "en" ? "en" : "ar";

  const isArabic = currentLanguage === "ar";
  const text = TEXT[currentLanguage];

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  /* =========================================================
     التصنيفات
  ========================================================= */

  const categories = [
    {
      key: "الكل",
      label: text.all,
    },
    {
      key: "تكنولوجيا",
      label: text.technology,
    },
    {
      key: "لغات وترجمة",
      label: text.languages,
    },
    {
      key: "تطوير ذاتي",
      label: text.selfDevelopment,
    },
    {
      key: "رياضيات",
      label: text.mathematics,
    },
  ];

  /* =========================================================
     جلب الكورسات من Laravel
  ========================================================= */

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data: ApiCourse[] = await response.json();

      const mappedCourses: Course[] = data.map((course) => ({
        id: course.course_id,

        title: course.title,

        category: course.category,

        description: course.description || "",

        instructor: {
          name: course.instructor_name,
          role: course.instructor_role || "",
          avatar: course.instructor_avatar || "",
        },

        duration: course.duration || "",

        lessonsCount: Number(course.lessons_count),

        studentsCount: Number(course.students_count),

        rating: Number(course.rating),

        price: course.price || "",

        image: course.image || "",
      }));

      setCourses(mappedCourses);
    } catch (err) {
      console.error(err);
      setError(text.serverError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* =========================================================
     البحث + التصنيف
  ========================================================= */

  const filteredCourses = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return courses.filter((course) => {
      const translatedTitle = translateText(course.title, currentLanguage);

      const translatedDescription = translateText(
        course.description,
        currentLanguage,
      );

      const translatedCategory = translateText(
        course.category,
        currentLanguage,
      );

      const translatedInstructor = translateText(
        course.instructor.name,
        currentLanguage,
      );

      const translatedRole = translateText(
        course.instructor.role,
        currentLanguage,
      );

      const matchesCategory =
        selectedCategory === "الكل" || course.category === selectedCategory;

      const matchesSearch =
        search === "" ||
        translatedTitle.toLowerCase().includes(search) ||
        translatedDescription.toLowerCase().includes(search) ||
        translatedCategory.toLowerCase().includes(search) ||
        translatedInstructor.toLowerCase().includes(search) ||
        translatedRole.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchTerm, currentLanguage]);

  /* =========================================================
     التسجيل
  ========================================================= */

  const handleEnroll = (courseId: string) => {
    setEnrolledCourses((prev) => {
      if (prev.includes(courseId)) {
        return prev;
      }

      return [...prev, courseId];
    });
  };

  /* =========================================================
     Loading
  ========================================================= */

  if (loading) {
    return (
      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="min-h-screen bg-[#f8fafc] px-4 py-16"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <div className="rounded-[28px] bg-white px-10 py-8 text-center shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#e2e8f0] border-t-[#0e7490]" />

            <p className="text-lg font-bold text-[#334155]">{text.loading}</p>

            <p className="mt-2 text-sm text-[#94a3b8]">{text.pleaseWait}</p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     Error
  ========================================================= */

  if (error) {
    return (
      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="min-h-screen bg-[#f8fafc] px-4 py-16"
      >
        <div className="mx-auto max-w-xl">
          <div className="rounded-[28px] bg-white p-10 text-center shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f7fa]">
              <X className="h-8 w-8 text-[#0e7490]" />
            </div>

            <h2 className="text-2xl font-black text-[#0e7490]">
              {text.serverErrorTitle}
            </h2>

            <p className="mt-3 text-[#0e7490]">{error}</p>

            <button
              onClick={fetchCourses}
              className="mt-6 rounded-2xl bg-[#0e7490] px-6 py-3 font-bold text-white transition hover:bg-[#0b5f75]"
            >
              {text.retry}
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#f8fafc]">
      {/* =========================
          Header
      ========================= */}

      <section className="border-b border-[#d7eef3] bg-gradient-to-l from-[#eaf8fb] via-white to-[#f0fafc]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#dff3f7]">
            <GraduationCap className="h-10 w-10 text-[#0e7490]" />
          </div>

          <h1 className="text-4xl font-black text-[#0e7490] md:text-5xl">
            {text.courses}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#0e7490] md:text-lg">
            {text.heroDescription}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        {/* =========================
            Search
        ========================= */}

        <div className="mx-auto mb-8 max-w-2xl">
          <div className="relative">
            <Search
              className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] ${
                isArabic ? "right-5" : "left-5"
              }`}
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={text.searchPlaceholder}
              className={`w-full rounded-[22px] border border-[#0e7490] bg-white py-4 text-[#0e7490] shadow-[0_8px_30px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-[#94a3b8] focus:ring-4 focus:ring-[#dff3f7] ${
                isArabic ? "pl-14 pr-14 text-right" : "pl-14 pr-14 text-left"
              }`}
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className={`absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#f1f5f9] text-[#0e7490] transition hover:bg-[#dff3f7] ${
                  isArabic ? "left-4" : "right-4"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {searchTerm.trim() && (
            <div
              className={`mt-4 rounded-2xl border border-[#d7eef3] bg-[#eefafd] px-5 py-3 text-sm text-[#64748b] ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {text.searchFor}

              <span className="mx-2 font-black text-[#0e7490]">
                {searchTerm}
              </span>

              <span className="text-[#0e7490]">
                ({filteredCourses.length} {text.courseCount})
              </span>
            </div>
          )}
        </div>

        {/* =========================
            Categories
        ========================= */}

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const active = selectedCategory === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => setSelectedCategory(category.key)}
                className={`rounded-full px-6 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-[#0e7490] text-white shadow-lg shadow-[#0e7490]/30"
                    : "border border-[#0e7490] bg-white text-[#0e7490] shadow-sm hover:bg-[#eefafd]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* =========================
            Result Count
        ========================= */}

        <div
          className={`mb-6 flex items-center justify-between gap-4 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <div>
            <h2 className="text-2xl font-black text-[#1e293b]">
              {searchTerm.trim()
                ? text.searchResults
                : selectedCategory !== "الكل"
                  ? translateText(selectedCategory, currentLanguage)
                  : text.allCourses}
            </h2>

            <p className="mt-1 text-sm text-[#0e7490]">
              {text.courseCountLabel}

              <span className="mx-1 font-black">{filteredCourses.length}</span>
            </p>
          </div>

          {(searchTerm || selectedCategory !== "الكل") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("الكل");
              }}
              className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-bold text-[#64748b] shadow-sm transition hover:border-[#0e7490] hover:bg-[#eefafd] hover:text-[#0e7490]"
            >
              {text.clearSearch}
            </button>
          )}
        </div>

        {/* =========================
            No Results
        ========================= */}

        {filteredCourses.length === 0 ? (
          <div className="rounded-[28px] border border-[#0e7490] bg-white px-6 py-16 text-center shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#eefafd]">
              <Search className="h-9 w-9 text-[#0e7490]" />
            </div>

            <h3 className="text-2xl font-black text-[#0e7490]">
              {text.noCourses}
            </h3>

            <p className="mt-3 text-[#0e7490]">{text.noCoursesDescription}</p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("الكل");
              }}
              className="mt-6 rounded-2xl bg-[#0e7490] px-7 py-3 font-bold text-white transition hover:bg-[#0b5f75]"
            >
              {text.showAllCourses}
            </button>
          </div>
        ) : (
          /* =========================
             Courses
          ========================= */

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.id);

              const courseTitle = translateText(course.title, currentLanguage);

              const courseDescription = translateText(
                course.description,
                currentLanguage,
              );

              const courseCategory = translateText(
                course.category,
                currentLanguage,
              );

              const instructorName = translateText(
                course.instructor.name,
                currentLanguage,
              );

              const instructorRole = translateText(
                course.instructor.role,
                currentLanguage,
              );

              const duration = translateDuration(
                course.duration,
                currentLanguage,
              );

              const price = translatePrice(course.price, currentLanguage);

              return (
                <article
                  key={course.id}
                  className="group overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#0e7490] hover:shadow-[0_18px_45px_rgba(14,116,144,0.14)]"
                >
                  {/* Image */}

                  <div className="relative h-52 overflow-hidden">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={courseTitle}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#eefafd]">
                        <GraduationCap className="h-16 w-16 text-[#0e7490]" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    <div className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/95 px-4 py-2 text-xs font-black text-[#0e7490]">
                      {courseCategory}
                    </div>

                    <div className="absolute bottom-4 right-4 rounded-full bg-[#1e293b]/75 px-4 py-1.5 text-xs font-bold text-white backdrop-blur">
                      {price}
                    </div>
                  </div>

                  {/* Content */}

                  <div className="p-5">
                    <h3 className="line-clamp-2 min-h-[56px] text-xl font-black leading-7 text-[#1e293b]">
                      {courseTitle}
                    </h3>

                    <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-[#64748b]">
                      {courseDescription}
                    </p>

                    {/* Instructor */}

                    <div className="mt-5 flex items-center gap-3 border-t border-[#f1f5f9] pt-4">
                      {course.instructor.avatar ? (
                        <img
                          src={course.instructor.avatar}
                          alt={instructorName}
                          className="h-11 w-11 rounded-full object-cover ring-2 ring-[#dff3f7]"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eefafd] text-[#0e7490]">
                          <UserRound className="h-5 w-5" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-bold text-[#334155]">
                          {instructorName}
                        </p>

                        <p className="truncate text-xs text-[#94a3b8]">
                          {instructorRole}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="rounded-2xl bg-[#f8fafc] p-3 text-center">
                        <Clock3 className="mx-auto mb-1 h-4 w-4 text-[#0e7490]" />

                        <p className="text-xs font-bold text-[#64748b]">
                          {duration}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#f8fafc] p-3 text-center">
                        <BookOpen className="mx-auto mb-1 h-4 w-4 text-[#0e7490]" />

                        <p className="text-xs font-bold text-[#64748b]">
                          {course.lessonsCount} {text.lesson}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#f8fafc] p-3 text-center">
                        <Users className="mx-auto mb-1 h-4 w-4 text-[#0e7490]" />

                        <p className="text-xs font-bold text-[#64748b]">
                          {course.studentsCount}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]" />

                        <span className="font-black text-[#334155]">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>

                      <span className="text-xs text-[#94a3b8]">
                        {text.studentRating}
                      </span>
                    </div>

                    {/* Buttons */}

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCourse(course)}
                        className="flex-1 rounded-2xl border border-[#0e7490] bg-[#eefafd] py-3 text-sm font-black text-[#0e7490] transition hover:bg-[#dff3f7]"
                      >
                        {text.details}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEnroll(course.id)}
                        disabled={isEnrolled}
                        className={`flex-1 rounded-2xl py-3 text-sm font-black text-white transition ${
                          isEnrolled
                            ? "cursor-default bg-[#10b981]"
                            : "bg-[#0e7490] hover:bg-[#0b5f75]"
                        }`}
                      >
                        {isEnrolled ? text.enrolled : text.enrollNow}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================
          Course Details Modal
      ===================================================== */}

      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}

            <div className="relative h-64 overflow-hidden">
              {selectedCourse.image ? (
                <img
                  src={selectedCourse.image}
                  alt={translateText(selectedCourse.title, currentLanguage)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#eefafd]">
                  <GraduationCap className="h-20 w-20 text-[#0e7490]" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#334155] shadow-lg transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-5 right-5 left-5">
                <div className="mb-2 inline-flex rounded-full bg-white/95 px-4 py-2 text-xs font-black text-[#0e7490]">
                  {translateText(selectedCourse.category, currentLanguage)}
                </div>

                <h2 className="text-2xl font-black leading-9 text-white md:text-3xl">
                  {translateText(selectedCourse.title, currentLanguage)}
                </h2>
              </div>
            </div>

            {/* Modal Content */}

            <div className="p-6 md:p-8">
              <p className="text-base leading-8 text-[#64748b]">
                {translateText(selectedCourse.description, currentLanguage)}
              </p>

              {/* Instructor */}

              <div className="mt-7 rounded-2xl bg-[#eefafd] p-5">
                <div className="flex items-center gap-4">
                  {selectedCourse.instructor.avatar ? (
                    <img
                      src={selectedCourse.instructor.avatar}
                      alt={translateText(
                        selectedCourse.instructor.name,
                        currentLanguage,
                      )}
                      className="h-16 w-16 rounded-full object-cover ring-4 ring-white"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dff3f7] text-[#0e7490]">
                      <UserRound className="h-7 w-7" />
                    </div>
                  )}

                  <div>
                    <p className="text-lg font-black text-[#1e293b]">
                      {translateText(
                        selectedCourse.instructor.name,
                        currentLanguage,
                      )}
                    </p>

                    <p className="mt-1 text-sm text-[#64748b]">
                      {translateText(
                        selectedCourse.instructor.role,
                        currentLanguage,
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e2e8f0] p-5">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 text-[#0e7490]" />

                    <div>
                      <p className="text-xs text-[#94a3b8]">{text.duration}</p>

                      <p className="mt-1 font-black text-[#334155]">
                        {translateDuration(
                          selectedCourse.duration,
                          currentLanguage,
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#e2e8f0] p-5">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-[#0e7490]" />

                    <div>
                      <p className="text-xs text-[#94a3b8]">{text.lessons}</p>

                      <p className="mt-1 font-black text-[#334155]">
                        {selectedCourse.lessonsCount} {text.lesson}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#e2e8f0] p-5">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[#0e7490]" />

                    <div>
                      <p className="text-xs text-[#94a3b8]">{text.students}</p>

                      <p className="mt-1 font-black text-[#334155]">
                        {selectedCourse.studentsCount} {text.student}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#e2e8f0] p-5">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]" />

                    <div>
                      <p className="text-xs text-[#94a3b8]">{text.rating}</p>

                      <p className="mt-1 font-black text-[#334155]">
                        {selectedCourse.rating.toFixed(1)} / 5
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price + Enroll */}

              <div className="mt-7 flex flex-col gap-4 rounded-2xl bg-[#eefafd] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-[#64748b]">{text.coursePrice}</p>

                  <p className="mt-1 text-2xl font-black text-[#0e7490]">
                    {translatePrice(selectedCourse.price, currentLanguage)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleEnroll(selectedCourse.id)}
                  disabled={enrolledCourses.includes(selectedCourse.id)}
                  className={`rounded-2xl px-8 py-3 font-black text-white transition ${
                    enrolledCourses.includes(selectedCourse.id)
                      ? "cursor-default bg-[#10b981]"
                      : "bg-[#0e7490] hover:bg-[#0b5f75]"
                  }`}
                >
                  {enrolledCourses.includes(selectedCourse.id)
                    ? text.enrolled
                    : text.enrollCourse}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
