import { SPARKLINE_CONFIG } from "@/components/biomarkerSparkline/constants";
import type { ReferenceRange } from "@/domain/types";

export type SparklinePoint = {
  id: string;
  value: number;
  sampledAt: string;
};

type SegmentPoint = {
  x: number;
  y: number;
  value: number;
};

type MappedPoint = SparklinePoint & {
  x: number;
  y: number;
  inRange: boolean;
};

type Segment = {
  start: SegmentPoint;
  end: SegmentPoint;
  inRange: boolean;
};

type Tick = {
  value: number;
  y: number;
  label: string;
  key: string;
};

type SparklineModel = {
  width: number;
  height: number;
  baselineY: number;
  paddingX: number;
  gridPaddingRight: number;
  mapped: MappedPoint[];
  segments: Segment[];
  first: MappedPoint;
  middle: MappedPoint;
  last: MappedPoint;
  ticks: Tick[];
};

function getCrossingTs(startValue: number, endValue: number, boundaries: number[]): number[] {
  if (startValue == endValue) return [];
  const delta = endValue - startValue;
  return boundaries
    .map((boundary) => (boundary - startValue) / delta)
    .filter((t) => t > 0 && t < 1)
    .sort((a, b) => a - b);
}

function splitSegmentByRange(
  start: SegmentPoint,
  end: SegmentPoint,
  low: number,
  high: number,
  interpolate: (start: SegmentPoint, end: SegmentPoint, t: number) => SegmentPoint,
): Segment[] {
  if (start.value == end.value) {
    const inRange = start.value >= low && start.value <= high;
    return [{ start, end, inRange }];
  }

  const boundaries = [low, high];
  const tValues = getCrossingTs(start.value, end.value, boundaries);
  const stops = [0, ...tValues, 1];

  return stops.slice(0, -1).map((t0, index) => {
    const t1 = stops[index + 1];
    const midT = (t0 + t1) / 2;
    const midValue = start.value + (end.value - start.value) * midT;
    const inRange = midValue >= low && midValue <= high;
    return {
      start: interpolate(start, end, t0),
      end: interpolate(start, end, t1),
      inRange,
    };
  });
}

function interpolatePoint(start: SegmentPoint, end: SegmentPoint, t: number): SegmentPoint {
  const value = start.value + (end.value - start.value) * t;
  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t,
    value,
  };
}

function mapPoints(
  points: SparklinePoint[],
  reference: ReferenceRange,
  width: number,
  paddingX: number,
  paddingY: number,
  minValue: number,
  valueRange: number,
  usableHeight: number,
): MappedPoint[] {
  const { low, high } = reference;
  const xStep = points.length === 1 ? 0 : (width - paddingX * 2) / (points.length - 1);
  return points.map((point, index) => {
    const x = paddingX + index * xStep;
    const ratio = (point.value - minValue) / valueRange;
    const y = paddingY + (1 - ratio) * usableHeight;
    const inRange = point.value >= low && point.value <= high;
    return { ...point, x, y, inRange };
  });
}

function buildSegments(
  mapped: MappedPoint[],
  reference: ReferenceRange,
  interpolate: (start: SegmentPoint, end: SegmentPoint, t: number) => SegmentPoint,
): Segment[] {
  const { low, high } = reference;
  const edgeSegments: Segment[][] = mapped
    .slice(0, -1)
    .map((point, index) => splitSegmentByRange(point, mapped[index + 1], low, high, interpolate));

  return edgeSegments.flat();
}

function buildTicks(
  min: number,
  max: number,
  minValue: number,
  valueRange: number,
  paddingY: number,
  usableHeight: number,
  tickCount: number,
): Tick[] {
  const count = Math.max(1, tickCount);
  const step = count > 1 ? (max - min) / (count - 1) : 0;

  return Array.from({ length: count }, (_, idx) => {
    const value = max - step * idx;
    const ratio = (value - minValue) / valueRange;
    const y = paddingY + (1 - ratio) * usableHeight;
    const rounded = Math.round(value * 10) / 10;
    const label = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
    const key = `${idx}-${label}`;
    return { value, y, label, key };
  });
}

export function buildSparklineModel(
  points: SparklinePoint[],
  reference: ReferenceRange,
): SparklineModel | null {
  if (points.length < 2) return null;

  const { width, height, paddingX, paddingY, gridPaddingRight, tickCount, paddingRatio } =
    SPARKLINE_CONFIG;

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const point of points) {
    if (point.value < min) min = point.value;
    if (point.value > max) max = point.value;
  }

  const rawRange = max - min;
  const safeRange = rawRange === 0 ? Math.max(1, Math.abs(max) || 1) : rawRange;
  const minValue = min - safeRange * paddingRatio;
  const maxValue = max + safeRange * paddingRatio;
  const valueRange = maxValue - minValue || 1;

  const usableHeight = height - paddingY * 2;
  const baselineY = height - paddingY;

  const mapped = mapPoints(
    points,
    reference,
    width,
    paddingX,
    paddingY,
    minValue,
    valueRange,
    usableHeight,
  );

  const segments = buildSegments(mapped, reference, interpolatePoint);
  const ticks = buildTicks(
    min,
    max,
    minValue,
    valueRange,
    paddingY,
    usableHeight,
    min === max ? 1 : tickCount,
  );

  const first = mapped[0];
  const middle = mapped[Math.floor(mapped.length / 2)];
  const last = mapped[mapped.length - 1];

  return {
    width,
    height,
    baselineY,
    paddingX,
    gridPaddingRight,
    mapped,
    segments,
    first,
    middle,
    last,
    ticks,
  };
}
