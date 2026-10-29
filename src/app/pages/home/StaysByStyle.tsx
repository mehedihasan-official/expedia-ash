"use client";

import { stayTabs, staysByStyle, type StayCard } from "@/lib/homeContent";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const visibility: Record<StayCard["show"], string> = {
  all: "",
  desktop: "hidden desk:block",
  mobile: "desk:hidden",
};

export default function StaysByStyle() {
  const [tab, setTab] = useState(stayTabs[0]);
  const cards = staysByStyle[tab] ?? [];

  return (
    <section className="mx-auto mt-12 max-w-[1248px] px-6 md:mt-12 md:px-6">
      <h2 className="text-xl font-semibold leading-7 md:text-[28px] md:leading-9">
        Stays for every travel style
      </h2>
      <p className="mt-0.5 text-sm leading-5">Average prices based on current calendar month</p>

      <div
        role="tablist"
        aria-label="Travel style"
        className="no-scrollbar -mx-6 mt-3 flex overflow-x-auto border-b border-xp-line px-6 md:mx-0 md:px-0"
      >
        {stayTabs.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t)}
              className={`-mb-px shrink-0 whitespace-nowrap border-b-[3px] px-4 py-3 text-sm font-semibold transition first:pl-4 ${
                active ? "border-xp-blue text-xp-blue" : "border-transparent text-xp-navy hover:border-xp-line"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {cards.length > 0 ? (
        <div className="no-scrollbar -mx-6 mt-4 flex gap-4 overflow-x-auto px-6 md:mx-0 md:mt-[15px] md:overflow-visible md:px-0">
          {cards.map((c) => (
            <Link
              key={c.id}
              href="#"
              className={`group w-[min(320px,80vw)] shrink-0 md:w-[calc((100%-32px)/3)] desk:w-[calc((100%-48px)/4)] ${visibility[c.show]}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-xp-gray">
                <Image
                  src={c.image}
                  alt={`${c.city}, ${c.region}`}
                  fill
                  sizes="(min-width: 1200px) 288px, (min-width: 768px) 33vw, 260px"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                {c.badge && (
                  <span className="absolute left-4 top-4 rounded bg-xp-navy px-2 py-1 text-xs font-bold leading-4 text-white">
                    {c.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-base font-semibold leading-5">{c.city}</h3>
              <p className="mt-1 text-sm leading-5 text-xp-muted">{c.region}</p>
              <p className="mt-3 text-xl font-semibold leading-6">{c.price}</p>
              <p className="text-xs leading-4">avg per night</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-xp-muted">
          {tab} destinations are coming in a later step.
        </p>
      )}
    </section>
  );
}
