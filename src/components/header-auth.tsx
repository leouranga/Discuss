"use client";
import {
  NavbarItem,
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
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar
            src={session.data.user.image || ""}
            name={session.data.user.name || "User"}
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
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button
              type="submit"
              color="secondary"
              variant="bordered"
              className="border-black/10 bg-white/60 dark:border-white/10 dark:bg-zinc-950/30"
            >
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="shadow">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
