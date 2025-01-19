export function getRandomInt(minimal: number, maximum: number): number {
  return Math.floor(Math.random() * (maximum - minimal)) + minimal;
}
