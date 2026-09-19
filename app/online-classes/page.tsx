"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api";

type OnlineClass = {
  id: number;
  title_ar: string;
  title_en: string | null;
  description_ar: string | null;
  description_en: string | null;
  teacher_name: string;
  start_time: string;
  end_time: string;
  status: "upcoming" | "live" | "ended";
  meeting_url: string | null;
};

export default function OnlineClassesPage() {
  const [classes, setClasses] = useState<OnlineClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState<number | null>(null);

  /**
   * تحميل المحاضرات
   */
  const loadClasses = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/online-classes`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load classes");
      }

      const data = await response.json();

      const classesData = Array.isArray(data) ? data : data.data || [];

      setClasses(classesData);
    } catch (error) {
      console.error("Error loading classes:", error);
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  /**
   * تحديث حالة المحاضرات تلقائيًا
   */
  useEffect(() => {
    const interval = setInterval(() => {
      loadClasses();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  /**
   * اسم الحالة
   */
  const statusText = (status: OnlineClass["status"]) => {
    switch (status) {
      case "live":
        return "جارية الآن";

      case "upcoming":
        return "قادمة";

      case "ended":
        return "انتهت";

      default:
        return "";
    }
  };

  /**
   * دخول الطالب إلى المحاضرة
   *
   * مهم:
   * يتم فتح meeting_url مباشرة من ضغطة الطالب
   * حتى لا يمنع المتصفح فتح نافذة جديدة.
   *
   * وبعد فتح الاجتماع يتم تسجيل الحضور في Laravel.
   */
  const handleJoinClass = async (lecture: OnlineClass) => {
    if (joiningId !== null) {
      return;
    }

    if (lecture.status !== "live") {
      alert("المحاضرة ليست جارية الآن");
      return;
    }

    if (!lecture.meeting_url) {
      alert("رابط المحاضرة غير متاح حاليًا");
      return;
    }

    /**
     * فتح نفس غرفة المحاضرة فورًا
     *
     * نفس meeting_url يتم إرساله لكل الطلاب،
     * وبالتالي كل الطلاب يدخلون نفس الغرفة مع المدرس.
     */
    const meetingWindow = window.open(
      lecture.meeting_url,
      "_blank",
      "noopener,noreferrer",
    );

    if (!meetingWindow) {
      alert(
        "المتصفح منع فتح المحاضرة. من فضلك اسمح بالنوافذ المنبثقة لهذا الموقع.",
      );
      return;
    }

    setJoiningId(lecture.id);

    try {
      /**
       * تسجيل حضور الطالب
       *
       * هذه العملية لا تنشئ غرفة جديدة.
       * هي فقط تسجل حضور الطالب للمحاضرة.
       */
      const attendanceResponse = await fetch(
        `${API_URL}/online-classes/${lecture.id}/attend`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (!attendanceResponse.ok) {
        console.warn("Attendance was not registered");
      }
    } catch (error) {
      console.error("Attendance error:", error);
    } finally {
      setJoiningId(null);
    }
  };

  /**
   * تنسيق التاريخ والوقت
   */
  const formatDateTime = (date: string) => {
    try {
      return new Date(date).toLocaleString("ar-EG", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return date;
    }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#f8f7f4] p-6">
      <div className="max-w-7xl mx-auto">
        {/* =========================
            Header
        ========================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1B4D3E]">
              المحاضرات الأونلاين
            </h1>

            <p className="text-gray-500 mt-2">
              احضر محاضراتك وتواصل مع المعلم وزملائك مباشرة
            </p>
          </div>

          <div className="bg-[#1B4D3E] text-white px-5 py-3 rounded-xl font-bold">
            المحاضرات المباشرة 🎥
          </div>
        </div>

        {/* =========================
            Loading
        ========================= */}
        {loading ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#1B4D3E] rounded-full animate-spin" />

              <p className="text-gray-500">جاري تحميل المحاضرات...</p>
            </div>
          </div>
        ) : classes.length === 0 ? (
          /* =========================
              No Classes
          ========================= */
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">🎥</div>

            <h2 className="text-xl font-bold text-[#1B4D3E] mb-2">
              لا توجد محاضرات حاليًا
            </h2>

            <p className="text-gray-500">سيتم عرض المحاضرات هنا عند إضافتها.</p>
          </div>
        ) : (
          /* =========================
              Classes Grid
          ========================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((lecture) => (
              <div
                key={lecture.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                {/* =========================
                    Status
                ========================= */}
                <div className="flex justify-between items-center mb-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      lecture.status === "live"
                        ? "bg-red-100 text-red-600"
                        : lecture.status === "upcoming"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {statusText(lecture.status)}
                  </span>

                  {lecture.status === "live" && (
                    <span className="text-red-500 animate-pulse font-bold">
                      ● LIVE
                    </span>
                  )}
                </div>

                {/* =========================
                    Title
                ========================= */}
                <h2 className="text-xl font-bold text-[#1B4D3E] mb-3">
                  {lecture.title_ar}
                </h2>

                {/* English title if available */}
                {lecture.title_en && (
                  <p className="text-gray-400 text-sm mb-2" dir="ltr">
                    {lecture.title_en}
                  </p>
                )}

                {/* =========================
                    Description
                ========================= */}
                <p className="text-gray-500 text-sm mb-5 leading-6">
                  {lecture.description_ar || "لا يوجد وصف للمحاضرة"}
                </p>

                {/* =========================
                    Teacher + Time
                ========================= */}
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👨‍🏫</span>

                    <span>
                      <strong>المعلم:</strong> {lecture.teacher_name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg">🕐</span>

                    <span>
                      <strong>البداية:</strong>{" "}
                      {formatDateTime(lecture.start_time)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg">🕐</span>

                    <span>
                      <strong>النهاية:</strong>{" "}
                      {formatDateTime(lecture.end_time)}
                    </span>
                  </div>
                </div>

                {/* =========================
                    Live Meeting
                ========================= */}

                {lecture.status === "live" ? (
                  lecture.meeting_url ? (
                    <button
                      type="button"
                      onClick={() => handleJoinClass(lecture)}
                      disabled={joiningId === lecture.id}
                      className={`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                        joiningId === lecture.id
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#1B4D3E] hover:bg-[#143b30] text-white"
                      }`}
                    >
                      {joiningId === lecture.id ? (
                        <>
                          <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          جاري الدخول...
                        </>
                      ) : (
                        <>دخول المحاضرة 🎥</>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed"
                    >
                      رابط المحاضرة غير متاح
                    </button>
                  )
                ) : lecture.status === "upcoming" ? (
                  <button
                    type="button"
                    disabled
                    className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed"
                  >
                    المحاضرة لم تبدأ
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed"
                  >
                    المحاضرة انتهت
                  </button>
                )}

                {/* =========================
                    Shared Room Info
                ========================= */}
                {lecture.status === "live" && lecture.meeting_url && (
                  <p className="text-center text-xs text-gray-400 mt-3">
                    👥 انضم مع المعلم وزملائك في نفس غرفة المحاضرة
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
