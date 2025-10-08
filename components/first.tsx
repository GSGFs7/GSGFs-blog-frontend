"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsFingerprint } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";

import Modal from "@/components/modal";
import { siteConfig } from "@/config/site";
import avatar_webp from "@/public/favicon.webp";
import osu_svg from "@/public/osu.svg";

export default function First({ gpg }: { gpg: string }) {
  const [show, setShow] = useState<boolean>(false);
  const gpgRef = useRef<HTMLDivElement>(null);

  async function handleCopyGPG() {
    // TODO: enhance this
    try {
      await navigator.clipboard.writeText(gpgRef.current?.innerText || "");
      toast.success("GPG 公钥已复制到剪切板");
    } catch {
      toast.error("GPG 复制失败, 无剪切板权限");
    }
  }

  return (
    <div className="flex h-full min-h-[700px] w-full max-w-5xl flex-col md:translate-y-[10%] md:flex-row lg:translate-y-[30%]">
      <div className="flex-[8]">
        <div className="flex max-w-xl flex-col justify-center gap-y-6 text-left text-[#dadada] sm:pt-20">
          <h1 className="text-7xl drop-shadow-lg sm:text-8xl">Hi!</h1>
          <h2 className="inline-block text-6xl drop-shadow-lg sm:text-7xl">
            I&apos;m{" "}
            <p className="inline-block bg-gradient-to-b from-blue-400 to-[#0072F5] bg-clip-text text-7xl text-transparent sm:text-8xl">
              {siteConfig.author}
            </p>
          </h2>
          <h2 className="text-4xl drop-shadow-lg sm:mt-4 sm:text-5xl">
            A College Student
          </h2>

          <div className="flex gap-3">
            {siteConfig.links.map(({ label, url }) => (
              <a
                key={label}
                aria-label={`访问 ${label} 主页`}
                className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-[#f0f0f0e6] p-2 transition outline-none hover:scale-105 hover:bg-[#c0c0c0] focus:scale-105 active:scale-105"
                href={url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {label === "osu!" && (
                  <Image alt="osu icon" height="32" src={osu_svg} width="32" />
                )}
                {label === "Github" && (
                  <FaGithub style={{ height: 32, width: 32, color: "black" }} />
                )}
              </a>
            ))}

            <div className="hidden md:block">
              <Modal>
                <Modal.Open opens="gpg-key">
                  <button
                    aria-label="查看 GPG 公钥"
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-[#f0f0f0e6] p-2 text-[2rem] text-black/80 transition outline-none hover:scale-105 hover:bg-[#c0c0c0] focus:scale-105 active:scale-105"
                    title="查看 GPG 公钥"
                  >
                    <BsFingerprint />
                  </button>
                </Modal.Open>
                <Modal.Window name="gpg-key">
                  <div className="relative mt-4 mb-2 flex w-xl flex-col items-center justify-center text-sm">
                    <div
                      dangerouslySetInnerHTML={{ __html: gpg }}
                      ref={gpgRef}
                      className="bg-gray-900/45 p-2"
                    />
                    <button
                      aria-label="复制 GPG 公钥"
                      className="mt-4 w-full cursor-pointer rounded-sm border text-center text-xl text-blue-600"
                      onClick={handleCopyGPG}
                    >
                      复制
                    </button>
                  </div>
                </Modal.Window>
              </Modal>
            </div>

            <div className="md:hidden">
              <button
                aria-label="复制 GPG 公钥"
                className="flex cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-[#f0f0f0e6] p-2 text-[2rem] text-black/80 transition outline-none hover:scale-105 hover:bg-[#c0c0c0] focus:scale-105 active:scale-105"
                title="复制 GPG 公钥"
                onClick={handleCopyGPG}
              >
                <BsFingerprint />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-[5] flex-col">
        <Image
          alt="avatar"
          className="rounded-xl shadow-lg shadow-black/50 transition-all hover:scale-105"
          fetchPriority="high"
          loading="eager"
          placeholder="blur"
          priority={true}
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={avatar_webp}
        />
        <div className="group relative flex items-center justify-end">
          <p
            className={`mt-4 w-full text-center text-gray-500 ${show ? "" : "hidden"}`}
            id="image-description"
          >
            图片中的角色是《常轨脱离Creative》中的锦亚澄
          </p>
          <button
            aria-controls="image-description"
            aria-expanded={show}
            aria-label="显示/隐藏图片信息"
            className="mt-5 cursor-pointer text-xl text-[#cccccc] hover:text-[#c0c0c0]"
            tabIndex={0}
            onClick={() => setShow((now) => !now)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShow((prev) => !prev);
              }
            }}
          >
            <HiInformationCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
