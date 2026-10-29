import Image from "next/image";
import Link from "next/link";

export default function PackagesBanner() {
  return (
    <section className="mx-auto max-w-[1248px] px-6 md:px-6">
      <div className="flex items-center gap-4 rounded-2xl bg-xp-navy px-5 py-4 text-white md:gap-5 md:px-6 md:py-[22px] md:h-[112px] md:py-0">
        <Image
          src="/images/icon-tag.png"
          alt=""
          width={56}
          height={56}
          className="h-10 w-10 shrink-0 self-start object-contain md:h-12 md:w-12 md:self-center"
        />

        <div className="min-w-0 flex-1">
          <h2 className="font-display text-[27px] leading-8 md:text-[34px] md:leading-10">
            Packages under $699
          </h2>
          <p className="mt-1 text-sm leading-5">
            Get more trip for less when you bundle flight and hotel together{" "}
            <Link href="#" className="underline underline-offset-2 md:hidden">
              Book now
            </Link>
          </p>
        </div>

        <Link
          href="#"
          className="hidden h-12 shrink-0 items-center rounded-full bg-white px-[14px] text-[15px] font-semibold text-xp-blue transition hover:bg-xp-gray md:flex md:px-5 md:min-w-[106px] md:justify-center"
        >
          Book now
        </Link>
      </div>
    </section>
  );
}
