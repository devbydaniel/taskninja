export function parseDate(date: string): Date {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hours = date.slice(9, 11);
  const minutes = date.slice(11, 13);
  const seconds = date.slice(13, 15);
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
