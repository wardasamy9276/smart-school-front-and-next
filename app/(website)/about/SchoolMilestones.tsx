"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const faqData = [
  {
    id: 1,
    question: {
      ar: "ما هو نظام Smart Schools Complex (SMS)؟",
      en: "What is the Smart Schools Complex (SMS) system?",
    },
    answer: {
      ar: "هو نظام إداري وتعليمي سحابي متكامل ومصمم خصيصاً لمجمع مدارس سمارت لإدارة المدارس الخاصة والدولية بكفاءة عالية واحترافية مطلقة. يربط النظام بين الإدارة، المعلمين، الطلاب، وأولياء الأمور في منصة رقمية واحدة تسهل متابعة شؤون الطلاب الأكاديمية، السلوكية، والإدارية لحظة بلحظة مع توفير تقارير دقيقة ومستمرة.",
      en: "It is an integrated cloud-based administrative and educational system specially designed for Smart Schools Complex to manage private and international schools with high efficiency and absolute professionalism. The system connects administration, teachers, students, and parents into a single digital platform that facilitates tracking student academic, behavioral, and administrative affairs moment by moment while providing accurate and continuous reports.",
    },
  },
  {
    id: 2,
    question: {
      ar: "هل يمكن استخدام النظام على الهواتف والأجهزة الذكية؟",
      en: "Can the system be used on smartphones and smart devices?",
    },
    answer: {
      ar: "نعم، النظام متوافق تماماً مع جميع الأجهزة الذكية والهواتف المحمولة واللوحية. ويوفر مجمع سمارت تطبيقات مخصصة وسهلة الاستخدام لكل من الطلاب، المعلمين، وأولياء الأمور لضمان الوصول السريع للمعلومات والاشعارات في أي وقت ومن أي مكان.",
      en: "Yes, the system is fully compatible with all smart devices, mobile phones, and tablets. Smart Schools Complex provides dedicated and easy-to-use applications for students, teachers, and parents to ensure quick access to information and notifications anytime and anywhere.",
    },
  },
  {
    id: 3,
    question: {
      ar: "هل البيانات الشخصية والأكاديمية آمنة داخل النظام؟",
      en: "Is personal and academic data secure within the system?",
    },
    answer: {
      ar: "بالتأكيد؛ يعتمد النظام على أحدث بروتوكولات التخزين السحابي الآمن والحماية السيبرانية المتقدمة لضمان السرية التامة لكافة بيانات الطلاب، الموظفين، والتقارير المالية والإدارية، مع وجود نسخ احتياطي دوري ومنتظم.",
      en: "Absolutely; the system relies on the latest secure cloud storage protocols and advanced cybersecurity to ensure complete confidentiality of all student records, staff data, and financial/administrative reports, along with regular and periodic backups.",
    },
  },
  {
    id: 4,
    question: {
      ar: "كيف تتم متابعة الحضور والغياب للطلاب داخل المجمع؟",
      en: "How is student attendance and absence tracked within the complex?",
    },
    answer: {
      ar: "يوفر النظام لوحة تحكم ذكية ومباشرة لمتابعة الحضور والغياب بشكل لحظي ويومي. فور تسجيل غياب الطالب، يقوم النظام تلقائياً بإرسال تنبيهات فورية ورسائل نصية أو إشعارات لأولياء الأمور لضمان أعلى مستويات الأمان والمتابعة المشتركة.",
      en: "The system provides an intelligent and direct dashboard to track attendance and absence instantly and daily. Upon recording a student's absence, the system automatically sends instant alerts, text messages, or notifications to parents to ensure the highest levels of safety and shared monitoring.",
    },
  },
  {
    id: 5,
    question: {
      ar: "هل يتيح النظام إرسال الرسائل النصية والتنبيهات المباشرة؟",
      en: "Does the system allow sending text messages and direct alerts?",
    },
    answer: {
      ar: "نعم، يتيح النظام إمكانية إرسال الرسائل النصية القصيرة (SMS) والإشعارات الفورية (Push Notifications) لأولياء الأمور، المعلمين، أو الطلاب مباشرة من لوحة التحكم، سواء للتعاميم المدرسية، تنبيهات المصروفات، أو المتابعة الفردية.",
      en: "Yes, the system allows sending Short Message Service (SMS) and instant Push Notifications to parents, teachers, or students directly from the control panel, whether for school circulars, fee reminders, or individual follow-ups.",
    },
  },
  {
    id: 6,
    question: {
      ar: "هل يدعم النظام إدارة الجداول الدراسية والامتحانات؟",
      en: "Does the system support managing class schedules and exams?",
    },
    answer: {
      ar: "نعم، يمتلك النظام محركاً قوياً لإنشاء وتعديل الجداول المدرسية بكل مرونة، ومتابعة الحصص، وتوزيع المعلمين، بالإضافة إلى إدارة مواعيد ونتائج الامتحانات الشهرية والفصلية بكفاءة عالية ومنع أي تعارض زمني.",
      en: "Yes, the system possesses a powerful engine to create and modify class schedules flexibly, monitor classes, distribute teachers, and manage monthly and term exam schedules and results with high efficiency while preventing any scheduling conflicts.",
    },
  },
  {
    id: 7,
    question: {
      ar: "هل يوفر النظام تقارير أداء ومتابعة مفصلة للطلاب؟",
      en: "Does the system provide detailed student performance and progress reports?",
    },
    answer: {
      ar: "نعم، يقدم النظام تقارير أكاديمية والسلوكية شاملة ومفصلة عن درجات الطلاب، مستواهم التحصيلي، نقاط القوة والضعف لديهم، ومشاركتهم الصفية، مما يساعد ولي الأمر والمعلم على توجيه الطالب بالشكل الأمثل.",
      en: "Yes, the system delivers comprehensive and detailed academic and behavioral reports on student grades, achievement levels, strengths and weaknesses, and classroom participation, helping parents and teachers guide the student optimally.",
    },
  },
  {
    id: 8,
    question: {
      ar: "هل يمكن دمج النظام مع البرامج المحاسبية والمالية؟",
      en: "Can the system be integrated with accounting and financial software?",
    },
    answer: {
      ar: "نعم، يدعم النظام تصدير البيانات والتكامل السلس مع برامج المحاسبة المعتمدة لتسهيل متابعة الرسوم الدراسية، الأقساط، المدفوعات، وإصدار الفواتير بدقة وسهولة تامة للإدارة المالية للمجمع.",
      en: "Yes, the system supports data export and seamless integration with certified accounting software to facilitate monitoring tuition fees, installments, payments, and issuing invoices accurately and easily for the complex's financial management.",
    },
  },
  {
    id: 9,
    question: {
      ar: "هل يمكن إضافة مستخدمين جدد وتحديد الصلاحيات بسهولة؟",
      en: "Can new users be added and permissions defined easily?",
    },
    answer: {
      ar: "نعم، يوفر النظام واجهة إدارة مرنة لإنشاء وتفعيل حسابات جديدة للمعلمين، الطلاب، وأولياء الأمور بسرعة، مع إمكانية تخصيص وتحديد الصلاحيات الأمنية والإدارية بدقة لكل مستخدم بناءً على دوره داخل المجمع.",
      en: "Yes, the system provides a flexible management interface to quickly create and activate new accounts for teachers, students, and parents, with the ability to precisely customize and assign security and administrative permissions to each user based on their role.",
    },
  },
  {
    id: 10,
    question: {
      ar: "هل يتوفر دعم فني ومساعدة مستمرة للنظام؟",
      en: "Is technical support and ongoing assistance available for the system?",
    },
    answer: {
      ar: "نعم، يوفر مجمع سمارت فريق دعم فني وتقني متكامل ومتاح لمساعدة المستخدمين (من أولياء أمور ومعلمين وإداريين) على مدار الساعة لحل أي استفسارات أو مشاكل تقنية وضمان استمرارية العملية التعليمية بسلاسة.",
      en: "Yes, Smart Schools Complex provides a fully integrated technical support team available around the clock to assist users (parents, teachers, and administrators) in resolving any inquiries or technical issues and ensuring the smooth continuity of the educational process.",
    },
  },
];

export default function FAQComponent() {
  const { language } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(1); // فتح أول سؤال افتراضياً

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const content = {
    ar: {
      tag: "الأسئلة الشائعة",
      title: "كل ما تحتاج معرفته عن نظام مجمع مدارس سمارت",
      description: "والخدمات التعليمية والإدارية المقدمة.",
    },
    en: {
      tag: "Frequently Asked Questions",
      title: "Everything You Need to Know About Smart Schools System",
      description: "And the educational and administrative services provided.",
    },
  };

  const t = content[language as keyof typeof content] || content.ar;

  return (
    <div
      className="p-6 md:p-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* خلفية جمالية متناسقة */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-sm font-bold tracking-wide border border-cyan-200">
            {t.tag}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f3b4c] mb-4">
            {t.title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`transition-all duration-300 rounded-3xl border bg-white overflow-hidden shadow-sm ${
                  isOpen
                    ? "border-cyan-700/50 shadow-lg shadow-cyan-700/5 ring-1 ring-cyan-700/20"
                    : "border-gray-200/80 hover:border-cyan-200 hover:shadow-md"
                }`}
              >
                <div
                  onClick={() => toggle(item.id)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-start gap-4 cursor-pointer select-none"
                >
                  <h3 className="font-bold text-lg md:text-xl text-gray-900 pr-2">
                    {item.question[language as keyof typeof item.question] ||
                      item.question.ar}
                  </h3>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 font-bold text-xl ${
                      isOpen
                        ? "bg-cyan-700 text-white shadow-md shadow-cyan-700/30"
                        : "bg-gray-100 text-cyan-800 hover:bg-cyan-50"
                    }`}
                  >
                    <span>{isOpen ? "−" : "+"}</span>
                  </div>
                </div>

                {/* الإجابة والنص الكبير المفصل */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-8 px-6 md:px-8 pt-0"
                      : "grid-rows-[0fr] opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 text-base md:text-lg leading-loose font-normal">
                        {item.answer[language as keyof typeof item.answer] ||
                          item.answer.ar}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
