"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  Filter,
  Star,
  MapPin,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  X,
  CheckCircle2,
} from "lucide-react";

interface School {
  id: number;
  nameAr: string;
  nameEn: string;
  typeAr: string;
  typeEn: string;
  curriculumAr: string;
  curriculumEn: string;
  rating: number;
  reviewsCount: number;
  locationAr: string;
  locationEn: string;
  image: string;
  gradesAr: string;
  gradesEn: string;
  feesAr: string;
  feesEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

const mockSchools: School[] = [
  {
    id: 1,
    nameAr: "مجمع مدارس سمارت سكوول الدولية",
    nameEn: "Smart Schools Complex International",
    typeAr: "لغات / دولي",
    typeEn: "Languages / International",
    curriculumAr: "أمريكي / بريطاني",
    curriculumEn: "American / British",
    rating: 4.9,
    reviewsCount: 120,
    locationAr: "السادس من أكتوبر، الجيزة",
    locationEn: "6th of October, Giza",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - الثانوية العامة",
    gradesEn: "KG - High School",
    feesAr: "متوسطة إلى مرتفعة",
    feesEn: "Moderate to High",
    descriptionAr:
      "مجمع تعليمي متكامل يهدف لتقديم بيئة تعليمية ذكية ومبتكرة باستخدام أحدث تقنيات الـ ERP والـ LMS وأنظمة الحضور المتقدمة.",
    descriptionEn:
      "An integrated educational complex aiming to provide a smart and innovative learning environment using the latest ERP and LMS technologies.",
  },
  {
    id: 2,
    nameAr: "مدارس النور الخاصة للغات",
    nameEn: "Al-Noor Private Language Schools",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.6,
    reviewsCount: 85,
    locationAr: "الشيخ زايد، الجيزة",
    locationEn: "Sheikh Zayed, Giza",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600",
    gradesAr: "ابتدائي - ثانوي",
    gradesEn: "Primary - Secondary",
    feesAr: "اقتصادية",
    feesEn: "Economical",
    descriptionAr:
      "تتميز المدرسة بتركيزها القوي على القيم التربوية واللغات الأجنبية مع أنشطة طلابية متكاملة.",
    descriptionEn:
      "The school is distinguished by its strong focus on educational values and foreign languages with integrated student activities.",
  },
  {
    id: 3,
    nameAr: "أكسفورد البريطانية الحديثة",
    nameEn: "Modern British Oxford",
    typeAr: "دولي",
    typeEn: "International",
    curriculumAr: "بريطاني (IGCSE)",
    curriculumEn: "British (IGCSE)",
    rating: 4.8,
    reviewsCount: 94,
    locationAr: "التجمع الخامس، القاهرة",
    locationEn: "New Cairo, Fifth Settlement",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - دبلومة",
    gradesEn: "KG - Diploma",
    feesAr: "مرتفعة",
    feesEn: "High",
    descriptionAr:
      "تقدم المدرسة المنهج البريطاني المعتمد مع كادر تدريس دولي متميز وتوفير أنشطة عالمية المستوى.",
    descriptionEn:
      "The school offers the accredited British curriculum with an outstanding international teaching staff and world-class activities.",
  },
  {
    id: 4,
    nameAr: "مستقبل التكنولوجيا المتميزة",
    nameEn: "Advanced Tech Future",
    typeAr: "تجريبي / لغات",
    typeEn: "Experimental / Languages",
    curriculumAr: "أمريكي",
    curriculumEn: "American",
    rating: 4.5,
    reviewsCount: 62,
    locationAr: "مدينة نصر، القاهرة",
    locationEn: "Nasr City, Cairo",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
    gradesAr: "جميع المراحل",
    gradesEn: "All Stages",
    feesAr: "متوسطة",
    feesEn: "Moderate",
    descriptionAr:
      "تركز المدرسة على دمج التكنولوجيا الحديثة والبرمجة في المراحل التعليمية المختلفة لتخريج جيل رقمي.",
    descriptionEn:
      "The school focuses on integrating modern technology and programming into various educational stages to graduate a digital generation.",
  },
  {
    id: 5,
    nameAr: "رواد المستقبل الدولية",
    nameEn: "Future Pioneers International",
    typeAr: "دولي",
    typeEn: "International",
    curriculumAr: "أمريكي",
    curriculumEn: "American",
    rating: 4.7,
    reviewsCount: 110,
    locationAr: "المقطم، القاهرة",
    locationEn: "Mokattam, Cairo",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - الثانوية",
    gradesEn: "KG - High School",
    feesAr: "متوسطة",
    feesEn: "Moderate",
    descriptionAr:
      "بيئة تعليمية محفزة تشجع التفكير النقدي والابتكار وتضم ملاعب ومختبرات علمية متطورة.",
    descriptionEn:
      "A stimulating learning environment encouraging critical thinking and innovation with advanced sports fields and scientific labs.",
  },
  {
    id: 6,
    nameAr: "صروح العلم الخاصة",
    nameEn: "Pillars of Science Private",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.4,
    reviewsCount: 50,
    locationAr: "هليوبوليس، القاهرة",
    locationEn: "Heliopolis, Cairo",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600",
    gradesAr: "ابتدائي - اعدادي",
    gradesEn: "Primary - Preparatory",
    feesAr: "اقتصادية",
    feesEn: "Economical",
    descriptionAr:
      "تاريخ عريق في التفوق الدراسي والاهتمام بالنشاط الرياضي والثقافي لبناء شخصية متكاملة للطلاب.",
    descriptionEn:
      "A rich history of academic excellence and focus on sports and cultural activities to build a well-rounded student personality.",
  },
  {
    id: 7,
    nameAr: "مدرسة طلائع الأجيال الخاصة للغات",
    nameEn: "Talaei Al-Ayal Private Language School",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.5,
    reviewsCount: 43,
    locationAr: "الهرم، الجيزة",
    locationEn: "Haram, Giza",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - ثانوي",
    gradesEn: "KG - Secondary",
    feesAr: "اقتصادية",
    feesEn: "Economical",
    descriptionAr:
      "تقدم مناهج وزارة التربية والتعليم باللغات مع اهتمام خاص بتنمية مهارات الحاسب الآلي والأنشطة.",
    descriptionEn:
      "Offers Egyptian ministry curricula in languages with special focus on computer skills and activities.",
  },
  {
    id: 8,
    nameAr: "مدرسة قصر الأمان للتعليم الأساسي",
    nameEn: "Qasr Al-Aman Basic Education School",
    typeAr: "حكومي تجريبي",
    typeEn: "Experimental Public",
    curriculumAr: "وزاري مصري (عربي/لغات)",
    curriculumEn: "Egyptian Ministry (Arabic/Languages)",
    rating: 4.2,
    reviewsCount: 38,
    locationAr: "الدقى، الجيزة",
    locationEn: "Dokki, Giza",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    gradesAr: "ابتدائي - اعدادي",
    gradesEn: "Primary - Preparatory",
    feesAr: "اقتصادية جداً",
    feesEn: "Very Economical",
    descriptionAr:
      "مدرسة حكومية متميزة تطبق معايير الجودة والاعتماد التربوي وتضم معلمين ذوي خبرة عالية.",
    descriptionEn:
      "A distinguished public school applying quality and educational accreditation standards with highly experienced teachers.",
  },
  {
    id: 9,
    nameAr: "مدارس العبور القومية للغات",
    nameEn: "Obour National Language Schools",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.7,
    reviewsCount: 65,
    locationAr: "مدينة العبور، القليوبية",
    locationEn: "Obour City, Qalyubia",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - ثانوية عامة",
    gradesEn: "KG - High School",
    feesAr: "متوسطة",
    feesEn: "Moderate",
    descriptionAr:
      "صرح تعليمي عريق يجمع بين أصالة المناهج المصرية ومواكبة التطور التقني والأنشطة الطلابية الواسعة.",
    descriptionEn:
      "A well-established educational edifice combining the authenticity of Egyptian curricula with technological advancement.",
  },
  {
    id: 10,
    nameAr: "سيتي الدولية للغات والعلوم",
    nameEn: "City International Languages & Sciences",
    typeAr: "دولي / لغات",
    typeEn: "International / Languages",
    curriculumAr: "أمريكي",
    curriculumEn: "American",
    rating: 4.8,
    reviewsCount: 77,
    locationAr: "السادس من أكتوبر، الجيزة",
    locationEn: "6th of October, Giza",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - ثانوية",
    gradesEn: "KG - High School",
    feesAr: "مرتفعة",
    feesEn: "High",
    descriptionAr:
      "تعتمد على أحدث البرامج التعليمية الأمريكية وتوفير بيئة تفاعلية تدعم التفكير الإبداعي.",
    descriptionEn:
      "Relies on modern American educational programs and provides an interactive environment supporting creative thinking.",
  },
  {
    id: 11,
    nameAr: "المنارة الخاصة للغات",
    nameEn: "Al-Manara Private Language School",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.3,
    reviewsCount: 41,
    locationAr: "مدينة الشروق، القاهرة",
    locationEn: "El Shorouk City, Cairo",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
    gradesAr: "ابتدائي - ثانوي",
    gradesEn: "Primary - Secondary",
    feesAr: "متوسطة",
    feesEn: "Moderate",
    descriptionAr:
      "بيئة تعليمية آمنة ومنظومة تربوية حديثة تهتم بالقرآن الكريم واللغات والأنشطة الرياضية.",
    descriptionEn:
      "A safe learning environment and modern educational system focusing on values, languages, and sports.",
  },
  {
    id: 12,
    nameAr: "النيل الدولية المتكاملة",
    nameEn: "Nile Integrated International School",
    typeAr: "دولي",
    typeEn: "International",
    curriculumAr: "بريطاني / مصري دولي",
    curriculumEn: "British / NIS",
    rating: 4.9,
    reviewsCount: 135,
    locationAr: "الشيخ زايد، الجيزة",
    locationEn: "Sheikh Zayed, Giza",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - دبلومة",
    gradesEn: "KG - Diploma",
    feesAr: "مرتفعة جداً",
    feesEn: "Very High",
    descriptionAr:
      "واحدة من أقوى المدارس الدولية التي تقدم شهادات معتمدة مع معسكرات تدريبية ومختبرات روبوتكس.",
    descriptionEn:
      "One of the top international schools offering accredited certificates with training camps and robotics labs.",
  },
  {
    id: 13,
    nameAr: "مفيستس للغات الخاصة",
    nameEn: "Memphis Private Language School",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.5,
    reviewsCount: 52,
    locationAr: "المعادي، القاهرة",
    locationEn: "Maadi, Cairo",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - ثانوي",
    gradesEn: "KG - Secondary",
    feesAr: "متوسطة إلى مرتفعة",
    feesEn: "Moderate to High",
    descriptionAr:
      "تجمع المدرسة بين العراقة والأساليب الحديثة في التدريس وتهتم بالأنشطة الفنية والموسيقية والرياضية.",
    descriptionEn:
      "Combines tradition with modern teaching methods, focusing on arts, music, and sports activities.",
  },
  {
    id: 14,
    nameAr: "الكرمة الحديثة للغات",
    nameEn: "Modern Karma Language School",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.4,
    reviewsCount: 39,
    locationAr: "التجمع الأول، القاهرة",
    locationEn: "First Settlement, Cairo",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600",
    gradesAr: "ابتدائي - اعدادي",
    gradesEn: "Primary - Preparatory",
    feesAr: "متوسطة",
    feesEn: "Moderate",
    descriptionAr:
      "فصول ذكية مجهزة بالكامل ومناهج متطورة لتنمية مهارات الفهم والتحليل لدى الطلاب.",
    descriptionEn:
      "Fully equipped smart classrooms and advanced curricula to develop students' comprehension and analytical skills.",
  },
  {
    id: 15,
    nameAr: "كابيتال الأمريكية الخاصة",
    nameEn: "Capital American Private School",
    typeAr: "دولي / لغات",
    typeEn: "International / Languages",
    curriculumAr: "أمريكي",
    curriculumEn: "American",
    rating: 4.7,
    reviewsCount: 88,
    locationAr: "العاصمة الإدارية الجديدة",
    locationEn: "New Administrative Capital",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - الثانوية",
    gradesEn: "KG - High School",
    feesAr: "مرتفعة",
    feesEn: "High",
    descriptionAr:
      "صرح تعليمي حديث في العاصمة الإدارية يطبق أحدث نظم التعليم الذكي والأنظمة الرقمية الكاملة.",
    descriptionEn:
      "A modern educational edifice in the New Capital implementing smart education and full digital systems.",
  },
  {
    id: 16,
    nameAr: "زهراء مدينة نصر للغات",
    nameEn: "Zahraa Nasr City Language School",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.2,
    reviewsCount: 30,
    locationAr: "مدينة نصر، القاهرة",
    locationEn: "Nasr City, Cairo",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600",
    gradesAr: "ابتدائي - ثانوي",
    gradesEn: "Primary - Secondary",
    feesAr: "اقتصادية",
    feesEn: "Economical",
    descriptionAr:
      "مدرسة عريقة تتميز بالالتزام الأخلاقي والتعليمي وتوفير رعاية خاصة لكل طالب.",
    descriptionEn:
      "A well-known school characterized by moral and educational commitment and special care for each student.",
  },
  {
    id: 17,
    nameAr: "الكونتننتال البريطانية",
    nameEn: "Continental British School",
    typeAr: "دولي",
    typeEn: "International",
    curriculumAr: "بريطاني (IGCSE)",
    curriculumEn: "British (IGCSE)",
    rating: 4.8,
    reviewsCount: 96,
    locationAr: "حدائق الأهرام، الجيزة",
    locationEn: "Hadayek Al-Ahram, Giza",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - ثانوية",
    gradesEn: "KG - High School",
    feesAr: "مرتفعة",
    feesEn: "High",
    descriptionAr:
      "منهج بريطاني معتمد، طاقم تدريس أجنبي ومحلي متميز، وأنشطة لا منهجية واسعة النطاق.",
    descriptionEn:
      "Accredited British curriculum, outstanding foreign and local teaching staff, and extensive extracurricular activities.",
  },
  {
    id: 18,
    nameAr: "الفيروز الخاصة للغات",
    nameEn: "Al-Fayrouz Private Language School",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.3,
    reviewsCount: 45,
    locationAr: "بدر، القاهرة",
    locationEn: "Badr City, Cairo",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    gradesAr: "جميع المراحل",
    gradesEn: "All Stages",
    feesAr: "اقتصادية",
    feesEn: "Economical",
    descriptionAr:
      "تسعى دائماً لتطوير قدرات الطلاب العلمية واللغوية بأساليب مبسطة وتفاعلية.",
    descriptionEn:
      "Always strives to develop students' scientific and linguistic abilities through simplified and interactive methods.",
  },
  {
    id: 19,
    nameAr: "البسمة الحديثة للغات",
    nameEn: "Modern Al-Basma Language School",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.5,
    reviewsCount: 58,
    locationAr: "المطرية، القاهرة",
    locationEn: "Mataria, Cairo",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600",
    gradesAr: "ابتدائي - اعدادي - ثانوي",
    gradesEn: "Primary - Prep - Secondary",
    feesAr: "اقتصادية",
    feesEn: "Economical",
    descriptionAr:
      "مدرسة رائدة في تنمية المهارات السلوكية والتعليمية وتوفير مناخ مناسب للتفوق.",
    descriptionEn:
      "A leading school in developing behavioral and educational skills and providing a suitable climate for excellence.",
  },
  {
    id: 20,
    nameAr: "جولدن بريدج الدولية",
    nameEn: "Golden Bridge International School",
    typeAr: "دولي",
    typeEn: "International",
    curriculumAr: "أمريكي",
    curriculumEn: "American",
    rating: 4.9,
    reviewsCount: 115,
    locationAr: "الشيخ زايد، الجيزة",
    locationEn: "Sheikh Zayed, Giza",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - دبلومة أمريكية",
    gradesEn: "KG - American Diploma",
    feesAr: "مرتفعة جداً",
    feesEn: "Very High",
    descriptionAr:
      "حرم جامعي مصغر يضم أحدث القاعات التكنولوجية والملاعب الرياضية والمسبح الأولمبي.",
    descriptionEn:
      "A mini campus featuring the latest tech halls, sports fields, and an Olympic swimming pool.",
  },
  {
    id: 21,
    nameAr: "وهج العلم التجريبية المتميزة",
    nameEn: "Wahaj Al-Ilm Experimental School",
    typeAr: "حكومي تجريبي",
    typeEn: "Experimental Public",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.4,
    reviewsCount: 60,
    locationAr: "السادس من أكتوبر، الجيزة",
    locationEn: "6th of October, Giza",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
    gradesAr: "ابتدائي - اعدادي",
    gradesEn: "Primary - Preparatory",
    feesAr: "اقتصادية",
    feesEn: "Economical",
    descriptionAr:
      "مدرسة تجريبية متميزة تقدم تعليماً قوياً باللغات الإنجليزية والفرنسية وبمصروفات حكومية مناسبة.",
    descriptionEn:
      "A distinguished experimental school offering strong education in English and French at affordable public fees.",
  },
  {
    id: 22,
    nameAr: "الأفق الجديد الخاصة",
    nameEn: "New Horizon Private School",
    typeAr: "لغات",
    typeEn: "Languages",
    curriculumAr: "وزاري مصري (لغات)",
    curriculumEn: "Egyptian Ministry (Languages)",
    rating: 4.6,
    reviewsCount: 71,
    locationAr: "حلوان، القاهرة",
    locationEn: "Helwan, Cairo",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600",
    gradesAr: "KG - ثانوي",
    gradesEn: "KG - Secondary",
    feesAr: "متوسطة",
    feesEn: "Moderate",
    descriptionAr:
      "تعتمد على أساليب التعلم الذكي وتفعيل الأنشطة الثقافية والرياضية لصقل مواهب الطلاب.",
    descriptionEn:
      "Relies on smart learning methods and activates cultural and sports activities to hone student talents.",
  },
];

export default function SchoolsBrowsePage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("الكل");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // عرض 6 كروت في كل صفحة بدقة

  // تصفية المدارس بناءً على البحث والمنهج
  const filteredSchools = mockSchools.filter((school) => {
    const name = isAr ? school.nameAr : school.nameEn;
    const location = isAr ? school.locationAr : school.locationEn;
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase());

    const curriculum = isAr ? school.curriculumAr : school.curriculumEn;
    const matchesCurriculum =
      selectedCurriculum === "الكل" || curriculum.includes(selectedCurriculum);

    return matchesSearch && matchesCurriculum;
  });

  // حساب نظام التقسيم (Pagination)
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSchools = filteredSchools.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    setTimeout(() => {
      setIsRegistered(false);
      setSelectedSchool(null);
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
              <GraduationCap className="w-8 h-8 text-amber-400" />
              {isAr ? "دليل وتصفح المدارس" : "Schools Directory"}
            </h1>
            <p className="text-slate-400 mt-1">
              {isAr
                ? "استكشف أفضل المدارس، المناهج، وقدم طلبات الالتحاق بسهولة تامة."
                : "Explore the best schools, curriculums, and easily apply for admission."}
            </p>
          </div>
          <div className="text-sm bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-amber-400">
            {isAr ? "إجمالي المدارس المطابقة:" : "Total Matching Schools:"}{" "}
            <span className="font-bold">{filteredSchools.length}</span>
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
                  ? "ابحث باسم المدرسة، المنطقة، أو المدينة..."
                  : "Search school name, location, or city..."
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
              value={selectedCurriculum}
              onChange={(e) => {
                setSelectedCurriculum(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full bg-slate-950 border border-slate-800 rounded-xl ${isAr ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer`}
            >
              <option value="الكل">
                {isAr ? "جميع المناهج" : "All Curriculums"}
              </option>
              <option value="أمريكي">{isAr ? "أمريكي" : "American"}</option>
              <option value="بريطاني">{isAr ? "بريطاني" : "British"}</option>
              <option value="وزاري">
                {isAr ? "وزاري مصري" : "Egyptian Ministry"}
              </option>
            </select>
          </div>
        </div>

        {/* Schools Grid (Displaying exactly 6 items per page) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSchools.map((school) => {
            const name = isAr ? school.nameAr : school.nameEn;
            const type = isAr ? school.typeAr : school.typeEn;
            const curriculum = isAr ? school.curriculumAr : school.curriculumEn;
            const location = isAr ? school.locationAr : school.locationEn;
            const grades = isAr ? school.gradesAr : school.gradesEn;
            const fees = isAr ? school.feesAr : school.feesEn;

            return (
              <div
                key={school.id}
                className="group bg-slate-900/50 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* School Image & Badge */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={school.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <span
                      className={`absolute top-3 ${isAr ? "right-3" : "left-3"} bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 text-xs px-3 py-1 rounded-full font-medium`}
                    >
                      {type}
                    </span>
                    <div
                      className={`absolute bottom-3 ${isAr ? "right-3" : "left-3"} flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded-lg text-amber-300 text-xs font-semibold`}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{school.rating}</span>
                      <span className="text-slate-400 text-[10px]">
                        ({school.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {name}
                    </h3>

                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="truncate">{location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <BookOpen className="w-4 h-4 text-yellow-500 shrink-0" />
                      <span>
                        {isAr ? "المنهج:" : "Curriculum:"}{" "}
                        <strong className="text-slate-200">{curriculum}</strong>
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                      <span>
                        {isAr ? "المراحل:" : "Grades:"} {grades}
                      </span>
                      <span className="text-amber-400 font-medium">
                        {isAr ? "المصروفات:" : "Fees:"} {fees}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button - Amber/Gold Gradient Theme */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedSchool(school)}
                    className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <span>
                      {isAr
                        ? "عرض التفاصيل والتسجيل"
                        : "View Details & Register"}
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
        {filteredSchools.length > itemsPerPage && (
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
        {filteredSchools.length === 0 && (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/80">
            <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-300">
              {isAr
                ? "لا توجد مدارس مطابقة للبحث"
                : "No Matching Schools Found"}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              {isAr
                ? "جرب تغيير كلمات البحث أو اختيار منهج دراسي آخر."
                : "Try changing your search terms or selecting another curriculum."}
            </p>
          </div>
        )}
      </div>

      {/* Modal for Details & Registration */}
      {selectedSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-6 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedSchool(null);
                setIsRegistered(false);
              }}
              className={`absolute top-6 ${isAr ? "left-6" : "right-6"} text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>

            {isRegistered ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-14 h-14 text-amber-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white">
                  {isAr
                    ? "تم تقديم طلب التسجيل بنجاح!"
                    : "Registration Request Submitted Successfully!"}
                </h3>
                <p className="text-slate-400 text-sm">
                  {isAr
                    ? "ستقوم إدارة المدرسة بالتواصل معك قريباً."
                    : "The school administration will contact you soon."}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <span className="text-amber-400 text-xs font-semibold bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full inline-block">
                    {isAr
                      ? `${selectedSchool.typeAr} - ${selectedSchool.curriculumAr}`
                      : `${selectedSchool.typeEn} - ${selectedSchool.curriculumEn}`}
                  </span>
                  <h2 className="text-2xl font-bold text-white pt-1">
                    {isAr ? selectedSchool.nameAr : selectedSchool.nameEn}
                  </h2>
                  <p className="text-slate-400 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    {isAr
                      ? selectedSchool.locationAr
                      : selectedSchool.locationEn}
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <h4 className="font-semibold text-amber-300 text-xs">
                    {isAr ? "نبذة عن المدرسة:" : "School Overview:"}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {isAr
                      ? selectedSchool.descriptionAr
                      : selectedSchool.descriptionEn}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-3">
                  <h3 className="text-base font-bold text-white">
                    {isAr
                      ? "نموذج التسجيل الفوري"
                      : "Instant Registration Form"}
                  </h3>
                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">
                          {isAr ? "اسم ولي الأمر" : "Parent Name"}
                        </label>
                        <input
                          required
                          type="text"
                          placeholder={isAr ? "الاسم الكامل" : "Full Name"}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">
                          {isAr ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"}
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="01xxxxxxxxx"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">
                        {isAr
                          ? "الصف الدراسي المراد التقديم له"
                          : "Grade to Apply For"}
                      </label>
                      <input
                        required
                        type="text"
                        placeholder={
                          isAr
                            ? "مثال: الصف الأول الابتدائي، KG2..."
                            : "e.g., Grade 1, KG2..."
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-md shadow-amber-500/25"
                    >
                      {isAr
                        ? "تأكيد وإرسال طلب الالتحاق"
                        : "Confirm & Submit Application"}
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
