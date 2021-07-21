export function truncateDescription(str, n) {
  if (str !== undefined) {
    return str.length > n ? str?.substr(0, n - 1) + "..." : str
  }
}
