"use client";

import AccountPanel from "@/components/AccountPanel";
import { useAuth } from "@/components/AuthProvider";
import Logo from "@/components/Logo";
import PreferencesDialog from "@/components/PreferencesDialog";
import UsFlag from "@/components/UsFlag";
import { useClickOutside } from "@/lib/useClickOutside";
import {
  Bed,
  CarFront,
  ChevronDown,
  CircleUser,
  MessageSquareText,
  Package,
  Plane,
  Ship,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

type MenuId = "shop" | "account" | "mobile" | null;

const shopItems = [
  { label: "Stays", icon: Bed, href: "/" },
  { label: "Flights", icon: Plane, href: "#" },
  { label: "Cars", icon: CarFront, href: "#" },
  { label: "Packages", icon: Package, href: "#" },
  { label: "Things to do", icon: Ticket, href: "#" },
  { label: "Cruises", icon: Ship, href: "#" },
];

const navLink =
  "text-sm font-medium tracking-[0.015em] text-xp-navy transition hover:text-xp-blue";

export default function SiteHeader() {
  const [open, setOpen] = useState<MenuId>(null);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const { user } = useAuth();
  const headerRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpen(null), []);
  useClickOutside(headerRef, close, open !== null);

  const toggle = (id: Exclude<MenuId, null>) =>
    setOpen((cur) => (cur === id ? null : id));

  const accountLabel = user
    ? user.displayName?.split(" ")[0] || user.email?.split("@")[0] || "Account"
    : "Sign in";

  return (
    <>
      <header
        ref={headerRef}
        className="relative z-40 border-b border-transparent bg-white md:border-b-0"
      >
        <div className="mx-auto flex h-14 max-w-[1248px] items-center justify-between px-6 md:h-[72px] md:px-6">
          {/* ---------- left: logo + Shop travel ---------- */}
          <div className="flex items-center">
            <Logo />

            <div className="relative ml-[21px] hidden md:block">
              <button
                onClick={() => toggle("shop")}
                aria-haspopup="menu"
                aria-expanded={open === "shop"}
                className={`${navLink} flex h-10 items-center gap-1 rounded-full px-2`}
              >
                Shop travel
                <ChevronDown
                  size={16}
                  strokeWidth={2.4}
                  className={`transition-transform ${open === "shop" ? "rotate-180" : ""}`}
                />
              </button>

              {open === "shop" && (
                <div
                  role="menu"
                  className="xp-pop absolute left-0 top-[46px] z-50 w-[260px] rounded-xl border border-xp-line bg-white py-2 shadow-[0_4px_16px_rgba(25,30,59,0.18)]"
                >
                  {shopItems.map(({ label, icon: Icon, href }) => (
                    <Link
                      key={label}
                      href={href}
                      role="menuitem"
                      onClick={close}
                      className="flex items-center gap-3 px-5 py-3 text-[15px] text-xp-navy transition hover:bg-xp-gray"
                    >
                      <Icon size={20} strokeWidth={2} />
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---------- right: desktop / tablet nav ---------- */}
          <nav className="hidden items-center gap-6 md:flex md:gap-5 lg:gap-[32px]" aria-label="Account and support">
            <button
              onClick={() => setPrefsOpen(true)}
              className={`${navLink} flex items-center gap-1.5`}
              aria-label="Change language and currency"
            >
              USD <span aria-hidden="true" className="text-[10px] leading-none">•</span> <UsFlag />
            </button>
            <Link href="#" className={navLink}>List your property</Link>
            <Link href="#" className={navLink}>Support</Link>
            <Link href="#" className={navLink}>Trips</Link>
            <button aria-label="Messages" className="text-xp-navy transition hover:text-xp-blue">
              <MessageSquareText size={21} strokeWidth={2} />
            </button>

            <div className="relative">
              <button
                onClick={() => toggle("account")}
                aria-haspopup="menu"
                aria-expanded={open === "account"}
                className={navLink}
              >
                {accountLabel}
              </button>
              {open === "account" && (
                <div className="xp-pop absolute right-[-12px] top-[40px] z-50 w-[340px] rounded-xl border border-xp-line bg-white shadow-[0_4px_16px_rgba(25,30,59,0.18)]">
                  <AccountPanel
                    variant="desktop"
                    onNavigate={close}
                    onOpenPrefs={() => {
                      close();
                      setPrefsOpen(true);
                    }}
                  />
                </div>
              )}
            </div>
          </nav>

          {/* ---------- right: mobile user icon ---------- */}
          <button
            onClick={() => toggle("mobile")}
            aria-label="Account menu"
            aria-haspopup="menu"
            aria-expanded={open === "mobile"}
            className={`grid h-10 w-10 place-items-center rounded-full transition md:hidden ${
              open === "mobile" ? "text-xp-blue" : "text-xp-navy"
            }`}
          >
            <CircleUser size={20} strokeWidth={1.9} />
          </button>
        </div>

        {/* ---------- mobile account menu (opens from the user icon) ---------- */}
        {open === "mobile" && (
          <div className="xp-pop absolute right-3 top-[52px] z-50 w-[min(358px,calc(100vw-24px))] rounded-lg border border-xp-line bg-white shadow-[0_6px_20px_rgba(25,30,59,0.2)] md:hidden">
            <AccountPanel
              variant="mobile"
              onNavigate={close}
              onOpenPrefs={() => {
                close();
                setPrefsOpen(true);
              }}
            />
          </div>
        )}
      </header>

      {prefsOpen && <PreferencesDialog onClose={() => setPrefsOpen(false)} />}
    </>
  );
}
