import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Insight Board",
  description: "대시보드 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex-1 flex flex-col ">{children}</main>;
}
