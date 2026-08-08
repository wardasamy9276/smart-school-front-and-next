"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  MessageCircle,
  ShieldCheck,
  Trophy,
  MonitorSmartphone,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

interface WhyChooseUs {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
}

export default function WhyChooseUsSection() {
  const { language } = useLanguage();

  const [items, setItems] = useState<WhyChooseUs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/why-choose-us")
      .then((res) => res.json())

      .then((data: WhyChooseUs[]) => {
        setItems(data);

        setLoading(false);
      })

      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, []);

  const icons: Record<string, React.ReactNode> = {
    "graduation-cap": <GraduationCap className="h-10 w-10 text-cyan-700  " />,

    users: <Users className="h-10 w-10 text-cyan-700" />,

    "message-circle": <MessageCircle className="h-10 w-10 text-cyan-700" />,

    "shield-check": <ShieldCheck className="h-10 w-10 text-cyan-700" />,

    trophy: <Trophy className="h-10 w-10 text-cyan-700" />,

    "monitor-smartphone": (
      <MonitorSmartphone className="h-10 w-10 text-cyan-700" />
    ),
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16 text-center flex ">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            {language === "ar"
              ? "لماذا تختار مدرستنا؟"
              : "Why Choose Our School?"}
          </h2>

          <p className="mt-4 text-gray-600">
            {language === "ar"
              ? "نقدم أفضل الخدمات التعليمية بأحدث التقنيات."
              : "We provide high-quality education using modern technologies."}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                rounded-2xl
                bg-white
                p-8
                shadow-md
                transition
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <div
                className="mb-5 text-center  flex items-center 
              justify-center  text-cyan-700"
              >
                {icons[item.icon] ?? (
                  <GraduationCap className="h-10 w-10 text-cyan-700  " />
                )}
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                {language === "ar" ? item.title_ar : item.title_en}
              </h3>

              <p className="leading-7 text-gray-600">
                {language === "ar" ? item.description_ar : item.description_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
