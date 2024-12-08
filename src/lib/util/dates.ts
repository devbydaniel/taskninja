export function parseDate(date: string): Date {
  const year = parseInt(date.slice(0, 4), 10);
  const month = parseInt(date.slice(4, 6), 10) - 1;
  const day = parseInt(date.slice(6, 8), 10);
  const hours = date.length > 8 ? parseInt(date.slice(9, 11), 10) : 0;
  const minutes = date.length > 11 ? parseInt(date.slice(11, 13), 10) : 0;
  const seconds = date.length > 13 ? parseInt(date.slice(13, 15), 10) : 0;

  // Create a UTC Date object
  const utcDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds));

  // Convert UTC to local time
  const localDate = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60000,
  );

  return localDate;
}

export function formatDate(
  date: Date,
  opts: { variant: "short" | "timestamp" },
): string {
  const variant = opts?.variant || "short";
  switch (variant) {
    case "short":
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    case "timestamp":
      return date.toLocaleDateString(undefined, {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  }
}
