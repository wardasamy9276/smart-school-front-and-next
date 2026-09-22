"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface School {
  id: number;

  name: string;
  name_ar: string | null;
  name_en: string | null;
  name_it: string | null;

  email: string | null;
  phone: string | null;

  address: string | null;
  address_ar: string | null;
  address_en: string | null;
  address_it: string | null;

  image: string | null;
}

interface SchoolDraft {
  tempId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: File | null;
  imagePreview: string | null;
  saving: boolean;
}

export default function SchoolsPage() {
  const { language } = useLanguage();

  const currentLanguage = String(language);

  const isArabic = currentLanguage === "ar";
  const isItalian = currentLanguage === "it";

  const API_URL = "http://localhost:8000/api";
  const STORAGE_URL = "http://localhost:8000/storage";

  // =========================
  // Translation
  // =========================

  const t = {
    loading: isArabic
      ? "جاري التحميل..."
      : isItalian
        ? "Caricamento..."
        : "Loading...",

    schools: isArabic ? "المدارس" : isItalian ? "Scuole" : "Schools",

    manageSchools: isArabic
      ? "إدارة المدارس"
      : isItalian
        ? "Gestione delle scuole"
        : "Manage schools",

    addSchool: isArabic
      ? "إضافة مدرسة"
      : isItalian
        ? "Aggiungi scuola"
        : "Add School",

    restoreSchool: isArabic
      ? "استعادة المدرسة"
      : isItalian
        ? "Ripristina scuola"
        : "Restore School",

    schoolImage: isArabic
      ? "صورة المدرسة"
      : isItalian
        ? "Immagine della scuola"
        : "School Image",

    addSchoolImage: isArabic
      ? "إضافة صورة المدرسة"
      : isItalian
        ? "Aggiungi immagine della scuola"
        : "Add School Image",

    changeImage: isArabic
      ? "تغيير الصورة"
      : isItalian
        ? "Cambia immagine"
        : "Change Image",

    schoolName: isArabic
      ? "اسم المدرسة"
      : isItalian
        ? "Nome della scuola"
        : "School Name",

    email: isArabic ? "البريد الإلكتروني" : "Email",

    phone: isArabic ? "الهاتف" : isItalian ? "Telefono" : "Phone",

    address: isArabic ? "العنوان" : isItalian ? "Indirizzo" : "Address",

    save: isArabic ? "حفظ" : isItalian ? "Salva" : "Save",

    saving: isArabic
      ? "جاري الحفظ..."
      : isItalian
        ? "Salvataggio..."
        : "Saving...",

    cancel: isArabic ? "إلغاء" : isItalian ? "Annulla" : "Cancel",

    edit: isArabic ? "تعديل" : isItalian ? "Modifica" : "Edit",

    hideSchool: isArabic
      ? "إخفاء المدرسة"
      : isItalian
        ? "Nascondi scuola"
        : "Hide School",

    noSchools: isArabic
      ? "لا توجد مدارس"
      : isItalian
        ? "Nessuna scuola trovata"
        : "No Schools Found",

    addFirstSchool: isArabic
      ? "اضغط على إضافة مدرسة لإضافة أول مدرسة."
      : isItalian
        ? "Fai clic su Aggiungi scuola per aggiungere la prima scuola."
        : "Click Add School to add your first school.",

    schoolRequired: isArabic
      ? "اسم المدرسة مطلوب"
      : isItalian
        ? "Il nome della scuola è obbligatorio"
        : "School name is required",

    addSuccess: isArabic
      ? "تمت إضافة المدرسة بنجاح"
      : isItalian
        ? "Scuola aggiunta con successo"
        : "School added successfully",

    editSuccess: isArabic
      ? "تم تعديل المدرسة بنجاح"
      : isItalian
        ? "Scuola modificata con successo"
        : "School updated successfully",

    fetchError: isArabic
      ? "حدث خطأ أثناء تحميل المدارس"
      : isItalian
        ? "Si è verificato un errore durante il caricamento delle scuole"
        : "Failed to fetch schools",

    addError: isArabic
      ? "حدث خطأ أثناء إضافة المدرسة"
      : isItalian
        ? "Si è verificato un errore أثناء إضافة المدرسة"
        : "An error occurred while adding the school",

    editError: isArabic
      ? "حدث خطأ أثناء تعديل المدرسة"
      : isItalian
        ? "Si è verificato un errore durante la modifica della scuola"
        : "An error occurred while editing the school",

    id: isArabic ? "رقم" : "ID",

    preview: isArabic ? "معاينة" : isItalian ? "Anteprima" : "Preview",
  };

  const direction = isArabic ? "rtl" : "ltr";

  // =========================
  // Translation Helpers
  // =========================

  const getSchoolName = (school: School) => {
    if (isArabic) {
      return school.name_ar || school.name;
    }

    if (isItalian) {
      return school.name_it || school.name;
    }

    return school.name_en || school.name;
  };

  const getSchoolAddress = (school: School) => {
    if (isArabic) {
      return school.address_ar || school.address;
    }

    if (isItalian) {
      return school.address_it || school.address;
    }

    return school.address_en || school.address;
  };

  // =========================
  // State
  // =========================

  const [schools, setSchools] = useState<School[]>([]);
  const [drafts, setDrafts] = useState<SchoolDraft[]>([]);
  const [hiddenSchools, setHiddenSchools] = useState<number[]>([]);

  const [editingSchoolId, setEditingSchoolId] = useState<number | null>(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Hidden Schools
  // =========================

  useEffect(() => {
    const saved = localStorage.getItem("hiddenSchools");

    if (saved) {
      try {
        setHiddenSchools(JSON.parse(saved));
      } catch {
        localStorage.removeItem("hiddenSchools");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hiddenSchools", JSON.stringify(hiddenSchools));
  }, [hiddenSchools]);

  // =========================
  // Restore
  // =========================

  const restoreSchool = (id: number) => {
    setHiddenSchools((prev) => prev.filter((schoolId) => schoolId !== id));
  };

  // =========================
  // Get Schools
  // =========================

  const getSchools = async () => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/schools`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || t.fetchError);
      }

      const schoolsData = Array.isArray(data) ? data : data?.data || [];

      setSchools(schoolsData);
    } catch (error) {
      console.error("GET SCHOOLS ERROR:", error);

      setError(error instanceof Error ? error.message : t.fetchError);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      await getSchools();

      setLoading(false);
    };

    load();
  }, [currentLanguage]);

  // =========================
  // ADD SCHOOL CARD
  // =========================

  const addSchoolCard = () => {
    setDrafts((prev) => [
      ...prev,
      {
        tempId: `${Date.now()}-${Math.random()}`,
        name: "",
        email: "",
        phone: "",
        address: "",
        image: null,
        imagePreview: null,
        saving: false,
      },
    ]);

    setError("");
  };

  // =========================
  // CHANGE DRAFT
  // =========================

  const handleDraftChange = (
    tempId: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setDrafts((prev) =>
      prev.map((draft) =>
        draft.tempId === tempId
          ? {
              ...draft,
              [name]: value,
            }
          : draft,
      ),
    );
  };

  // =========================
  // IMAGE
  // =========================

  const handleDraftImageChange = (
    tempId: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setDrafts((prev) =>
      prev.map((draft) => {
        if (draft.tempId !== tempId) {
          return draft;
        }

        if (draft.imagePreview) {
          URL.revokeObjectURL(draft.imagePreview);
        }

        return {
          ...draft,
          image: file,
          imagePreview: preview,
        };
      }),
    );
  };

  // =========================
  // DELETE NEW CARD
  // =========================

  const deleteDraft = (tempId: string) => {
    setDrafts((prev) => {
      const draft = prev.find((item) => item.tempId === tempId);

      if (draft?.imagePreview) {
        URL.revokeObjectURL(draft.imagePreview);
      }

      return prev.filter((item) => item.tempId !== tempId);
    });
  };

  // =========================
  // ADD SCHOOL
  // =========================

  const handleAddSchool = async (
    e: FormEvent<HTMLFormElement>,
    draft: SchoolDraft,
  ) => {
    e.preventDefault();

    if (!draft.name.trim()) {
      setError(t.schoolRequired);
      return;
    }

    try {
      setError("");

      setDrafts((prev) =>
        prev.map((item) =>
          item.tempId === draft.tempId
            ? {
                ...item,
                saving: true,
              }
            : item,
        ),
      );

      const formData = new FormData();

      formData.append("name", draft.name.trim());

      formData.append("email", draft.email.trim());

      formData.append("phone", draft.phone.trim());

      formData.append("address", draft.address.trim());

      if (draft.image) {
        formData.append("image", draft.image);
      }

      const response = await fetch(`${API_URL}/schools`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || t.addError);
      }

      if (data?.data) {
        setSchools((prev) => [data.data, ...prev]);
      } else {
        await getSchools();
      }

      setDrafts((prev) => prev.filter((item) => item.tempId !== draft.tempId));

      if (draft.imagePreview) {
        URL.revokeObjectURL(draft.imagePreview);
      }

      alert(t.addSuccess);
    } catch (error) {
      console.error("ADD SCHOOL ERROR:", error);

      setError(error instanceof Error ? error.message : t.addError);

      setDrafts((prev) =>
        prev.map((item) =>
          item.tempId === draft.tempId
            ? {
                ...item,
                saving: false,
              }
            : item,
        ),
      );
    }
  };

  // =========================
  // EDIT SCHOOL
  // =========================

  const startEditSchool = (school: School) => {
    setEditingSchoolId(school.id);

    setEditData({
      name:
        (isArabic
          ? school.name_ar
          : isItalian
            ? school.name_it
            : school.name_en) ||
        school.name ||
        "",

      email: school.email || "",

      phone: school.phone || "",

      address:
        (isArabic
          ? school.address_ar
          : isItalian
            ? school.address_it
            : school.address_en) ||
        school.address ||
        "",
    });

    setError("");
  };

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cancelEdit = () => {
    setEditingSchoolId(null);

    setEditData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    setError("");
  };

  const saveEditSchool = async (id: number) => {
    if (!editData.name.trim()) {
      setError(t.schoolRequired);
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/schools/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editData.name.trim(),
          email: editData.email.trim(),
          phone: editData.phone.trim(),
          address: editData.address.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || t.editError);
      }

      const updatedSchool = data?.data || data;

      setSchools((prev) =>
        prev.map((school) =>
          school.id === id
            ? {
                ...school,
                ...updatedSchool,
              }
            : school,
        ),
      );

      setEditingSchoolId(null);

      setEditData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      alert(t.editSuccess);
    } catch (error) {
      console.error("EDIT SCHOOL ERROR:", error);

      setError(error instanceof Error ? error.message : t.editError);
    }
  };

  // =========================
  // HIDE SCHOOL
  // =========================

  const deleteSchool = (id: number) => {
    setHiddenSchools((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // =========================
  // IMAGE URL
  // =========================

  const getImageUrl = (image: string | null) => {
    if (!image) {
      return null;
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${STORAGE_URL}/${image}`;
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        dir={direction}
        className="min-h-screen flex items-center justify-center"
      >
        <p className="text-gray-400">{t.loading}</p>
      </div>
    );
  }

  const visibleSchools = schools.filter(
    (school) => !hiddenSchools.includes(school.id),
  );

  return (
    <div dir={direction} className="min-h-screen">
      {/* =========================
          RESTORE
      ========================= */}

      {hiddenSchools.length > 0 && (
        <button
          type="button"
          onClick={() => {
            const id = hiddenSchools[hiddenSchools.length - 1];

            restoreSchool(id);
          }}
          className="
            flex items-center gap-2
            bg-[#1e2536]
            hover:bg-[#2a3348]
            text-white
            font-bold
            px-4 py-2.5
            rounded-xl
            transition
            mb-4
            text-sm
          "
        >
          ↩ {t.restoreSchool}
        </button>
      )}

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{t.schools}</h1>

          <p className="text-gray-400 mt-1 text-sm">{t.manageSchools}</p>
        </div>

        <button
          type="button"
          onClick={addSchoolCard}
          className="
            flex items-center gap-2
            bg-[#9E7C2F]
            hover:bg-[#b58d36]
            text-black
            font-bold
            px-4 py-2.5
            rounded-xl
            transition
            text-sm
          "
        >
          <span className="text-lg">+</span>

          {t.addSchool}
        </button>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div
          className="
            bg-red-500/10
            border border-red-500/30
            text-red-400
            p-3
            rounded-xl
            mb-5
            text-sm
          "
        >
          {error}
        </div>
      )}

      {/* =========================
          GRID
      ========================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-4
        "
      >
        {/* =========================
            NEW SCHOOL CARDS
        ========================= */}

        {drafts.map((draft) => (
          <form
            key={draft.tempId}
            onSubmit={(e) => handleAddSchool(e, draft)}
            className="
              bg-[#121622]
              border border-[#9E7C2F]
              rounded-xl
              overflow-hidden
              shadow-lg
            "
          >
            <div
              className="
                h-32
                bg-[#181e2b]
                flex items-center justify-center
                overflow-hidden
                relative
              "
            >
              {draft.imagePreview ? (
                <img
                  src={draft.imagePreview}
                  alt={t.preview}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              ) : (
                <label
                  htmlFor={`school-image-${draft.tempId}`}
                  className="
                    cursor-pointer
                    flex flex-col
                    items-center justify-center
                    w-full
                    h-full
                    text-gray-400
                    hover:text-white
                  "
                >
                  <span className="text-4xl mb-1">📷</span>

                  <span className="text-xs">{t.addSchoolImage}</span>
                </label>
              )}

              <input
                id={`school-image-${draft.tempId}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleDraftImageChange(draft.tempId, e)}
                className="hidden"
              />

              {draft.imagePreview && (
                <label
                  htmlFor={`school-image-${draft.tempId}`}
                  className="
                    absolute bottom-2 right-2
                    bg-black/70
                    text-white
                    px-2.5
                    py-1.5
                    rounded-lg
                    cursor-pointer
                    text-[11px]
                  "
                >
                  {t.changeImage}
                </label>
              )}
            </div>

            <div className="p-3">
              <input
                type="text"
                name="name"
                value={draft.name}
                onChange={(e) => handleDraftChange(draft.tempId, e)}
                placeholder={t.schoolName}
                className="
                  w-full
                  bg-[#181e2b]
                  border border-[#1e2536]
                  rounded-lg
                  px-3 py-2
                  text-white
                  text-sm
                  outline-none
                  focus:border-[#9E7C2F]
                  mb-2
                "
              />

              <input
                type="email"
                name="email"
                value={draft.email}
                onChange={(e) => handleDraftChange(draft.tempId, e)}
                placeholder={t.email}
                className="
                  w-full
                  bg-[#181e2b]
                  border border-[#1e2536]
                  rounded-lg
                  px-3 py-2
                  text-white
                  text-sm
                  outline-none
                  focus:border-[#9E7C2F]
                  mb-2
                "
              />

              <input
                type="text"
                name="phone"
                value={draft.phone}
                onChange={(e) => handleDraftChange(draft.tempId, e)}
                placeholder={t.phone}
                className="
                  w-full
                  bg-[#181e2b]
                  border border-[#1e2536]
                  rounded-lg
                  px-3 py-2
                  text-white
                  text-sm
                  outline-none
                  focus:border-[#9E7C2F]
                  mb-2
                "
              />

              <textarea
                name="address"
                value={draft.address}
                onChange={(e) => handleDraftChange(draft.tempId, e)}
                placeholder={t.address}
                rows={2}
                className="
                  w-full
                  bg-[#181e2b]
                  border border-[#1e2536]
                  rounded-lg
                  px-3 py-2
                  text-white
                  text-sm
                  outline-none
                  focus:border-[#9E7C2F]
                  resize-none
                  mb-3
                "
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={draft.saving}
                  className="
                    flex-1
                    bg-[#9E7C2F]
                    hover:bg-[#b58d36]
                    text-black
                    font-bold
                    py-2
                    rounded-lg
                    transition
                    disabled:opacity-50
                    text-sm
                  "
                >
                  {draft.saving ? t.saving : t.save}
                </button>

                <button
                  type="button"
                  onClick={() => deleteDraft(draft.tempId)}
                  disabled={draft.saving}
                  className="
                    w-10
                    flex items-center justify-center
                    bg-red-500/10
                    border border-red-500/20
                    text-red-500
                    hover:bg-red-500/20
                    rounded-lg
                  "
                  title={t.cancel}
                >
                  🗑️
                </button>
              </div>
            </div>
          </form>
        ))}

        {/* =========================
            EXISTING SCHOOLS
        ========================= */}

        {visibleSchools.map((school) => (
          <div
            key={school.id}
            className="
                bg-[#121622]
                border border-[#1e2536]
                rounded-xl
                overflow-hidden
                hover:border-[#9E7C2F]
                transition
                group
              "
          >
            {/* IMAGE */}

            <div
              className="
                  h-32
                  bg-[#181e2b]
                  flex items-center justify-center
                  overflow-hidden
                "
            >
              {school.image ? (
                <img
                  src={getImageUrl(school.image) || ""}
                  alt={getSchoolName(school)}
                  className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-300
                    "
                />
              ) : (
                <div className="text-5xl">🏫</div>
              )}
            </div>

            {/* NORMAL / EDIT MODE */}

            <div className="p-3">
              {editingSchoolId === school.id ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder={t.schoolName}
                    className="
                        w-full
                        bg-[#181e2b]
                        border border-[#9E7C2F]
                        rounded-lg
                        px-3 py-2
                        text-white
                        text-sm
                        outline-none
                        mb-2
                      "
                  />

                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    placeholder={t.email}
                    className="
                        w-full
                        bg-[#181e2b]
                        border border-[#1e2536]
                        rounded-lg
                        px-3 py-2
                        text-white
                        text-sm
                        outline-none
                        mb-2
                      "
                  />

                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleEditChange}
                    placeholder={t.phone}
                    className="
                        w-full
                        bg-[#181e2b]
                        border border-[#1e2536]
                        rounded-lg
                        px-3 py-2
                        text-white
                        text-sm
                        outline-none
                        mb-2
                      "
                  />

                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleEditChange}
                    placeholder={t.address}
                    rows={2}
                    className="
                        w-full
                        bg-[#181e2b]
                        border border-[#1e2536]
                        rounded-lg
                        px-3 py-2
                        text-white
                        text-sm
                        outline-none
                        resize-none
                        mb-3
                      "
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveEditSchool(school.id)}
                      className="
                          flex-1
                          bg-[#9E7C2F]
                          hover:bg-[#b58d36]
                          text-black
                          font-bold
                          py-2
                          rounded-lg
                          text-sm
                        "
                    >
                      {t.save}
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="
                          flex-1
                          bg-[#1e2536]
                          hover:bg-[#2a3348]
                          text-white
                          font-bold
                          py-2
                          rounded-lg
                          text-sm
                        "
                    >
                      {t.cancel}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2
                    className="
                        text-base
                        font-bold
                        text-white
                        line-clamp-1
                      "
                  >
                    {getSchoolName(school)}
                  </h2>

                  <p className="text-gray-500 text-[11px] mt-1">
                    {t.id} #{school.id}
                  </p>

                  <div className="mt-3 space-y-1.5">
                    {school.email && (
                      <p className="text-gray-400 text-xs truncate">
                        ✉️ {school.email}
                      </p>
                    )}

                    {school.phone && (
                      <p className="text-gray-400 text-xs">📞 {school.phone}</p>
                    )}

                    {getSchoolAddress(school) && (
                      <p className="text-gray-400 text-xs truncate">
                        📍 {getSchoolAddress(school)}
                      </p>
                    )}
                  </div>

                  {/* ACTIONS */}

                  <div
                    className="
                        flex items-center justify-between
                        mt-4 pt-3
                        border-t border-[#1e2536]
                      "
                  >
                    <button
                      type="button"
                      onClick={() => startEditSchool(school)}
                      className="
                          text-blue-400
                          hover:text-blue-300
                          text-xs
                          font-medium
                        "
                    >
                      {t.edit}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteSchool(school.id)}
                      className="
                          p-1.5
                          rounded-lg
                          text-red-500
                          hover:bg-red-500/10
                          hover:text-red-400
                          transition
                        "
                      title={t.hideSchool}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="
                              M6 7h12
                              M9 7V5
                              a1 1 0 0 1 1-1h4
                              a1 1 0 0 1 1 1v2
                              m2 0v12
                              a2 2 0 0 1-2 2H9
                              a2 2 0 0 1-2-2V7
                              m3 4v6
                              m4-6v6
                            "
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* =========================
          EMPTY
      ========================= */}

      {visibleSchools.length === 0 && drafts.length === 0 && (
        <div
          className="
              bg-[#121622]
              border border-[#1e2536]
              rounded-xl
              p-8
              text-center
              mt-4
            "
        >
          <div className="text-4xl mb-3">🏫</div>

          <p className="text-gray-300 text-base">{t.noSchools}</p>

          <p className="text-gray-500 text-sm mt-1">{t.addFirstSchool}</p>

          <button
            type="button"
            onClick={addSchoolCard}
            className="
                mt-5
                bg-[#9E7C2F]
                hover:bg-[#b58d36]
                text-black
                font-bold
                px-4 py-2.5
                rounded-xl
                text-sm
              "
          >
            + {t.addSchool}
          </button>
        </div>
      )}
    </div>
  );
}
