import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

// a router that allows client components access the session
export async function GET() {
  const session = await getSession();

  return NextResponse.json(session);
}
