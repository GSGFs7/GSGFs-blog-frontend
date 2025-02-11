"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsFingerprint } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";

import Modal from "@/components/modal";
import avatar_png from "@/public/avatar.png";
import osu_svg from "@/public/osu.svg";
import GPG from "@/markdown/GPG.mdx";

export function First() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      toast.error("目前未适配小屏设备");
    }
  }, []);

  async function handleCopyGPG() {
    await navigator.clipboard.writeText(ref.current?.innerText || "");
  }

  return (
    <div className="flex h-full w-full max-w-5xl translate-y-[10%] flex-col md:flex-row">
      <div className="flex-[8]">
        <div className="flex max-w-xl flex-col justify-center gap-y-6 pt-20 text-left text-[#cccccc]">
          <h1 className="text-8xl drop-shadow-lg">Hi!</h1>
          <h2 className="inline-block text-7xl drop-shadow-lg">
            I&apos;m{" "}
            <p className="inline-block bg-gradient-to-b from-blue-400 to-[#0072F5] bg-clip-text text-8xl text-transparent">
              GSGFs
            </p>
          </h2>
          <h2 className="mt-4 text-5xl drop-shadow-lg">A College Student</h2>

          <div className="flex gap-3">
            <a
              className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-[#f0f0f0e6] p-2 transition outline-none hover:scale-105 hover:bg-[#c0c0c0] focus:scale-105 active:scale-105"
              href="https://osu.ppy.sh/users/36335512"
              // 不发送 HTTP referer header 防止目标获取源页面信息
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image alt="osu icon" height="32" src={osu_svg} width="32" />
            </a>

            <a
              className="flex cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-[#f0f0f0e6] p-2 text-[2rem] text-black/80 transition outline-none hover:scale-105 hover:bg-[#c0c0c0] focus:scale-105 active:scale-105"
              href="https://github.com/0GSGFs"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaGithub />
            </a>

            <Modal>
              <Modal.Open opens="gpg-key">
                <button className="flex cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-[#f0f0f0e6] p-2 text-[2rem] text-black/80 transition outline-none hover:scale-105 hover:bg-[#c0c0c0] focus:scale-105 active:scale-105">
                  <BsFingerprint />
                </button>
              </Modal.Open>
              <Modal.Window name="gpg-key">
                <div ref={ref} className="relative">
                  <GPG />

                  <button
                    className="mt-3 w-full cursor-pointer rounded-sm border text-center text-xl text-blue-600"
                    onClick={handleCopyGPG}
                  >
                    复制
                  </button>
                </div>
              </Modal.Window>
            </Modal>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-[5] flex-col">
        <Image
          alt="avatar"
          className="rounded-xl shadow-lg shadow-black/50 transition-all hover:scale-105"
          priority={true}
          quality={100}
          src={avatar_png}
        />
        <div className="group relative flex items-center justify-end">
          {/* absolute 与上面的relative对应 */}
          {show && (
            <p className="absolute w-full -translate-x-1 translate-y-4 text-center text-gray-500">
              图片中的角色是《常轨脱离Creative》中的锦亚澄
            </p>
          )}
          <HiInformationCircle
            className="translate-y-4 cursor-pointer text-xl text-[#cccccc] hover:text-[#c0c0c0]"
            onClick={() => setShow((now) => !now)}
          />
        </div>
      </div>
    </div>
  );
}
