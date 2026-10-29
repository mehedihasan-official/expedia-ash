import { seattleAd } from "@/lib/homeContent";
import Image from "next/image";
import Link from "next/link";

/** Sponsored placement — shown on phones only (per the mobile screenshot). */
export default function SeattleAd() {
  return (
    <section className="mx-auto mt-12 max-w-[1248px] px-6 md:hidden">
      <div className="flex items-start justify-between">
        <div className="leading-none text-[#3d7a2e]">
          <span className="block text-[9px] font-medium uppercase tracking-[0.3em]">Visit</span>
          <span className="block text-[34px] font-bold tracking-[-0.04em]">seattle</span>
        </div>
        <span className="rounded bg-xp-gray px-1.5 py-0.5 text-[11px] font-medium text-xp-muted">Ad</span>
      </div>

      <h2 className="mt-4 text-xl font-semibold leading-7">{seattleAd.heading}</h2>
      <p className="mt-1 text-sm leading-5">{seattleAd.body}</p>

      <div className="mt-4 flex flex-col gap-2">
        {seattleAd.images.map((i) => (
          <Link key={i.label} href="#" className="relative block aspect-[256/110] overflow-hidden rounded-2xl">
            <Image src={i.image} alt={i.label} fill sizes="100vw" className="object-cover" />
          </Link>
        ))}
      </div>
    </section>
  );
}
