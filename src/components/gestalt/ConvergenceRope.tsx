/**
 * ConvergenceRope — Static SVG of four colored threads converging into a braided rope.
 * Left 50%: Four wavy threads spread apart, converging toward center knot.
 * Right 50%: Four threads braided tightly together as a multicolored rope.
 */

interface ConvergenceRopeProps {
  className?: string;
  labels?: [string, string, string, string];
}

const COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b"];
const DEFAULT_LABELS: [string, string, string, string] = [
  "Designing Innovation",
  "Hybrid Intelligence",
  "Innovation Ecosystems",
  "Perceptiosphere",
];

export function ConvergenceRope({ className, labels = DEFAULT_LABELS }: ConvergenceRopeProps) {
  const w = 800;
  const h = 200;
  const centerX = 400; // knot point (50/50 split)
  const centerY = h / 2;
  const leftStart = 200; // push right to give label room
  const rightEnd = 700;
  const strokeWidth = 2.9;
  const knotStrokeWidth = 1.4;
  const labelFontSize = 15;
  const endLabelFontSize = 15;
  const endSubFontSize = 13;

  // Left side: spread positions
  const spread = 52;
  const startYs = [
    centerY - spread * 1.5,
    centerY - spread * 0.5,
    centerY + spread * 0.5,
    centerY + spread * 1.5,
  ];

  // Left side: wavy convergence paths (spread → knot)
  // Each thread has a gentle wave as it converges
  const numLeftPoints = 40;
  const leftWaveAmplitude = 5;
  const leftWaveFrequency = 3; // oscillations over the convergence length

  const convergePaths = startYs.map((sy, i) => {
    const phase = (i * Math.PI) / 2;
    const points: string[] = [];

    for (let p = 0; p <= numLeftPoints; p++) {
      const t = p / numLeftPoints;
      const x = leftStart + t * (centerX - leftStart);
      // Interpolate Y from spread to center, with wave overlay that fades as it converges
      const baseY = sy + t * (centerY - sy);
      const waveDecay = 1 - t * t; // wave fades as threads converge (quadratic decay)
      const wave = Math.sin(t * leftWaveFrequency * Math.PI * 2 + phase) * leftWaveAmplitude * waveDecay;
      const y = baseY + wave;

      if (p === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    return points.join(" ");
  });

  // Right side: braided rope paths (knot → end)
  const braidAmplitude = 6;
  const braidWavelength = 26;
  const braidLength = rightEnd - centerX;
  const numRightPoints = 60;

  const braidPaths = COLORS.map((_, i) => {
    const phase = (i * Math.PI) / 2;
    const points: string[] = [];

    for (let p = 0; p <= numRightPoints; p++) {
      const t = p / numRightPoints;
      const x = centerX + t * braidLength;
      const y = centerY + Math.sin((t * braidLength / braidWavelength) * Math.PI * 2 + phase) * braidAmplitude;

      if (p === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    return points.join(" ");
  });

  // Knot decoration
  const knotRx = 7;
  const knotRy = 12;

  return (
    <div className={`gestalt-convergence-rope ${className || ""}`}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left side: wavy converging threads */}
        {convergePaths.map((d, i) => (
          <path
            key={`converge-${i}`}
            d={d}
            fill="none"
            stroke={COLORS[i]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.85}
          />
        ))}

        {/* Knot at center */}
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={knotRx}
          ry={knotRy}
          fill="rgba(30, 30, 50, 0.8)"
          stroke="#e8e8ea"
          strokeWidth={knotStrokeWidth}
          opacity={0.6}
        />

        {/* Right side: braided rope (4 sinusoidal paths) */}
        {braidPaths.map((d, i) => (
          <path
            key={`braid-${i}`}
            d={d}
            fill="none"
            stroke={COLORS[i]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.85}
          />
        ))}

        {/* Start dots */}
        {startYs.map((sy, i) => (
          <circle
            key={`dot-${i}`}
            cx={leftStart}
            cy={sy}
            r={5}
            fill={COLORS[i]}
          />
        ))}

        {/* Thread labels (left side — plenty of room now) */}
        {labels.map((label, i) => (
          <text
            key={`label-${i}`}
            x={leftStart - 14}
            y={startYs[i] + 1}
            textAnchor="end"
            dominantBaseline="middle"
            fill={COLORS[i]}
            fontSize={labelFontSize}
            fontWeight={600}
            fontFamily="'Geist', sans-serif"
          >
            {label}
          </text>
        ))}

        {/* End label (after braid) */}
        <text
          x={rightEnd + 14}
          y={centerY - 6}
          textAnchor="start"
          dominantBaseline="middle"
          fill="#e8e8ea"
          fontSize={endLabelFontSize}
          fontWeight={700}
          fontFamily="'Geist', sans-serif"
        >
          Unified
        </text>
        <text
          x={rightEnd + 14}
          y={centerY + 11}
          textAnchor="start"
          dominantBaseline="middle"
          fill="#9ca3af"
          fontSize={endSubFontSize}
          fontWeight={500}
          fontFamily="'Geist', sans-serif"
        >
          Framework
        </text>
      </svg>
    </div>
  );
}

export default ConvergenceRope;
