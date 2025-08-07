export function formatDate(dateString: string): string {
  if (!dateString || isNaN(Date.parse(dateString))) {
    return "unknown";
  }

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

/**
 * get the oldest date
 * @param dates date string
 * @returns the oldest date
 */
export function getOldestDate(dates: string[]): string {
  if (!dates || dates.length === 0) {
    return "";
  }

  return dates.reduce((oldest, current) => {
    const oldestDate = new Date(oldest);
    const currentDate = new Date(current);

    return currentDate < oldestDate ? current : oldest;
  }, dates[0]);
}

/**
 * get the time difference from now in days
 * @param dateString the date need calculate
 * @returns how many days difference
 */
export function getTimeDiffDays(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  return diffDay;
}

/**
 * get the time difference from now in minutes
 * @param dateString the date need calculate
 * @returns how many days difference
 */
export function getTimeDiffMins(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);

  return diffMin;
}
