"use client";

import clsx from "clsx";

import { useAuth } from "@/app/providers";

import { useComment } from "./provider";

export default function Button() {
  const { session } = useAuth();
  const { isPending } = useComment();

  if (!session) {
    <button
      className={clsx(
        `mr-2 rounded-lg bg-blue-600 px-4 py-2 sm:px-5`,
        "cursor-not-allowed bg-blue-800 text-gray-400",
      )}
      form="comment-form"
      type="submit"
    >
      Submit
    </button>;
  }

  return (
    <button
      className={clsx(
        `mr-2 rounded-lg bg-blue-600 px-4 py-2 sm:px-5`,
        !isPending
          ? "cursor-pointer"
          : "cursor-not-allowed bg-blue-800 text-gray-400",
      )}
      form="comment-form"
      type="submit"
    >
      {isPending ? "Submitting" : "Submit"}
    </button>
  );
}
