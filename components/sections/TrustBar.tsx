"use client";

import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import { clientLogos } from "@/lib/content";

export default function TrustBar() {
  return (
    <section className="relative border-y border-line py-10">
      <div className="gutter mb-8 flex items-center justify-center">
        <span className="label text-center">Dôverujú mi firmy, ktorým na detaile záleží</span>
      </div>
      <Marquee duration={34} gap="4.5rem">
        {clientLogos.concat(clientLogos).map((logo, i) => (
          <div key={`${logo.alt}-${i}`} className="flex h-10 items-center opacity-45 transition-opacity duration-300 hover:opacity-100">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={40}
              className="h-8 w-auto object-contain"
              style={{ filter: "grayscale(100%) brightness(0) invert(1)" }}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
