"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { AskQuestionSchema } from "@/lib/validations";

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

function QuestionForm() {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const handleCreateQuestion = () => {};
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
                Editor
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
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                    autoComplete="off"
                    placeholder="Add Tags..."
                  />
                  Tags
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
            <Button className="primary-gradient w-fit text-light-900!">
              Post Your Question
            </Button>
          </div>
        </FieldGroup>
      </form>
    </Form>
  );
}

export default QuestionForm;
