// "use client";

// import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import Link from "next/link";

// interface School {
//   id: number;
//   name: string;
//   email: string | null;
//   phone: string | null;
//   address: string | null;
//   image: string | null;
// }

// interface SchoolDraft {
//   tempId: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   image: File | null;
//   imagePreview: string | null;
//   saving: boolean;
// }

// export default function SchoolsPage() {
//   const API_URL = "http://localhost:8000/api";
//   const STORAGE_URL = "http://localhost:8000/storage";

//   const [schools, setSchools] = useState<School[]>([]);
//   const [drafts, setDrafts] = useState<SchoolDraft[]>([]);
//   const [hiddenSchools, setHiddenSchools] = useState<number[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // =========================
//   // Load Hidden Schools
//   // =========================

//   useEffect(() => {
//     const saved = localStorage.getItem("hiddenSchools");

//     if (saved) {
//       try {
//         setHiddenSchools(JSON.parse(saved));
//       } catch {
//         localStorage.removeItem("hiddenSchools");
//       }
//     }
//   }, []);

//   // =========================
//   // Restore School
//   // =========================

//   const restoreSchool = (id: number) => {
//     setHiddenSchools((prev) => prev.filter((schoolId) => schoolId !== id));
//   };

//   // =========================
//   // Save Hidden Schools
//   // =========================

//   useEffect(() => {
//     localStorage.setItem("hiddenSchools", JSON.stringify(hiddenSchools));
//   }, [hiddenSchools]);

//   // =========================
//   // Get Schools
//   // =========================

//   const getSchools = async () => {
//     try {
//       setError("");

//       const response = await fetch(`${API_URL}/schools`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//         cache: "no-store",
//       });

//       const data = await response.json().catch(() => null);

//       if (!response.ok) {
//         throw new Error(data?.message || "Failed to fetch schools");
//       }

//       const schoolsData = Array.isArray(data) ? data : data?.data || [];

//       setSchools(schoolsData);
//     } catch (error) {
//       console.error("GET SCHOOLS ERROR:", error);

//       setError(
//         error instanceof Error ? error.message : "حدث خطأ أثناء تحميل المدارس",
//       );
//     }
//   };

//   // =========================
//   // Initial Load
//   // =========================

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       await getSchools();
//       setLoading(false);
//     };

//     load();
//   }, []);

//   // =========================
//   // Add School Card
//   // =========================

//   const addSchoolCard = () => {
//     setDrafts((prev) => [
//       ...prev,
//       {
//         tempId: `${Date.now()}-${Math.random()}`,
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         image: null,
//         imagePreview: null,
//         saving: false,
//       },
//     ]);

//     setError("");
//   };

//   // =========================
//   // Change Draft
//   // =========================

//   const handleDraftChange = (
//     tempId: string,
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;

//     setDrafts((prev) =>
//       prev.map((draft) =>
//         draft.tempId === tempId ? { ...draft, [name]: value } : draft,
//       ),
//     );
//   };

//   // =========================
//   // Change Image
//   // =========================

//   const handleDraftImageChange = (
//     tempId: string,
//     e: ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     const preview = URL.createObjectURL(file);

//     setDrafts((prev) =>
//       prev.map((draft) => {
//         if (draft.tempId !== tempId) return draft;

//         if (draft.imagePreview) {
//           URL.revokeObjectURL(draft.imagePreview);
//         }

//         return {
//           ...draft,
//           image: file,
//           imagePreview: preview,
//         };
//       }),
//     );
//   };

//   // =========================
//   // Remove Draft
//   // =========================

//   const deleteDraft = (tempId: string) => {
//     setDrafts((prev) => {
//       const draft = prev.find((item) => item.tempId === tempId);

//       if (draft?.imagePreview) {
//         URL.revokeObjectURL(draft.imagePreview);
//       }

//       return prev.filter((item) => item.tempId !== tempId);
//     });
//   };

//   // =========================
//   // Add School
//   // =========================

//   const handleAddSchool = async (
//     e: FormEvent<HTMLFormElement>,
//     draft: SchoolDraft,
//   ) => {
//     e.preventDefault();

//     if (!draft.name.trim()) {
//       setError("اسم المدرسة مطلوب");
//       return;
//     }

//     try {
//       setError("");

//       setDrafts((prev) =>
//         prev.map((item) =>
//           item.tempId === draft.tempId ? { ...item, saving: true } : item,
//         ),
//       );

//       const formData = new FormData();

//       formData.append("name", draft.name.trim());
//       formData.append("email", draft.email.trim());
//       formData.append("phone", draft.phone.trim());
//       formData.append("address", draft.address.trim());

//       if (draft.image) {
//         formData.append("image", draft.image);
//       }

//       const response = await fetch(`${API_URL}/schools`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//         },
//         body: formData,
//       });

//       const data = await response.json().catch(() => null);

//       if (!response.ok) {
//         throw new Error(data?.message || "حدث خطأ أثناء إضافة المدرسة");
//       }

//       if (data?.data) {
//         setSchools((prev) => [data.data, ...prev]);
//       } else {
//         await getSchools();
//       }

//       setDrafts((prev) => prev.filter((item) => item.tempId !== draft.tempId));

//       if (draft.imagePreview) {
//         URL.revokeObjectURL(draft.imagePreview);
//       }

//       alert("تمت إضافة المدرسة بنجاح");
//     } catch (error) {
//       console.error("ADD SCHOOL ERROR:", error);

//       setError(
//         error instanceof Error ? error.message : "حدث خطأ أثناء إضافة المدرسة",
//       );

//       setDrafts((prev) =>
//         prev.map((item) =>
//           item.tempId === draft.tempId ? { ...item, saving: false } : item,
//         ),
//       );
//     }
//   };

//   // =========================
//   // Hide School
//   // =========================

//   const deleteSchool = (id: number) => {
//     setHiddenSchools((prev) => (prev.includes(id) ? prev : [...prev, id]));
//   };

//   // =========================
//   // Image URL
//   // =========================

//   const getImageUrl = (image: string | null) => {
//     if (!image) return null;

//     if (image.startsWith("http://") || image.startsWith("https://")) {
//       return image;
//     }

//     return `${STORAGE_URL}/${image}`;
//   };

//   // =========================
//   // Loading
//   // =========================

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-400">Loading...</p>
//       </div>
//     );
//   }

//   // =========================
//   // Visible Schools
//   // =========================

//   const visibleSchools = schools.filter(
//     (school) => !hiddenSchools.includes(school.id),
//   );

//   return (
//     <div className="min-h-screen">
//       {hiddenSchools.length > 0 && (
//         <button
//           type="button"
//           onClick={() => {
//             const id = hiddenSchools[hiddenSchools.length - 1];
//             restoreSchool(id);
//           }}
//           className="
//       flex items-center gap-2
//       bg-[#1e2536]
//       hover:bg-[#2a3348]
//       text-white
//       font-bold
//       px-5 py-3
//       rounded-xl
//       transition
//     "
//         >
//           ↩ Restore School
//         </button>
//       )}

//       {/* Header */}

//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-white">Schools</h1>

//           <p className="text-gray-400 mt-1">Manage schools</p>
//         </div>

//         <button
//           type="button"
//           onClick={addSchoolCard}
//           className="
//             flex items-center gap-2
//             bg-[#9E7C2F]
//             hover:bg-[#b58d36]
//             text-black
//             font-bold
//             px-5 py-3
//             rounded-xl
//             transition
//           "
//         >
//           <span className="text-xl">+</span>
//           Add School
//         </button>
//       </div>

//       {/* Error */}

//       {error && (
//         <div
//           className="
//             bg-red-500/10
//             border border-red-500/30
//             text-red-400
//             p-4
//             rounded-xl
//             mb-6
//           "
//         >
//           {error}
//         </div>
//       )}

//       {/* =========================
//           ONE GRID FOR EVERYTHING
//       ========================= */}

//       <div
//         className="
//           grid
//           grid-cols-1
//           sm:grid-cols-2
//           lg:grid-cols-3
//           xl:grid-cols-4
//           gap-5
//         "
//       >
//         {/* New School Cards */}

//         {drafts.map((draft) => (
//           <form
//             key={draft.tempId}
//             onSubmit={(e) => handleAddSchool(e, draft)}
//             className="
//               bg-[#121622]
//               border border-[#9E7C2F]
//               rounded-2xl
//               overflow-hidden
//               shadow-lg
//             "
//           >
//             {/* Image */}

//             <div
//               className="
//                 h-44
//                 bg-[#181e2b]
//                 flex items-center justify-center
//                 overflow-hidden
//                 relative
//               "
//             >
//               {draft.imagePreview ? (
//                 <img
//                   src={draft.imagePreview}
//                   alt="Preview"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <label
//                   htmlFor={`school-image-${draft.tempId}`}
//                   className="
//                     cursor-pointer
//                     flex flex-col
//                     items-center justify-center
//                     w-full h-full
//                     text-gray-400
//                     hover:text-white
//                   "
//                 >
//                   <span className="text-5xl mb-2">📷</span>

//                   <span className="text-sm">Add School Image</span>
//                 </label>
//               )}

//               <input
//                 id={`school-image-${draft.tempId}`}
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleDraftImageChange(draft.tempId, e)}
//                 className="hidden"
//               />

//               {draft.imagePreview && (
//                 <label
//                   htmlFor={`school-image-${draft.tempId}`}
//                   className="
//                     absolute bottom-3 right-3
//                     bg-black/70
//                     text-white
//                     px-3 py-2
//                     rounded-lg
//                     cursor-pointer
//                     text-xs
//                   "
//                 >
//                   Change Image
//                 </label>
//               )}
//             </div>

//             {/* Content */}

//             <div className="p-5">
//               <input
//                 type="text"
//                 name="name"
//                 value={draft.name}
//                 onChange={(e) => handleDraftChange(draft.tempId, e)}
//                 placeholder="School Name"
//                 className="
//                   w-full
//                   bg-[#181e2b]
//                   border border-[#1e2536]
//                   rounded-xl
//                   px-4 py-3
//                   text-white
//                   outline-none
//                   focus:border-[#9E7C2F]
//                   mb-3
//                 "
//               />

//               <input
//                 type="email"
//                 name="email"
//                 value={draft.email}
//                 onChange={(e) => handleDraftChange(draft.tempId, e)}
//                 placeholder="Email"
//                 className="
//                   w-full
//                   bg-[#181e2b]
//                   border border-[#1e2536]
//                   rounded-xl
//                   px-4 py-3
//                   text-white
//                   outline-none
//                   focus:border-[#9E7C2F]
//                   mb-3
//                 "
//               />

//               <input
//                 type="text"
//                 name="phone"
//                 value={draft.phone}
//                 onChange={(e) => handleDraftChange(draft.tempId, e)}
//                 placeholder="Phone"
//                 className="
//                   w-full
//                   bg-[#181e2b]
//                   border border-[#1e2536]
//                   rounded-xl
//                   px-4 py-3
//                   text-white
//                   outline-none
//                   focus:border-[#9E7C2F]
//                   mb-3
//                 "
//               />

//               <textarea
//                 name="address"
//                 value={draft.address}
//                 onChange={(e) => handleDraftChange(draft.tempId, e)}
//                 placeholder="Address"
//                 rows={3}
//                 className="
//                   w-full
//                   bg-[#181e2b]
//                   border border-[#1e2536]
//                   rounded-xl
//                   px-4 py-3
//                   text-white
//                   outline-none
//                   focus:border-[#9E7C2F]
//                   resize-none
//                   mb-4
//                 "
//               />

//               {/* Buttons */}

//               <div className="flex gap-2">
//                 <button
//                   type="submit"
//                   disabled={draft.saving}
//                   className="
//                     flex-1
//                     bg-[#9E7C2F]
//                     hover:bg-[#b58d36]
//                     text-black
//                     font-bold
//                     py-2.5
//                     rounded-xl
//                     transition
//                     disabled:opacity-50
//                   "
//                 >
//                   {draft.saving ? "Saving..." : "Save"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => deleteDraft(draft.tempId)}
//                   disabled={draft.saving}
//                   className="
//                     w-12
//                     flex items-center justify-center
//                     bg-red-500/10
//                     border border-red-500/20
//                     text-red-500
//                     hover:bg-red-500/20
//                     rounded-xl
//                   "
//                   title="Remove Card"
//                 >
//                   🗑️
//                 </button>
//               </div>
//             </div>
//           </form>
//         ))}

//         {/* Existing Schools */}

//         {visibleSchools.map((school) => (
//           <div
//             key={school.id}
//             className="
//               bg-[#121622]
//               border border-[#1e2536]
//               rounded-2xl
//               overflow-hidden
//               hover:border-[#9E7C2F]
//               transition
//               group
//             "
//           >
//             {/* Image */}

//             <div
//               className="
//                 h-44
//                 bg-[#181e2b]
//                 flex items-center justify-center
//                 overflow-hidden
//               "
//             >
//               {school.image ? (
//                 <img
//                   src={getImageUrl(school.image) || ""}
//                   alt={school.name}
//                   className="
//                     w-full h-full
//                     object-cover
//                     group-hover:scale-105
//                     transition
//                     duration-300
//                   "
//                 />
//               ) : (
//                 <div className="text-6xl">🏫</div>
//               )}
//             </div>

//             {/* Content */}

//             <div className="p-5">
//               <h2
//                 className="
//                   text-lg
//                   font-bold
//                   text-white
//                   line-clamp-1
//                 "
//               >
//                 {school.name}
//               </h2>

//               <p className="text-gray-500 text-xs mt-1">ID #{school.id}</p>

//               <div className="mt-4 space-y-2">
//                 {school.email && (
//                   <p className="text-gray-400 text-sm truncate">
//                     ✉️ {school.email}
//                   </p>
//                 )}

//                 {school.phone && (
//                   <p className="text-gray-400 text-sm">📞 {school.phone}</p>
//                 )}

//                 {school.address && (
//                   <p className="text-gray-400 text-sm truncate">
//                     📍 {school.address}
//                   </p>
//                 )}
//               </div>

//               {/* Actions */}

//               <div
//                 className="
//                   flex items-center justify-between
//                   mt-5 pt-4
//                   border-t border-[#1e2536]
//                 "
//               >
//                 <Link
//                   href={`/admin/schools/${school.id}/edit`}
//                   className="
//                     text-blue-400
//                     hover:text-blue-300
//                     text-sm
//                     font-medium
//                   "
//                 >
//                   Edit
//                 </Link>

//                 {/* Hide Only */}

//                 <button
//                   type="button"
//                   onClick={() => deleteSchool(school.id)}
//                   className="
//                     p-2
//                     rounded-lg
//                     text-red-500
//                     hover:bg-red-500/10
//                     hover:text-red-400
//                     transition
//                   "
//                   title="Hide School"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.8}
//                     stroke="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="
//                         M6 7h12
//                         M9 7V5
//                         a1 1 0 0 1 1-1h4
//                         a1 1 0 0 1 1 1v2
//                         m2 0v12
//                         a2 2 0 0 1-2 2H9
//                         a2 2 0 0 1-2-2V7
//                         m3 4v6
//                         m4-6v6
//                       "
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty */}

//       {visibleSchools.length === 0 && drafts.length === 0 && (
//         <div
//           className="
//               bg-[#121622]
//               border border-[#1e2536]
//               rounded-2xl
//               p-12
//               text-center
//               mt-5
//             "
//         >
//           <div className="text-5xl mb-4">🏫</div>

//           <p className="text-gray-300 text-lg">No Schools Found</p>

//           <p className="text-gray-500 mt-2">
//             Click Add School to add your first school.
//           </p>

//           <button
//             type="button"
//             onClick={addSchoolCard}
//             className="
//                 mt-6
//                 bg-[#9E7C2F]
//                 hover:bg-[#b58d36]
//                 text-black
//                 font-bold
//                 px-5 py-3
//                 rounded-xl
//               "
//           >
//             + Add School
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface School {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
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
  const API_URL = "http://localhost:8000/api";
  const STORAGE_URL = "http://localhost:8000/storage";

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
        throw new Error(data?.message || "Failed to fetch schools");
      }

      const schoolsData = Array.isArray(data) ? data : data?.data || [];

      setSchools(schoolsData);
    } catch (error) {
      console.error("GET SCHOOLS ERROR:", error);

      setError(
        error instanceof Error ? error.message : "حدث خطأ أثناء تحميل المدارس",
      );
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await getSchools();
      setLoading(false);
    };

    load();
  }, []);

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
        draft.tempId === tempId ? { ...draft, [name]: value } : draft,
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
        if (draft.tempId !== tempId) return draft;

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
      setError("اسم المدرسة مطلوب");
      return;
    }

    try {
      setError("");

      setDrafts((prev) =>
        prev.map((item) =>
          item.tempId === draft.tempId ? { ...item, saving: true } : item,
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
        throw new Error(data?.message || "حدث خطأ أثناء إضافة المدرسة");
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

      alert("تمت إضافة المدرسة بنجاح");
    } catch (error) {
      console.error("ADD SCHOOL ERROR:", error);

      setError(
        error instanceof Error ? error.message : "حدث خطأ أثناء إضافة المدرسة",
      );

      setDrafts((prev) =>
        prev.map((item) =>
          item.tempId === draft.tempId ? { ...item, saving: false } : item,
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
      name: school.name,
      email: school.email || "",
      phone: school.phone || "",
      address: school.address || "",
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
      setError("اسم المدرسة مطلوب");
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
        throw new Error(data?.message || "حدث خطأ أثناء تعديل المدرسة");
      }

      const updatedSchool = data?.data || data;

      setSchools((prev) =>
        prev.map((school) =>
          school.id === id ? { ...school, ...updatedSchool } : school,
        ),
      );

      setEditingSchoolId(null);

      setEditData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      alert("تم تعديل المدرسة بنجاح");
    } catch (error) {
      console.error("EDIT SCHOOL ERROR:", error);

      setError(
        error instanceof Error ? error.message : "حدث خطأ أثناء تعديل المدرسة",
      );
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
    if (!image) return null;

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const visibleSchools = schools.filter(
    (school) => !hiddenSchools.includes(school.id),
  );

  return (
    <div className="min-h-screen">
      {/* Restore */}

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
            px-5 py-3
            rounded-xl
            transition
            mb-5
          "
        >
          ↩ Restore School
        </button>
      )}

      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Schools</h1>

          <p className="text-gray-400 mt-1">Manage schools</p>
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
            px-5 py-3
            rounded-xl
            transition
          "
        >
          <span className="text-xl">+</span>
          Add School
        </button>
      </div>

      {/* Error */}

      {error && (
        <div
          className="
            bg-red-500/10
            border border-red-500/30
            text-red-400
            p-4
            rounded-xl
            mb-6
          "
        >
          {error}
        </div>
      )}

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-5
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
              rounded-2xl
              overflow-hidden
              shadow-lg
            "
          >
            <div
              className="
                h-44
                bg-[#181e2b]
                flex items-center justify-center
                overflow-hidden
                relative
              "
            >
              {draft.imagePreview ? (
                <img
                  src={draft.imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <label
                  htmlFor={`school-image-${draft.tempId}`}
                  className="
                    cursor-pointer
                    flex flex-col
                    items-center justify-center
                    w-full h-full
                    text-gray-400
                    hover:text-white
                  "
                >
                  <span className="text-5xl mb-2">📷</span>

                  <span className="text-sm">Add School Image</span>
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
                    absolute bottom-3 right-3
                    bg-black/70
                    text-white
                    px-3 py-2
                    rounded-lg
                    cursor-pointer
                    text-xs
                  "
                >
                  Change Image
                </label>
              )}
            </div>

            <div className="p-5">
              <input
                type="text"
                name="name"
                value={draft.name}
                onChange={(e) => handleDraftChange(draft.tempId, e)}
                placeholder="School Name"
                className="
                  w-full
                  bg-[#181e2b]
                  border border-[#1e2536]
                  rounded-xl
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-[#9E7C2F]
                  mb-3
                "
              />

              <input
                type="email"
                name="email"
                value={draft.email}
                onChange={(e) => handleDraftChange(draft.tempId, e)}
                placeholder="Email"
                className="
                  w-full
                  bg-[#181e2b]
                  border border-[#1e2536]
                  rounded-xl
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-[#9E7C2F]
                  mb-3
                "
              />

              <input
                type="text"
                name="phone"
                value={draft.phone}
                onChange={(e) => handleDraftChange(draft.tempId, e)}
                placeholder="Phone"
                className="
                  w-full
                  bg-[#181e2b]
                  border border-[#1e2536]
                  rounded-xl
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-[#9E7C2F]
                  mb-3
                "
              />

              <textarea
                name="address"
                value={draft.address}
                onChange={(e) => handleDraftChange(draft.tempId, e)}
                placeholder="Address"
                rows={3}
                className="
                  w-full
                  bg-[#181e2b]
                  border border-[#1e2536]
                  rounded-xl
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-[#9E7C2F]
                  resize-none
                  mb-4
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
                    py-2.5
                    rounded-xl
                    transition
                    disabled:opacity-50
                  "
                >
                  {draft.saving ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteDraft(draft.tempId)}
                  disabled={draft.saving}
                  className="
                    w-12
                    flex items-center justify-center
                    bg-red-500/10
                    border border-red-500/20
                    text-red-500
                    hover:bg-red-500/20
                    rounded-xl
                  "
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
              rounded-2xl
              overflow-hidden
              hover:border-[#9E7C2F]
              transition
              group
            "
          >
            {/* IMAGE */}

            <div
              className="
                h-44
                bg-[#181e2b]
                flex items-center justify-center
                overflow-hidden
              "
            >
              {school.image ? (
                <img
                  src={getImageUrl(school.image) || ""}
                  alt={school.name}
                  className="
                    w-full h-full
                    object-cover
                    group-hover:scale-105
                    transition
                    duration-300
                  "
                />
              ) : (
                <div className="text-6xl">🏫</div>
              )}
            </div>

            {/* =========================
                NORMAL / EDIT MODE
            ========================= */}

            <div className="p-5">
              {editingSchoolId === school.id ? (
                /* EDIT MODE */

                <div>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder="School Name"
                    className="
                      w-full
                      bg-[#181e2b]
                      border border-[#9E7C2F]
                      rounded-xl
                      px-4 py-3
                      text-white
                      outline-none
                      mb-3
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    placeholder="Email"
                    className="
                      w-full
                      bg-[#181e2b]
                      border border-[#1e2536]
                      rounded-xl
                      px-4 py-3
                      text-white
                      outline-none
                      mb-3
                    "
                  />

                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleEditChange}
                    placeholder="Phone"
                    className="
                      w-full
                      bg-[#181e2b]
                      border border-[#1e2536]
                      rounded-xl
                      px-4 py-3
                      text-white
                      outline-none
                      mb-3
                    "
                  />

                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleEditChange}
                    placeholder="Address"
                    rows={3}
                    className="
                      w-full
                      bg-[#181e2b]
                      border border-[#1e2536]
                      rounded-xl
                      px-4 py-3
                      text-white
                      outline-none
                      resize-none
                      mb-4
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
                        py-2.5
                        rounded-xl
                      "
                    >
                      Save
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
                        py-2.5
                        rounded-xl
                      "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* NORMAL MODE */

                <>
                  <h2
                    className="
                      text-lg
                      font-bold
                      text-white
                      line-clamp-1
                    "
                  >
                    {school.name}
                  </h2>

                  <p className="text-gray-500 text-xs mt-1">ID #{school.id}</p>

                  <div className="mt-4 space-y-2">
                    {school.email && (
                      <p className="text-gray-400 text-sm truncate">
                        ✉️ {school.email}
                      </p>
                    )}

                    {school.phone && (
                      <p className="text-gray-400 text-sm">📞 {school.phone}</p>
                    )}

                    {school.address && (
                      <p className="text-gray-400 text-sm truncate">
                        📍 {school.address}
                      </p>
                    )}
                  </div>

                  {/* ACTIONS */}

                  <div
                    className="
                      flex items-center justify-between
                      mt-5 pt-4
                      border-t border-[#1e2536]
                    "
                  >
                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() => startEditSchool(school)}
                      className="
                        text-blue-400
                        hover:text-blue-300
                        text-sm
                        font-medium
                      "
                    >
                      Edit
                    </button>

                    {/* HIDE */}

                    <button
                      type="button"
                      onClick={() => deleteSchool(school.id)}
                      className="
                        p-2
                        rounded-lg
                        text-red-500
                        hover:bg-red-500/10
                        hover:text-red-400
                        transition
                      "
                      title="Hide School"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-5 h-5"
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

      {/* EMPTY */}

      {visibleSchools.length === 0 && drafts.length === 0 && (
        <div
          className="
              bg-[#121622]
              border border-[#1e2536]
              rounded-2xl
              p-12
              text-center
              mt-5
            "
        >
          <div className="text-5xl mb-4">🏫</div>

          <p className="text-gray-300 text-lg">No Schools Found</p>

          <p className="text-gray-500 mt-2">
            Click Add School to add your first school.
          </p>

          <button
            type="button"
            onClick={addSchoolCard}
            className="
                mt-6
                bg-[#9E7C2F]
                hover:bg-[#b58d36]
                text-black
                font-bold
                px-5 py-3
                rounded-xl
              "
          >
            + Add School
          </button>
        </div>
      )}
    </div>
  );
}
