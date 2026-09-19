"use client";

import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Trophy, FileText, CheckCircle2, Clock } from "lucide-react";

export default function StudentAcademicPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const subjects = [
    ["اللغة العربية", "Arabic", 92],
    ["اللغة الإنجليزية", "English", 88],
    ["الرياضيات", "Mathematics", 95],
    ["العلوم", "Science", 84],
    ["الدراسات الاجتماعية", "Social Studies", 81],
    ["الحاسب الآلي", "Computer", 97],
  ];

  const assignments = [
    [
      "واجب الرياضيات - الوحدة الرابعة",
      "Mathematics Assignment - Unit 4",
      "تم التسليم",
    ],
    ["بحث عن الطاقة المتجددة", "Renewable Energy Research", "مطلوب"],
    ["تدريب اللغة الإنجليزية", "English Practice", "مطلوب"],
    ["تطبيقات الحاسب الآلي", "Computer Applications", "تم التسليم"],
  ];

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 py-16"
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-950 to-cyan-700 rounded-[2rem] p-8 md:p-12 text-white">
          <BookOpen size={45} />

          <h1 className="text-4xl md:text-5xl font-black mt-6">
            {isArabic ? "المعلومات الأكاديمية" : "Academic Information"}
          </h1>

          <p className="text-cyan-100 text-lg leading-9 mt-5 max-w-3xl">
            {isArabic
              ? "تابع المواد الدراسية والدرجات والواجبات ونسبة الإنجاز الأكاديمي للطالب."
              : "Track subjects, grades, assignments and academic progress."}
          </p>
        </div>

        {/* Average */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-gray-500">
              {isArabic ? "المعدل العام" : "Overall Average"}
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="text-5xl font-black text-cyan-800">87%</span>

              <Trophy className="text-yellow-500" size={50} />
            </div>

            <div className="h-4 bg-gray-100 rounded-full mt-7 overflow-hidden">
              <div className="h-full bg-cyan-700 w-[87%] rounded-full" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-gray-500">
              {isArabic ? "عدد المواد" : "Subjects"}
            </p>

            <p className="text-5xl font-black text-gray-900 mt-5">12</p>

            <p className="text-green-600 font-bold mt-3">
              {isArabic ? "جميع المواد نشطة" : "All subjects active"}
            </p>
          </div>
        </div>

        {/* Subjects */}
        <section className="mt-12">
          <h2 className="text-3xl font-black mb-7">
            {isArabic ? "المواد والدرجات" : "Subjects & Grades"}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {subjects.map(([ar, en, grade], index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-7 shadow-sm border hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center">
                      <BookOpen className="text-cyan-700" />
                    </div>

                    <h3 className="font-black text-lg">{isArabic ? ar : en}</h3>
                  </div>

                  <span className="text-2xl font-black">{grade}%</span>
                </div>

                <div className="h-3 bg-gray-100 rounded-full mt-6 overflow-hidden">
                  <div
                    className="h-full bg-cyan-700 rounded-full"
                    style={{ width: `${grade}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assignments */}
        <section className="mt-14">
          <h2 className="text-3xl font-black mb-7">
            {isArabic ? "الواجبات والمهام" : "Assignments & Tasks"}
          </h2>

          <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden">
            {assignments.map(([ar, en, status], index) => (
              <div
                key={index}
                className="p-6 border-b last:border-0 flex flex-col md:flex-row justify-between gap-5"
              >
                <div className="flex gap-4 items-center">
                  <FileText className="text-cyan-700" size={28} />

                  <div>
                    <h3 className="font-bold text-lg">{isArabic ? ar : en}</h3>

                    <p className="text-gray-400 mt-1 flex gap-2">
                      <Clock size={16} />
                      07 Sep 2026
                    </p>
                  </div>
                </div>

                <span
                  className={`px-5 py-2 rounded-xl font-bold self-start ${
                    status === "تم التسليم"
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {isArabic
                    ? status
                    : status === "تم التسليم"
                      ? "Completed"
                      : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Results */}
        <section className="mt-14">
          <h2 className="text-3xl font-black mb-7">
            {isArabic ? "آخر النتائج" : "Latest Results"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["الرياضيات", "Mathematics", "95/100"],
              ["العلوم", "Science", "84/100"],
              ["اللغة الإنجليزية", "English", "88/100"],
            ].map(([ar, en, grade], index) => (
              <div key={index} className="bg-white rounded-3xl p-7 shadow-sm">
                <CheckCircle2 className="text-green-600" size={32} />

                <h3 className="font-black text-xl mt-5">
                  {isArabic ? ar : en}
                </h3>

                <p className="text-4xl font-black text-cyan-800 mt-4">
                  {grade}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
