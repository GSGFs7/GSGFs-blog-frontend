import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export default async function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">娱乐</h1>
        <p className="text-gray-600 dark:text-gray-300">
          {
            // random choice a message
            siteConfig.entertainmentMessage[
              Math.floor(Math.random() * siteConfig.entertainmentMessage.length)
            ]
          }
        </p>
      </div>

      <div className="flex flex-col items-center gap-18">
        {siteConfig.entertainmentCategories.map((category) => (
          <Link
            key={category.title}
            className="group flex w-full justify-center px-4"
            href={category.href}
          >
            <div className="h-full w-2xl overflow-hidden rounded-lg border border-gray-500 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div
                className={`flex h-32 items-center justify-between bg-transparent bg-gradient-to-br`}
              >
                <span className="pl-8 text-left text-6xl transition-transform duration-500 group-hover:scale-110">
                  {category.icon}
                </span>
                <Image
                  alt="乃愛"
                  className="-z-10 translate-y-30 transition-transform duration-500 transform-fill group-hover:translate-y-0 group-hover:scale-110"
                  height={128}
                  src={"/4.png"}
                  width={128}
                />
              </div>

              <div className="dark:border-gray-700 dark:bg-gray-800">
                <div className="p-6 py-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>

                <div className="px-6 pb-6">
                  <div className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    查看更多
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
