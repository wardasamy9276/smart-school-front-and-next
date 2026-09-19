"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Database,
  RefreshCw,
  School,
  Server,
  Users,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

type SchoolItem = {
  id: number | string;
  name?: string;
  name_ar?: string;
  name_en?: string;
  title?: string;
  title_ar?: string;
  title_en?: string;
};

export default function WelcomeSection() {
  const { language } = useLanguage();

  const isArabic = language === "ar";

  const [schools, setSchools] = useState<SchoolItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const t = {
    ar: {
      title: "مركز متابعة النظام",
      subtitle: "بيانات حقيقية من نظام Smart Schools",
      systemStatus: "حالة النظام",
      connected: "متصل بقاعدة البيانات",
      database: "قاعدة البيانات",
      available: "متاحة",
      schools: "المدارس",
      registered: "مدرسة مسجلة",
      students: "الطلاب",
      management: "إدارة الطلاب",
      teachers: "المعلمون",
      teachersManagement: "إدارة المعلمين",
      view: "عرض",
      refresh: "تحديث",
      updating: "جاري التحديث...",
      lastUpdate: "آخر تحديث",
      today: "اليوم",
      quickAccess: "الوصول السريع",
      schoolsManagement: "إدارة المدارس",
      studentsManagement: "إدارة الطلاب",

      attendance: "الحضور",
      open: "فتح",
      noData: "لا توجد بيانات",
      error: "تعذر الاتصال بالخادم",
      retry: "إعادة المحاولة",
      schoolNumber: "رقم المدرسة",
    },
    en: {
      title: "System Activity Center",
      subtitle: "Live data from Smart Schools system",
      systemStatus: "System Status",
      connected: "Connected to database",
      database: "Database",
      available: "Available",
      schools: "Schools",
      registered: "registered schools",
      students: "Students",
      management: "Student Management",
      teachers: "Teachers",
      teachersManagement: "Teacher Management",
      view: "View",
      refresh: "Refresh",
      updating: "Updating...",
      lastUpdate: "Last updated",
      today: "Today",
      quickAccess: "Quick Access",
      schoolsManagement: "School Management",
      studentsManagement: "Student Management",

      attendance: "Attendance",
      open: "Open",
      noData: "No data available",
      error: "Unable to connect to server",
      retry: "Retry",
      schoolNumber: "School ID",
    },
  }[isArabic ? "ar" : "en"];

  const fetchSchools = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/schools", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch schools");
      }

      const data = await response.json();

      const result = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setSchools(result);

      setLastUpdated(
        new Date().toLocaleTimeString(isArabic ? "ar-EG" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    } catch (error) {
      console.error("Dashboard data error:", error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const getSchoolName = (school: SchoolItem) => {
    if (isArabic) {
      return (
        school.name_ar ||
        school.title_ar ||
        school.name ||
        school.title ||
        "مدرسة"
      );
    }

    return (
      school.name_en ||
      school.title_en ||
      school.name ||
      school.title ||
      "School"
    );
  };

  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section className="w-full mt-6">
      {/* =====================================================
          TOP HEADER
      ====================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-600" />

            <span className="text-xs font-bold text-blue-600">
              Smart Schools
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900">{t.title}</h2>

          <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={fetchSchools}
          disabled={loading}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-white
            border
            border-slate-200
            text-sm
            font-bold
            text-slate-700
            hover:border-blue-300
            hover:text-blue-600
            transition
            disabled:opacity-50
          "
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />

          {loading ? t.updating : t.refresh}
        </button>
      </div>

      {/* =====================================================
          STATUS + REAL DATA
      ====================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* System Status */}
        <div className="bg-slate-900 text-white rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">{t.systemStatus}</p>

              <h3 className="font-black text-lg mt-1">{t.connected}</h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Server className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />

            <span className="text-sm text-slate-300">
              {t.database}: {t.available}
            </span>
          </div>

          {lastUpdated && (
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
              <Clock3 className="w-4 h-4" />
              {t.lastUpdate}: {lastUpdated}
            </div>
          )}
        </div>

        {/* Schools Real Count */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">{t.schools}</p>

              <div className="flex items-end gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900">
                  {loading ? "..." : schools.length}
                </span>

                <span className="text-xs text-slate-500 mb-1">
                  {t.registered}
                </span>
              </div>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <School className="w-6 h-6" />
            </div>
          </div>

          <Link
            href="/dashboard/schools"
            className="
              mt-5
              flex
              items-center
              justify-between
              px-3
              py-2.5
              rounded-xl
              bg-slate-50
              hover:bg-blue-50
              text-sm
              font-bold
              text-slate-700
              hover:text-blue-600
              transition
            "
          >
            {t.view}
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        {/* Data Center */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">{t.database}</p>

              <h3 className="text-xl font-black text-slate-900 mt-1">
                {loading ? "..." : "Live"}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-5 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full w-full bg-emerald-500 rounded-full" />
          </div>

          <p className="text-xs text-slate-500 mt-2">{t.connected}</p>
        </div>
      </div>

      {/* =====================================================
          QUICK MANAGEMENT
      ====================================================== */}
      <div className="mt-5">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-slate-500" />

          <h3 className="font-black text-slate-900">{t.quickAccess}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            {
              href: "/dashboard/schools",
              icon: School,
              title: t.schoolsManagement,
            },
            {
              href: "/dashboard/students",
              icon: Users,
              title: t.studentsManagement,
            },
            {
              href: "/dashboard/teachers",
              icon: Users,
              title: t.teachersManagement,
            },
            {
              href: "/dashboard/attendance",
              icon: CheckCircle2,
              title: t.attendance,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  gap-3
                  bg-white
                  border
                  border-slate-200
                  rounded-xl
                  px-4
                  py-4
                  hover:border-blue-300
                  hover:shadow-sm
                  transition
                "
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-sm font-bold text-slate-700 truncate">
                    {item.title}
                  </span>
                </div>

                <Arrow className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0 transition" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          RECENT SCHOOLS
      ====================================================== */}
      <div className="mt-5 bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-black text-slate-900">{t.schools}</h3>

            <p className="text-xs text-slate-500 mt-1">{t.subtitle}</p>
          </div>

          <Link
            href="/dashboard/schools"
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            {t.view}
          </Link>
        </div>

        {loading ? (
          <div className="py-10 flex justify-center">
            <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : schools.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-500">
            {t.noData}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {schools.slice(0, 4).map((school) => (
              <div
                key={school.id}
                className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <School className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">
                      {getSchoolName(school)}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-1">
                      {t.schoolNumber}: {school.id}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard/schools"
                  className="text-xs font-bold text-blue-600 shrink-0"
                >
                  {t.open}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
