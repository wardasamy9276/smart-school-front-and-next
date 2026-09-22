"use client";

import DashboardOverview from "./homepage/DashboardOverview";
import React, { useEffect, useState } from "react";
import StatsGrid from "./homepage/StatsGrid";

export default function DashboardPage() {
  // ================= SCHOOLS =================
  const [totalSchools, setTotalSchools] = useState(0);
  const [loadingSchools, setLoadingSchools] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoadingSchools(true);

        const response = await fetch("http://localhost:8000/api/schools");

        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }

        const data = await response.json();

        const schools = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
            ? data.data
            : [];

        setTotalSchools(schools.length);
      } catch (error) {
        console.error("Error fetching schools:", error);
        setTotalSchools(0);
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* ================= MAIN CONTENT ================= */}
      <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
        {/* ================= PAGE HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-xl font-black text-slate-900 sm:text-2xl">
            لوحة التحكم
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            إدارة مجمع المدارس
          </p>
        </div>

        {/* ================= STATISTICS ================= */}
        <StatsGrid
          totalSchools={totalSchools}
          totalStudents={0}
          totalTeachers={0}
          totalParents={0}
          totalCourses={0}
          totalClasses={0}
          totalAttendance={0}
          totalNotifications={0}
          loadingSchools={loadingSchools}
          loadingStudents={false}
          loadingTeachers={false}
          loadingParents={false}
          loadingCourses={false}
          loadingClasses={false}
          loadingAttendance={false}
          loadingNotifications={false}
        />

        {/* ================= DASHBOARD OVERVIEW ================= */}
        <DashboardOverview />
      </main>
    </div>
  );
}
