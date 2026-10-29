"use client";

import { exploreTabs, savingsDisclaimer } from "@/lib/homeContent";
import Link from "next/link";
import { useState } from "react";

export default function ExploreWorld() {
  const [tab, setTab] = useState(exploreTabs[0].id);
  const active = exploreTabs.find((t) => t.id === tab) ?? exploreTabs[0];

  return (
    <section className="mx-auto mt-12 max-w-[1248px] px-6 pb-[72px] md:mt-[96px] md:px-6">
      <p className="text-sm leading-5">{savingsDisclaimer}</p>

      <h2 className="mt-12 text-[26px] font-semibold leading-8 md:mt-[46px] md:text-[28px] md:leading-9">
        Explore a world of travel with Expedia
      </h2>

      <div
        role="tablist"
        aria-label="Explore"
        className="no-scrollbar -mx-6 mt-[14px] flex overflow-x-auto px-6 md:mx-0 md:px-0"
      >
        {exploreTabs.map((t) => {
          const isActive = t.id === tab;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setTab(t.id)}
              className={`-mb-px shrink-0 whitespace-nowrap border-b-[3px] px-4 py-3 text-sm font-semibold transition ${
                isActive ? "border-xp-blue text-xp-blue" : "border-transparent text-xp-navy hover:border-xp-line"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-[25px] grid px-6 text-sm leading-[18px] tracking-[0.01em] md:grid-cols-4">
        {active.links.map((l) => (
          <li key={l}>
            <Link href="#" className="text-xp-blue hover:underline">
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
