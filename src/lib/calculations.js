const positive = (value) => Number.isFinite(Number(value)) && Number(value) > 0;
export function estimateYarn({
  sampleWidth,
  sampleHeight,
  sampleGrams,
  area,
  ballGrams,
  ballMeters,
  margin,
}) {
  if (
    ![
      sampleWidth,
      sampleHeight,
      sampleGrams,
      area,
      ballGrams,
      ballMeters,
    ].every(positive) ||
    !Number.isFinite(Number(margin)) ||
    Number(margin) < 0 ||
    Number(margin) > 100
  )
    return null;
  const grams =
    (Number(area) / (Number(sampleWidth) * Number(sampleHeight))) *
    Number(sampleGrams) *
    (1 + Number(margin) / 100);
  const meters = (grams * Number(ballMeters)) / Number(ballGrams);
  if (![grams, meters].every(Number.isFinite)) return null;
  return { grams, meters, balls: Math.ceil(grams / Number(ballGrams)) };
}
export function convertBalls(meters, ballMeters) {
  return [meters, ballMeters].every(positive)
    ? Math.ceil(Number(meters) / Number(ballMeters))
    : null;
}
export function gaugeCount(count, sampleCm, targetCm) {
  return [count, sampleCm, targetCm].every(positive)
    ? Math.round((Number(count) / Number(sampleCm)) * Number(targetCm))
    : null;
}
export function yarnMetrics(yarn) {
  if (![yarn.grams, yarn.meters, yarn.price].every(positive)) return null;
  return {
    tex: (Number(yarn.grams) / Number(yarn.meters)) * 1000,
    cost100m: (Number(yarn.price) / Number(yarn.meters)) * 100,
  };
}
