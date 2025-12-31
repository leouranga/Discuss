"use client";

import { useActionState, startTransition } from "react";
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

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement="bottom" showArrow>
      <PopoverTrigger>
        <Button color="primary" variant="shadow" radius="full" className="w-full sm:w-auto">
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
        <Form onSubmit={handleSubmit} className="w-full">
          <div className="flex w-[min(92vw,20rem)] flex-col gap-4 p-5">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Create a topic
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Topics keep your posts organized.
              </p>
            </div>

            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="e.g. react, devops, career"
              variant="bordered"
              radius="lg"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />

            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="What is this topic about?"
              variant="bordered"
              radius="lg"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}

            <FormButton isLoading={isPending}>Save</FormButton>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
