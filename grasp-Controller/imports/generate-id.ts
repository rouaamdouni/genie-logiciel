export function generateId(): string {
  const timestamp = Date.now().toString(16)
  const randomValue = Math.floor(Math.random() * 1000000000).toString(16)
  return `${timestamp}${randomValue}`.padEnd(24, "0")
}
