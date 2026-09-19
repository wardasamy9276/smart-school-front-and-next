"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { X } from "lucide-react";

interface School {
  id: number;
  name_ar: string;
  name_en: string;
  logo: string;
  sort_order?: number;
  status?: boolean;
}

/* =========================================================
   وصف كل مدرسة
   ========================================================= */

const schoolDescriptions: Record<
  number,
  {
    ar: string;
    en: string;
  }
> = {
  1: {
    ar: "مدرسة تعليمية حديثة تهدف إلى توفير بيئة تعليمية متميزة تجمع بين جودة التعليم وتنمية مهارات الطلاب وبناء شخصية متوازنة.",
    en: "A modern educational school focused on providing an excellent learning environment that combines quality education, skill development, and balanced student growth.",
  },

  2: {
    ar: "مدرسة تهتم بتقديم تعليم متكامل في بيئة تربوية آمنة، مع التركيز على القيم والأخلاق وتنمية قدرات الطلاب.",
    en: "A school dedicated to providing comprehensive education in a safe environment, with a strong focus on values, character, and student development.",
  },

  3: {
    ar: "مدرسة تقدم تجربة تعليمية متطورة تهتم بالتميز الأكاديمي، وتنمية التفكير الإبداعي، وإعداد الطلاب للمستقبل.",
    en: "A modern educational school focused on academic excellence, creative thinking, and preparing students for the future.",
  },

  4: {
    ar: "مدارس تهدف إلى تقديم تعليم دولي متميز يجمع بين المناهج الحديثة وتنمية مهارات التواصل والتفكير والابتكار.",
    en: "An international school community offering modern education while developing communication, critical thinking, and innovation skills.",
  },

  5: {
    ar: "مدرسة عصرية تسعى إلى بناء جيل قادر على التعلم والإبداع من خلال بيئة تعليمية حديثة وبرامج متنوعة.",
    en: "A modern school committed to building a generation capable of learning and creating through a dynamic environment and diverse educational programs.",
  },

  6: {
    ar: "مدرسة تهتم بتقديم تعليم متميز في بيئة داعمة تساعد الطلاب على اكتشاف قدراتهم وتنمية مواهبهم.",
    en: "A school dedicated to quality education in a supportive environment that helps students discover their abilities and develop their talents.",
  },

  7: {
    ar: "مجموعة مدارس تقدم بيئة تعليمية متطورة تهدف إلى تحقيق التميز الأكاديمي وتنمية مهارات الطلاب في مختلف المجالات.",
    en: "A school community providing an advanced educational environment focused on academic excellence and developing students' skills in different fields.",
  },

  8: {
    ar: "مدارس تهتم بالإبداع والابتكار وتعمل على توفير تجربة تعليمية تساعد الطلاب على التفكير والتعلم والثقة بالنفس.",
    en: "A school community that values creativity and innovation while providing an educational experience that encourages thinking, learning, and self-confidence.",
  },

  9: {
    ar: "مدرسة حديثة تسعى إلى تقديم تعليم متوازن يجمع بين المعرفة والمهارات والقيم لبناء مستقبل أفضل للطلاب.",
    en: "A modern school offering balanced education that combines knowledge, skills, and values to help students build a better future.",
  },

  10: {
    ar: "مدارس تعليمية تهدف إلى تقديم مستوى متميز من التعليم مع الاهتمام بالمهارات الشخصية والأكاديمية للطلاب.",
    en: "Educational schools focused on delivering high-quality learning while developing students' academic and personal skills.",
  },

  11: {
    ar: "مدارس دولية تهتم بالتميز التعليمي وتوفير بيئة حديثة تساعد الطلاب على تطوير مهاراتهم والاستعداد لمتطلبات المستقبل.",
    en: "An international school community focused on educational excellence and providing a modern environment that prepares students for future challenges.",
  },

  12: {
    ar: "مدرسة تهتم ببناء بيئة تعليمية متطورة تشجع على التعلم المستمر وتنمية شخصية الطالب وقدراته المختلفة.",
    en: "A school committed to creating a modern learning environment that encourages continuous learning and personal development.",
  },

  13: {
    ar: "مدارس تقدم تجربة تعليمية حديثة تركز على المعرفة والابتكار وتنمية مهارات الطلاب الأكاديمية والشخصية.",
    en: "A modern educational community focusing on knowledge, innovation, and the development of students' academic and personal skills.",
  },

  14: {
    ar: "مدرسة دولية تهدف إلى إعداد الطلاب للمستقبل من خلال تعليم حديث وبرامج تساعد على تنمية التفكير والإبداع.",
    en: "An international school focused on preparing students for the future through modern education and programs that encourage creativity and critical thinking.",
  },

  15: {
    ar: "مدارس تهتم بتقديم تعليم متطور يساعد الطلاب على بناء مستقبلهم وتنمية قدراتهم العلمية والإبداعية.",
    en: "Schools providing modern education that helps students build their future while developing their academic and creative abilities.",
  },

  16: {
    ar: "مدرسة تسعى إلى اكتشاف مواهب الطلاب وتشجيعهم على النجاح والتميز من خلال بيئة تعليمية محفزة.",
    en: "A school committed to discovering students' talents and encouraging achievement and excellence in an inspiring learning environment.",
  },

  17: {
    ar: "مدارس تقدم بيئة تعليمية متكاملة تهدف إلى تحقيق التفوق الأكاديمي وتنمية مهارات الطلاب وثقتهم بأنفسهم.",
    en: "A school community providing comprehensive education aimed at academic success, skill development, and building students' confidence.",
  },

  18: {
    ar: "مدرسة دولية تهتم بالتميز الأكاديمي وتوفير تجربة تعليمية حديثة تساعد الطلاب على تحقيق طموحاتهم.",
    en: "An international school focused on academic excellence and providing a modern learning experience that helps students achieve their ambitions.",
  },

  19: {
    ar: "مدارس تهدف إلى تحقيق التميز في التعليم مع الاهتمام بتنمية مهارات التفكير والإبداع والشخصية المتكاملة للطالب.",
    en: "Schools committed to educational excellence while developing critical thinking, creativity, and well-rounded student personalities.",
  },

  20: {
    ar: "مدرسة حديثة توفر بيئة تعليمية محفزة تساعد الطلاب على اكتساب المعرفة وتنمية المهارات والاستعداد للمستقبل.",
    en: "A modern school providing an inspiring educational environment that helps students gain knowledge, develop skills, and prepare for the future.",
  },
};

/* =========================================================
   الصفحة
   ========================================================= */

export default function SchoolsPage() {
  const { language } = useLanguage();

  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/school-slider")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch schools");
        }

        return res.json();
      })
      .then((data) => {
        setSchools(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  /* =======================================================
     Loading
     ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-cyan-700">
          {language === "ar" ? "جاري تحميل المدارس..." : "Loading schools..."}
        </p>
      </main>
    );
  }

  return (
    <main
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 py-10 sm:py-16 px-4 sm:px-6"
    >
      {/* ==================================================
          العنوان
      ================================================== */}

      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#9E7C2F]">
          {language === "ar"
            ? "مدارس مجمع المدارس الذكية"
            : "Smart Schools Complex"}
        </h1>

        <p className="mt-3 text-gray-500 text-sm sm:text-base">
          {language === "ar"
            ? "اكتشف مدارسنا وتعرف على بيانات كل مدرسة"
            : "Discover our schools and learn more about each one"}
        </p>
      </div>

      {/* ==================================================
          كروت المدارس
      ================================================== */}

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
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            {/* صورة + اسم المدرسة فقط */}

            <div className="w-full">
              {/* صورة المدرسة */}

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

            {/* ==================================================
                زر معرفة المزيد
            ================================================== */}

            <button
              type="button"
              onClick={() => setSelectedSchool(school)}
              className="
                mt-5
                w-full
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
              {language === "ar" ? "تفاصيل المدرسة" : "Learn More"}
            </button>
          </div>
        ))}
      </div>

      {/* ==================================================
          الكارت الكبير عند الضغط على معرفة المزيد
      ================================================== */}

      {selectedSchool && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
            px-4
            py-6
          "
          onClick={() => setSelectedSchool(null)}
        >
          <div
            className="
              relative
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              bg-white
              rounded-3xl
              shadow-2xl
              p-6
              sm:p-8
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* ==================================================
                زر الإغلاق X
            ================================================== */}

            <button
              type="button"
              onClick={() => setSelectedSchool(null)}
              className="
                absolute
                top-4
                left-4
                w-10
                h-10
                rounded-full
                bg-gray-100
                text-gray-600
                flex
                items-center
                justify-center
                hover:bg-red-100
                hover:text-red-600
                transition-all
                duration-200
                z-10
              "
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* ==================================================
                لوجو المدرسة
            ================================================== */}

            <div className="flex justify-center mb-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                <Image
                  src={`http://127.0.0.1:8000/${selectedSchool.logo.replaceAll(
                    "\\",
                    "/",
                  )}`}
                  alt={
                    language === "ar"
                      ? selectedSchool.name_ar
                      : selectedSchool.name_en
                  }
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* ==================================================
                اسم المدرسة
            ================================================== */}

            <div className="text-center mb-7">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-800">
                {language === "ar"
                  ? selectedSchool.name_ar
                  : selectedSchool.name_en}
              </h2>

              <div className="w-16 h-1 bg-cyan-700 rounded-full mx-auto mt-3" />
            </div>

            {/* ==================================================
                الوصف — يظهر هنا فقط عند فتح الكارت
            ================================================== */}

            <div
              className="
                mb-7
                bg-cyan-50
                border
                border-cyan-100
                rounded-2xl
                p-5
                sm:p-7
              "
            >
              <h3
                className="
                  text-lg
                  sm:text-xl
                  font-bold
                  text-cyan-800
                  mb-4
                  text-center
                "
              >
                {language === "ar" ? "نبذة عن المدرسة" : "About the School"}
              </h3>

              <p
                className="
                  text-gray-700
                  text-base
                  sm:text-lg
                  leading-8
                  sm:leading-9
                  text-center
                  font-medium
                "
              >
                {schoolDescriptions[selectedSchool.id]
                  ? language === "ar"
                    ? schoolDescriptions[selectedSchool.id].ar
                    : schoolDescriptions[selectedSchool.id].en
                  : language === "ar"
                    ? "مدرسة تعليمية تهدف إلى تقديم تجربة تعليمية متميزة."
                    : "An educational school focused on providing an excellent learning experience."}
              </p>
            </div>

            {/* ==================================================
                بيانات المدرسة
            ================================================== */}

            <div className="space-y-4">
              {/* الاسم العربي */}

              <div
                className="
                  bg-gray-50
                  rounded-2xl
                  p-4
                  border
                  border-gray-100
                "
              >
                <p className="text-sm text-gray-500 mb-1">
                  {language === "ar" ? "اسم المدرسة بالعربي" : "Arabic Name"}
                </p>

                <p className="font-bold text-gray-800 text-base">
                  {selectedSchool.name_ar}
                </p>
              </div>

              {/* الاسم الإنجليزي */}

              <div
                className="
                  bg-gray-50
                  rounded-2xl
                  p-4
                  border
                  border-gray-100
                "
              >
                <p className="text-sm text-gray-500 mb-1">
                  {language === "ar"
                    ? "اسم المدرسة بالإنجليزية"
                    : "English Name"}
                </p>

                <p className="font-bold text-gray-800 text-base direction-ltr">
                  {selectedSchool.name_en}
                </p>
              </div>

              {/* الحالة */}

              <div
                className="
                  bg-gray-50
                  rounded-2xl
                  p-4
                  border
                  border-gray-100
                "
              >
                <p className="text-sm text-gray-500 mb-1">
                  {language === "ar" ? "حالة المدرسة" : "School Status"}
                </p>

                <p
                  className={`font-bold ${
                    selectedSchool.status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedSchool.status
                    ? language === "ar"
                      ? "نشطة"
                      : "Active"
                    : language === "ar"
                      ? "غير نشطة"
                      : "Inactive"}
                </p>
              </div>

              {/* الترتيب */}

              <div
                className="
                  bg-gray-50
                  rounded-2xl
                  p-4
                  border
                  border-gray-100
                "
              >
                <p className="text-sm text-gray-500 mb-1">
                  {language === "ar" ? "ترتيب المدرسة" : "School Order"}
                </p>

                <p className="font-bold text-gray-800">
                  {selectedSchool.sort_order ?? selectedSchool.id}
                </p>
              </div>
            </div>

            {/* ==================================================
                زر الإغلاق
            ================================================== */}

            <button
              type="button"
              onClick={() => setSelectedSchool(null)}
              className="
                mt-7
                w-full
                bg-cyan-700
                hover:bg-cyan-900
                text-white
                py-3
                rounded-xl
                font-semibold
                transition-all
                active:scale-95
              "
            >
              {language === "ar" ? "إغلاق" : "Close"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
