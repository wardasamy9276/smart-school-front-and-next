"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaGraduationCap,
  FaEnvelope,
  FaLock,
  FaHouse,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";

type UserRole = "student" | "teacher" | "admin";

interface LoginFormData {
  userType: UserRole;
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    userType: "student",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "فشل تسجيل الدخول، تأكد من البيانات");
      }

      localStorage.setItem("user_data", JSON.stringify(data.user));

      const userType = data.user.user_type;

      if (userType === "admin") {
        router.push("/dashboard/admin");
      } else if (userType === "teacher") {
        router.push("/dashboard/teacher");
      } else {
        router.push("/dashboard/student");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(
        error.message || "حدث خطأ في الاتصال بالسيرفر، تأكد من تشغيل لارافيل",
      );
      setIsLoading(false);
    }
  };

  return (
    <main
      className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 min-h-screen flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
        {/* رأس الصفحة والألوان الجديدة (درجات الـ Emerald / Teal الأنيقة) */}
        <div className="bg-emerald-700 p-6 text-center text-white relative">
          <div className="absolute top-4 left-4">
            <Link href="/" className="text-white hover:text-emerald-200">
              <FaHouse size={18} />
            </Link>
          </div>
          <div className="w-16 h-16 bg-white text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg text-2xl font-bold">
            <FaGraduationCap />
          </div>
          <h1 className="text-xl font-bold">مجمع المدارس الحكومية الدولية</h1>
          <p className="text-emerald-200 text-xs mt-1">Smart Schools Complex</p>
        </div>

        {/* نموذج الإدخال */}
        <div className="p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-6 text-center">
            تسجيل الدخول إلى النظام
          </h2>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* اختيار نوع المستخدم */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                تسجيل الدخول بصفة:
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50 text-sm text-slate-800"
              >
                <option value="student">طالب / ولي أمر</option>
                <option value="teacher">معلم</option>
                <option value="admin">إداري / موظف</option>
              </select>
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@smartschools.edu.eg"
                  className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-slate-800"
                />
              </div>
            </div>

            {/* كلمة المرور مع زر إظهار وإخفاء */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-semibold text-slate-700">
                  كلمة المرور
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-emerald-600 hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-10 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* تذكرني */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 ml-2"
                />
                <span className="text-slate-600 text-xs">
                  تذكرني في هذا الجهاز
                </span>
              </label>
            </div>

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-200 text-sm mt-2 flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? "جاري التحقق وتسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          {/* روابط الدعم الفني */}
          <div className="mt-6 text-center border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-500">
              تواجه مشكلة في تسجيل الدخول؟
            </p>
            <Link
              href="/support"
              className="text-xs font-semibold text-emerald-600 hover:underline"
            >
              تواصل مع الدعم الفني للمجمع
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
