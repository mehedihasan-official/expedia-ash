"use client";

import type { HotelDeal, Resp } from "@/lib/homeContent";
import { Check, ChevronLeft, ChevronRight, Heart, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/** Renders the desktop value on lg+, the tablet/mobile value below lg. */
function R({ v }: { v: Resp }) {
  return (
    <>
      <span className="desk:hidden">{v.m}</span>
      <span className="hidden desk:inline">{v.d}</span>
    </>
  );
}

export default function HotelCard({ deal }: { deal: HotelDeal }) {
  const [saved, setSaved] = useState(false);
  // Photo carousel (arrows). Only one photo per hotel for now — drop more
  // paths into `images` and the arrows will page through them.
  const images = [deal.image];
  const [idx, setIdx] = useState(0);
  const step = (n: number) => setIdx((i) => (i + n + images.length) % images.length);

  const arrow =
    "absolute top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-[#191e3b]/70 text-white backdrop-blur-[2px] transition hover:bg-[#191e3b]/90";

  return (
    <article className="w-[min(320px,80vw)] shrink-0 md:w-[calc((100%-32px)/3)] desk:w-[calc((100%-48px)/4)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-xp-gray">
        <Image
          src={images[idx]}
          alt={deal.name}
          fill
          sizes="(min-width: 1200px) 288px, (min-width: 768px) 33vw, 260px"
          className="object-cover"
        />
        <button
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${deal.name} from saved` : `Save ${deal.name}`}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm transition hover:scale-105"
        >
          <Heart size={20} strokeWidth={2.2} className={`text-xp-heart ${saved ? "fill-xp-heart" : ""}`} />
        </button>
        <button onClick={() => step(-1)} aria-label="Previous photo" className={`${arrow} left-2`}>
          <ChevronLeft size={18} strokeWidth={2.4} />
        </button>
        <button onClick={() => step(1)} aria-label="Next photo" className={`${arrow} right-2`}>
          <ChevronRight size={18} strokeWidth={2.4} />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-base font-medium leading-5">{deal.name}</h3>
        <p className="mt-[6px] text-xs leading-4 text-xp-muted">{deal.location}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="grid h-6 min-w-7 place-items-center rounded bg-xp-green px-1.5 text-sm font-bold leading-none text-white">
            {deal.score}
          </span>
          <span className="text-sm font-semibold">{deal.ratingLabel}</span>
          <span className="text-xs text-xp-muted">({deal.reviews} reviews)</span>
        </div>

        <div className="mt-[14px]">
          {deal.memberPrice ? (
            <span className="inline-flex h-6 items-center gap-1.5 rounded bg-xp-member px-2 text-xs font-bold text-white">
              <Tag size={14} strokeWidth={2.2} /> Member Price available
            </span>
          ) : (
            deal.off && (
              <span className="inline-flex h-6 items-center rounded bg-xp-green px-2 text-xs font-bold text-white">
                <R v={deal.off} />
              </span>
            )
          )}
          <p className="text-sm leading-4">
            <R v={deal.nightly} /> nightly
          </p>
          <p className="text-base leading-[18px]">
            <span className="font-bold"><R v={deal.total} /> total</span>{" "}
            <span className="text-xs text-xp-muted line-through"><R v={deal.strike} /></span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs leading-4 text-xp-green">
            <Check size={14} strokeWidth={2.4} /> Total with taxes and fees
          </p>
        </div>
      </div>
    </article>
  );
}
