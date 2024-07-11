export function prepareSearchQueryForTsQuery(searchString: string): string {
  const trimmed = searchString.trim();
  if (!trimmed) return "";

  // Replace one or more spaces with " & ", and escape single quotes
  return trimmed.replace(/\s+|'/g, (match) => (match === "'" ? "''" : " & "));
}
