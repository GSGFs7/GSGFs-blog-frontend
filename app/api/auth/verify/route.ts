import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";

import { JWT_SECRET as SECRET } from "@/env/private";
import type { sessionType } from "@/types";

const JWT_SECRET = new TextEncoder().encode(SECRET);

// not use cookies
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { token } = (await request.json()) as any;
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const verified = await jwtVerify(token, JWT_SECRET);
    const session = verified.payload as sessionType;
    if (session.type !== "access") {
      return NextResponse.json(
        { error: "Invalid token type" },
        { status: 401 },
      );
    }

    return NextResponse.json(session);
  } catch {
    return NextResponse.json(
      { error: "Invalid token" },
      {
        status: 401,
      },
    );
  }
}
