"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useBackgroundStore } from "@/lib/store/background";

export default function BackgroundImage() {
  const { backgroundImage } = useBackgroundStore();
  const [mounted, setMounted] = useState(false);

  // 避免在水合之前渲染
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!backgroundImage) return null;

  return (
    <div className="fixed inset-0 h-full w-full">
      <Image
        fill
        priority
        alt="background image"
        className="-z-10 object-cover"
        src={backgroundImage}
      />
    </div>
  );
}
