import { Divider } from "@nextui-org/react";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import PostList from "@/components/posts/post-list";
import { fetchTopPosts } from "@/db/queries/posts";
import { db } from "@/db";

export default async function Home() {
  const [topicCount, postCount, commentCount] = await Promise.all([
    db.topic.count(),
    db.post.count(),
    db.comment.count(),
  ]);

  return (
    <div className="space-y-6">
      <section className="surface p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Discuss
            </h1>
            <p className="muted">Create your discussions on any topic.</p>

            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/30 dark:text-zinc-300">
                {topicCount} topic{topicCount === 1 ? "" : "s"}
              </span>
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/30 dark:text-zinc-300">
                {postCount} post{postCount === 1 ? "" : "s"}
              </span>
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-zinc-950/30 dark:text-zinc-300">
                {commentCount} comment{commentCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <TopicCreateForm />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <div className="surface p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">
                Top posts
              </h2>
              <span className="muted">Most commented</span>
            </div>
            <Divider className="my-3 sm:my-4" />
            <PostList fetchData={fetchTopPosts} />
          </div>
        </section>

        <aside className="space-y-6 lg:col-span-4">
          <div className="surface p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">Topics</h3>
              <span className="muted">Browse</span>
            </div>
            <Divider className="my-3 sm:my-4" />
            <TopicList />
          </div>

          <div className="surface p-4 sm:p-5">
            <h3 className="text-lg font-semibold tracking-tight">Shortcuts</h3>
            <Divider className="my-3 sm:my-4" />
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                Search by title or content using the header search bar.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                Keep titles short and specific.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                Reply directly to build threads.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
