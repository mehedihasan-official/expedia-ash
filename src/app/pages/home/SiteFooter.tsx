import { footerColumns, footerCopyright } from "@/lib/homeContent";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-0 rounded-t-3xl bg-xp-gray md:rounded-none">
      <div className="mx-auto max-w-[1248px] px-6 pb-[49px] pt-[30px] md:pt-[30px] md:px-6">
        <p className="text-[23px] font-medium leading-8 tracking-[-0.03em] text-[#262b64]" aria-label="Expedia Group">
          expedia group<sup className="text-[8px] align-super">™</sup>
        </p>

        <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-4 md:gap-x-0 xl:w-[calc(100%+40px)]">
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-sm font-semibold leading-5">{col.heading}</h2>
              <ul className="mt-3 flex flex-col gap-3 md:gap-[11px]">
                {col.links.map((l) => (
                  <li key={l} className="leading-[19px]">
                    <Link href="#" className="text-xs leading-[19px] text-xp-blue hover:underline">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="mt-8 border-xp-line xl:w-[calc(100%+40px)]" />
        <p className="mt-6 text-center text-xs leading-4">{footerCopyright}</p>
      </div>
    </footer>
  );
}
