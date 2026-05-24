import type { Metadata } from "next";
import "../globals.css";
import UserHeader from "@/widgets/layouts/header/ui/user-header";

export const metadata: Metadata = {
  title: "Insight Board",
  description: "대시보드 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900">
      <UserHeader />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
