"use client";
import WelcomeSection from "./homepage/WelcomeSection";
import DashboardOverview from "./homepage/DashboardOverview";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import StatsGrid from "./homepage/StatsGrid";

export default function DashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* ================= SIDEBAR ================= */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ================= MAIN AREA ================= */}
      <div
        className={`
          min-h-screen
          flex
          flex-col
          min-w-0
          transition-all
          duration-300
          ease-in-out
          ${isCollapsed ? "lg:mr-20" : "lg:mr-72"}
        `}
      >
        {/* ================= HEADER ================= */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full gap-4">
            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="
                lg:hidden
                w-11
                h-11
                rounded-xl
                bg-slate-100
                text-slate-600
                flex
                items-center
                justify-center
                hover:bg-slate-200
                transition
              "
            >
              ☰
            </button>

            {/* Title */}
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 truncate">
                لوحة التحكم
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                إدارة مجمع المدارس
              </p>
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main
          className="
            flex-1
            w-full
            min-w-0
            p-4
            sm:p-6
            lg:p-8
            overflow-x-hidden
          "
        >
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
        </main>

        {/* <WelcomeSection /> */}

        <DashboardOverview />
      </div>
    </div>
  );
}
