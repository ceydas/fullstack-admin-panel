// Utility function for deep cloning: for arrays and nested objects
export function deepClone(obj: Object) {
  return JSON.parse(JSON.stringify(obj))
}

export default function getCurrentTime(): string {
  const now = new Date()

  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const year = now.getFullYear()

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${month}/${day}/${year} ${hours}:${minutes}`
}
