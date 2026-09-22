"use client";

import { useEffect, useMemo, useState } from "react";
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
  BriefcaseBusiness,
  Filter,
  UserRound,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const API_URL = "http://localhost:8000/api";

interface Subject {
  id: number;
  name: string;
  code: string;
}

interface ApiTeacher {
  id: number;
  name: string;
  code: string;
  email: string | null;
  phone: string | null;
  subject_id: number | null;
  experience: string | null;
  gender: "Male" | "Female";
  status: "Active" | "Inactive";
  subject: Subject | null;
}

interface Teacher {
  id: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  subject: string;
  subject_id: number | null;
  experience: string;
  gender: "Male" | "Female";
  status: "Active" | "Inactive";
}

interface ApiResponse {
  success: boolean;
  data: ApiTeacher[];
}

interface SubjectsResponse {
  success: boolean;
  data: Subject[];
}

const subjectTranslations: Record<string, string> = {
  "اللغة العربية": "Arabic Language",
  "اللغة الإنجليزية": "English Language",
  الرياضيات: "Mathematics",
  العلوم: "Science",
  "الدراسات الاجتماعية": "Social Studies",
  الفيزياء: "Physics",
  الكيمياء: "Chemistry",
  "الحاسب الآلي": "Computer Science",

  "Arabic Language": "Arabic Language",
  "English Language": "English Language",
  Mathematics: "Mathematics",
  Science: "Science",
  "Social Studies": "Social Studies",
  Physics: "Physics",
  Chemistry: "Chemistry",
  "Computer Science": "Computer Science",
};

export default function TeachersPage() {
  const { language } = useLanguage();

  const isArabic = language === "ar";

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subjectsLoading, setSubjectsLoading] = useState(true);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    subject_id: 0,
    experience: "",
    gender: "Male" as "Male" | "Female",
  });

  const t = {
    title: isArabic ? "المدرسون" : "Teachers",

    subtitle: isArabic
      ? "إدارة المدرسين والمواد الدراسية"
      : "Manage teachers and subjects",

    addTeacher: isArabic ? "إضافة مدرس" : "Add Teacher",

    addNewTeacher: isArabic ? "إضافة مدرس جديد" : "Add New Teacher",

    teacherInfo: isArabic ? "أدخل بيانات المدرس" : "Enter teacher information",

    totalTeachers: isArabic ? "إجمالي المدرسين" : "Total Teachers",

    activeTeachers: isArabic ? "المدرسون النشطون" : "Active Teachers",

    inactiveTeachers: isArabic ? "المدرسون غير النشطين" : "Inactive Teachers",

    femaleTeachers: isArabic ? "المدرسات" : "Female Teachers",

    searchPlaceholder: isArabic
      ? "ابحث باسم المدرس أو الكود أو المادة..."
      : "Search by teacher name, code, or subject...",

    allSubjects: isArabic ? "كل المواد" : "All Subjects",

    chooseSubject: isArabic ? "اختر المادة الدراسية" : "Select Subject",

    noSubjects: isArabic ? "لا توجد مواد دراسية" : "No subjects available",

    addSubjectFirst: isArabic
      ? "يجب إضافة مادة دراسية أولًا"
      : "You need to add a subject first",

    subjectsLoading: isArabic ? "جاري تحميل المواد..." : "Loading subjects...",

    teachersList: isArabic ? "قائمة المدرسين" : "Teachers List",

    results: isArabic ? "النتائج" : "Results",

    teacher: isArabic ? "المدرس" : "Teacher",

    code: isArabic ? "الكود" : "Code",

    subject: isArabic ? "المادة" : "Subject",

    experience: isArabic ? "الخبرة" : "Experience",

    phone: isArabic ? "الهاتف" : "Phone",

    status: isArabic ? "الحالة" : "Status",

    actions: isArabic ? "الإجراءات" : "Actions",

    active: isArabic ? "نشط" : "Active",

    inactive: isArabic ? "غير نشط" : "Inactive",

    view: isArabic ? "عرض" : "View",

    edit: isArabic ? "تعديل" : "Edit",

    delete: isArabic ? "حذف" : "Delete",

    noTeachers: isArabic ? "لا يوجد مدرسون" : "No teachers found",

    changeSearch: isArabic
      ? "حاول تغيير البحث أو المادة المحددة"
      : "Try changing the search or selected subject",

    loading: isArabic
      ? "جاري تحميل بيانات المدرسين..."
      : "Loading teacher data...",

    teacherName: isArabic ? "اسم المدرس" : "Teacher Name",

    enterTeacherName: isArabic ? "أدخل اسم المدرس" : "Enter teacher name",

    email: isArabic ? "البريد الإلكتروني" : "Email Address",

    phoneNumber: isArabic ? "رقم الهاتف" : "Phone Number",

    subjectLabel: isArabic ? "المادة الدراسية" : "Subject",

    yearsExperience: isArabic ? "سنوات الخبرة" : "Years of Experience",

    gender: isArabic ? "النوع" : "Gender",

    male: isArabic ? "ذكر" : "Male",

    female: isArabic ? "أنثى" : "Female",

    cancel: isArabic ? "إلغاء" : "Cancel",

    adding: isArabic ? "جاري الإضافة..." : "Adding...",

    save: isArabic ? "إضافة المدرس" : "Add Teacher",

    loadError: isArabic
      ? "حدث خطأ أثناء تحميل بيانات المدرسين"
      : "An error occurred while loading teacher data",

    subjectsError: isArabic
      ? "حدث خطأ أثناء تحميل المواد الدراسية"
      : "An error occurred while loading subjects",

    addError: isArabic
      ? "حدث خطأ أثناء إضافة المدرس"
      : "An error occurred while adding the teacher",

    deleteError: isArabic
      ? "حدث خطأ أثناء حذف المدرس"
      : "An error occurred while deleting the teacher",

    connectionError: isArabic
      ? "تعذر الاتصال بالخادم"
      : "Unable to connect to the server",

    enterName: isArabic
      ? "من فضلك أدخل اسم المدرس"
      : "Please enter the teacher name",

    selectSubject: isArabic
      ? "من فضلك اختر المادة الدراسية"
      : "Please select a subject",

    deleteConfirm: isArabic
      ? "هل أنت متأكد من حذف هذا المدرس؟"
      : "Are you sure you want to delete this teacher?",

    noData: "—",

    yearsExample: isArabic ? "مثال: 5 سنوات" : "Example: 5 years",

    allTeachers: isArabic ? "جميع المدرسين" : "All teachers",

    currentlyActive: isArabic ? "حالة نشطة" : "Currently active",

    currentlyInactive: isArabic ? "حالة غير نشطة" : "Currently inactive",

    femaleStaff: isArabic ? "عدد المدرسات" : "Female staff",

    searchFilter: isArabic ? "البحث والتصفية" : "Search & Filter",

    searchFilterDescription: isArabic
      ? "ابحث عن مدرس أو قم بتصفية النتائج حسب المادة"
      : "Search teachers or filter results by subject",
  };

  const getSubjectName = (name: string) => {
    if (!name) return "—";

    if (isArabic) {
      return name;
    }

    return subjectTranslations[name] || name;
  };

  const mapTeacher = (teacher: ApiTeacher): Teacher => ({
    id: teacher.id,
    name: teacher.name,
    code: teacher.code,
    email: teacher.email || "",
    phone: teacher.phone || "",
    subject: teacher.subject?.name || "—",
    subject_id: teacher.subject_id,
    experience: teacher.experience || "",
    gender: teacher.gender,
    status: teacher.status,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setSubjectsLoading(true);

        const [teachersResponse, subjectsResponse] = await Promise.all([
          fetch(`${API_URL}/teachers`, {
            headers: {
              Accept: "application/json",
            },
          }),

          fetch(`${API_URL}/subjects`, {
            headers: {
              Accept: "application/json",
            },
          }),
        ]);

        if (!teachersResponse.ok) {
          throw new Error("Failed to load teachers");
        }

        if (!subjectsResponse.ok) {
          throw new Error("Failed to load subjects");
        }

        const teachersResult: ApiResponse = await teachersResponse.json();

        const subjectsResult: SubjectsResponse = await subjectsResponse.json();

        if (!teachersResult.success) {
          throw new Error("Teachers API error");
        }

        if (!subjectsResult.success) {
          throw new Error("Subjects API error");
        }

        const loadedSubjects = Array.isArray(subjectsResult.data)
          ? subjectsResult.data
          : [];

        setTeachers(
          Array.isArray(teachersResult.data)
            ? teachersResult.data.map(mapTeacher)
            : [],
        );

        setSubjects(loadedSubjects);

        if (loadedSubjects.length > 0) {
          setNewTeacher((prev) => ({
            ...prev,
            subject_id: loadedSubjects[0].id,
          }));
        } else {
          setNewTeacher((prev) => ({
            ...prev,
            subject_id: 0,
          }));
        }
      } catch (error) {
        console.error(error);

        alert(
          isArabic
            ? "حدث خطأ أثناء تحميل البيانات"
            : "An error occurred while loading data",
        );
      } finally {
        setLoading(false);
        setSubjectsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const searchValue = search.toLowerCase().trim();

      const translatedSubject = getSubjectName(teacher.subject);

      const matchesSearch =
        teacher.name.toLowerCase().includes(searchValue) ||
        teacher.code.toLowerCase().includes(searchValue) ||
        teacher.email.toLowerCase().includes(searchValue) ||
        teacher.subject.toLowerCase().includes(searchValue) ||
        translatedSubject.toLowerCase().includes(searchValue);

      const matchesSubject =
        selectedSubject === "All" || teacher.subject === selectedSubject;

      return matchesSearch && matchesSubject;
    });
  }, [teachers, search, selectedSubject, language]);

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active",
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "Inactive",
  ).length;

  const femaleTeachers = teachers.filter(
    (teacher) => teacher.gender === "Female",
  ).length;

  const handleAddTeacher = async () => {
    if (!newTeacher.name.trim()) {
      alert(t.enterName);
      return;
    }

    if (!newTeacher.subject_id) {
      alert(t.selectSubject);
      return;
    }

    if (subjects.length === 0) {
      alert(t.addSubjectFirst);
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/teachers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: newTeacher.name,
          code: `TCH-${Date.now()}`,
          email: newTeacher.email || null,
          phone: newTeacher.phone || null,
          subject_id: newTeacher.subject_id,
          experience: newTeacher.experience || null,
          gender: newTeacher.gender,
          status: "Active",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result);

        alert(result?.message || t.addError);

        return;
      }

      if (!result.data) {
        alert(t.addError);
        return;
      }

      const addedTeacher = mapTeacher(result.data);

      setTeachers((prev) => [...prev, addedTeacher]);

      setNewTeacher({
        name: "",
        email: "",
        phone: "",
        subject_id: subjects.length > 0 ? subjects[0].id : 0,
        experience: "",
        gender: "Male",
      });

      setShowAddModal(false);
    } catch (error) {
      console.error(error);
      alert(t.connectionError);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeacher = async (id: number) => {
    const confirmed = window.confirm(t.deleteConfirm);

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/teachers/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
        alert(t.deleteError);
        return;
      }

      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error(error);
      alert(t.connectionError);
    }
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <div className="mb-7 overflow-hidden rounded-3xl bg-[#0B192C] p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <GraduationCap className="h-8 w-8" />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-slate-300">
                Smart Schools
              </p>

              <h1 className="text-2xl font-bold sm:text-3xl">{t.title}</h1>

              <p className="mt-1 text-sm text-slate-300">{t.subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-bold text-[#0B192C] shadow-lg transition hover:bg-slate-100"
          >
            <Plus className="h-5 w-5" />
            {t.addTeacher}
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="group rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                {t.totalTeachers}
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-800">
                {teachers.length}
              </h2>

              <p className="mt-1 text-xs text-slate-400">{t.allTeachers}</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-110">
              <Users className="h-7 w-7" />
            </div>
          </div>
        </div>

        <div className="group rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                {t.activeTeachers}
              </p>

              <h2 className="mt-2 text-3xl font-black text-green-600">
                {activeTeachers}
              </h2>

              <p className="mt-1 text-xs text-slate-400">{t.currentlyActive}</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition group-hover:scale-110">
              <UserCheck className="h-7 w-7" />
            </div>
          </div>
        </div>

        <div className="group rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                {t.inactiveTeachers}
              </p>

              <h2 className="mt-2 text-3xl font-black text-red-600">
                {inactiveTeachers}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {t.currentlyInactive}
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition group-hover:scale-110">
              <UserX className="h-7 w-7" />
            </div>
          </div>
        </div>

        <div className="group rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                {t.femaleTeachers}
              </p>

              <h2 className="mt-2 text-3xl font-black text-purple-600">
                {femaleTeachers}
              </h2>

              <p className="mt-1 text-xs text-slate-400">{t.femaleStaff}</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition group-hover:scale-110">
              <UserRound className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-7 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Filter className="h-4 w-4" />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">{t.searchFilter}</h2>

            <p className="text-xs text-slate-400">
              {t.searchFilterDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search
              className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 ${
                isArabic ? "right-4" : "left-4"
              }`}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white ${
                isArabic ? "pr-12 pl-4" : "pl-12 pr-4"
              }`}
            />
          </div>

          <div className="relative w-full lg:w-72">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-[#0B192C] focus:bg-white"
            >
              <option value="All">{t.allSubjects}</option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {getSubjectName(subject.name)}
                </option>
              ))}
            </select>

            <ChevronDown
              className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                isArabic ? "left-4" : "right-4"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Teachers List */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B192C] text-white">
                <Users className="h-5 w-5" />
              </div>

              <h2 className="text-xl font-black text-slate-800">
                {t.teachersList}
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {t.results}:{" "}
              <span className="font-bold text-[#0B192C]">
                {filteredTeachers.length}
              </span>
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
            {teachers.length} {isArabic ? "مدرس" : "teachers"}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center px-5">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#0B192C]" />
            </div>

            <p className="font-bold text-slate-600">{t.loading}</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80">
                    <th className="px-5 py-4 text-start text-xs font-bold uppercase tracking-wide text-slate-500">
                      {t.teacher}
                    </th>

                    <th className="px-5 py-4 text-start text-xs font-bold uppercase tracking-wide text-slate-500">
                      {t.code}
                    </th>

                    <th className="px-5 py-4 text-start text-xs font-bold uppercase tracking-wide text-slate-500">
                      {t.subject}
                    </th>

                    <th className="px-5 py-4 text-start text-xs font-bold uppercase tracking-wide text-slate-500">
                      {t.experience}
                    </th>

                    <th className="px-5 py-4 text-start text-xs font-bold uppercase tracking-wide text-slate-500">
                      {t.phone}
                    </th>

                    <th className="px-5 py-4 text-start text-xs font-bold uppercase tracking-wide text-slate-500">
                      {t.status}
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                      {t.actions}
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
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B192C] font-black text-white shadow-sm">
                              {teacher.name.charAt(0)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-bold text-slate-800">
                                {teacher.name}
                              </p>

                              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                                <Mail className="h-3.5 w-3.5" />

                                <span className="max-w-[180px] truncate">
                                  {teacher.email || t.noData}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                            {teacher.code}
                          </span>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <BookOpen className="h-4 w-4" />
                            </div>

                            <span className="text-sm font-semibold text-slate-700">
                              {getSubjectName(teacher.subject)}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <BriefcaseBusiness className="h-4 w-4 text-slate-400" />

                            {teacher.experience || t.noData}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone className="h-4 w-4 text-slate-400" />

                            {teacher.phone || t.noData}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          {teacher.status === "Active" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                              {t.active}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                              {t.inactive}
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              title={t.view}
                              className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition hover:bg-blue-100"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              title={t.edit}
                              className="rounded-xl bg-amber-50 p-2.5 text-amber-600 transition hover:bg-amber-100"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              title={t.delete}
                              onClick={() => handleDeleteTeacher(teacher.id)}
                              className="rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-5 py-20 text-center">
                        <Users className="mx-auto mb-4 h-14 w-14 text-slate-200" />

                        <p className="font-bold text-slate-500">
                          {t.noTeachers}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {t.changeSearch}
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
                    className="rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-sm"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B192C] font-black text-white">
                          {teacher.name.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-slate-800">
                            {teacher.name}
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            {teacher.code}
                          </p>
                        </div>
                      </div>

                      {teacher.status === "Active" ? (
                        <span className="shrink-0 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                          {t.active}
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700">
                          {t.inactive}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />

                          <p className="text-xs font-medium text-slate-400">
                            {t.subject}
                          </p>
                        </div>

                        <p className="font-bold text-slate-700">
                          {getSubjectName(teacher.subject)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <BriefcaseBusiness className="h-4 w-4 text-purple-500" />

                          <p className="text-xs font-medium text-slate-400">
                            {t.experience}
                          </p>
                        </div>

                        <p className="font-bold text-slate-700">
                          {teacher.experience || t.noData}
                        </p>
                      </div>

                      <div className="col-span-2 rounded-2xl bg-white p-3">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-slate-400" />

                          <p className="break-all text-sm font-bold text-slate-700">
                            {teacher.phone || t.noData}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2 rounded-2xl bg-white p-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-slate-400" />

                          <p className="break-all text-sm font-bold text-slate-700">
                            {teacher.email || t.noData}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-50 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
                      >
                        <Eye className="h-4 w-4" />
                        {t.view}
                      </button>

                      <button
                        type="button"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-50 py-2.5 text-xs font-bold text-amber-600 transition hover:bg-amber-100"
                      >
                        <Pencil className="h-4 w-4" />
                        {t.edit}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-red-50 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        {t.delete}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center">
                  <Users className="mx-auto mb-4 h-14 w-14 text-slate-200" />

                  <p className="font-bold text-slate-500">{t.noTeachers}</p>

                  <p className="mt-1 text-sm text-slate-400">
                    {t.changeSearch}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B192C] text-white">
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-slate-800">
                      {t.addNewTeacher}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {t.teacherInfo}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl bg-slate-100 p-2.5 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* No Subjects Warning */}
            {!subjectsLoading && subjects.length === 0 && (
              <div className="mx-6 mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                  <div>
                    <p className="font-bold text-amber-800">{t.noSubjects}</p>

                    <p className="mt-1 text-sm text-amber-700">
                      {t.addSubjectFirst}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  {t.teacherName}
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
                  placeholder={t.enterTeacherName}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  {t.email}
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  {t.phoneNumber}
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  {t.subjectLabel}
                </label>

                {subjectsLoading ? (
                  <div className="flex h-[54px] items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500">
                    {t.subjectsLoading}
                  </div>
                ) : subjects.length === 0 ? (
                  <div className="flex h-[54px] items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 text-sm font-semibold text-amber-700">
                    {t.noSubjects}
                  </div>
                ) : (
                  <select
                    value={newTeacher.subject_id}
                    onChange={(e) =>
                      setNewTeacher({
                        ...newTeacher,
                        subject_id: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#0B192C] focus:bg-white"
                  >
                    <option value={0}>{t.chooseSubject}</option>

                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {getSubjectName(subject.name)}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  {t.yearsExperience}
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
                  placeholder={t.yearsExample}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  {t.gender}
                </label>

                <select
                  value={newTeacher.gender}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      gender: e.target.value as "Male" | "Female",
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#0B192C] focus:bg-white"
                >
                  <option value="Male">{t.male}</option>

                  <option value="Female">{t.female}</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-2xl border border-slate-200 px-6 py-3.5 font-bold text-slate-600 transition hover:bg-slate-50"
              >
                {t.cancel}
              </button>

              <button
                type="button"
                onClick={handleAddTeacher}
                disabled={saving || subjects.length === 0 || subjectsLoading}
                className="rounded-2xl bg-[#0B192C] px-6 py-3.5 font-bold text-white transition hover:bg-[#142b48] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? t.adding : t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
