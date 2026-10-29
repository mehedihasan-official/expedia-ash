"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LANGUAGES = ["English", "Español", "Français", "Deutsch", "Português", "বাংলা"];
const CURRENCIES = ["USD – US dollar", "EUR – Euro", "GBP – British pound", "CAD – Canadian dollar", "BDT – Bangladeshi taka"];

/** Language + currency picker opened from the header "USD" button / mobile menu row. */
export default function PreferencesDialog({ onClose }: { onClose: () => void }) {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const selectCls =
    "h-12 w-full rounded-lg border border-xp-outline bg-white px-3 text-base text-xp-navy outline-none focus:border-xp-blue focus:ring-1 focus:ring-xp-blue";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="prefs-title"
        className="xp-pop w-full max-w-[480px] rounded-t-2xl bg-white p-6 shadow-2xl outline-none sm:rounded-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="prefs-title" className="font-display text-[28px] leading-8">
            Set your preferences
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-xp-gray"
          >
            <X size={22} />
          </button>
        </div>

        <label className="mb-1 block text-sm font-medium" htmlFor="pref-language">Language</label>
        <select id="pref-language" value={language} onChange={(e) => setLanguage(e.target.value)} className={selectCls}>
          {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
        </select>

        <label className="mb-1 mt-4 block text-sm font-medium" htmlFor="pref-currency">Currency</label>
        <select id="pref-currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className={selectCls}>
          {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
        </select>

        <button
          onClick={onClose}
          className="mt-6 h-12 w-full rounded-full bg-xp-blue text-base font-semibold text-white transition hover:bg-xp-blue-dark"
        >
          Save
        </button>
      </div>
    </div>
  );
}
