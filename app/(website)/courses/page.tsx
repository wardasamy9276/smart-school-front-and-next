"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  PlayCircle,
  X,
  CheckCircle2,
  User,
} from "lucide-react";

interface Course {
  id: number;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  instructorAr: string;
  instructorEn: string;
  rating: number;
  reviewsCount: number;
  durationAr: string;
  durationEn: string;
  lessonsCount: number;
  levelAr: string;
  levelEn: string;
  priceAr: string;
  priceEn: string;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
}

const mockCourses: Course[] = [
  {
    id: 1,
    titleAr: "إدارة المؤسسات التعليمية باستخدام أنظمة ERP",
    titleEn: "Educational Institutions Management Using ERP",
    categoryAr: "الإدارة التكنولوجية",
    categoryEn: "Tech Management",
    instructorAr: "د. أحمد المنشاوي",
    instructorEn: "Dr. Ahmed El-Menshawi",
    rating: 4.9,
    reviewsCount: 145,
    durationAr: "15 ساعة",
    durationEn: "15 Hours",
    lessonsCount: 24,
    levelAr: "متقدم",
    levelEn: "Advanced",
    priceAr: "مجاني / مدعوم",
    priceEn: "Free / Supported",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "دورة شاملة لتعلم كيفية ميكنة شؤون الطلاب، الحضور والانصراف، والكنترول الإلكتروني داخل المدارس والمجمعات التعليمية الحديثة.",
    descriptionEn:
      "A comprehensive course on automating student affairs, attendance tracking, and electronic grading within modern educational complexes.",
  },
  {
    id: 2,
    titleAr: "تطوير واجهات المستخدم بـ Next.js و Tailwind CSS",
    titleEn: "Frontend Development with Next.js & Tailwind",
    categoryAr: "تطوير الويب",
    categoryEn: "Web Development",
    instructorAr: "م. وردة سامي",
    instructorEn: "Eng. Warda Samy",
    rating: 4.95,
    reviewsCount: 210,
    durationAr: "20 ساعة",
    durationEn: "20 Hours",
    lessonsCount: 32,
    levelAr: "متوسط إلى متقدم",
    levelEn: "Intermediate to Advanced",
    priceAr: "مشمول بالاشتراك",
    priceEn: "Included in Subscription",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "احتراف بناء تطبيقات الويب السريعة والمتجاوبة باستخدام أحدث تقنيات الفرونت إند وأنماط التصميم العصري مثل الـ Glassmorphism.",
    descriptionEn:
      "Master building fast and responsive web apps using cutting-edge frontend technologies and modern UI patterns like glassmorphism.",
  },
  {
    id: 3,
    titleAr: "تصميم أنظمة التعليم عن بعد عبر Google Meet",
    titleEn: "Designing Remote Learning Systems via Google Meet",
    categoryAr: "التعليم الرقمي",
    categoryEn: "Digital Education",
    instructorAr: "أ. محمود عبد الله",
    instructorEn: "Mr. Mahmoud Abdullah",
    rating: 4.7,
    reviewsCount: 92,
    durationAr: "8 ساعات",
    durationEn: "8 Hours",
    lessonsCount: 14,
    levelAr: "مبتدئ",
    levelEn: "Beginner",
    priceAr: "مجاني",
    priceEn: "Free",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "دورة مخصصة للمعلمين لإدارة الفصول الافتراضية باحترافية، تفاعل الطلاب، وتسجيل المحاضرات اونلاين.",
    descriptionEn:
      "A specialized course for teachers on managing virtual classrooms professionally, student interaction, and recording online lectures.",
  },
  {
    id: 4,
    titleAr: "أساسيات برمجة قواعد البيانات Laravel و MySQL",
    titleEn: "Laravel & MySQL Database Backend Basics",
    categoryAr: "البرمجة الخلفية",
    categoryEn: "Backend Development",
    instructorAr: "م. خالد الفقي",
    instructorEn: "Eng. Khaled El-Fiky",
    rating: 4.8,
    reviewsCount: 178,
    durationAr: "25 ساعة",
    durationEn: "25 Hours",
    lessonsCount: 40,
    levelAr: "متوسط",
    levelEn: "Intermediate",
    priceAr: "مدفوع",
    priceEn: "Paid",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "تعلم كيفية بناء RESTful APIs وتأمين قواعد البيانات وربطها بالواجهات الأمامية بذكاء واحترافية عالية.",
    descriptionEn:
      "Learn how to build RESTful APIs, secure databases, and connect them smartly and professionally to frontend interfaces.",
  },
  {
    id: 5,
    titleAr: "القيادة المدرسية الحديثة وتطوير المعلمين",
    titleEn: "Modern School Leadership & Teacher Development",
    categoryAr: "الإدارة التربوية",
    categoryEn: "Educational Management",
    instructorAr: "د. سناء عبد الحليم",
    instructorEn: "Dr. Sanaa Abdel Halim",
    rating: 4.6,
    reviewsCount: 64,
    durationAr: "12 ساعة",
    durationEn: "12 Hours",
    lessonsCount: 18,
    levelAr: "متقدم",
    levelEn: "Advanced",
    priceAr: "مدعوم",
    priceEn: "Supported",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "استراتيجيات تقييم الأداء المدرسي، إدارة النزاعات، وتحفيز الكوادر التعليمية لتحقيق نتائج مبهرة.",
    descriptionEn:
      "Strategies for school performance evaluation, conflict management, and motivating educational staff to achieve outstanding results.",
  },
  {
    id: 6,
    titleAr: "تطوير تطبيقات الجوال التعليمية المتقدمة",
    titleEn: "Advanced Educational Mobile Apps Development",
    categoryAr: "تطوير الموبايل",
    categoryEn: "Mobile Development",
    instructorAr: "م. طارق حسن",
    instructorEn: "Eng. Tarek Hassan",
    rating: 4.9,
    reviewsCount: 115,
    durationAr: "30 ساعة",
    durationEn: "30 Hours",
    lessonsCount: 45,
    levelAr: "متقدم",
    levelEn: "Advanced",
    priceAr: "مدفوع",
    priceEn: "Paid",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "بناء تطبيقات الهواتف الذكية المخصصة للمدارس لمتابعة أولياء الأمور لدرجات أبنائهم وجداولهم اليومية.",
    descriptionEn:
      "Building smart mobile apps dedicated to schools for parents to track their children's grades and daily schedules.",
  },
  {
    id: 7,
    titleAr: "مهارات الذكاء الاصطناعي للمعلمين والطلاب",
    titleEn: "AI Skills for Teachers and Students",
    categoryAr: "الذكاء الاصطناعي",
    categoryEn: "Artificial Intelligence",
    instructorAr: "د. رامي العطار",
    instructorEn: "Dr. Rami El-Attar",
    rating: 4.95,
    reviewsCount: 155,
    durationAr: "10 ساعات",
    durationEn: "10 Hours",
    lessonsCount: 16,
    levelAr: "مبتدئ إلى متوسط",
    levelEn: "Beginner to Intermediate",
    priceAr: "مجاني",
    priceEn: "Free",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "كيفية دمج أدوات الذكاء الاصطناعي وتوليد المحتوى التعليمي الذكي داخل الفصول الدراسية الرقمية.",
    descriptionEn:
      "How to integrate AI tools and smart educational content generation inside digital classrooms.",
  },
  {
    id: 8,
    titleAr: "تصميم واجهات المستخدم UI/UX للمنصات التعليمية",
    titleEn: "UI/UX Design for Educational Platforms",
    categoryAr: "التصميم والتجربة",
    categoryEn: "Design & UX",
    instructorAr: "م. ليلى سمير",
    instructorEn: "Eng. Leila Samir",
    rating: 4.85,
    reviewsCount: 130,
    durationAr: "18 ساعة",
    durationEn: "18 Hours",
    lessonsCount: 28,
    levelAr: "متوسط",
    levelEn: "Intermediate",
    priceAr: "مدفوع",
    priceEn: "Paid",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "أسس تصميم تجربة المستخدم وتطبيق واجهات سلسة وجذابة تناسب الطلاب وأولياء الأمور في المنصات التعليمية.",
    descriptionEn:
      "Foundations of UX design and creating smooth, engaging interfaces suitable for students and parents in educational platforms.",
  },
  {
    id: 9,
    titleAr: "أمن المعلومات وحماية البيانات المدرسية",
    titleEn: "Information Security & School Data Protection",
    categoryAr: "الأمن السيبراني",
    categoryEn: "Cyber Security",
    instructorAr: "د. هشام الصفتي",
    instructorEn: "Dr. Hisham El-Safty",
    rating: 4.9,
    reviewsCount: 88,
    durationAr: "14 ساعة",
    durationEn: "14 Hours",
    lessonsCount: 20,
    levelAr: "متقدم",
    levelEn: "Advanced",
    priceAr: "مدعوم",
    priceEn: "Supported",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "حماية قواعد بيانات المدارس وسجلات الطلاب من الاختراق وتطبيق أفضل معايير الأمان الرقمي.",
    descriptionEn:
      "Protecting school databases and student records from breaches and applying top digital security standards.",
  },
  {
    id: 10,
    titleAr: "التسويق الرقمي للمؤسسات والمدارس الخاصة",
    titleEn: "Digital Marketing for Private Schools & Institutions",
    categoryAr: "التسويق الرقمي",
    categoryEn: "Digital Marketing",
    instructorAr: "أ. مروة الشريف",
    instructorEn: "Ms. Marwa El-Sherif",
    rating: 4.65,
    reviewsCount: 74,
    durationAr: "10 ساعات",
    durationEn: "10 Hours",
    lessonsCount: 15,
    levelAr: "مبتدئ",
    levelEn: "Beginner",
    priceAr: "مجاني",
    priceEn: "Free",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "استراتيجيات استقطاب الطلاب الجدد، إدارة الحملات الإعلانية الممولة، وتحسين ظهور المدارس على محركات البحث.",
    descriptionEn:
      "Strategies for attracting new students, managing paid ad campaigns, and improving school visibility on search engines.",
  },
  {
    id: 11,
    titleAr: "إدارة الحسابات والماليات المدرسية بـ Excel و ERP",
    titleEn: "School Finance & Accounting Management",
    categoryAr: "الإدارة المالية",
    categoryEn: "Financial Management",
    instructorAr: "أ. عماد الدين فاروق",
    instructorEn: "Mr. Emad El-Din Farouk",
    rating: 4.75,
    reviewsCount: 102,
    durationAr: "16 ساعة",
    durationEn: "16 Hours",
    lessonsCount: 22,
    levelAr: "متوسط",
    levelEn: "Intermediate",
    priceAr: "مدفوع",
    priceEn: "Paid",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "تنظيم المصروفات الدراسية، متابعة الأقساط، وإعداد الميزانيات السنوية للمؤسسات التعليمية بكفاءة عالية.",
    descriptionEn:
      "Organizing tuition fees, tracking installments, and preparing annual budgets for educational institutions efficiently.",
  },
  {
    id: 12,
    titleAr: "صيانة شبكات وأنظمة البنية التحتية للمدارس",
    titleEn: "School Network Infrastructure & Maintenance",
    categoryAr: "البنية التحتية",
    categoryEn: "Infrastructure",
    instructorAr: "م. سامح بهجت",
    instructorEn: "Eng. Sameh Bahgat",
    rating: 4.8,
    reviewsCount: 81,
    durationAr: "22 ساعة",
    durationEn: "22 Hours",
    lessonsCount: 30,
    levelAr: "متقدم",
    levelEn: "Advanced",
    priceAr: "مدعوم",
    priceEn: "Supported",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "إعداد شبكات الإنترنت الداخلية، ربط المعامل بالخوادم، وضمان استمرارية الاتصال داخل مجمع المدارس.",
    descriptionEn:
      "Setting up internal internet networks, connecting labs to servers, and ensuring uninterrupted connectivity inside school complexes.",
  },
  {
    id: 13,
    titleAr: "مهارات التواصل الفعال وإدارة الأزمات التعليمية",
    titleEn: "Effective Communication & Educational Crisis Management",
    categoryAr: "الإدارة التربوية",
    categoryEn: "Educational Management",
    instructorAr: "د. نادية جلال",
    instructorEn: "Dr. Nadia Galal",
    rating: 4.7,
    reviewsCount: 95,
    durationAr: "12 ساعة",
    durationEn: "12 Hours",
    lessonsCount: 16,
    levelAr: "متوسط",
    levelEn: "Intermediate",
    priceAr: "مجاني",
    priceEn: "Free",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "تقنيات التعامل مع أولياء الأمور، حل المشكلات السلوكية للطلاب، واحتواء الأزمات الطارئة داخل المؤسسة.",
    descriptionEn:
      "Techniques for dealing with parents, resolving student behavioral issues, and containing emergency crises within the institution.",
  },
  {
    id: 14,
    titleAr: "أساسيات لغة Python وتحليل البيانات التعليمية",
    titleEn: "Python Basics & Educational Data Analysis",
    categoryAr: "تطوير الويب",
    categoryEn: "Web Development",
    instructorAr: "م. يوسف مراد",
    instructorEn: "Eng. Youssef Mourad",
    rating: 4.9,
    reviewsCount: 160,
    durationAr: "24 ساعة",
    durationEn: "24 Hours",
    lessonsCount: 35,
    levelAr: "متوسط",
    levelEn: "Intermediate",
    priceAr: "مدفوع",
    priceEn: "Paid",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "استخدام لغة بايثون في استخراج تقارير أداء الطلاب وتوقع نتائج الامتحانات بناءً على المؤشرات السابقة.",
    descriptionEn:
      "Using Python to extract student performance reports and predict exam results based on previous indicators.",
  },
  {
    id: 15,
    titleAr: "تصميم المناهج الرقمية التفاعلية",
    titleEn: "Interactive Digital Curricula Design",
    categoryAr: "التعليم الرقمي",
    categoryEn: "Digital Education",
    instructorAr: "أ. زينب عبد العال",
    instructorEn: "Ms. Zainab Abdel Aal",
    rating: 4.8,
    reviewsCount: 110,
    durationAr: "14 ساعة",
    durationEn: "14 Hours",
    lessonsCount: 20,
    levelAr: "مبتدئ إلى متوسط",
    levelEn: "Beginner to Intermediate",
    priceAr: "مدعوم",
    priceEn: "Supported",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "تحويل المناهج التقليدية إلى كتب إلكترونية تفاعلية تحتوي على ألعاب تعليمية واختبارات فورية.",
    descriptionEn:
      "Converting traditional curricula into interactive e-books containing educational games and instant quizzes.",
  },
  {
    id: 16,
    titleAr: "إدارة قواعد البيانات المتقدمة وس XAMPP",
    titleEn: "Advanced Database Management & XAMPP",
    categoryAr: "البرمجة الخلفية",
    categoryEn: "Backend Development",
    instructorAr: "م. كريم الشهاوي",
    instructorEn: "Eng. Karim El-Shahawy",
    rating: 4.85,
    reviewsCount: 135,
    durationAr: "20 ساعة",
    durationEn: "20 Hours",
    lessonsCount: 28,
    levelAr: "متقدم",
    levelEn: "Advanced",
    priceAr: "مدفوع",
    priceEn: "Paid",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "احتراف إدارة الخوادم المحلية عبر بيئة XAMPP وتحسين أداء واستعلامات قواعد البيانات لتعمل بأقصى سرعة.",
    descriptionEn:
      "Mastering local server management via XAMPP environment and optimizing database queries to run at peak speed.",
  },
  {
    id: 17,
    titleAr: "استراتيجيات التقييم الشامل والكنترول الإلكتروني",
    titleEn: "Comprehensive Assessment & Electronic Control Strategies",
    categoryAr: "الإدارة التربوية",
    categoryEn: "Educational Management",
    instructorAr: "د. إبراهيم رضوان",
    instructorEn: "Dr. Ibrahim Radwan",
    rating: 4.9,
    reviewsCount: 98,
    durationAr: "16 ساعة",
    durationEn: "16 Hours",
    lessonsCount: 22,
    levelAr: "متقدم",
    levelEn: "Advanced",
    priceAr: "مجاني / مدعوم",
    priceEn: "Free / Supported",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "آليات رصد الدرجات، إعداد الشهايد الرقمية الموثقة، ومنع الأخطاء في الكنترول المدرسي.",
    descriptionEn:
      "Mechanisms for grade recording, preparing verified digital certificates, and preventing errors in school grading control.",
  },
  {
    id: 18,
    titleAr: "تطوير تطبيقات الويب السريعة بـ TypeScript",
    titleEn: "Fast Web Apps Development with TypeScript",
    categoryAr: "تطوير الويب",
    categoryEn: "Web Development",
    instructorAr: "م. نهى البرماوي",
    instructorEn: "Eng. Noha El-Barmawy",
    rating: 4.95,
    reviewsCount: 185,
    durationAr: "22 ساعة",
    durationEn: "22 Hours",
    lessonsCount: 30,
    levelAr: "متقدم",
    levelEn: "Advanced",
    priceAr: "مشترك",
    priceEn: "Included",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "استخدام أنواع البيانات المتقدمة في تايب سكريبت لتأمين التطبيقات الكبيرة ومنع الأخطاء البرمجية.",
    descriptionEn:
      "Using advanced data types in TypeScript to secure large applications and prevent programming errors.",
  },
  {
    id: 19,
    titleAr: "إدارة شؤون الطلاب والقبول والتسجيل الإلكتروني",
    titleEn: "Student Affairs & Electronic Admissions Management",
    categoryAr: "الإدارة التكنولوجية",
    categoryEn: "Tech Management",
    instructorAr: "أ. حسام الدين عثمان",
    instructorEn: "Mr. Hossam El-Din Osman",
    rating: 4.75,
    reviewsCount: 112,
    durationAr: "12 ساعة",
    durationEn: "12 Hours",
    lessonsCount: 18,
    levelAr: "مبتدئ",
    levelEn: "Beginner",
    priceAr: "مدعوم",
    priceEn: "Supported",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "تنظيم بوابات قبول الطلاب الجدد، مراجعة المستندات إلكترونياً، وإصدار البطاقات المدرسية الذكية.",
    descriptionEn:
      "Organizing new student admission portals, reviewing documents electronically, and issuing smart school IDs.",
  },
  {
    id: 20,
    titleAr: "مهارات العرض والإلقاء المؤثر للمعلمين",
    titleEn: "Effective Presentation & Public Speaking Skills for Teachers",
    categoryAr: "التعليم الرقمي",
    categoryEn: "Digital Education",
    instructorAr: "د. ممدوح النجار",
    instructorEn: "Dr. Mamdouh El-Najjar",
    rating: 4.8,
    reviewsCount: 140,
    durationAr: "10 ساعات",
    durationEn: "10 Hours",
    lessonsCount: 15,
    levelAr: "مبتدئ",
    levelEn: "Beginner",
    priceAr: "مجاني",
    priceEn: "Free",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600",
    descriptionAr:
      "كيفية جذب انتباه الطلاب أثناء الشرح، كسر الجليد، واستخدام لغة الجسد باحترافية داخل قاعات الدرس.",
    descriptionEn:
      "How to capture students' attention during explanations, break the ice, and use body language professionally inside classrooms.",
  },
];

export default function CoursesBrowsePage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // عرض 6 كروت في كل صفحة بالتحديد

  // تصفية الدورات بناءً على البحث والتصنيف
  const filteredCourses = mockCourses.filter((course) => {
    const title = isAr ? course.titleAr : course.titleEn;
    const instructor = isAr ? course.instructorAr : course.instructorEn;
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const category = isAr ? course.categoryAr : course.categoryEn;
    const matchesCategory =
      selectedCategory === "الكل" || category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // حساب نظام التقسيم (Pagination)
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnrolled(true);
    setTimeout(() => {
      setIsEnrolled(false);
      setSelectedCourse(null);
    }, 2500);
  };

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <PlayCircle className="w-8 h-8 text-amber-400" />
              {isAr ? "استكشف الدورات التعليمية" : "Explore Courses"}
            </h1>
            <p className="text-slate-400 mt-1">
              {isAr
                ? "طور مهاراتك الإدارية والبرمجية مع نخبة من الخبراء والمعلمين المعتمدين."
                : "Enhance your management and programming skills with elite certified experts."}
            </p>
          </div>
          <div className="text-sm bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-amber-400">
            {isAr ? "إجمالي الدورات المتاحة:" : "Total Available Courses:"}{" "}
            <span className="font-bold">{filteredCourses.length}</span>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <div className="relative md:col-span-2">
            <Search
              className={`absolute ${isAr ? "right-4" : "left-4"} top-3.5 w-5 h-5 text-slate-400`}
            />
            <input
              type="text"
              placeholder={
                isAr
                  ? "ابحث باسم الدورة أو اسم المحاضر..."
                  : "Search course title or instructor..."
              }
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full bg-slate-950 border border-slate-800 rounded-xl ${isAr ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors`}
            />
          </div>

          <div className="relative">
            <Filter
              className={`absolute ${isAr ? "right-4" : "left-4"} top-3.5 w-5 h-5 text-slate-400`}
            />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full bg-slate-950 border border-slate-800 rounded-xl ${isAr ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer`}
            >
              <option value="الكل">
                {isAr ? "جميع التخصصات" : "All Categories"}
              </option>
              <option value={isAr ? "الإدارة التكنولوجية" : "Tech Management"}>
                {isAr ? "الإدارة التكنولوجية" : "Tech Management"}
              </option>
              <option value={isAr ? "تطوير الويب" : "Web Development"}>
                {isAr ? "تطوير الويب" : "Web Development"}
              </option>
              <option value={isAr ? "التعليم الرقمي" : "Digital Education"}>
                {isAr ? "التعليم الرقمي" : "Digital Education"}
              </option>
              <option value={isAr ? "البرمجة الخلفية" : "Backend Development"}>
                {isAr ? "البرمجة الخلفية" : "Backend Development"}
              </option>
              <option
                value={isAr ? "الإدارة التربوية" : "Educational Management"}
              >
                {isAr ? "الإدارة التربوية" : "Educational Management"}
              </option>
            </select>
          </div>
        </div>

        {/* Courses Grid (Displaying 6 items per page) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => {
            const title = isAr ? course.titleAr : course.titleEn;
            const category = isAr ? course.categoryAr : course.categoryEn;
            const instructor = isAr ? course.instructorAr : course.instructorEn;
            const duration = isAr ? course.durationAr : course.durationEn;
            const level = isAr ? course.levelAr : course.levelEn;
            const price = isAr ? course.priceAr : course.priceEn;

            return (
              <div
                key={course.id}
                className="group bg-slate-900/50 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Course Image & Category Badge */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <span
                      className={`absolute top-3 ${isAr ? "right-3" : "left-3"} bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 text-xs px-3 py-1 rounded-full font-medium`}
                    >
                      {category}
                    </span>
                    <div
                      className={`absolute bottom-3 ${isAr ? "right-3" : "left-3"} flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded-lg text-amber-300 text-xs font-semibold`}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400 text-[10px]">
                        ({course.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {title}
                    </h3>

                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <User className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="truncate">{instructor}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
                        <span>{duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                          {course.lessonsCount} {isAr ? "درس" : "Lessons"}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                      <span>
                        {isAr ? "المستوى:" : "Level:"}{" "}
                        <strong className="text-slate-200">{level}</strong>
                      </span>
                      <span className="text-amber-400 font-bold">{price}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button - Amber/Gold Gradient Theme */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <span>
                      {isAr
                        ? "استعرض الدورة والاشتراك"
                        : "View Course & Enroll"}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {filteredCourses.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 pt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            >
              {isAr ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
              <span>{isAr ? "السابق" : "Previous"}</span>
            </button>

            <span className="text-sm text-slate-400 font-medium">
              {isAr ? "صفحة" : "Page"}{" "}
              <strong className="text-amber-400">{currentPage}</strong>{" "}
              {isAr ? "من" : "of"}{" "}
              <strong className="text-slate-200">{totalPages}</strong>
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            >
              <span>{isAr ? "التالي" : "Next"}</span>
              {isAr ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/80">
            <PlayCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-300">
              {isAr
                ? "لا توجد دورات مطابقة للبحث"
                : "No Matching Courses Found"}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              {isAr
                ? "جرب تغيير كلمات البحث أو اختيار تخصص آخر."
                : "Try changing your search terms or selecting another category."}
            </p>
          </div>
        )}
      </div>

      {/* Modal for Details & Enrollment */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-6 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedCourse(null);
                setIsEnrolled(false);
              }}
              className={`absolute top-6 ${isAr ? "left-6" : "right-6"} text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>

            {isEnrolled ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-14 h-14 text-amber-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white">
                  {isAr
                    ? "تم تسجيلك في الدورة بنجاح!"
                    : "Enrolled in Course Successfully!"}
                </h3>
                <p className="text-slate-400 text-sm">
                  {isAr
                    ? "يمكنك الآن البدء بمشاهدة الدروس مباشرة من حسابك."
                    : "You can now start watching lessons directly from your account."}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <span className="text-amber-400 text-xs font-semibold bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full inline-block">
                    {isAr
                      ? selectedCourse.categoryAr
                      : selectedCourse.categoryEn}
                  </span>
                  <h2 className="text-2xl font-bold text-white pt-1">
                    {isAr ? selectedCourse.titleAr : selectedCourse.titleEn}
                  </h2>
                  <p className="text-slate-400 text-sm flex items-center gap-1.5">
                    <User className="w-4 h-4 text-amber-400" />
                    {isAr
                      ? `${selectedCourse.instructorAr}`
                      : `${selectedCourse.instructorEn}`}
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <h4 className="font-semibold text-amber-300 text-xs">
                    {isAr ? "نظرة عامة على الدورة:" : "Course Overview:"}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {isAr
                      ? selectedCourse.descriptionAr
                      : selectedCourse.descriptionEn}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-3">
                  <h3 className="text-base font-bold text-white">
                    {isAr
                      ? "تأكيد التسجيل في الدورة"
                      : "Confirm Course Enrollment"}
                  </h3>
                  <form onSubmit={handleEnrollSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">
                          {isAr ? "الاسم الكامل" : "Full Name"}
                        </label>
                        <input
                          required
                          type="text"
                          placeholder={isAr ? "اسمك الكريم" : "Your Name"}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">
                          {isAr ? "البريد الإلكتروني" : "Email Address"}
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="name@example.com"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-md shadow-amber-500/25"
                    >
                      {isAr
                        ? "انضم الآن وابدأ التعلم"
                        : "Join Now & Start Learning"}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
