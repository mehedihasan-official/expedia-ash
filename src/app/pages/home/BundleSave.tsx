import { bundleItems } from "@/lib/homeContent";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BundleSave() {
  return (
    <section className="mx-auto mt-12 max-w-[1248px] px-6 md:mt-12 md:px-6">
      <div className="rounded-2xl bg-xp-gray px-4 py-8 md:px-10 md:py-[46px]">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-8 md:text-center">
          {bundleItems.map((item) => (
            <div key={item.id} className="relative">
              {/* phones: whole row is one link with a chevron */}
              <Link href="#" aria-label={item.title} className="absolute inset-0 md:hidden" />
              <div className="flex items-center gap-3 md:flex-col md:gap-0">
                <Image
                  src={item.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-11 w-11 shrink-0 object-contain md:h-12 md:w-12"
                />
                <div className="min-w-0 flex-1 md:mt-3">
                  <h3 className="font-display text-2xl leading-8 md:text-[27px] md:leading-9">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-[18px] md:mx-auto md:max-w-[215px] desk:max-w-[295px]">
                    {item.body}
                  </p>
                  <Link
                    href="#"
                    className="mt-4 hidden h-8 items-center rounded-full border border-xp-outline bg-transparent px-4 text-xs font-semibold text-xp-blue transition hover:bg-white md:inline-flex"
                  >
                    {item.cta}
                  </Link>
                </div>
                <ChevronRight size={20} strokeWidth={2.2} className="shrink-0 md:hidden" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
