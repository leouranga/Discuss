import Link from "next/link";
import { Suspense } from "react";
import PostShow from "@/components/posts/post-show";
import PostShowLoading from "@/components/posts/post-show-loading";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={paths.topicShow(slug)}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-sm text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-zinc-950/30 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          <span aria-hidden>←</span>
          Back to {slug}
        </Link>
      </div>

      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>

      <section className="surface p-5">
        <h2 className="text-lg font-semibold tracking-tight">
          Join the discussion
        </h2>
        <div className="mt-4">
          <CommentCreateForm postId={postId} startOpen />
        </div>
      </section>

      <section className="surface p-5">
        <CommentList postId={postId} />
      </section>
    </div>
  );
}
