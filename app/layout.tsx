import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/widgets/layouts/footer/ui/footer";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Insight Board",
  description: "대시보드 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background antialiased selection:bg-blue-100 tracking-tight flex flex-col"
        suppressHydrationWarning
      >
        <div className="flex flex-col min-h-screen bg-white text-zinc-900">
          <main className="flex-1 flex flex-col pt-16">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
