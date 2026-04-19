import { Button } from "@/components/ui/button";
import Link from "next/link";

const GuestHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-black"
        >
          Insight Board
        </Link>
        <div className="flex items-center gap-6">
          <Button
            asChild
            className="bg-zinc-900 hover:bg-zinc-700 text-white rounded-full px-5 h-10"
          >
            <Link href="/sign-in">로그인</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
export default GuestHeader;
