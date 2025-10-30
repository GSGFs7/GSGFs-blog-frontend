# 多阶段构建(Multi-stage builds)

# 构建阶段
FROM node:24-alpine AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 复现构建环境
COPY package.json pnpm-lock.yaml ./

# 设置 pnpm 配置
RUN npm install -g pnpm && \
  pnpm config set network-timeout 300000 && \
  pnpm install --frozen-lockfile

# 开始构建
COPY . .
# 添加内存限制参数
ENV NODE_OPTIONS="--max_old_space_size=4096"
RUN pnpm build

# 运行阶段 只包含运行所需文件和构建产物
FROM node:24-alpine AS runner
WORKDIR /app

# 普通用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 生产环境
ENV NODE_ENV=production
# 禁用next auth的遥测
ENV NEXT_TELEMETRY_DISABLED=1

# 提取构建产物
# public 静态资源
COPY --from=builder /app/public ./public
# standalone 构建后的独立运行时
COPY --from=builder /app/.next/standalone ./
# static 客户端静态资源
COPY --from=builder /app/.next/static ./.next/static
# 复制环境
COPY --from=builder /app/.env* ./

RUN chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD [ "node", "server.js" ]
