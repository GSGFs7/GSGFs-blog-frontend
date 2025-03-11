# 写给自己的 Git 行为规范

1. `git` 每次都尽量提交一个小功能

2. `git` 提交信息要有意义

## commit message 规范

1. **feat** (feature):

   - 添加新功能或新特性
   - 例如：`feat: 添加用户登录功能`

2. **fix**:

   - 修复 bug
   - 例如：`fix: 修复移动端布局错位问题`

3. **docs**:

   - 仅修改文档
   - 例如：`docs: 更新 README 安装说明`

4. **style**:

   - 不影响代码功能的样式修改（如格式化、空格、分号等）
   - 例如：`style: 格式化代码以符合项目规范`

5. **refactor**:

   - 既不修复 bug 也不添加特性的代码重构
   - 例如：`refactor: 重构用户认证逻辑`

6. **perf** (performance):

   - 提高性能的代码更改
   - 例如：`perf: 优化图片加载速度`

7. **test**:

   - 添加或修改测试代码
   - 例如：`test: 为登录功能添加单元测试`

8. **build**:

   - 影响构建系统或外部依赖的更改
   - 例如：`build: 升级 webpack 至最新版本`

9. **ci** (continuous integration):

   - CI 配置文件和脚本的更改
   - 例如：`ci: 配置 GitHub Actions 自动部署`

10. **chore**:

    - 不属于上述类别的其他更改，通常是维护性工作
    - 例如：`chore: 更新依赖包版本`

11. **revert**:
    - 撤销之前的提交
    - 例如：`revert: 撤销提交 abc1234`
