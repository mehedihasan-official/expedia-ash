"use client";

import { serviceTabs } from "@/lib/homeContent";
import { useClickOutside } from "@/lib/useClickOutside";
import { CalendarDays, MapPin, Minus, Plus, User } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_IN = "2026-11-11"; // matches the reference screenshot (Wed, Nov 11)
const DEFAULT_OUT = "2026-11-12";

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);
const fmt = (s: string) =>
  new Date(`${s}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

function Counter({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const btn =
    "grid h-8 w-8 place-items-center rounded-full border border-xp-blue text-xp-blue transition enabled:hover:bg-xp-blue/10 disabled:cursor-not-allowed disabled:border-xp-line disabled:text-xp-line";
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <p className="text-[15px] font-medium leading-5">{label}</p>
        {hint && <p className="text-xs text-xp-muted">{hint}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} className={btn} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Minus size={16} />
        </button>
        <span className="w-4 text-center text-[15px] font-medium tabular-nums">{value}</span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} className={btn} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export default function SearchCard() {
  const [activeTab, setActiveTab] = useState("stays");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(DEFAULT_IN);
  const [checkOut, setCheckOut] = useState(DEFAULT_OUT);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [bundle, setBundle] = useState(false);
  const [open, setOpen] = useState<"dates" | "travelers" | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const close = useCallback(() => setOpen(null), []);
  useClickOutside(formRef, close, open !== null);

  // The screenshot shows "Wed, Nov 11 - Thu, Nov 12" (today + 14 days). Once
  // mounted, roll the defaults forward if that date is already in the past.
  useEffect(() => {
    const today = iso(new Date());
    if (DEFAULT_IN < today) {
      setCheckIn(iso(addDays(new Date(), 14)));
      setCheckOut(iso(addDays(new Date(), 15)));
    }
  }, []);

  // The dashboard's "browse" shortcuts link here as /?q=Hawaii — prefill the
  // destination box with it.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setDestination(q.slice(0, 80));
  }, []);

  const travelers = adults + children;
  const travelersLabel = `${travelers} traveler${travelers === 1 ? "" : "s"}, ${rooms} room${rooms === 1 ? "" : "s"}`;

  // Shared look for the three fields. Below lg they are separate bordered boxes
  // (mobile: stacked, tablet: one row). At lg+ they become segments of one pill.
  const field =
    "relative flex h-12 min-w-0 items-center gap-3 rounded-lg border border-[#8d8f9d] bg-white px-3 text-left transition hover:border-xp-navy desk:h-full desk:rounded-none desk:border-0 desk:px-4";
  const divider = "desk:before:absolute desk:before:left-0 desk:before:top-1/2 desk:before:h-[34px] desk:before:w-px desk:before:-translate-y-1/2 desk:before:bg-[#b3b5c0]";
  const labelCls = "block text-[11px] leading-[13px] text-xp-muted desk:hidden";
  const valueCls = "block truncate text-[15px] leading-5 text-xp-navy desk:text-base";

  return (
    <div className="rounded-2xl border border-xp-line bg-white max-md:rounded-none max-md:border-0">
      {/* ---------- service tabs ---------- */}
      <div role="tablist" aria-label="What are you looking for?" className="no-scrollbar flex justify-center overflow-x-auto border-b border-xp-line">
        {serviceTabs.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setActiveTab(t.id)}
              className={`group flex flex-1 flex-col items-center border-b-[3px] px-2 pb-[10px] pt-4 text-sm font-medium transition md:min-w-[96px] md:flex-none md:px-6 md:pt-[23px] ${
                t.desktopOnly ? "hidden md:flex" : "flex"
              } ${active ? "border-xp-blue text-xp-blue" : "border-transparent text-xp-navy hover:border-xp-line"}`}
            >
              <Image src={t.icon} alt="" width={44} height={44} className="h-11 w-11 object-contain md:h-[52px] md:w-[52px]" />
              <span className="mt-1.5 whitespace-nowrap md:mt-[5px]">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- stays search ---------- */}
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault() /* results page comes in a later step */}
        className="px-6 pb-9 pt-8 max-md:px-0 max-md:pb-0 max-md:pt-6"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-3 desk:h-[62px] desk:gap-0 desk:rounded-full desk:border desk:border-xp-line desk:bg-white desk:pr-[6px] desk:shadow-[0_2px_10px_rgba(25,30,59,0.14)]">
          {/* Where to? */}
          <label className={`${field} md:flex-1 desk:flex-none desk:basis-[46.4%]`}>
            <MapPin size={23} strokeWidth={2} className="shrink-0" aria-hidden="true" />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where to?"
              aria-label="Where to?"
              autoComplete="off"
              className="w-full min-w-0 bg-transparent text-[15px] text-xp-navy outline-none placeholder:text-[#5e6073] desk:text-base"
            />
          </label>

          {/* Dates */}
          <div className="relative md:flex-1 desk:flex-none desk:basis-[24.8%]">
            <button
              type="button"
              onClick={() => setOpen(open === "dates" ? null : "dates")}
              aria-expanded={open === "dates"}
              className={`${field} ${divider} w-full`}
            >
              <CalendarDays size={23} strokeWidth={2} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                <span className={labelCls}>Dates</span>
                <span className={valueCls}>{fmt(checkIn)} - {fmt(checkOut)}</span>
              </span>
            </button>
            {open === "dates" && (
              <div className="xp-pop absolute left-0 top-[calc(100%+8px)] z-30 w-[min(320px,calc(100vw-32px))] rounded-xl border border-xp-line bg-white p-4 shadow-[0_6px_20px_rgba(25,30,59,0.2)]">
                <label className="mb-1 block text-sm font-medium" htmlFor="check-in">Check-in</label>
                <input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  min={iso(new Date())}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!v) return;
                    setCheckIn(v);
                    if (checkOut <= v) setCheckOut(iso(addDays(new Date(`${v}T00:00:00Z`), 1)));
                  }}
                  className="h-11 w-full rounded-lg border border-xp-outline px-3 text-[15px]"
                />
                <label className="mb-1 mt-3 block text-sm font-medium" htmlFor="check-out">Check-out</label>
                <input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  min={iso(addDays(new Date(`${checkIn}T00:00:00Z`), 1))}
                  onChange={(e) => e.target.value && setCheckOut(e.target.value)}
                  className="h-11 w-full rounded-lg border border-xp-outline px-3 text-[15px]"
                />
                <button type="button" onClick={close} className="mt-4 h-11 w-full rounded-full bg-xp-blue text-[15px] font-semibold text-white hover:bg-xp-blue-dark">
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Travelers */}
          <div className="relative md:flex-1 desk:min-w-0 desk:flex-1">
            <button
              type="button"
              onClick={() => setOpen(open === "travelers" ? null : "travelers")}
              aria-expanded={open === "travelers"}
              className={`${field} ${divider} w-full`}
            >
              <User size={23} strokeWidth={2} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                <span className={labelCls}>Travelers</span>
                <span className={valueCls}>{travelersLabel}</span>
              </span>
            </button>
            {open === "travelers" && (
              <div className="xp-pop absolute left-0 top-[calc(100%+8px)] z-30 w-[min(320px,calc(100vw-32px))] rounded-xl border border-xp-line bg-white p-4 shadow-[0_6px_20px_rgba(25,30,59,0.2)] md:left-auto md:right-0">
                <Counter label="Rooms" value={rooms} min={1} max={8} onChange={setRooms} />
                <Counter label="Adults" value={adults} min={1} max={14} onChange={setAdults} />
                <Counter label="Children" hint="Ages 0 to 17" value={children} min={0} max={6} onChange={setChildren} />
                <button type="button" onClick={close} className="mt-3 h-11 w-full rounded-full bg-xp-blue text-[15px] font-semibold text-white hover:bg-xp-blue-dark">
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Search (tablet + desktop: inside the row) */}
          <button
            type="submit"
            className="hidden h-12 shrink-0 items-center justify-center rounded-full bg-xp-blue px-7 text-base font-semibold text-white transition hover:bg-xp-blue-dark md:flex desk:my-auto desk:h-[49px] desk:w-[81px] desk:px-0"
          >
            Search
          </button>
        </div>

        {/* Bundle checkbox */}
        <label className="mt-3 flex cursor-pointer items-center gap-3 pl-2.5 text-sm max-md:mt-4 max-md:pl-0">
          <input
            type="checkbox"
            checked={bundle}
            onChange={(e) => setBundle(e.target.checked)}
            className="h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[3px] border-2 border-[#5e6073] bg-white checked:border-xp-blue checked:bg-xp-blue checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22><path%20d=%22M3.5%208.5l3%203%206-7%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%222.2%22/></svg>')] checked:bg-center"
          />
          Add a flight to Bundle &amp; Save*
        </label>

        {/* Search (phones: full-width under the checkbox) */}
        <button
          type="submit"
          className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-xp-blue text-base font-semibold text-white transition hover:bg-xp-blue-dark md:hidden"
        >
          Search
        </button>
      </form>
    </div>
  );
}
