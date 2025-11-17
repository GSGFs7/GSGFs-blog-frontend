import { type NextRequest, NextResponse } from "next/server";
import z from "zod";

import { capServer } from "@/lib/captcha/cap";

const schema = z.object({
  token: z.string(),
  solutions: z.array(z.number()),
});

export async function POST(request: NextRequest) {
  try {
    const data = schema.safeParse(await request.json());
    if (!data.success) {
      return NextResponse.json({ message: "schema error" }, { status: 400 });
    }

    const res = await capServer.redeemChallenge(data.data);
    return NextResponse.json(res);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
