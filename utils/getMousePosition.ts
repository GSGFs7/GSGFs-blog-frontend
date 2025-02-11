export function getMousePosition(e: React.MouseEvent<HTMLDivElement>) {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
  const rect = e.currentTarget.getBoundingClientRect();

  // 计算 div 中心位置
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // 计算相对中心的位置
  const x = (e.clientX - rect.right + centerX) / centerX;
  const y = (e.clientY - rect.bottom + centerY) / centerY;

  return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
}
