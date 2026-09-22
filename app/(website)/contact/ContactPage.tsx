"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaPaperPlane,
  FaWhatsapp,
  FaGlobe,
} from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext"; // 👈 استدعاء الـ Hook الصحيح للغة

const API_URL = "http://127.0.0.1:8000/api";

export default function ContactPage() {
  const { language, t, toggleLanguage } = useLanguage(); // 👈 استخدام الـ Context العام للغة والترجمة

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || t.errorMsg);
      }

      if (result.success) {
        setSuccessMessage(t.successMsg);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || t.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-100 py-12 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Language Switcher Bar */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <FaGlobe className="text-emerald-600" />
            {t.langSwitch}
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">{t.title}</h1>
          <p className="mt-2 text-sm text-slate-600">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <div className="bg-emerald-800 text-white rounded-2xl p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">{t.contactInfoTitle}</h2>
              <p className="text-emerald-100 text-sm leading-relaxed mb-6">
                {t.contactInfoDesc}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              {/* اللوكيشن - رابط حقيقي لخرائط جوجل */}
              <a
                href="https://maps.google.com/?q=Cairo,Egypt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-emerald-200 transition-colors"
              >
                <FaLocationDot
                  className="text-emerald-300 shrink-0"
                  size={18}
                />
                <span>{t.locationText}</span>
              </a>

              {/* رقم التليفون - رابط اتصال مباشر */}
              <a
                href="tel:+201000000000"
                className="flex items-center gap-3 hover:text-emerald-200 transition-colors"
              >
                <FaPhone className="text-emerald-300 shrink-0" size={18} />
                <span dir="ltr">{t.phoneText}</span>
              </a>

              {/* رقم الواتساب - رابط دردشة مباشر */}
              <a
                href={`https://wa.me/201000000000?text=${encodeURIComponent(
                  t.whatsappMsg,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-emerald-200 transition-colors"
              >
                <FaWhatsapp className="text-emerald-300 shrink-0" size={18} />
                <span dir="ltr">{t.whatsappText}</span>
              </a>

              {/* البريد الإلكتروني - رابط بريدي مباشر */}
              <a
                href="mailto:admission@smartschools.edu.eg"
                className="flex items-center gap-3 hover:text-emerald-200 transition-colors break-all"
              >
                <FaEnvelope className="text-emerald-300 shrink-0" size={18} />
                <span>{t.emailText}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-emerald-700 text-xs text-emerald-200">
              {t.workingHours}
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              {t.formTitle}
            </h2>

            {successMessage && (
              <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700 text-sm font-medium text-center">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-600 text-sm font-medium text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.subjectLabel}
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.subjectPlaceholder}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.messageLabel}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-slate-800 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
              >
                <FaPaperPlane size={14} />
                {loading ? t.sendingBtn : t.submitBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
