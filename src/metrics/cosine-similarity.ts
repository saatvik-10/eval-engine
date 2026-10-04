export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same dimensions');
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    const valueA = a[i];
    const valueB = b[i];

    if (valueA === undefined || valueB === undefined) {
      throw new Error('Either a or b is missing!');
    }

    dotProduct += valueA * valueB;
    magnitudeA += valueA ** 2;
    magnitudeB += valueB ** 2;
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    throw new Error('Cannot calculate similarity for zero vectors');
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}
