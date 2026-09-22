"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import Link from "next/link";

export default function BookDemoPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);

        setForm({
          name: "",
          email: "",
          phone: "",
          school: "",
          message: "",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-2">
            {isAr ? "تواصل معنا" : "Get in Touch"}
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isAr ? "احجز عرضًا تجريبيًا" : "Book a Demo"}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {isAr
              ? "قم بتعبئة النموذج وسيقوم فريقنا بالتواصل معك في أسرع وقت."
              : "Fill out the form below and our team will get back to you shortly."}
          </p>
        </div>

        {/* المحتوى */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* مربع حجز العرض */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            {/* Success Alert */}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl mb-6 text-xs sm:text-sm text-center font-medium">
                {isAr
                  ? "✓ تم إرسال طلبك بنجاح، سنقوم بالتواصل معك قريبًا!"
                  : "✓ Your request has been sent successfully. We will contact you soon!"}
              </div>
            )}

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {isAr ? "احجز العرض التجريبي" : "Book Your Demo"}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? "الاسم الكامل" : "Full Name"}
                </label>

                <input
                  type="text"
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={isAr ? "أدخل اسمك" : "Enter your full name"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? "البريد الإلكتروني" : "Email Address"}
                </label>

                <input
                  type="email"
                  required
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? "رقم الهاتف" : "Phone Number"}
                </label>

                <input
                  type="tel"
                  required
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={isAr ? "05xxxxxxxx" : "+1 234 567 890"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr
                    ? "اسم المدرسة / المؤسسة"
                    : "School / Organization Name"}
                </label>

                <input
                  type="text"
                  required
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  placeholder={isAr ? "أدخل اسم المدرسة" : "Enter school name"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? "الرسالة (اختياري)" : "Message (Optional)"}
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={
                    isAr
                      ? "اكتب استفسارك أو التفاصيل الإضافية هنا..."
                      : "Type your message or inquiry here..."
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-all h-28 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-medium py-3 rounded-xl text-xs sm:text-sm transition-colors shadow-sm mt-2"
              >
                {loading
                  ? isAr
                    ? "جاري الإرسال..."
                    : "Sending..."
                  : isAr
                    ? "احجز العرض التجريبي"
                    : "Book Demo"}
              </button>
            </form>
          </div>

          {/* مربع المحادثة الأكاديمية */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl">
                💬
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                {isAr ? "المحادثة الأكاديمية" : "Academic Chat"}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-6">
                {isAr
                  ? "تواصل أكاديمي بين الطالب والمعلم داخل النظام وتحت إشراف الإدارة."
                  : "Academic communication between students and teachers inside the system under administration supervision."}
              </p>

              <div className="mt-5 space-y-3 text-right">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-slate-700">
                    🎓 {isAr ? "الطالب" : "Student"}
                  </p>

                  <p className="text-[11px] text-slate-500 mt-1">
                    {isAr
                      ? "التواصل مع المعلمين المشترك معهم."
                      : "Communicate with enrolled teachers."}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-slate-700">
                    👨‍🏫 {isAr ? "المعلم" : "Teacher"}
                  </p>

                  <p className="text-[11px] text-slate-500 mt-1">
                    {isAr
                      ? "متابعة محادثات الطلاب الأكاديمية."
                      : "Manage academic conversations with students."}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-slate-700">
                    🛡️ {isAr ? "إشراف الإدارة" : "Administration"}
                  </p>

                  <p className="text-[11px] text-slate-500 mt-1">
                    {isAr
                      ? "المحادثات أكاديمية وتحت إشراف النظام."
                      : "Conversations are academic and supervised."}
                  </p>
                </div>
              </div>

              <Link
                href="/login"
                className="block w-full mt-5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-3 rounded-xl transition-colors"
              >
                {isAr ? "تسجيل الدخول للمحادثة" : "Login to Academic Chat"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
