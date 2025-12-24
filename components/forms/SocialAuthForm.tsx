"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

import ROUTES from "@/constants/routes";

import { Button } from "../ui/button";

function SocialAuthForm() {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5 cursor-pointer";

  const handleSignIn = async (provider: "GitHub" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
        redirect: false,
      });
    } catch (error) {
      console.error(error);
      toast.error("Sign-in Failed", {
        description:
          error instanceof Error
            ? error.message
            : "An Error occured during sign-in",
        style: {
          background: "#ef4444", // bg-red-500 equivalent
          color: "white",
          border: "none",
        },

        // action: {
        //   label: "Undo",
        //   onClick: () => console.log("Undo"),
        // },
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5 ">
      <Button className={buttonClass} onClick={() => handleSignIn("GitHub")}>
        <Image
          src={"/icons/github.svg"}
          width={20}
          height={20}
          alt="Github logo"
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src={"/icons/google.svg"}
          width={20}
          height={20}
          alt="Google logo"
          className=" mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
}

export default SocialAuthForm;
