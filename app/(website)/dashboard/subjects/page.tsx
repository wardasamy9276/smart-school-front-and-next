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
  UserRound,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

interface Subject {
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

  teacherCode: string;

  weeklyHours: number;
  studentsCount: number;

  descriptionAr: string;
  descriptionEn: string;

  status: "نشطة" | "غير نشطة";
}

const initialSubjects: Subject[] = [
  {
    id: 1,
    nameAr: "اللغة العربية",
    nameEn: "Arabic Language",
    code: "SUB-001",
    stageAr: "المرحلة الابتدائية",
    stageEn: "Primary Stage",
    gradeAr: "الصف الأول الابتدائي",
    gradeEn: "Grade 1 Primary",
    teacherAr: "أحمد محمد علي",
    teacherEn: "Ahmed Mohamed Ali",
    teacherCode: "TCH-001",
    weeklyHours: 5,
    studentsCount: 84,
    descriptionAr:
      "مادة اللغة العربية وتشمل القراءة والكتابة والنحو والتعبير والمهارات اللغوية.",
    descriptionEn:
      "Arabic language course covering reading, writing, grammar, expression, and language skills.",
    status: "نشطة",
  },
  {
    id: 2,
    nameAr: "اللغة الإنجليزية",
    nameEn: "English Language",
    code: "SUB-002",
    stageAr: "المرحلة الابتدائية",
    stageEn: "Primary Stage",
    gradeAr: "الصف الثاني الابتدائي",
    gradeEn: "Grade 2 Primary",
    teacherAr: "سارة محمود حسن",
    teacherEn: "Sara Mahmoud Hassan",
    teacherCode: "TCH-002",
    weeklyHours: 4,
    studentsCount: 78,
    descriptionAr:
      "تعليم أساسيات اللغة الإنجليزية وتنمية مهارات الاستماع والتحدث والقراءة والكتابة.",
    descriptionEn:
      "Teaching English language basics and developing listening, speaking, reading, and writing skills.",
    status: "نشطة",
  },
  {
    id: 3,
    nameAr: "الرياضيات",
    nameEn: "Mathematics",
    code: "SUB-003",
    stageAr: "المرحلة الابتدائية",
    stageEn: "Primary Stage",
    gradeAr: "الصف الثالث الابتدائي",
    gradeEn: "Grade 3 Primary",
    teacherAr: "محمد خالد إبراهيم",
    teacherEn: "Mohamed Khaled Ibrahim",
    teacherCode: "TCH-003",
    weeklyHours: 5,
    studentsCount: 91,
    descriptionAr:
      "تعليم العمليات الحسابية والمفاهيم الرياضية وتنمية مهارات التفكير وحل المشكلات.",
    descriptionEn:
      "Teaching arithmetic operations and mathematical concepts while developing thinking and problem-solving skills.",
    status: "نشطة",
  },
  {
    id: 4,
    nameAr: "العلوم",
    nameEn: "Science",
    code: "SUB-004",
    stageAr: "المرحلة الإعدادية",
    stageEn: "Preparatory Stage",
    gradeAr: "الصف الأول الإعدادي",
    gradeEn: "Grade 1 Preparatory",
    teacherAr: "مريم أحمد علي",
    teacherEn: "Mariam Ahmed Ali",
    teacherCode: "TCH-004",
    weeklyHours: 3,
    studentsCount: 72,
    descriptionAr:
      "دراسة أساسيات العلوم والطبيعة والإنسان والبيئة والتجارب العلمية.",
    descriptionEn:
      "Studying the basics of science, nature, humans, the environment, and scientific experiments.",
    status: "نشطة",
  },
  {
    id: 5,
    nameAr: "الدراسات الاجتماعية",
    nameEn: "Social Studies",
    code: "SUB-005",
    stageAr: "المرحلة الإعدادية",
    stageEn: "Preparatory Stage",
    gradeAr: "الصف الثاني الإعدادي",
    gradeEn: "Grade 2 Preparatory",
    teacherAr: "يوسف حسن محمود",
    teacherEn: "Youssef Hassan Mahmoud",
    teacherCode: "TCH-005",
    weeklyHours: 3,
    studentsCount: 65,
    descriptionAr:
      "دراسة التاريخ والجغرافيا والمجتمع وتنمية الوعي بالمكان والزمان والأحداث.",
    descriptionEn:
      "Studying history, geography, and society while developing awareness of places, time, and events.",
    status: "غير نشطة",
  },
  {
    id: 6,
    nameAr: "الفيزياء",
    nameEn: "Physics",
    code: "SUB-006",
    stageAr: "المرحلة الثانوية",
    stageEn: "Secondary Stage",
    gradeAr: "الصف الأول الثانوي",
    gradeEn: "Grade 1 Secondary",
    teacherAr: "أحمد محمد علي",
    teacherEn: "Ahmed Mohamed Ali",
    teacherCode: "TCH-001",
    weeklyHours: 4,
    studentsCount: 58,
    descriptionAr:
      "دراسة المبادئ الأساسية للفيزياء والحركة والقوة والطاقة والظواهر الطبيعية.",
    descriptionEn:
      "Studying the basic principles of physics, motion, force, energy, and natural phenomena.",
    status: "نشطة",
  },
  {
    id: 7,
    nameAr: "الكيمياء",
    nameEn: "Chemistry",
    code: "SUB-007",
    stageAr: "المرحلة الثانوية",
    stageEn: "Secondary Stage",
    gradeAr: "الصف الأول الثانوي",
    gradeEn: "Grade 1 Secondary",
    teacherAr: "مريم أحمد علي",
    teacherEn: "Mariam Ahmed Ali",
    teacherCode: "TCH-004",
    weeklyHours: 4,
    studentsCount: 58,
    descriptionAr:
      "دراسة المادة والتفاعلات الكيميائية والعناصر والمركبات والتجارب المعملية.",
    descriptionEn:
      "Studying matter, chemical reactions, elements, compounds, and laboratory experiments.",
    status: "نشطة",
  },
  {
    id: 8,
    nameAr: "الحاسب الآلي",
    nameEn: "Computer Science",
    code: "SUB-008",
    stageAr: "المرحلة الثانوية",
    stageEn: "Secondary Stage",
    gradeAr: "الصف الأول الثانوي",
    gradeEn: "Grade 1 Secondary",
    teacherAr: "محمد خالد إبراهيم",
    teacherEn: "Mohamed Khaled Ibrahim",
    teacherCode: "TCH-003",
    weeklyHours: 2,
    studentsCount: 58,
    descriptionAr:
      "تعليم أساسيات الحاسب والبرمجة والتكنولوجيا والمهارات الرقمية.",
    descriptionEn:
      "Teaching computer basics, programming, technology, and digital skills.",
    status: "نشطة",
  },
];

export default function SubjectsPage() {
  const { language } = useLanguage();

  const isArabic = language === "ar";

  const t = (ar: string, en: string) => (isArabic ? ar : en);

  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] = useState("الكل");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    code: "",
    stage: "المرحلة الابتدائية",
    gradeAr: "",
    gradeEn: "",
    teacherAr: "",
    teacherEn: "",
    teacherCode: "",
    weeklyHours: 3,
    studentsCount: 0,
    descriptionAr: "",
    descriptionEn: "",
    status: "نشطة" as "نشطة" | "غير نشطة",
  });

  const getName = (subject: Subject) =>
    isArabic ? subject.nameAr : subject.nameEn;

  const getStage = (subject: Subject) =>
    isArabic ? subject.stageAr : subject.stageEn;

  const getGrade = (subject: Subject) =>
    isArabic ? subject.gradeAr : subject.gradeEn;

  const getTeacher = (subject: Subject) =>
    isArabic ? subject.teacherAr : subject.teacherEn;

  const getDescription = (subject: Subject) =>
    isArabic ? subject.descriptionAr : subject.descriptionEn;

  const getStageLabel = (stage: string) => {
    if (stage === "المرحلة الابتدائية") {
      return t("المرحلة الابتدائية", "Primary Stage");
    }

    if (stage === "المرحلة الإعدادية") {
      return t("المرحلة الإعدادية", "Preparatory Stage");
    }

    if (stage === "المرحلة الثانوية") {
      return t("المرحلة الثانوية", "Secondary Stage");
    }

    return stage;
  };

  const getStatusLabel = (status: Subject["status"]) =>
    status === "نشطة" ? t("نشطة", "Active") : t("غير نشطة", "Inactive");

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const searchValue = search.toLowerCase().trim();

      const searchableText = [
        subject.nameAr,
        subject.nameEn,
        subject.code,
        subject.teacherAr,
        subject.teacherEn,
        subject.gradeAr,
        subject.gradeEn,
        subject.stageAr,
        subject.stageEn,
        subject.teacherCode,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchValue);

      const matchesStage =
        stageFilter === "الكل" || subject.stageAr === stageFilter;

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
      nameAr: "",
      nameEn: "",
      code: `SUB-${String(subjects.length + 1).padStart(3, "0")}`,
      stage: "المرحلة الابتدائية",
      gradeAr: "",
      gradeEn: "",
      teacherAr: "",
      teacherEn: "",
      teacherCode: "",
      weeklyHours: 3,
      studentsCount: 0,
      descriptionAr: "",
      descriptionEn: "",
      status: "نشطة",
    });

    setShowModal(true);
  };

  const openEditModal = (subject: Subject) => {
    setEditingSubject(subject);

    setFormData({
      nameAr: subject.nameAr,
      nameEn: subject.nameEn,
      code: subject.code,
      stage: subject.stageAr,
      gradeAr: subject.gradeAr,
      gradeEn: subject.gradeEn,
      teacherAr: subject.teacherAr,
      teacherEn: subject.teacherEn,
      teacherCode: subject.teacherCode,
      weeklyHours: subject.weeklyHours,
      studentsCount: subject.studentsCount,
      descriptionAr: subject.descriptionAr,
      descriptionEn: subject.descriptionEn,
      status: subject.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameAr.trim() || !formData.nameEn.trim()) {
      alert(
        t(
          "من فضلك اكتب اسم المادة بالعربية والإنجليزية",
          "Please enter the subject name in both Arabic and English.",
        ),
      );
      return;
    }

    if (!formData.gradeAr.trim() || !formData.gradeEn.trim()) {
      alert(
        t(
          "من فضلك اكتب الصف الدراسي بالعربية والإنجليزية",
          "Please enter the grade in both Arabic and English.",
        ),
      );
      return;
    }

    if (!formData.teacherAr.trim() || !formData.teacherEn.trim()) {
      alert(
        t(
          "من فضلك اكتب اسم المدرس بالعربية والإنجليزية",
          "Please enter the teacher name in both Arabic and English.",
        ),
      );
      return;
    }

    if (editingSubject) {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === editingSubject.id
            ? {
                ...subject,

                nameAr: formData.nameAr,
                nameEn: formData.nameEn,

                code: formData.code,

                stageAr: formData.stage,
                stageEn: getStageLabel(formData.stage),

                gradeAr: formData.gradeAr,
                gradeEn: formData.gradeEn,

                teacherAr: formData.teacherAr,
                teacherEn: formData.teacherEn,

                teacherCode: formData.teacherCode,

                weeklyHours: formData.weeklyHours,
                studentsCount: formData.studentsCount,

                descriptionAr: formData.descriptionAr,
                descriptionEn: formData.descriptionEn,

                status: formData.status,
              }
            : subject,
        ),
      );
    } else {
      const newSubject: Subject = {
        id: Date.now(),

        nameAr: formData.nameAr,
        nameEn: formData.nameEn,

        code: formData.code,

        stageAr: formData.stage,
        stageEn: getStageLabel(formData.stage),

        gradeAr: formData.gradeAr,
        gradeEn: formData.gradeEn,

        teacherAr: formData.teacherAr,
        teacherEn: formData.teacherEn,

        teacherCode: formData.teacherCode,

        weeklyHours: formData.weeklyHours,
        studentsCount: formData.studentsCount,

        descriptionAr: formData.descriptionAr,
        descriptionEn: formData.descriptionEn,

        status: formData.status,
      };

      setSubjects((prev) => [...prev, newSubject]);
    }

    setShowModal(false);
    setEditingSubject(null);
  };

  const handleDelete = (id: number) => {
    const subject = subjects.find((item) => item.id === id);

    if (!subject) return;

    const confirmed = window.confirm(
      t(
        `هل أنت متأكد من حذف مادة "${subject.nameAr}"؟`,
        `Are you sure you want to delete the subject "${subject.nameEn}"?`,
      ),
    );

    if (!confirmed) return;

    setSubjects((prev) => prev.filter((item) => item.id !== id));
  };

  const openViewModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowViewModal(true);
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B192C] text-white shadow-lg">
              <BookOpen size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {t("المواد الدراسية", "Subjects")}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {t(
                  "إدارة المواد الدراسية والمناهج والمدرسين",
                  "Manage subjects, curriculum, and teachers",
                )}
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
          {t("إضافة مادة جديدة", "Add New Subject")}
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {t("إجمالي المواد", "Total Subjects")}
              </p>

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
              <p className="text-sm text-slate-500">
                {t("مواد نشطة", "Active Subjects")}
              </p>

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
              <p className="text-sm text-slate-500">
                {t("مواد غير نشطة", "Inactive Subjects")}
              </p>

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
              <p className="text-sm text-slate-500">
                {t("إجمالي الحصص أسبوعيًا", "Total Weekly Lessons")}
              </p>

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
          <div className="relative">
            <Search
              size={20}
              className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${
                isArabic ? "right-4" : "left-4"
              }`}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(
                "ابحث باسم المادة أو الكود أو المدرس...",
                "Search by subject, code, or teacher...",
              )}
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10 ${
                isArabic ? "pr-11 pl-4" : "pl-11 pr-4"
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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">{t("كل الحالات", "All Statuses")}</option>

            <option value="نشطة">{t("نشطة", "Active")}</option>

            <option value="غير نشطة">{t("غير نشطة", "Inactive")}</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {[
                  ["المادة", "Subject"],
                  ["المرحلة", "Stage"],
                  ["الصف", "Grade"],
                  ["المدرس", "Teacher"],
                  ["الحصص", "Lessons"],
                  ["الطلاب", "Students"],
                  ["الحالة", "Status"],
                ].map(([ar, en]) => (
                  <th
                    key={ar}
                    className={`px-5 py-4 text-sm font-bold text-slate-700 ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {t(ar, en)}
                  </th>
                ))}

                <th className="px-5 py-4 text-center text-sm font-bold text-slate-700">
                  {t("الإجراءات", "Actions")}
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
                            {getName(subject)}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {subject.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {getStage(subject)}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {getGrade(subject)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                          <UserRound size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {getTeacher(subject)}
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
                        {subject.weeklyHours} {t("حصص", "lessons")}
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
                        {getStatusLabel(subject.status)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openViewModal(subject)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          title={t("عرض", "View")}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(subject)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                          title={t("تعديل", "Edit")}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(subject.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                          title={t("حذف", "Delete")}
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
                    {t(
                      "لا توجد مواد مطابقة للبحث.",
                      "No subjects match your search.",
                    )}
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
                    <h3 className="font-bold text-slate-900">
                      {getName(subject)}
                    </h3>

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
                  {getStatusLabel(subject.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">
                    {t("المرحلة", "Stage")}
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {getStage(subject)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">
                    {t("الصف", "Grade")}
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {getGrade(subject)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">
                    {t("المدرس", "Teacher")}
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {getTeacher(subject)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">
                    {t("عدد الحصص", "Lessons")}
                  </p>

                  <p className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                    <Clock3 size={15} />
                    {subject.weeklyHours}{" "}
                    {t("حصص أسبوعيًا", "lessons per week")}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="mb-1 text-xs text-slate-400">
                    {t("عدد الطلاب", "Students")}
                  </p>

                  <p className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                    <Users size={15} />
                    {subject.studentsCount} {t("طالب", "students")}
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
                  {t("عرض", "View")}
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(subject)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 py-2.5 text-sm font-semibold text-amber-600"
                >
                  <Pencil size={17} />
                  {t("تعديل", "Edit")}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(subject.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600"
                  title={t("حذف", "Delete")}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-500 shadow-sm">
            {t("لا توجد مواد مطابقة للبحث.", "No subjects match your search.")}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingSubject
                    ? t("تعديل المادة", "Edit Subject")
                    : t("إضافة مادة جديدة", "Add New Subject")}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {t(
                    "أدخل بيانات المادة الدراسية",
                    "Enter subject information",
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                title={t("إغلاق", "Close")}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Arabic Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("اسم المادة بالعربية", "Subject Name in Arabic")} *
                  </label>

                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nameAr: e.target.value,
                      })
                    }
                    placeholder="مثال: الرياضيات"
                    dir="rtl"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                    required
                  />
                </div>

                {/* English Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("اسم المادة بالإنجليزية", "Subject Name in English")} *
                  </label>

                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nameEn: e.target.value,
                      })
                    }
                    placeholder="Example: Mathematics"
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                    required
                  />
                </div>

                {/* Code */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("كود المادة", "Subject Code")}
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
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Stage */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("المرحلة الدراسية", "School Stage")}
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

                {/* Arabic Grade */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("الصف الدراسي بالعربية", "Grade in Arabic")} *
                  </label>

                  <input
                    type="text"
                    value={formData.gradeAr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gradeAr: e.target.value,
                      })
                    }
                    placeholder="مثال: الصف الثالث الابتدائي"
                    dir="rtl"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                    required
                  />
                </div>

                {/* English Grade */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("الصف الدراسي بالإنجليزية", "Grade in English")} *
                  </label>

                  <input
                    type="text"
                    value={formData.gradeEn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gradeEn: e.target.value,
                      })
                    }
                    placeholder="Example: Grade 3 Primary"
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                    required
                  />
                </div>

                {/* Arabic Teacher */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("اسم المدرس بالعربية", "Teacher Name in Arabic")} *
                  </label>

                  <input
                    type="text"
                    value={formData.teacherAr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teacherAr: e.target.value,
                      })
                    }
                    placeholder="مثال: أحمد محمد علي"
                    dir="rtl"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                    required
                  />
                </div>

                {/* English Teacher */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("اسم المدرس بالإنجليزية", "Teacher Name in English")} *
                  </label>

                  <input
                    type="text"
                    value={formData.teacherEn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teacherEn: e.target.value,
                      })
                    }
                    placeholder="Example: Ahmed Mohamed Ali"
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                    required
                  />
                </div>

                {/* Teacher Code */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("كود المدرس", "Teacher Code")}
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
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Weekly Hours */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("عدد الحصص أسبوعيًا", "Weekly Lessons")}
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
                    {t("عدد الطلاب", "Number of Students")}
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
                    {t("حالة المادة", "Subject Status")}
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
                    <option value="نشطة">{t("نشطة", "Active")}</option>

                    <option value="غير نشطة">
                      {t("غير نشطة", "Inactive")}
                    </option>
                  </select>
                </div>

                {/* Arabic Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("وصف المادة بالعربية", "Subject Description in Arabic")}
                  </label>

                  <textarea
                    value={formData.descriptionAr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionAr: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="اكتب وصفًا مختصرًا للمادة..."
                    dir="rtl"
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* English Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t(
                      "وصف المادة بالإنجليزية",
                      "Subject Description in English",
                    )}
                  </label>

                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionEn: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Write a short description of the subject..."
                    dir="ltr"
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 font-semibold text-white transition hover:bg-[#132742]"
                >
                  <Plus size={19} />

                  {editingSubject
                    ? t("حفظ التعديلات", "Save Changes")
                    : t("إضافة المادة", "Add Subject")}
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  {t("إلغاء", "Cancel")}
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
                    {getName(selectedSubject)}
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
                title={t("إغلاق", "Close")}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {t("المرحلة", "Stage")}
                  </p>

                  <p className="mt-2 font-bold text-slate-800">
                    {getStage(selectedSubject)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {t("الصف الدراسي", "Grade")}
                  </p>

                  <p className="mt-2 font-bold text-slate-800">
                    {getGrade(selectedSubject)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {t("المدرس", "Teacher")}
                  </p>

                  <p className="mt-2 flex items-center gap-2 font-bold text-slate-800">
                    <UserRound size={17} />

                    {getTeacher(selectedSubject)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {t("كود المدرس", "Teacher Code")}
                  </p>

                  <p className="mt-2 font-bold text-slate-800">
                    {selectedSubject.teacherCode}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {t("الحصص الأسبوعية", "Weekly Lessons")}
                  </p>

                  <p className="mt-2 flex items-center gap-2 font-bold text-slate-800">
                    <Clock3 size={17} />
                    {selectedSubject.weeklyHours} {t("حصص", "lessons")}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {t("عدد الطلاب", "Number of Students")}
                  </p>

                  <p className="mt-2 flex items-center gap-2 font-bold text-slate-800">
                    <Users size={17} />
                    {selectedSubject.studentsCount} {t("طالب", "students")}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs text-slate-400">
                    {t("الحالة", "Status")}
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      selectedSubject.status === "نشطة"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {getStatusLabel(selectedSubject.status)}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs text-slate-400">
                    {t("الوصف", "Description")}
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {getDescription(selectedSubject) ||
                      t("لا يوجد وصف للمادة.", "No description available.")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="mt-6 w-full rounded-xl bg-[#0B192C] px-5 py-3 font-semibold text-white"
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
