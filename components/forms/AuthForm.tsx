"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as z from "zod";
import { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {
    // TODO: Authenticate user
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign";

  return (
    <Card className="mt-10 space-y-6  w-full sm:max-w-md border-none">
      {/* <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader> */}
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            {Object.keys(defaultValues).map((field) => (
              <Controller
                key={field}
                name={field as Path<T>}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex w-full flex-col gap-2.5 ">
                    <FieldLabel
                      htmlFor={field.name}
                      className="paragraph-medium text-dark400_light700"
                    >
                      {field.name === "email"
                        ? "Email Address"
                        : field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                    </FieldLabel>
                    <Input
                      {...field}
                      required
                      id={field.name}
                      type={field.name === "password" ? "password" : "text"}
                      aria-invalid={fieldState.invalid}
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <Button
            disabled={form.formState.isSubmitting}
            className="primary-gradient paragraph-medium w-full min-h-12 rounded-2 px-4 py-3 font-inter text-light-900!"
            form="form-rhf-demo"
          >
            {form.formState.isSubmitting
              ? buttonText === "Sign In"
                ? "Sign In..."
                : "Sign Up..."
              : buttonText}
          </Button>
          {formType === "SIGN_IN" ? (
            <p>
              {" "}
              Don&apos;t have an account?{" "}
              <Link
                href={ROUTES.SIGN_UP}
                className="paragraph-semibold primary-text-gradient"
              >
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href={ROUTES.SIGN_IN}
                className="paragraph-semibold primary-text-gradient"
              >
                Sign In
              </Link>
            </p>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
};
export default AuthForm;
