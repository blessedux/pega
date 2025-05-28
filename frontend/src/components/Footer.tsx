import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--dework-border)] bg-[#181A20] py-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 px-4">
        <a href="https://chiledao.xyz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <Image src="/chiledaodots.png" alt="ChileDAO Logo" width={28} height={28} className="rounded" />
          <span className="text-white font-semibold text-lg tracking-tight">ChileDAO</span>
        </a>
        <span className="text-xs text-[var(--dework-text-muted)] mt-1">© {new Date().getFullYear()} ChileDAO. All rights reserved.</span>
        <a href="https://github.com/blessedux/pega" target="_blank" rel="noopener noreferrer" className="text-xs text-orange-500 hover:underline mt-1">Open Source on GitHub</a>
      </div>
    </footer>
  );
} 