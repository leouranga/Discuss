import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostByTopicSlug } from "@/db/queries/posts";
import { db } from "@/db";

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  const topic = await db.topic.findFirst({
    where: { slug },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="space-y-6">
      <section className="surface p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="muted">Topic</p>
              <span className="text-zinc-300 dark:text-zinc-700" aria-hidden>
                •
              </span>
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/30 dark:text-zinc-300">
                {topic?._count.posts ?? 0} post{(topic?._count.posts ?? 0) === 1 ? "" : "s"}
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {slug}
            </h1>

            {topic?.description ? (
              <p className="muted">{topic.description}</p>
            ) : null}
          </div>

          <div>
            <PostCreateForm slug={slug} />
          </div>
        </div>
      </section>

      <section className="surface p-5">
        <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
      </section>
    </div>
  );
}
