import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import { apiGetBackendStatus } from "@/server/backend";

// a router that allows client components access the session
export async function GET() {
  const session = await getSession();

  // not wait it, let itself run in the back
  apiGetBackendStatus();

  return NextResponse.json(session);
}
