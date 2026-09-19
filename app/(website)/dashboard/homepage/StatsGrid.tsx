"use client";

import Link from "next/link";
import {
  GraduationCap,
  UserCheck,
  UserRound,
  School,
  BookOpen,
  Users,
  ClipboardCheck,
  Bell,
  ChevronLeft,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

type StatsProps = {
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalCourses: number;
  totalClasses: number;
  totalAttendance: number;
  totalNotifications: number;

  loadingSchools: boolean;
  loadingStudents: boolean;
  loadingTeachers: boolean;
  loadingParents: boolean;
  loadingCourses: boolean;
  loadingClasses: boolean;
  loadingAttendance: boolean;
  loadingNotifications: boolean;
};

export default function StatsGrid({
  totalSchools,
  totalStudents,
  totalTeachers,
  totalParents,
  totalCourses,
  totalClasses,
  totalAttendance,
  totalNotifications,

  loadingSchools,
  loadingStudents,
  loadingTeachers,
  loadingParents,
  loadingCourses,
  loadingClasses,
  loadingAttendance,
  loadingNotifications,
}: StatsProps) {
  const { t } = useLanguage();

  const stats = [
    {
      title: t.dashboard_total_students,
      value: loadingStudents ? "..." : totalStudents,
      description: t.dashboard_students_desc,
      icon: <GraduationCap className="w-6 h-6" />,
      href: "/dashboard/students",
    },
    {
      title: t.dashboard_total_teachers,
      value: loadingTeachers ? "..." : totalTeachers,
      description: t.dashboard_teachers_desc,
      icon: <UserCheck className="w-6 h-6" />,
      href: "/dashboard/teachers",
    },
    {
      title: t.dashboard_total_parents,
      value: loadingParents ? "..." : totalParents,
      description: t.dashboard_parents_desc,
      icon: <UserRound className="w-6 h-6" />,
      href: "/dashboard/parents",
    },
    {
      title: t.dashboard_total_schools,
      value: loadingSchools ? "..." : totalSchools,
      description: t.dashboard_schools_desc,
      icon: <School className="w-6 h-6" />,
      href: "/dashboard/schools",
    },
    {
      title: t.dashboard_total_courses,
      value: loadingCourses ? "..." : totalCourses,
      description: t.dashboard_courses_desc,
      icon: <BookOpen className="w-6 h-6" />,
      href: "/dashboard/courses",
    },
    {
      title: t.dashboard_total_classes,
      value: loadingClasses ? "..." : totalClasses,
      description: t.dashboard_classes_desc,
      icon: <Users className="w-6 h-6" />,
      href: "/dashboard/classes",
    },
    {
      title: t.dashboard_attendance,
      value: loadingAttendance ? "..." : totalAttendance,
      description: t.dashboard_attendance_desc,
      icon: <ClipboardCheck className="w-6 h-6" />,
      href: "/dashboard/attendance",
    },
    {
      title: t.dashboard_notifications,
      value: loadingNotifications ? "..." : totalNotifications,
      description: t.dashboard_notifications_desc,
      icon: <Bell className="w-6 h-6" />,
      href: "/dashboard/notifications",
    },
  ];

  return (
    <section className="w-full min-w-0">
      <div
        className="
          grid
          w-full
          min-w-0
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-5
        "
      >
        {stats.map((stat) => (
          <Link
            href={stat.href}
            key={stat.title}
            className="
              group
              w-full
              min-w-0
              min-h-[210px]
              bg-white
              rounded-2xl
              border
              border-slate-200
              p-5
              flex
              flex-col
              justify-between
              overflow-hidden
              hover:border-blue-300
              hover:shadow-xl
              hover:shadow-slate-200/60
              transition-all
              duration-300
            "
          >
            <div className="flex items-start justify-between gap-4 min-w-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-500 truncate">{stat.title}</p>

                <h2 className="text-3xl font-black text-slate-900 mt-3">
                  {stat.value}
                </h2>

                <p className="text-xs text-slate-400 mt-3 leading-5">
                  {stat.description}
                </p>
              </div>

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  shrink-0
                  group-hover:bg-blue-600
                  group-hover:text-white
                  transition-all
                  duration-300
                "
              >
                {stat.icon}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600">
                {t.view_details}
              </span>

              <ChevronLeft
                className="
                  w-4
                  h-4
                  text-blue-600
                  group-hover:-translate-x-1
                  transition-transform
                "
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
