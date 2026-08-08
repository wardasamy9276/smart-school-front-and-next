"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

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

        // إعادة تحميل الصفحة بعد ثانيتين ليشاهد المستخدم رسالة النجاح
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
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        {/* Title & Header */}
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

        {/* Success Alert */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl mb-6 text-xs sm:text-sm text-center font-medium">
            {isAr
              ? "✓ تم إرسال طلبك بنجاح، سنقوم بالتواصل معك قريبًا!"
              : "✓ Your request has been sent successfully. We will contact you soon!"}
          </div>
        )}

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
              placeholder={isAr ? "example@domain.com" : "example@domain.com"}
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
              {isAr ? "اسم المدرسة / المؤسسة" : "School / Organization Name"}
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
    </main>
  );
}
