import { siteConfig } from "@/config/site";
import "@/styles/privacy.css";

export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">隐私协议</h1>
      <div className="privacy max-w-none">
        <p className="text-lg">最后更新日期: 2025年10月30日</p>

        <h2 className="mt-8">概述</h2>
        <p>
          本网站 ({siteConfig.siteName})
          高度重视您的隐私.我们采取最小化数据收集原则, 仅在必要情况下收集信息.
          本隐私协议旨在向您说明我们如何收集、使用和保护您的个人信息.
        </p>

        <h2 className="mt-6">网站托管与 CDN</h2>
        <p>
          本网站前端托管在 Vercel/Cloudflare Worker 平台上, 并使用 Cloudflare
          作为 CDN 服务提供商. 这意味着:
        </p>

        <ul>
          <li>
            基础的访问日志 (如 IP 地址、请求时间、访问页面等) 由 Vercel 和
            Cloudflare 按照其各自的隐私政策收集和处理,
            我们无法直接访问这些原始数据
          </li>
          <li>
            我们建议您查阅{" "}
            <a
              className="text-blue-400 hover:underline"
              href="https://vercel.com/legal/privacy-policy"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vercel 的隐私政策
            </a>{" "}
            和{" "}
            <a
              className="text-blue-400 hover:underline"
              href="https://www.cloudflare.com/privacypolicy/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Cloudflare 的隐私政策
            </a>
          </li>
        </ul>
        <p>
          此外，我们维护一台自有的 VPS 通过 Docker 部署与管理. 该 VPS
          仅用于加速部分地区的访问速度, 不会记录访问日志或用于流量分析.
        </p>

        <h2 className="mt-6">我们收集的信息</h2>
        <p>我们仅在以下情况下收集用户信息: </p>
        <ul>
          <li>
            <strong>用户登录时</strong>: 当您使用第三方服务 (如 GitHub) 登录时,
            我们会接收并存储您的用户名和头像 URL, 用于展示您的评论身份
          </li>
          <li>
            <strong>发表评论时</strong>:
            您的评论内容和评论时使用的浏览器信息会被记录, 用于展示评论及防止滥用
          </li>
          <li>
            <strong>Cookies</strong>: 仅用于维持您的登录状态,
            不会用于跟踪或分析行为
          </li>
        </ul>

        <h2 className="mt-6">不收集的信息</h2>
        <p>除非您主动提供, 否则我们不会收集以下信息: </p>
        <ul>
          <li>您的电子邮件地址</li>
          <li>您的详细浏览历史或行为模式</li>
          <li>您的设备详细信息</li>
        </ul>

        <h2 className="mt-6">信息使用</h2>
        <p>收集的有限信息仅用于: </p>
        <ul>
          <li>维护评论功能正常运行</li>
          <li>防止垃圾评论和滥用行为</li>
        </ul>

        <h2 className="mt-6">第三方服务</h2>
        <p>
          本网站使用以下第三方服务.当您与这些功能互动时,
          您可能受到这些服务的隐私政策约束:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong>: 网站前端托管平台
          </li>
          <li>
            <strong>Cloudflare</strong>: 内容分发网络 (CDN)
          </li>
          <li>
            <strong>GitHub OAuth</strong> & <strong>OSU OAuth</strong>:
            用户认证服务
          </li>
          <li>
            <strong>Cloudflare Turnstile</strong>: 用于防止机器人. 这些数据由
            Cloudflare 根据其隐私政策处理与保存。详情请参阅{" "}
            <a
              className="text-blue-400 hover:underline"
              href="https://developers.cloudflare.com/turnstile/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Turnstile 开发者文档
            </a>{" "}
            和{" "}
            <a
              className="text-blue-400 hover:underline"
              href="https://www.cloudflare.com/privacypolicy/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Cloudflare 隐私政策
            </a>
            。
          </li>
        </ul>
        <p>我们不会将您的数据出售或共享给任何第三方用于营销或广告目的.</p>

        <h2 className="mt-6">数据存储</h2>
        <p>
          用户评论和登录信息存储在我们自己维护的后端服务器上.我们仅在您主动与网站交互
          (如登录或发表评论) 时才会收集和存储相关信息.
        </p>

        <h2 className="mt-6">数据安全</h2>
        <p>
          我们采取合理的技术措施保护您的信息安全,
          防止未经授权的访问、使用或披露. 所有与用户认证相关的数据传输均采用
          HTTPS 加密.
        </p>

        <h2 className="mt-6">您的权利</h2>
        <p>作为用户, 您拥有以下权利: </p>
        <ul>
          <li>访问您提供给我们的个人数据</li>
          <li>要求更正不准确的数据</li>
          <li>要求删除您的账户数据和评论</li>
          <li>拒绝使用 Cookie (这可能影响某些功能的使用) </li>
        </ul>

        <h2 className="mt-6">联系方式</h2>
        <p>
          如果您对本隐私协议有任何疑问或顾虑,
          请通过About页面的联系方式与我们取得联系
        </p>

        <h2 className="mt-6">协议变更</h2>
        <p>
          我们可能会不时更新本隐私协议. 任何变更都将在本页面发布.
          建议您定期查看本页面以了解我们如何保护您的信息.
        </p>
      </div>
    </div>
  );
}
