import Image from "next/image";

import Link from "../link";

export default function IntroContent() {
  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-2xl">说明</h2>
        <p>
          这里的内容接入了
          <Link
            className="text-blue-500 transition-all hover:text-blue-600"
            href="https://vndb.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            VNDB
          </Link>
          (The Visual Novel Database), 并从中获取评分与标题之类的信息.
        </p>
        <p>对于VNDB的评分, 取10分为满分为基准(除以10).</p>

        <div>
          <p className="pt-4 text-xl">关于评分</p>
          <p>剧情评分以《星空鉄道とシロの旅》为基准, 满分10分.</p>
          <p>角色评分以《フレラバ ～Friend to Lover～》为基准, 满分10分.</p>
          <p>
            另外, 评分会以我对于游戏整体的评价而上下波动
            <span className="line-through">(人话: 纯主观)</span>
          </p>
        </div>

        <div>
          <p className="pt-4 text-xl">另外,</p>
          <p>
            部分条目包含剧透内容,
            留意鼠标指针的变化(如果变化为可点击状态时则表示有隐藏内容).
          </p>
          <p>点击可展开这部分内容, 注意可能包含剧透.</p>
        </div>

        <Image
          alt="旮旯game领域大神"
          height={400}
          src={"https://img.gsgfs.moe/img/54e25ef3f64361a620b1299dcab7ceb6.jpg"}
          width={400}
        />
      </div>
    </>
  );
}
