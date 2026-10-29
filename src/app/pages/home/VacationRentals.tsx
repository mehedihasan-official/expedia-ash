import { vacationRentals } from "@/lib/homeContent";
import Image from "next/image";
import Link from "next/link";

export default function VacationRentals() {
  return (
    <section className="mx-auto mt-12 max-w-[1248px] px-6 md:mt-12 md:px-6">
      <h2 className="text-xl font-semibold leading-7 md:text-[28px] md:leading-9">
        Vacation rentals for your kind of stay
      </h2>

      <ul className="no-scrollbar -mx-6 mt-4 flex gap-3 overflow-x-auto px-6 md:mx-0 md:mt-[14px] md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0">
        {vacationRentals.map((r) => (
          <li key={r.id} className="w-[152px] shrink-0 md:w-auto">
            <Link
              href="#"
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-xp-gray md:aspect-[227/303]"
            >
              <Image
                src={r.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 227px, (min-width: 768px) 20vw, 108px"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-2 right-2 text-sm font-bold leading-[18px] text-white md:text-[15px]">
                {r.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
