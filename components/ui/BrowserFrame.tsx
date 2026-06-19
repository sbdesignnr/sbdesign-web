import Image from "next/image";

export default function BrowserFrame({
  src,
  alt,
  url,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line-strong bg-ink-800 ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-ink-900/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        {url && (
          <span className="ml-3 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-marble-muted">
            {url}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}
