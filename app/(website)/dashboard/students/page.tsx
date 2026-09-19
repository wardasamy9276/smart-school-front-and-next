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
  X,
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  className: string;
  gender: "ذكر" | "أنثى";
  status: "نشط" | "غير نشط";
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: "أحمد محمد علي",
    code: "STU-001",
    email: "ahmed@example.com",
    phone: "01012345678",
    className: "الصف الأول",
    gender: "ذكر",
    status: "نشط",
  },
  {
    id: 2,
    name: "سارة أحمد محمود",
    code: "STU-002",
    email: "sara@example.com",
    phone: "01112345678",
    className: "الصف الثاني",
    gender: "أنثى",
    status: "نشط",
  },
  {
    id: 3,
    name: "محمد خالد حسن",
    code: "STU-003",
    email: "mohamed@example.com",
    phone: "01212345678",
    className: "الصف الثالث",
    gender: "ذكر",
    status: "غير نشط",
  },
  {
    id: 4,
    name: "مريم علي حسن",
    code: "STU-004",
    email: "mariam@example.com",
    phone: "01512345678",
    className: "الصف الرابع",
    gender: "أنثى",
    status: "نشط",
  },
  {
    id: 5,
    name: "يوسف إبراهيم",
    code: "STU-005",
    email: "youssef@example.com",
    phone: "01098765432",
    className: "الصف الخامس",
    gender: "ذكر",
    status: "نشط",
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("الكل");

  const [showAddModal, setShowAddModal] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    className: "الصف الأول",
    gender: "ذكر" as "ذكر" | "أنثى",
  });

  const classes = [
    "الكل",
    "الصف الأول",
    "الصف الثاني",
    "الصف الثالث",
    "الصف الرابع",
    "الصف الخامس",
    "الصف السادس",
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.code.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase());

      const matchesClass =
        selectedClass === "الكل" || student.className === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [students, search, selectedClass]);

  const activeStudents = students.filter(
    (student) => student.status === "نشط",
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "غير نشط",
  ).length;

  const maleStudents = students.filter(
    (student) => student.gender === "ذكر",
  ).length;

  const handleAddStudent = () => {
    if (!newStudent.name.trim()) {
      alert("من فضلك اكتب اسم الطالب");
      return;
    }

    const newId =
      students.length > 0
        ? Math.max(...students.map((student) => student.id)) + 1
        : 1;

    const student: Student = {
      id: newId,
      name: newStudent.name,
      code: `STU-${String(newId).padStart(3, "0")}`,
      email: newStudent.email,
      phone: newStudent.phone,
      className: newStudent.className,
      gender: newStudent.gender,
      status: "نشط",
    };

    setStudents((prev) => [...prev, student]);

    setNewStudent({
      name: "",
      email: "",
      phone: "",
      className: "الصف الأول",
      gender: "ذكر",
    });

    setShowAddModal(false);
  };

  const handleDeleteStudent = (id: number) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا الطالب؟");

    if (!confirmed) return;

    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    // <div dir="rtl" className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
    <div dir="rtl" className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B192C] text-white shadow-lg">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  الطلاب
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  إدارة بيانات الطلاب ومتابعة حالتهم الدراسية
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#142b48]"
          >
            <Plus className="h-5 w-5" />
            إضافة طالب
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
                إجمالي الطلاب
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {students.length}
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
                الطلاب النشطون
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeStudents}
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
                {inactiveStudents}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <UserX className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Male */}
        <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                الطلاب الذكور
              </p>

              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                {maleStudents}
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
              placeholder="ابحث باسم الطالب أو الكود أو البريد الإلكتروني..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-12 pl-4 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white"
            />
          </div>

          {/* Class Filter */}
          <div className="w-full lg:w-56">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white"
            >
              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">قائمة الطلاب</h2>

              <p className="mt-1 text-sm text-slate-500">
                عدد النتائج: {filteredStudents.length}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-right">
                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  الطالب
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  الكود
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  الصف
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  الهاتف
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  النوع
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B192C] font-bold text-white">
                          {student.name.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {student.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                        {student.code}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.className}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.phone || "—"}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.gender}
                    </td>

                    <td className="px-5 py-4">
                      {student.status === "نشط" ? (
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
                          onClick={() => handleDeleteStudent(student.id)}
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

                    <p className="font-semibold text-slate-500">لا يوجد طلاب</p>

                    <p className="mt-1 text-sm text-slate-400">
                      جرّبي تغيير البحث أو الصف المحدد
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 p-4 lg:hidden">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B192C] font-bold text-white">
                      {student.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {student.name}
                      </h3>

                      <p className="text-xs text-slate-400">{student.code}</p>
                    </div>
                  </div>

                  {student.status === "نشط" ? (
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
                    <p className="text-xs text-slate-400">الصف</p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {student.className}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-xs text-slate-400">النوع</p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {student.gender}
                    </p>
                  </div>

                  <div className="col-span-2 rounded-xl bg-white p-3">
                    <p className="text-xs text-slate-400">الهاتف</p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {student.phone || "—"}
                    </p>
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
                    onClick={() => handleDeleteStudent(student.id)}
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

              <p className="font-semibold text-slate-500">لا يوجد طلاب</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  إضافة طالب جديد
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  أدخل بيانات الطالب
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
                  اسم الطالب
                </label>

                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      name: e.target.value,
                    })
                  }
                  placeholder="اكتب اسم الطالب"
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
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      email: e.target.value,
                    })
                  }
                  placeholder="student@example.com"
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
                  value={newStudent.phone}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      phone: e.target.value,
                    })
                  }
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0B192C]"
                />
              </div>

              {/* Class */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  الصف الدراسي
                </label>

                <select
                  value={newStudent.className}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      className: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0B192C]"
                >
                  {classes
                    .filter((item) => item !== "الكل")
                    .map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  النوع
                </label>

                <select
                  value={newStudent.gender}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
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

            {/* Modal Buttons */}
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
                onClick={handleAddStudent}
                className="rounded-xl bg-[#0B192C] px-6 py-3 font-semibold text-white transition hover:bg-[#142b48]"
              >
                إضافة الطالب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
