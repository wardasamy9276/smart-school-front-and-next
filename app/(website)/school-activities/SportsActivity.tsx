"use client";

import {
  Dumbbell,
  Trophy,
  Bike,
  Waves,
  Volleyball,
  Target,
  Medal,
  PersonStanding,
  Flame,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

const activities = [
  {
    icon: Dumbbell,
    ar: "الأنشطة الرياضية",
    en: "Sports Activities",
    descriptionAr:
      "نقدم مجموعة متنوعة من الأنشطة الرياضية التي تساعد الطلاب على تطوير قدراتهم البدنية ومهاراتهم الحركية، وتعزز روح التعاون والمنافسة الإيجابية، كما تساهم في بناء الثقة بالنفس والحفاظ على أسلوب حياة صحي ونشط.",
    descriptionEn:
      "We offer a variety of sports activities that help students develop their physical abilities and movement skills. These activities also encourage teamwork, positive competition, self-confidence, and a healthy and active lifestyle.",
  },
  {
    icon: Trophy,
    ar: "كرة القدم",
    en: "Football",
    descriptionAr:
      "تساعد تدريبات ومباريات كرة القدم الطلاب على تطوير اللياقة البدنية والسرعة والمهارات الحركية، بالإضافة إلى تعلم العمل الجماعي والتعاون والالتزام بالقواعد، وتنمية روح المنافسة والاحترام بين الطلاب.",
    descriptionEn:
      "Football training and matches help students improve fitness, speed, and physical skills while teaching teamwork, cooperation, discipline, and respect. Students also develop a positive competitive spirit through enjoyable team activities.",
  },

  {
    icon: Volleyball,
    ar: "كرة الطائرة",
    en: "Volleyball",
    descriptionAr:
      "تساعد كرة الطائرة الطلاب على تنمية سرعة الاستجابة والتنسيق بين العين واليد والتواصل مع زملائهم، كما تعزز التعاون والعمل الجماعي وروح المشاركة والمنافسة الرياضية في أجواء ممتعة.",
    descriptionEn:
      "Volleyball helps students develop quick reactions, hand-eye coordination, and communication skills. It also promotes teamwork, cooperation, participation, and a positive competitive spirit in an enjoyable environment.",
  },

  {
    icon: Medal,
    ar: "المسابقات الرياضية",
    en: "Sports Competitions",
    descriptionAr:
      "تمنح المسابقات الرياضية الطلاب فرصة لإظهار مواهبهم وقدراتهم وتطبيق المهارات التي تعلموها خلال التدريبات، كما تساعدهم على تطوير روح التحدي والإنجاز واحترام المنافسين والعمل بروح رياضية.",
    descriptionEn:
      "Sports competitions give students the opportunity to showcase their talents and apply the skills they have developed during training. They also encourage achievement, challenge, teamwork, respect for competitors, and good sportsmanship.",
  },
  {
    icon: PersonStanding,
    ar: "اللياقة البدنية",
    en: "Fitness",
    descriptionAr:
      "تتضمن أنشطة اللياقة البدنية مجموعة من التمارين التي تساعد الطلاب على تحسين القوة والمرونة والتوازن والتحمل والنشاط، كما تشجعهم على الاهتمام بصحتهم وتبني عادات رياضية إيجابية منذ الصغر.",
    descriptionEn:
      "Fitness activities include exercises that help students improve strength, flexibility, balance, endurance, and overall activity. They also encourage students to care about their health and develop positive exercise habits from an early age.",
  },
  {
    icon: Flame,
    ar: "التمارين الهوائية",
    en: "Aerobics",
    descriptionAr:
      "تساهم التمارين الهوائية في رفع معدل اللياقة القلبية التنفسية، وحرق السعرات الحرارية، وتحسين المزاج العام وزيادة طاقة ونشاط الطلاب طوال اليوم الدراسي.",
    descriptionEn:
      "Aerobic exercises help improve cardiovascular fitness, burn calories, boost overall mood, and increase students' energy and activity throughout the school day.",
  },
];

export default function SportsActivities() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="w-full bg-slate-50/50 py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* العنوان */}
        <div className="mx-auto mb-16 w-full max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {isAr ? "الأنشطة الرياضية" : "Sports Activities"}
          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600 md:text-lg">
            {isAr
              ? "مجموعة متنوعة من الأنشطة الرياضية التي تساعد الطلاب على تطوير مهاراتهم وقدراتهم البدنية ضمن بيئة محفزة وآمنة."
              : "A variety of sports activities designed to develop students' physical skills and abilities within a stimulating and safe environment."}
          </p>
        </div>

        {/* 3 كروت في الصف الواحد (lg:grid-cols-3) مع عرض واسع ومريح */}
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div key={index} className="group relative flex w-full">
                {/* خلفية تفاعلية بصرية */}
                <div
                  className="
                    absolute
                    inset-0
                    translate-y-2
                    scale-[0.97]
                    rounded-[28px]
                    bg-[#067492]/5
                    transition-all
                    duration-500
                    group-hover:translate-y-3
                    group-hover:scale-[0.99]
                  "
                />

                {/* الكارت الأساسي */}
                <div
                  className="
                    relative
                    flex
                    w-full
                    flex-col
                    justify-between
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-gray-200/80
                    bg-white
                    p-8
                    shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                    transition-all
                    duration-500
                    group-hover:-translate-y-1.5
                    group-hover:border-[#067492]/30
                    group-hover:shadow-[0_16px_40px_rgba(6,116,146,0.08)]
                    md:p-10
                  "
                >
                  {/* شريط تلوين علوي تفاعلي */}
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-1.5
                      w-0
                      bg-[#067492]
                      transition-all
                      duration-500
                      group-hover:w-full
                    "
                  />

                  <div>
                    {/* الأيقونة */}
                    <div
                      className="
                        mb-6
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
                        duration-500
                        group-hover:scale-110
                        group-hover:bg-[#067492]
                        group-hover:text-white
                      "
                    >
                      <Icon size={32} strokeWidth={1.8} />
                    </div>

                    {/* العنوان */}
                    <h3
                      className="
                        mb-4
                        text-xl
                        font-bold
                        tracking-wide
                        text-gray-900
                        transition-colors
                        duration-300
                        group-hover:text-[#067492]
                        md:text-2xl
                      "
                    >
                      {isAr ? activity.ar : activity.en}
                    </h3>

                    {/* الوصف */}
                    <p
                      className="
                        text-base
                        font-normal
                        leading-relaxed
                        text-gray-600
                        md:text-[17px]
                        md:leading-8
                      "
                    >
                      {isAr ? activity.descriptionAr : activity.descriptionEn}
                    </p>
                  </div>

                  {/* عنصر تفاعلي سفلي (نقطة إرشادية) */}
                  <div className="mt-8 flex items-center justify-end">
                    <div
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-gray-300
                        transition-all
                        duration-500
                        group-hover:h-2.5
                        group-hover:w-8
                        group-hover:rounded-full
                        group-hover:bg-[#067492]
                      "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
