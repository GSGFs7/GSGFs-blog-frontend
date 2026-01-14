# GSGFs-blog-frontend

使用`Next.js`和`TailwindCSS`构建的个人网站前端.

## 目录

- `app`: 路由
- `components`: 组件
- `config`: 网站设置
- `env`: 环境变量导出
- `hooks`: React hooks
- `lib`: 服务端功能函数
- `markdown`: markdown 文件
- `public`: 静态文件
- `scripts`: 辅助脚本
- `server/backend`: 后端数据交换函数
- `style`: 样式表
- `types`: 类型定义
- `utils`: 实用函数

## 运行

需要`Node.js`和`pnpm`

1. 安装依赖

   ```bash
   pnpm i
   ```

2. 将`.env.example`复制一份为`.env.local`并填写需要的环境变量, 如果不需要某些功能可以不填, 删除即可

3. 运行

   ```bash
   pnpm run dev
   ```

## 开源协议

MIT
