import type { PostWithData } from "@/db/queries/posts";
import Link from "next/link";
import paths from "@/paths";
import Image from "next/image";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}
export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/15 bg-white/50 p-6 text-center sm:p-8 dark:border-white/15 dark:bg-zinc-900/25">
        <p className="text-sm font-medium">Nothing here yet</p>
        <p className="muted mt-1">Be the first to create a post.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => {
        const topicSlug = post.topic.slug;

        if (!topicSlug) {
          throw new Error("Need a slug to link to a post");
        }

        const created = new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
        }).format(post.createdAt);

        const preview =
          post.content.length > 140
            ? post.content.slice(0, 140) + "…"
            : post.content;

        return (
          <Link
            key={post.id}
            href={paths.postShow(topicSlug, post.id)}
            className="surface surface-hover group relative block overflow-hidden p-3 sm:p-5"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-500/30 via-violet-500/25 to-emerald-500/25 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/60 px-2 py-1 text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/30 dark:text-zinc-300">
                    <span aria-hidden>#</span>
                    {topicSlug}
                  </span>
                  <span
                    className="text-zinc-300 dark:text-zinc-700"
                    aria-hidden
                  >
                    •
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {created}
                  </span>
                </div>

                <h3 className="truncate text-sm font-semibold tracking-tight text-zinc-900 group-hover:underline dark:text-zinc-50 sm:text-base">
                  {post.title}
                </h3>

                <p className="mt-2 clamp-3 break-words text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
                  {preview}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    {post.user.image ? (
                      <Image
                        src={post.user.image}
                        alt={
                          post.user.name
                            ? `${post.user.name} avatar`
                            : "User avatar"
                        }
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full ring-1 ring-black/10 dark:ring-white/10"
                        sizes="24px"
                      />
                    ) : (
                      <div className="grid h-6 w-6 place-items-center rounded-full bg-zinc-200 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                        {(post.user.name || "U").slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <span className="truncate">
                      {post.user.name || "Anonymous"}
                    </span>
                  </div>

                  <span
                    className="text-zinc-300 dark:text-zinc-700"
                    aria-hidden
                  >
                    •
                  </span>
                  <span>
                    {post._count.comments} comment
                    {post._count.comments === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              <div className="hidden shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs text-zinc-600 shadow-sm backdrop-blur transition sm:flex dark:border-white/10 dark:bg-zinc-950/30 dark:text-zinc-300">
                <span>Open</span>
                <span
                  className="transition group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
