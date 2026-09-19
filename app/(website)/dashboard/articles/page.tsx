"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  Newspaper,
  FileText,
  UserRound,
  CalendarDays,
  Image as ImageIcon,
  CheckCircle2,
  Clock3,
  Tag,
} from "lucide-react";

type ArticleCategory = "أخبار" | "مقالات" | "إعلانات";
type ArticleStatus = "منشور" | "مسودة";

interface Article {
  id: number;

  titleAr: string;
  titleEn: string;

  category: ArticleCategory;

  authorAr: string;
  authorEn: string;

  date: string;

  status: ArticleStatus;

  image: string;

  excerptAr: string;
  excerptEn: string;

  contentAr: string;
  contentEn: string;

  views: number;
}

const initialArticles: Article[] = [
  {
    id: 1,

    titleAr: "بدء العام الدراسي الجديد",
    titleEn: "The Start of the New Academic Year",

    category: "أخبار",

    authorAr: "إدارة المدرسة",
    authorEn: "School Administration",

    date: "2026-09-01",

    status: "منشور",

    image: "/assets/school-news.jpg",

    excerptAr:
      "تعلن إدارة المدرسة عن بدء العام الدراسي الجديد واستقبال جميع الطلاب.",
    excerptEn:
      "The school administration announces the start of the new academic year and welcomes all students.",

    contentAr:
      "تعلن إدارة المدرسة عن بدء العام الدراسي الجديد، ونتمنى لجميع أبنائنا الطلاب عامًا دراسيًا ناجحًا ومليئًا بالتميز والتفوق.",
    contentEn:
      "The school administration announces the start of the new academic year. We wish all our students a successful academic year filled with excellence and achievement.",

    views: 1250,
  },

  {
    id: 2,

    titleAr: "تكريم الطلاب المتفوقين",
    titleEn: "Honoring Outstanding Students",

    category: "أخبار",

    authorAr: "إدارة المدرسة",
    authorEn: "School Administration",

    date: "2026-08-25",

    status: "منشور",

    image: "/assets/top-students.jpg",

    excerptAr:
      "احتفلت المدرسة بالطلاب المتفوقين تقديرًا لجهودهم ونجاحهم الدراسي.",
    excerptEn:
      "The school celebrated outstanding students in recognition of their efforts and academic success.",

    contentAr:
      "في إطار اهتمام المدرسة بتشجيع التفوق، تم تكريم مجموعة من الطلاب المتفوقين تقديرًا لما بذلوه من جهد طوال العام الدراسي.",
    contentEn:
      "As part of the school's commitment to encouraging excellence, a group of outstanding students were honored in recognition of their hard work throughout the academic year.",

    views: 980,
  },

  {
    id: 3,

    titleAr: "أهمية التكنولوجيا في التعليم",
    titleEn: "The Importance of Technology in Education",

    category: "مقالات",

    authorAr: "أحمد محمد علي",
    authorEn: "Ahmed Mohamed Ali",

    date: "2026-08-20",

    status: "منشور",

    image: "/assets/technology.jpg",

    excerptAr: "أصبحت التكنولوجيا جزءًا أساسيًا من العملية التعليمية الحديثة.",
    excerptEn:
      "Technology has become an essential part of the modern educational process.",

    contentAr:
      "تلعب التكنولوجيا دورًا مهمًا في تطوير العملية التعليمية، حيث تساعد الطلاب على الوصول إلى المعلومات بطريقة أسرع وأكثر تفاعلية.",
    contentEn:
      "Technology plays an important role in developing the educational process, helping students access information faster and in a more interactive way.",

    views: 760,
  },

  {
    id: 4,

    titleAr: "موعد الأنشطة الرياضية",
    titleEn: "Sports Activities Schedule",

    category: "إعلانات",

    authorAr: "قسم الأنشطة",
    authorEn: "Activities Department",

    date: "2026-08-15",

    status: "منشور",

    image: "/assets/sports.jpg",

    excerptAr:
      "تعلن المدرسة عن جدول الأنشطة الرياضية للطلاب خلال الفصل الدراسي.",
    excerptEn:
      "The school announces the sports activities schedule for students during the academic term.",

    contentAr:
      "يعلن قسم الأنشطة الرياضية عن بدء مجموعة من الأنشطة الرياضية المختلفة، ويمكن للطلاب التسجيل من خلال إدارة النشاط.",
    contentEn:
      "The Sports Activities Department announces the start of various sports activities. Students can register through the Activities Department.",

    views: 620,
  },

  {
    id: 5,

    titleAr: "نصائح للطلاب قبل الامتحانات",
    titleEn: "Tips for Students Before Exams",

    category: "مقالات",

    authorAr: "قسم التعليم",
    authorEn: "Education Department",

    date: "2026-08-10",

    status: "مسودة",

    image: "/assets/exams.jpg",

    excerptAr:
      "مجموعة من النصائح المهمة التي تساعد الطلاب على الاستعداد للامتحانات.",
    excerptEn:
      "A collection of important tips to help students prepare for exams.",

    contentAr:
      "الاستعداد الجيد للامتحانات يحتاج إلى تنظيم الوقت والمراجعة المستمرة والحصول على قسط كافٍ من النوم.",
    contentEn:
      "Good exam preparation requires time management, continuous revision, and getting enough sleep.",

    views: 0,
  },

  {
    id: 6,

    titleAr: "رحلة مدرسية تعليمية",
    titleEn: "Educational School Trip",

    category: "أخبار",

    authorAr: "إدارة المدرسة",
    authorEn: "School Administration",

    date: "2026-08-05",

    status: "منشور",

    image: "/assets/trip.jpg",

    excerptAr:
      "نظمت المدرسة رحلة تعليمية للطلاب بهدف الجمع بين التعليم والترفيه.",
    excerptEn:
      "The school organized an educational trip for students to combine learning and entertainment.",

    contentAr:
      "نظمت المدرسة رحلة تعليمية مميزة شارك فيها عدد كبير من الطلاب، بهدف تنمية مهاراتهم وتعزيز روح التعاون بينهم.",
    contentEn:
      "The school organized an educational trip attended by a large number of students, aiming to develop their skills and promote teamwork among them.",

    views: 540,
  },
];

export default function ArticlesPage() {
  const { language } = useLanguage();

  const isArabic = language === "ar";

  const t = (ar: string, en: string) => (isArabic ? ar : en);

  const [articles, setArticles] = useState<Article[]>(initialArticles);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState<
    ArticleCategory | "الكل"
  >("الكل");

  const [statusFilter, setStatusFilter] = useState<ArticleStatus | "الكل">(
    "الكل",
  );

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "أخبار" as ArticleCategory,
    author: "",
    date: new Date().toISOString().split("T")[0],
    status: "مسودة" as ArticleStatus,
    image: "",
    excerpt: "",
    content: "",
    views: 0,
  });

  const getTitle = (article: Article) =>
    isArabic ? article.titleAr : article.titleEn;

  const getAuthor = (article: Article) =>
    isArabic ? article.authorAr : article.authorEn;

  const getExcerpt = (article: Article) =>
    isArabic ? article.excerptAr : article.excerptEn;

  const getContent = (article: Article) =>
    isArabic ? article.contentAr : article.contentEn;

  const getCategory = (category: ArticleCategory) => {
    if (category === "أخبار") {
      return t("أخبار", "News");
    }

    if (category === "مقالات") {
      return t("مقالات", "Articles");
    }

    return t("إعلانات", "Announcements");
  };

  const getStatus = (status: ArticleStatus) => {
    return status === "منشور" ? t("منشور", "Published") : t("مسودة", "Draft");
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        article.titleAr.toLowerCase().includes(searchValue) ||
        article.titleEn.toLowerCase().includes(searchValue) ||
        article.authorAr.toLowerCase().includes(searchValue) ||
        article.authorEn.toLowerCase().includes(searchValue) ||
        article.excerptAr.toLowerCase().includes(searchValue) ||
        article.excerptEn.toLowerCase().includes(searchValue) ||
        article.contentAr.toLowerCase().includes(searchValue) ||
        article.contentEn.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "الكل" || article.category === categoryFilter;

      const matchesStatus =
        statusFilter === "الكل" || article.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [articles, search, categoryFilter, statusFilter]);

  const totalArticles = articles.length;

  const publishedArticles = articles.filter(
    (article) => article.status === "منشور",
  ).length;

  const draftArticles = articles.filter(
    (article) => article.status === "مسودة",
  ).length;

  const totalViews = articles.reduce(
    (total, article) => total + article.views,
    0,
  );

  const openAddModal = () => {
    setEditingArticle(null);

    setFormData({
      title: "",
      category: "أخبار",
      author: isArabic ? "إدارة المدرسة" : "School Administration",
      date: new Date().toISOString().split("T")[0],
      status: "مسودة",
      image: "",
      excerpt: "",
      content: "",
      views: 0,
    });

    setShowModal(true);
  };

  const openEditModal = (article: Article) => {
    setEditingArticle(article);

    setFormData({
      title: isArabic ? article.titleAr : article.titleEn,
      category: article.category,
      author: isArabic ? article.authorAr : article.authorEn,
      date: article.date,
      status: article.status,
      image: article.image,
      excerpt: isArabic ? article.excerptAr : article.excerptEn,
      content: isArabic ? article.contentAr : article.contentEn,
      views: article.views,
    });

    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert(
        t(
          "من فضلك اكتب عنوان الخبر أو المقال",
          "Please enter the article or news title.",
        ),
      );
      return;
    }

    if (!formData.author.trim()) {
      alert(t("من فضلك اكتب اسم الكاتب", "Please enter the author's name."));
      return;
    }

    if (!formData.excerpt.trim()) {
      alert(
        t("من فضلك اكتب وصفًا مختصرًا", "Please enter a short description."),
      );
      return;
    }

    if (!formData.content.trim()) {
      alert(
        t(
          "من فضلك اكتب محتوى الخبر أو المقال",
          "Please enter the article or news content.",
        ),
      );
      return;
    }

    if (editingArticle) {
      setArticles((prev) =>
        prev.map((article) => {
          if (article.id !== editingArticle.id) {
            return article;
          }

          return {
            ...article,

            ...(isArabic
              ? {
                  titleAr: formData.title,
                  authorAr: formData.author,
                  excerptAr: formData.excerpt,
                  contentAr: formData.content,
                }
              : {
                  titleEn: formData.title,
                  authorEn: formData.author,
                  excerptEn: formData.excerpt,
                  contentEn: formData.content,
                }),

            category: formData.category,
            date: formData.date,
            status: formData.status,
            image: formData.image,
            views: formData.views,
          };
        }),
      );
    } else {
      const newArticle: Article = {
        id: Date.now(),

        titleAr: isArabic ? formData.title : formData.title,
        titleEn: isArabic ? formData.title : formData.title,

        category: formData.category,

        authorAr: isArabic ? formData.author : formData.author,
        authorEn: isArabic ? formData.author : formData.author,

        date: formData.date,

        status: formData.status,

        image: formData.image,

        excerptAr: isArabic ? formData.excerpt : formData.excerpt,
        excerptEn: isArabic ? formData.excerpt : formData.excerpt,

        contentAr: isArabic ? formData.content : formData.content,
        contentEn: isArabic ? formData.content : formData.content,

        views: formData.views,
      };

      setArticles((prev) => [newArticle, ...prev]);
    }

    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    const article = articles.find((item) => item.id === id);

    if (!article) return;

    const confirmed = window.confirm(
      t(
        `هل أنت متأكد من حذف "${article.titleAr}"؟`,
        `Are you sure you want to delete "${article.titleEn}"?`,
      ),
    );

    if (!confirmed) return;

    setArticles((prev) => prev.filter((item) => item.id !== id));
  };

  const openViewModal = (article: Article) => {
    setSelectedArticle(article);
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
              <Newspaper size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {t("الأخبار والمقالات", "News & Articles")}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {t(
                  "إدارة أخبار المدرسة والمقالات والإعلانات",
                  "Manage school news, articles, and announcements",
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

          {t("إضافة خبر أو مقال", "Add News or Article")}
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {t("إجمالي المحتوى", "Total Content")}
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {totalArticles}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Newspaper size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {t("منشور", "Published")}
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {publishedArticles}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{t("مسودات", "Drafts")}</p>

              <p className="mt-2 text-3xl font-bold text-amber-600">
                {draftArticles}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {t("إجمالي المشاهدات", "Total Views")}
              </p>

              <p className="mt-2 text-3xl font-bold text-purple-600">
                {totalViews.toLocaleString(isArabic ? "ar-EG" : "en-US")}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Eye size={24} />
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
                "ابحث عن خبر أو مقال...",
                "Search for news or article...",
              )}
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm outline-none transition focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10 ${
                isArabic ? "pr-11 pl-4" : "pl-11 pr-4"
              }`}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as ArticleCategory | "الكل")
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">{t("كل التصنيفات", "All Categories")}</option>

            <option value="أخبار">{t("أخبار", "News")}</option>

            <option value="مقالات">{t("مقالات", "Articles")}</option>

            <option value="إعلانات">{t("إعلانات", "Announcements")}</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ArticleStatus | "الكل")
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0B192C]"
          >
            <option value="الكل">{t("كل الحالات", "All Statuses")}</option>

            <option value="منشور">{t("منشور", "Published")}</option>

            <option value="مسودة">{t("مسودة", "Draft")}</option>
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
                  className={`px-5 py-4 text-sm font-bold text-slate-700 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {t("الخبر / المقال", "News / Article")}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-bold text-slate-700 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {t("التصنيف", "Category")}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-bold text-slate-700 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {t("الكاتب", "Author")}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-bold text-slate-700 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {t("التاريخ", "Date")}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-bold text-slate-700 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {t("المشاهدات", "Views")}
                </th>

                <th
                  className={`px-5 py-4 text-sm font-bold text-slate-700 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {t("الحالة", "Status")}
                </th>

                <th className="px-5 py-4 text-center text-sm font-bold text-slate-700">
                  {t("الإجراءات", "Actions")}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-slate-400">
                          <ImageIcon size={22} />
                        </div>

                        <div className="max-w-[350px]">
                          <p className="font-bold text-slate-900">
                            {getTitle(article)}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-400">
                            {getExcerpt(article)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          article.category === "أخبار"
                            ? "bg-blue-100 text-blue-700"
                            : article.category === "مقالات"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {getCategory(article.category)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                          <UserRound size={17} />
                        </div>

                        <span className="text-sm font-semibold text-slate-700">
                          {getAuthor(article)}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays size={16} className="text-slate-400" />

                        {article.date}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-slate-700">
                        {article.views.toLocaleString(
                          isArabic ? "ar-EG" : "en-US",
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          article.status === "منشور"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {getStatus(article.status)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openViewModal(article)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          title={t("عرض", "View")}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(article)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                          title={t("تعديل", "Edit")}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(article.id)}
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
                    colSpan={7}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    {t(
                      "لا توجد أخبار أو مقالات مطابقة للبحث.",
                      "No news or articles match your search.",
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="flex h-44 items-center justify-center bg-slate-100 text-slate-400">
                <ImageIcon size={40} />
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      article.category === "أخبار"
                        ? "bg-blue-100 text-blue-700"
                        : article.category === "مقالات"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {getCategory(article.category)}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      article.status === "منشور"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {getStatus(article.status)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {getTitle(article)}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {getExcerpt(article)}
                </p>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <UserRound size={16} />

                    {getAuthor(article)}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />

                    {article.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Eye size={16} />

                    {article.views.toLocaleString(isArabic ? "ar-EG" : "en-US")}

                    {t(" مشاهدة", " views")}
                  </div>
                </div>

                <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => openViewModal(article)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-sm font-semibold text-blue-600"
                  >
                    <Eye size={17} />

                    {t("عرض", "View")}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditModal(article)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 py-2.5 text-sm font-semibold text-amber-600"
                  >
                    <Pencil size={17} />

                    {t("تعديل", "Edit")}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(article.id)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600"
                    title={t("حذف", "Delete")}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-500 shadow-sm">
            {t(
              "لا توجد أخبار أو مقالات مطابقة للبحث.",
              "No news or articles match your search.",
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingArticle
                    ? t("تعديل الخبر أو المقال", "Edit News or Article")
                    : t("إضافة خبر أو مقال", "Add News or Article")}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {t("أدخل بيانات المحتوى", "Enter content information")}
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
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("عنوان الخبر أو المقال", "News or Article Title")}
                  </label>

                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    placeholder={t(
                      "اكتب العنوان هنا...",
                      "Enter the title here...",
                    )}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("التصنيف", "Category")}
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as ArticleCategory,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C]"
                  >
                    <option value="أخبار">{t("أخبار", "News")}</option>

                    <option value="مقالات">{t("مقالات", "Articles")}</option>

                    <option value="إعلانات">
                      {t("إعلانات", "Announcements")}
                    </option>
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("الكاتب", "Author")}
                  </label>

                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: e.target.value,
                      })
                    }
                    placeholder={t("اسم الكاتب", "Author name")}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("تاريخ النشر", "Publication Date")}
                  </label>

                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C]"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("الحالة", "Status")}
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as ArticleStatus,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C]"
                  >
                    <option value="منشور">{t("منشور", "Published")}</option>

                    <option value="مسودة">{t("مسودة", "Draft")}</option>
                  </select>
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("مسار صورة المقال", "Article Image Path")}
                  </label>

                  <div className="relative">
                    <ImageIcon
                      size={19}
                      className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${
                        isArabic ? "right-4" : "left-4"
                      }`}
                    />

                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          image: e.target.value,
                        })
                      }
                      placeholder="/assets/news.jpg"
                      className={`w-full rounded-xl border border-slate-200 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10 ${
                        isArabic ? "pr-11 pl-4" : "pl-11 pr-4"
                      }`}
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("الوصف المختصر", "Short Description")}
                  </label>

                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        excerpt: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder={t(
                      "اكتب وصفًا مختصرًا يظهر في الكارت...",
                      "Enter a short description that appears on the card...",
                    )}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("محتوى الخبر أو المقال", "News or Article Content")}
                  </label>

                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: e.target.value,
                      })
                    }
                    rows={7}
                    placeholder={t(
                      "اكتب محتوى الخبر أو المقال كاملًا...",
                      "Enter the full news or article content...",
                    )}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 leading-7 outline-none focus:border-[#0B192C] focus:ring-2 focus:ring-[#0B192C]/10"
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

                  {editingArticle
                    ? t("حفظ التعديلات", "Save Changes")
                    : t("إضافة المحتوى", "Add Content")}
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
      {showViewModal && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      selectedArticle.category === "أخبار"
                        ? "bg-blue-100 text-blue-700"
                        : selectedArticle.category === "مقالات"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {getCategory(selectedArticle.category)}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      selectedArticle.status === "منشور"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {getStatus(selectedArticle.status)}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {getTitle(selectedArticle)}
                </h2>
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
              {/* Image Placeholder */}
              <div className="mb-6 flex h-56 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <ImageIcon size={50} />
              </div>

              {/* Info */}
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {t("الكاتب", "Author")}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                    <UserRound size={16} />

                    {getAuthor(selectedArticle)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {t("التاريخ", "Date")}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                    <CalendarDays size={16} />

                    {selectedArticle.date}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    {t("المشاهدات", "Views")}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Eye size={16} />

                    {selectedArticle.views.toLocaleString(
                      isArabic ? "ar-EG" : "en-US",
                    )}
                  </p>
                </div>
              </div>

              {/* Excerpt */}
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2">
                  <Tag size={18} className="text-[#0B192C]" />

                  <h3 className="font-bold text-slate-900">
                    {t("الملخص", "Summary")}
                  </h3>
                </div>

                <p className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                  {getExcerpt(selectedArticle)}
                </p>
              </div>

              {/* Content */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <FileText size={18} className="text-[#0B192C]" />

                  <h3 className="font-bold text-slate-900">
                    {t("المحتوى", "Content")}
                  </h3>
                </div>

                <p className="rounded-xl bg-slate-50 p-5 text-sm leading-8 text-slate-700">
                  {getContent(selectedArticle)}
                </p>
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
