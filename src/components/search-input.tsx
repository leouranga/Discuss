"use client";

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-zinc-500 dark:text-zinc-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={actions.search} className="flex w-full justify-center">
      <Input
        name="term"
        defaultValue={searchParams.get("term") || ""}
        placeholder="Search posts..."
        size="sm"
        radius="full"
        variant="bordered"
        startContent={<SearchIcon />}
        className="w-full sm:max-w-[560px]"
        classNames={{
          inputWrapper:
            "bg-white/70 shadow-sm border-black/10 backdrop-blur hover:bg-white/80 dark:bg-zinc-900/35 dark:border-white/10 dark:hover:bg-zinc-900/50",
          input: "text-zinc-900 dark:text-zinc-100",
        }}
      />
    </form>
  );
}
