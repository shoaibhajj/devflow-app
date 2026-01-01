import { NextResponse } from "next/server";

import Account, { IAccount } from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse, APIResponse } from "@/types/global";

export async function GET(): Promise<APIResponse<IAccount[]>> {
  try {
    await dbConnect();

    const accounts = await Account.find();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Create user
export async function POST(request: Request): Promise<APIResponse<IAccount>> {
  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = AccountSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const existingAccount = await Account.findOne({
      provider: validatedData.data.provider,
      providerAccountId: validatedData.data.providerAccountId,
    });
    if (existingAccount) {
      throw new ForbiddenError(
        "An account with the same provider already exists"
      );
    }

    const newAccont = await Account.create(validatedData.data);

    return NextResponse.json(
      { success: true, data: newAccont },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
