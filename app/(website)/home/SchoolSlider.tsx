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
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <section
      className="py-16 px-5 bg-white
     overflow-hidden"
    >
      {/* العنوان والوصف */}

      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1
          className="
            text-center
            mb-5
            font-bold
            text-[30px]
            md:text-[36px]
            text-[#9E7C2F]
          "
        >
          {language === "ar" ? "عملاؤنا" : "Our Clients"}
        </h1>

        <p
          className="
            text-gray-600
            text-base
            md:text-lg
            leading-8
            md:leading-9
            max-w-3xl
            mx-auto
          "
        >
          {language === "ar"
            ? "نفخر بثقة شركائنا من المدارس والمؤسسات التعليمية التي تعتمد على حلولنا لتطوير العملية التعليمية والإدارية. نعمل مع مدارس متنوعة لتقديم تجربة تعليمية حديثة تساعد على تنظيم العمل، وتسهيل التواصل بين الإدارة والمعلمين والطلاب وأولياء الأمور، وتحقيق بيئة تعليمية أكثر تطورًا وكفاءة."
            : "We are proud of the trust placed in us by our partner schools and educational institutions. We work with a variety of schools to provide modern solutions that help improve educational and administrative processes, facilitate communication between management, teachers, students, and parents, and create a more efficient learning environment."}
        </p>
      </div>

      {/* Slider */}

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
              <div className="flex flex-col items-center">
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
                    hover:-translate-y-1
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
                    md:text-base
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

        {/* Pagination */}

        <div
          className="
            school-pagination
            flex
            justify-center
            mt-8
          "
        />
      </div>

      {/* زرار */}

      <div className="flex justify-center items-center mt-12">
        <Link href="/student-information">
          <Button
            className="
              hidden
              md:inline-flex
              text-white
              bg-cyan-700
              hover:bg-cyan-900
              px-7
              py-6
              rounded-2xl
              transition-all
              duration-300
              hover:scale-105
            "
          >
            {/* {language === "ar" ? "كل ما يخص الطلبة" : "Student Information"}
             */}
            <span>{language ? "استكشف مدارسنا" : "Explore Our Schools"}</span>
            <Image src="/icon/Icon8.png" alt="Icon" width={35} height={35} />
          </Button>
        </Link>
      </div>
    </section>
  );
}
