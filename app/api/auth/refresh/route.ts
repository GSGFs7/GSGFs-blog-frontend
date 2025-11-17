import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET!,
);

export async function GET(_request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token not found" },
      { status: 401 },
    );
  }

  try {
    const { payload } = (await jwtVerify(refreshToken, JWT_REFRESH_SECRET)) as {
      payload: {
        id: number;
        name: string;
        avatar_url: string;
        provider: string;
        type: string;
      };
    };

    if (payload.type !== "refresh") {
      return NextResponse.json(
        { error: "Invalid token type" },
        { status: 401 },
      );
    }

    // Use the name attribute stored directly in the refresh token
    const show_name = payload.name || "";

    const accessToken = await new SignJWT({
      id: payload.id,
      name: show_name,
      avatar_url: payload.avatar_url,
      provider: payload.provider,
      type: "access",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(JWT_SECRET);

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1, // 1 hour
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Token refresh error:", e);

    // clean invalid tokens
    cookieStore.delete("refresh_token");
    cookieStore.delete("access_token");

    return NextResponse.json(
      { error: "Invalid or expired refresh token" },
      { status: 401 },
    );
  }
}
