const SEED_POOL_SIZE = 100

export function getRandomSeed() {
  return Math.floor(Math.random() * SEED_POOL_SIZE)
}

// WC2026 runs entirely during CEST (UTC+2). The match day boundary is noon Berlin
// time (10:00 UTC), so overnight matches (e.g. 02:00 CEST) group with the
// preceding evening rather than the next calendar day.
export function berlinMatchDay(date) {
  const BOUNDARY_UTC_MS = 10 * 60 * 60 * 1000 // noon CEST = 10:00 UTC
  return new Date(new Date(date).getTime() - BOUNDARY_UTC_MS).toISOString().slice(0, 10)
}
