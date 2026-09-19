"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Check,
  X,
  Clock3,
  Users,
  CalendarDays,
  Pencil,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  AlertCircle,
  XCircle,
  Plus,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

interface AttendanceRecord {
  id: number;

  studentName: string;
  studentNameEn: string;

  studentCode: string;

  className: string;
  classNameEn: string;

  date: string;
  checkIn: string;

  status: "حاضر" | "غائب" | "متأخر";

  notes: string;
  notesEn: string;
}

const initialAttendance: AttendanceRecord[] = [
  {
    id: 1,
    studentName: "أحمد محمد علي",
    studentNameEn: "Ahmed Mohamed Ali",
    studentCode: "STD-001",
    className: "الصف الأول الابتدائي - أ",
    classNameEn: "Grade 1 Primary - A",
    date: "2026-09-14",
    checkIn: "07:45 AM",
    status: "حاضر",
    notes: "",
    notesEn: "",
  },
  {
    id: 2,
    studentName: "سارة محمود حسن",
    studentNameEn: "Sara Mahmoud Hassan",
    studentCode: "STD-002",
    className: "الصف الأول الابتدائي - أ",
    classNameEn: "Grade 1 Primary - A",
    date: "2026-09-14",
    checkIn: "07:50 AM",
    status: "حاضر",
    notes: "",
    notesEn: "",
  },
  {
    id: 3,
    studentName: "محمد خالد إبراهيم",
    studentNameEn: "Mohamed Khaled Ibrahim",
    studentCode: "STD-003",
    className: "الصف الثالث الابتدائي - ب",
    classNameEn: "Grade 3 Primary - B",
    date: "2026-09-14",
    checkIn: "08:10 AM",
    status: "متأخر",
    notes: "تأخر عن موعد الطابور الصباحي",
    notesEn: "Late for the morning assembly",
  },
  {
    id: 4,
    studentName: "مريم أحمد علي",
    studentNameEn: "Mariam Ahmed Ali",
    studentCode: "STD-004",
    className: "الصف الأول الإعدادي - أ",
    classNameEn: "Grade 1 Preparatory - A",
    date: "2026-09-14",
    checkIn: "-",
    status: "غائب",
    notes: "غياب بعذر",
    notesEn: "Excused absence",
  },
  {
    id: 5,
    studentName: "يوسف حسن محمود",
    studentNameEn: "Youssef Hassan Mahmoud",
    studentCode: "STD-005",
    className: "الصف الأول الثانوي - أ",
    classNameEn: "Grade 1 Secondary - A",
    date: "2026-09-14",
    checkIn: "07:42 AM",
    status: "حاضر",
    notes: "",
    notesEn: "",
  },
  {
    id: 6,
    studentName: "نور أحمد محمد",
    studentNameEn: "Nour Ahmed Mohamed",
    studentCode: "STD-006",
    className: "الصف الثاني الابتدائي - أ",
    classNameEn: "Grade 2 Primary - A",
    date: "2026-09-14",
    checkIn: "08:05 AM",
    status: "متأخر",
    notes: "تأخر 5 دقائق",
    notesEn: "5 minutes late",
  },
  {
    id: 7,
    studentName: "ملك محمود علي",
    studentNameEn: "Malak Mahmoud Ali",
    studentCode: "STD-007",
    className: "الصف الثاني الإعدادي - أ",
    classNameEn: "Grade 2 Preparatory - A",
    date: "2026-09-14",
    checkIn: "-",
    status: "غائب",
    notes: "لم يحضر اليوم",
    notesEn: "Did not attend today",
  },
  {
    id: 8,
    studentName: "عمر خالد حسن",
    studentNameEn: "Omar Khaled Hassan",
    studentCode: "STD-008",
    className: "الصف الثالث الابتدائي - ب",
    classNameEn: "Grade 3 Primary - B",
    date: "2026-09-14",
    checkIn: "07:48 AM",
    status: "حاضر",
    notes: "",
    notesEn: "",
  },
];

export default function AttendancePage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [attendance, setAttendance] =
    useState<AttendanceRecord[]>(initialAttendance);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [classFilter, setClassFilter] = useState("الكل");
  const [dateFilter, setDateFilter] = useState("2026-09-14");

  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(
    null,
  );

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentNameEn, setNewStudentNameEn] = useState("");
  const [newStudentCode, setNewStudentCode] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [newClassNameEn, setNewClassNameEn] = useState("");

  const [newStatus, setNewStatus] =
    useState<AttendanceRecord["status"]>("حاضر");

  const [newNotes, setNewNotes] = useState("");
  const [newNotesEn, setNewNotesEn] = useState("");

  const [editStatus, setEditStatus] =
    useState<AttendanceRecord["status"]>("حاضر");

  const [editNotes, setEditNotes] = useState("");
  const [editNotesEn, setEditNotesEn] = useState("");

  /* =========================
     Translation
  ========================= */

  const text = {
    title: isArabic ? "الحضور والغياب" : "Attendance & Absence",

    subtitle: isArabic
      ? "متابعة حضور وغياب الطلاب يوميًا"
      : "Track student attendance and absence daily",

    addAttendance: isArabic ? "إضافة حضور / غياب" : "Add Attendance / Absence",

    students: isArabic ? "الطلاب" : "Students",

    totalRecords: isArabic ? "إجمالي السجلات" : "Total Records",

    attendance: isArabic ? "حضور" : "Present",

    presentStudents: isArabic ? "الطلاب الحاضرون" : "Present Students",

    absence: isArabic ? "غياب" : "Absent",

    absentStudents: isArabic ? "الطلاب الغائبون" : "Absent Students",

    late: isArabic ? "تأخير" : "Late",

    lateStudents: isArabic ? "الطلاب المتأخرون" : "Late Students",

    percentage: isArabic ? "النسبة" : "Percentage",

    searchPlaceholder: isArabic
      ? "ابحث باسم الطالب أو الكود..."
      : "Search by student name or code...",

    allStatuses: isArabic ? "كل حالات الحضور" : "All Attendance Statuses",

    allClasses: isArabic ? "كل الفصول" : "All Classes",

    student: isArabic ? "الطالب" : "Student",

    class: isArabic ? "الفصل" : "Class",

    date: isArabic ? "التاريخ" : "Date",

    checkIn: isArabic ? "وقت الدخول" : "Check-in Time",

    status: isArabic ? "الحالة" : "Status",

    notes: isArabic ? "الملاحظات" : "Notes",

    actions: isArabic ? "الإجراءات" : "Actions",

    view: isArabic ? "عرض" : "View",

    edit: isArabic ? "تعديل" : "Edit",

    delete: isArabic ? "حذف" : "Delete",

    noRecords: isArabic ? "لا توجد سجلات حضور" : "No attendance records",

    changeFilters: isArabic
      ? "جربي تغيير البحث أو الفلاتر"
      : "Try changing the search or filters",

    addTitle: isArabic ? "إضافة حضور / غياب" : "Add Attendance / Absence",

    addSubtitle: isArabic
      ? "تسجيل حالة حضور طالب جديد"
      : "Register attendance status for a new student",

    studentNameAr: isArabic ? "اسم الطالب بالعربية" : "Student Name in Arabic",

    studentNameEn: isArabic
      ? "اسم الطالب بالإنجليزية"
      : "Student Name in English",

    studentCode: isArabic ? "كود الطالب" : "Student Code",

    classAr: isArabic ? "الفصل بالعربية" : "Class in Arabic",

    classEn: isArabic ? "الفصل بالإنجليزية" : "Class in English",

    studentStatus: isArabic ? "حالة الطالب" : "Student Status",

    notesAr: isArabic ? "الملاحظات بالعربية" : "Notes in Arabic",

    notesEn: isArabic ? "الملاحظات بالإنجليزية" : "Notes in English",

    saveAttendance: isArabic ? "حفظ الحضور" : "Save Attendance",

    cancel: isArabic ? "إلغاء" : "Cancel",

    viewDetails: isArabic ? "تفاصيل الحضور" : "Attendance Details",

    viewSubtitle: isArabic
      ? "بيانات سجل حضور الطالب"
      : "Student attendance record details",

    close: isArabic ? "إغلاق" : "Close",

    editTitle: isArabic ? "تعديل حالة الحضور" : "Edit Attendance Status",

    attendanceStatus: isArabic ? "حالة الحضور" : "Attendance Status",

    editNotesPlaceholder: isArabic
      ? "اكتبي ملاحظات عن الحضور..."
      : "Write attendance notes...",

    saveEdit: isArabic ? "حفظ التعديل" : "Save Changes",

    noNotes: isArabic ? "لا توجد ملاحظات" : "No notes",

    deleteConfirm: isArabic
      ? "هل أنتِ متأكدة من حذف سجل الحضور هذا؟"
      : "Are you sure you want to delete this attendance record?",

    nameRequired: isArabic
      ? "من فضلك أدخلي اسم الطالب"
      : "Please enter the student name",

    codeRequired: isArabic
      ? "من فضلك أدخلي كود الطالب"
      : "Please enter the student code",

    classRequired: isArabic ? "من فضلك أدخلي الفصل" : "Please enter the class",

    duplicate: isArabic
      ? "هذا الطالب لديه سجل حضور بالفعل في هذا اليوم"
      : "This student already has an attendance record for this day",

    arabicExample: "مثال: أحمد محمد علي",

    englishExample: "Example: Ahmed Mohamed Ali",

    arabicClassExample: "مثال: الصف الأول الابتدائي - أ",

    englishClassExample: "Example: Grade 1 Primary - A",

    arabicNoteExample: "مثال: غياب بعذر",

    englishNoteExample: "Example: Excused absence",

    arabicEditNote: "اكتبي الملاحظات بالعربية...",

    englishEditNote: "Write attendance notes in English...",
  };

  /* =========================
     Status Translation
  ========================= */

  const getStatusLabel = (status: AttendanceRecord["status"]) => {
    if (isArabic) {
      return status;
    }

    if (status === "حاضر") return "Present";
    if (status === "غائب") return "Absent";

    return "Late";
  };

  /* =========================
     Student Name
  ========================= */

  const getStudentName = (record: AttendanceRecord) => {
    return isArabic ? record.studentName : record.studentNameEn;
  };

  /* =========================
     Class
  ========================= */

  const getClassName = (record: AttendanceRecord) => {
    return isArabic ? record.className : record.classNameEn;
  };

  /* =========================
     Notes
  ========================= */

  const getNotes = (record: AttendanceRecord) => {
    return isArabic ? record.notes : record.notesEn;
  };

  /* =========================
     Filter
  ========================= */

  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        record.studentName.toLowerCase().includes(searchValue) ||
        record.studentNameEn.toLowerCase().includes(searchValue) ||
        record.studentCode.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "الكل" || record.status === statusFilter;

      const matchesClass =
        classFilter === "الكل" || record.className === classFilter;

      const matchesDate = !dateFilter || record.date === dateFilter;

      return matchesSearch && matchesStatus && matchesClass && matchesDate;
    });
  }, [attendance, search, statusFilter, classFilter, dateFilter]);

  /* =========================
     Statistics
  ========================= */

  const totalStudents = filteredAttendance.length;

  const presentCount = filteredAttendance.filter(
    (record) => record.status === "حاضر",
  ).length;

  const absentCount = filteredAttendance.filter(
    (record) => record.status === "غائب",
  ).length;

  const lateCount = filteredAttendance.filter(
    (record) => record.status === "متأخر",
  ).length;

  const attendancePercentage =
    totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  const classes = Array.from(
    new Set(attendance.map((record) => record.className)),
  );

  /* =========================
     Open View
  ========================= */

  const openView = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setViewOpen(true);
  };

  /* =========================
     Open Edit
  ========================= */

  const openEdit = (record: AttendanceRecord) => {
    setSelectedRecord(record);

    setEditStatus(record.status);
    setEditNotes(record.notes);
    setEditNotesEn(record.notesEn);

    setEditOpen(true);
  };

  /* =========================
     Save Edit
  ========================= */

  const saveEdit = () => {
    if (!selectedRecord) return;

    setAttendance((current) =>
      current.map((record) =>
        record.id === selectedRecord.id
          ? {
              ...record,
              status: editStatus,
              notes: editNotes,
              notesEn: editNotesEn,

              checkIn:
                editStatus === "غائب"
                  ? "-"
                  : record.checkIn === "-"
                    ? "07:45 AM"
                    : record.checkIn,
            }
          : record,
      ),
    );

    setEditOpen(false);
    setSelectedRecord(null);
  };

  /* =========================
     Add Attendance
  ========================= */

  const saveNewAttendance = () => {
    if (!newStudentName.trim()) {
      alert(text.nameRequired);
      return;
    }

    if (!newStudentCode.trim()) {
      alert(text.codeRequired);
      return;
    }

    if (!newClassName.trim()) {
      alert(text.classRequired);
      return;
    }

    const alreadyExists = attendance.some(
      (record) =>
        record.studentCode.toLowerCase() ===
          newStudentCode.trim().toLowerCase() && record.date === dateFilter,
    );

    if (alreadyExists) {
      alert(text.duplicate);
      return;
    }

    const newRecord: AttendanceRecord = {
      id: Date.now(),

      studentName: newStudentName.trim(),

      studentNameEn: newStudentNameEn.trim() || newStudentName.trim(),

      studentCode: newStudentCode.trim(),

      className: newClassName.trim(),

      classNameEn: newClassNameEn.trim() || newClassName.trim(),

      date: dateFilter || "2026-09-14",

      checkIn:
        newStatus === "غائب"
          ? "-"
          : newStatus === "متأخر"
            ? "08:10 AM"
            : "07:45 AM",

      status: newStatus,

      notes: newNotes.trim(),

      notesEn: newNotesEn.trim(),
    };

    setAttendance((current) => [newRecord, ...current]);

    setNewStudentName("");
    setNewStudentNameEn("");
    setNewStudentCode("");
    setNewClassName("");
    setNewClassNameEn("");
    setNewStatus("حاضر");
    setNewNotes("");
    setNewNotesEn("");

    setAddOpen(false);
  };

  /* =========================
     Delete
  ========================= */

  const deleteRecord = (id: number) => {
    const confirmed = window.confirm(text.deleteConfirm);

    if (!confirmed) return;

    setAttendance((current) => current.filter((record) => record.id !== id));
  };

  /* =========================
     Status Style
  ========================= */

  const getStatusStyle = (status: AttendanceRecord["status"]) => {
    if (status === "حاضر") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (status === "غائب") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  /* =========================
     Status Icon
  ========================= */

  const getStatusIcon = (status: AttendanceRecord["status"]) => {
    if (status === "حاضر") {
      return <Check size={15} />;
    }

    if (status === "غائب") {
      return <X size={15} />;
    }

    return <Clock3 size={15} />;
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B192C] text-white shadow-lg">
              <CalendarDays size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {text.title}
              </h1>

              <p className="mt-1 text-sm text-slate-500">{text.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#132943]"
          >
            <Plus size={19} />
            {text.addAttendance}
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <CalendarDays size={19} className="text-slate-400" />

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={22} />
            </div>

            <span className="text-xs text-slate-400">{text.students}</span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">{totalStudents}</h3>

          <p className="mt-1 text-sm text-slate-500">{text.totalRecords}</p>
        </div>

        {/* Present */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck size={22} />
            </div>

            <span className="text-xs text-slate-400">{text.attendance}</span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">{presentCount}</h3>

          <p className="mt-1 text-sm text-emerald-600">
            {text.presentStudents}
          </p>
        </div>

        {/* Absent */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <UserX size={22} />
            </div>

            <span className="text-xs text-slate-400">{text.absence}</span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">{absentCount}</h3>

          <p className="mt-1 text-sm text-red-600">{text.absentStudents}</p>
        </div>

        {/* Late */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={22} />
            </div>

            <span className="text-xs text-slate-400">{text.late}</span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">{lateCount}</h3>

          <p className="mt-1 text-sm text-amber-600">{text.lateStudents}</p>
        </div>

        {/* Percentage */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <AlertCircle size={22} />
            </div>

            <span className="text-xs text-slate-400">{text.percentage}</span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">
            {attendancePercentage}%
          </h3>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#0B192C] transition-all"
              style={{
                width: `${attendancePercentage}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
              placeholder={text.searchPlaceholder}
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white ${
                isArabic ? "pr-12 pl-4" : "pl-12 pr-4"
              }`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">{text.allStatuses}</option>

            <option value="حاضر">{getStatusLabel("حاضر")}</option>

            <option value="غائب">{getStatusLabel("غائب")}</option>

            <option value="متأخر">{getStatusLabel("متأخر")}</option>
          </select>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">{text.allClasses}</option>

            {classes.map((className) => {
              const record = attendance.find(
                (item) => item.className === className,
              );

              return (
                <option key={className} value={className}>
                  {record ? getClassName(record) : className}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-[#0B192C] text-white">
              <tr>
                {[
                  text.student,
                  text.class,
                  text.date,
                  text.checkIn,
                  text.status,
                  text.notes,
                ].map((label) => (
                  <th
                    key={label}
                    className={`px-5 py-4 text-sm font-semibold ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {label}
                  </th>
                ))}

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  {text.actions}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {getStudentName(record)}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {record.studentCode}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {getClassName(record)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {record.date}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {record.checkIn}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          record.status,
                        )}`}
                      >
                        {getStatusIcon(record.status)}

                        {getStatusLabel(record.status)}
                      </span>
                    </td>

                    <td className="max-w-[220px] px-5 py-4 text-sm text-slate-500">
                      <span className="block truncate">
                        {getNotes(record) || "-"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openView(record)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          title={text.view}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEdit(record)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                          title={text.edit}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteRecord(record.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                          title={text.delete}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <XCircle
                      size={45}
                      className="mx-auto mb-4 text-slate-300"
                    />

                    <p className="font-semibold text-slate-600">
                      {text.noRecords}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {text.changeFilters}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredAttendance.length > 0 ? (
          filteredAttendance.map((record) => (
            <div
              key={record.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {getStudentName(record)}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {record.studentCode}
                  </p>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    record.status,
                  )}`}
                >
                  {getStatusIcon(record.status)}

                  {getStatusLabel(record.status)}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">{text.class}</span>

                  <span className="font-semibold text-slate-700">
                    {getClassName(record)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{text.date}</span>

                  <span className="font-semibold text-slate-700">
                    {record.date}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{text.checkIn}</span>

                  <span className="font-semibold text-slate-700">
                    {record.checkIn}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-slate-400">{text.notes}</span>

                  <span
                    className={
                      isArabic
                        ? "text-right text-slate-600"
                        : "text-left text-slate-600"
                    }
                  >
                    {getNotes(record) || "-"}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => openView(record)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-sm font-semibold text-blue-600"
                >
                  <Eye size={17} />
                  {text.view}
                </button>

                <button
                  type="button"
                  onClick={() => openEdit(record)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 py-2.5 text-sm font-semibold text-amber-600"
                >
                  <Pencil size={17} />
                  {text.edit}
                </button>

                <button
                  type="button"
                  onClick={() => deleteRecord(record.id)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600"
                  title={text.delete}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center">
            <XCircle size={45} className="mx-auto mb-4 text-slate-300" />

            <p className="font-semibold text-slate-600">{text.noRecords}</p>
          </div>
        )}
      </div>

      {/* Add Attendance Modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {text.addTitle}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {text.addSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
                title={text.close}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-7">
              {/* Arabic Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.studentNameAr}
                </label>

                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder={text.arabicExample}
                  dir="rtl"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              {/* English Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.studentNameEn}
                </label>

                <input
                  type="text"
                  value={newStudentNameEn}
                  onChange={(e) => setNewStudentNameEn(e.target.value)}
                  placeholder={text.englishExample}
                  dir="ltr"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              {/* Student Code */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.studentCode}
                </label>

                <input
                  type="text"
                  value={newStudentCode}
                  onChange={(e) => setNewStudentCode(e.target.value)}
                  placeholder="Example: STD-009"
                  dir="ltr"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              {/* Arabic Class */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.classAr}
                </label>

                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder={text.arabicClassExample}
                  dir="rtl"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              {/* English Class */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.classEn}
                </label>

                <input
                  type="text"
                  value={newClassNameEn}
                  onChange={(e) => setNewClassNameEn(e.target.value)}
                  placeholder={text.englishClassExample}
                  dir="ltr"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.studentStatus}
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewStatus("حاضر")}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      newStatus === "حاضر"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <Check size={17} />
                    {getStatusLabel("حاضر")}
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewStatus("غائب")}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      newStatus === "غائب"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <X size={17} />
                    {getStatusLabel("غائب")}
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewStatus("متأخر")}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      newStatus === "متأخر"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <Clock3 size={17} />
                    {getStatusLabel("متأخر")}
                  </button>
                </div>
              </div>

              {/* Arabic Notes */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.notesAr}
                </label>

                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows={3}
                  placeholder={text.arabicNoteExample}
                  dir="rtl"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              {/* English Notes */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.notesEn}
                </label>

                <textarea
                  value={newNotesEn}
                  onChange={(e) => setNewNotesEn(e.target.value)}
                  rows={3}
                  placeholder={text.englishNoteExample}
                  dir="ltr"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setAddOpen(false)}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600"
                >
                  {text.cancel}
                </button>

                <button
                  type="button"
                  onClick={saveNewAttendance}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-7 py-3 font-semibold text-white"
                >
                  <Check size={18} />
                  {text.saveAttendance}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {text.viewDetails}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {text.viewSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5 sm:p-7">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs text-slate-400">{text.student}</p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  {getStudentName(selectedRecord)}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedRecord.studentCode}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-400">{text.class}</p>

                  <p className="mt-2 font-semibold text-slate-800">
                    {getClassName(selectedRecord)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-400">{text.date}</p>

                  <p className="mt-2 font-semibold text-slate-800">
                    {selectedRecord.date}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-400">{text.checkIn}</p>

                  <p className="mt-2 font-semibold text-slate-800">
                    {selectedRecord.checkIn}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-400">{text.status}</p>

                  <span
                    className={`mt-2 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      selectedRecord.status,
                    )}`}
                  >
                    {getStatusIcon(selectedRecord.status)}

                    {getStatusLabel(selectedRecord.status)}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-400">{text.notes}</p>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {getNotes(selectedRecord) || text.noNotes}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewOpen(false)}
                className="w-full rounded-xl bg-[#0B192C] py-3 font-semibold text-white"
              >
                {text.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {text.editTitle}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {getStudentName(selectedRecord)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-7">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.attendanceStatus}
                </label>

                <select
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(e.target.value as AttendanceRecord["status"])
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                >
                  <option value="حاضر">{getStatusLabel("حاضر")}</option>

                  <option value="غائب">{getStatusLabel("غائب")}</option>

                  <option value="متأخر">{getStatusLabel("متأخر")}</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.notesAr}
                </label>

                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                  placeholder={text.arabicEditNote}
                  dir="rtl"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {text.notesEn}
                </label>

                <textarea
                  value={editNotesEn}
                  onChange={(e) => setEditNotesEn(e.target.value)}
                  rows={3}
                  placeholder={text.englishEditNote}
                  dir="ltr"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600"
                >
                  {text.cancel}
                </button>

                <button
                  type="button"
                  onClick={saveEdit}
                  className="rounded-xl bg-[#0B192C] px-7 py-3 font-semibold text-white"
                >
                  {text.saveEdit}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
