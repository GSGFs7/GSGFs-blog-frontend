import { redirect } from "next/navigation";

import SignoutButton from "@/components/sign-out-button";
import { getSession } from "@/lib/auth";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <SignoutButton />
    </div>
  );
}
