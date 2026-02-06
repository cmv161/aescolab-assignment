import { useMemo } from "react";

import { buildSparklineModel, type SparklinePoint } from "@/components/biomarkerSparkline/model";
import { formatDate } from "@/lib/formatDate";

export function BiomarkerSparkline({
  points,
  selectedId,
  reference,
}: {
  points: SparklinePoint[];
  selectedId?: string;
  reference: import("@/domain/types").ReferenceRange;
}) {
  const chart = useMemo(() => buildSparklineModel(points, reference), [points, reference]);

  if (!chart) {
    return (
      <div className="mt-4 rounded-lg border border-border bg-bg p-4 text-xs text-muted">
        No trend available yet. Only 1 result.
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-border bg-bg p-4">
      <svg
        className="h-[140px] w-full"
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        role="img"
        aria-label="Biomarker trend"
      >
        <g className="stroke-border/40" strokeWidth={1} strokeDasharray="3 3">
          {chart.ticks.map((tick) => (
            <line
              key={`grid-${tick.key}`}
              x1={chart.paddingX}
              x2={chart.width - chart.gridPaddingRight}
              y1={tick.y}
              y2={tick.y}
            />
          ))}
        </g>
        <g className="fill-muted text-[10px]">
          {chart.ticks.map((tick) => (
            <text key={`tick-${tick.key}`} x={4} y={tick.y} dominantBaseline="middle">
              {tick.label}
            </text>
          ))}
        </g>

        {chart.segments.map((segment) => (
          <path
            key={`fill-${segment.start.x}-${segment.end.x}-${segment.inRange}`}
            d={`M ${segment.start.x} ${segment.start.y} L ${segment.end.x} ${segment.end.y} L ${segment.end.x} ${chart.baselineY} L ${segment.start.x} ${chart.baselineY} Z`}
            className={
              segment.inRange
                ? "fill-emerald-500/10 dark:fill-emerald-500/15"
                : "fill-amber-500/10 dark:fill-amber-500/15"
            }
          />
        ))}

        {chart.segments.map((segment) => (
          <path
            key={`line-${segment.start.x}-${segment.end.x}-${segment.inRange}`}
            d={`M ${segment.start.x} ${segment.start.y} L ${segment.end.x} ${segment.end.y}`}
            className={
              segment.inRange
                ? "stroke-current text-emerald-700/80 dark:text-emerald-300/80"
                : "stroke-current text-amber-800/80 dark:text-amber-300/80"
            }
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
          />
        ))}

        {chart.mapped.map((point) => {
          const isSelected = selectedId === point.id;
          return (
            <g key={`${point.sampledAt}-${point.id}`}>
              {isSelected && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={5}
                  className={
                    point.inRange
                      ? "stroke-current text-emerald-700/40 dark:text-emerald-300/40"
                      : "stroke-current text-amber-800/40 dark:text-amber-300/40"
                  }
                  strokeWidth={2}
                  fill="none"
                />
              )}
              <circle
                cx={point.x}
                cy={point.y}
                r={isSelected ? 3.5 : 2.5}
                className={
                  point.inRange
                    ? "fill-current text-emerald-700/80 dark:text-emerald-300/80"
                    : "fill-current text-amber-800/80 dark:text-amber-300/80"
                }
              />
            </g>
          );
        })}
      </svg>

      <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
        <span>{formatDate(chart.first.sampledAt)}</span>
        {chart.middle?.sampledAt !== chart.first.sampledAt &&
          chart.middle?.sampledAt !== chart.last.sampledAt && (
            <span>{formatDate(chart.middle.sampledAt)}</span>
          )}
        <span>{formatDate(chart.last.sampledAt)}</span>
      </div>
    </div>
  );
}
