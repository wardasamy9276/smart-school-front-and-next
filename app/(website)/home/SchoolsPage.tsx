"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface School {
  id: number;
  name_ar: string;
  name_en: string;
  logo: string;
}

export default function SchoolsPage() {
  const { language } = useLanguage();

  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/school-slider")
      .then((res) => res.json())
      .then((data) => {
        setSchools(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        {language === "ar" ? "جاري التحميل..." : "Loading..."}
      </div>
    );
  }

  return (
    <main
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 py-10 sm:py-16 px-4 sm:px-6"
    >
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-[#9E7C2F] mb-8 sm:mb-12">
        {language === "ar"
          ? "مدارس مجمع المدارس الذكية"
          : "Smart Schools Complex"}
      </h1>

      <div
        className="
        max-w-7xl
        mx-auto
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-5
        gap-4
        sm:gap-6
        "
      >
        {schools.map((school) => (
          <div
            key={school.id}
            className="
            bg-white
            rounded-2xl
            shadow-sm
            p-5
            flex
            flex-col
            items-center
            justify-between
            text-center
            hover:shadow-xl
            transition-shadow
            duration-300
            "
          >
            <div className="w-full">
              {/* الشعار */}
              <div className="relative w-full h-28 sm:h-32 mb-4 flex items-center justify-center">
                <Image
                  src={`http://127.0.0.1:8000/${school.logo.replaceAll(
                    "\\",
                    "/",
                  )}`}
                  alt={language === "ar" ? school.name_ar : school.name_en}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* اسم المدرسة */}
              <h2
                className="
                font-bold
                text-gray-800
                text-base
                sm:text-sm
                line-clamp-2
                flex
                items-center
                justify-center
                min-h-[40px]
                "
              >
                {language === "ar" ? school.name_ar : school.name_en}
              </h2>
            </div>

            {/* زر التفاصيل */}
            <Link
              href={`/schools/${school.id}`}
              className="
              mt-5
              w-full
              inline-block
              bg-cyan-700
              text-white
              px-4
              py-2.5
              rounded-xl
              text-sm
              font-medium
              hover:bg-cyan-900
              active:scale-95
              transition-all
              "
            >
              {language === "ar" ? "معرفة المزيد عنا" : "Learn More"}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
