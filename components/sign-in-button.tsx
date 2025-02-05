import Image from "next/image";

import { signIn } from "@/app/auth";

export default function SigninButton({
  img,
  name,
  disabled = false,
}: {
  img: string;
  name: string;
  disabled?: boolean;
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(name);
      }}
    >
      <button
        className={`my-4 flex w-full flex-col items-center rounded-sm border-gray-300/80 px-24 py-2 text-black shadow-lg shadow-black ${disabled ? "cursor-not-allowed bg-gray-400" : "bg-gray-200 hover:bg-gray-300"}`}
        disabled={disabled}
        type="submit"
      >
        <Image alt={`${name} icon`} src={img} width={32} />
        <span>Signin with {name}</span>
      </button>
    </form>
  );
}
