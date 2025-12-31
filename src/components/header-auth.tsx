"use client";
import {
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Avatar
            src={session.data.user.image || ""}
            name={session.data.user.name || "User"}
            size="sm"
            className="cursor-pointer ring-1 ring-black/10 dark:ring-white/10"
          />
        </PopoverTrigger>
        <PopoverContent className="border border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
          <div className="min-w-56 p-4">
            <p className="text-sm font-medium">
              {session.data.user.name || "Signed in"}
            </p>
            <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
              {session.data.user.email || ""}
            </p>
            <form action={actions.signOut}>
              <Button type="submit" color="danger" variant="flat" fullWidth>
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <div className="flex items-center gap-2">
        <form action={actions.signIn}>
          <Button
            type="submit"
            size="sm"
            radius="full"
            color="secondary"
            variant="bordered"
            className="border-black/10 bg-white/60 px-3 dark:border-white/10 dark:bg-zinc-950/30"
          >
            Sign In
          </Button>
        </form>

        <form action={actions.signIn}>
          <Button
            type="submit"
            size="sm"
            radius="full"
            color="primary"
            variant="shadow"
            className="px-3"
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  }

  return authContent;
}
