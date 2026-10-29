import { lastMinuteDeals } from "@/lib/homeContent";
import Link from "next/link";
import HotelCard from "./HotelCard";

const seeAll =
  "h-9 items-center items-center rounded-full border border-xp-outline px-4 text-sm font-semibold text-xp-blue transition hover:bg-xp-blue/5";

export default function LastMinuteDeals() {
  return (
    <section className="mx-auto mt-12 max-w-[1248px] md:mt-[46px] px-6 md:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold leading-7 md:text-[28px] md:leading-9">
            Last-minute weekend deals
          </h2>
          <p className="mt-0.5 text-sm leading-5">
            Minimum 20% off deals for your next weekend getaway!
          </p>
        </div>
        <Link href="#" className={`${seeAll} hidden md:inline-flex`}>
          See all deals
        </Link>
      </div>

      {/* Mobile: swipeable row. Tablet/desktop: 3-of-4 column grid look. */}
      <div className="no-scrollbar -mx-6 mt-4 flex gap-4 overflow-x-auto px-6 md:mx-0 md:mt-[22px] md:overflow-visible md:px-0">
        {lastMinuteDeals.map((deal) => (
          <HotelCard key={deal.id} deal={deal} />
        ))}
      </div>

      <Link href="#" className={`${seeAll} mt-5 inline-flex md:hidden`}>
        See all deals
      </Link>
    </section>
  );
}
