"use server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { signIn } from "@/auth";
import Account from "@/database/account.model";
import User from "@/database/user.model";
import { ActionResponse, ErrorResponse } from "@/types/global";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { SignUpSchema } from "../validations";

export async function signInUpWithCredentials(
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
