import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";

import {
  getUserById,
  updateUser,
} from "@/src/services/user.service";

import {
  updateUserSchema,
} from "@/src/validation/user.validation";


type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};


// GET /api/users/[id]
export async function GET(
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


    const user =
      await getUserById(userId);


    return NextResponse.json(
      user,
      {
        status: 200,
      }
    );

  } catch (error: any) {

    if (
      error.message ===
      "UNAUTHORIZED"
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
      error.message ===
      "FORBIDDEN"
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


    if (
      error.message ===
      "USER_NOT_FOUND"
    ) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
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


// PUT /api/users/[id]
export async function PUT(
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


    const validation =
      updateUserSchema.safeParse(body);


    if (!validation.success) {
      return NextResponse.json(
        {
          error:
            "Validation failed",

          details:
            validation.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }


    const user =
      await updateUser(
        userId,
        validation.data
      );


    return NextResponse.json(
      user,
      {
        status: 200,
      }
    );

  } catch (error: any) {

    if (
      error.message ===
      "UNAUTHORIZED"
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
      error.message ===
      "FORBIDDEN"
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