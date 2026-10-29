"use client";

import { useAuth } from "@/components/AuthProvider";
import UsFlag from "@/components/UsFlag";
import { CircleHelp, Search } from "lucide-react";
import Link from "next/link";

/**
 * The account dropdown. Same content on every screen size:
 *  - mobile (variant="mobile"): full menu from the user icon — account block,
 *    Shop travel / Support / language row, then List your property / Trips / Feedback
 *  - desktop (variant="desktop"): just the account block (the other items already
 *    live in the header bar)
 */
export default function AccountPanel({
  variant,
  onNavigate,
  onOpenPrefs,
}: {
  variant: "mobile" | "desktop";
  onNavigate: () => void;
  onOpenPrefs: () => void;
}) {
  const { user, signOut } = useAuth();
  const firstName =
    user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "traveler";

  const rowCls =
    "flex w-full items-center gap-4 px-6 py-[14px] text-left text-[15px] text-xp-navy transition hover:bg-xp-gray";

  return (
    <div className="py-5" role="menu">
      {/* ---- account block ---- */}
      <div className="px-6">
        {user ? (
          <>
            <p className="text-center text-[18px] font-medium leading-6">Hi, {firstName}</p>
            <Link
              href="/pages/dashboard"
              onClick={onNavigate}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-xp-blue text-base font-semibold text-white transition hover:bg-xp-blue-dark"
            >
              Go to dashboard
            </Link>
            <button
              onClick={async () => {
                await signOut();
                onNavigate();
              }}
              className="mt-4 block w-full text-center text-[15px] font-semibold text-xp-blue hover:underline"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <p className="mx-auto max-w-[260px] text-center text-[18px] font-medium leading-6">
              Unlock instant savings with Member Prices
            </p>
            <Link
              href="/pages/login"
              onClick={onNavigate}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-xp-blue text-base font-semibold text-white transition hover:bg-xp-blue-dark"
            >
              Sign in
            </Link>
            <Link
              href="#"
              onClick={onNavigate}
              className="mt-5 block text-center text-[15px] font-semibold text-xp-blue hover:underline"
            >
              Learn more about One Key
            </Link>
          </>
        )}
      </div>

      <Link href="#" onClick={onNavigate} className={`${rowCls} mt-3`}>
        Inbox
      </Link>

      {variant === "mobile" && (
        <>
          <div className="my-2 border-t border-xp-line" />
          <Link href="/" onClick={onNavigate} className={rowCls}>
            <Search size={20} strokeWidth={2.2} /> Shop travel
          </Link>
          <Link href="#" onClick={onNavigate} className={rowCls}>
            <CircleHelp size={20} strokeWidth={2.2} className="fill-xp-navy text-white" /> Support
          </Link>
          <button onClick={onOpenPrefs} className={`${rowCls} gap-2`}>
            English · USD · US <UsFlag />
          </button>

          <div className="my-2 border-t border-xp-line" />
          <Link href="#" onClick={onNavigate} className={rowCls}>List your property</Link>
          <Link href="#" onClick={onNavigate} className={rowCls}>Trips</Link>
          <Link href="#" onClick={onNavigate} className={rowCls}>Feedback</Link>
        </>
      )}
    </div>
  );
}
