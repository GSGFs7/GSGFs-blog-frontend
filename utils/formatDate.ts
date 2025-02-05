export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    // minute: "2-digit",
    timeZone: "Asia/Shanghai",
  }).format(date);
}
