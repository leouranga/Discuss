import Link from "next/link";
import { db } from "@/db";
import paths from "@/paths";

export default async function TopicList() {
  const topics = await db.topic.findMany({
    include: {
      _count: { select: { posts: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  if (topics.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/15 bg-white/50 p-6 text-center dark:border-white/15 dark:bg-zinc-900/25">
        <p className="text-sm font-medium">No topics yet</p>
        <p className="muted mt-1">Create the first topic to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {topics.map((topic) => (
        <Link
          key={topic.id}
          href={paths.topicShow(topic.slug)}
          className="surface surface-hover block p-3 sm:p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight">
                <span className="text-zinc-400 dark:text-zinc-500" aria-hidden>
                  #
                </span>
                {topic.slug}
              </p>
              <p className="mt-1 clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {topic.description}
              </p>
            </div>

            <div className="shrink-0 rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/30 dark:text-zinc-300">
              {topic._count.posts} post{topic._count.posts === 1 ? "" : "s"}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
