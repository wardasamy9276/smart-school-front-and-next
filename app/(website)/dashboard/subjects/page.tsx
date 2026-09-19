"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  BookOpen,
  BookMarked,
  Users,
  Clock3,
  X,
  GraduationCap,
  UserRound,
} from "lucide-react";

interface Subject {
  id: number;
  name: string;
  code: string;
  stage: string;
  grade: string;
  teacher: string;
  teacherCode: string;
  weeklyHours: number;
  studentsCount: number;
  description: string;
  status: "نشطة" | "غير نشطة";
}

const initialSubjects: Subject[] = [
  {
    id: 1,
    name: "اللغة العربية",
    code: "SUB-001",
    stage: "المرحلة الابتدائية",
    grade: "الصف الأول الابتدائي",
    teacher: "أحمد محمد علي",
    teacherCode: "TCH-001",
    weeklyHours: 5,
    studentsCount: 84,
    description:
      "مادة اللغة العربية وتشمل القراءة والكتابة والنحو والتعبير والمهارات اللغوية.",
    status: "نشطة",
  },
  {
    id: 2,
    name: "اللغة الإنجليزية",
    code: "SUB-002",
    stage: "المرحلة الابتدائية",
    grade: "الصف الثاني الابتدائي",
    teacher: "سارة محمود حسن",
    teacherCode: "TCH-002",
    weeklyHours: 4,
    studentsCount: 78,
    description:
      "تعليم أساسيات اللغة الإنجليزية وتنمية مهارات الاستماع والتحدث والقراءة والكتابة.",
    status: "نشطة",
  },
  {
    id: 3,
    name: "الرياضيات",
    code: "SUB-003",
    stage: "المرحلة الابتدائية",
    grade: "الصف الثالث الابتدائي",
    teacher: "محمد خالد إبراهيم",
    teacherCode: "TCH-003",
    weeklyHours: 5,
    studentsCount: 91,
    description:
      "تعليم العمليات الحسابية والمفاهيم الرياضية وتنمية مهارات التفكير وحل المشكلات.",
    status: "نشطة",
  },
  {
    id: 4,
    name: "العلوم",
    code: "SUB-004",
    stage: "المرحلة الإعدادية",
    grade: "الصف الأول الإعدادي",
    teacher: "مريم أحمد علي",
    teacherCode: "TCH-004",
    weeklyHours: 3,
    studentsCount: 72,
    description:
      "دراسة أساسيات العلوم والطبيعة والإنسان والبيئة والتجارب العلمية.",
    status: "نشطة",
  },
  {
    id: 5,
    name: "الدراسات الاجتماعية",
    code: "SUB-005",
    stage: "المرحلة الإعدادية",
    grade: "الصف الثاني الإعدادي",
    teacher: "يوسف حسن محمود",
    teacherCode: "TCH-005",
    weeklyHours: 3,
    studentsCount: 65,
    description:
      "دراسة التاريخ والجغرافيا والمجتمع وتنمية الوعي بالمكان والزمان والأحداث.",
    status: "غير نشطة",
  },
  {
    id: 6,
    name: "الفيزياء",
    code: "SUB-006",
    stage: "المرحلة الثانوية",
    grade: "الصف الأول الثانوي",
    teacher: "أحمد محمد علي",
    teacherCode: "TCH-001",
    weeklyHours: 4,
    studentsCount: 58,
    description:
      "دراسة المبادئ الأساسية للفيزياء والحركة والقوة والطاقة والظواهر الطبيعية.",
    status: "نشطة",
  },
  {
    id: 7,
    name: "الكيمياء",
    code: "SUB-007",
    stage: "المرحلة الثانوية",
    grade: "الصف الأول الثانوي",
    teacher: "مريم أحمد علي",
    teacherCode: "TCH-004",
    weeklyHours: 4,
    studentsCount: 58,
    description:
      "دراسة المادة والتفاعلات الكيميائية والعناصر والمركبات والتجارب المعملية.",
    status: "نشطة",
  },
  {
    id: 8,
    name: "الحاسب الآلي",
    code: "SUB-008",
    stage: "المرحلة الثانوية",
    grade: "الصف الأول الثانوي",
    teacher: "محمد خالد إبراهيم",
    teacherCode: "TCH-003",
    weeklyHours: 2,
    studentsCount: 58,
    description:
      "تعليم أساسيات الحاسب والبرمجة والتكنولوجيا والمهارات الرقمية.",
    status: "نشطة",
  },
];

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] = useState("الكل");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    stage: "المرحلة الابتدائية",
    grade: "",
    teacher: "",
    teacherCode: "",
    weeklyHours: 3,
    studentsCount: 0,
    description: "",
    status: "نشطة" as "نشطة" | "غير نشطة",
  });

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        subject.name.toLowerCase().includes(searchValue) ||
        subject.code.toLowerCase().includes(searchValue) ||
        subject.teacher.toLowerCase().includes(searchValue) ||
        subject.grade.toLowerCase().includes(searchValue);

      const matchesStage =
        stageFilter === "الكل" || subject.stage === stageFilter;

      const matchesStatus =
        statusFilter === "الكل" || subject.status === statusFilter;

      return matchesSearch && matchesStage && matchesStatus;
    });
  }, [subjects, search, stageFilter, statusFilter]);

  const totalSubjects = subjects.length;

  const activeSubjects = subjects.filter(
    (subject) => subject.status === "نشطة",
  ).length;

  const inactiveSubjects = subjects.filter(
    (subject) => subject.status === "غير نشطة",
  ).length;

  const totalHours = subjects.reduce(
    (total, subject) => total + subject.weeklyHours,
    0,
  );

  const openAddModal = () => {
    setEditingSubject(null);

    setFormData({
      name: "",
      code: `SUB-${String(subjects.length + 1).padStart(3, "0")}`,
      stage: "المرحلة الابتدائية",
      grade: "",
      teacher: "",
      teacherCode: "",
      weeklyHours: 3,
      studentsCount: 0,
      description: "",
      status: "نشطة",
    });

    setShowModal(true);
  };

  const openEditModal = (subject: Subject) => {
    setEditingSubject(subject);

    setFormData({
      name: subject.name,
      code: subject.code,
      stage: subject.stage,
      grade: subject.grade,
      teacher: subject.teacher,
      teacherCode: subject.teacherCode,
      weeklyHours: subject.weeklyHours,
      studentsCount: subject.studentsCount,
      description: subject.description,
      status: subject.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("من فضلك اكتب اسم المادة");
      return;
    }

    if (!formData.grade.trim()) {
      alert("من فضلك اكتب الصف الدراسي");
      return;
    }

    if (!formData.teacher.trim()) {
      alert("من فضلك اكتب اسم المدرس");
      return;
    }

    if (editingSubject) {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === editingSubject.id
            ? {
                ...editingSubject,
                ...formData,
              }
            : subject,
        ),
      );
    } else {
      const newSubject: Subject = {
        id: Date.now(),
        ...formData,
      };

      setSubjects((prev) => [...prev, newSubject]);
    }

    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    const subject = subjects.find((item) => item.id === id);

    if (!subject) return;

    const confirmed = window.confirm(
      `هل أنت متأكد من حذف مادة "${subject.name}"؟`,
    );

    if (!confirmed) return;

    setSubjects((prev) => prev.filter((item) => item.id !== id));
  };

  const openViewModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowViewModal(true);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B192C] text-white shadow-lg">
              <BookOpen size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                المواد الدراسية
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                إدارة المواد الدراسية والمناهج والمدرسين
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#132742]"
        >
          <Plus size={20} />
          إضافة مادة جديدة
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">إجمالي المواد</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {totalSubjects}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">مواد نشطة</p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {activeSubjects}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <BookMarked size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">مواد غير نشطة</p>
              <p className="mt-2 text-3xl font-bold text-red-600">
                {inactiveSubjects}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <BookOpen size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">إجمالي الحصص أسبوعيًا</p>
              <p className="mt-2 text-3xl font-bold text-purple-600">
                {totalHours}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Clock3 size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث باسم المادة أو الكود أو المدرس..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-11 pl-4 text-sm outline-none transition focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
            />
          </div>

          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">كل المراحل</option>
            <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
            <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
            <option value="المرحلة الثانوية">المرحلة الثانوية</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">كل الحالات</option>
            <option value="نشطة">نشطة</option>
            <option value="غير نشطة">غير نشطة</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-right text-sm font-bold text-slate-700">
                  المادة
                </th>

                <th className="px-5 py-4 text-right text-sm font-bold text-slate-700">
                  المرحلة
                </th>

                <th className="px-5 py-4 text-right text-sm font-bold text-slate-700">
                  الصف
                </th>

                <th className="px-5 py-4 text-right text-sm font-bold text-slate-700">
                  المدرس
                </th>

                <th className="px-5 py-4 text-right text-sm font-bold text-slate-700">
                  الحصص
                </th>

                <th className="px-5 py-4 text-right text-sm font-bold text-slate-700">
                  الطلاب
                </th>

                <th className="px-5 py-4 text-right text-sm font-bold text-slate-700">
                  الحالة
                </th>

                <th className="px-5 py-4 text-center text-sm font-bold text-slate-700">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <BookOpen size={21} />
                        </div>

                        <div>
                          <p className="font-bold text-slate-900">
                            {subject.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {subject.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {subject.stage}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {subject.grade}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                          <UserRound size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {subject.teacher}
                          </p>

                          <p className="text-xs text-slate-400">
                            {subject.teacherCode}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Clock3 size={16} className="text-slate-400" />
                        {subject.weeklyHours} حصص
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Users size={17} className="text-slate-400" />
                        {subject.studentsCount}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          subject.status === "نشطة"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {subject.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openViewModal(subject)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          title="عرض"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(subject)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                          title="تعديل"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(subject.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                          title="حذف"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    لا توجد مواد مطابقة للبحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BookOpen size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">{subject.name}</h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {subject.code}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    subject.status === "نشطة"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {subject.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">المرحلة</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {subject.stage}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">الصف</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {subject.grade}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">المدرس</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {subject.teacher}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">عدد الحصص</p>

                  <p className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                    <Clock3 size={15} />
                    {subject.weeklyHours} حصص أسبوعيًا
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">عدد الطلاب</p>

                  <p className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                    <Users size={15} />
                    {subject.studentsCount} طالب
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => openViewModal(subject)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-sm font-semibold text-blue-600"
                >
                  <Eye size={17} />
                  عرض
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(subject)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 py-2.5 text-sm font-semibold text-amber-600"
                >
                  <Pencil size={17} />
                  تعديل
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(subject.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-500 shadow-sm">
            لا توجد مواد مطابقة للبحث.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingSubject ? "تعديل المادة" : "إضافة مادة جديدة"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  أدخل بيانات المادة الدراسية
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    اسم المادة
                  </label>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="مثال: الرياضيات"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Code */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    كود المادة
                  </label>

                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value,
                      })
                    }
                    placeholder="SUB-001"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Stage */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    المرحلة الدراسية
                  </label>

                  <select
                    value={formData.stage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stage: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C]"
                  >
                    <option value="المرحلة الابتدائية">
                      المرحلة الابتدائية
                    </option>

                    <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>

                    <option value="المرحلة الثانوية">المرحلة الثانوية</option>
                  </select>
                </div>

                {/* Grade */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    الصف الدراسي
                  </label>

                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grade: e.target.value,
                      })
                    }
                    placeholder="مثال: الصف الثالث الابتدائي"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Teacher */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    اسم المدرس
                  </label>

                  <input
                    type="text"
                    value={formData.teacher}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teacher: e.target.value,
                      })
                    }
                    placeholder="اسم مدرس المادة"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Teacher Code */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    كود المدرس
                  </label>

                  <input
                    type="text"
                    value={formData.teacherCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teacherCode: e.target.value,
                      })
                    }
                    placeholder="TCH-001"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Weekly Hours */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    عدد الحصص أسبوعيًا
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.weeklyHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        weeklyHours: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Students */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    عدد الطلاب
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={formData.studentsCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        studentsCount: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    حالة المادة
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "نشطة" | "غير نشطة",
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C]"
                  >
                    <option value="نشطة">نشطة</option>
                    <option value="غير نشطة">غير نشطة</option>
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    وصف المادة
                  </label>

                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="اكتب وصفًا مختصرًا للمادة..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 font-semibold text-white transition hover:bg-[#132742]"
                >
                  <Plus size={19} />

                  {editingSubject ? "حفظ التعديلات" : "إضافة المادة"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BookOpen size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedSubject.name}
                  </h2>

                  <p className="text-sm text-slate-400">
                    {selectedSubject.code}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">المرحلة</p>
                  <p className="mt-2 font-bold text-slate-800">
                    {selectedSubject.stage}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">الصف الدراسي</p>
                  <p className="mt-2 font-bold text-slate-800">
                    {selectedSubject.grade}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">المدرس</p>
                  <p className="mt-2 flex items-center gap-2 font-bold text-slate-800">
                    <UserRound size={17} />
                    {selectedSubject.teacher}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">كود المدرس</p>
                  <p className="mt-2 font-bold text-slate-800">
                    {selectedSubject.teacherCode}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">الحصص الأسبوعية</p>
                  <p className="mt-2 flex items-center gap-2 font-bold text-slate-800">
                    <Clock3 size={17} />
                    {selectedSubject.weeklyHours} حصص
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">عدد الطلاب</p>
                  <p className="mt-2 flex items-center gap-2 font-bold text-slate-800">
                    <Users size={17} />
                    {selectedSubject.studentsCount} طالب
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs text-slate-400">الحالة</p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      selectedSubject.status === "نشطة"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedSubject.status}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs text-slate-400">الوصف</p>

                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {selectedSubject.description || "لا يوجد وصف للمادة."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="mt-6 w-full rounded-xl bg-[#0B192C] px-5 py-3 font-semibold text-white"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
