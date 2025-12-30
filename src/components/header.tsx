import Link from "next/link";
import { Suspense } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import HeaderAuth from "@/components/header-auth";
import SearchInput from "@/components/search-input";
import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  return (
    <Navbar
      className="sticky top-0 z-50 mt-4 rounded-2xl border border-black/5 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/40"
      maxWidth="full"
    >
      <NavbarBrand>
        <Link href="/" className="font-semibold tracking-tight">
          Discuss
        </Link>
        <span className="ml-3 hidden text-sm text-zinc-500 dark:text-zinc-400 sm:inline">
          Welcome
        </span>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <NavbarItem className="flex">
          <ThemeToggle />
        </NavbarItem>
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
