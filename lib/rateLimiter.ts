type RateLimitEntry = {
  count: number
  lastRequest: number
}

const RATE_LIMIT = 5 // max 5 requests
const TIME_WINDOW = 60 * 1000 // per 1 minute

// Memory store {ip: {count, lastRequest}}
const requests = new Map<string, RateLimitEntry>()

export function rateLimiter(ip: string): boolean {
  const now = Date.now()
  const entry = requests.get(ip)

  if (!entry) {
    requests.set(ip, { count: 1, lastRequest: now })
    return true
  }

  // Reset if time window expired
  if (now - entry.lastRequest > TIME_WINDOW) {
    requests.set(ip, { count: 1, lastRequest: now })
    return true
  }

  // If within window, check count
  if (entry.count >= RATE_LIMIT) {
    return false
  }

  entry.count += 1
  entry.lastRequest = now
  requests.set(ip, entry)
  return true
}
