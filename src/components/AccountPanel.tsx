"use client";

import { useAuth } from "@/components/AuthProvider";
import UsFlag from "@/components/UsFlag";
import { CircleHelp, History, LayoutDashboard, LogOut, Mail, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * The account dropdown.
 *
 * Signed out — same content on every screen size:
 *  - mobile (variant="mobile"): full menu from the user icon — account block,
 *    Shop travel / Support / language row, then List your property / Trips / Feedback
 *  - desktop (variant="desktop"): just the account block (the other items already
 *    live in the header bar)
 *
 * Signed in: the account block becomes a greeting, and Dashboard + History
 * (plus Sign out) are added to the menu.
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
  const router = useRouter();
  const firstName =
    user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "traveler";

  const rowCls =
    "flex w-full items-center gap-4 px-6 py-[14px] text-left text-[15px] text-xp-navy transition hover:bg-xp-gray";

  async function handleSignOut() {
    onNavigate();
    try {
      await signOut();
      router.push("/");
    } catch {
      /* sign-out failed (e.g. offline) — stay where we are */
    }
  }

  return (
    <div className="py-5" role="menu">
      {/* ---- account block ---- */}
      <div className="px-6">
        {user ? (
          <div className="text-center">
            <p className="text-[18px] font-medium leading-6">Hi, {firstName}</p>
            {user.email && (
              <p className="mt-0.5 truncate text-xs leading-4 text-xp-muted" title={user.email}>
                {user.email}
              </p>
            )}
          </div>
        ) : (
          <>
            <p className="mx-auto max-w-[260px] text-center text-[18px] font-medium leading-6">
              Unlock instant savings with Member Prices
            </p>
            <Link
              href="/pages/login"
              onClick={onNavigate}
              role="menuitem"
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

      {user ? (
        <div className="mt-3">
          <Link href="/pages/dashboard" onClick={onNavigate} role="menuitem" className={rowCls}>
            <LayoutDashboard size={20} strokeWidth={2} /> Dashboard
          </Link>
          <Link href="/pages/history" onClick={onNavigate} role="menuitem" className={rowCls}>
            <History size={20} strokeWidth={2} /> History
          </Link>
          <Link href="#" onClick={onNavigate} role="menuitem" className={rowCls}>
            <Mail size={20} strokeWidth={2} /> Inbox
          </Link>
        </div>
      ) : (
        <Link href="#" onClick={onNavigate} className={`${rowCls} mt-3`}>
          Inbox
        </Link>
      )}

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

      {user && (
        <>
          <div className="my-2 border-t border-xp-line" />
          <button onClick={handleSignOut} role="menuitem" className={rowCls}>
            <LogOut size={20} strokeWidth={2} /> Sign out
          </button>
        </>
      )}
    </div>
  );
}
