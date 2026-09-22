"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { FaGlobe } from "react-icons/fa";

export default function Register() {
  const router = useRouter();
  const { t, language, toggleLanguage } = useLanguage();
  const isRtl = language === "ar";

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError(t.errorNameRequired || "من فضلك أدخل الاسم");
      return;
    }

    if (!phone.trim()) {
      setError(t.errorPhoneRequired || "من فضلك أدخل رقم التليفون");
      return;
    }

    if (!email.trim()) {
      setError(t.errorEmailRequired || "من فضلك أدخل البريد الإلكتروني");
      return;
    }

    setStep(2);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(
        t.errorPasswordLength || "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(t.errorPasswordMatch || "كلمة المرور غير متطابقة");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-slate-100 flex flex-col items-center justify-center px-4 py-10 relative"
    >
      {/* زر تبديل اللغة */}
      {/* <div className="absolute top-6 end-6">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition cursor-pointer"
        >
          <FaGlobe className="text-[#067492]" />
          {t.langSwitch || (isRtl ? "English" : "عربي")}
        </button>
      </div> */}

      <div className="w-full max-w-md">
        {/* العنوان */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            {t.registerTitle || "إنشاء حساب جديد"}
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            {t.registerSubtitle || "أنشئ حسابك للوصول إلى لوحة التحكم"}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
          {/* رسالة الخطأ */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm text-center">
              {error}
            </div>
          )}

          {/* الخطوة الأولى */}
          {step === 1 && (
            <form onSubmit={handleUserData} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.fullNameLabel || "الاسم الكامل"}
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.fullNamePlaceholder || "اكتب اسمك بالكامل"}
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.phoneLabel || "رقم التليفون"}
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.emailLabel || "البريد الإلكتروني"}
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100 text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#067492] hover:bg-[#055d75] flex items-center justify-center text-white font-bold transition cursor-pointer"
              >
                {t.nextStepBtn || "التالي"}
              </button>
            </form>
          )}

          {/* الخطوة الثانية */}
          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  {t.createPasswordTitle || "أنشئ كلمة المرور"}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {t.createPasswordSubtitle || "أدخل كلمة مرور لحماية حسابك"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.passwordLabel || "كلمة المرور"}
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.confirmPasswordLabel || "تأكيد كلمة المرور"}
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100 text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#067492] hover:bg-[#055d75] text-white font-bold transition cursor-pointer"
              >
                {t.finishRegisterBtn || "إنشاء الحساب والدخول"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError("");
                }}
                className="w-full text-sm text-slate-500 hover:text-[#067492] cursor-pointer"
              >
                {t.backStepBtn || "الرجوع وتعديل البيانات"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          {t.secureDataNotice || "جميع بياناتك محمية وآمنة"}
        </p>
      </div>
    </main>
  );
}
