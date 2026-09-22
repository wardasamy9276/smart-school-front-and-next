"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  // FaHouse,
  FaGraduationCap,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSchool,
  FaArrowRight,
} from "react-icons/fa";

interface AdmissionFormData {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  academicStage: string;
  previousSchool: string;
  notes: string;
}

export default function AdmissionPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const isRtl = language === "ar";

  const [formData, setFormData] = useState<AdmissionFormData>({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    academicStage: "primary",
    previousSchool: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "فشل إرسال طلب التقديم، يرجى المحاولة لاحقاً.",
        );
      }

      setSuccessMessage(
        "تم إرسال طلب الالتحاق بنجاح! سيتم التواصل معكم قريباً.",
      );
      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        academicStage: "primary",
        previousSchool: "",
        notes: "",
      });
    } catch (error: any) {
      console.error("Admission error:", error);
      setErrorMessage(
        error.message || "حدث خطأ في الاتصال بالخادم، تأكد من تشغيل لارافيل.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      dir={t.dir || (isRtl ? "rtl" : "ltr")}
      className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Glow Elements */}
      <div className="absolute top-0 start-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 end-10 h-[500px] w-[500px] rounded-full bg-teal-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Navigation Header / Home Button */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-200 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 text-sm font-semibold"
          >
            {/* <FaHouse size={16} /> */}
            <span>{t.home || "الرئيسية"}</span>
          </Link>
          <div className="text-white text-xs bg-emerald-800/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            Smart Schools Complex - Admission
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header Banner */}
          <div className="bg-emerald-700 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-600/50 rounded-full blur-2xl pointer-events-none" />

            <div className="w-20 h-20 bg-white text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl text-3xl font-bold transform rotate-3 hover:rotate-0 transition-transform">
              <FaGraduationCap />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
              {t.footer_apply_now || "طلب التقديم للعام الدراسي الجديد"}
            </h1>
            <p className="text-emerald-100 text-sm mt-2 max-w-lg mx-auto">
              انضم إلى عائلة مجمع المدارس الحكومية الدولية واستمتع بتجربة
              تعليمية رائدة ومبتكرة لأبنائك.
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 sm:p-10">
            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-400 text-emerald-800 rounded-2xl text-sm flex items-center gap-3 shadow-sm">
                <FaCheckCircle
                  size={20}
                  className="text-emerald-600 shrink-0"
                />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-2xl text-sm text-center shadow-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* اسم الطالب */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    اسم الطالب الثلاثي <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="أدخل اسم الطالب كاملاً"
                      className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-slate-800 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* اسم ولي الأمر */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    اسم ولي الأمر <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      name="parentName"
                      required
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="أدخل اسم ولي الأمر"
                      className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-slate-800 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* البريد الإلكتروني */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-slate-800 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* رقم الهاتف / الواتساب */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    رقم الهاتف (واتساب) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                      <FaPhone />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01000000000"
                      className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-slate-800 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* المرحلة الدراسية */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    المرحلة الدراسية المطلوبة{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                      <FaGraduationCap />
                    </span>
                    <select
                      name="academicStage"
                      value={formData.academicStage}
                      onChange={handleChange}
                      className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-slate-800 bg-slate-50/50"
                    >
                      <option value="kg">رياض الأطفال (KG)</option>
                      <option value="primary">المرحلة الابتدائية</option>
                      <option value="prep">المرحلة الإعدادية</option>
                      <option value="secondary">المرحلة الثانوية</option>
                    </select>
                  </div>
                </div>

                {/* المدرسة السابقة */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    المدرسة المحول منها (إن وجدت)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                      <FaSchool />
                    </span>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      placeholder="اسم المدرسة السابقة"
                      className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-slate-800 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* ملاحظات إضافية */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ملاحظات أو استفسارات إضافية
                </label>
                <div>
                  <textarea
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="اكتب أي تفاصيل أخرى ترغب في إضافتها..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-slate-800 bg-slate-50/50 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] text-base flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span>جاري إرسال الطلب...</span>
                ) : (
                  <>
                    <span>إرسال طلب الالتحاق</span>
                    <FaArrowRight className="rotate-180" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer info under card */}
        <div className="mt-8 text-center text-xs text-slate-400">
          جميع الحقوق محفوظة © {new Date().getFullYear()} مجمع المدارس الحكومية
          الدولية
        </div>
      </div>
    </main>
  );
}
