"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

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
      setError("من فضلك أدخل الاسم");
      return;
    }

    if (!phone.trim()) {
      setError("من فضلك أدخل رقم التليفون");
      return;
    }

    if (!email.trim()) {
      setError("من فضلك أدخل البريد الإلكتروني");
      return;
    }

    setStep(2);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمة المرور غير متطابقة");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-slate-100 flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-md">
        {/* العنوان */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            إنشاء حساب جديد
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            أنشئ حسابك للوصول إلى لوحة التحكم
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
                  الاسم الكامل
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اكتب اسمك بالكامل"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  رقم التليفون
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              <Link
                // href="/login"
                href="/dashboard"
                className="w-full h-12 rounded-xl
                 bg-[#067492] hover:bg-[#055d75] 
                 flex items-center justify-center text-white 
                 font-bold transition"
              >
                تسجيل الدخول
              </Link>
            </form>
          )}

          {/* الخطوة الثانية */}
          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  أنشئ كلمة المرور
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  أدخل كلمة مرور لحماية حسابك
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  كلمة المرور
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  تأكيد كلمة المرور
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#067492] focus:bg-white focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#067492] hover:bg-[#055d75] text-white font-bold transition"
              >
                إنشاء الحساب والدخول
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError("");
                }}
                className="w-full text-sm text-slate-500 hover:text-[#067492]"
              >
                الرجوع وتعديل البيانات
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          جميع بياناتك محمية وآمنة
        </p>
      </div>
    </main>
  );
}
