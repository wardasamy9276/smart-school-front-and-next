"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import VisionMissionContent from "../about/VisionMissionContent";

interface Item {
  image: string;
  title: string;
  description: string;
  details: string;
  btnText: string;
}

export default function VisionMission() {
  const { language } = useLanguage() as { language: "ar" | "en" };
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // بيانات افتراضية تظهر احتياطياً لضمان عدم ظهور القسم فارغاً
  const fallbackItems: Item[] = [
    {
      image: "/assets/img/Modern Al Shams School1.jpeg",
      title: language === "ar" ? "رؤيتنا التعليمية" : "Our Vision",
      description:
        language === "ar"
          ? "ريادة عالمية في بناء جيل مبتكر وقادح للتقنية."
          : "Global leadership in building an innovative digital generation.",
      details:
        language === "ar"
          ? "نسعى لأن نكون المنظومة التعليمية والرقمية الأولى التي تقدم حلولاً ذكية ومتكاملة للمدارس، تجمع بين جودة التعليم العالي وأحدث تقنيات الـ ERP والـ LMS."
          : "We strive to be the premier educational and digital ecosystem providing smart, integrated school solutions.",
      btnText: language === "ar" ? "اقرأ المزيد" : "Read More",
    },
    {
      image: "/assets/img/New Cairo Schools7.jpeg",
      title: language === "ar" ? "رسالتنا" : "Our Mission",
      description:
        language === "ar"
          ? "تمكين المؤسسات التعليمية من إدارة عملياتها بكفاءة."
          : "Empowering educational institutions to manage operations efficiently.",
      details:
        language === "ar"
          ? "توفير منصة برمجية متكاملة تسهل التواصل بين الإدارة، المعلمين، أولياء الأمور، والطلاب، مع ضمان أعلى معايير الأمان والمرونة."
          : "Providing an integrated software platform that facilitates communication between management, teachers, parents, and students.",
      btnText: language === "ar" ? "اقرأ المزيد" : "Read More",
    },
    {
      image: "/assets/img/Ebdaah International School8.jpeg",
      title: language === "ar" ? "أهدافنا الإستراتيجية" : "Strategic Goals",
      description:
        language === "ar"
          ? "تطوير مستمر للأداء الأكاديمي والإداري."
          : "Continuous improvement of academic and administrative performance.",
      details:
        language === "ar"
          ? "نعمل على ميكنة كافة العمليات المدرسية، تقليل الهدر الإداري، وتقديم تقارير دقيقة ومباشرة لصناع القرار."
          : "We work on automating all school processes, reducing administrative waste, and providing accurate reports.",
      btnText: language === "ar" ? "اقرأ المزيد" : "Read More",
    },
    {
      image: "/assets/img/Al Safwa Educational Schools10.jpeg",
      title: language === "ar" ? "قيمنا الجوهرية" : "Core Values",
      description:
        language === "ar"
          ? "الشفافية، الابتكار، الجودة، والالتزام."
          : "Transparency, innovation, quality, and commitment.",
      details:
        language === "ar"
          ? "نؤمن بأن نجاح العملية التعليمية يبنى على الثقة المتبادلة والتطوير المستمر لأدواتنا التقنية لتلائم احتياجات العصر."
          : "We believe educational success is built on mutual trust and continuous development of our technical tools.",
      btnText: language === "ar" ? "اقرأ المزيد" : "Read More",
    },
  ];

  useEffect(() => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/api/vision-mission?lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.success &&
          Array.isArray(data.items) &&
          data.items.length > 0
        ) {
          setItems(data.items.slice(0, 8));
        } else {
          setItems(fallbackItems);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("API failed, using fallback data:", err);
        setItems(fallbackItems);
        setLoading(false);
      });
  }, [language]);

  if (loading) {
    return (
      <div className="text-center py-24 text-white text-lg font-medium bg-slate-950">
        {language === "ar" ? "جاري التحميل..." : "Loading..."}
      </div>
    );
  }

  return <VisionMissionContent items={items} language={language} />;
}
