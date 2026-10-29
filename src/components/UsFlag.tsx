/** Tiny inline US flag used next to the currency / language selector. */
export default function UsFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      role="img"
      aria-label="United States"
      className={`inline-block shrink-0 rounded-[1.5px] ${className}`}
    >
      <rect width="18" height="12" fill="#fff" />
      {[0, 2, 4, 6, 8, 10].map((y) => (
        <rect key={y} y={y} width="18" height="1.0" fill="#c8323c" />
      ))}
      <rect width="8" height="6.4" fill="#2a3b7e" />
    </svg>
  );
}
