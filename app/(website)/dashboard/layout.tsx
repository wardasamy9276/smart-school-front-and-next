"use client";

import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar"; // تأكدي من صحة المسار

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. تعريف الحالات هنا لأن الـ Layout هو الأب الذي يحتوي على الـ Sidebar
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100" dir="rtl">
      {/* 2. تمرير الحالات المطلوبة للـ Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 flex-col">
        {/* محتوى الصفحات */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
