"use client";

import React, { useState } from "react";

import { useBackgroundStore } from "@/lib/store/background";

export default function BackgroundImageSetting() {
  const [url, setUrl] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { backgroundImage, setBackgroundImage } = useBackgroundStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBackgroundImage(url);
    setUrl("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <select>1</select>
      <button>2</button>
    </form>
  );
}
