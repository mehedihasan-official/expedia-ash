import SearchCard from "./SearchCard";

/**
 * Hero: landscape photo with the tagline and the tabbed search card on top.
 * Phones have no photo — just the search card (per the mobile screenshot).
 */
export default function Hero() {
  return (
    <section id="hero" className="relative max-md:border-b max-md:border-xp-line">
      {/* background photo (tablet + desktop) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 hidden bg-cover bg-center md:block md:h-[345px]"
        style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}
      />

      <div className="relative mx-auto max-w-[1248px] px-0 md:px-6">
        <h1 className="hidden text-center font-display text-white md:block md:pt-[48px] md:text-[42px] md:leading-[50px]">
          The one place you go to go places
        </h1>

        <div className="max-md:px-6 max-md:pb-6 md:mt-[42px]">
          <SearchCard />
        </div>
      </div>
    </section>
  );
}
