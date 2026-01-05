"use client";
import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { signInUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

function SignUp() {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={signInUpWithCredentials}
    />
  );
}

export default SignUp;
