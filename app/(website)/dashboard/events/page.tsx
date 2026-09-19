"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  X,
  CheckCircle2,
  CircleAlert,
  PartyPopper,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

type EventType = "فعالية" | "اجتماع" | "رحلة" | "مسابقة" | "احتفال" | "إعلان";

type EventStatus = "قادم" | "مكتمل" | "ملغي";

interface EventItem {
  id: number;
  titleAr: string;
  titleEn: string;
  type: EventType;
  date: string;
  timeAr: string;
  timeEn: string;
  locationAr: string;
  locationEn: string;
  organizerAr: string;
  organizerEn: string;
  attendees: number;
  descriptionAr: string;
  descriptionEn: string;
  status: EventStatus;
}

const content = {
  ar: {
    header: {
      title: "الأحداث والفعاليات",
      subtitle: "إدارة جميع الأحداث والفعاليات المدرسية",
      add: "إضافة حدث جديد",
    },

    stats: {
      totalLabel: "إجمالي",
      total: "إجمالي الأحداث",
      upcomingLabel: "قادم",
      upcoming: "أحداث قادمة",
      completedLabel: "مكتمل",
      completed: "أحداث مكتملة",
      cancelledLabel: "ملغي",
      cancelled: "أحداث ملغاة",
      attendeesLabel: "حضور",
      attendees: "إجمالي المشاركين",
    },

    filters: {
      search: "ابحث عن حدث أو مكان أو منظم...",
      allTypes: "كل أنواع الأحداث",
      allStatuses: "كل الحالات",
    },

    types: {
      فعالية: "فعالية",
      اجتماع: "اجتماع",
      رحلة: "رحلة",
      مسابقة: "مسابقة",
      احتفال: "احتفال",
      إعلان: "إعلان",
    },

    statuses: {
      قادم: "قادم",
      مكتمل: "مكتمل",
      ملغي: "ملغي",
    },

    table: {
      event: "الحدث",
      type: "النوع",
      date: "التاريخ",
      time: "الوقت",
      location: "المكان",
      attendees: "المشاركون",
      status: "الحالة",
      actions: "الإجراءات",
    },

    actions: {
      view: "عرض",
      edit: "تعديل",
      delete: "حذف",
    },

    empty: {
      title: "لا توجد أحداث مطابقة للبحث",
      description: "جربي تغيير البحث أو الفلاتر",
    },

    mobile: {
      attendee: "مشارك",
    },

    modal: {
      addTitle: "إضافة حدث جديد",
      editTitle: "تعديل الحدث",
      subtitle: "أدخلي بيانات الحدث بالكامل",

      title: "اسم الحدث",
      titlePlaceholder: "مثال: حفل استقبال الطلاب الجدد",

      type: "نوع الحدث",
      status: "الحالة",

      date: "التاريخ",

      time: "الوقت",
      timePlaceholder: "مثال: 09:00 ص",

      location: "المكان",
      locationPlaceholder: "مثال: مسرح المدرسة",

      organizer: "منظم الحدث",
      organizerPlaceholder: "مثال: إدارة المدرسة",

      attendees: "عدد المشاركين",

      description: "وصف الحدث",
      descriptionPlaceholder: "اكتبي وصفًا تفصيليًا للحدث...",

      cancel: "إلغاء",
      save: "حفظ التعديلات",
      add: "إضافة الحدث",

      viewTitle: "تفاصيل الحدث",
      viewSubtitle: "معلومات الحدث بالكامل",

      organizerView: "منظم الحدث",
      notSpecified: "غير محدد",

      descriptionView: "وصف الحدث",
      noDescription: "لا يوجد وصف لهذا الحدث.",

      close: "إغلاق",

      deleteConfirm: "هل أنتِ متأكدة من حذف هذا الحدث؟",

      requiredTitle: "من فضلك اكتبي اسم الحدث",
      requiredDate: "من فضلك اختاري تاريخ الحدث",
      requiredTime: "من فضلك اختاري وقت الحدث",
      requiredLocation: "من فضلك اكتبي مكان الحدث",
    },
  },

  en: {
    header: {
      title: "Events & Activities",
      subtitle: "Manage all school events and activities",
      add: "Add New Event",
    },

    stats: {
      totalLabel: "Total",
      total: "Total Events",
      upcomingLabel: "Upcoming",
      upcoming: "Upcoming Events",
      completedLabel: "Completed",
      completed: "Completed Events",
      cancelledLabel: "Cancelled",
      cancelled: "Cancelled Events",
      attendeesLabel: "Attendance",
      attendees: "Total Participants",
    },

    filters: {
      search: "Search for an event, location, or organizer...",
      allTypes: "All Event Types",
      allStatuses: "All Statuses",
    },

    types: {
      فعالية: "Activity",
      اجتماع: "Meeting",
      رحلة: "Trip",
      مسابقة: "Competition",
      احتفال: "Celebration",
      إعلان: "Announcement",
    },

    statuses: {
      قادم: "Upcoming",
      مكتمل: "Completed",
      ملغي: "Cancelled",
    },

    table: {
      event: "Event",
      type: "Type",
      date: "Date",
      time: "Time",
      location: "Location",
      attendees: "Participants",
      status: "Status",
      actions: "Actions",
    },

    actions: {
      view: "View",
      edit: "Edit",
      delete: "Delete",
    },

    empty: {
      title: "No events match your search",
      description: "Try changing the search or filters",
    },

    mobile: {
      attendee: "Participant",
    },

    modal: {
      addTitle: "Add New Event",
      editTitle: "Edit Event",
      subtitle: "Enter all event information",

      title: "Event Name",
      titlePlaceholder: "Example: New Student Welcome Ceremony",

      type: "Event Type",
      status: "Status",

      date: "Date",

      time: "Time",
      timePlaceholder: "Example: 09:00 AM",

      location: "Location",
      locationPlaceholder: "Example: School Theater",

      organizer: "Event Organizer",
      organizerPlaceholder: "Example: School Administration",

      attendees: "Number of Participants",

      description: "Event Description",
      descriptionPlaceholder: "Write a detailed description of the event...",

      cancel: "Cancel",
      save: "Save Changes",
      add: "Add Event",

      viewTitle: "Event Details",
      viewSubtitle: "Complete event information",

      organizerView: "Event Organizer",
      notSpecified: "Not specified",

      descriptionView: "Event Description",
      noDescription: "No description available for this event.",

      close: "Close",

      deleteConfirm: "Are you sure you want to delete this event?",

      requiredTitle: "Please enter the event name",
      requiredDate: "Please select the event date",
      requiredTime: "Please enter the event time",
      requiredLocation: "Please enter the event location",
    },
  },
};

const initialEvents: EventItem[] = [
  {
    id: 1,
    titleAr: "حفل استقبال الطلاب الجدد",
    titleEn: "New Student Welcome Ceremony",
    type: "احتفال",
    date: "2026-09-20",
    timeAr: "09:00 ص",
    timeEn: "09:00 AM",
    locationAr: "مسرح المدرسة",
    locationEn: "School Theater",
    organizerAr: "إدارة المدرسة",
    organizerEn: "School Administration",
    attendees: 250,
    descriptionAr:
      "حفل ترحيبي للطلاب الجدد وتعريفهم بالمدرسة والأنشطة والخدمات التعليمية.",
    descriptionEn:
      "A welcome ceremony for new students to introduce them to the school, activities, and educational services.",
    status: "قادم",
  },
  {
    id: 2,
    titleAr: "اجتماع أولياء الأمور",
    titleEn: "Parents' Meeting",
    type: "اجتماع",
    date: "2026-09-22",
    timeAr: "05:00 م",
    timeEn: "05:00 PM",
    locationAr: "قاعة الاجتماعات",
    locationEn: "Meeting Hall",
    organizerAr: "إدارة المدرسة",
    organizerEn: "School Administration",
    attendees: 120,
    descriptionAr:
      "اجتماع لمناقشة مستوى الطلاب والخطة التعليمية والتواصل بين المدرسة وأولياء الأمور.",
    descriptionEn:
      "A meeting to discuss student performance, the educational plan, and communication between the school and parents.",
    status: "قادم",
  },
  {
    id: 3,
    titleAr: "رحلة تعليمية إلى المتحف",
    titleEn: "Educational Trip to the Museum",
    type: "رحلة",
    date: "2026-09-25",
    timeAr: "08:00 ص",
    timeEn: "08:00 AM",
    locationAr: "المتحف المصري",
    locationEn: "Egyptian Museum",
    organizerAr: "قسم الأنشطة",
    organizerEn: "Activities Department",
    attendees: 80,
    descriptionAr:
      "رحلة تعليمية للطلاب للتعرف على الحضارة المصرية القديمة بشكل عملي.",
    descriptionEn:
      "An educational trip for students to explore ancient Egyptian civilization through a practical experience.",
    status: "قادم",
  },
  {
    id: 4,
    titleAr: "مسابقة الرياضيات",
    titleEn: "Mathematics Competition",
    type: "مسابقة",
    date: "2026-09-28",
    timeAr: "10:00 ص",
    timeEn: "10:00 AM",
    locationAr: "معمل الرياضيات",
    locationEn: "Mathematics Lab",
    organizerAr: "قسم الرياضيات",
    organizerEn: "Mathematics Department",
    attendees: 60,
    descriptionAr:
      "مسابقة للطلاب في مهارات الحساب والتفكير المنطقي وحل المشكلات.",
    descriptionEn:
      "A competition for students focusing on calculation skills, logical thinking, and problem-solving.",
    status: "قادم",
  },
  {
    id: 5,
    titleAr: "اليوم الرياضي",
    titleEn: "Sports Day",
    type: "فعالية",
    date: "2026-08-30",
    timeAr: "08:30 ص",
    timeEn: "08:30 AM",
    locationAr: "الملعب الرئيسي",
    locationEn: "Main Sports Field",
    organizerAr: "قسم الأنشطة الرياضية",
    organizerEn: "Sports Activities Department",
    attendees: 180,
    descriptionAr:
      "يوم رياضي يتضمن مسابقات كرة القدم والجري والأنشطة الرياضية المختلفة.",
    descriptionEn:
      "A sports day featuring football competitions, running races, and various sports activities.",
    status: "مكتمل",
  },
  {
    id: 6,
    titleAr: "حفل تكريم الطلاب المتفوقين",
    titleEn: "Top Students Awards Ceremony",
    type: "احتفال",
    date: "2026-08-25",
    timeAr: "11:00 ص",
    timeEn: "11:00 AM",
    locationAr: "قاعة الاحتفالات",
    locationEn: "Celebration Hall",
    organizerAr: "إدارة المدرسة",
    organizerEn: "School Administration",
    attendees: 150,
    descriptionAr:
      "تكريم الطلاب المتفوقين تقديرًا لجهودهم ونتائجهم الدراسية المتميزة.",
    descriptionEn:
      "Recognizing outstanding students in appreciation of their efforts and excellent academic results.",
    status: "مكتمل",
  },
];

export default function EventsPage() {
  const { language } = useLanguage();

  const t = content[language as keyof typeof content] || content.ar;

  const isArabic = language === "ar";

  const [events, setEvents] = useState<EventItem[]>(initialEvents);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] = useState("الكل");

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [form, setForm] = useState({
    titleAr: "",
    titleEn: "",
    type: "فعالية" as EventType,
    date: "",
    timeAr: "",
    timeEn: "",
    locationAr: "",
    locationEn: "",
    organizerAr: "",
    organizerEn: "",
    attendees: 0,
    descriptionAr: "",
    descriptionEn: "",
    status: "قادم" as EventStatus,
  });

  const getTypeLabel = (type: EventType) => {
    return t.types[type];
  };

  const getStatusLabel = (status: EventStatus) => {
    return t.statuses[status];
  };

  const getTitle = (event: EventItem) =>
    isArabic ? event.titleAr : event.titleEn;

  const getTime = (event: EventItem) =>
    isArabic ? event.timeAr : event.timeEn;

  const getLocation = (event: EventItem) =>
    isArabic ? event.locationAr : event.locationEn;

  const getOrganizer = (event: EventItem) =>
    isArabic ? event.organizerAr : event.organizerEn;

  const getDescription = (event: EventItem) =>
    isArabic ? event.descriptionAr : event.descriptionEn;

  const filteredEvents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return events.filter((event) => {
      const searchableText = [
        event.titleAr,
        event.titleEn,
        event.locationAr,
        event.locationEn,
        event.organizerAr,
        event.organizerEn,
        event.descriptionAr,
        event.descriptionEn,
        event.type,
        event.status,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchValue);

      const matchesType = typeFilter === "الكل" || event.type === typeFilter;

      const matchesStatus =
        statusFilter === "الكل" || event.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, search, typeFilter, statusFilter]);

  const totalEvents = events.length;

  const upcomingEvents = events.filter(
    (event) => event.status === "قادم",
  ).length;

  const completedEvents = events.filter(
    (event) => event.status === "مكتمل",
  ).length;

  const cancelledEvents = events.filter(
    (event) => event.status === "ملغي",
  ).length;

  const totalAttendees = events.reduce(
    (total, event) => total + Number(event.attendees || 0),
    0,
  );

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      titleAr: "",
      titleEn: "",
      type: "فعالية",
      date: "",
      timeAr: "",
      timeEn: "",
      locationAr: "",
      locationEn: "",
      organizerAr: "",
      organizerEn: "",
      attendees: 0,
      descriptionAr: "",
      descriptionEn: "",
      status: "قادم",
    });

    setModalOpen(true);
  };

  const openEditModal = (event: EventItem) => {
    setEditingId(event.id);

    setForm({
      titleAr: event.titleAr,
      titleEn: event.titleEn,
      type: event.type,
      date: event.date,
      timeAr: event.timeAr,
      timeEn: event.timeEn,
      locationAr: event.locationAr,
      locationEn: event.locationEn,
      organizerAr: event.organizerAr,
      organizerEn: event.organizerEn,
      attendees: event.attendees,
      descriptionAr: event.descriptionAr,
      descriptionEn: event.descriptionEn,
      status: event.status,
    });

    setModalOpen(true);
  };

  const openViewModal = (event: EventItem) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(t.modal.deleteConfirm);

    if (!confirmed) return;

    setEvents((current) => current.filter((event) => event.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentTitle = isArabic ? form.titleAr : form.titleEn;

    const currentTime = isArabic ? form.timeAr : form.timeEn;

    const currentLocation = isArabic ? form.locationAr : form.locationEn;

    if (!currentTitle.trim()) {
      alert(t.modal.requiredTitle);
      return;
    }

    if (!form.date) {
      alert(t.modal.requiredDate);
      return;
    }

    if (!currentTime.trim()) {
      alert(t.modal.requiredTime);
      return;
    }

    if (!currentLocation.trim()) {
      alert(t.modal.requiredLocation);
      return;
    }

    if (editingId !== null) {
      setEvents((current) =>
        current.map((event) =>
          event.id === editingId
            ? {
                ...event,
                ...form,
              }
            : event,
        ),
      );
    } else {
      const newEvent: EventItem = {
        id:
          events.length > 0
            ? Math.max(...events.map((event) => event.id)) + 1
            : 1,
        ...form,
      };

      setEvents((current) => [newEvent, ...current]);
    }

    setModalOpen(false);
    setEditingId(null);
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    const parsedDate = new Date(`${date}T00:00:00`);

    return parsedDate.toLocaleDateString(isArabic ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusStyle = (status: EventStatus) => {
    if (status === "قادم") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    if (status === "مكتمل") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    return "bg-red-50 text-red-700 border-red-200";
  };

  const getTypeStyle = (type: EventType) => {
    switch (type) {
      case "رحلة":
        return "bg-purple-50 text-purple-700";

      case "مسابقة":
        return "bg-orange-50 text-orange-700";

      case "احتفال":
        return "bg-pink-50 text-pink-700";

      case "اجتماع":
        return "bg-cyan-50 text-cyan-700";

      case "إعلان":
        return "bg-yellow-50 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col items-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B192C] text-white shadow-lg">
              <CalendarDays size={25} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {t.header.title}
            </h1>
          </div>

          <p className="text-sm text-slate-500">{t.header.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0B192C] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#142A45]"
        >
          <Plus size={20} />
          {t.header.add}
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CalendarDays size={22} />
            </div>

            <span className="text-sm text-slate-400">{t.stats.totalLabel}</span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">{totalEvents}</h3>

          <p className="mt-1 text-sm text-slate-500">{t.stats.total}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Clock3 size={22} />
            </div>

            <span className="text-sm text-slate-400">
              {t.stats.upcomingLabel}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">
            {upcomingEvents}
          </h3>

          <p className="mt-1 text-sm text-slate-500">{t.stats.upcoming}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={22} />
            </div>

            <span className="text-sm text-slate-400">
              {t.stats.completedLabel}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">
            {completedEvents}
          </h3>

          <p className="mt-1 text-sm text-slate-500">{t.stats.completed}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <CircleAlert size={22} />
            </div>

            <span className="text-sm text-slate-400">
              {t.stats.cancelledLabel}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">
            {cancelledEvents}
          </h3>

          <p className="mt-1 text-sm text-slate-500">{t.stats.cancelled}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users size={22} />
            </div>

            <span className="text-sm text-slate-400">
              {t.stats.attendeesLabel}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900">
            {totalAttendees.toLocaleString(isArabic ? "ar-EG" : "en-US")}
          </h3>

          <p className="mt-1 text-sm text-slate-500">{t.stats.attendees}</p>
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
              placeholder={t.filters.search}
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white ${
                isArabic ? "pr-12 pl-4" : "pl-12 pr-4"
              }`}
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">{t.filters.allTypes}</option>
            <option value="فعالية">{t.types.فعالية}</option>
            <option value="اجتماع">{t.types.اجتماع}</option>
            <option value="رحلة">{t.types.رحلة}</option>
            <option value="مسابقة">{t.types.مسابقة}</option>
            <option value="احتفال">{t.types.احتفال}</option>
            <option value="إعلان">{t.types.إعلان}</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">{t.filters.allStatuses}</option>
            <option value="قادم">{t.statuses.قادم}</option>
            <option value="مكتمل">{t.statuses.مكتمل}</option>
            <option value="ملغي">{t.statuses.ملغي}</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-[#0B192C] text-white">
              <tr>
                {[
                  t.table.event,
                  t.table.type,
                  t.table.date,
                  t.table.time,
                  t.table.location,
                  t.table.attendees,
                  t.table.status,
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`px-5 py-4 text-sm font-semibold ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {heading}
                  </th>
                ))}

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  {t.table.actions}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {getTitle(event)}
                        </p>

                        <p className="mt-1 max-w-[260px] truncate text-xs text-slate-500">
                          {getOrganizer(event)}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeStyle(
                          event.type,
                        )}`}
                      >
                        {getTypeLabel(event.type)}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(event.date)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {getTime(event)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={16} className="text-slate-400" />
                        {getLocation(event)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users size={16} className="text-slate-400" />
                        {event.attendees.toLocaleString(
                          isArabic ? "ar-EG" : "en-US",
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          event.status,
                        )}`}
                      >
                        {getStatusLabel(event.status)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openViewModal(event)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          title={t.actions.view}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(event)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                          title={t.actions.edit}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(event.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                          title={t.actions.delete}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <CalendarDays
                      size={45}
                      className="mx-auto mb-4 text-slate-300"
                    />

                    <p className="font-semibold text-slate-600">
                      {t.empty.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {t.empty.description}
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
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {getTitle(event)}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {getOrganizer(event)}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    event.status,
                  )}`}
                >
                  {getStatusLabel(event.status)}
                </span>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeStyle(
                    event.type,
                  )}`}
                >
                  {getTypeLabel(event.type)}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <CalendarDays size={17} className="text-slate-400" />
                  <span>{formatDate(event.date)}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Clock3 size={17} className="text-slate-400" />
                  <span>{getTime(event)}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin size={17} className="text-slate-400" />
                  <span>{getLocation(event)}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Users size={17} className="text-slate-400" />
                  <span>
                    {event.attendees.toLocaleString(
                      isArabic ? "ar-EG" : "en-US",
                    )}{" "}
                    {t.mobile.attendee}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => openViewModal(event)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-sm font-semibold text-blue-600"
                >
                  <Eye size={17} />
                  {t.actions.view}
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(event)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 py-2.5 text-sm font-semibold text-amber-600"
                >
                  <Pencil size={17} />
                  {t.actions.edit}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(event.id)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600"
                  title={t.actions.delete}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center">
            <CalendarDays size={45} className="mx-auto mb-4 text-slate-300" />

            <p className="font-semibold text-slate-600">{t.empty.title}</p>

            <p className="mt-1 text-sm text-slate-400">{t.empty.description}</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId !== null ? t.modal.editTitle : t.modal.addTitle}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {t.modal.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-7">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Arabic Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "اسم الحدث" : "Event Name (Arabic)"}
                  </label>

                  <input
                    type="text"
                    value={form.titleAr}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        titleAr: e.target.value,
                      })
                    }
                    placeholder="اسم الحدث بالعربية"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* English Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "اسم الحدث بالإنجليزية" : "Event Name"}
                  </label>

                  <input
                    type="text"
                    value={form.titleEn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        titleEn: e.target.value,
                      })
                    }
                    placeholder="Event name in English"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.modal.type}
                  </label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as EventType,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  >
                    <option value="فعالية">{t.types.فعالية}</option>
                    <option value="اجتماع">{t.types.اجتماع}</option>
                    <option value="رحلة">{t.types.رحلة}</option>
                    <option value="مسابقة">{t.types.مسابقة}</option>
                    <option value="احتفال">{t.types.احتفال}</option>
                    <option value="إعلان">{t.types.إعلان}</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.modal.status}
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as EventStatus,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  >
                    <option value="قادم">{t.statuses.قادم}</option>
                    <option value="مكتمل">{t.statuses.مكتمل}</option>
                    <option value="ملغي">{t.statuses.ملغي}</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.modal.date}
                  </label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>

                {/* Arabic Time */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "الوقت بالعربية" : "Time (Arabic)"}
                  </label>

                  <input
                    type="text"
                    value={form.timeAr}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        timeAr: e.target.value,
                      })
                    }
                    placeholder="مثال: 09:00 ص"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>

                {/* English Time */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "الوقت بالإنجليزية" : "Time"}
                  </label>

                  <input
                    type="text"
                    value={form.timeEn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        timeEn: e.target.value,
                      })
                    }
                    placeholder="Example: 09:00 AM"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>

                {/* Arabic Location */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "المكان بالعربية" : "Location (Arabic)"}
                  </label>

                  <input
                    type="text"
                    value={form.locationAr}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        locationAr: e.target.value,
                      })
                    }
                    placeholder="مثال: مسرح المدرسة"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>

                {/* English Location */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "المكان بالإنجليزية" : "Location"}
                  </label>

                  <input
                    type="text"
                    value={form.locationEn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        locationEn: e.target.value,
                      })
                    }
                    placeholder="Example: School Theater"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>

                {/* Arabic Organizer */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "منظم الحدث بالعربية" : "Organizer (Arabic)"}
                  </label>

                  <input
                    type="text"
                    value={form.organizerAr}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        organizerAr: e.target.value,
                      })
                    }
                    placeholder="مثال: إدارة المدرسة"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>

                {/* English Organizer */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "منظم الحدث بالإنجليزية" : "Organizer"}
                  </label>

                  <input
                    type="text"
                    value={form.organizerEn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        organizerEn: e.target.value,
                      })
                    }
                    placeholder="Example: School Administration"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>

                {/* Attendees */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.modal.attendees}
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={form.attendees}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        attendees: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
                  />
                </div>

                {/* Arabic Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "الوصف بالعربية" : "Description (Arabic)"}
                  </label>

                  <textarea
                    value={form.descriptionAr}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        descriptionAr: e.target.value,
                      })
                    }
                    rows={5}
                    placeholder="اكتبي وصف الحدث بالعربية..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white"
                  />
                </div>

                {/* English Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {isArabic ? "الوصف بالإنجليزية" : "Description"}
                  </label>

                  <textarea
                    value={form.descriptionEn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        descriptionEn: e.target.value,
                      })
                    }
                    rows={5}
                    placeholder="Write the event description in English..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:bg-white"
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  {t.modal.cancel}
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#0B192C] px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-[#142A45]"
                >
                  {editingId !== null ? t.modal.save : t.modal.add}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B192C] text-white">
                  <PartyPopper size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    {t.modal.viewTitle}
                  </h2>

                  <p className="text-xs text-slate-500">
                    {t.modal.viewSubtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="mb-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeStyle(
                      selectedEvent.type,
                    )}`}
                  >
                    {getTypeLabel(selectedEvent.type)}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      selectedEvent.status,
                    )}`}
                  >
                    {getStatusLabel(selectedEvent.status)}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {getTitle(selectedEvent)}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <CalendarDays size={18} />
                    <span className="text-xs">{t.modal.date}</span>
                  </div>

                  <p className="font-semibold text-slate-800">
                    {formatDate(selectedEvent.date)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Clock3 size={18} />
                    <span className="text-xs">{t.modal.time}</span>
                  </div>

                  <p className="font-semibold text-slate-800">
                    {getTime(selectedEvent)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <MapPin size={18} />
                    <span className="text-xs">{t.modal.location}</span>
                  </div>

                  <p className="font-semibold text-slate-800">
                    {getLocation(selectedEvent)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Users size={18} />
                    <span className="text-xs">{t.modal.attendees}</span>
                  </div>

                  <p className="font-semibold text-slate-800">
                    {selectedEvent.attendees.toLocaleString(
                      isArabic ? "ar-EG" : "en-US",
                    )}{" "}
                    {t.mobile.attendee}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="mb-2 text-xs text-slate-400">
                    {t.modal.organizerView}
                  </p>

                  <p className="font-semibold text-slate-800">
                    {getOrganizer(selectedEvent) || t.modal.notSpecified}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                <h4 className="mb-3 font-bold text-slate-900">
                  {t.modal.descriptionView}
                </h4>

                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                  {getDescription(selectedEvent) || t.modal.noDescription}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewModalOpen(false)}
                  className="rounded-xl bg-[#0B192C] px-7 py-3 font-semibold text-white"
                >
                  {t.modal.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
