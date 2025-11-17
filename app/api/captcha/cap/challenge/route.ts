import { NextResponse } from "next/server";

import { capServer } from "@/lib/captcha/cap";

export async function POST(): Promise<NextResponse> {
  try {
    const data = await capServer.createChallenge();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
