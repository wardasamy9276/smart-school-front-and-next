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

export default function ParentsPage() {
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

  const totalParents = parents.length;

  const activeParents = parents.filter(
    (parent) => parent.status === "نشط",
  ).length;

  const inactiveParents = parents.filter(
    (parent) => parent.status === "غير نشط",
  ).length;

  const mothers = parents.filter((parent) => parent.relation === "أم").length;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("من فضلك اكتب اسم ولي الأمر");
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

  const handleDelete = (id: number) => {
    const parent = parents.find((item) => item.id === id);

    if (!parent) return;

    const confirmed = window.confirm(
      `هل أنت متأكد من حذف ولي الأمر "${parent.name}"؟`,
    );

    if (!confirmed) return;

    setParents((currentParents) =>
      currentParents.filter((parent) => parent.id !== id),
    );
  };

  const openViewModal = (parent: Parent) => {
    setSelectedParent(parent);
    setShowViewModal(true);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B192C]">
            أولياء الأمور
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-500">
            إدارة ومتابعة بيانات أولياء أمور الطلاب
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#142c49]"
        >
          <Plus className="h-5 w-5" />
          إضافة ولي أمر
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">إجمالي أولياء الأمور</p>

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
              <p className="text-sm text-slate-500">أولياء الأمور النشطون</p>

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
              <p className="text-sm text-slate-500">غير النشطين</p>

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
              <p className="text-sm text-slate-500">الأمهات</p>

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
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو الكود أو البريد أو الهاتف أو اسم الطالب..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-12 pl-4 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">كل الحالات</option>
            <option value="نشط">نشط</option>
            <option value="غير نشط">غير نشط</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                  ولي الأمر
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                  الكود
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                  بيانات التواصل
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                  الأبناء
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                  الصلة
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold text-slate-600">
                  الحالة
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-slate-600">
                  الإجراءات
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
                          {parent.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          ولي أمر طالب
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
                        <span>{parent.email}</span>
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
                          {parent.childrenCount} طالب
                        </span>
                      </div>

                      <p className="text-xs leading-6 text-slate-500">
                        {parent.children}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
                      {parent.relation}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    {parent.status === "نشط" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        نشط
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-500">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        غير نشط
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => openViewModal(parent)}
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        title="عرض"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(parent)}
                        className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                        title="تعديل"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(parent.id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        title="حذف"
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

            <p className="mt-4 font-semibold text-slate-500">لا توجد نتائج</p>

            <p className="mt-1 text-sm text-slate-400">
              جرّب تغيير كلمة البحث أو الفلتر
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
                  <h3 className="font-bold text-[#0B192C]">{parent.name}</h3>

                  <p className="mt-1 text-xs text-slate-400">{parent.code}</p>
                </div>
              </div>

              {parent.status === "نشط" ? (
                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                  نشط
                </span>
              ) : (
                <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                  غير نشط
                </span>
              )}
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Mail className="h-4 w-4 text-[#0B192C]" />
                <span className="break-all">{parent.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Phone className="h-4 w-4 text-[#0B192C]" />
                <span dir="ltr">{parent.phone}</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-500">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#0B192C]" />

                <div>
                  <p className="font-semibold text-[#0B192C]">
                    الأبناء: {parent.childrenCount}
                  </p>

                  <p className="mt-1 leading-6">{parent.children}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <UserRoundCheck className="h-4 w-4 text-[#0B192C]" />

                <span>
                  صلة القرابة:{" "}
                  <strong className="text-[#0B192C]">{parent.relation}</strong>
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
                عرض
              </button>

              <button
                type="button"
                onClick={() => openEditModal(parent)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 py-3 text-sm font-semibold text-amber-600"
              >
                <Pencil className="h-4 w-4" />
                تعديل
              </button>

              <button
                type="button"
                onClick={() => handleDelete(parent.id)}
                className="flex items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredParents.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <Users className="mx-auto h-12 w-12 text-slate-300" />

            <p className="mt-4 font-semibold text-slate-500">لا توجد نتائج</p>
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
                  {editingParent ? "تعديل ولي الأمر" : "إضافة ولي أمر جديد"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  أدخل بيانات ولي الأمر
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-lg bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    اسم ولي الأمر *
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
                    placeholder="مثال: محمد أحمد علي"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    البريد الإلكتروني
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    رقم الهاتف
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* Relation */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    صلة القرابة
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
                    <option value="أب">أب</option>
                    <option value="أم">أم</option>
                    <option value="ولي أمر">ولي أمر</option>
                  </select>
                </div>

                {/* Children */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    أسماء الأبناء
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
                    placeholder="مثال: أحمد محمد - سارة محمد"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* Children Count */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    عدد الأبناء
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
                    الحالة
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
                    <option value="نشط">نشط</option>
                    <option value="غير نشط">غير نشط</option>
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
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#0B192C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#142c49]"
                >
                  {editingParent ? "حفظ التعديلات" : "إضافة ولي الأمر"}
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
                  بيانات ولي الأمر
                </h2>

                <p className="mt-1 text-sm text-slate-400">التفاصيل الكاملة</p>
              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="rounded-lg bg-slate-100 p-2 text-slate-500"
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
                  {selectedParent.name}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {selectedParent.code}
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">البريد الإلكتروني</p>

                  <p className="mt-1 break-all text-sm font-semibold text-[#0B192C]">
                    {selectedParent.email || "غير مسجل"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">رقم الهاتف</p>

                  <p
                    dir="ltr"
                    className="mt-1 text-right text-sm font-semibold text-[#0B192C]"
                  >
                    {selectedParent.phone || "غير مسجل"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">صلة القرابة</p>

                  <p className="mt-1 text-sm font-semibold text-[#0B192C]">
                    {selectedParent.relation}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">الأبناء</p>

                  <p className="mt-1 text-sm font-semibold leading-7 text-[#0B192C]">
                    {selectedParent.children || "لا يوجد أبناء مسجلون"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    عدد الأبناء: {selectedParent.childrenCount}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">الحالة</p>

                  <p
                    className={`mt-1 text-sm font-semibold ${
                      selectedParent.status === "نشط"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {selectedParent.status}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="mt-6 w-full rounded-xl bg-[#0B192C] py-3 text-sm font-semibold text-white"
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
