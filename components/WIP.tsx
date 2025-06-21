"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

interface WIPProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  backUrl?: string;
  className?: string;
}

export default function WIP({
  title = "施工中",
  message = "正在努力创建新文件夹",
  showBackButton = true,
  backUrl = "/",
  className = "",
}: WIPProps) {
  const [process, setProcess] = useState(0);
  const [icon, setIcon] = useState<0 | 1>(1);
  const [nowTask, setNowTask] = useState("");

  const tasks: string[] = [
    "🛠️ 构建环境",
    "📦 安装依赖",
    "🧩 加载组件",
    "📝 写入配置",
    "🔒 校验权限",
    "📊 统计信息",
    "🖼️ 加载资源",
    "⏳ 等待响应",
    "🧰 准备工具",
    "🎉 即将完成",
    "🔧 配置参数",
    "🎨 渲染界面",
    "🧪 运行测试",
    "🧹 清理缓存",
    "📦 打包资源",
    "🚀 准备发布",
    "🌠 正在许愿",
    "🌐 连接服务器",
    "🧭 导航初始化",
    "🤔 重新计算中",
    "🪄 魔法加载中",
    "🔍 扫描文件系统",
    "📁 创建目录结构",
    "😅 出了点小问题",
    "💫 魔法正在发生",
    "🎲 触发随机事件",
    "🔄 正在同步数据",
  ];

  // Automatically update messages
  useEffect(() => {
    const interval = setInterval(
      () => {
        setProcess((prev) => {
          let newProgress = prev;

          while (newProgress === prev) {
            newProgress = Math.floor(Math.random() * 256); // 0-255
          }

          return newProgress;
        });

        setNowTask((prev) => {
          let newTask = prev;

          while (newTask === prev) {
            newTask = tasks[Math.floor(Math.random() * tasks.length)];
          }

          return newTask;
        });

        if (Math.random() < 0.1) {
          setIcon(0);
        }
      },
      300 + Math.random() * 100,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={clsx(
        `flex min-h-[60vh] flex-col items-center justify-center px-4 py-16`,
        className,
      )}
    >
      {/* Icon */}
      <div className="mb-8 flex items-center gap-4">
        <span className="animate-spin text-6xl">
          {
            // Dizzy or not
            icon === 0 ? "🌀" : "⚠️"
          }
        </span>
      </div>

      <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl dark:text-white">
        {title}
      </h1>
      <p className="mb-8 max-w-md text-center text-lg text-gray-600 dark:text-gray-300">
        {message}
      </p>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="w-64 rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={clsx(
              "h-2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-600",
            )}
            style={{ width: process }} // max width = 256px
          />
        </div>
        <p className="text-center">当前进度: {nowTask}</p>
      </div>

      {showBackButton && (
        <Link
          className="group inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-all duration-300 hover:text-gray-300"
          href={backUrl}
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          <p className="">返回首页</p>
        </Link>
      )}

      {/* <div className="mt-12 flex gap-4 opacity-50">
        <div className="h-2 min-h-[0.5rem] w-2 min-w-[0.5rem] animate-ping rounded-full bg-blue-500" />
        <div
          className="h-2 min-h-[0.5rem] w-2 min-w-[0.5rem] animate-ping rounded-full bg-purple-500"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="h-2 min-h-[0.5rem] w-2 min-w-[0.5rem] animate-ping rounded-full bg-pink-500"
          style={{ animationDelay: "0.4s" }}
        />
      </div> */}
    </div>
  );
}
