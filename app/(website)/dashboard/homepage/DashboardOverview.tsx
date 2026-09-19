"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Video,
  Newspaper,
  CalendarDays,
  Clock3,
  ExternalLink,
  ArrowLeft,
  PlayCircle,
  RefreshCw,
  AlertCircle,
  Plus,
  Radio,
  Film,
  GraduationCap,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

const API_URL = "http://localhost:8000/api";

type Item = {
  id?: number | string;

  title?: string;
  title_ar?: string;
  title_en?: string;

  name?: string;
  name_ar?: string;
  name_en?: string;

  description?: string;
  description_ar?: string;
  description_en?: string;

  video_url?: string;
  thumbnail_url?: string;

  meeting_url?: string;
  google_meet_url?: string;
  meet_url?: string;
  meeting_link?: string;
  meet_link?: string;

  scheduled_at?: string;
  start_time?: string;
  end_time?: string;
  date?: string;
  time?: string;

  status?: string;
  is_active?: boolean;

  teacher_name?: string;

  course_id?: number | string;

  course?: {
    id?: number | string;
    title?: string;
    title_ar?: string;
    title_en?: string;
    name?: string;
    name_ar?: string;
    name_en?: string;
  };
};

type DashboardData = {
  courses: Item[];
  classes: Item[];
  videos: Item[];
  articles: Item[];
};

function getList(data: any): Item[] {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function getTitle(item: Item, language: "ar" | "en") {
  if (language === "ar") {
    return (
      item.title_ar ||
      item.name_ar ||
      item.title ||
      item.name ||
      item.title_en ||
      item.name_en ||
      "بدون عنوان"
    );
  }

  return (
    item.title_en ||
    item.name_en ||
    item.title ||
    item.name ||
    item.title_ar ||
    item.name_ar ||
    "Untitled"
  );
}

function getDescription(item: Item, language: "ar" | "en") {
  if (language === "ar") {
    return (
      item.description_ar ||
      item.description ||
      item.description_en ||
      "لا يوجد وصف"
    );
  }

  return (
    item.description_en ||
    item.description ||
    item.description_ar ||
    "No description"
  );
}

function getCourseName(item: Item, language: "ar" | "en") {
  if (language === "ar") {
    return (
      item.course?.title_ar ||
      item.course?.name_ar ||
      item.course?.title ||
      item.course?.name ||
      item.course?.title_en ||
      item.course?.name_en ||
      "بدون كورس"
    );
  }

  return (
    item.course?.title_en ||
    item.course?.name_en ||
    item.course?.title ||
    item.course?.name ||
    item.course?.title_ar ||
    item.course?.name_ar ||
    "No Course"
  );
}

function getMeetingUrl(item: Item) {
  return (
    item.meeting_url ||
    item.google_meet_url ||
    item.meet_url ||
    item.meeting_link ||
    item.meet_link ||
    ""
  );
}

function getStartDate(item: Item) {
  return item.scheduled_at || item.start_time || item.date || item.time || "";
}

function formatDate(value: string | undefined, language: "ar" | "en") {
  if (!value) {
    return language === "ar" ? "غير محدد" : "Not specified";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatTime(value: string | undefined, language: "ar" | "en") {
  if (!value) return "";

  const date = new Date(value);

  if (!Number.isNaN(date.getTime())) {
    return new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  return value;
}

function isLive(item: Item) {
  const status = String(item.status || "").toLowerCase();

  if (
    item.is_active === true ||
    status === "live" ||
    status === "active" ||
    status === "started" ||
    status === "ongoing"
  ) {
    return true;
  }

  const start = item.start_time || item.scheduled_at;
  const end = item.end_time;

  if (!start || !end) {
    return false;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  const now = new Date();

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return false;
  }

  return now >= startDate && now <= endDate;
}

function isUpcoming(item: Item) {
  const start = item.start_time || item.scheduled_at;

  if (!start) {
    return false;
  }

  const startDate = new Date(start);

  if (Number.isNaN(startDate.getTime())) {
    return false;
  }

  return startDate > new Date() && !isLive(item);
}

export default function DashboardOverview() {
  const { language, t } = useLanguage();

  const [data, setData] = useState<DashboardData>({
    courses: [],
    classes: [],
    videos: [],
    articles: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const requests = await Promise.allSettled([
        fetch(`${API_URL}/courses`, {
          cache: "no-store",
        }),

        fetch(`${API_URL}/online-classes`, {
          cache: "no-store",
        }),

        fetch(`${API_URL}/recorded-videos`, {
          cache: "no-store",
        }),

        fetch(`${API_URL}/articles`, {
          cache: "no-store",
        }),
      ]);

      const [coursesResult, classesResult, videosResult, articlesResult] =
        requests;

      const courses =
        coursesResult.status === "fulfilled" && coursesResult.value.ok
          ? getList(await coursesResult.value.json())
          : [];

      const classes =
        classesResult.status === "fulfilled" && classesResult.value.ok
          ? getList(await classesResult.value.json())
          : [];

      const videos =
        videosResult.status === "fulfilled" && videosResult.value.ok
          ? getList(await videosResult.value.json())
          : [];

      const articles =
        articlesResult.status === "fulfilled" && articlesResult.value.ok
          ? getList(await articlesResult.value.json())
          : [];

      setData({
        courses,
        classes,
        videos,
        articles,
      });

      if (
        coursesResult.status === "rejected" &&
        classesResult.status === "rejected" &&
        videosResult.status === "rejected" &&
        articlesResult.status === "rejected"
      ) {
        setError(
          language === "ar"
            ? "تعذر الاتصال بخادم Laravel."
            : "Unable to connect to the Laravel API.",
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        language === "ar"
          ? "حدث خطأ أثناء تحميل لوحة التحكم."
          : "An error occurred while loading the dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const liveClasses = useMemo(
    () => data.classes.filter(isLive),
    [data.classes],
  );

  const upcomingClasses = useMemo(
    () => data.classes.filter(isUpcoming).slice(0, 6),
    [data.classes],
  );

  const recentVideos = useMemo(() => data.videos.slice(0, 6), [data.videos]);

  const recentArticles = useMemo(
    () => data.articles.slice(0, 5),
    [data.articles],
  );

  return (
    <section className="w-full space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
          <div>
            <p className="text-blue-600 font-bold text-sm mb-2">
              Smart Schools
            </p>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.dashboard_elearning}
            </h1>

            <p className="text-slate-500 mt-2">{t.dashboard_manage}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/online-classes"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-bold transition"
            >
              <Radio className="w-5 h-5" />
              {t.dashboard_start_live_class}
            </Link>

            <Link
              href="/dashboard/courses"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold transition"
            >
              <Plus className="w-5 h-5" />
              {t.dashboard_add_course}
            </Link>

            <button
              type="button"
              onClick={loadDashboard}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold transition"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />

              {t.dashboard_refresh}
            </button>
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0" />

          <div>
            <p className="font-bold">{t.dashboard_warning}</p>

            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* COURSES */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">
                {t.dashboard_total_courses}
              </p>

              <h2 className="text-3xl font-black mt-2">
                {loading ? "..." : data.courses.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen />
            </div>
          </div>
        </div>

        {/* CLASSES */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">
                {t.dashboard_total_classes}
              </p>

              <h2 className="text-3xl font-black mt-2">
                {loading ? "..." : data.classes.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Video />
            </div>
          </div>
        </div>

        {/* LIVE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">{t.dashboard_live_now}</p>

              <h2 className="text-3xl font-black mt-2">
                {loading ? "..." : liveClasses.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
              <Radio />
            </div>
          </div>
        </div>

        {/* VIDEOS */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">
                {t.dashboard_recorded_videos}
              </p>

              <h2 className="text-3xl font-black mt-2">
                {loading ? "..." : data.videos.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Film />
            </div>
          </div>
        </div>
      </div>

      {/* LIVE NOW */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Radio />
            </div>

            <div>
              <h2 className="text-xl font-black">{t.dashboard_live_classes}</h2>

              <p className="text-sm text-slate-500 mt-1">
                {t.dashboard_live_classes_desc}
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/online-classes"
            className="text-blue-600 font-bold text-sm"
          >
            {t.dashboard_manage_classes}
          </Link>
        </div>

        <div className="p-6">
          {liveClasses.length === 0 ? (
            <div className="py-10 text-center">
              <Radio className="w-12 h-12 text-slate-300 mx-auto" />

              <p className="font-bold text-slate-700 mt-4">
                {t.dashboard_no_live_classes}
              </p>

              <Link
                href="/dashboard/online-classes"
                className="inline-flex items-center gap-2 mt-4 bg-red-600 text-white px-5 py-3 rounded-xl font-bold"
              >
                <Plus className="w-4 h-4" />
                {t.dashboard_start_class}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {liveClasses.map((item, index) => {
                const meetUrl = getMeetingUrl(item);

                return (
                  <div
                    key={item.id ?? index}
                    className="border border-green-200 bg-green-50/40 rounded-2xl p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          {t.dashboard_live_now}
                        </span>

                        <h3 className="font-black text-lg mt-3">
                          {getTitle(item, language)}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {getCourseName(item, language)}
                        </p>

                        {item.teacher_name && (
                          <p className="text-sm text-slate-500 mt-1">
                            {t.dashboard_teacher}: {item.teacher_name}
                          </p>
                        )}
                      </div>

                      <Video className="text-green-600" />
                    </div>

                    {meetUrl && (
                      <a
                        href={meetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <Video className="w-5 h-5" />
                        {t.dashboard_join_class}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* UPCOMING */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-blue-600" />

            <div>
              <h2 className="text-xl font-black">
                {t.dashboard_upcoming_classes}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {t.dashboard_upcoming_desc}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {upcomingClasses.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              {t.dashboard_no_upcoming_classes}
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingClasses.map((item, index) => (
                <div
                  key={item.id ?? index}
                  className="border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {getTitle(item, language)}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {getCourseName(item, language)}
                    </p>

                    {item.teacher_name && (
                      <p className="text-sm text-slate-400 mt-1">
                        {t.dashboard_teacher}: {item.teacher_name}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-5 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />

                      {formatDate(getStartDate(item), language)}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock3 className="w-4 h-4" />

                      {formatTime(
                        item.start_time || item.scheduled_at || item.time,
                        language,
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RECORDED VIDEOS */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Film />
            </div>

            <div>
              <h2 className="text-xl font-black">
                {t.dashboard_recorded_videos}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {t.dashboard_recorded_videos_desc}
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/recorded-videos"
            className="text-blue-600 font-bold text-sm"
          >
            {t.dashboard_view_all}
          </Link>
        </div>

        <div className="p-6">
          {recentVideos.length === 0 ? (
            <div className="py-10 text-center">
              <Film className="w-12 h-12 text-slate-300 mx-auto" />

              <p className="font-bold text-slate-700 mt-4">
                {t.dashboard_no_recorded_videos}
              </p>

              <Link
                href="/dashboard/recorded-videos"
                className="inline-flex items-center gap-2 mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold"
              >
                <Plus className="w-4 h-4" />
                {t.dashboard_add_video}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {recentVideos.map((video, index) => (
                <a
                  key={video.id ?? index}
                  href={video.video_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt={getTitle(video, language)}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900">
                        <PlayCircle className="w-14 h-14 text-white" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                  </div>

                  <div className="p-4">
                    <h3 className="font-black text-slate-900 line-clamp-2">
                      {getTitle(video, language)}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      {getCourseName(video, language)}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-600 flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" />
                        {t.dashboard_watch_video}
                      </span>

                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* COURSES */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-blue-600" />

            <div>
              <h2 className="text-xl font-black">{t.dashboard_courses}</h2>

              <p className="text-sm text-slate-500 mt-1">
                {t.dashboard_courses_desc}
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/courses"
            className="text-blue-600 font-bold text-sm"
          >
            {t.dashboard_manage_courses}
          </Link>
        </div>

        <div className="p-6">
          {data.courses.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              {t.dashboard_no_courses}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {data.courses.slice(0, 8).map((course, index) => (
                <Link
                  key={course.id ?? index}
                  href={
                    course.id
                      ? `/dashboard/courses/${course.id}`
                      : "/dashboard/courses"
                  }
                  className="border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BookOpen />
                  </div>

                  <h3 className="font-black text-slate-900 mt-4">
                    {getTitle(course, language)}
                  </h3>

                  <p className="text-sm text-blue-600 font-bold mt-3">
                    {t.dashboard_view_course}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ARTICLES */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Newspaper className="text-blue-600" />

            <div>
              <h2 className="text-xl font-black">{t.dashboard_articles}</h2>

              <p className="text-sm text-slate-500 mt-1">
                {t.dashboard_articles_desc}
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/articles"
            className="text-blue-600 font-bold text-sm"
          >
            {t.dashboard_view_all}
          </Link>
        </div>

        <div className="p-6">
          {recentArticles.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              {t.dashboard_no_articles}
            </div>
          ) : (
            <div className="space-y-3">
              {recentArticles.map((article, index) => (
                <Link
                  key={article.id ?? index}
                  href={
                    article.id
                      ? `/dashboard/articles/${article.id}`
                      : "/dashboard/articles"
                  }
                  className="flex items-center gap-4 border border-slate-200 rounded-2xl p-4 hover:bg-slate-50 transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Newspaper />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 truncate">
                      {getTitle(article, language)}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                      {getDescription(article, language)}
                    </p>
                  </div>

                  <ArrowLeft
                    className={`w-5 h-5 text-slate-400 shrink-0 ${
                      language === "ar" ? "" : "rotate-180"
                    }`}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-slate-950 rounded-3xl p-6 text-white">
        <h2 className="text-xl font-black">{t.dashboard_quick_actions}</h2>

        <p className="text-slate-400 text-sm mt-1">
          {t.dashboard_quick_actions_desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* LIVE CLASS */}
          <Link
            href="/dashboard/online-classes"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition"
          >
            <Radio className="text-red-400" />

            <p className="font-bold mt-4">{t.dashboard_start_live_class}</p>

            <p className="text-xs text-slate-400 mt-1">Google Meet</p>
          </Link>

          {/* VIDEO */}
          <Link
            href="/dashboard/recorded-videos"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition"
          >
            <Film className="text-purple-400" />

            <p className="font-bold mt-4">{t.dashboard_add_video}</p>

            <p className="text-xs text-slate-400 mt-1">
              {t.dashboard_video_library}
            </p>
          </Link>

          {/* COURSE */}
          <Link
            href="/dashboard/courses"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition"
          >
            <BookOpen className="text-blue-400" />

            <p className="font-bold mt-4">{t.dashboard_add_course}</p>

            <p className="text-xs text-slate-400 mt-1">
              {t.dashboard_educational_content}
            </p>
          </Link>

          {/* ARTICLE */}
          <Link
            href="/dashboard/articles"
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition"
          >
            <Newspaper className="text-yellow-400" />

            <p className="font-bold mt-4">{t.dashboard_add_article}</p>

            <p className="text-xs text-slate-400 mt-1">
              {t.dashboard_news_content}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
