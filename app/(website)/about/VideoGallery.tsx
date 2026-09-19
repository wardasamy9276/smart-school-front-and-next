"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function VideoGallery() {
  const { language } = useLanguage() as { language: "ar" | "en" };

  // بيانات الفيديوهات المخصصة للأطفال
  const videosData = [
    {
      id: 1,
      titleAr: "مملكة الأبطال الصغار ",
      titleEn: "Little Heroes Kingdom",
      descAr:
        "شاهد كيف ندير مغامرات المدرسة الذكية ونتابع نجاح الأبطال يوماً بيوم بكل سهولة وبساطة.",
      descEn:
        "Watch how we manage smart school adventures and track heroes' success day by day.",
      src: "/assets/imge/IMG_0355warda.mp4",
    },
    {
      id: 2,
      titleAr: "بوابة النجوم والأصدقاء",
      titleEn: "Stars & Friends Portal",
      descAr:
        "مكانك السحري لمتابعة جدول الحصص، الهدايا، والنجوم التي جمعتها في رحلتك المدرسية الممتعة.",
      descEn:
        "Your magical place to track schedules, gifts, and the stars you earned on your school journey.",
      src: "/assets/imge/IMG_0355warda.mp4",
    },
    {
      id: 3,
      titleAr: "المغامرات والمسابقات الذكية",
      titleEn: "Smart Adventures & Quizzes",
      descAr:
        "اختبر ذكاءك وحل الألغاز والمسابقات التفاعلية وكأنك تلعب أحلى وأروع الألعاب الرقمية.",
      descEn:
        "Test your intelligence, solve puzzles, and play interactive quizzes just like your favorite games.",
      src: "/assets/imge/IMG_0355warda.mp4",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto my-12">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0e7490]">
          {language === "ar"
            ? "جولة في عالم المغامرات الذكية"
            : "Tour of Smart Adventures"}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          {language === "ar"
            ? "تعال وشاهد كيف تصبح المدرسة لعبة ممتعة ومليئة بالتشجيع، الذكاء، والمرح المستمر!"
            : "Come and see how school becomes a fun game full of encouragement, intelligence, and joy!"}
        </p>
      </div>

      {/* شبكة الكروت */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videosData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            {/* إطار الفيديو */}
            <div className="bg-black overflow-hidden relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[45vh] object-cover block"
              >
                <source src={item.src} type="video/mp4" />
                المتصفح الخاص بك لا يدعم تشغيل الفيديو.
              </video>
            </div>

            {/* تفاصيل الكارت (العنوان والوصف) */}
            <div
              className="p-6 flex flex-col flex-grow text-right"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === "ar" ? item.titleAr : item.titleEn}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {language === "ar" ? item.descAr : item.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
