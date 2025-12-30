import CommentShow from "@/components/comments/comment-show";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentListProps {
  postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow key={comment.id} commentId={comment.id} postId={postId} />
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">
          All {comments.length} comment{comments.length === 1 ? "" : "s"}
        </h2>
        <span className="muted">{topLevelComments.length} top level</span>
      </div>

      {topLevelComments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white/50 p-8 text-center dark:border-white/15 dark:bg-zinc-900/25">
          <p className="text-sm font-medium">No comments yet</p>
          <p className="muted mt-1">
            Start the thread by posting the first reply.
          </p>
        </div>
      ) : (
        <div className="space-y-3">{renderedComments}</div>
      )}
    </div>
  );
}
