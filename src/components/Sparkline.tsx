export function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${32 - (value / max) * 26}`).join(' ');
  return <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="sparkline"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg>;
}
