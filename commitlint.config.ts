module.exports = {
  extends: ["@commitlint/config-conventional"],
  // 自定义规则
  rules: {
    // 禁用正文行长度限制
    "body-max-line-length": [0, "always"],
    // 限制标题长度
    "header-max-length": [2, "always", 100],
    // 确保类型是小写
    "type-case": [2, "always", "lower-case"],
    // 确保主题不以句号结尾
    "subject-full-stop": [2, "never", "."],
  },
};
