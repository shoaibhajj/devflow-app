import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";

async function AskAAQuestion() {
  const session = await auth();
  if (!session) return redirect("/sign-in");
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 ">Ask A Question</h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
}

export default AskAAQuestion;
