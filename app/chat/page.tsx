"use client";

import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  message: string;
  is_read: boolean;
  created_at: string;
  sender: {
    id: number;
    name: string;
    email: string;
    user_type: string;
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const conversationId = 1; // رقم المحادثة الحالية (يمكن ربطها لاحقاً بقائمة جانبية)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // جلب بيانات المستخدم الحالي
  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setCurrentUserId(parsed.id);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // دالة تحميل الرسائل
  const loadMessages = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      setError("");

      let token = localStorage.getItem("auth_token");
      if (!token) {
        const match = document.cookie.match(
          new RegExp("(^| )jwtToken=([^;]+)"),
        );
        if (match) token = match[2];
      }

      const response = await fetch(
        `${API_URL}/conversations/${conversationId}/messages`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `خطأ من السيرفر: ${response.status}`);
      }

      if (result.success) {
        setMessages(
          Array.isArray(result.data) ? [...result.data].reverse() : [],
        );
      }
    } catch (err: any) {
      console.error(err);
      if (!isBackground) setError(err.message || "تعذر تحميل الرسائل");
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  // التحميل الأولي + التحديث التلقائي (Auto-Polling كل 3 ثوانٍ)
  useEffect(() => {
    loadMessages(false);

    const interval = setInterval(() => {
      loadMessages(true); // تحديث في الخلفية بدون إظهار علامة التحميل
    }, 3000);

    return () => clearInterval(interval);
  }, [conversationId]);

  // إرسال رسالة جديدة
  const sendMessage = async () => {
    const text = newMessage.trim();
    if (!text || sending) return;

    try {
      setSending(true);
      setError("");

      let token = localStorage.getItem("auth_token");
      if (!token) {
        const match = document.cookie.match(
          new RegExp("(^| )jwtToken=([^;]+)"),
        );
        if (match) token = match[2];
      }

      const response = await fetch(
        `${API_URL}/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
          body: JSON.stringify({ message: text }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "فشل إرسال الرسالة");
      }

      // تحديث الرسائل فوراً بعد الإرسال الناجح
      setMessages((prev) => [...prev, result.data]);
      setNewMessage("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "حدث خطأ أثناء إرسال الرسالة");
    } finally {
      setSending(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100 p-6 flex items-center justify-center"
    >
      <div className="mx-auto flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200">
        {/* Header */}
        <div className="bg-emerald-700 px-6 py-5 text-white shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">المحادثة الأكاديمية</h1>
            <p className="mt-1 text-xs text-emerald-100">
              التواصل الفوري بين الطالب والمعلم ضمن مجمع المدارس
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-xs bg-emerald-800 px-3 py-1 rounded-full text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            متصل حياً
          </span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
              جاري تحميل الرسائل...
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              لا توجد رسائل حتى الآن، ابدأ المحادثة الآن!
            </div>
          ) : (
            messages.map((item) => {
              const isMine = item.sender_id === currentUserId;

              return (
                <div
                  key={item.id}
                  className={`flex ${isMine ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      isMine
                        ? "bg-emerald-600 text-white rounded-bl-none"
                        : "bg-white text-slate-800 border border-slate-200 rounded-br-none"
                    }`}
                  >
                    <div
                      className={`mb-1 text-xs font-semibold ${isMine ? "text-emerald-100" : "text-emerald-700"}`}
                    >
                      {item.sender?.name || (isMine ? "أنت" : "طرف آخر")}
                    </div>
                    <div className="text-sm leading-relaxed break-words">
                      {item.message}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-center text-xs text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* Send Input Area */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="اكتب رسالتك الأكاديمية هنا..."
              disabled={sending}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-right text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 text-slate-800"
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={sending || !newMessage.trim()}
              className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
            >
              {sending ? "جاري الإرسال..." : "إرسال"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
