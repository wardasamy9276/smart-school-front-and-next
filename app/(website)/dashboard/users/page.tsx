"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  School,
  Users,
  UserCheck,
  GraduationCap,
  X,
  BookOpen,
  UserRound,
  CalendarDays,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

interface ClassRoom {
  id: number;
  nameAr: string;
  nameEn: string;
  code: string;
  stageAr: string;
  stageEn: string;
  gradeAr: string;
  gradeEn: string;
  teacherAr: string;
  teacherEn: string;
  studentsCount: number;
  capacity: number;
  roomAr: string;
  roomEn: string;
  status: "نشط" | "غير نشط";
}

const initialClasses: ClassRoom[] = [
  {
    id: 1,
    nameAr: "الصف الأول الابتدائي - أ",
    nameEn: "Grade 1 Primary - A",
    code: "CLS-001",
    stageAr: "المرحلة الابتدائية",
    stageEn: "Primary Stage",
    gradeAr: "الصف الأول الابتدائي",
    gradeEn: "Grade 1 Primary",
    teacherAr: "أحمد محمد علي",
    teacherEn: "Ahmed Mohamed Ali",
    studentsCount: 28,
    capacity: 30,
    roomAr: "فصل 101",
    roomEn: "Classroom 101",
    status: "نشط",
  },
  {
    id: 2,
    nameAr: "الصف الثاني الابتدائي - أ",
    nameEn: "Grade 2 Primary - A",
    code: "CLS-002",
    stageAr: "المرحلة الابتدائية",
    stageEn: "Primary Stage",
    gradeAr: "الصف الثاني الابتدائي",
    gradeEn: "Grade 2 Primary",
    teacherAr: "سارة محمود حسن",
    teacherEn: "Sara Mahmoud Hassan",
    studentsCount: 26,
    capacity: 30,
    roomAr: "فصل 102",
    roomEn: "Classroom 102",
    status: "نشط",
  },
  {
    id: 3,
    nameAr: "الصف الثالث الابتدائي - ب",
    nameEn: "Grade 3 Primary - B",
    code: "CLS-003",
    stageAr: "المرحلة الابتدائية",
    stageEn: "Primary Stage",
    gradeAr: "الصف الثالث الابتدائي",
    gradeEn: "Grade 3 Primary",
    teacherAr: "محمد خالد إبراهيم",
    teacherEn: "Mohamed Khaled Ibrahim",
    studentsCount: 29,
    capacity: 30,
    roomAr: "فصل 103",
    roomEn: "Classroom 103",
    status: "نشط",
  },
  {
    id: 4,
    nameAr: "الصف الأول الإعدادي - أ",
    nameEn: "Grade 1 Preparatory - A",
    code: "CLS-004",
    stageAr: "المرحلة الإعدادية",
    stageEn: "Preparatory Stage",
    gradeAr: "الصف الأول الإعدادي",
    gradeEn: "Grade 1 Preparatory",
    teacherAr: "مريم أحمد علي",
    teacherEn: "Mariam Ahmed Ali",
    studentsCount: 31,
    capacity: 35,
    roomAr: "فصل 201",
    roomEn: "Classroom 201",
    status: "نشط",
  },
  {
    id: 5,
    nameAr: "الصف الثاني الإعدادي - أ",
    nameEn: "Grade 2 Preparatory - A",
    code: "CLS-005",
    stageAr: "المرحلة الإعدادية",
    stageEn: "Preparatory Stage",
    gradeAr: "الصف الثاني الإعدادي",
    gradeEn: "Grade 2 Preparatory",
    teacherAr: "يوسف حسن محمود",
    teacherEn: "Youssef Hassan Mahmoud",
    studentsCount: 27,
    capacity: 35,
    roomAr: "فصل 202",
    roomEn: "Classroom 202",
    status: "غير نشط",
  },
  {
    id: 6,
    nameAr: "الصف الأول الثانوي - أ",
    nameEn: "Grade 1 Secondary - A",
    code: "CLS-006",
    stageAr: "المرحلة الثانوية",
    stageEn: "Secondary Stage",
    gradeAr: "الصف الأول الثانوي",
    gradeEn: "Grade 1 Secondary",
    teacherAr: "أحمد محمد علي",
    teacherEn: "Ahmed Mohamed Ali",
    studentsCount: 32,
    capacity: 35,
    roomAr: "فصل 301",
    roomEn: "Classroom 301",
    status: "نشط",
  },
];

export default function ClassesPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const t = (ar: string, en: string) => (isArabic ? ar : en);

  const [classes, setClasses] = useState<ClassRoom[]>(initialClasses);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("الكل");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassRoom | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassRoom | null>(null);

  const [form, setForm] = useState({
    nameAr: "",
    nameEn: "",
    stage: "المرحلة الابتدائية",
    gradeAr: "",
    gradeEn: "",
    teacherAr: "",
    teacherEn: "",
    studentsCount: "0",
    capacity: "30",
    roomAr: "",
    roomEn: "",
    status: "نشط" as ClassRoom["status"],
  });

  const getName = (classRoom: ClassRoom) =>
    isArabic ? classRoom.nameAr : classRoom.nameEn;
  const getStage = (classRoom: ClassRoom) =>
    isArabic ? classRoom.stageAr : classRoom.stageEn;
  const getGrade = (classRoom: ClassRoom) =>
    isArabic ? classRoom.gradeAr : classRoom.gradeEn;
  const getTeacher = (classRoom: ClassRoom) =>
    isArabic ? classRoom.teacherAr : classRoom.teacherEn;
  const getRoom = (classRoom: ClassRoom) =>
    isArabic ? classRoom.roomAr : classRoom.roomEn;

  const getStageLabel = (stage: string) => {
    if (stage === "المرحلة الابتدائية")
      return t("المرحلة الابتدائية", "Primary Stage");
    if (stage === "المرحلة الإعدادية")
      return t("المرحلة الإعدادية", "Preparatory Stage");
    if (stage === "المرحلة الثانوية")
      return t("المرحلة الثانوية", "Secondary Stage");
    return stage;
  };

  const getStatusLabel = (status: ClassRoom["status"]) => {
    return status === "نشط" ? t("نشط", "Active") : t("غير نشط", "Inactive");
  };

  const filteredClasses = useMemo(() => {
    const searchText = search.toLowerCase().trim();
    return classes.filter((classRoom) => {
      const searchableText = [
        classRoom.nameAr,
        classRoom.nameEn,
        classRoom.code,
        classRoom.teacherAr,
        classRoom.teacherEn,
        classRoom.gradeAr,
        classRoom.gradeEn,
        classRoom.roomAr,
        classRoom.roomEn,
        classRoom.stageAr,
        classRoom.stageEn,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchText);
      const matchesStage =
        stageFilter === "الكل" || classRoom.stageAr === stageFilter;

      return matchesSearch && matchesStage;
    });
  }, [classes, search, stageFilter]);

  const totalClasses = classes.length;
  const activeClasses = classes.filter(
    (classRoom) => classRoom.status === "نشط",
  ).length;
  const totalStudents = classes.reduce(
    (total, classRoom) => total + classRoom.studentsCount,
    0,
  );
  const averageStudents =
    totalClasses > 0 ? Math.round(totalStudents / totalClasses) : 0;

  const resetForm = () => {
    setForm({
      nameAr: "",
      nameEn: "",
      stage: "المرحلة الابتدائية",
      gradeAr: "",
      gradeEn: "",
      teacherAr: "",
      teacherEn: "",
      studentsCount: "0",
      capacity: "30",
      roomAr: "",
      roomEn: "",
      status: "نشط",
    });
    setEditingClass(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (classRoom: ClassRoom) => {
    setEditingClass(classRoom);
    setForm({
      nameAr: classRoom.nameAr,
      nameEn: classRoom.nameEn,
      stage: classRoom.stageAr,
      gradeAr: classRoom.gradeAr,
      gradeEn: classRoom.gradeEn,
      teacherAr: classRoom.teacherAr,
      teacherEn: classRoom.teacherEn,
      studentsCount: String(classRoom.studentsCount),
      capacity: String(classRoom.capacity),
      roomAr: classRoom.roomAr,
      roomEn: classRoom.roomEn,
      status: classRoom.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nameAr.trim() || !form.nameEn.trim()) {
      alert(
        t(
          "من فضلك اكتب اسم الفصل بالعربية والإنجليزية",
          "Please enter the class name in both Arabic and English.",
        ),
      );
      return;
    }

    if (!form.gradeAr.trim() || !form.gradeEn.trim()) {
      alert(
        t(
          "من فضلك اكتب الصف الدراسي بالعربية والإنجليزية",
          "Please enter the grade in both Arabic and English.",
        ),
      );
      return;
    }

    if (editingClass) {
      setClasses((currentClasses) =>
        currentClasses.map((classRoom) =>
          classRoom.id === editingClass.id
            ? {
                ...classRoom,
                nameAr: form.nameAr,
                nameEn: form.nameEn,
                stageAr: form.stage,
                stageEn: getStageLabel(form.stage),
                gradeAr: form.gradeAr,
                gradeEn: form.gradeEn,
                teacherAr: form.teacherAr,
                teacherEn: form.teacherEn,
                studentsCount: Number(form.studentsCount),
                capacity: Number(form.capacity),
                roomAr: form.roomAr,
                roomEn: form.roomEn,
                status: form.status,
              }
            : classRoom,
        ),
      );
    } else {
      const newClass: ClassRoom = {
        id: Date.now(),
        nameAr: form.nameAr,
        nameEn: form.nameEn,
        code: `CLS-${String(classes.length + 1).padStart(3, "0")}`,
        stageAr: form.stage,
        stageEn: getStageLabel(form.stage),
        gradeAr: form.gradeAr,
        gradeEn: form.gradeEn,
        teacherAr: form.teacherAr,
        teacherEn: form.teacherEn,
        studentsCount: Number(form.studentsCount),
        capacity: Number(form.capacity),
        roomAr: form.roomAr,
        roomEn: form.roomEn,
        status: form.status,
      };
      setClasses((currentClasses) => [...currentClasses, newClass]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    const classRoom = classes.find((item) => item.id === id);
    if (!classRoom) return;

    const confirmed = window.confirm(
      t(
        `هل أنت متأكد من حذف الفصل "${classRoom.nameAr}"؟`,
        `Are you sure you want to delete the class "${classRoom.nameEn}"?`,
      ),
    );

    if (!confirmed) return;
    setClasses((currentClasses) =>
      currentClasses.filter((classRoom) => classRoom.id !== id),
    );
  };

  const openViewModal = (classRoom: ClassRoom) => {
    setSelectedClass(classRoom);
    setShowViewModal(true);
  };

  const getCapacityPercentage = (students: number, capacity: number) => {
    if (capacity === 0) return 0;
    return Math.min(100, Math.round((students / capacity) * 100));
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B192C] sm:text-3xl">
            {t("الفصول الدراسية", "Classes")}
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            {t(
              "إدارة الفصول الدراسية والطلاب والمعلمين",
              "Manage classes, students, and teachers",
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#142c49]"
        >
          <Plus className="h-5 w-5" />
          {t("إضافة فصل", "Add Class")}
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {t("إجمالي الفصول", "Total Classes")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#0B192C]">
                {totalClasses}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <School className="h-6 w-6 text-[#0B192C]" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {t("الفصول النشطة", "Active Classes")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeClasses}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {t("إجمالي الطلاب", "Total Students")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {totalStudents}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {t("متوسط الطلاب بالفصل", "Average Students per Class")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                {averageStudents}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <GraduationCap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px]">
          <div className="relative">
            <Search
              className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 ${isArabic ? "right-4" : "left-4"}`}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(
                "ابحث باسم الفصل أو الكود أو المعلم أو القاعة...",
                "Search by class name, code, teacher, or room...",
              )}
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white ${
                isArabic ? "pl-4 pr-12" : "pl-12 pr-4"
              }`}
            />
          </div>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">{t("كل المراحل", "All Stages")}</option>
            <option value="المرحلة الابتدائية">
              {t("المرحلة الابتدائية", "Primary Stage")}
            </option>
            <option value="المرحلة الإعدادية">
              {t("المرحلة الإعدادية", "Preparatory Stage")}
            </option>
            <option value="المرحلة الثانوية">
              {t("المرحلة الثانوية", "Secondary Stage")}
            </option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("الفصل", "Class")}
                </th>
                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("المرحلة والصف", "Stage & Grade")}
                </th>
                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("المعلم المسؤول", "Teacher")}
                </th>
                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("الطلاب", "Students")}
                </th>
                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("القاعة", "Room")}
                </th>
                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${isArabic ? "text-right" : "text-left"}`}
                >
                  {t("الحالة", "Status")}
                </th>
                <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                  {t("الإجراءات", "Actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((classRoom) => {
                const percentage = getCapacityPercentage(
                  classRoom.studentsCount,
                  classRoom.capacity,
                );

                return (
                  <tr
                    key={classRoom.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B192C] text-white">
                          <School className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0B192C]">
                            {getName(classRoom)}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {classRoom.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <div>
                        <p className="font-semibold text-[#0B192C]">
                          {getGrade(classRoom)}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {getStage(classRoom)}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                          <UserRound className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">
                          {getTeacher(classRoom) ||
                            t("غير محدد", "Not assigned")}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <div className="w-40">
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#0B192C]">
                            {classRoom.studentsCount} {t("طالب", "students")}
                          </span>
                          <span className="text-slate-400">
                            {classRoom.capacity}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              percentage >= 90
                                ? "bg-red-500"
                                : percentage >= 70
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <BookOpen className="h-4 w-4" />
                        {getRoom(classRoom) || t("غير محددة", "Not specified")}
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      {classRoom.status === "نشط" ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-600">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          {getStatusLabel(classRoom.status)}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-500">
                          <span className="h-2 w-2 rounded-full bg-red-500" />
                          {getStatusLabel(classRoom.status)}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openViewModal(classRoom)}
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                          title={t("عرض", "View")}
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(classRoom)}
                          className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                          title={t("تعديل", "Edit")}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(classRoom.id)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                          title={t("حذف", "Delete")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredClasses.length === 0 && (
          <div className="px-6 py-16 text-center">
            <School className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 font-semibold text-slate-500">
              {t("لا توجد فصول", "No classes found")}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {t(
                "جرّب تغيير البحث أو المرحلة الدراسية",
                "Try changing the search or school stage",
              )}
            </p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {filteredClasses.map((classRoom) => {
          const percentage = getCapacityPercentage(
            classRoom.studentsCount,
            classRoom.capacity,
          );

          return (
            <div
              key={classRoom.id}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B192C] text-white">
                    <School className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B192C]">
                      {getName(classRoom)}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {classRoom.code}
                    </p>
                  </div>
                </div>

                {classRoom.status === "نشط" ? (
                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                    {getStatusLabel(classRoom.status)}
                  </span>
                ) : (
                  <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                    {getStatusLabel(classRoom.status)}
                  </span>
                )}
              </div>

              <div className="mt-5 space-y-4 border-t border-slate-100 pt-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-[#0B192C]" />
                  <div>
                    <p className="text-xs text-slate-400">
                      {t("المرحلة والصف", "Stage & Grade")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B192C]">
                      {getGrade(classRoom)}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {getStage(classRoom)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <UserRound className="h-5 w-5 text-[#0B192C]" />
                  <div>
                    <p className="text-xs text-slate-400">
                      {t("المعلم المسؤول", "Teacher")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B192C]">
                      {getTeacher(classRoom) || t("غير محدد", "Not assigned")}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-[#0B192C]" />
                      <span className="text-sm font-semibold text-[#0B192C]">
                        {t("الطلاب", "Students")}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-500">
                      {classRoom.studentsCount} / {classRoom.capacity}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        percentage >= 90
                          ? "bg-red-500"
                          : percentage >= 70
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-[#0B192C]" />
                  <div>
                    <p className="text-xs text-slate-400">
                      {t("القاعة", "Room")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B192C]">
                      {getRoom(classRoom) || t("غير محددة", "Not specified")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => openViewModal(classRoom)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600"
                >
                  <Eye className="h-4 w-4" />
                  {t("عرض", "View")}
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(classRoom)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 py-3 text-sm font-semibold text-amber-600"
                >
                  <Pencil className="h-4 w-4" />
                  {t("تعديل", "Edit")}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(classRoom.id)}
                  className="flex items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredClasses.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <School className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 font-semibold text-slate-500">
              {t("لا توجد فصول", "No classes found")}
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div>
                <h2 className="text-xl font-bold text-[#0B192C]">
                  {editingClass
                    ? t("تعديل الفصل", "Edit Class")
                    : t("إضافة فصل جديد", "Add New Class")}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {t("أدخل بيانات الفصل الدراسي", "Enter class information")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    اسم الفصل (AR)
                  </label>
                  <input
                    type="text"
                    value={form.nameAr}
                    onChange={(e) =>
                      setForm({ ...form, nameAr: e.target.value })
                    }
                    placeholder="مثال: الصف الأول الابتدائي - أ"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Class Name (EN)
                  </label>
                  <input
                    type="text"
                    value={form.nameEn}
                    onChange={(e) =>
                      setForm({ ...form, nameEn: e.target.value })
                    }
                    placeholder="Example: Grade 1 Primary - A"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t("المرحلة الدراسية", "School Stage")}
                  </label>
                  <select
                    value={form.stage}
                    onChange={(e) =>
                      setForm({ ...form, stage: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  >
                    <option value="المرحلة الابتدائية">
                      المرحلة الابتدائية
                    </option>
                    <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
                    <option value="المرحلة الثانوية">المرحلة الثانوية</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t("حالة الفصل", "Status")}
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as ClassRoom["status"],
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  >
                    <option value="نشط">نشط</option>
                    <option value="غير نشط">غير نشط</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    الصف (AR)
                  </label>
                  <input
                    type="text"
                    value={form.gradeAr}
                    onChange={(e) =>
                      setForm({ ...form, gradeAr: e.target.value })
                    }
                    placeholder="مثال: الصف الأول الابتدائي"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Grade (EN)
                  </label>
                  <input
                    type="text"
                    value={form.gradeEn}
                    onChange={(e) =>
                      setForm({ ...form, gradeEn: e.target.value })
                    }
                    placeholder="Example: Grade 1 Primary"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    المعلم (AR)
                  </label>
                  <input
                    type="text"
                    value={form.teacherAr}
                    onChange={(e) =>
                      setForm({ ...form, teacherAr: e.target.value })
                    }
                    placeholder="اسم المعلم بالعربية"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Teacher (EN)
                  </label>
                  <input
                    type="text"
                    value={form.teacherEn}
                    onChange={(e) =>
                      setForm({ ...form, teacherEn: e.target.value })
                    }
                    placeholder="Teacher name in English"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    عدد الطلاب
                  </label>
                  <input
                    type="number"
                    value={form.studentsCount}
                    onChange={(e) =>
                      setForm({ ...form, studentsCount: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    السعة القصوى
                  </label>
                  <input
                    type="number"
                    value={form.capacity}
                    onChange={(e) =>
                      setForm({ ...form, capacity: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    القاعة (AR)
                  </label>
                  <input
                    type="text"
                    value={form.roomAr}
                    onChange={(e) =>
                      setForm({ ...form, roomAr: e.target.value })
                    }
                    placeholder="فصل 101"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Room (EN)
                  </label>
                  <input
                    type="text"
                    value={form.roomEn}
                    onChange={(e) =>
                      setForm({ ...form, roomEn: e.target.value })
                    }
                    placeholder="Classroom 101"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
                >
                  {t("إلغاء", "Cancel")}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0B192C] px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-[#142c49]"
                >
                  {editingClass
                    ? t("حفظ التعديلات", "Save Changes")
                    : t("إضافة الفصل", "Add Class")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-bold text-[#0B192C]">
                {getName(selectedClass)}
              </h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-slate-400">
                    {t("كود الفصل", "Class Code")}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {selectedClass.code}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">
                    {t("الحالة", "Status")}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {getStatusLabel(selectedClass.status)}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">
                    {t("المرحلة الدراسية", "Stage")}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {getStage(selectedClass)}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">
                    {t("الصف الدراسي", "Grade")}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {getGrade(selectedClass)}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">
                    {t("المعلم المسؤول", "Teacher")}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {getTeacher(selectedClass) || t("غير محدد", "Not assigned")}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">
                    {t("القاعة", "Room")}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {getRoom(selectedClass) || t("غير محددة", "Not specified")}
                  </span>
                </div>
              </div>

              <div>
                <span className="block text-xs text-slate-400">
                  {t("عدد الطلاب", "Students Count")}
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedClass.studentsCount} / {selectedClass.capacity} (
                  {t("السعة", "Capacity")})
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t pt-4">
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
              >
                {t("إغلاق", "Close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
