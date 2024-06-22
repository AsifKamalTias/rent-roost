import FeaturedProperties from "./_components/FeaturedProperties";
import Hero from "./_components/Hero";
import InfoBoxes from "./_components/InfoBoxes";
import RecentProperties from "./_components/RecentProperties";

export default function Home() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <RecentProperties />
    </>
  );
}
