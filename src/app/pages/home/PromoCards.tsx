import { promoCards } from "@/lib/homeContent";
import Link from "next/link";

export default function PromoCards() {
  return (
    <section className="mx-auto mt-12 max-w-[1248px] px-6 md:mt-[106px] md:px-6">
      <div className="grid gap-6 md:grid-cols-2">
        {promoCards.map((c) => (
          <article
            key={c.id}
            className="rounded-2xl border border-xp-line bg-white px-6 py-6 md:px-12 md:pb-10 md:pt-[54px]"
          >
            <span className="block w-fit rounded bg-xp-yellow px-2 py-px text-xs font-medium leading-4">
              {c.tag}
            </span>
            <h3 className="mt-[5px] font-display text-[26px] leading-8 md:leading-[38px]">
              {c.title}
            </h3>
            <p className="mt-2 text-sm leading-5">{c.body}</p>
            <Link
              href="#"
              className="mt-4 inline-flex h-8 items-center rounded-full border border-xp-outline px-4 text-xs font-semibold text-xp-blue transition hover:bg-xp-blue/5"
            >
              {c.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
