const SEED_POOL_SIZE = 100

export function getRandomSeed() {
  return Math.floor(Math.random() * SEED_POOL_SIZE)
}
