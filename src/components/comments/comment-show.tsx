import CommentCreateForm from "@/components/comments/comment-create-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import Image from "next/image";

interface CommentShowProps {
  commentId: string;
  postId: string;
}

export default async function CommentShow({
  commentId,
  postId,
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return <CommentShow key={child.id} commentId={child.id} postId={postId} />;
  });

  const created = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(comment.createdAt);

  return (
    <div className="relative rounded-2xl border border-black/5 bg-white/50 p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950/20">
      <div className="flex gap-3">
        {comment.user.image ? (
          <Image
            src={comment.user.image}
            alt={
              comment.user.name ? `${comment.user.name} avatar` : "User avatar"
            }
            width={40}
            height={40}
            className="h-10 w-10 rounded-full ring-1 ring-black/10 dark:ring-white/10"
            sizes="40px"
          />
        ) : (
          <div className="grid h-10 w-10 place-items-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
            {(comment.user.name || "U").slice(0, 1).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm font-medium leading-none">
              {comment.user.name || "Anonymous"}
            </p>
            <span
              className="text-xs text-zinc-400 dark:text-zinc-600"
              aria-hidden
            >
              •
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {created}
            </p>
          </div>

          <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
            {comment.content}
          </p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>

      {children.length > 0 ? (
        <div className="mt-4 border-l border-black/10 pl-4 space-y-3 dark:border-white/10">
          {renderedChildren}
        </div>
      ) : null}
    </div>
  );
}
