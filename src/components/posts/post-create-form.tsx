"use client";

import { useActionState, startTransition, useState } from "react";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formInstance, setFormInstance] = useState(0);

  return (
    <Popover
      placement="bottom"
      showArrow
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setFormInstance((v) => v + 1); // remount each time you open
      }}
    >
      <PopoverTrigger>
        <Button
          color="primary"
          variant="shadow"
          radius="full"
          className="w-full sm:w-auto"
        >
          Create a Post
        </Button>
      </PopoverTrigger>

      <PopoverContent className="border border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
        <PostCreateInner key={formInstance} slug={slug} />
      </PopoverContent>
    </Popover>
  );
}

function PostCreateInner({ slug }: { slug: string }) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-[min(92vw,20rem)] flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            Create a post
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Share your idea with the community.
          </p>
        </div>

        <Input
          name="title"
          label="Title"
          labelPlacement="outside"
          placeholder="Short and specific"
          variant="bordered"
          radius="lg"
          isInvalid={!!formState.errors.title?.length}
          errorMessage={formState.errors.title?.join(", ")}
        />

        <Textarea
          name="content"
          label="Content"
          labelPlacement="outside"
          placeholder="Write your post..."
          variant="bordered"
          radius="lg"
          isInvalid={!!formState.errors.content?.length}
          errorMessage={formState.errors.content?.join(", ")}
        />

        {formState.errors._form?.length ? (
          <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {formState.errors._form.join(", ")}
          </div>
        ) : null}

        <FormButton isLoading={isPending}>Create Post</FormButton>
      </div>
    </Form>
  );
}
