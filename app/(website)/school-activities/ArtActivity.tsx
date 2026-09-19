"use client";

import {
  Palette,
  Music,
  BookOpen,
  FlaskConical,
  MonitorPlay,
  Lightbulb,
  Globe2,
  Users,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

const activities = [
  {
    icon: Palette,
    ar: "الفنون والإبداع",
    en: "Arts & Creativity",
    descriptionAr:
      "أنشطة فنية تساعد الطلاب على التعبير عن أفكارهم واكتشاف مواهبهم الإبداعية.",
    descriptionEn:
      "Artistic activities that help students express their ideas and discover their creative talents.",
  },
  {
    icon: Music,
    ar: "الموسيقى",
    en: "Music",
    descriptionAr:
      "أنشطة موسيقية تنمي الذوق الفني والتركيز والعمل الجماعي لدى الطلاب.",
    descriptionEn:
      "Music activities that develop artistic appreciation, concentration and teamwork.",
  },
  {
    icon: BookOpen,
    ar: "القراءة",
    en: "Reading",
    descriptionAr:
      "برامج وأنشطة للقراءة تساعد الطلاب على توسيع المعرفة وتنمية مهارات التفكير والتعبير.",
    descriptionEn:
      "Reading programs that expand knowledge and develop thinking and communication skills.",
  },
  {
    icon: FlaskConical,
    ar: "العلوم والتجارب",
    en: "Science & Experiments",
    descriptionAr:
      "تجارب علمية مبسطة تشجع الطلاب على الاكتشاف والملاحظة وحل المشكلات.",
    descriptionEn:
      "Simple science experiments that encourage discovery, observation and problem solving.",
  },
  {
    icon: MonitorPlay,
    ar: "التكنولوجيا",
    en: "Technology",
    descriptionAr:
      "أنشطة تقنية تساعد الطلاب على اكتساب مهارات رقمية واستخدام التكنولوجيا بطريقة فعالة.",
    descriptionEn:
      "Technology activities that help students develop digital skills and use technology effectively.",
  },
  {
    icon: Lightbulb,
    ar: "الابتكار",
    en: "Innovation",
    descriptionAr:
      "أنشطة مبتكرة تشجع الطلاب على التفكير خارج الصندوق وتحويل الأفكار إلى حلول.",
    descriptionEn:
      "Innovative activities that encourage students to think differently and turn ideas into solutions.",
  },
  {
    icon: Globe2,
    ar: "الثقافة واللغات",
    en: "Culture & Languages",
    descriptionAr:
      "أنشطة ثقافية ولغوية تساعد الطلاب على التعرف على ثقافات مختلفة وتطوير مهارات التواصل.",
    descriptionEn:
      "Cultural and language activities that introduce students to different cultures and improve communication.",
  },
  {
    icon: Users,
    ar: "الأنشطة الاجتماعية",
    en: "Social Activities",
    descriptionAr:
      "أنشطة جماعية تنمي روح التعاون والمشاركة والمسؤولية لدى الطلاب.",
    descriptionEn:
      "Group activities that develop cooperation, participation and responsibility among students.",
  },
];

export default function OtherActivities() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="w-full bg-gray-50 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* =========================
            العنوان
        ========================= */}

        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-[#067492]/10 px-5 py-2 text-sm font-bold text-[#067492]">
            {isAr ? "اكتشف أنشطتنا" : "Discover Our Activities"}
          </span>

          <h2 className="mt-5 text-3xl font-bold text-gray-800 md:text-5xl">
            {isAr
              ? "أنشطة متنوعة لتنمية الطلاب"
              : "Activities for Student Growth"}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-500 md:text-lg">
            {isAr
              ? "مجموعة من الأنشطة التعليمية والثقافية والإبداعية التي تمنح الطلاب تجربة متكاملة."
              : "A collection of educational, cultural and creative activities that provide students with a complete experience."}
          </p>
        </div>

        {/* =========================
            قائمة الأنشطة
        ========================= */}

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-5
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#067492]/30
                  hover:shadow-xl
                  md:p-6
                "
              >
                {/* رقم النشاط */}

                <div
                  className="
                    hidden
                    shrink-0
                    text-4xl
                    font-black
                    text-gray-100
                    transition-all
                    duration-300
                    group-hover:text-[#067492]/10
                    sm:block
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* الأيقونة */}

                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#067492]/10
                    text-[#067492]
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:bg-[#067492]
                    group-hover:text-white
                  "
                >
                  <Icon size={32} strokeWidth={2} />
                </div>

                {/* المحتوى */}

                <div className="min-w-0 flex-1">
                  <h3
                    className="
                      text-xl
                      font-bold
                      text-gray-800
                      transition-colors
                      duration-300
                      group-hover:text-[#067492]
                      md:text-2xl
                    "
                  >
                    {isAr ? activity.ar : activity.en}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-7
                      text-gray-500
                      md:text-base
                      md:leading-8
                    "
                  >
                    {isAr ? activity.descriptionAr : activity.descriptionEn}
                  </p>
                </div>

                {/* السهم */}

                <div
                  className="
                    hidden
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    text-gray-400
                    transition-all
                    duration-300
                    group-hover:bg-[#067492]/10
                    group-hover:text-[#067492]
                    sm:flex
                  "
                >
                  <span className="text-xl">{isAr ? "←" : "→"}</span>
                </div>

                {/* خط جانبي */}

                <div
                  className="
                    absolute
                    bottom-0
                    top-0
                    w-1
                    scale-y-0
                    bg-[#067492]
                    transition-transform
                    duration-300
                    group-hover:scale-y-100
                    ltr:left-0
                    rtl:right-0
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
