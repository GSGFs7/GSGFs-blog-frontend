import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export default async function Page() {
  return (
    <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">娱乐</h1>
        <p className="text-gray-300">
          {
            // random choice a message
            siteConfig.entertainmentMessage[
              Math.floor(Math.random() * siteConfig.entertainmentMessage.length)
            ]
          }
        </p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {siteConfig.entertainmentCategories.map((category) => (
          <div
            key={category.title}
            className="relative flex h-64 w-full items-center justify-center"
          >
            <Link
              className="group absolute inset-0 mx-auto flex max-w-2xl items-center justify-center px-4"
              href={category.href}
              prefetch={true}
            >
              <section className="w-full overflow-hidden rounded-lg border border-gray-500 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="flex h-32 items-center justify-between">
                  <span className="pl-8 text-left text-6xl transition-transform duration-500 group-hover:scale-110">
                    {category.icon}
                  </span>
                  <div className="relative h-32 w-32 overflow-hidden">
                    <Image
                      alt="乃愛"
                      className="absolute translate-y-32 transform transition-transform duration-500 group-hover:translate-y-0 group-hover:scale-110"
                      height={128}
                      src={"/4.png"}
                      width={128}
                    />
                  </div>
                </div>

                <div className="h-full border-gray-700 bg-gray-800">
                  <div className="p-6 py-2">
                    <h3 className="text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                    <p className="text-gray-300">{category.description}</p>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-500">
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
              </section>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
