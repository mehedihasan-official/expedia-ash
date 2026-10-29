import HelpButton from "@/components/HelpButton";
import SiteHeader from "@/components/SiteHeader";
import BundleSave from "@/app/pages/home/BundleSave";
import ExploreWorld from "@/app/pages/home/ExploreWorld";
import Hero from "@/app/pages/home/Hero";
import LastMinuteDeals from "@/app/pages/home/LastMinuteDeals";
import OneKeyBanner from "@/app/pages/home/OneKeyBanner";
import PackagesBanner from "@/app/pages/home/PackagesBanner";
import PromoCards from "@/app/pages/home/PromoCards";
import SeattleAd from "@/app/pages/home/SeattleAd";
import SiteFooter from "@/app/pages/home/SiteFooter";
import StaysByStyle from "@/app/pages/home/StaysByStyle";
import VacationRentals from "@/app/pages/home/VacationRentals";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <div className="mt-6 md:mt-[50px]">
          <PackagesBanner />
        </div>
        <LastMinuteDeals />
        <PromoCards />
        <BundleSave />
        <VacationRentals />
        <StaysByStyle />
        <OneKeyBanner />
        <SeattleAd />
        <ExploreWorld />
      </main>

      <SiteFooter />
      <HelpButton />
    </>
  );
}
