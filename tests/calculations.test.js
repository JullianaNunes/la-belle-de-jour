import test from "node:test";
import assert from "node:assert/strict";
import {
  estimateYarn,
  convertBalls,
  gaugeCount,
  yarnMetrics,
} from "../src/lib/calculations.js";
const sample = {
  sampleWidth: 10,
  sampleHeight: 10,
  sampleGrams: 5,
  area: 4000,
  ballGrams: 100,
  ballMeters: 250,
  margin: 15,
};
test("sample consumption includes margin once and rounds to complete balls", () => {
  const result = estimateYarn(sample);
  assert.ok(Math.abs(result.grams - 230) < 1e-10);
  assert.ok(Math.abs(result.meters - 575) < 1e-10);
  assert.equal(result.balls, 3);
  assert.equal(estimateYarn({ ...sample, margin: 0 }).balls, 2);
});
test("invalid sample data cannot produce misleading estimates", () => {
  for (const field of [
    "sampleWidth",
    "sampleHeight",
    "sampleGrams",
    "area",
    "ballGrams",
    "ballMeters",
  ]) {
    for (const value of ["", 0, -1, "wrong", Infinity])
      assert.equal(estimateYarn({ ...sample, [field]: value }), null);
  }
  for (const value of [-1, 101, Infinity])
    assert.equal(estimateYarn({ ...sample, margin: value }), null);
});
test("conversions handle exact multiples and partial balls", () => {
  assert.equal(convertBalls(500, 250), 2);
  assert.equal(convertBalls(501, 250), 3);
  assert.equal(convertBalls(100, 0), null);
  assert.equal(gaugeCount(22, 10, 45), 99);
  assert.equal(gaugeCount(23, 10, 15), 35);
  assert.equal(gaugeCount(20, 0, 50), null);
});
test("yarn comparison uses comparable units", () => {
  assert.deepEqual(yarnMetrics({ grams: 100, meters: 500, price: 20 }), {
    tex: 200,
    cost100m: 4,
  });
  assert.equal(yarnMetrics({ grams: 100, meters: 0, price: 20 }), null);
});
