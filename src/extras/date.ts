export function convertUnixTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return date.toLocaleDateString("ja-JP", options).replace(/\//g, "-");
}
