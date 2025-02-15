"use client";

import React, { useState } from "react";

import { useBackgroundStore } from "@/lib/store/background";

export default function BackgroundImageSetting() {
  const [url, setUrl] = useState("");
  const { backgroundImage, setBackgroundImage } = useBackgroundStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBackgroundImage(url);
    setUrl("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <select></select>
      <button></button>
    </form>
  );
}
