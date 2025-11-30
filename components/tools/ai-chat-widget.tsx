"use client";

import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  LuBotMessageSquare,
  LuMessageCircleCode,
  LuSend,
  LuX,
} from "react-icons/lu";

import { useInvisibleCap } from "@/hooks/useInvisibleCap";
import { commentMarkdownToHtml } from "@/utils/markdown";

interface Message {
  from: "bot" | "user";
  text: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamResponse, setStreamResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Nyallo! How can I help you today?" },
  ]);
  const getCapToken = useInvisibleCap();

  const handleMainButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") {
      return;
    }

    const newMessages: Message[] = [
      ...messages,
      { from: "user" as const, text: userInput },
    ];

    setUserInput("");
    setMessages(newMessages);
    setIsStreaming(true);

    if (!getCapToken) {
      toast.error("人机验证失败");
      return;
    }
    const token = await getCapToken();

    let result = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          captcha_token: token.token,
        }),
      });

      if (!res.body) {
        toast.error("生成内容时出现错误");
        setMessages((prev) => [...prev, { from: "bot", text: "[error]" }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        setStreamResponse(result);
      }
    } catch (e) {
      console.error(e);
    }

    const htmlResult = await commentMarkdownToHtml(result);
    setMessages((prev) => [...prev, { from: "bot", text: htmlResult }]);
    setIsStreaming(false);
    setStreamResponse("");
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    await handleSendMessage();
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {isOpen && (
        <div
          className={clsx(
            "absolute right-4 bottom-16 w-80 overflow-hidden",
            "rounded-lg border border-gray-700 shadow-sm shadow-black",
          )}
        >
          <header className="flex h-14 items-center justify-between bg-gray-700 p-2">
            <div className="relative grow px-1">
              <h3 className="text-xl">AI Assistant</h3>
            </div>
            <button
              className="cursor-pointer text-xl"
              type="reset"
              onClick={() => setIsOpen(false)}
            >
              <LuX />
              <span className="sr-only">Close chat</span>
            </button>
          </header>

          <div className="max-h-192 min-h-80 gap-2 space-y-2 overflow-y-scroll bg-gray-800 p-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={clsx(
                  "flex items-end gap-2",
                  message.from === "bot" ? "justify-start" : "justify-end",
                )}
              >
                {/* bot avatar */}
                {message.from === "bot" && (
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gray-600 p-1.5">
                    <LuBotMessageSquare className="h-full w-full" />
                  </div>
                )}
                {/* message */}
                <div className="rounded-lg bg-gray-600 px-3 py-2">
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                </div>
              </div>
            ))}
            {isStreaming && (
              <div
                key={"stream-tmp"}
                className="flex items-end justify-start gap-2"
              >
                <div className="h-8 w-8 shrink-0 rounded-full bg-gray-600 p-1.5">
                  <LuBotMessageSquare className="h-full w-full" />
                </div>

                <div className="rounded-lg bg-gray-600 px-3 py-2">
                  {streamResponse ? (
                    <p>{streamResponse}</p>
                  ) : (
                    <div className="spinner-mini" />
                  )}
                </div>
              </div>
            )}
          </div>

          <footer
            className={clsx(
              "flex h-14 items-center border-t",
              "border-gray-700 bg-gray-800 px-2",
              "transition-colors duration-150",
            )}
          >
            <input
              className={clsx(
                "w-full rounded-lg bg-gray-700 p-1 outline-none",
                "disabled:cursor-not-allowed disabled:opacity-80",
              )}
              disabled={isStreaming}
              placeholder="喵~ (请勿输入任何敏感信息)"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <button
              className={clsx(
                "cursor-pointer pl-2 text-xl text-blue-500",
                "hover:text-blue-600 disabled:hover:text-blue-500",
                "disabled:cursor-not-allowed disabled:opacity-80",
              )}
              disabled={isStreaming}
              type="submit"
              onClick={() => handleSendMessage()}
            >
              <LuSend className="" />
            </button>
          </footer>
        </div>
      )}

      <button
        className="cursor-pointer rounded-full border-gray-600 bg-blue-500/60 p-2"
        type="button"
        onClick={() => handleMainButtonClick()}
      >
        <LuMessageCircleCode className="h-8 w-8" />
        <span className="sr-only">Open chat</span>
      </button>
    </div>
  );
}
