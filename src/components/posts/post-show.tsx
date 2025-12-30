import { notFound } from "next/navigation";
import { db } from "@/db";
import Image from "next/image";

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findFirst({
    where: { id: postId },
    include: {
      user: { select: { name: true, image: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
  });

  if (!post) {
    notFound();
  }

  const created = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(post.createdAt);

  return (
    <article className="surface p-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/60 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/30">
            <span aria-hidden>#</span>
            {post.topic.slug}
          </span>
          <span aria-hidden className="text-zinc-300 dark:text-zinc-700">
            •
          </span>
          <span>{created}</span>
          <span aria-hidden className="text-zinc-300 dark:text-zinc-700">
            •
          </span>
          <span>{post._count.comments} comments</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {post.title}
        </h1>

        <div className="flex items-center gap-3">
          {post.user.image ? (
            <Image
              src={post.user.image}
              alt={post.user.name ? `${post.user.name} avatar` : "User avatar"}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full ring-1 ring-black/10 dark:ring-white/10"
              sizes="36px"
            />
          ) : (
            <div className="grid h-9 w-9 place-items-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
              {(post.user.name || "U").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-medium leading-none">
              {post.user.name || "Anonymous"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Posted in {post.topic.slug}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950/25">
        <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
      </div>
    </article>
  );
}
