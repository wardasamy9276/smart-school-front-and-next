// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import {
//   LayoutDashboard,
//   GraduationCap,
//   Users,
//   UserCheck,
//   UserRound,
//   School,
//   BookOpen,
//   Newspaper,
//   CalendarDays,
//   ClipboardCheck,
//   Search,
//   Bell,
//   Menu,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   AlertCircle,
//   RefreshCw,
//   CheckCircle2,
// } from "lucide-react";

// const API_URL = "http://localhost:8000/api";

// type SchoolType = {
//   id: number;
//   name: string;
//   email?: string | null;
//   phone?: string | null;
//   address?: string | null;
//   image?: string | null;
//   sort_order?: number;
// };

// type MenuItem = {
//   title: string;
//   href: string;
//   icon: React.ReactNode;
// };

// export default function SchoolDashboard() {
//   const pathname = usePathname();

//   const [schools, setSchools] = useState<SchoolType[]>([]);
//   const [loadingSchools, setLoadingSchools] = useState(true);
//   const [schoolsError, setSchoolsError] = useState("");

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const fetchSchools = async () => {
//     try {
//       setLoadingSchools(true);
//       setSchoolsError("");

//       const response = await fetch(`${API_URL}/schools`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//         cache: "no-store",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       const result = await response.json();

//       const data: SchoolType[] = Array.isArray(result)
//         ? result
//         : Array.isArray(result?.data)
//           ? result.data
//           : [];

//       setSchools(data);
//     } catch (error) {
//       console.error("Schools API Error:", error);
//       setSchoolsError(
//         "تعذر الاتصال بـ Laravel. تأكدي أن Laravel يعمل على http://localhost:8000",
//       );
//     } finally {
//       setLoadingSchools(false);
//     }
//   };

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   const totalSchools = schools.length;

//   const latestSchools = useMemo(() => {
//     return [...schools]
//       .sort((a, b) => {
//         return (b.sort_order ?? 0) - (a.sort_order ?? 0);
//       })
//       .slice(0, 5);
//   }, [schools]);

//   const menuItems: MenuItem[] = [
//     {
//       title: "الرئيسية",
//       href: "/dashboard",
//       icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "الطلاب",
//       href: "/dashboard/students",
//       icon: <GraduationCap className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "المعلمون",
//       href: "/dashboard/teachers",
//       icon: <UserCheck className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "أولياء الأمور",
//       href: "/dashboard/parents",
//       icon: <UserRound className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "المدارس",
//       href: "/dashboard/schools",
//       icon: <School className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "الفصول",
//       href: "/dashboard/classes",
//       icon: <BookOpen className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "المواد الدراسية",
//       href: "/dashboard/subjects",
//       icon: <BookOpen className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "الأخبار والمقالات",
//       href: "/dashboard/articles",
//       icon: <Newspaper className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "الأحداث",
//       href: "/dashboard/events",
//       icon: <CalendarDays className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "الحضور",
//       href: "/dashboard/attendance",
//       icon: <ClipboardCheck className="w-5 h-5 shrink-0" />,
//     },
//     {
//       title: "المستخدمون",
//       href: "/dashboard/users",
//       icon: <Users className="w-5 h-5 shrink-0" />,
//     },
//   ];

//   const stats = [
//     {
//       title: "إجمالي الطلاب",
//       value: "3,450",
//       description: "محدث بانتظام من النظام الأكاديمي",
//       icon: <GraduationCap className="w-6 h-6" />,
//       href: "/dashboard/students",
//     },
//     {
//       title: "إجمالي المعلمين",
//       value: "280",
//       description: "أعضاء هيئة التدريس والكوادر",
//       icon: <UserCheck className="w-6 h-6" />,
//       href: "/dashboard/teachers",
//     },
//     {
//       title: "أولياء الأمور",
//       value: "2,150",
//       description: "الحسابات المفعلة لمتابعة الطلاب",
//       icon: <UserRound className="w-6 h-6" />,
//       href: "/dashboard/parents",
//     },
//     {
//       title: "إجمالي المدارس",
//       value: loadingSchools ? "..." : totalSchools > 0 ? totalSchools : "6",
//       description: "بيانات حقيقية وتجريبية مرتبطة",
//       icon: <School className="w-6 h-6" />,
//       href: "/dashboard/schools",
//     },
//   ];

//   return (
//     <div dir="rtl" className="min-h-screen bg-[#f5f7fb] text-slate-800 flex">
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="إغلاق القائمة"
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//         />
//       )}

//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`
//           fixed
//           top-0
//           right-0
//           z-50
//           h-screen
//           bg-slate-950
//           text-white
//           border-l
//           border-slate-800
//           transition-all
//           duration-300
//           flex
//           flex-col
//           ${isCollapsed ? "w-20" : "w-72"}
//           lg:translate-x-0
//           ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
//         `}
//       >
//         {/* Logo & Collapse Button Container */}
//         <div className="h-20 px-4 flex items-center justify-between border-b border-slate-800 shrink-0 relative">
//           <div className="flex items-center gap-3 overflow-hidden">
//             <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0">
//               <School className="w-6 h-6 text-white" />
//             </div>

//             {!isCollapsed && (
//               <div className="truncate">
//                 <h1 className="font-black text-lg truncate">Smart Schools</h1>
//                 <p className="text-xs text-slate-500">School Management</p>
//               </div>
//             )}
//           </div>

//           {/* زر السهم للتوسيع والتصغير في المنتصف تماماً بجوار اللوجو للشاشات الكبيرة */}
//           <button
//             type="button"
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="hidden lg:flex p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition items-center justify-center border border-slate-800 shadow-sm"
//             title={isCollapsed ? "توسيع القائمة" : "تصغير القائمة"}
//           >
//             {isCollapsed ? (
//               <ChevronLeft className="w-5 h-5" />
//             ) : (
//               <ChevronRight className="w-5 h-5" />
//             )}
//           </button>

//           <button
//             type="button"
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden text-slate-400 hover:text-white"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Admin Box */}
//         {!isCollapsed && (
//           <div className="p-4 shrink-0">
//             <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
//               <div className="flex items-center gap-3">
//                 <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
//                   <UserRound className="w-5 h-5" />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="font-bold text-sm truncate">مدير النظام</p>
//                   <p className="text-xs text-slate-500 mt-1">Administrator</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Menu Items */}
//         <nav className="px-3 pb-5 overflow-y-auto flex-1 space-y-1 mt-2">
//           {!isCollapsed && (
//             <p className="text-[11px] font-bold text-slate-600 px-3 mb-3">
//               الإدارة الرئيسية
//             </p>
//           )}

//           {menuItems.map((item) => {
//             const isActive =
//               pathname === item.href ||
//               (item.href !== "/dashboard" && pathname?.startsWith(item.href));

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setSidebarOpen(false)}
//                 title={isCollapsed ? item.title : ""}
//                 className={`
//                   flex
//                   items-center
//                   gap-3
//                   px-4
//                   py-3
//                   rounded-xl
//                   text-sm
//                   font-medium
//                   transition
//                   ${
//                     isActive
//                       ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold"
//                       : "text-slate-400 hover:bg-slate-900 hover:text-white"
//                   }
//                   ${isCollapsed ? "justify-center px-2" : ""}
//                 `}
//               >
//                 {item.icon}

//                 {!isCollapsed && <span className="truncate">{item.title}</span>}

//                 {!isCollapsed && isActive && (
//                   <span className="mr-auto w-2 h-2 rounded-full bg-white shrink-0" />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>

//       {/* ================= MAIN WRAPPER ================= */}
//       <div
//         className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
//           isCollapsed ? "lg:mr-20" : "lg:mr-72"
//         }`}
//       >
//         {/* ================= HEADER (Navbar) ================= */}
//         <header className="sticky top-0 z-30 h-20 bg-white/90 backdrop-blur border-b border-slate-200">
//           <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
//             <button
//               type="button"
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
//             >
//               <Menu className="w-5 h-5" />
//             </button>

//             <div className="relative flex-1 max-w-xl hidden sm:block">
//               <Search className="absolute right-4 top-3.5 w-5 h-5 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="ابحث عن طالب، معلم، مدرسة..."
//                 className="w-full h-12 bg-slate-100 border border-transparent rounded-xl pr-12 pl-4 text-sm outline-none focus:bg-white focus:border-blue-500 transition"
//               />
//             </div>

//             <div className="flex items-center gap-3 mr-auto">
//               <button
//                 type="button"
//                 className="relative w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
//               >
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
//               </button>

//               <div className="hidden sm:flex items-center gap-3 pr-3 border-r border-slate-200">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
//                   <UserRound className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-slate-800">
//                     مدير النظام
//                   </p>
//                   <p className="text-xs text-slate-400">الإدارة</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* ================= CONTENT ================= */}
//         <main className="p-4 sm:p-6 lg:p-8 flex-1">
//           {/* Welcome */}
//           <section className="mb-8">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
//               <div>
//                 <p className="text-sm text-blue-600 font-bold mb-2">
//                   مرحبًا بك 👋
//                 </p>
//                 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
//                   لوحة تحكم مجمع المدارس
//                 </h1>
//                 <p className="text-sm text-slate-500 mt-2">
//                   تابع إدارة المدارس والطلاب والمعلمين من مكان واحد.
//                 </p>
//               </div>

//               <Link
//                 href="/dashboard/schools"
//                 className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-600/20 transition"
//               >
//                 <School className="w-5 h-5" />
//                 إدارة المدارس
//               </Link>
//             </div>
//           </section>

//           {/* Error Banner */}
//           {schoolsError && (
//             <div className="mb-7 bg-red-50 border border-red-200 rounded-2xl p-4">
//               <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
//                 <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
//                   <AlertCircle className="w-5 h-5" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold text-red-800">مشكلة في الاتصال</h3>
//                   <p className="text-sm text-red-600 mt-1">{schoolsError}</p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={fetchSchools}
//                   className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   إعادة المحاولة
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* ================= STATS ================= */}
//           <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
//             {stats.map((stat) => (
//               <Link
//                 href={stat.href}
//                 key={stat.title}
//                 className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-200/60 transition"
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <p className="text-sm text-slate-500">{stat.title}</p>
//                     <h2 className="text-3xl font-black text-slate-900 mt-3">
//                       {stat.value}
//                     </h2>
//                     <p className="text-xs text-slate-400 mt-3">
//                       {stat.description}
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
//                     {stat.icon}
//                   </div>
//                 </div>
//                 <div className="mt-5 flex items-center justify-between">
//                   <span className="text-xs font-bold text-blue-600">
//                     عرض التفاصيل
//                   </span>
//                   <ChevronLeft className="w-4 h-4 text-blue-600" />
//                 </div>
//               </Link>
//             ))}
//           </section>

//           {/* ================= QUICK ACTIONS ================= */}
//           <section className="mb-8">
//             <div className="flex items-center justify-between mb-5">
//               <div>
//                 <h2 className="text-xl font-black text-slate-900">
//                   الوصول السريع
//                 </h2>
//                 <p className="text-sm text-slate-500 mt-1">أهم أقسام الإدارة</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
//               {[
//                 {
//                   title: "الطلاب",
//                   href: "/dashboard/students",
//                   icon: <GraduationCap className="w-6 h-6" />,
//                 },
//                 {
//                   title: "المعلمون",
//                   href: "/dashboard/teachers",
//                   icon: <UserCheck className="w-6 h-6" />,
//                 },
//                 {
//                   title: "أولياء الأمور",
//                   href: "/dashboard/parents",
//                   icon: <UserRound className="w-6 h-6" />,
//                 },
//                 {
//                   title: "المدارس",
//                   href: "/dashboard/schools",
//                   icon: <School className="w-6 h-6" />,
//                 },
//                 {
//                   title: "الفصول",
//                   href: "/dashboard/classes",
//                   icon: <BookOpen className="w-6 h-6" />,
//                 },
//                 {
//                   title: "الحضور",
//                   href: "/dashboard/attendance",
//                   icon: <ClipboardCheck className="w-6 h-6" />,
//                 },
//               ].map((item) => (
//                 <Link
//                   href={item.href}
//                   key={item.title}
//                   className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition group"
//                 >
//                   <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
//                     {item.icon}
//                   </div>
//                   <h3 className="font-bold text-slate-800 mt-4">
//                     {item.title}
//                   </h3>
//                   <p className="text-xs text-slate-400 mt-1">فتح القسم</p>
//                 </Link>
//               ))}
//             </div>
//           </section>

//           {/* ================= MAIN GRID ================= */}
//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//             {/* Schools List */}
//             <section className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
//               <div className="p-5 sm:p-6 border-b border-slate-200">
//                 <div className="flex items-center justify-between gap-4">
//                   <div>
//                     <h2 className="text-lg font-black text-slate-900">
//                       المدارس
//                     </h2>
//                     <p className="text-sm text-slate-500 mt-1">
//                       أحدث المدارس المسجلة في النظام
//                     </p>
//                   </div>
//                   <Link
//                     href="/dashboard/schools"
//                     className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
//                   >
//                     عرض الكل
//                     <ChevronLeft className="w-4 h-4" />
//                   </Link>
//                 </div>
//               </div>

//               <div className="p-5 sm:p-6">
//                 {loadingSchools ? (
//                   <div className="h-64 flex flex-col items-center justify-center">
//                     <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//                     <p className="text-sm text-slate-500 mt-3">
//                       جاري تحميل المدارس...
//                     </p>
//                   </div>
//                 ) : latestSchools.length === 0 ? (
//                   <div className="h-64 flex flex-col items-center justify-center text-center">
//                     <School className="w-10 h-10 text-slate-300" />
//                     <p className="font-bold text-slate-600 mt-3">
//                       لا توجد مدارس
//                     </p>
//                     <p className="text-sm text-slate-400 mt-1">
//                       لم يتم العثور على مدارس في قاعدة البيانات.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-3">
//                     {latestSchools.map((school) => (
//                       <Link
//                         href="/dashboard/schools"
//                         key={school.id}
//                         className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/35 transition"
//                       >
//                         <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center overflow-hidden shrink-0">
//                           {school.image ? (
//                             <img
//                               src={`${API_URL.replace("/api", "")}/storage/${school.image}`}
//                               alt={school.name}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <School className="w-7 h-7" />
//                           )}
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <h3 className="font-bold text-slate-800 truncate">
//                             {school.name}
//                           </h3>
//                           <p className="text-xs text-slate-400 mt-1 truncate">
//                             {school.address ||
//                               school.phone ||
//                               school.email ||
//                               "لا توجد بيانات إضافية"}
//                           </p>
//                         </div>
//                         <div className="hidden sm:block text-left">
//                           <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold">
//                             <CheckCircle2 className="w-3.5 h-3.5" />
//                             نشطة
//                           </span>
//                         </div>
//                         <ChevronLeft className="w-5 h-5 text-slate-300 shrink-0" />
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* System Status */}
//             <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-lg font-black text-slate-900">
//                     حالة النظام
//                   </h2>
//                   <p className="text-sm text-slate-500 mt-1">
//                     الخدمات الأساسية
//                   </p>
//                 </div>
//                 <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
//                   <CheckCircle2 className="w-5 h-5" />
//                 </div>
//               </div>

//               <div className="mt-6 space-y-3">
//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
//                       <span className="text-sm font-bold text-slate-700">
//                         Laravel API
//                       </span>
//                     </div>
//                     <span
//                       className={`text-xs font-bold ${
//                         schoolsError
//                           ? "text-red-500"
//                           : loadingSchools
//                             ? "text-amber-500"
//                             : "text-emerald-600"
//                       }`}
//                     >
//                       {schoolsError
//                         ? "غير متصل"
//                         : loadingSchools
//                           ? "جاري الفحص"
//                           : "متصل"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
//                       <span className="text-sm font-bold text-slate-700">
//                         قاعدة البيانات
//                       </span>
//                     </div>
//                     <span className="text-xs font-bold text-emerald-600">
//                       MySQL / SQLite
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <span
//                         className={`w-2.5 h-2.5 rounded-full ${
//                           schoolsError ? "bg-red-500" : "bg-emerald-500"
//                         }`}
//                       />
//                       <span className="text-sm font-bold text-slate-700">
//                         Schools API
//                       </span>
//                     </div>
//                     <span
//                       className={`text-xs font-bold ${
//                         schoolsError ? "text-red-500" : "text-emerald-600"
//                       }`}
//                     >
//                       {schoolsError
//                         ? "خطأ"
//                         : loadingSchools
//                           ? "..."
//                           : `${totalSchools} مدرسة`}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* Footer */}
//           <footer className="mt-8 py-6 border-t border-slate-200">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
//               <p className="text-xs text-slate-400">
//                 Smart Schools Complex © 2026
//               </p>
//               <p className="text-xs text-slate-400">Next.js + Laravel</p>
//             </div>
//           </footer>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  UserRound,
  School,
  BookOpen,
  Newspaper,
  CalendarDays,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

type MenuItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
};

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      title: "الرئيسية",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
    },
    {
      title: "الطلاب",
      href: "/dashboard/students",
      icon: <GraduationCap className="w-5 h-5 shrink-0" />,
    },
    {
      title: "المعلمون",
      href: "/dashboard/teachers",
      icon: <UserCheck className="w-5 h-5 shrink-0" />,
    },
    {
      title: "أولياء الأمور",
      href: "/dashboard/parents",
      icon: <UserRound className="w-5 h-5 shrink-0" />,
    },
    {
      title: "المدارس",
      href: "/dashboard/schools",
      icon: <School className="w-5 h-5 shrink-0" />,
    },
    {
      title: "الفصول",
      href: "/dashboard/classes",
      icon: <BookOpen className="w-5 h-5 shrink-0" />,
    },
    {
      title: "المواد الدراسية",
      href: "/dashboard/subjects",
      icon: <BookOpen className="w-5 h-5 shrink-0" />,
    },
    {
      title: "الأخبار والمقالات",
      href: "/dashboard/articles",
      icon: <Newspaper className="w-5 h-5 shrink-0" />,
    },
    {
      title: "الأحداث",
      href: "/dashboard/events",
      icon: <CalendarDays className="w-5 h-5 shrink-0" />,
    },
    {
      title: "الحضور",
      href: "/dashboard/attendance",
      icon: <ClipboardCheck className="w-5 h-5 shrink-0" />,
    },
    {
      title: "المستخدمون",
      href: "/dashboard/users",
      icon: <Users className="w-5 h-5 shrink-0" />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed
          top-0
          right-0
          z-50
          h-screen
          bg-slate-950
          text-white
          border-l
          border-slate-800
          transition-all
          duration-300
          flex
          flex-col
          ${isCollapsed ? "w-20" : "w-72"}
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo & Collapse Button Container */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-slate-800 shrink-0 relative">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0">
              <School className="w-6 h-6 text-white" />
            </div>

            {!isCollapsed && (
              <div className="truncate">
                <h1 className="font-black text-lg truncate">Smart Schools</h1>
                <p className="text-xs text-slate-500">School Management</p>
              </div>
            )}
          </div>

          {/* زر السهم للتوسيع والتصغير في المنتصف بجوار اللوجو */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition items-center justify-center border border-slate-800 shadow-sm"
            title={isCollapsed ? "توسيع القائمة" : "تصغير القائمة"}
          >
            {isCollapsed ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Box */}
        {!isCollapsed && (
          <div className="p-4 shrink-0">
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <UserRound className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">مدير النظام</p>
                  <p className="text-xs text-slate-500 mt-1">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="px-3 pb-5 overflow-y-auto flex-1 space-y-1 mt-2">
          {!isCollapsed && (
            <p className="text-[11px] font-bold text-slate-600 px-3 mb-3">
              الإدارة الرئيسية
            </p>
          )}

          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                title={isCollapsed ? item.title : ""}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }
                  ${isCollapsed ? "justify-center px-2" : ""}
                `}
              >
                {item.icon}

                {!isCollapsed && <span className="truncate">{item.title}</span>}

                {!isCollapsed && isActive && (
                  <span className="mr-auto w-2 h-2 rounded-full bg-white shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
