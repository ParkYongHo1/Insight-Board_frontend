import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-100 bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-400 font-medium">
        <p>© 2026 Insight Board. All rights reserved.</p>
        <div className="flex gap-8 items-center">
          <Link
            href="https://github.com/ParkYongHo1/Insight-Board_frontend"
            target="_blank"
            className="flex items-center gap-2 hover:text-zinc-900 transition-colors"
          >
            <span>Front-end</span>
          </Link>
          <Link
            href="https://github.com/heynokimush/insight-board-backend"
            target="_blank"
            className="flex items-center gap-2 hover:text-zinc-900 transition-colors"
          >
            <span>Back-end</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
