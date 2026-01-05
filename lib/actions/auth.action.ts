"use server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { signIn } from "@/auth";
import Account from "@/database/account.model";
import User from "@/database/user.model";
import { ActionResponse, ErrorResponse } from "@/types/global";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import { SignInSchema, SignUpSchema } from "../validations";

export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validatingResult = await action({ params, schema: SignUpSchema });

  if (validatingResult instanceof Error) {
    return handleError(validatingResult) as ErrorResponse;
  }

  const { name, email, password, username } = validatingResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) {
      throw new Error("Username is already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });
    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );
    await session.commitTransaction();

    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validatingResult = await action({ params, schema: SignInSchema });

  if (validatingResult instanceof Error) {
    return handleError(validatingResult) as ErrorResponse;
  }

  const { email, password } = validatingResult.params!;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new NotFoundError("User");
    }
    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });
    if (!existingAccount) {
      throw new NotFoundError("Account");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingAccount.password!
    );
    if (!isPasswordValid) {
      throw new Error("Invalid Eamil or Password");
    }

    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
