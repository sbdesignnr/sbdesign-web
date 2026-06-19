import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="SB Design — domov"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/SB-Design-Logo-1-5.png"
        alt="SB Design"
        width={549}
        height={106}
        priority
        className="h-[26px] w-auto sm:h-[28px]"
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}
