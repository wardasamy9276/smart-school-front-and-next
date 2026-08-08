"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
  // const { language } = useLanguage();
  const { language, t } = useLanguage();

  const [schools, setSchools] = useState<SchoolSlider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/school-slider")
      // fetch("http://127.0.0.1:8000/api/why-choose-us")
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
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-5 bg-white">
      <h1
        className="
          text-center
          mb-10
          font-bold
          text-[30px]
          text-[#9E7C2F]
        "
      >
        {language === "ar" ? "عملاؤنا" : "Our Clients"}
      </h1>

      <div className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".school-pagination",
          }}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 15,
            },

            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
          className="max-w-6xl mx-auto"
        >
          {schools.map((school) => (
            <SwiperSlide key={school.id}>
              <div
                className="
                    flex
                    flex-col
                    items-center
                  "
              >
                <div
                  className="
                      w-full
                      max-w-[220px]
                      h-[150px]
                      border
                      border-gray-200
                      rounded-2xl
                      shadow-sm
                      flex
                      items-center
                      justify-center
                      p-5
                      bg-white
                      hover:shadow-xl
                      transition-all
                      duration-300
                    "
                >
                  <Image
                    src={`http://127.0.0.1:8000/${school.logo}`}
                    alt={language === "ar" ? school.name_ar : school.name_en}
                    width={160}
                    height={160}
                    className="
                        object-contain
                        max-h-[100px]
                      "
                    unoptimized
                  />
                </div>

                <p
                  className="
                      mt-4
                      text-center
                      text-gray-900
                      font-bold
                      text-sm
                      max-w-[180px]
                      line-clamp-2
                    "
                >
                  {language === "ar" ? school.name_ar : school.name_en}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination تحت أسماء المدارس */}

        <div
          className="
            school-pagination
            flex
            justify-center
            mt-8
          "
        />
      </div>

      <div
        className="
          flex
          justify-center
          items-center
          mt-10
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
              px-6
              py-3
              rounded-2xl
            "
          >
            {language === "ar" ? "كل ما  يخص الطلبة" : "Student Information"}
          </Button>
        </Link>
      </div>
    </section>
  );
}

// كل ما  يخص الطلبة
