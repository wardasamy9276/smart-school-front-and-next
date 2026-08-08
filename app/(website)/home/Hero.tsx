"use client";
import Typewriter from "typewriter-effect";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const heroTranslations = {
  ar: {
    title: "أفضل برنامج تخطيط موارد المؤسسات المدرسية",

    description:
      "نظام تخطيط موارد المؤسسات التعليمية الكل في واحد لمساعدتك في الانتقال إلى نظام رقمي بالكامل. برنامج School ERP هو عبارة عن نظام أساسي يساعد في إدارة المهام التعليمية والإدارية اليومية من منصة واحدة، توفر Pioneers E-School ERP تجربة سهلة الاستخدام مع إمكانية الوصول لتسجيل الدخول للمعلمين والموظفين غير المدرسين والطلاب وأولياء الأمور وموظفي الإدارة في مؤسستك. تعمل الوحدات المختلفة المتوفرة في برنامج تخطيط موارد المؤسسات المدرسية على أتمتة العمليات اليومية لمؤسستك، مثل إدارة قبول الطلاب إلى رقمنه تجربة التعلم عبر الإنترنت، كل ذلك يمكن إدارته بسهولة.",

    details:
      "لدى Pioneers E-School ERP وحدات نمطية لإدارة الجدول الزمني، والحضور، والفصول الدراسية عبر الإنترنت، والامتحانات، ودفاتر الدرجات، والتعلم المتنقل، والمكتبة، والمواصلات، والتقويم المدرسي، والأحداث، وغير ذلك الكثير. يحتوي على وحدة موارد بشرية كاملة لإدارة كشوف المرتبات وقسائم رواتب الموظفين، تساعدك الوحدة المالية على تخطيط وتخصيص هياكل الرسوم المختلفة للطلاب. يعد Pioneers E-School ERP System أيضًا أداة تعاون ممتازة باستخدام المكونات الإضافية والمناقشة والاستطلاع والمدونة والمؤتمرات المرئية. منظومة إدارة المدارس Pioneers E-School منظومة متكاملة تم إنشاؤها تحت مراقبة خبراء في إدارة المدارس الدولية واللغات مع مراعاة استخدام أحدث الوسائل التكنولوجية لاستكمال العملية التعليمية وتعزيز نظام التعليم المدمج في المدارس. تتكون المنظومة من جزء إداري School Management System لإدارة جميع أقسام المدرسة، وجزء للتعليم عن بعد Learning Management System لإدارة عملية التعليم خارج الفصل الدراسي بالمدرسة وتسهيل التواصل مع الطالب والمدرس وولي الأمر، بالإضافة إلى mobile application لاستكمال عملية التواصل مع أهم عناصر المنظومة التعليمية والمتمثلة في الطالب والمدرس وولي الأمر.",
  },

  en: {
    title: "The Best School ERP System",

    description:
      "An all-in-one educational enterprise resource planning system that helps you move to a fully digital environment. School ERP is a platform designed to manage daily educational and administrative tasks from one place. Pioneers E-School ERP provides an easy-to-use experience with login access for teachers, non-teaching staff, students, parents, and administrators in your institution. The different modules available in the school ERP system automate daily operations, from student admission management to digitizing the online learning experience, everything can be managed easily.",

    details:
      "Pioneers E-School ERP includes modules for timetable management, attendance, online classes, exams, grade books, mobile learning, library, transportation, school calendar, events, and much more. It contains a complete HR module for managing payroll and employee salary slips. The financial module helps you plan and customize different student fee structures. Pioneers E-School ERP System is also an excellent collaboration tool using plugins, discussions, surveys, blogs, and video conferences. Pioneers E-School is an integrated school management system created under the supervision of international and language school management experts, considering the use of the latest technological solutions to complete the educational process and enhance blended learning in schools. The system consists of an administrative School Management System to manage all school departments, a Learning Management System to manage distance learning outside the classroom and facilitate communication between students, teachers, and parents, in addition to a mobile application to complete communication with the main elements of the educational system: students, teachers, and parents.",
  },
};

export default function Hero() {
  const { language } = useLanguage();

  const t = heroTranslations[language];

  return (
    <div
      className="
        text-center px-4 py-6 
        sm:px-6 sm:py-8 
        md:px-12 md:py-10 
        lg:px-20 lg:py-16 
        space-y-6
      "
    >
      <h1
        className="text-2xl sm:text-3xl md:text-5xl font-bold
       text-[#0e7490]"
      >
        {t.title}
      </h1>
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#0e7490]">
        <Typewriter
          options={{
            strings: [
              t.title,
              "باقة متكاملة لإدارة المدارس والطلاب",
              "أفضل حلول الـ ERP والـ LMS للمؤسسات",
            ],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
          }}
        />
      </h1>

      <p
        className="text-gray-900 text-base sm:text-lg md:text-xl 
      lg:text-2xl leading-relaxed"
      >
        {t.description}
      </p>

      <Image
        src="/assets/loogo/gemini-svg.svg"
        alt="Hero Image"
        width={300}
        height={300}
        className="mx-auto w-full max-w-md h-auto"
      />

      <p
        className="
          text-gray-900 
          text-base sm:text-lg md:text-xl lg:text-2xl 
          leading-relaxed 
          text-justify
        "
      >
        {t.details}
      </p>
      {/* <Button variant="ghost" className="text-[#0e7490] hover:bg-[#0e7490]/10"> */}
      {/* اضغط هنا
      </Button> */}
    </div>
  );
}
