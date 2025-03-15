# GSGFs-blog-frontend

使用`Next.js`和`TailwindCSS`构建的个人网站前端

## 目录规划

- `app`: 路由
- `components`: 组件
- `config`: 网站设置
- `hooks`: hooks
- `lib`: 服务端功能函数
- `markdown`: mdx
- `public`: 静态文件
- `scripts`: 辅助脚本
- `server`: 后端数据交换函数
- `style`: 样式表
- `types`: 类型定义
- `utils`: 实用函数

## 如何运行

需要`Node.js`和`pnpm`

1. 安装依赖

   ```bash
   pnpm i
   ```

2. 将`.env.example`复制一份为`.env.local`并填写需要的环境变量

3. 运行

   _需要将`next.config.ts`中的`remarkGfm`改为`["remark-gfm"]`_

   ```bash
   pnpm run dev
   ```

## 如何部署

_需要将`next.config.ts`中的`["remark-gfm"]`改回为`remarkGfm`_

1. 直接构建并部署

   1. 构建

      ```bash
      pnpm run build
      ```

   2. 运行

      ```bash
      pnpm run start
      ```

   _如果需要更小的文件, 可以参考`dockerfile`中的方式部署._

2. docker 部署

   1. 构建镜像

      ```bash
      docker build -t blog .
      ```

   2. 运行

      ```bash
      docker run -d -p 3000:3000 blog
      ```

3. vercel 部署

   复制本仓库到自己的仓库后, 在 vercel 上即可部署

## 提交commit

因为配置了`commitlint`和`husky`, 所以提交时需要遵守[conventional commit](https://www.conventionalcommits.org/zh-hans/v1.0.0/)规范

## 开源协议

MIT
