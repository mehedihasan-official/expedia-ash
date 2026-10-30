import type { Testimonial } from "@/lib/types";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl text-xp-navy mb-2">What guests say</h2>
      <p className="text-xp-muted mb-10 max-w-xl">
        Real feedback from other Holiday Inn Club Vacation owners.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="rounded-2xl border border-xp-line bg-white p-6 flex flex-col gap-4"
          >
            <div className="flex gap-0.5 text-[#e8a800]" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} aria-hidden>
                  {i < t.rating ? "★" : "☆"}
                </span>
              ))}
            </div>
            <blockquote className="text-xp-navy leading-relaxed text-sm">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm font-medium text-xp-navy mt-auto">
              {t.guestName}
              {t.propertyName && (
                <span className="font-normal text-xp-muted"> · {t.propertyName}</span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
