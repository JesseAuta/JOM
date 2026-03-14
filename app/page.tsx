import Image from "next/image";
import SearchBar from "./components/SearchBar";
import MapSection from "./components/MapSection";

export default function Home() {
  return (
    <>
      {/* Search */}
      <div className="mt-6">
        <SearchBar />
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Text ABOVE the hero image */}
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{ color: "#062E52" }}
        >
          Welcome to Our Auto Repair Service
        </h1>

        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Professional diagnostics, repairs, and maintenance.
        </p>

        {/* Hero Image */}
        <div className="w-full mt-10">
          <Image
            src="/images/jom-hero.png"
            alt="JOM Auto Service Center"
            width={1600}
            height={900}
            className="rounded-lg shadow-md object-cover w-full"
            priority
          />
        </div>

      </div>

      {/* Map Section */}
      <MapSection />

    </>
  );
}