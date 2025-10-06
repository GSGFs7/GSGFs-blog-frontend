"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service

    console.error(error);
  }, [error]);

  const handleReset = () => {
    reset();
  };

  const hardRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <div className="text-center">
        <h2 className="mb-4 text-4xl font-bold">出现了一个错误</h2>
        <div className="max-w-3xl rounded-sm border border-gray-500">
          <p className="mx-4 my-6 to-gray-400">{error.message}</p>
        </div>
      </div>

      <div className="flex flex-col gap-8 sm:flex-row sm:justify-center">
        <button
          className="cursor-pointer text-xl hover:text-gray-300"
          onClick={handleReset}
        >
          重试
        </button>
        <button
          className="cursor-pointer text-xl hover:text-gray-300"
          onClick={hardRefresh}
        >
          刷新
        </button>
      </div>
    </div>
  );
}
