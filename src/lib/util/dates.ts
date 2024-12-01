export function parseDate(date: string): Date {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hours = date.slice(9, 11);
  const minutes = date.slice(11, 13);
  const seconds = date.slice(13, 15);
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);
}

export function stringifyDate(date: Date): string {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const year = utcDate.getFullYear();
  const month = utcDate.getMonth() + 1;
  const day = utcDate.getDate();
  const hours = utcDate.getHours();
  const minutes = utcDate.getMinutes();
  const seconds = utcDate.getSeconds();
  return `${year}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")}T${hours.toString().padStart(2, "0")}${minutes.toString().padStart(2, "0")}${seconds.toString().padStart(2, "0")}Z`;
}

export function formatDate(
  date: Date,
  opts: { variant: "short" | "timestamp" },
): string {
  const variant = opts?.variant || "short";
  switch (variant) {
    case "short":
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    case "timestamp":
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
  }
}
