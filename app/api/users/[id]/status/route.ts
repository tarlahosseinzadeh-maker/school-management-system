import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";

import {
  updateUserStatus,
} from "@/src/services/user.service";


type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};


// PATCH /api/users/[id]/status
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {

    await requireRole(["PRINCIPAL"]);


    const { id } =
      await context.params;


    const userId = Number(id);


    if (
      !Number.isInteger(userId) ||
      userId <= 0
    ) {
      return NextResponse.json(
        {
          error: "Invalid user id",
        },
        {
          status: 400,
        }
      );
    }


    const body =
      await request.json();


    if (
      typeof body.isActive !== "boolean"
    ) {
      return NextResponse.json(
        {
          error:
            "isActive must be boolean",
        },
        {
          status: 400,
        }
      );
    }


    const user =
      await updateUserStatus(
        userId,
        body.isActive
      );


    return NextResponse.json(
      user,
      {
        status: 200,
      }
    );


  } catch (error: any) {


    if (
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }


    if (
      error.message === "FORBIDDEN"
    ) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }


    console.error(error);


    return NextResponse.json(
      {
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}