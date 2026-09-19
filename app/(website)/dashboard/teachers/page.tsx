"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  BookOpen,
  X,
  Mail,
  Phone,
} from "lucide-react";

interface Teacher {
  id: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  subject: string;
  experience: string;
  gender: "ذكر" | "أنثى";
  status: "نشط" | "غير نشط";
}

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: "أحمد محمد علي",
    code: "TCH-001",
    email: "ahmed.teacher@example.com",
    phone: "01012345678",
    subject: "اللغة العربية",
    experience: "8 سنوات",
    gender: "ذكر",
    status: "نشط",
  },
  {
    id: 2,
    name: "سارة محمود حسن",
    code: "TCH-002",
    email: "sara.teacher@example.com",
    phone: "01112345678",
    subject: "اللغة الإنجليزية",
    experience: "6 سنوات",
    gender: "أنثى",
    status: "نشط",
  },
  {
    id: 3,
    name: "محمد خالد إبراهيم",
    code: "TCH-003",
    email: "mohamed.teacher@example.com",
    phone: "01212345678",
    subject: "الرياضيات",
    experience: "10 سنوات",
    gender: "ذكر",
    status: "نشط",
  },
  {
    id: 4,
    name: "مريم أحمد علي",
    code: "TCH-004",
    email: "mariam.teacher@example.com",
    phone: "01512345678",
    subject: "العلوم",
    experience: "5 سنوات",
    gender: "أنثى",
    status: "غير نشط",
  },
  {
    id: 5,
    name: "يوسف حسن محمود",
    code: "TCH-005",
    email: "youssef.teacher@example.com",
    phone: "01098765432",
    subject: "الدراسات الاجتماعية",
    experience: "7 سنوات",
    gender: "ذكر",
    status: "نشط",
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("الكل");

  const [showAddModal, setShowAddModal] = useState(false);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "اللغة العربية",
    experience: "",
    gender: "ذكر" as "ذكر" | "أنثى",
  });

  const subjects = [
    "الكل",
    "اللغة العربية",
    "اللغة الإنجليزية",
    "الرياضيات",
    "العلوم",
    "الدراسات الاجتماعية",
    "اللغة الفرنسية",
    "الحاسب الآلي",
  ];

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        teacher.name.toLowerCase().includes(searchValue) ||
        teacher.code.toLowerCase().includes(searchValue) ||
        teacher.email.toLowerCase().includes(searchValue) ||
        teacher.subject.toLowerCase().includes(searchValue);

      const matchesSubject =
        selectedSubject === "الكل" || teacher.subject === selectedSubject;

      return matchesSearch && matchesSubject;
    });
  }, [teachers, search, selectedSubject]);

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "نشط",
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "غير نشط",
  ).length;

  const femaleTeachers = teachers.filter(
    (teacher) => teacher.gender === "أنثى",
  ).length;

  const handleAddTeacher = () => {
    if (!newTeacher.name.trim()) {
      alert("من فضلك اكتب اسم المعلم");
      return;
    }

    const newId =
      teachers.length > 0
        ? Math.max(...teachers.map((teacher) => teacher.id)) + 1
        : 1;

    const teacher: Teacher = {
      id: newId,
      name: newTeacher.name,
      code: `TCH-${String(newId).padStart(3, "0")}`,
      email: newTeacher.email,
      phone: newTeacher.phone,
      subject: newTeacher.subject,
      experience: newTeacher.experience,
      gender: newTeacher.gender,
      status: "نشط",
    };

    setTeachers((prev) => [...prev, teacher]);

    setNewTeacher({
      name: "",
      email: "",
      phone: "",
      subject: "اللغة العربية",
      experience: "",
      gender: "ذكر",
    });

    setShowAddModal(false);
  };

  const handleDeleteTeacher = (id: number) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا المعلم؟");

    if (!confirmed) return;

    setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B192C] text-white shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                المعلمون
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                إدارة بيانات المعلمين والمواد الدراسية
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#142b48]"
          >
            <Plus className="h-5 w-5" />
            إضافة معلم
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                إجمالي المعلمين
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {teachers.length}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                المعلمون النشطون
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeTeachers}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <UserCheck className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">غير النشطين</p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {inactiveTeachers}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <UserX className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Female */}
        <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">المعلمات</p>

              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                {femaleTeachers}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <GraduationCap className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث باسم المعلم أو الكود أو المادة..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-12 pl-4 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white"
            />
          </div>

          {/* Subject Filter */}
          <div className="w-full lg:w-64">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">قائمة المعلمين</h2>

            <p className="mt-1 text-sm text-slate-500">
              عدد النتائج: {filteredTeachers.length}
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-right">
                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  المعلم
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  الكود
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  المادة
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  الخبرة
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  الهاتف
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  الحالة
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B192C] font-bold text-white">
                          {teacher.name.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {teacher.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {teacher.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                        {teacher.code}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <BookOpen className="h-4 w-4 text-[#0B192C]" />
                        {teacher.subject}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {teacher.experience || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="h-4 w-4 text-slate-400" />
                        {teacher.phone || "—"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {teacher.status === "نشط" ? (
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          نشط
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          غير نشط
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          title="عرض"
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          title="تعديل"
                          className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          title="حذف"
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <Users className="mx-auto mb-3 h-12 w-12 text-slate-300" />

                    <p className="font-semibold text-slate-500">
                      لا يوجد معلمون
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      جرّبي تغيير البحث أو المادة المحددة
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 p-4 lg:hidden">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B192C] font-bold text-white">
                      {teacher.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {teacher.name}
                      </h3>

                      <p className="text-xs text-slate-400">{teacher.code}</p>
                    </div>
                  </div>

                  {teacher.status === "نشط" ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      نشط
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      غير نشط
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-xs text-slate-400">المادة</p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {teacher.subject}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-xs text-slate-400">الخبرة</p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {teacher.experience || "—"}
                    </p>
                  </div>

                  <div className="col-span-2 rounded-xl bg-white p-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />

                      <p className="font-semibold text-slate-700">
                        {teacher.phone || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 rounded-xl bg-white p-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />

                      <p className="break-all font-semibold text-slate-700">
                        {teacher.email || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-sm font-semibold text-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                    عرض
                  </button>

                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 py-2.5 text-sm font-semibold text-amber-600"
                  >
                    <Pencil className="h-4 w-4" />
                    تعديل
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-sm font-semibold text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    حذف
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <Users className="mx-auto mb-3 h-12 w-12 text-slate-300" />

              <p className="font-semibold text-slate-500">لا يوجد معلمون</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  إضافة معلم جديد
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  أدخل بيانات المعلم
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  اسم المعلم
                </label>

                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      name: e.target.value,
                    })
                  }
                  placeholder="اكتب اسم المعلم"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0B192C]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      email: e.target.value,
                    })
                  }
                  placeholder="teacher@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0B192C]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  رقم الهاتف
                </label>

                <input
                  type="text"
                  value={newTeacher.phone}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      phone: e.target.value,
                    })
                  }
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0B192C]"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  المادة الدراسية
                </label>

                <select
                  value={newTeacher.subject}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      subject: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0B192C]"
                >
                  {subjects
                    .filter((item) => item !== "الكل")
                    .map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  سنوات الخبرة
                </label>

                <input
                  type="text"
                  value={newTeacher.experience}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      experience: e.target.value,
                    })
                  }
                  placeholder="مثال: 5 سنوات"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0B192C]"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  النوع
                </label>

                <select
                  value={newTeacher.gender}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      gender: e.target.value as "ذكر" | "أنثى",
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0B192C]"
                >
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleAddTeacher}
                className="rounded-xl bg-[#0B192C] px-6 py-3 font-semibold text-white transition hover:bg-[#142b48]"
              >
                إضافة المعلم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
