import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export async function GET(_request: NextRequest) {
  try {
    // TODO replace here
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: "black",
            background: "white",
            width: "100%",
            height: "100%",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>
            👋 Hello 你好 नमस्ते こんにちは สวัสดีค่ะ 안녕 добрий день Hallá
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error generating OG image:", error);

    return new Response("Failed to generate OG image", { status: 500 });
  }
}
