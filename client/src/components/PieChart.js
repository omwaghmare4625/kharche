"use client";

export default function PieChart({ data, colors }) {
  const entries = Object.entries(data);
  const total = entries.reduce((sum, [, val]) => sum + val, 0);

  if (total === 0 || entries.length === 0) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#EDEDE5" />
        <text
          x="50"
          y="53"
          textAnchor="middle"
          fontSize="8"
          fill="#555555"
        >
          No data
        </text>
      </svg>
    );
  }

  let cumulativeAngle = 0;
  const slices = entries.map(([category, value]) => {
    const percentage = value / total;
    const startAngle = cumulativeAngle;
    const angle = percentage * 360;
    cumulativeAngle += angle;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((startAngle + angle - 90) * Math.PI) / 180;

    const x1 = 50 + 45 * Math.cos(startRad);
    const y1 = 50 + 45 * Math.sin(startRad);
    const x2 = 50 + 45 * Math.cos(endRad);
    const y2 = 50 + 45 * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const path =
      entries.length === 1
        ? null
        : `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return {
      category,
      value,
      percentage,
      path,
      color: colors[category] || "#9CAF88",
      isFull: entries.length === 1,
    };
  });

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {slices.map((slice) =>
        slice.isFull ? (
          <circle
            key={slice.category}
            cx="50"
            cy="50"
            r="45"
            fill={slice.color}
          />
        ) : (
          <path key={slice.category} d={slice.path} fill={slice.color} />
        )
      )}
      {/* Center hole for donut effect */}
      <circle cx="50" cy="50" r="25" fill="#FAFAF7" />
    </svg>
  );
}
