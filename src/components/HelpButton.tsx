"use client";

import { MessagesSquare } from "lucide-react";

/** Floating help button — "Help" pill on desktop/tablet, round chat icon on phones. */
export default function HelpButton() {
  return (
    <button
      aria-label="Help"
      className="fixed bottom-4 right-4 z-30 flex h-11 items-center gap-2 rounded-full border border-xp-line bg-white px-3 text-sm font-semibold text-xp-blue shadow-[0_2px_8px_rgba(25,30,59,0.25)] transition hover:shadow-[0_3px_12px_rgba(25,30,59,0.3)] md:right-6 md:px-4"
    >
      <MessagesSquare size={20} strokeWidth={2} />
      <span className="hidden md:inline">Help</span>
    </button>
  );
}
