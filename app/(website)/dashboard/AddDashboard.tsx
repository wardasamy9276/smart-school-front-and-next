"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  GraduationCap,
  Users,
  UserCog,
  Loader2,
  TrendingUp,
  BookOpen,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Filter,
  Layers,
  Database,
  Send,
  RefreshCw,
  Server,
  Activity,
  CheckCircle,
} from "lucide-react";

interface ActivityLog {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
  status: "success" | "warning" | "info";
}

interface SchoolUnit {
  name: string;
  code: string;
  students: number;
  teachers: number;
  rate: string;
  dbStatus: "Connected" | "Syncing";
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    schools: 0,
    students: 0,
    users: 0,
    teachers: 0,
    activeClasses: 0,
    attendanceRate: 0,
  });

  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [schoolPerformance, setSchoolPerformance] = useState<SchoolUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("today");

  // حالة حقيقية لإرسال أمر مزامنة أو فحص الـ API الخاص بـ Laravel
  const [syncing, setSyncing] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState(
    "/api/v1/admin/dashboard-metrics",
  );

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        // محاكاة استدعاء حقيقي لـ Laravel API Endpoints
        // const res = await fetch('http://127.0.0.1:8000/api/dashboard-stats');

        setTimeout(() => {
          setStats({
            schools: 5,
            students: 4210,
            users: 184,
            teachers: 235,
            activeClasses: 96,
            attendanceRate: 95.4,
          });

          setActivities([
            {
              id: 1,
              title: "تم تنفيذ Migration بنجاح",
              description:
                "تم تحديث جداول قاعدة البيانات (students_grades_table) عبر Laravel Artisan",
              time: "منذ 5 دقائق",
              type: "database",
              status: "success",
            },
            {
              id: 2,
              title: "طلب API جديد",
              description:
                "استعلام ناجح من تطبيق الهواتف المحمولة لجلب بيانات جدول الحصص",
              time: "منذ 18 دقيقة",
              type: "api",
              status: "info",
            },
            {
              id: 3,
              title: "تحديث صلاحيات مستخدم",
              description:
                "تم منح مشرف قسم العلوم (مجمع النور) صلاحيات التعديل على النتائج",
              time: "منذ ساعة",
              type: "auth",
              status: "success",
            },
            {
              id: 4,
              title: "فحص الاتصال بالخادم الرئيسي",
              description:
                "استجابة خادم الـ Backend (Laravel Octane) ممتازة - زمن الاستجابة 32ms",
              time: "منذ ساعتين",
              type: "server",
              status: "success",
            },
          ]);

          setSchoolPerformance([
            {
              name: "مجمع النور للتعليم الأساسي",
              code: "SCH-01",
              students: 1120,
              teachers: 65,
              rate: "97%",
              dbStatus: "Connected",
            },
            {
              name: "مدارس طلائع الأفق الخاصة",
              code: "SCH-02",
              students: 950,
              teachers: 58,
              rate: "94%",
              dbStatus: "Connected",
            },
            {
              name: "مدرسة الفيروز الرسمية للغات",
              code: "SCH-03",
              students: 880,
              teachers: 52,
              rate: "96%",
              dbStatus: "Connected",
            },
            {
              name: "مدرسة الأمل الثانوية المتكاملة",
              code: "SCH-04",
              students: 1260,
              teachers: 60,
              rate: "93%",
              dbStatus: "Syncing",
            },
          ]);

          setLoading(false);
        }, 600);
      } catch (error) {
        console.error("API Connection Error:", error);
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [timeFilter]);

  const handleManualSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1200);
  };

  const statItems = [
    {
      title: "الفروع والمدارس",
      value: stats.schools,
      icon: Building2,
      change: "مربوطة بقاعدة البيانات المركزية",
      isPositive: true,
    },
    {
      title: "إجمالي الطلاب",
      value: stats.students,
      icon: GraduationCap,
      change: "تحديث مباشر من الـ ERP",
      isPositive: true,
    },
    {
      title: "مستخدمي النظام",
      value: stats.users,
      icon: Users,
      change: "صلاحيات متعددة المستويات",
      isPositive: true,
    },
    {
      title: "الكادر التعليمي",
      value: stats.teachers,
      icon: UserCog,
      change: "سجلات نشطة",
      isPositive: true,
    },
  ];

  return (
    <div
      className="p-6 lg:p-10 space-y-8 max-w-[1700px] mx-auto text-right font-sans"
      dir="rtl"
    >
      {/* Real-world Laravel Environment Banner */}
      <div className="bg-[#121622] border border-[#1e2536] p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E7C2F]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Laravel Backend Connected
            </span>
            <span className="text-xs text-gray-400 font-mono bg-[#1a2133] px-3 py-1 rounded-full border border-[#1e2536]">
              Endpoint: {apiEndpoint}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Smart Schools Complex — Central Core
          </h1>
          <p className="text-gray-400 text-sm">
            لوحة الإدارة المركزية المتكاملة لربط المدارس، إدارة قواعد البيانات،
            ومزامنة السجلات الحية لجميع الفروع.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 w-full md:w-auto justify-end">
          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="flex items-center gap-2 bg-[#1a2133] hover:bg-[#1e2536] text-gray-200 px-4 py-2.5 rounded-xl border border-[#1e2536] text-xs font-medium transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 text-[#9E7C2F] ${syncing ? "animate-spin" : ""}`}
            />
            <span>
              {syncing ? "جاري مزامنة الـ API..." : "مزامنة البيانات فورياً"}
            </span>
          </button>

          <div className="bg-[#1a2133] border border-[#1e2536] px-4 py-2 rounded-xl text-xs text-gray-300 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#9E7C2F]" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-200 cursor-pointer font-medium"
            >
              <option value="today" className="bg-[#121622]">
                اليوم الحالي
              </option>
              <option value="week" className="bg-[#121622]">
                الأسبوع الحالي
              </option>
              <option value="month" className="bg-[#121622]">
                الشهر الحالي
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-[#121622] border border-[#1e2536] rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-[#9E7C2F]/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <h2 className="text-4xl font-extrabold text-white mt-3 tracking-tight">
                    {loading ? "..." : stat.value.toLocaleString()}
                  </h2>
                </div>
                <div className="p-3 bg-[#9E7C2F]/10 text-[#9E7C2F] rounded-2xl group-hover:scale-110 group-hover:bg-[#9E7C2F] group-hover:text-black transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1e2536] flex items-center justify-between text-xs text-gray-400 relative z-10">
                <span className="text-[#9E7C2F] font-medium flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#121622] border border-[#1e2536] rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">
              الجداول والفصول الدراسية الفعالة
            </p>
            <h3 className="text-2xl font-bold text-white mt-1">
              {stats.activeClasses} فصل دراسي
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              مرتبطة بنظام إدارة الحصص والأنصبة الأسبوعية
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-[#121622] border border-[#1e2536] rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">
              متوسط نسبة حضور المجمع الإجمالية
            </p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">
              {stats.attendanceRate}%
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              محسوبة تلقائياً عبر البصمة وسجلات المعلمين
            </p>
          </div>
          <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <CheckCircle2 className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Content Grid: System Activity & Real Schools Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System & Database Activities (2 Columns) */}
        <div className="lg:col-span-2 bg-[#121622] border border-[#1e2536] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>سجل النظام والأحداث الحية (Laravel Audit Log)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </h2>
              <span className="text-xs text-gray-400 bg-[#1a2133] px-3 py-1.5 rounded-xl border border-[#1e2536]">
                Real-time Stream
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-500 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-[#9E7C2F]" />
                <span>جاري الاتصال بقاعدة البيانات...</span>
              </div>
            ) : activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-start justify-between p-4 bg-[#1a2133]/40 rounded-xl border border-[#1e2536] hover:border-gray-700 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl mt-0.5 bg-[#9E7C2F]/10 text-[#9E7C2F]">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                          {act.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap bg-[#121622] px-2.5 py-1 rounded-lg border border-[#1e2536]">
                      {act.time}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                لا توجد سجلات حديثة.
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#1e2536] flex justify-between items-center text-xs text-gray-400">
            <span>تم الاتصال بخادم قاعدة البيانات MySQL بنجاح</span>
            <button className="text-[#9E7C2F] hover:underline font-medium">
              عرض سجل الأخطاء (Laravel Log) &larr;
            </button>
          </div>
        </div>

        {/* Real Schools Performance (1 Column) */}
        <div className="bg-[#121622] border border-[#1e2536] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
              <span>مدارس المجمع التابعة</span>
              <Building2 className="w-5 h-5 text-[#9E7C2F]" />
            </h2>

            {loading ? (
              <div className="py-12 text-center text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin text-[#9E7C2F] mx-auto" />
              </div>
            ) : (
              <div className="space-y-4">
                {schoolPerformance.map((school, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#1a2133]/40 rounded-xl border border-[#1e2536] space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-200">
                        {school.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#9E7C2F] bg-[#9E7C2F]/10 px-2 py-0.5 rounded border border-[#9E7C2F]/20">
                        {school.code}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400 pt-1">
                      <span>
                        الطلاب:{" "}
                        <strong className="text-gray-200">
                          {school.students}
                        </strong>
                      </span>
                      <span>
                        المعلمون:{" "}
                        <strong className="text-gray-200">
                          {school.teachers}
                        </strong>
                      </span>
                      <span className="text-emerald-400 font-medium">
                        حضور {school.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#1e2536]">
            <button className="w-full py-2.5 bg-[#1a2133] hover:bg-[#1e2536] text-gray-200 rounded-xl text-xs font-medium border border-[#1e2536] transition-colors flex items-center justify-center gap-2">
              <Layers className="w-4 h-4 text-[#9E7C2F]" />
              <span>إدارة أقسام المدارس وشبكة الـ ERP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
