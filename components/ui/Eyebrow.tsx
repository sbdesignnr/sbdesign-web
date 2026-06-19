export default function Eyebrow({
  children,
  className = "",
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={`label inline-flex items-center gap-2.5 ${className}`}>
      {dot && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-azure shadow-[0_0_10px_2px_rgba(47,107,255,0.7)]" />
      )}
      {children}
    </span>
  );
}
