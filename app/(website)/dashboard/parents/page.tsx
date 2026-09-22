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
  UserRound,
  X,
  Mail,
  Phone,
  GraduationCap,
  UserRoundCheck,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

interface Parent {
  id: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  children: string;
  childrenCount: number;
  relation: "أب" | "أم" | "ولي أمر";
  status: "نشط" | "غير نشط";
}

const initialParents: Parent[] = [
  {
    id: 1,
    name: "محمد أحمد علي",
    code: "PAR-001",
    email: "mohamed@example.com",
    phone: "01012345678",
    children: "أحمد محمد - سارة محمد",
    childrenCount: 2,
    relation: "أب",
    status: "نشط",
  },
  {
    id: 2,
    name: "سارة محمود حسن",
    code: "PAR-002",
    email: "sara@example.com",
    phone: "01123456789",
    children: "مريم خالد",
    childrenCount: 1,
    relation: "أم",
    status: "نشط",
  },
  {
    id: 3,
    name: "خالد إبراهيم محمد",
    code: "PAR-003",
    email: "khaled@example.com",
    phone: "01234567890",
    children: "يوسف خالد - عمر خالد",
    childrenCount: 2,
    relation: "أب",
    status: "نشط",
  },
  {
    id: 4,
    name: "مريم أحمد حسن",
    code: "PAR-004",
    email: "mariam@example.com",
    phone: "01098765432",
    children: "نور أحمد",
    childrenCount: 1,
    relation: "أم",
    status: "غير نشط",
  },
  {
    id: 5,
    name: "حسن محمود علي",
    code: "PAR-005",
    email: "hassan@example.com",
    phone: "01567890123",
    children: "عبدالله حسن - يوسف حسن",
    childrenCount: 2,
    relation: "ولي أمر",
    status: "نشط",
  },
];

/* =========================================================
   Parents Names Translation
========================================================= */

const parentNames: Record<string, string> = {
  "محمد أحمد علي": "Mohamed Ahmed Ali",
  "سارة محمود حسن": "Sara Mahmoud Hassan",
  "خالد إبراهيم محمد": "Khaled Ibrahim Mohamed",
  "مريم أحمد حسن": "Mariam Ahmed Hassan",
  "حسن محمود علي": "Hassan Mahmoud Ali",
};

/* =========================================================
   Children Names Translation
========================================================= */

const childrenNames: Record<string, string> = {
  "أحمد محمد - سارة محمد": "Ahmed Mohamed - Sara Mohamed",
  "مريم خالد": "Mariam Khaled",
  "يوسف خالد - عمر خالد": "Youssef Khaled - Omar Khaled",
  "نور أحمد": "Nour Ahmed",
  "عبدالله حسن - يوسف حسن": "Abdullah Hassan - Youssef Hassan",
};

export default function ParentsPage() {
  const { language } = useLanguage();

  const isArabic = language === "ar";

  const [parents, setParents] = useState<Parent[]>(initialParents);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    children: "",
    childrenCount: "1",
    relation: "أب" as Parent["relation"],
    status: "نشط" as Parent["status"],
  });

  /* =========================================================
     Translation Helpers
  ========================================================= */

  const translateParentName = (name: string) => {
    if (isArabic) {
      return name;
    }

    return parentNames[name] || name;
  };

  const translateChildren = (children: string) => {
    if (isArabic) {
      return children;
    }

    return childrenNames[children] || children;
  };

  const translateRelation = (relation: Parent["relation"]) => {
    if (isArabic) {
      return relation;
    }

    if (relation === "أب") return "Father";
    if (relation === "أم") return "Mother";

    return "Guardian";
  };

  const translateStatus = (status: Parent["status"]) => {
    if (isArabic) {
      return status;
    }

    return status === "نشط" ? "Active" : "Inactive";
  };

  /* =========================================================
     Filter
  ========================================================= */

  const filteredParents = useMemo(() => {
    return parents.filter((parent) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        parent.name.toLowerCase().includes(searchText) ||
        parent.code.toLowerCase().includes(searchText) ||
        parent.email.toLowerCase().includes(searchText) ||
        parent.phone.includes(searchText) ||
        parent.children.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "الكل" || parent.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [parents, search, statusFilter]);

  /* =========================================================
     Statistics
  ========================================================= */

  const totalParents = parents.length;

  const activeParents = parents.filter(
    (parent) => parent.status === "نشط",
  ).length;

  const inactiveParents = parents.filter(
    (parent) => parent.status === "غير نشط",
  ).length;

  const mothers = parents.filter((parent) => parent.relation === "أم").length;

  /* =========================================================
     Form
  ========================================================= */

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      children: "",
      childrenCount: "1",
      relation: "أب",
      status: "نشط",
    });

    setEditingParent(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (parent: Parent) => {
    setEditingParent(parent);

    setForm({
      name: parent.name,
      email: parent.email,
      phone: parent.phone,
      children: parent.children,
      childrenCount: String(parent.childrenCount),
      relation: parent.relation,
      status: parent.status,
    });

    setShowModal(true);
  };

  /* =========================================================
     Submit
  ========================================================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert(
        isArabic
          ? "من فضلك اكتب اسم ولي الأمر"
          : "Please enter the parent's name",
      );

      return;
    }

    if (editingParent) {
      setParents((currentParents) =>
        currentParents.map((parent) =>
          parent.id === editingParent.id
            ? {
                ...parent,
                name: form.name,
                email: form.email,
                phone: form.phone,
                children: form.children,
                childrenCount: Number(form.childrenCount),
                relation: form.relation,
                status: form.status,
              }
            : parent,
        ),
      );
    } else {
      const newParent: Parent = {
        id: Date.now(),
        name: form.name,
        code: `PAR-${String(parents.length + 1).padStart(3, "0")}`,
        email: form.email,
        phone: form.phone,
        children: form.children,
        childrenCount: Number(form.childrenCount),
        relation: form.relation,
        status: form.status,
      };

      setParents((currentParents) => [...currentParents, newParent]);
    }

    setShowModal(false);
    resetForm();
  };

  /* =========================================================
     Delete
  ========================================================= */

  const handleDelete = (id: number) => {
    const parent = parents.find((item) => item.id === id);

    if (!parent) return;

    const translatedName = translateParentName(parent.name);

    const confirmed = window.confirm(
      isArabic
        ? `هل أنت متأكد من حذف ولي الأمر "${translatedName}"؟`
        : `Are you sure you want to delete the parent "${translatedName}"?`,
    );

    if (!confirmed) return;

    setParents((currentParents) =>
      currentParents.filter((parent) => parent.id !== id),
    );
  };

  /* =========================================================
     View
  ========================================================= */

  const openViewModal = (parent: Parent) => {
    setSelectedParent(parent);
    setShowViewModal(true);
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
            {isArabic ? "أولياء الأمور" : "Parents"}
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            {isArabic
              ? "إدارة ومتابعة بيانات أولياء أمور الطلاب"
              : "Manage and monitor student parent information"}
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#142c49]"
        >
          <Plus className="h-5 w-5" />

          {isArabic ? "إضافة ولي أمر" : "Add Parent"}
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {isArabic ? "إجمالي أولياء الأمور" : "Total Parents"}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#0B192C]">
                {totalParents}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <Users className="h-6 w-6 text-[#0B192C]" />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {isArabic ? "أولياء الأمور النشطون" : "Active Parents"}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeParents}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {isArabic ? "غير النشطين" : "Inactive Parents"}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-500">
                {inactiveParents}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <UserX className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        {/* Mothers */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {isArabic ? "الأمهات" : "Mothers"}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                {mothers}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <UserRoundCheck className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search
              className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 ${
                isArabic ? "right-4" : "left-4"
              }`}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isArabic
                  ? "ابحث بالاسم أو الكود أو البريد أو الهاتف أو اسم الطالب..."
                  : "Search by name, code, email, phone or student name..."
              }
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
            <option value="الكل">
              {isArabic ? "كل الحالات" : "All Statuses"}
            </option>

            <option value="نشط">{isArabic ? "نشط" : "Active"}</option>

            <option value="غير نشط">{isArabic ? "غير نشط" : "Inactive"}</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {isArabic ? "ولي الأمر" : "Parent"}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {isArabic ? "الكود" : "Code"}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {isArabic ? "بيانات التواصل" : "Contact Information"}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {isArabic ? "الأبناء" : "Children"}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {isArabic ? "الصلة" : "Relation"}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-semibold text-slate-600 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {isArabic ? "الحالة" : "Status"}
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                  {isArabic ? "الإجراءات" : "Actions"}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredParents.map((parent) => (
                <tr
                  key={parent.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B192C] text-white">
                        <UserRound className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-semibold text-[#0B192C]">
                          {translateParentName(parent.name)}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {isArabic ? "ولي أمر طالب" : "Student Parent"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                      {parent.code}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <div className="space-y-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />

                        <span dir="ltr">{parent.email}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />

                        <span dir="ltr">{parent.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <div className="max-w-[220px]">
                      <div className="mb-2 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-[#0B192C]" />

                        <span className="text-sm font-semibold text-[#0B192C]">
                          {parent.childrenCount}{" "}
                          {isArabic
                            ? "طالب"
                            : parent.childrenCount === 1
                              ? "Student"
                              : "Students"}
                        </span>
                      </div>

                      <p className="text-xs leading-6 text-slate-500">
                        {translateChildren(parent.children)}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
                      {translateRelation(parent.relation)}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    {parent.status === "نشط" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500" />

                        {translateStatus(parent.status)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-500">
                        <span className="h-2 w-2 rounded-full bg-red-500" />

                        {translateStatus(parent.status)}
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => openViewModal(parent)}
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        title={isArabic ? "عرض" : "View"}
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(parent)}
                        className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                        title={isArabic ? "تعديل" : "Edit"}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(parent.id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        title={isArabic ? "حذف" : "Delete"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredParents.length === 0 && (
          <div className="px-6 py-16 text-center">
            <Users className="mx-auto h-12 w-12 text-slate-300" />

            <p className="mt-4 font-semibold text-slate-500">
              {isArabic ? "لا توجد نتائج" : "No Results Found"}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {isArabic
                ? "جرّب تغيير كلمة البحث أو الفلتر"
                : "Try changing your search or filter"}
            </p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {filteredParents.map((parent) => (
          <div key={parent.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B192C] text-white">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-[#0B192C]">
                    {translateParentName(parent.name)}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">{parent.code}</p>
                </div>
              </div>

              {parent.status === "نشط" ? (
                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                  {translateStatus(parent.status)}
                </span>
              ) : (
                <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                  {translateStatus(parent.status)}
                </span>
              )}
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Mail className="h-4 w-4 text-[#0B192C]" />

                <span className="break-all" dir="ltr">
                  {parent.email}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Phone className="h-4 w-4 text-[#0B192C]" />

                <span dir="ltr">{parent.phone}</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-500">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#0B192C]" />

                <div>
                  <p className="font-semibold text-[#0B192C]">
                    {isArabic ? "الأبناء: " : "Children: "}
                    {parent.childrenCount}
                  </p>

                  <p className="mt-1 leading-6">
                    {translateChildren(parent.children)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <UserRoundCheck className="h-4 w-4 text-[#0B192C]" />

                <span>
                  {isArabic ? "صلة القرابة: " : "Relation: "}

                  <strong className="text-[#0B192C]">
                    {translateRelation(parent.relation)}
                  </strong>
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => openViewModal(parent)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600"
              >
                <Eye className="h-4 w-4" />

                {isArabic ? "عرض" : "View"}
              </button>

              <button
                type="button"
                onClick={() => openEditModal(parent)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 py-3 text-sm font-semibold text-amber-600"
              >
                <Pencil className="h-4 w-4" />

                {isArabic ? "تعديل" : "Edit"}
              </button>

              <button
                type="button"
                onClick={() => handleDelete(parent.id)}
                className="flex items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-red-600"
                title={isArabic ? "حذف" : "Delete"}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredParents.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <Users className="mx-auto h-12 w-12 text-slate-300" />

            <p className="mt-4 font-semibold text-slate-500">
              {isArabic ? "لا توجد نتائج" : "No Results Found"}
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
                  {editingParent
                    ? isArabic
                      ? "تعديل ولي الأمر"
                      : "Edit Parent"
                    : isArabic
                      ? "إضافة ولي أمر جديد"
                      : "Add New Parent"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {isArabic
                    ? "أدخل بيانات ولي الأمر"
                    : "Enter parent information"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-lg bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
                title={isArabic ? "إغلاق" : "Close"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "اسم ولي الأمر *" : "Parent Name *"}
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder={
                      isArabic
                        ? "مثال: محمد أحمد علي"
                        : "Example: Mohamed Ahmed Ali"
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "البريد الإلكتروني" : "Email Address"}
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="example@email.com"
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "رقم الهاتف" : "Phone Number"}
                  </label>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    placeholder="01012345678"
                    dir="ltr"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* Relation */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "صلة القرابة" : "Relation"}
                  </label>

                  <select
                    value={form.relation}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        relation: e.target.value as Parent["relation"],
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  >
                    <option value="أب">{isArabic ? "أب" : "Father"}</option>

                    <option value="أم">{isArabic ? "أم" : "Mother"}</option>

                    <option value="ولي أمر">
                      {isArabic ? "ولي أمر" : "Guardian"}
                    </option>
                  </select>
                </div>

                {/* Children */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "أسماء الأبناء" : "Children Names"}
                  </label>

                  <input
                    type="text"
                    value={form.children}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        children: e.target.value,
                      })
                    }
                    placeholder={
                      isArabic
                        ? "مثال: أحمد محمد - سارة محمد"
                        : "Example: Ahmed Mohamed - Sara Mohamed"
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* Children Count */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "عدد الأبناء" : "Number of Children"}
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={form.childrenCount}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        childrenCount: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "الحالة" : "Status"}
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as Parent["status"],
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  >
                    <option value="نشط">{isArabic ? "نشط" : "Active"}</option>

                    <option value="غير نشط">
                      {isArabic ? "غير نشط" : "Inactive"}
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  {isArabic ? "إلغاء" : "Cancel"}
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#0B192C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#142c49]"
                >
                  {editingParent
                    ? isArabic
                      ? "حفظ التعديلات"
                      : "Save Changes"
                    : isArabic
                      ? "إضافة ولي الأمر"
                      : "Add Parent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedParent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-xl font-bold text-[#0B192C]">
                  {isArabic ? "بيانات ولي الأمر" : "Parent Information"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {isArabic ? "التفاصيل الكاملة" : "Complete details"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="rounded-lg bg-slate-100 p-2 text-slate-500"
                title={isArabic ? "إغلاق" : "Close"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              <div className="mb-6 flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0B192C] text-white">
                  <UserRound className="h-9 w-9" />
                </div>

                <h3 className="mt-4 text-xl font-bold text-[#0B192C]">
                  {translateParentName(selectedParent.name)}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {selectedParent.code}
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {isArabic ? "البريد الإلكتروني" : "Email Address"}
                  </p>

                  <p
                    dir="ltr"
                    className="mt-1 break-all text-sm font-semibold text-[#0B192C]"
                  >
                    {selectedParent.email ||
                      (isArabic ? "غير مسجل" : "Not registered")}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {isArabic ? "رقم الهاتف" : "Phone Number"}
                  </p>

                  <p
                    dir="ltr"
                    className={`mt-1 text-sm font-semibold text-[#0B192C] ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {selectedParent.phone ||
                      (isArabic ? "غير مسجل" : "Not registered")}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {isArabic ? "صلة القرابة" : "Relation"}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#0B192C]">
                    {translateRelation(selectedParent.relation)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {isArabic ? "الأبناء" : "Children"}
                  </p>

                  <p className="mt-1 text-sm font-semibold leading-7 text-[#0B192C]">
                    {translateChildren(selectedParent.children) ||
                      (isArabic
                        ? "لا يوجد أبناء مسجلون"
                        : "No registered children")}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {isArabic ? "عدد الأبناء: " : "Number of children: "}
                    {selectedParent.childrenCount}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {isArabic ? "الحالة" : "Status"}
                  </p>

                  <p
                    className={`mt-1 text-sm font-semibold ${
                      selectedParent.status === "نشط"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {translateStatus(selectedParent.status)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="mt-6 w-full rounded-xl bg-[#0B192C] py-3 text-sm font-semibold text-white"
              >
                {isArabic ? "إغلاق" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
