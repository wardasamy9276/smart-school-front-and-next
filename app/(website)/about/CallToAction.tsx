import React from "react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 md:px-12 bg-blue-600 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          انضم إلى عائلتنا التعليمية اليوم
        </h2>
        <p className="text-blue-100 mb-8 text-lg">
          امنح أبناءك فرصة تعليمية فريدة تعتمد على الابتكار والتكنولوجيا
          الحديثة.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            احجز عرضاً تجريبياً
          </Link>
          <Link
            href="/auth/login"
            className="bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-800 transition-colors border border-blue-500"
          >
            تسجيل الدخول للنظام
          </Link>
        </div>
      </div>
    </section>
  );
}
