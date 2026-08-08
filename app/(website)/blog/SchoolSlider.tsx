"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface SchoolSlider {
  id: number;
  name_ar: string;
  name_en: string;
  logo: string;
}

export default function SchoolsSlider() {
  const { language } = useLanguage();

  const [schools, setSchools] = useState<SchoolSlider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/school-slider")
      .then((res) => res.json())
      .then((data: SchoolSlider[]) => {
        setSchools(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 bg-[#080910]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <section className="py-24 px-5 bg-[#080910] text-white relative overflow-hidden min-h-[700px]">
      <h1
        className="
          text-center
          mb-16
          font-bold
          text-[34px]
          text-[#9E7C2F]
          tracking-tight
        "
      >
        {language === "ar" ? "عملاؤنا" : "Our Clients"}
      </h1>

      <div className="relative w-full max-w-[1920px] mx-auto">
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          loop={schools.length > 3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              spaceBetween: -40,
            },
            1024: {
              spaceBetween: -80,
            },
          }}
          className=""
        >
          {schools.map((school) => {
            const imageUrl = school.logo?.startsWith("http")
              ? school.logo
              : `http://127.0.0.1:8000/${school.logo}`;

            return (
              <SwiperSlide key={school.id} className="!w-[320px] !h-[500px]">
                <div
                  className="
                    group
                    relative
                    bg-[#121622]
                    border
                    border-[#1e2536]
                    rounded-[32px]
                    p-6
                    flex
                    flex-col
                    justify-between
                    h-full
                    shadow-2xl
                    transition-all
                    duration-500
                    swiper-slide-active:border-[#9E7C2F]/40
                    swiper-slide-active:shadow-[0_30px_70px_rgba(158,124,47,0.2)]
                  "
                >
                  {/* حاوية الصورة مع تقليل عرضها بداخل الكارت وإعطائها border-radius بدون خلفية أو حدود */}
                  <div
                    className="
                      w-full
                      h-[210px]
                      flex
                      items-center
                      justify-center
                      relative
                    "
                  >
                    <div className="w-[85%] h-full relative rounded-[20px] overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={
                          language === "ar" ? school.name_ar : school.name_en
                        }
                        fill
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* الجزء النصي */}
                  <div className="text-center my-4 flex-grow flex flex-col justify-center">
                    <h3
                      className="
                        text-white
                        font-extrabold
                        text-xl
                        mb-2
                        tracking-wide
                        group-hover:text-[#9E7C2F]
                        transition-colors
                        line-clamp-1
                      "
                    >
                      {language === "ar" ? school.name_ar : school.name_en}
                    </h3>
                    <p
                      className="
                        text-gray-400
                        text-xs
                        leading-relaxed
                        line-clamp-3
                      "
                    >
                      {language === "ar"
                        ? "نظام تعليمي متطور يهدف إلى بناء جيل مبدع وقادر على مواكبة أحدث التطورات الأكاديمية والتقنية."
                        : "An advanced educational system aimed at building a creative generation capable of keeping pace with the latest academic developments."}
                    </p>
                  </div>

                  {/* الزر السفلي */}
                  <div className="w-full mt-auto">
                    <Link href={`/schools/${school.id}`}>
                      <Button
                        className="
                          w-full
                          bg-[#181e2b]
                          hover:bg-[#9E7C2F]
                          text-gray-200
                          hover:text-black
                          border
                          border-[#2e374e]
                          hover:border-[#9E7C2F]
                          rounded-2xl
                          py-3
                          text-sm
                          font-semibold
                          transition-all
                          duration-300
                        "
                      >
                        {language === "ar"
                          ? "اكتشفي المدرسة"
                          : "Explore School"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* زر "كل ما يخص الطلبة" بالأسفل */}
      <div
        className="
          flex
          justify-center
          items-center
          mt-16
        "
      >
        <Link href="/thank-you">
          <Button
            className="
              hidden
              md:inline-flex
              text-white
              bg-cyan-700
              hover:bg-cyan-900
              px-10
              py-4
              rounded-2xl
              shadow-xl
              transition-all
              font-bold
            "
          >
            {language === "ar" ? "كل ما يخص الطلبة" : "Student Information"}
          </Button>
        </Link>
      </div>
    </section>
  );
}
