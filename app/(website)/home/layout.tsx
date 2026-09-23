// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { LanguageProvider } from "@/context/LanguageContext";
// import Navbar from "@/app/navbar/Navbar";
// import "@/app/globals.css";
// import Footer from "@/app/Footer/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Pioneers E-School System",
//   description: "نظام إدارة المدارس وتخطيط الموارد المدرسية",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="ar"
//       dir="rtl"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body>
//         <LanguageProvider>
//           <Navbar />

//           <main className="flex-1">{children}</main>

//           <Footer />
//         </LanguageProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Pioneers E-School System",
  description: "نظام إدارة المدارس وتخطيط الموارد المدرسية",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
