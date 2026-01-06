"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React, { useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import ROUTES from "@/constants/routes";
import { createQuestion } from "@/lib/actions/question.action";
import { AskQuestionSchema } from "@/lib/validations";

import TagCard from "../cards/TagCard";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Form } from "../ui/form";
import { Input } from "../ui/input";

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("../editor"), {
  // Make sure we turn SSR off
  ssr: false,
});
function QuestionForm() {
  const [isPending, startTransition] = useTransition();
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length >= 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag length must be less than 15 characters.",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already added.",
        });
      }
    }
  };
  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const updatedTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", updatedTags);

    if (updatedTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Add at least one tag.",
      });
    }
  };
  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      const result = await createQuestion(data);
      if (result.success) {
        toast("Success", {
          description: "Question created successfully!",
        });
        if (result.data) {
          redirect(ROUTES.QUESTION(result.data._id));
        } else {
          toast(`Error ${result.status}`, {
            description:
              result.error?.message ||
              "An error occurred while creating the question.",
          });
        }
      }
    });
  };
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FieldGroup>
          <Controller
            name={"title"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex w-full flex-col">
                <FieldLabel
                  htmlFor={field.name}
                  className="paragraph-semibold text-dark400_light800"
                >
                  Question Title <span className="text-primary-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-500"
                    errors={[fieldState.error]}
                  />
                )}
                <FieldDescription className="body-regular text-light-500 mt-2.5  ">
                  Be specific and imagine you’re asking a question to another
                  person.
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name={"content"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex w-full flex-col">
                <FieldLabel
                  htmlFor={field.name}
                  className="paragraph-semibold text-dark400_light800"
                >
                  Detailed explanation of your problem{" "}
                  <span className="text-primary-500">*</span>
                </FieldLabel>
                <Editor
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                  value={field.value}
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-500"
                    errors={[fieldState.error]}
                  />
                )}
                <FieldDescription className="body-regular text-light-500 mt-2.5  ">
                  Introduce the problem and expand on what you put in the title.
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name={"tags"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex w-full flex-col gap-3">
                <FieldLabel
                  htmlFor={field.name}
                  className="paragraph-semibold text-dark400_light800"
                >
                  Tags <span className="text-primary-500">*</span>
                </FieldLabel>
                <div>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                    autoComplete="off"
                    placeholder="Add Tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {field?.value?.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => {
                            handleTagRemove(tag, field);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-500"
                    errors={[fieldState.error]}
                  />
                )}
                <FieldDescription className="body-regular text-light-500 mt-2.5  ">
                  Add up to 5 tags to describe what your question is about. You
                  need to press enter to add tag.
                </FieldDescription>
              </Field>
            )}
          />
          <div className="mt-16 flex justify-end">
            <Button
              disabled={isPending}
              className="primary-gradient w-fit text-light-900!"
            >
              {isPending ? (
                <>
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  <span>Submitting</span>
                </>
              ) : (
                <>Post Your Question</>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </Form>
  );
}

export default QuestionForm;
