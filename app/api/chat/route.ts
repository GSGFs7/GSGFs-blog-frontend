import { type NextRequest, NextResponse } from "next/server";
import z from "zod";

import { NEXT_PUBLIC_SITE_URL } from "@/env/public";
import { googleChatStream } from "@/lib/ai/google";
import { verifyCaptchaToken } from "@/lib/captcha";
import { checkRateLimit } from "@/lib/ratelimit";
import { getIP } from "@/utils/ip";

const schema = z.object({
  captcha_token: z.string().length(47),
  message: z.string().trim().min(1).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getIP(request.headers);
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json({ message: "Too fast" }, { status: 429 });
    }

    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    if (!verifyCaptchaToken(parsed.data.captcha_token)) {
      return NextResponse.json({ message: "CAPTCHA failed" }, { status: 400 });
    }

    const result = await googleChatStream([
      { role: "user", content: parsed.data.message },
    ]);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result) {
          const content = chunk.text;
          if (content) {
            controller.enqueue(content);
          }
        }
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Access-Control-Allow-Origin": NEXT_PUBLIC_SITE_URL,
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Something error" }, { status: 500 });
  }
}
