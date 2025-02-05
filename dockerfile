# 多阶段构建(Multi-stage builds)

# 构建阶段 包含完整构建环境
FROM node:23-alpine AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 禁用next auth的遥测
ENV NEXT_TELEMETRY_DISABLED=1

# 复现构建环境
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 开始构建
COPY . .

RUN pnpm build

# 运行阶段 只包含运行所需文件和构建产物
FROM node:23-alpine AS runner
WORKDIR /app

# 生产环境
ENV NODE_ENV=production
# 禁用next auth的遥测
ENV NEXT_TELEMETRY_DISABLED=1

# 提取构建产物
# next.config.js next.js的配置文件
COPY --from=builder /app/next.config.js ./
# public 静态资源
COPY --from=builder /app/public ./public
# standalone 构建后的独立运行时
COPY --from=builder /app/.next/standalone ./
# static 客户端静态资源
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD [ "node", "server.js" ]


