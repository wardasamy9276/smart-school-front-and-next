"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddSchoolPage() {
  const router = useRouter();

  const API_URL = "http://localhost:8000/api";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("اسم المدرسة مطلوب");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/schools`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email || null,
          phone: form.phone || null,
          address: form.address || null,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "حدث خطأ أثناء إضافة المدرسة");
      }

      alert("تمت إضافة المدرسة بنجاح");

      router.push("/admin/schools");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء إضافة المدرسة",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Add School</h1>

          <p className="text-gray-400 mt-1">Add a new school</p>
        </div>

        <Link
          href="/admin/schools"
          className="text-gray-400 hover:text-white transition"
        >
          ← Back
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
          max-w-2xl
          bg-[#121622]
          border
          border-[#1e2536]
          rounded-2xl
          p-6
          space-y-5
        "
      >
        {/* Name */}
        <div>
          <label className="block text-gray-300 mb-2">School Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter school name"
            className="
              w-full
              bg-[#181e2b]
              border
              border-[#1e2536]
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-[#9E7C2F]
            "
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-2">Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="school@example.com"
            className="
              w-full
              bg-[#181e2b]
              border
              border-[#1e2536]
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-[#9E7C2F]
            "
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-300 mb-2">Phone</label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="01012345678"
            className="
              w-full
              bg-[#181e2b]
              border
              border-[#1e2536]
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-[#9E7C2F]
            "
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-300 mb-2">Address</label>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="School address"
            rows={4}
            className="
              w-full
              bg-[#181e2b]
              border
              border-[#1e2536]
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-[#9E7C2F]
              resize-none
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="
              bg-[#9E7C2F]
              hover:bg-[#b58d36]
              text-black
              font-bold
              px-6
              py-3
              rounded-xl
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Adding..." : "Add School"}
          </button>

          <Link
            href="/admin/schools"
            className="
              px-6
              py-3
              rounded-xl
              border
              border-[#1e2536]
              text-gray-300
              hover:bg-[#181e2b]
              transition
            "
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
