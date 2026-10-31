import type { BookingStatus } from "@/lib/history";

const styles: Record<BookingStatus, string> = {
  Paid: "bg-[#e6f2ec] text-xp-green ring-xp-green/25",
  Pending: "bg-[#fff6d6] text-[#7a5b00] ring-[#e8c33a]/50",
  Expired: "bg-xp-gray text-xp-muted ring-xp-line",
};

export default function StatusPill({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${styles[status]}`}>
      {status}
    </span>
  );
}
