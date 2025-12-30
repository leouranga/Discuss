"use client";

import {
  useActionState,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Textarea, Button } from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(Boolean(startOpen));
  const ref = useRef<HTMLFormElement | null>(null);

  const createCommentAction = useMemo(
    () => actions.createComment.bind(null, { postId, parentId }),
    [postId, parentId]
  );

  const [formState, action, isPending] = useActionState(createCommentAction, {
    errors: {},
    success: false,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  return (
    <div>
      {!startOpen ? (
        <Button
          size="sm"
          variant="light"
          radius="full"
          className="text-zinc-700 dark:text-zinc-300"
          onPress={() => setOpen((v) => !v)}
        >
          Reply
        </Button>
      ) : null}

      {open ? (
        <form onSubmit={handleSubmit} ref={ref} noValidate>
          <div className="mt-3 space-y-3 rounded-2xl border border-black/5 bg-white/60 p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950/25">
            <Textarea
              name="content"
              label="Reply"
              placeholder="Enter your comment"
              variant="bordered"
              radius="lg"
              validationBehavior="aria"
              isInvalid={!!formState.errors.content?.length}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form?.length ? (
              <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}

            <FormButton isLoading={isPending}>Create Comment</FormButton>
          </div>
        </form>
      ) : null}
    </div>
  );
}
