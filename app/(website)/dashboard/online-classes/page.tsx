"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Video,
  Plus,
  X,
  CalendarDays,
  Clock3,
  UserRound,
  ExternalLink,
  Play,
  Square,
  Users,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Circle,
  Loader2,
  Copy,
  Check,
  Search,
  GraduationCap,
} from "lucide-react";

const API_URL = "http://localhost:8000/api";

type OnlineClass = {
  id: number;

  title_ar: string;
  title_en?: string | null;

  description_ar?: string | null;
  description_en?: string | null;

  teacher_name: string;

  meeting_url?: string | null;

  start_time: string;
  end_time: string;

  status: "upcoming" | "live" | "ended" | string;

  attendances?: Attendance[];
};

type Attendance = {
  id: number;

  user_id?: number | null;

  student_name: string;

  joined_at?: string | null;

  left_at?: string | null;

  attended?: boolean;
};

type Course = {
  id: number | string;

  title?: string | null;
  title_ar?: string | null;
  title_en?: string | null;

  name?: string | null;
  name_ar?: string | null;
  name_en?: string | null;
};

type CreateForm = {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  teacher_name: string;
  start_time: string;
  end_time: string;
  meeting_url: string;
};

function getCourseTitle(course: Course) {
  return (
    course.title_ar ||
    course.title ||
    course.name_ar ||
    course.name ||
    course.title_en ||
    course.name_en ||
    `Course #${course.id}`
  );
}

function formatDate(dateValue?: string) {
  if (!dateValue) return "-";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatTime(dateValue?: string) {
  if (!dateValue) return "-";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getStatusLabel(status: string) {
  switch (status) {
    case "live":
      return "مباشرة الآن";

    case "ended":
      return "انتهت";

    case "upcoming":
      return "قادمة";

    default:
      return status || "غير محدد";
  }
}

function getStatusClasses(status: string) {
  switch (status) {
    case "live":
      return "bg-green-50 text-green-700 border-green-200";

    case "ended":
      return "bg-slate-100 text-slate-600 border-slate-200";

    case "upcoming":
      return "bg-blue-50 text-blue-700 border-blue-200";

    default:
      return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function getLocalDateTimeValue(date = new Date()) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");

  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function getDefaultEndTime() {
  const date = new Date();

  date.setHours(date.getHours() + 1);

  return getLocalDateTimeValue(date);
}

export default function OnlineClassesPage() {
  const [classes, setClasses] = useState<OnlineClass[]>([]);

  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);

  const [coursesLoading, setCoursesLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [actionId, setActionId] = useState<number | null>(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showAttendeesModal, setShowAttendeesModal] = useState(false);

  const [selectedClass, setSelectedClass] = useState<OnlineClass | null>(null);

  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState<CreateForm>({
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    teacher_name: "",
    start_time: getLocalDateTimeValue(),
    end_time: getDefaultEndTime(),
    meeting_url: "",
  });

  // ============================================
  // Load classes
  // ============================================

  async function loadClasses() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/online-classes`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("فشل تحميل المحاضرات");
      }

      const data = await response.json();

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setClasses(list);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل المحاضرات",
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================================
  // Load courses
  // ============================================

  async function loadCourses() {
    try {
      setCoursesLoading(true);

      const response = await fetch(`${API_URL}/courses`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("فشل تحميل الكورسات");
      }

      const data = await response.json();

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setCourses(list);
    } catch (err) {
      console.error("Courses error:", err);
    } finally {
      setCoursesLoading(false);
    }
  }

  useEffect(() => {
    loadClasses();
    loadCourses();
  }, []);

  // ============================================
  // Create class
  // ============================================

  async function handleCreateClass(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.title_ar.trim()) {
        throw new Error("اكتبي عنوان المحاضرة بالعربي");
      }

      if (!form.teacher_name.trim()) {
        throw new Error("اكتبي اسم المدرس");
      }

      if (!form.start_time) {
        throw new Error("حددي وقت بداية المحاضرة");
      }

      if (!form.end_time) {
        throw new Error("حددي وقت نهاية المحاضرة");
      }

      const start = new Date(form.start_time);

      const end = new Date(form.end_time);

      if (end <= start) {
        throw new Error("وقت نهاية المحاضرة يجب أن يكون بعد وقت البداية");
      }

      const response = await fetch(`${API_URL}/online-classes`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          title_ar: form.title_ar,
          title_en: form.title_en || null,

          description_ar: form.description_ar || null,

          description_en: form.description_en || null,

          teacher_name: form.teacher_name,

          start_time: form.start_time,
          end_time: form.end_time,

          meeting_url: form.meeting_url || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "فشل إنشاء المحاضرة");
      }

      setSuccess("تم إنشاء المحاضرة بنجاح");

      setShowCreateModal(false);

      resetForm();

      await loadClasses();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء إنشاء المحاضرة",
      );
    } finally {
      setSaving(false);
    }
  }

  // ============================================
  // Start class
  // ============================================

  async function startClass(item: OnlineClass) {
    try {
      setActionId(item.id);
      setError("");
      setSuccess("");

      if (!item.meeting_url) {
        throw new Error(
          "لا يوجد رابط Google Meet لهذه المحاضرة. أضيفي الرابط أولًا.",
        );
      }

      const response = await fetch(
        `${API_URL}/online-classes/${item.id}/start`,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "فشل بدء المحاضرة");
      }

      setSuccess("تم بدء المحاضرة");

      await loadClasses();

      // افتح Google Meet بعد تحديث حالة المحاضرة
      window.open(item.meeting_url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء بدء المحاضرة",
      );
    } finally {
      setActionId(null);
    }
  }

  // ============================================
  // End class
  // ============================================

  async function endClass(item: OnlineClass) {
    try {
      setActionId(item.id);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/online-classes/${item.id}/end`, {
        method: "POST",

        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "فشل إنهاء المحاضرة");
      }

      setSuccess("تم إنهاء المحاضرة");

      await loadClasses();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء إنهاء المحاضرة",
      );
    } finally {
      setActionId(null);
    }
  }

  // ============================================
  // Attendees
  // ============================================

  async function openAttendees(item: OnlineClass) {
    try {
      setActionId(item.id);
      setError("");

      const response = await fetch(
        `${API_URL}/online-classes/${item.id}/attendees`,
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "فشل تحميل الحاضرين");
      }

      setSelectedClass({
        ...item,
        attendances: Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [],
      });

      setShowAttendeesModal(true);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء تحميل الحاضرين",
      );
    } finally {
      setActionId(null);
    }
  }

  // ============================================
  // Copy Meet URL
  // ============================================

  async function copyMeetingUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  // ============================================
  // Reset form
  // ============================================

  function resetForm() {
    setForm({
      title_ar: "",
      title_en: "",
      description_ar: "",
      description_en: "",
      teacher_name: "",
      start_time: getLocalDateTimeValue(),
      end_time: getDefaultEndTime(),
      meeting_url: "",
    });
  }

  // ============================================
  // Filter
  // ============================================

  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      const text = `
        ${item.title_ar || ""}
        ${item.title_en || ""}
        ${item.teacher_name || ""}
      `.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [classes, search, statusFilter]);

  // ============================================
  // Stats
  // ============================================

  const stats = useMemo(() => {
    return {
      total: classes.length,

      live: classes.filter((item) => item.status === "live").length,

      upcoming: classes.filter((item) => item.status === "upcoming").length,

      ended: classes.filter((item) => item.status === "ended").length,
    };
  }, [classes]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f7fb] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                    المحاضرات المباشرة
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    إدارة المحاضرات و Google Meet والحضور
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowCreateModal(true);
                }}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-bold
                  transition
                  shadow-lg
                  shadow-blue-600/20
                "
              >
                <Plus className="w-5 h-5" />
                إنشاء محاضرة
              </button>

              <button
                type="button"
                onClick={() => {
                  loadClasses();
                  loadCourses();
                }}
                disabled={loading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-slate-100
                  hover:bg-slate-200
                  text-slate-700
                  font-bold
                  transition
                "
              >
                <RefreshCw
                  className={loading ? "w-5 h-5 animate-spin" : "w-5 h-5"}
                />
                تحديث
              </button>
            </div>
          </div>
        </div>

        {/* ========================================
            SUCCESS
        ======================================== */}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />

            <span className="font-bold">{success}</span>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="mr-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================
            ERROR
        ======================================== */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

            <div>
              <p className="font-bold">حدث خطأ</p>

              <p className="text-sm mt-1">{error}</p>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="mr-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================
            STATS
        ======================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="كل المحاضرات"
            value={stats.total}
            icon={<Video />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            title="مباشرة الآن"
            value={stats.live}
            icon={<Play />}
            iconClass="bg-green-50 text-green-600"
          />

          <StatCard
            title="محاضرات قادمة"
            value={stats.upcoming}
            icon={<CalendarDays />}
            iconClass="bg-purple-50 text-purple-600"
          />

          <StatCard
            title="محاضرات انتهت"
            value={stats.ended}
            icon={<CheckCircle2 />}
            iconClass="bg-slate-100 text-slate-600"
          />
        </div>

        {/* ========================================
            SEARCH / FILTER
        ======================================== */}

        <div className="bg-white border border-slate-200 rounded-3xl p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ابحث باسم المحاضرة أو المدرس..."
                className="
                  w-full
                  h-12
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pr-12
                  pl-4
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="
                h-12
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                outline-none
                focus:border-blue-500
              "
            >
              <option value="all">كل الحالات</option>

              <option value="upcoming">قادمة</option>

              <option value="live">مباشرة</option>

              <option value="ended">انتهت</option>
            </select>
          </div>
        </div>

        {/* ========================================
            CLASSES
        ======================================== */}

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-900">
              قائمة المحاضرات
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              كل البيانات الموجودة فعليًا في Laravel
            </p>
          </div>

          <div className="p-5 sm:p-6">
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />

                <p className="text-slate-500 mt-4">جاري تحميل المحاضرات...</p>
              </div>
            ) : filteredClasses.length === 0 ? (
              <div className="py-16 text-center">
                <Video className="w-14 h-14 text-slate-300 mx-auto" />

                <h3 className="font-black text-slate-700 mt-5">
                  لا توجد محاضرات
                </h3>

                <p className="text-sm text-slate-400 mt-2">
                  ابدئي بإنشاء أول محاضرة.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowCreateModal(true);
                  }}
                  className="mt-5 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold"
                >
                  <Plus className="w-5 h-5" />
                  إنشاء محاضرة
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filteredClasses.map((item) => {
                  const isActionLoading = actionId === item.id;

                  const attendanceCount =
                    item.attendances?.filter(
                      (attendance) => attendance.attended,
                    ).length ?? 0;

                  return (
                    <div
                      key={item.id}
                      className="
                        border
                        border-slate-200
                        rounded-2xl
                        p-5
                        hover:border-blue-200
                        hover:shadow-md
                        transition
                      "
                    >
                      {/* TOP */}

                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1
                                rounded-full
                                border
                                text-xs
                                font-bold
                                ${getStatusClasses(item.status)}
                              `}
                            >
                              {item.status === "live" && (
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                              )}

                              {getStatusLabel(item.status)}
                            </span>
                          </div>

                          <h3 className="text-lg font-black text-slate-900 mt-3">
                            {item.title_ar}
                          </h3>

                          {item.title_en && (
                            <p
                              dir="ltr"
                              className="text-sm text-slate-400 mt-1 text-right"
                            >
                              {item.title_en}
                            </p>
                          )}
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Video className="w-5 h-5" />
                        </div>
                      </div>

                      {/* DESCRIPTION */}

                      {item.description_ar && (
                        <p className="text-sm text-slate-500 mt-4 line-clamp-2">
                          {item.description_ar}
                        </p>
                      )}

                      {/* INFO */}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        <InfoItem
                          icon={<UserRound />}
                          label="المدرس"
                          value={item.teacher_name}
                        />

                        <InfoItem
                          icon={<CalendarDays />}
                          label="التاريخ"
                          value={formatDate(item.start_time)}
                        />

                        <InfoItem
                          icon={<Clock3 />}
                          label="البداية"
                          value={formatTime(item.start_time)}
                        />

                        <InfoItem
                          icon={<Clock3 />}
                          label="النهاية"
                          value={formatTime(item.end_time)}
                        />
                      </div>

                      {/* ATTENDANCE */}

                      <div className="mt-4 rounded-xl bg-slate-50 p-3 flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-slate-500" />

                        <span className="font-bold text-slate-700">
                          الحضور:
                        </span>

                        <span className="text-slate-500">
                          {attendanceCount} طالب
                        </span>

                        <button
                          type="button"
                          onClick={() => openAttendees(item)}
                          className="mr-auto text-blue-600 font-bold hover:text-blue-700"
                        >
                          عرض الحاضرين
                        </button>
                      </div>

                      {/* MEET */}

                      {item.meeting_url ? (
                        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-green-600" />

                            <span className="text-sm font-bold text-green-700">
                              رابط Google Meet موجود
                            </span>
                          </div>

                          <div className="mt-2 flex items-center gap-2">
                            <a
                              href={item.meeting_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-700 hover:underline truncate"
                              dir="ltr"
                            >
                              {item.meeting_url}
                            </a>

                            <button
                              type="button"
                              onClick={() => copyMeetingUrl(item.meeting_url!)}
                              className="shrink-0 w-8 h-8 rounded-lg bg-white border border-green-200 flex items-center justify-center text-green-600"
                              title="نسخ الرابط"
                            >
                              {copied ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 flex items-center gap-2 text-sm text-amber-700">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          لا يوجد رابط Google Meet لهذه المحاضرة.
                        </div>
                      )}

                      {/* ACTIONS */}

                      <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
                        {item.status === "upcoming" && (
                          <button
                            type="button"
                            disabled={isActionLoading || !item.meeting_url}
                            onClick={() => startClass(item)}
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-4
                              py-2.5
                              rounded-xl
                              bg-green-600
                              hover:bg-green-700
                              disabled:bg-slate-300
                              text-white
                              font-bold
                              text-sm
                            "
                          >
                            {isActionLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                            ابدأ المحاضرة
                          </button>
                        )}

                        {item.status === "live" && (
                          <>
                            {item.meeting_url && (
                              <a
                                href={item.meeting_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  px-4
                                  py-2.5
                                  rounded-xl
                                  bg-blue-600
                                  hover:bg-blue-700
                                  text-white
                                  font-bold
                                  text-sm
                                "
                              >
                                <Video className="w-4 h-4" />
                                دخول Google Meet
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}

                            <button
                              type="button"
                              disabled={isActionLoading}
                              onClick={() => endClass(item)}
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2.5
                                rounded-xl
                                bg-red-600
                                hover:bg-red-700
                                disabled:bg-slate-300
                                text-white
                                font-bold
                                text-sm
                              "
                            >
                              {isActionLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                              إنهاء المحاضرة
                            </button>
                          </>
                        )}

                        {item.status === "ended" && item.meeting_url && (
                          <a
                            href={item.meeting_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2.5
                                rounded-xl
                                bg-slate-100
                                hover:bg-slate-200
                                text-slate-700
                                font-bold
                                text-sm
                              "
                          >
                            <ExternalLink className="w-4 h-4" />
                            فتح رابط الاجتماع
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => openAttendees(item)}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            bg-slate-100
                            hover:bg-slate-200
                            text-slate-700
                            font-bold
                            text-sm
                          "
                        >
                          <Users className="w-4 h-4" />
                          الحضور
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================
          CREATE MODAL
      ======================================== */}

      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="إغلاق"
            onClick={() => setShowCreateModal(false)}
            className="absolute inset-0 bg-black/50"
          />

          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
            <div className="sticky top-0 z-10 bg-white border-b border-slate-100 p-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  إنشاء محاضرة جديدة
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  أنشئي محاضرة الآن أو حددي لها موعدًا.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="p-5 sm:p-6 space-y-5">
              {/* Title Arabic */}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  عنوان المحاضرة بالعربي *
                </label>

                <input
                  type="text"
                  value={form.title_ar}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      title_ar: event.target.value,
                    })
                  }
                  placeholder="مثال: محاضرة JavaScript الأولى"
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Title English */}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Title English
                </label>

                <input
                  type="text"
                  dir="ltr"
                  value={form.title_en}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      title_en: event.target.value,
                    })
                  }
                  placeholder="Example: JavaScript Lecture 1"
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Teacher */}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  اسم المدرس *
                </label>

                <div className="relative">
                  <UserRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    value={form.teacher_name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        teacher_name: event.target.value,
                      })
                    }
                    placeholder="اسم المدرس"
                    className="w-full h-12 rounded-xl border border-slate-200 pr-12 pl-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>

              {/* Course information */}

              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />

                  <div>
                    <p className="font-bold text-blue-800">الكورسات الموجودة</p>

                    <p className="text-sm text-blue-700 mt-1">
                      الكورسات موجودة فعليًا في النظام، لكن جدول المحاضرات
                      الحالي لا يحتوي على course_id، لذلك لن أربط كورسًا
                      بالمحاضرة بشكل وهمي.
                    </p>

                    {!coursesLoading && (
                      <p className="text-xs text-blue-600 mt-2">
                        عدد الكورسات الحالية: {courses.length}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  وصف المحاضرة
                </label>

                <textarea
                  value={form.description_ar}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description_ar: event.target.value,
                    })
                  }
                  rows={4}
                  placeholder="اكتبي تفاصيل المحاضرة..."
                  className="w-full rounded-xl border border-slate-200 p-4 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Date / time */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    وقت البداية *
                  </label>

                  <input
                    type="datetime-local"
                    value={form.start_time}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        start_time: event.target.value,
                      })
                    }
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    وقت النهاية *
                  </label>

                  <input
                    type="datetime-local"
                    value={form.end_time}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        end_time: event.target.value,
                      })
                    }
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>

              {/* Google Meet */}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  رابط Google Meet
                </label>

                <input
                  type="url"
                  dir="ltr"
                  value={form.meeting_url}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      meeting_url: event.target.value,
                    })
                  }
                  placeholder="https://meet.google.com/..."
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="text-xs text-slate-400 mt-2">
                  ضعي هنا رابط Google Meet الحقيقي. النظام الحالي يحفظ الرابط
                  ويستخدمه لكل الطلاب.
                </p>
              </div>

              {/* Actions */}

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      إنشاء المحاضرة
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================
          ATTENDEES MODAL
      ======================================== */}

      {showAttendeesModal && selectedClass && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="إغلاق"
            onClick={() => setShowAttendeesModal(false)}
            className="absolute inset-0 bg-black/50"
          />

          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-white rounded-3xl shadow-2xl">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">الحاضرون</h2>

                <p className="text-sm text-slate-500 mt-1">
                  {selectedClass.title_ar}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAttendeesModal(false)}
                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5">
              {selectedClass.attendances?.length ? (
                <div className="space-y-3">
                  {selectedClass.attendances.map((attendance) => (
                    <div
                      key={attendance.id}
                      className="border border-slate-200 rounded-2xl p-4 flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <UserRound className="w-5 h-5" />
                      </div>

                      <div className="flex-1">
                        <p className="font-bold text-slate-900">
                          {attendance.student_name}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          دخل:{" "}
                          {attendance.joined_at
                            ? formatTime(attendance.joined_at)
                            : "-"}
                        </p>
                      </div>

                      {attendance.attended && (
                        <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          حاضر
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Users className="w-12 h-12 text-slate-300 mx-auto" />

                  <p className="font-bold text-slate-700 mt-4">
                    لا يوجد حضور مسجل
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    سيظهر الطلاب هنا عند تسجيل حضورهم.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// STAT CARD
// ============================================

function StatCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className="text-3xl font-black text-slate-900 mt-2">{value}</p>
        </div>

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            ${iconClass}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// ============================================
// INFO ITEM
// ============================================

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        {React.cloneElement(icon as React.ReactElement, {})}

        <span>{label}</span>
      </div>

      <p className="text-sm font-bold text-slate-700 mt-1">{value}</p>
    </div>
  );
}
