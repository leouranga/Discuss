import Link from "next/link";
import { Suspense } from "react";
import HeaderAuth from "@/components/header-auth";
import SearchInput from "@/components/search-input";
import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 mt-2 sm:mt-4">
      <div className="rounded-2xl border border-black/5 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/40">
        <div className="px-3 py-3 sm:px-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Link href="/" className="shrink-0 font-semibold tracking-tight">
                Discuss
              </Link>
              <span className="hidden text-sm text-zinc-500 dark:text-zinc-400 sm:inline">
                Welcome
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <HeaderAuth />
            </div>
          </div>

          {/* Mobile: search goes on its own row to prevent overflow */}
          <div className="mt-3">
            <Suspense>
              <SearchInput />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
